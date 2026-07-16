import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';
import { RateLimitError } from '../utils/errors';
import { SECURITY_LIMITS } from '../security/limits';

export function rateLimitMiddleware(options: {
  limit: number;
  windowMs: number;
  keyPrefix: string;
}): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    const db = c.env.DB;
    const user = c.get('user');
    
    // Fallback key: IP address or user ID
    const ip = c.req.header('CF-Connecting-IP') || 'anonymous';
    const key = `${options.keyPrefix}:${user ? user.id : ip}`;

    // Get current window timestamp (rounded to window duration)
    const now = Date.now();
    const windowStart = new Date(Math.floor(now / options.windowMs) * options.windowMs).toISOString();

    try {
      // Upsert transaction inside D1 using bindings
      const query = `
        INSERT INTO rate_limit_counters (id, key, window_start, count)
        VALUES (?1, ?2, ?3, 1)
        ON CONFLICT(key, window_start) DO UPDATE SET count = count + 1
        RETURNING count;
      `;

      const id = `${key}:${windowStart}`;
      const result = await db.prepare(query)
        .bind(id, key, windowStart)
        .first<{ count: number }>();

      const count = result?.count ?? 1;

      // Add headers
      c.header('X-RateLimit-Limit', options.limit.toString());
      c.header('X-RateLimit-Remaining', Math.max(0, options.limit - count).toString());

      if (count > options.limit) {
        throw new RateLimitError(`Too many requests. Please wait before trying again.`);
      }
    } catch (error) {
      if (error instanceof RateLimitError) throw error;
      console.error('Rate limit error:', error);
      // Fail-open for D1 failures to prevent locking out users if database has issues
    }

    return next();
  };
}

export const apiRateLimit = () => rateLimitMiddleware({
  limit: SECURITY_LIMITS.MAX_REQUESTS_PER_USER_PER_MINUTE,
  windowMs: 60 * 1000,
  keyPrefix: 'api_minute',
});

export const runRateLimit = () => rateLimitMiddleware({
  limit: SECURITY_LIMITS.MAX_RUNS_PER_USER_PER_HOUR,
  windowMs: 60 * 60 * 1000,
  keyPrefix: 'run_hour',
});
