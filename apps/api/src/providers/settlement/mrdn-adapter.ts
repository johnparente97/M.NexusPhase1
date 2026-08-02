import {
  X402FacilitatorAdapter,
  FacilitatorCapabilities,
  PaymentRequirementRequest,
  PaymentRequirements,
  PaymentAuthorization,
  VerificationResult,
  SettlementResult,
  FacilitatorReceipt,
} from '@nexus/shared-types';

/**
 * MRDN x402 Payment Facilitator Adapter.
 * Encapsulates all MRDN-specific x402 authorization and settlement logic.
 * Nexus engine communicates strictly via the X402FacilitatorAdapter contract.
 */
export class MrdnFacilitatorAdapter implements X402FacilitatorAdapter {
  private facilitatorAddress: string;

  constructor(facilitatorAddress: string = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4') {
    this.facilitatorAddress = facilitatorAddress;
  }

  async getCapabilities(): Promise<FacilitatorCapabilities> {
    return {
      supportedCurrencies: ['USDC'],
      supportsSplitSettlement: true,
      supportsAsyncSettlement: true,
    };
  }

  async createPaymentRequirements(request: PaymentRequirementRequest): Promise<PaymentRequirements> {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    return {
      paymentId: `mrdn_req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      facilitatorAddress: this.facilitatorAddress,
      amountAtomic: request.amountAtomic,
      currency: request.currency || 'USDC',
      expiresAt,
    };
  }

  async verifyAuthorization(authorization: PaymentAuthorization): Promise<VerificationResult> {
    if (!authorization.authorizationId || !authorization.signature) {
      return {
        valid: false,
        authorizationId: authorization.authorizationId,
        errorMessage: 'Invalid MRDN payment authorization signature.',
      };
    }

    return {
      valid: true,
      authorizationId: authorization.authorizationId,
    };
  }

  async settle(authorization: PaymentAuthorization): Promise<SettlementResult> {
    const now = new Date().toISOString();
    const settlementId = `mrdn_tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const mockTxHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

    return {
      success: true,
      settlementId,
      transactionHash: mockTxHash,
      settledAt: now,
    };
  }

  async getSettlementStatus(settlementId: string): Promise<'pending' | 'settled' | 'failed'> {
    if (!settlementId) return 'failed';
    return 'settled';
  }

  async getReceipt(settlementId: string): Promise<FacilitatorReceipt> {
    const now = new Date().toISOString();
    return {
      settlementId,
      authorizationId: `auth_${settlementId}`,
      transactionHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      facilitatorName: 'MRDN x402 Facilitator',
      settledAt: now,
      status: 'settled',
    };
  }
}
