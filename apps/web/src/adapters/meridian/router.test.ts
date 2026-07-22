import { describe, it, expect } from 'vitest';
import { MeridianRouterAdapter } from './router';
import { SupportedToken } from '../../config/chain-config';

describe('MeridianRouterAdapter Top-Up Fee Rules', () => {
  const mrdnToken: SupportedToken = {
    symbol: 'MRDN',
    name: 'Meridian Token (0% Fee Benefit)',
    decimals: 18,
    address: '0x5c421e42ba921e1494957e2d93e1b78292850901',
    icon: 'sparkles',
    isStablecoin: false,
    estimatedSlippageBps: 0,
    topUpFeeBps: 0,
  };

  const usdcToken: SupportedToken = {
    symbol: 'USDC',
    name: 'USD Coin (1% Fee)',
    decimals: 6,
    address: '0x036cbd53842c3db6650800b2854ef71e213fd2db',
    icon: 'dollar-sign',
    isStablecoin: true,
    estimatedSlippageBps: 5,
    topUpFeeBps: 100,
  };

  it('calculates 0% top-up fee for MRDN token deposits', () => {
    const calc = MeridianRouterAdapter.calculateTopUp(100, mrdnToken, 84532);
    expect(calc.isMrdnZeroFeeBenefit).toBe(true);
    expect(calc.meridianTopUpFeeUsd).toBe(0);
    expect(calc.feeBps).toBe(0);
    expect(calc.feePercentageDisplay).toContain('0%');
  });

  it('calculates 1% top-up fee for USDC token deposits', () => {
    const calc = MeridianRouterAdapter.calculateTopUp(100, usdcToken, 84532);
    expect(calc.isMrdnZeroFeeBenefit).toBe(false);
    expect(calc.meridianTopUpFeeUsd).toBe(1.0); // 1% of $100
    expect(calc.feeBps).toBe(100);
    expect(calc.feePercentageDisplay).toBe('1%');
  });
});
