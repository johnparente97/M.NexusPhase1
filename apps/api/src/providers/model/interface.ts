import { ModelGenerationRequest, ModelGenerationResult, ModelProviderHealth } from '@meridian-nexus/shared-types';

export interface ModelProvider {
  generate(request: ModelGenerationRequest): Promise<ModelGenerationResult>;
  healthCheck?(): Promise<ModelProviderHealth>;
}
