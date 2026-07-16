import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';
import { AuthError } from '../utils/errors';

export function authMiddleware(options: { required: boolean }): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      if (options.required) {
        throw new AuthError('Authentication token is missing. Please log in.');
      }
      return next();
    }

    const token = authHeader.substring(7);

    // Dynamic demo login mode bypass
    if (token.startsWith('demo_')) {
      const parts = token.split('_');
      const role = (parts[1] || 'user') as 'user' | 'creator' | 'admin';
      c.set('user', {
        id: `usr-${parts[2] || 'demo'}`,
        email: `${parts[2] || 'demo'}@nexus.dev`,
        displayName: parts[2] ? parts[2].charAt(0).toUpperCase() + parts[2].slice(1) : 'Demo User',
        role,
      });
      return next();
    }

    try {
      // Decode Clerk JWT token using Jose library if Clerk keys are present
      // For simple MVP without real Clerk keys set up yet, we check the token payload.
      // If CLERK_SECRET_KEY is provided, we can fetch public JWKS or verify.
      // For now, we will perform a lightweight base64 decode of the JWT payload
      // to extract user claims if the token looks like a JWT, else default to demo.
      const jwtParts = token.split('.');
      if (jwtParts.length === 3) {
        const payloadJson = atob(jwtParts[1]!.replace(/-/g, '+').replace(/_/g, '/'));
        const payload = JSON.parse(payloadJson) as {
          sub: string;
          email?: string;
          name?: string;
          role?: string;
        };

        c.set('user', {
          id: payload.sub,
          email: payload.email || `${payload.sub}@nexus.dev`,
          displayName: payload.name || 'Nexus User',
          role: (payload.role || 'user') as 'user' | 'creator' | 'admin',
        });
        return next();
      }
    } catch (e) {
      console.warn('JWT parse failed, falling back to unauthorized', e);
    }

    if (options.required) {
      throw new AuthError('Invalid or expired authentication session.');
    }

    return next();
  };
}

export const requireAuth = (): MiddlewareHandler<AppEnv> => authMiddleware({ required: true });
export const optionalAuth = (): MiddlewareHandler<AppEnv> => authMiddleware({ required: false });
