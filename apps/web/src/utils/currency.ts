// ─── Atomic Currency & Pricing Utilities ──────────────────────────────
// Prevents floating point inaccuracies by computing monetary values using
// micro-units (6 decimals for USDC: 1 USDC = 1,000,000 atomic units).
// ─────────────────────────────────────────────────────────────────────

const USDC_DECIMALS = 6;

/**
 * Converts a dollar number or string to atomic micro-USDC integer string.
 * Example: 1.25 -> "1250000"
 */
export function displayToAtomic(amount: number | string, decimals: number = USDC_DECIMALS): string {
  const numStr = typeof amount === 'number' ? amount.toFixed(decimals) : amount;
  const parts = numStr.split('.');
  const whole = parts[0] || '0';
  let fraction = parts[1] || '';

  if (fraction.length > decimals) {
    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, '0');
  }

  const combined = `${whole}${fraction}`.replace(/^0+/, '') || '0';
  return combined;
}

/**
 * Converts micro-USDC atomic string/bigint to standard decimal display string.
 * Example: "1250000" -> "1.25"
 */
export function atomicToDisplay(atomicStr: string | bigint, decimals: number = USDC_DECIMALS): string {
  const val = typeof atomicStr === 'bigint' ? atomicStr : BigInt(atomicStr || '0');
  const isNegative = val < 0n;
  const absVal = isNegative ? -val : val;

  const str = absVal.toString().padStart(decimals + 1, '0');
  const whole = str.slice(0, -decimals);
  const fraction = str.slice(-decimals);

  const formatted = `${whole}.${fraction}`.replace(/\.?0+$/, '');
  return isNegative ? `-${formatted}` : formatted || '0';
}

/**
 * Formats atomic micro-USDC integer string to formatted USD currency ($1.25).
 */
export function formatAtomicCurrency(atomicStr: string | bigint, currency: string = 'USDC'): string {
  const displayVal = parseFloat(atomicToDisplay(atomicStr));
  if (displayVal === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency === 'USDC' ? 'USD' : currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(displayVal);
}

export interface DetailedPriceBreakdown {
  providerCostAtomic: string;
  creatorMarginAtomic: string;
  nexusFeeAtomic: string;
  settlementCostAtomic: string;
  discountAtomic: string;
  netNexusFeeAtomic: string;
  totalAtomic: string;
}

/**
 * Computes exact price breakdown in atomic units according to Nexus rules:
 * Total = Provider Cost + Creator Margin + max(0, Nexus Fee - NEX Discount) + Settlement Cost
 * Note: NEX Discount applies ONLY to the Nexus Fee, never reducing Creator Margin or Provider Cost.
 */
export function computePriceBreakdownAtomic(params: {
  providerCostAtomic: string | bigint;
  creatorMarginAtomic: string | bigint;
  nexusFeeAtomic: string | bigint;
  settlementCostAtomic?: string | bigint;
  discountAtomic?: string | bigint;
}): DetailedPriceBreakdown {
  const provider = BigInt(params.providerCostAtomic || 0);
  const creator = BigInt(params.creatorMarginAtomic || 0);
  const fee = BigInt(params.nexusFeeAtomic || 0);
  const settlement = BigInt(params.settlementCostAtomic || 0);
  const rawDiscount = BigInt(params.discountAtomic || 0);

  // NEX discount cannot exceed the Nexus marketplace fee itself
  const discount = rawDiscount > fee ? fee : rawDiscount;
  const netNexusFee = fee - discount;

  const total = provider + creator + netNexusFee + settlement;

  return {
    providerCostAtomic: provider.toString(),
    creatorMarginAtomic: creator.toString(),
    nexusFeeAtomic: fee.toString(),
    settlementCostAtomic: settlement.toString(),
    discountAtomic: discount.toString(),
    netNexusFeeAtomic: netNexusFee.toString(),
    totalAtomic: total.toString(),
  };
}
