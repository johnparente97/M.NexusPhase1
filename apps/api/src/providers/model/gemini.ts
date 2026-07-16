import { ModelGenerationRequest, ModelGenerationResult, ModelProviderHealth } from '@meridian-nexus/shared-types';
import { ModelProvider } from './interface';

export class GeminiModelProvider implements ModelProvider {
  private apiKey: string;
  private model: string;

  constructor(apiKey: string, model: string = 'gemini-2.5-flash') {
    this.apiKey = apiKey;
    this.model = model;
  }

  async generate(request: ModelGenerationRequest): Promise<ModelGenerationResult> {
    const startTime = Date.now();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;

    const body: Record<string, unknown> = {
      contents: [
        {
          role: 'user',
          parts: [{ text: request.userPrompt }],
        },
      ],
      generationConfig: {
        temperature: request.temperature ?? 0.7,
        maxOutputTokens: request.maxTokens ?? 2048,
      },
    };

    if (request.systemPrompt) {
      body.systemInstruction = {
        parts: [{ text: request.systemPrompt }],
      };
    }

    if (request.outputSchema) {
      body.generationConfig = {
        ...(body.generationConfig as Record<string, unknown>),
        responseMimeType: 'application/json',
      };
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = (await response.json()) as {
        candidates?: Array<{
          content?: {
            parts?: Array<{ text?: string }>;
          };
          finishReason?: string;
        }>;
        usageMetadata?: {
          promptTokenCount?: number;
          candidatesTokenCount?: number;
          totalTokenCount?: number;
        };
      };

      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('Gemini API returned an empty or invalid response.');
      }

      const generationTimeMs = Date.now() - startTime;
      const promptTokens = data.usageMetadata?.promptTokenCount ?? 0;
      const completionTokens = data.usageMetadata?.candidatesTokenCount ?? 0;
      const tokensUsed = data.usageMetadata?.totalTokenCount ?? 0;

      return {
        content: text,
        generationTimeMs,
        promptTokens,
        completionTokens,
        tokensUsed,
        provider: 'gemini',
        model: this.model,
        isFallback: false,
      };
    } catch (error) {
      console.error('Gemini generate error:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<ModelProviderHealth> {
    const startTime = Date.now();
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${this.apiKey}`;
    try {
      const response = await fetch(url, { method: 'GET' });
      const latencyMs = Date.now() - startTime;
      return {
        available: response.ok,
        provider: 'gemini',
        latencyMs,
        message: response.ok ? 'Available' : `API Error: ${response.statusText}`,
      };
    } catch (error) {
      return {
        available: false,
        provider: 'gemini',
        message: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }
}
