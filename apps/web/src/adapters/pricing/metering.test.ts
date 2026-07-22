import { describe, it, expect } from 'vitest';
import { MeteringEngine } from './metering';
import { ANTSEED_MODEL_CATALOG } from '../antseed/adapter';

describe('MeteringEngine Token Pricing Calculation', () => {
  const freeModel = ANTSEED_MODEL_CATALOG.find((m) => m.isFree)!;
  const paidModel = ANTSEED_MODEL_CATALOG.find((m) => !m.isFree)!;

  it('calculates zero cost for free model inference requests', () => {
    const receipt = MeteringEngine.calculateRequestCost(freeModel, 1000, 500);
    expect(receipt.isFree).toBe(true);
    expect(receipt.totalCharged).toBe(0);
    expect(receipt.inputCost).toBe(0);
    expect(receipt.outputCost).toBe(0);
  });

  it('calculates exact metered input/output cost for paid models', () => {
    // Paid model: 1,000,000 input tokens and 1,000,000 output tokens
    const receipt = MeteringEngine.calculateRequestCost(paidModel, 1000000, 1000000);
    expect(receipt.isFree).toBe(false);
    expect(receipt.inputCost).toBe(paidModel.priceInputPerMillion);
    expect(receipt.outputCost).toBe(paidModel.priceOutputPerMillion);
    expect(receipt.totalModelCost).toBeGreaterThan(0);
  });
});
