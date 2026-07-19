import { cors } from 'hono/cors';
import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';

export function corsMiddleware(): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    const defaultOrigins = [
      'https://johnparente97.github.io',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:8787',
    ];

    const envOrigin = c.env?.CORS_ORIGIN || '';
    const customOrigins = envOrigin.split(',').map((o) => o.trim()).filter(Boolean);
    const allowedOrigins = Array.from(new Set([...defaultOrigins, ...customOrigins]));

    const reqOrigin = c.req.header('Origin') || '';

    // If request is from github.io or local dev, reflect origin for CORS compliance
    const isAllowed =
      allowedOrigins.includes(reqOrigin) ||
      reqOrigin.endsWith('.github.io') ||
      reqOrigin.startsWith('http://localhost:');

    const handler = cors({
      origin: isAllowed ? reqOrigin : allowedOrigins[0],
      allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Nexus-Accept-ToS'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      maxAge: 86400,
      credentials: false,
    });

    return handler(c, next);
  };
}
