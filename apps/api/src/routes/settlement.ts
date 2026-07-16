import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1RunRepository } from '../repositories/run-repo';
import { requireAuth } from '../middleware/auth';
import { NotFoundError, ForbiddenError } from '../utils/errors';

const router = new Hono<AppEnv>();

// ── GET /api/settlement/:runId/receipt (Get Receipt details) ──
router.get('/:runId/receipt', requireAuth(), async (c) => {
  const runId = c.req.param('runId');
  const authUser = c.get('user')!;

  const runRepo = new D1RunRepository(c.env.DB);
  const run = await runRepo.getById(runId);
  if (!run) throw new NotFoundError('Execution run record not found.');

  if (run.userId !== authUser.id) {
    throw new ForbiddenError('You do not have access to view this settlement receipt.');
  }

  const receipt = await runRepo.getSettlementReceipt(runId);
  if (!receipt) throw new NotFoundError('Receipt has not been generated yet or execution run is unpaid/free.');

  return c.json({
    success: true,
    data: receipt,
  });
});

export default router;
export { router as settlementRouter };
