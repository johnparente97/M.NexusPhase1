import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1FavoriteRepository } from '../repositories/favorite-repo';
import { requireAuth } from '../middleware/auth';

const router = new Hono<AppEnv>();

// ── GET /api/favorites (List favorited workflows) ──
router.get('/', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  const repo = new D1FavoriteRepository(c.env.DB);
  const workflows = await repo.listUserFavorites(authUser.id);

  return c.json({
    success: true,
    data: workflows,
  });
});

// ── POST /api/favorites/:workflowId (Toggle Save status) ──
router.post('/:workflowId', requireAuth(), async (c) => {
  const workflowId = c.req.param('workflowId');
  const authUser = c.get('user')!;
  const repo = new D1FavoriteRepository(c.env.DB);
  
  const result = await repo.toggle(authUser.id, workflowId);

  return c.json({
    success: true,
    data: result,
  });
});

// ── DELETE /api/favorites/:workflowId ──
router.delete('/:workflowId', requireAuth(), async (c) => {
  const workflowId = c.req.param('workflowId');
  const authUser = c.get('user')!;
  const repo = new D1FavoriteRepository(c.env.DB);
  
  const result = await repo.toggle(authUser.id, workflowId);

  return c.json({
    success: true,
    data: result,
  });
});

export default router;
export { router as favoritesRouter };
