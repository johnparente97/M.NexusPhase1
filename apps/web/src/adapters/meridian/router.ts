// ─── Meridian Router & Session Authorization Adapter ─────────────────
// Manages multichain top-ups, fee calculations (0% MRDN, 1% USDC/others), and session spending limits.
// ─────────────────────────────────────────────────────────────────────

import { MERIDIAN_TOP_UP_FEE_BPS, MRDN_TOP_UP_FEE_BPS, STANDARD_TOP_UP_FEE_BPS, SupportedToken } from '../../config/chain-config';

export interface TopUpCalculation {
  depositAmount: number;
  sourceSymbol: string;
  sourceChainId: number;
  conversionRateUsd: number;
  grossUsdValue: number;
  meridianTopUpFeeUsd: number; // 0% for MRDN, 1% for USDC / standard assets
  feeBps: number;
  feePercentageDisplay: string;
  isMrdnZeroFeeBenefit: boolean;
  estimatedNetworkFeeUsd: number;
  slippageUsd: number;
  netCreditedUsdc: number;
}

export interface SessionAuthorization {
  id: string;
  maxSessionSpend: number;
  currentSessionSpend: number;
  maxDailySpend: number;
  maxCostPerRequest: number;
  expiresAt: string;
  isPaused: boolean;
  autoLowBalanceStop: boolean;
  approvedModelIds?: string[];
  createdAt: string;
}

export class MeridianRouterAdapter {
  /**
   * Calculates Meridian Top-Up Fee breakdown across EVM chains & tokens
   * Rule:
   * - Top-up using MRDN: 0% fee (0 BPS)
   * - Top-up using USDC or other supported asset: 1% fee (100 BPS)
   */
  static calculateTopUp(
    depositAmount: number,
    token: SupportedToken,
    chainId: number
  ): TopUpCalculation {
    // Estimated token prices vs USD
    const priceMap: Record<string, number> = {
      MRDN: 1.0, // Fixed 1:1 settlement credit baseline
      USDC: 1.0,
      USDG: 1.0,
      ETH: 3450.0,
      MATIC: 0.55,
      SOL: 145.0,
    };

    const rate = priceMap[token.symbol] || 1.0;
    const grossUsdValue = depositAmount * rate;

    // Determine top-up fee: MRDN has 0% fee benefit, others have 1% fee
    const isMrdnZeroFee = token.symbol === 'MRDN' || token.topUpFeeBps === 0;
    const feeBps = isMrdnZeroFee ? MRDN_TOP_UP_FEE_BPS : (token.topUpFeeBps ?? STANDARD_TOP_UP_FEE_BPS);
    const feePercent = feeBps / 10000;
    const meridianTopUpFeeUsd = parseFloat((grossUsdValue * feePercent).toFixed(4));
    const estimatedNetworkFeeUsd = chainId === 1 ? 4.5 : 0.02; // ETH vs Layer-2 gas
    const slippageUsd = parseFloat(((grossUsdValue * token.estimatedSlippageBps) / 10000).toFixed(4));

    const netCreditedUsdc = Math.max(
      0,
      parseFloat((grossUsdValue - meridianTopUpFeeUsd - estimatedNetworkFeeUsd - slippageUsd).toFixed(2))
    );

    return {
      depositAmount,
      sourceSymbol: token.symbol,
      sourceChainId: chainId,
      conversionRateUsd: rate,
      grossUsdValue: parseFloat(grossUsdValue.toFixed(2)),
      meridianTopUpFeeUsd,
      feeBps,
      feePercentageDisplay: isMrdnZeroFee ? '0% (MRDN Benefit)' : '1%',
      isMrdnZeroFeeBenefit: isMrdnZeroFee,
      estimatedNetworkFeeUsd,
      slippageUsd,
      netCreditedUsdc,
    };
  }

  /**
   * Default Session Authorization Factory
   */
  static createDefaultSessionAuth(maxSpend: number = 10.0): SessionAuthorization {
    return {
      id: `sess-${crypto.randomUUID().substring(0, 8)}`,
      maxSessionSpend: maxSpend,
      currentSessionSpend: 0.0,
      maxDailySpend: 25.0,
      maxCostPerRequest: 1.5,
      expiresAt: new Date(Date.now() + 86400 * 1000).toISOString(), // 24 hours
      isPaused: false,
      autoLowBalanceStop: true,
      createdAt: new Date().toISOString(),
    };
  }
}
