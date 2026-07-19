// ─── Smart Model Router Service ──────────────────────────────────────
// Intelligently selects or recommends AI models based on task priorities.
// ─────────────────────────────────────────────────────────────────────

import { ANTSEED_MODEL_CATALOG, AntSeedModel } from '../adapters/antseed/adapter';

export type RoutingMode = 'manual' | 'recommended' | 'automatic';
export type RoutingPriority = 'cost' | 'speed' | 'quality' | 'balanced' | 'privacy' | 'enterprise';

export interface RouteSelectionResult {
  selectedModel: AntSeedModel;
  reason: string;
  alternateModel?: AntSeedModel;
  estimatedCostUsd: number;
}

export class ModelRouterService {
  static selectModel(
    priority: RoutingPriority,
    promptText: string,
    mode: RoutingMode = 'automatic',
    manualModelId?: string
  ): RouteSelectionResult {
    // 1. Manual Mode
    if (mode === 'manual' && manualModelId) {
      const found = ANTSEED_MODEL_CATALOG.find((m) => m.id === manualModelId) || ANTSEED_MODEL_CATALOG[0]!;
      return {
        selectedModel: found,
        reason: `Manually selected by user: ${found.name}`,
        estimatedCostUsd: found.isFree ? 0 : 0.0012,
      };
    }

    const inputLength = promptText.length;

    // 2. Priority Routing Algorithm
    let selected = ANTSEED_MODEL_CATALOG[0]!;
    let reason = '';
    let alternate = ANTSEED_MODEL_CATALOG[1];

    switch (priority) {
      case 'cost':
        selected = ANTSEED_MODEL_CATALOG.find((m) => m.isFree) || ANTSEED_MODEL_CATALOG[3]!;
        reason = `Selected ${selected.name} to minimize costs (${selected.isFree ? '100% Free' : '$' + selected.priceInputPerMillion + '/1M tokens'}).`;
        alternate = ANTSEED_MODEL_CATALOG[3];
        break;

      case 'speed':
        selected = ANTSEED_MODEL_CATALOG.reduce((fastest, current) =>
          current.latencyMs < fastest.latencyMs ? current : fastest
        );
        reason = `Selected ${selected.name} for lowest response latency (${selected.latencyMs}ms latency).`;
        alternate = ANTSEED_MODEL_CATALOG[1];
        break;

      case 'quality':
        selected = ANTSEED_MODEL_CATALOG.find((m) => m.id === 'claude-3-5-sonnet') || ANTSEED_MODEL_CATALOG[1]!;
        reason = `Selected ${selected.name} for maximum reasoning benchmark scores & precision.`;
        alternate = ANTSEED_MODEL_CATALOG[2];
        break;

      case 'privacy':
        selected = ANTSEED_MODEL_CATALOG.find((m) => m.privacy === 'Zero-Log') || ANTSEED_MODEL_CATALOG[0]!;
        reason = `Selected ${selected.name} for zero-log private sandbox processing.`;
        alternate = ANTSEED_MODEL_CATALOG[4];
        break;

      case 'enterprise':
        selected = ANTSEED_MODEL_CATALOG.find((m) => m.privacy === 'Encrypted Enterprise') || ANTSEED_MODEL_CATALOG[1]!;
        reason = `Selected ${selected.name} for enterprise SLA and data encryption compliance.`;
        alternate = ANTSEED_MODEL_CATALOG[7];
        break;

      case 'balanced':
      default:
        if (inputLength > 1000) {
          selected = ANTSEED_MODEL_CATALOG.find((m) => m.id === 'gemini-2-5-flash') || ANTSEED_MODEL_CATALOG[2]!;
          reason = `Selected ${selected.name} for large input context window (1M tokens capacity).`;
        } else {
          selected = ANTSEED_MODEL_CATALOG.find((m) => m.id === 'gpt-4o') || ANTSEED_MODEL_CATALOG[1]!;
          reason = `Selected ${selected.name} for optimal balance of speed, cost, and output quality.`;
        }
        alternate = ANTSEED_MODEL_CATALOG[3];
        break;
    }

    return {
      selectedModel: selected,
      reason,
      alternateModel: alternate,
      estimatedCostUsd: selected.isFree ? 0 : 0.0015,
    };
  }
}
