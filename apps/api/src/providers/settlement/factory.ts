import { SettlementProvider } from './interface';
import { MockMeridianSettlementProvider } from './mock';
import { MeridianSettlementProvider } from './meridian';

export function createSettlementProvider(environment: string): SettlementProvider {
  // In production, we run the MeridianSettlementProvider by default
  // (which will currently throw clear errors if blockchain credentials are not set).
  // In local/preview environments, we fallback to MockMeridianSettlementProvider.
  if (environment === 'production') {
    return new MeridianSettlementProvider();
  }
  return new MockMeridianSettlementProvider();
}
