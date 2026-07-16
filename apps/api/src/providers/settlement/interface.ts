import {
  PaymentAuthorizationInput,
  PaymentVerification,
  SettlementRequest,
  SettlementReceipt,
  RefundRequest,
  RefundResult,
} from '@meridian-nexus/shared-types';

export interface SettlementProvider {
  createAuthorization(input: PaymentAuthorizationInput): Promise<PaymentVerification>;
  verifyAuthorization(reference: string): Promise<PaymentVerification>;
  settleUsage(input: SettlementRequest): Promise<SettlementReceipt>;
  getReceipt(reference: string): Promise<SettlementReceipt>;
  requestRefund(input: RefundRequest): Promise<RefundResult>;
}
