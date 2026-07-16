import { Bindings } from '../../types';
import { ModelProvider } from './interface';
import { GeminiModelProvider } from './gemini';
import { DeterministicDemoModelProvider } from './demo';

export function createModelProvider(env: Bindings, modelId: string = 'gemini-2.5-flash'): ModelProvider {
  const apiKey = env.GEMINI_API_KEY;
  const enableLiveAi = env.ENABLE_LIVE_AI === 'true';

  if (enableLiveAi && apiKey) {
    return new GeminiModelProvider(apiKey, modelId);
  }

  // Fallback to deterministic demo provider
  return new DeterministicDemoModelProvider();
}
