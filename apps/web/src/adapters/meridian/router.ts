// ─── Meridian Router & Session Authorization Adapter ─────────────────
// Manages multichain top-ups, 1% fee calculation, and session spending limits.
// ─────────────────────────────────────────────────────────────────────

import { MERIDIAN_TOP_UP_FEE_BPS, SUPPORTED_CHAINS, SupportedToken } from '../../config/chain-config';

export interface TopUpCalculation {
  depositAmount: number;
  sourceSymbol: string;
  sourceChainId: number;
  conversionRateUsd: number;
  grossUsdValue: number;
  meridianTopUpFeeUsd: number; // 1% Fee
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
   * Calculates 1% Meridian Top-Up Fee breakdown across EVM chains & tokens
   */
  static calculateTopUp(
    depositAmount: number,
    token: SupportedToken,
    chainId: number
  ): TopUpCalculation {
    // Estimated token prices vs USD
    const priceMap: Record<string, number> = {
      USDC: 1.0,
      USDG: 1.0,
      ETH: 3450.0,
      MATIC: 0.55,
      SOL: 145.0,
    };

    const rate = priceMap[token.symbol] || 1.0;
    const grossUsdValue = depositAmount * rate;
    const feePercent = MERIDIAN_TOP_UP_FEE_BPS / 10000; // 0.01 (1%)
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
