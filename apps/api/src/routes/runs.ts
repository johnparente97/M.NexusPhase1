import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1WorkflowRepository } from '../repositories/workflow-repo';
import { D1RunRepository } from '../repositories/run-repo';
import { WorkflowExecutionService } from '../services/workflow-execution';
import { UsageService } from '../services/usage-service';
import { requireAuth } from '../middleware/auth';
import { zValidator } from '../middleware/validate';
import { executeWorkflowSchema } from '@meridian-nexus/validation';
import { verifyTurnstileToken } from '../security/turnstile';
import { NotFoundError, ValidationError, ForbiddenError } from '../utils/errors';
import { runRateLimit } from '../middleware/rate-limit';

const router = new Hono<AppEnv>();

// ── POST /api/workflows/:id/run (Execute Workflow Run) ──
router.post('/workflows/:id/run', requireAuth(), runRateLimit(), zValidator('json', executeWorkflowSchema), async (c) => {
  const id = c.req.param('id');
  const body = (c.req as any).valid('json');
  const authUser = c.get('user')!;

  const db = c.env.DB;
  const workflowRepo = new D1WorkflowRepository(db);
  const runRepo = new D1RunRepository(db);
  
  const executionService = new WorkflowExecutionService(workflowRepo, runRepo, c.env);
  const usageService = new UsageService(db);

  // 1. Verify Turnstile token if enabled via feature flag
  const turnstileFlag = await db.prepare("SELECT value FROM feature_flags WHERE key = 'ENABLE_TURNSTILE'").first<{ value: string }>();
  if (turnstileFlag?.value === 'true') {
    const turnstileSecret = c.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const verified = await verifyTurnstileToken(
        body.turnstileToken || '',
        turnstileSecret,
        c.req.header('CF-Connecting-IP')
      );
      if (!verified) {
        throw new ValidationError('Bot validation failed. Please check turnstile response.');
      }
    }
  }

  // 2. Enforce limits
  await usageService.checkUserLimits(authUser.id);

  // 3. Trigger execution
  const run = await executionService.execute(id, authUser.id, body.inputs);

  // 4. Update usage metric counters
  await usageService.incrementUsage(authUser.id, run.actualPrice === 0, run.actualPrice);

  return c.json({
    success: true,
    data: run,
  }, 201);
});

// ── GET /api/runs (List User's Run History) ──
router.get('/runs', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  const runRepo = new D1RunRepository(c.env.DB);
  
  const status = c.req.query('status');
  const limit = c.req.query('limit') ? parseInt(c.req.query('limit')!) : undefined;

  const runs = await runRepo.listUserRuns(authUser.id, { status, limit });

  return c.json({
    success: true,
    data: runs,
  });
});

// ── GET /api/runs/:id (Get Run Details & Step Timelines) ──
router.get('/runs/:id', requireAuth(), async (c) => {
  const id = c.req.param('id');
  const authUser = c.get('user')!;
  const runRepo = new D1RunRepository(c.env.DB);

  const run = await runRepo.getById(id);
  if (!run) throw new NotFoundError('Execution run record not found.');

  if (run.userId !== authUser.id) {
    throw new ForbiddenError('You do not have access to view this execution run.');
  }

  return c.json({
    success: true,
    data: run,
  });
});

// ── GET /api/runs/:id/result (Get Dynamic Execution Outcome) ──
router.get('/runs/:id/result', requireAuth(), async (c) => {
  const id = c.req.param('id');
  const authUser = c.get('user')!;
  
  const runRepo = new D1RunRepository(c.env.DB);
  const run = await runRepo.getById(id);
  if (!run) throw new NotFoundError('Execution run record not found.');

  if (run.userId !== authUser.id) {
    throw new ForbiddenError('You do not have access to view this outcome.');
  }

  const result = await runRepo.getResultByRunId(id);
  if (!result) throw new NotFoundError('Result has not generated yet or run failed.');

  return c.json({
    success: true,
    data: result,
  });
});

// ── POST /api/runs/:id/cancel ──
router.post('/runs/:id/cancel', requireAuth(), async (c) => {
  const id = c.req.param('id');
  const authUser = c.get('user')!;
  
  const runRepo = new D1RunRepository(c.env.DB);
  const run = await runRepo.getById(id);
  if (!run) throw new NotFoundError('Execution run record not found.');

  if (run.userId !== authUser.id) {
    throw new ForbiddenError('You do not have permission to modify this run.');
  }

  if (run.status !== 'pending' && run.status !== 'running') {
    throw new ValidationError(`Cannot cancel a run that is currently in '${run.status}' state.`);
  }

  const cancelled = await runRepo.updateStatus(id, 'cancelled');

  return c.json({
    success: true,
    data: cancelled,
  });
});

export default router;
export { router as runsRouter };
