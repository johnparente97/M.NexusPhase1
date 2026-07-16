import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1UserRepository } from '../repositories/user-repo';
import { UsageService } from '../services/usage-service';
import { requireAuth } from '../middleware/auth';
import { zValidator } from '../middleware/validate';
import { updateProfileSchema } from '@meridian-nexus/validation';
import { NotFoundError } from '../utils/errors';

const router = new Hono<AppEnv>();

// ── GET /api/users/me (Get Profile Details) ──
router.get('/me', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  const repo = new D1UserRepository(c.env.DB);
  
  const user = await repo.getById(authUser.id);
  if (!user) throw new NotFoundError('User record not found.');

  const profile = await repo.getProfile(authUser.id);
  const creator = await repo.getCreatorProfile(authUser.id);

  return c.json({
    success: true,
    data: {
      user,
      profile,
      creator,
    },
  });
});

// ── PUT /api/users/me (Update Profile settings) ──
router.put('/me', requireAuth(), zValidator('json', updateProfileSchema), async (c) => {
  const body = (c.req as any).valid('json');
  const authUser = c.get('user')!;
  const repo = new D1UserRepository(c.env.DB);

  if (body.displayName) {
    await c.env.DB.prepare('UPDATE users SET display_name = ?1 WHERE id = ?2')
      .bind(body.displayName, authUser.id)
      .run();
  }

  const updatedProfile = await repo.updateProfile(authUser.id, body);

  return c.json({
    success: true,
    data: {
      profile: updatedProfile,
    },
  });
});

// ── GET /api/users/me/usage (Get Usage Quotas & Metrics) ──
router.get('/me/usage', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  const usageService = new UsageService(c.env.DB);
  
  const metrics = await usageService.getUsageMetrics(authUser.id);

  return c.json({
    success: true,
    data: metrics,
  });
});

export default router;
export { router as usersRouter };
