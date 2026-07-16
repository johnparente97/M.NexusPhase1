import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';

export function loggerMiddleware(): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    const startTime = Date.now();
    const { method, url } = c.req;
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname + parsedUrl.search;

    console.log(`[API REQUEST] ${method} ${path} - started`);

    await next();

    const duration = Date.now() - startTime;
    const status = c.res.status;

    console.log(`[API RESPONSE] ${method} ${path} - Status: ${status} - Duration: ${duration}ms`);
  };
}
