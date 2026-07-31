import { ModelGenerationRequest, ModelGenerationResult, ModelProviderHealth } from '@nexus/shared-types';

export interface ModelProvider {
  generate(request: ModelGenerationRequest): Promise<ModelGenerationResult>;
  healthCheck?(): Promise<ModelProviderHealth>;
}
