import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1CreatorRepository } from '../repositories/creator-repo';
import { D1UserRepository } from '../repositories/user-repo';
import { requireAuth } from '../middleware/auth';
import { NotFoundError, ForbiddenError } from '../utils/errors';

const router = new Hono<AppEnv>();

// ── GET /api/creator/analytics (Get Creator KPI Metrics) ──
router.get('/analytics', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  
  const userRepo = new D1UserRepository(c.env.DB);
  const creator = await userRepo.getCreatorProfile(authUser.id);
  if (!creator) throw new ForbiddenError('You must register as a creator to view analytics.');

  const creatorRepo = new D1CreatorRepository(c.env.DB);
  const metrics = await creatorRepo.getMetrics(creator.id);

  return c.json({
    success: true,
    data: metrics,
  });
});

// ── GET /api/creator/workflows (Get Creator Owned Workflows) ──
router.get('/workflows', requireAuth(), async (c) => {
  const authUser = c.get('user')!;

  const userRepo = new D1UserRepository(c.env.DB);
  const creator = await userRepo.getCreatorProfile(authUser.id);
  if (!creator) throw new ForbiddenError('You do not have a creator profile configured.');

  const { results: workflows } = await c.env.DB.prepare(`
    SELECT * FROM workflows 
    WHERE creator_id = ?1 AND deleted_at IS NULL
    ORDER BY created_at DESC
  `).bind(creator.id).all<any>();

  return c.json({
    success: true,
    data: workflows.map((w) => ({
      id: w.id,
      name: w.name,
      slug: w.slug,
      shortDescription: w.short_description,
      category: w.category,
      status: w.status,
      visibility: w.visibility,
      isFree: w.is_free === 1,
      pricePerRun: w.price_per_run,
      totalRuns: w.total_runs,
      averageRating: w.average_rating,
      createdAt: w.created_at,
    })),
  });
});

// ── GET /api/creator/analytics/chart (Get History Analytics Points) ──
router.get('/analytics/chart', requireAuth(), async (c) => {
  const authUser = c.get('user')!;

  const userRepo = new D1UserRepository(c.env.DB);
  const creator = await userRepo.getCreatorProfile(authUser.id);
  if (!creator) throw new ForbiddenError('You do not have creator analytics access.');

  const creatorRepo = new D1CreatorRepository(c.env.DB);
  const days = c.req.query('days') ? parseInt(c.req.query('days')!) : 30;

  const points = await creatorRepo.getAnalyticsChart(creator.id, days);

  return c.json({
    success: true,
    data: points,
  });
});

export default router;
export { router as creatorRouter };
