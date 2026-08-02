import { Quote } from '@nexus/shared-types';

export interface X402PaymentRequirement {
  scheme: 'circle-gateway-nanopayments' | 'erc-3009' | 'spl-token';
  caip2Network: string; // e.g. "eip155:84532" for Base Sepolia
  assetAddress: string;
  payeeAddress: string;
  subtotalAtomic: string;
  protocolFeeAtomic: string;
  totalAtomic: string;
  idempotencyKey: string;
  expiresAt: string;
}

export interface X402AuthorizationHeader {
  scheme: string;
  caip2Network: string;
  paymentProofHash: string;
  idempotencyKey: string;
  signature: string;
  timestamp: string;
}

export class X402V2ProtocolAdapter {
  /**
   * Generates machine-readable x402 v2 payment requirement headers
   */
  public static createRequirement(quote: Quote, payeeAddress: string): X402PaymentRequirement {
    return {
      scheme: 'circle-gateway-nanopayments',
      caip2Network: 'eip155:84532', // Base Sepolia CAIP-2 ID
      assetAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC Base Sepolia
      payeeAddress,
      subtotalAtomic: quote.subtotalAtomic,
      protocolFeeAtomic: quote.protocolFeeAtomic,
      totalAtomic: quote.totalAtomic,
      idempotencyKey: `x402-idemp-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      expiresAt: new Date(Date.now() + 3600 * 1000 * 24).toISOString(), // 24hr validity
    };
  }

  /**
   * Encodes authorization header object into standard x402 HTTP header format
   */
  public static encodeHeader(auth: X402AuthorizationHeader): string {
    return `X402-V2 scheme="${auth.scheme}", network="${auth.caip2Network}", proof="${auth.paymentProofHash}", idempotency="${auth.idempotencyKey}", sig="${auth.signature}", ts="${auth.timestamp}"`;
  }
}
