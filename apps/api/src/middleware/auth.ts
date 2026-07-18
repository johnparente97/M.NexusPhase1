import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';
import { AuthError } from '../utils/errors';
import { importSPKI, jwtVerify } from 'jose';

export function authMiddleware(options: { required: boolean }): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    const authHeader = c.req.header('Authorization');
    const isProd = c.env.ENVIRONMENT === 'production';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      if (options.required) {
        throw new AuthError('Authentication token is missing. Please log in.');
      }
      return next();
    }

    const token = authHeader.substring(7);

    // Dynamic demo login mode bypass
    if (token.startsWith('demo_')) {
      if (isProd) {
        throw new AuthError('Demo authentication is disabled in production environments.');
      }
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

    // Try cryptographic validation of Clerk JWT token
    const clerkJwtKey = c.env.CLERK_JWT_KEY;
    if (clerkJwtKey) {
      try {
        // Format public key PEM if it is missing head/foot blocks
        let pem = clerkJwtKey.trim();
        if (!pem.startsWith('-----BEGIN PUBLIC KEY-----')) {
          pem = `-----BEGIN PUBLIC KEY-----\n${pem}\n-----END PUBLIC KEY-----`;
        }
        const publicKey = await importSPKI(pem, 'RS256');
        const { payload } = await jwtVerify(token, publicKey);

        const email = (payload as any).email || (payload as any).email_address || `${payload.sub}@nexus.dev`;
        const displayName = (payload as any).name || (payload as any).display_name || 'Nexus User';
        const role = ((payload as any).role || 'user') as 'user' | 'creator' | 'admin';

        c.set('user', {
          id: payload.sub!,
          email,
          displayName,
          role,
        });
        return next();
      } catch (err: any) {
        console.error('Cryptographic Clerk JWT verification failed:', err);
        if (isProd) {
          throw new AuthError('Invalid or expired authentication signature.');
        }
      }
    }

    // Fallback for non-production environment local development if keys are not configured
    if (!isProd) {
      try {
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
        console.warn('JWT parse failed during local fallback check:', e);
      }
    }

    if (options.required) {
      throw new AuthError('Invalid or expired authentication session.');
    }

    return next();
  };
}

export const requireAuth = (): MiddlewareHandler<AppEnv> => authMiddleware({ required: true });
export const optionalAuth = (): MiddlewareHandler<AppEnv> => authMiddleware({ required: false });
