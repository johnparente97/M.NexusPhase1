import { Hono } from 'hono';
import { AppEnv } from '../types';
import { D1UserRepository } from '../repositories/user-repo';

const router = new Hono<AppEnv>();

router.post('/webhook', async (c) => {
  const payload = await c.req.json();
  const repo = new D1UserRepository(c.env.DB);

  // Clerk event types: user.created or user.updated
  const eventType = payload.type;
  const eventData = payload.data;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const clerkId = eventData.id;
    const email = eventData.email_addresses?.[0]?.email_address || `${clerkId}@nexus.dev`;
    const firstName = eventData.first_name || '';
    const lastName = eventData.last_name || '';
    const displayName = [firstName, lastName].filter(Boolean).join(' ') || 'Anonymous User';
    const avatarUrl = eventData.profile_image_url || eventData.image_url || null;

    const user = await repo.createOrUpdateFromClerk({
      clerkId,
      email,
      displayName,
      avatarUrl,
    });

    return c.json({
      success: true,
      data: {
        userId: user.id,
        role: user.role,
      },
    });
  }

  return c.json({ success: true, message: 'Event ignored' });
});

export default router;
export { router as authRouter };
