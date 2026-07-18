import { MiddlewareHandler } from 'hono';
import { AppEnv } from '../types';
import { ForbiddenError } from '../utils/errors';

// Sanctioned countries / geofenced regions matching regulatory compliance
const SANCTIONED_COUNTRIES = ['CU', 'IR', 'KP', 'SY', 'RU', 'BY'];

export function complianceMiddleware(): MiddlewareHandler<AppEnv> {
  return async (c, next) => {
    // 1. Geofencing enforcement via Cloudflare GeoIP headers
    const country = (c.req.header('cf-ipcountry') || c.req.header('CF-IPCountry'))?.toUpperCase();
    if (country && SANCTIONED_COUNTRIES.includes(country)) {
      throw new ForbiddenError(`Geographic compliance restriction: Access from country code ${country} is blocked.`);
    }

    // 2. Terms of Service Acceptance Header validation (for mutation and execution paths)
    if (c.req.method !== 'GET') {
      const acceptToS = c.req.header('x-nexus-accept-tos') || c.req.header('X-Nexus-Accept-ToS');
      if (acceptToS !== 'true') {
        throw new ForbiddenError('Compliance enforcement: Acceptance of Terms of Service is required (header X-Nexus-Accept-ToS: true).');
      }
    }

    // 3. User KYC status lookup for workflow execution paths
    const user = c.get('user');
    if (user && (c.req.path.includes('/run') || c.req.path.includes('/intent'))) {
      const dbUser = await c.env.DB.prepare(
        'SELECT kyc_status as kycStatus FROM users WHERE id = ?'
      )
        .bind(user.id)
        .first<{ kycStatus: string }>();

      if (dbUser && dbUser.kycStatus !== 'verified') {
        throw new ForbiddenError('Compliance gate: User KYC verification is pending or rejected. Workflow execution blocked.');
      }
    }

    return next();
  };
}
