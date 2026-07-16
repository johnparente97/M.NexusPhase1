import {
  PaymentAuthorizationInput,
  PaymentVerification,
  SettlementRequest,
  SettlementReceipt,
  RefundRequest,
  RefundResult,
} from '@meridian-nexus/shared-types';
import { SettlementProvider } from './interface';

export class MeridianSettlementProvider implements SettlementProvider {
  createAuthorization(input: PaymentAuthorizationInput): Promise<PaymentVerification> {
    throw new Error(
      "Meridian production settlement is not configured. Add verified Meridian integration details and secure server-side credentials before enabling this provider."
    );
  }

  verifyAuthorization(reference: string): Promise<PaymentVerification> {
    throw new Error(
      "Meridian production settlement is not configured. Add verified Meridian integration details and secure server-side credentials before enabling this provider."
    );
  }

  settleUsage(input: SettlementRequest): Promise<SettlementReceipt> {
    throw new Error(
      "Meridian production settlement is not configured. Add verified Meridian integration details and secure server-side credentials before enabling this provider."
    );
  }

  getReceipt(reference: string): Promise<SettlementReceipt> {
    throw new Error(
      "Meridian production settlement is not configured. Add verified Meridian integration details and secure server-side credentials before enabling this provider."
    );
  }

  requestRefund(input: RefundRequest): Promise<RefundResult> {
    throw new Error(
      "Meridian production settlement is not configured. Add verified Meridian integration details and secure server-side credentials before enabling this provider."
    );
  }
}
