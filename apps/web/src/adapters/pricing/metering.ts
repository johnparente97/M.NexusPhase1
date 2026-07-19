// ─── Usage-Based AI Metering Engine ──────────────────────────────────
// Calculates exact input & output token costs per request and sessions.
// ─────────────────────────────────────────────────────────────────────

import { AntSeedModel } from '../antseed/adapter';

export interface MeteredRequestReceipt {
  requestId: string;
  modelId: string;
  modelName: string;
  provider: string;
  inputTokens: number;
  outputTokens: number;
  inputCost: number;
  outputCost: number;
  totalModelCost: number;
  platformFee: number;
  totalCharged: number;
  mrdnCashbackEarned: number;
  timestamp: string;
  isFree: boolean;
}

export class MeteringEngine {
  /**
   * Calculates exact model input/output costs according to the formula:
   * inputCost = (inputTokens / 1,000,000) * inputPricePerMillion
   * outputCost = (outputTokens / 1,000,000) * outputPricePerMillion
   * totalModelCost = inputCost + outputCost
   */
  static calculateRequestCost(
    model: AntSeedModel,
    inputTokens: number,
    outputTokens: number
  ): MeteredRequestReceipt {
    if (model.isFree || (model.priceInputPerMillion === 0 && model.priceOutputPerMillion === 0)) {
      return {
        requestId: `req-${crypto.randomUUID().substring(0, 8)}`,
        modelId: model.id,
        modelName: model.name,
        provider: model.provider,
        inputTokens,
        outputTokens,
        inputCost: 0,
        outputCost: 0,
        totalModelCost: 0,
        platformFee: 0,
        totalCharged: 0,
        mrdnCashbackEarned: 0,
        timestamp: new Date().toISOString(),
        isFree: true,
      };
    }

    const inputCost = (inputTokens / 1000000) * model.priceInputPerMillion;
    const outputCost = (outputTokens / 1000000) * model.priceOutputPerMillion;
    const totalModelCost = inputCost + outputCost;

    // Minimum charge threshold ($0.0001) for tiny testnet executions
    const roundedModelCost = Math.max(0.0001, parseFloat(totalModelCost.toFixed(6)));
    const platformFee = parseFloat((roundedModelCost * 0.01).toFixed(6)); // 1% platform fee
    const totalCharged = parseFloat((roundedModelCost + platformFee).toFixed(6));
    const mrdnCashbackEarned = parseFloat((totalCharged * 0.02).toFixed(6)); // 2% Base MRDN cashback

    return {
      requestId: `req-${crypto.randomUUID().substring(0, 8)}`,
      modelId: model.id,
      modelName: model.name,
      provider: model.provider,
      inputTokens,
      outputTokens,
      inputCost: parseFloat(inputCost.toFixed(6)),
      outputCost: parseFloat(outputCost.toFixed(6)),
      totalModelCost: roundedModelCost,
      platformFee,
      totalCharged,
      mrdnCashbackEarned,
      timestamp: new Date().toISOString(),
      isFree: false,
    };
  }

  /**
   * Estimates cost before sending prompt
   */
  static estimatePromptCost(model: AntSeedModel, promptText: string, expectedOutputTokens: number = 350) {
    const estimatedInputTokens = Math.max(10, Math.round(promptText.length / 4));
    return this.calculateRequestCost(model, estimatedInputTokens, expectedOutputTokens);
  }
}
