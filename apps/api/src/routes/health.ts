import { Hono } from 'hono';
import { AppEnv } from '../types';

const router = new Hono<AppEnv>();

router.get('/', async (c) => {
  return c.json({
    success: true,
    data: {
      status: 'healthy',
      version: '1.0.0-phase1',
      timestamp: new Date().toISOString(),
      network: 'Meridian Demo Network',
      database: 'Connected',
    },
  });
});

export default router;
// Named exports for routing mount
export { router as healthRouter };
