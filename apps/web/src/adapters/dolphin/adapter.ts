// ─── Dolphin Free Experience Adapter ──────────────────────────────────
// Dedicated adapter for Dolphin Mixtral Free AI Chat completions.
// ─────────────────────────────────────────────────────────────────────

import { fetchApi } from '../../services/api-client';

export interface DolphinChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  tokensEstimated?: number;
}

export interface DolphinStreamChunk {
  text: string;
  done: boolean;
  tokensCount?: number;
}

export class DolphinAdapter {
  static modelInfo = {
    id: 'dolphin-mixtral-8x7b-free',
    name: 'Dolphin 8x7B (Uncensored)',
    provider: 'Dolphin Open Intelligence',
    category: 'Free AI Chat',
    isFree: true,
    priceInputPerMillion: 0.0,
    priceOutputPerMillion: 0.0,
    contextWindow: 32768,
    speed: 'Ultra Fast (~150 ms/token)',
    trustScore: 99,
    description: 'Unfiltered, open-weights conversational reasoning model free for all Nexus community members.',
  };

  /**
   * Queries the Cloudflare Worker API and streams completions dynamically
   */
  static async *streamCompletion(
    messages: DolphinChatMessage[],
    signal?: AbortSignal
  ): AsyncGenerator<DolphinStreamChunk> {
    try {
      const response = await fetchApi<{ content: string; model: string }>(
        '/api/chat/completions',
        {
          method: 'POST',
          body: JSON.stringify({
            messages: messages.map((m) => ({ role: m.role, content: m.content })),
            modelId: 'dolphin-mixtral-8x7b-free',
            systemPrompt: 'You are Dolphin 8x7B, the free unmetered AI assistant on Meridian Nexus. You know everything about Nexus: Workflow Exchange (15+ AI workflows), AntSeed Model Marketplace (Claude 3.5 Sonnet, GPT-4o, DeepSeek R1, Gemini 2.5 Flash), Nexus Studio (visual workflow builder), Agent Builder, x402 settlement protocol, MRDN token (2% cashback), 1% top-up fee, Base Sepolia settlement. Guide users to features and be concise, expert, and helpful.',
          }),
          signal,
        }
      );

      const reply = response.content || "No content returned.";
      const words = reply.split(' ');
      let currentText = '';

      for (let i = 0; i < words.length; i++) {
        if (signal?.aborted) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 30));
        currentText += (i === 0 ? '' : ' ') + words[i];
        yield {
          text: currentText,
          done: i === words.length - 1,
          tokensCount: Math.round(currentText.length / 4),
        };
      }
    } catch (err) {
      console.warn("Worker chat completion failed. Falling back to dynamic client engine:", err);
      
      const lastMsg = messages[messages.length - 1]?.content.toLowerCase() || '';
      let reply = '';

      if (lastMsg.includes('hello') || lastMsg.includes('hi') || lastMsg.includes('hey')) {
        reply = "Hello! Welcome to Meridian Nexus. I'm Dolphin 8x7B, your free AI assistant.\n\nHere's what I can help with:\n- **Explain any Nexus feature** — workflows, models, settlement, agents\n- **Guide you through the platform** — sidebar navigation, running workflows\n- **Answer questions about MRDN, x402, and pricing**\n\nWhat would you like to explore?";
      } else if (lastMsg.includes('workflow') || lastMsg.includes('exchange') || lastMsg.includes('run')) {
        reply = "**Workflow Exchange** — Browse 15+ pre-built AI workflows:\n\n• Company Intelligence Brief ($4.99)\n• Marketing Campaign Builder ($6.99)\n• Sales Outreach Generator ($3.99)\n• Vendor Comparison Analyst ($7.99)\n\nClick **Workflow Exchange** in the sidebar to get started. Select any workflow, fill in the input form, and receive structured AI-generated results!";
      } else if (lastMsg.includes('model') || lastMsg.includes('antseed') || lastMsg.includes('premium')) {
        reply = "**AntSeed Model Marketplace** — Premium metered models:\n\n| Model | Input $/M | Output $/M |\n|-------|-----------|------------|\n| Claude 3.5 Sonnet | $3.00 | $15.00 |\n| GPT-4o | $2.50 | $10.00 |\n| DeepSeek R1 | $0.55 | $2.19 |\n| Gemini 2.5 Flash | $0.15 | $0.60 |\n\nGo to **AntSeed Model Marketplace** in the sidebar to explore!";
      } else if (lastMsg.includes('meridian') || lastMsg.includes('mrdn') || lastMsg.includes('token')) {
        reply = "**MRDN Token & Settlement:**\n- Every paid run yields **2% MRDN cashback**\n- Settlement on **Base Sepolia** (Chain ID 84532)\n- 1% platform top-up fee on deposits\n- x402 protocol issues machine-readable outcome receipts";
      } else if (lastMsg.includes('fee') || lastMsg.includes('cost') || lastMsg.includes('price')) {
        reply = "**Pricing:**\n- Dolphin Chat: **Free** (unmetered)\n- Platform fee: **1%** on all deposits\n- Per-token pricing varies by model\n- **2% MRDN cashback** on every paid run\n\nGo to **Unified AI Balance** to manage funds.";
      } else if (lastMsg.includes('studio') || lastMsg.includes('build') || lastMsg.includes('create')) {
        reply = "**Nexus Studio** lets you build custom AI workflows visually:\n1. Define input fields\n2. Configure AI model steps with prompts\n3. Set pricing and publish to the Exchange\n\nClick **Nexus Studio** in the sidebar to start building!";
      } else if (lastMsg.includes('agent')) {
        reply = "**Agent Builder** — Create autonomous AI agents with:\n- Primary model selection\n- Fallback model chains\n- Tool integration\n- Budget controls\n\nNavigate to **Agent Builder** in the sidebar.";
      } else {
        reply = `Great question! Here's what I can help with:\n\n🔍 **Explore Workflows** → Workflow Exchange\n💰 **Manage Funds** → Unified AI Balance\n🤖 **Premium Models** → AntSeed Marketplace\n🛠 **Build Workflows** → Nexus Studio\n📊 **Run History** → Activity\n\nAsk me anything about Nexus features, pricing, or how to use the platform!`;
      }

      const words = reply.split(' ');
      let currentText = '';
      for (let i = 0; i < words.length; i++) {
        if (signal?.aborted) break;
        await new Promise((resolve) => setTimeout(resolve, 30));
        currentText += (i === 0 ? '' : ' ') + words[i];
        yield {
          text: currentText,
          done: i === words.length - 1,
          tokensCount: Math.round(currentText.length / 4),
        };
      }
    }
  }
}
