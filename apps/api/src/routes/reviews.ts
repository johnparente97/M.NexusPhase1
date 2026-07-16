import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1ReviewRepository } from '../repositories/review-repo';
import { requireAuth, optionalAuth } from '../middleware/auth';
import { zValidator } from '../middleware/validate';
import { submitReviewSchema } from '@meridian-nexus/validation';
import { ValidationError } from '../utils/errors';

const router = new Hono<AppEnv>();

// ── GET /api/reviews?workflowId=... (List Workflow reviews) ──
router.get('/', optionalAuth(), async (c) => {
  const workflowId = c.req.query('workflowId');
  if (!workflowId) {
    throw new ValidationError('workflowId query parameter is required.');
  }

  const repo = new D1ReviewRepository(c.env.DB);
  const reviews = await repo.listByWorkflowId(workflowId);

  return c.json({
    success: true,
    data: reviews,
  });
});

// ── POST /api/reviews (Submit review) ──
router.post('/', requireAuth(), zValidator('json', submitReviewSchema), async (c) => {
  const body = (c.req as any).valid('json');
  const authUser = c.get('user')!;
  const repo = new D1ReviewRepository(c.env.DB);

  // Ensure user has not already reviewed this run
  const existing = await c.env.DB.prepare('SELECT 1 FROM reviews WHERE run_id = ?1')
    .bind(body.runId)
    .first<any>();

  if (existing) {
    throw new ValidationError('You have already submitted a rating review for this workflow run execution.');
  }

  const review = await repo.create({
    workflowId: body.workflowId,
    userId: authUser.id,
    runId: body.runId,
    rating: body.rating,
    comment: body.comment ?? null,
    helpfulCount: 0,
  });

  return c.json({
    success: true,
    data: review,
  }, 201);
});

export default router;
export { router as reviewsRouter };
