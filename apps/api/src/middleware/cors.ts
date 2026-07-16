import { cors } from 'hono/cors';
import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';

export function corsMiddleware(): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    const origin = c.env.CORS_ORIGIN || 'http://localhost:5173';
    const origins = origin.split(',').map((o) => o.trim());

    const handler = cors({
      origin: origins,
      allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      maxAge: 600,
      credentials: true,
    });

    return handler(c, next);
  };
}
