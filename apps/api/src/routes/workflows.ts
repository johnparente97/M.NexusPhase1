import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1WorkflowRepository } from '../repositories/workflow-repo';
import { zValidator } from '../middleware/validate';
import { createWorkflowSchema, updateWorkflowSchema, workflowListParamsSchema } from '@meridian-nexus/validation';
import { requireAuth, optionalAuth } from '../middleware/auth';
import { D1UserRepository } from '../repositories/user-repo';
import { NotFoundError } from '../utils/errors';

const router = new Hono<AppEnv>();

// ── GET /api/workflows (Marketplace Listing) ──
router.get('/', optionalAuth(), zValidator('query', workflowListParamsSchema), async (c) => {
  const query = (c.req as any).valid('query');
  const repo = new D1WorkflowRepository(c.env.DB);
  const { workflows, total } = await repo.list(query);

  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 12;

  return c.json({
    success: true,
    data: workflows,
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      hasMore: page * pageSize < total,
    },
  });
});

// ── GET /api/workflows/:id (Detail View) ──
router.get('/:id', optionalAuth(), async (c) => {
  const id = c.req.param('id');
  const repo = new D1WorkflowRepository(c.env.DB);
  const workflow = await repo.getById(id);

  if (!workflow) {
    // Try by slug if not UUID
    const workflowBySlug = await repo.getBySlug(id);
    if (!workflowBySlug) {
      throw new NotFoundError(`Workflow with identifier '${id}' was not found.`);
    }
    return c.json({ success: true, data: workflowBySlug });
  }

  return c.json({ success: true, data: workflow });
});

// ── POST /api/workflows (Create Draft) ──
router.post('/', requireAuth(), zValidator('json', createWorkflowSchema), async (c) => {
  const body = (c.req as any).valid('json');
  const authUser = c.get('user')!;
  
  const userRepo = new D1UserRepository(c.env.DB);
  const workflowRepo = new D1WorkflowRepository(c.env.DB);

  // Assert user is a creator
  let creator = await userRepo.getCreatorProfile(authUser.id);
  if (!creator) {
    creator = await userRepo.createCreatorProfile(authUser.id, {
      displayName: authUser.displayName,
    });
  }

  const workflow = await workflowRepo.create(creator.id, body);

  return c.json({
    success: true,
    data: workflow,
  }, 201);
});

// ── PUT /api/workflows/:id (Update Draft) ──
router.put('/:id', requireAuth(), zValidator('json', updateWorkflowSchema), async (c) => {
  const id = c.req.param('id');
  const body = (c.req as any).valid('json');
  const authUser = c.get('user')!;

  const userRepo = new D1UserRepository(c.env.DB);
  const workflowRepo = new D1WorkflowRepository(c.env.DB);

  const workflow = await workflowRepo.getById(id);
  if (!workflow) throw new NotFoundError('Workflow not found');

  const creator = await userRepo.getCreatorProfile(authUser.id);
  if (!creator || workflow.creatorId !== creator.id) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not own this workflow.' } }, 403);
  }

  const updated = await workflowRepo.update(id, body);

  return c.json({
    success: true,
    data: updated,
  });
});

// ── POST /api/workflows/:id/publish ──
router.post('/:id/publish', requireAuth(), async (c) => {
  const id = c.req.param('id');
  const authUser = c.get('user')!;

  const userRepo = new D1UserRepository(c.env.DB);
  const workflowRepo = new D1WorkflowRepository(c.env.DB);

  const workflow = await workflowRepo.getById(id);
  if (!workflow) throw new NotFoundError('Workflow not found');

  const creator = await userRepo.getCreatorProfile(authUser.id);
  if (!creator || workflow.creatorId !== creator.id) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not own this workflow.' } }, 403);
  }

  const published = await workflowRepo.publish(id);

  // Increment creator count
  await c.env.DB.prepare(`
    UPDATE creator_profiles 
    SET published_workflow_count = published_workflow_count + 1 
    WHERE id = ?1
  `).bind(creator.id).run();

  return c.json({
    success: true,
    data: published,
  });
});

// ── POST /api/workflows/:id/unpublish ──
router.post('/:id/unpublish', requireAuth(), async (c) => {
  const id = c.req.param('id');
  const authUser = c.get('user')!;

  const userRepo = new D1UserRepository(c.env.DB);
  const workflowRepo = new D1WorkflowRepository(c.env.DB);

  const workflow = await workflowRepo.getById(id);
  if (!workflow) throw new NotFoundError('Workflow not found');

  const creator = await userRepo.getCreatorProfile(authUser.id);
  if (!creator || workflow.creatorId !== creator.id) {
    return c.json({ success: false, error: { code: 'FORBIDDEN', message: 'You do not own this workflow.' } }, 403);
  }

  const unpublished = await workflowRepo.unpublish(id);

  // Decrement creator count
  await c.env.DB.prepare(`
    UPDATE creator_profiles 
    SET published_workflow_count = MAX(0, published_workflow_count - 1) 
    WHERE id = ?1
  `).bind(creator.id).run();

  return c.json({
    success: true,
    data: unpublished,
  });
});

// ── GET /api/workflows/:id/estimate ──
router.get('/:id/estimate', optionalAuth(), async (c) => {
  const id = c.req.param('id');
  const repo = new D1WorkflowRepository(c.env.DB);
  const workflow = await repo.getById(id);

  if (!workflow) throw new NotFoundError('Workflow not found');

  return c.json({
    success: true,
    data: {
      price: workflow.pricePerRun,
      currency: 'USD',
      estimatedDurationSeconds: workflow.estimatedDurationSeconds,
      isFree: workflow.isFree,
      settlementMode: 'demo',
      modelProvider: workflow.currentVersion?.modelProvider ?? 'demo',
    },
  });
});

export default router;
export { router as workflowsRouter };
