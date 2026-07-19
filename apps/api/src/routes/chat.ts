import { Hono } from 'hono';
import { AppEnv } from '../types';
import { createModelProvider } from '../providers/model/factory';
import { ModelGenerationRequest } from '@meridian-nexus/shared-types';

const router = new Hono<AppEnv>();

// Comprehensive Nexus Knowledge System Prompt
const NEXUS_SYSTEM_PROMPT = `You are an expert AI assistant embedded in Meridian Nexus, a Web3 AI workflow marketplace. You have deep knowledge of:

PLATFORM ARCHITECTURE:
- Meridian Nexus is a three-pane AI workspace: Left sidebar (Mission Control), Center (workspace views), Right (context inspector)
- Built on Cloudflare Workers + D1 database + Vite React frontend
- Deployed to GitHub Pages (frontend) and Cloudflare Workers (API)
- Uses hash-based routing for SPA on static hosting

CORE FEATURES:
- Workflow Exchange: Marketplace of 15 pre-built AI workflows (Company Intelligence Brief, Marketing Campaign Builder, Sales Outreach Generator, etc.)
- Nexus Studio: Visual workflow builder for creating custom multi-step AI pipelines
- Dolphin Free Chat: Unmetered open-weights AI assistant (this conversation)
- AntSeed Model Marketplace: Premium metered models (Claude 3.5 Sonnet, GPT-4o, DeepSeek R1, Gemini 2.5 Flash, etc.)
- Agent Builder: Configure autonomous agents with fallback model chains
- Developer Console: REST API, MCP, A2A, and x402 protocol integration endpoints

PAYMENT & SETTLEMENT:
- x402 Protocol: Machine-readable HTTP payment protocol for AI capability billing
- Meridian Settlement Layer: Non-custodial EVM settlement on Base Sepolia (Chain ID 84532)
- MRDN Token: Incentive alignment token, 2% cashback on paid workflow runs
- 1% Platform Top-Up Fee (MERIDIAN_TOP_UP_FEE_BPS = 100)
- Unified AI Balance: Single balance across all models, topped up via EVM wallet (USDC, ETH, DAI)
- Session Authorization: Users set a max session budget before running metered workflows

WORKFLOW EXECUTION FLOW:
1. User selects a workflow from the Exchange
2. Fills in dynamic input form (company name, audience, etc.)
3. System authorizes settlement via x402
4. AI model generates structured results (executive summary, findings, recommendations)
5. Outcome receipt is issued with token counts, cost breakdown, and settlement hash
6. Results saved to Activity history

Be helpful, expert, and concise. Format responses with markdown. Guide users to relevant features.`;

// POST /api/chat/completions
router.post('/completions', async (c) => {
  try {
    const body = await c.req.json<{
      messages: Array<{ role: string; content: string }>;
      modelId?: string;
      systemPrompt?: string;
    }>();

    const messages = body.messages || [];
    const modelId = body.modelId || 'gemini-2.5-flash';
    const lastMessage = messages[messages.length - 1]?.content || '';

    console.log(`[API Chat] Model: ${modelId}, prompt: ${lastMessage.substring(0, 80)}`);

    const provider = createModelProvider(c.env, modelId);
    
    const request: ModelGenerationRequest = {
      userPrompt: lastMessage,
      systemPrompt: body.systemPrompt || NEXUS_SYSTEM_PROMPT,
      temperature: 0.7,
      maxTokens: 1024,
    };

    try {
      const result = await provider.generate(request);
      
      // If result.content looks like JSON from the demo provider, convert it to readable text
      let content = result.content;
      if (content.trim().startsWith('[')) {
        try {
          const sections = JSON.parse(content);
          if (Array.isArray(sections)) {
            content = sections.map((s: any) => {
              const label = s.label || s.key || 'Section';
              if (Array.isArray(s.content)) {
                const items = s.content.map((item: any) =>
                  typeof item === 'object' ? `- **${item.item}** (${item.priority})` : `- ${item}`
                ).join('\n');
                return `**${label}**\n${items}`;
              }
              return `**${label}**\n${s.content}`;
            }).join('\n\n');
          }
        } catch { /* keep original content if parse fails */ }
      }
      
      return c.json({
        success: true,
        data: {
          content,
          model: result.model,
          provider: result.provider,
          tokensUsed: result.tokensUsed,
        }
      });
    } catch (apiErr) {
      console.warn('[API Chat] Provider failed, using dynamic fallback:', apiErr);
      const reply = generateDynamicFallback(lastMessage);
      return c.json({
        success: true,
        data: {
          content: reply,
          model: modelId,
          provider: 'nexus-sandbox',
          tokensUsed: Math.round(reply.length / 4) + 10,
        }
      });
    }
  } catch (err: any) {
    return c.json({
      success: false,
      error: { message: err?.message || 'Invalid request configuration' }
    }, 400);
  }
});

function generateDynamicFallback(prompt: string): string {
  const q = prompt.toLowerCase();
  
  if (q.includes('nexus') || q.includes('what is') || q.includes('tell me about') || q.includes('explain')) {
    return `**Meridian Nexus — AI Workflow Marketplace**

Nexus is a three-pane AI operating system that lets you discover, configure, and execute trusted AI workflows — all settled transparently on-chain.

**Core Capabilities:**
- **Workflow Exchange** — Browse 15+ pre-built workflows (Company Intelligence, Marketing Campaigns, Sales Outreach, Vendor Comparisons, and more)
- **Dolphin Free Chat** — Unlimited free AI conversations (you're using it now!)
- **AntSeed Model Marketplace** — Premium models like Claude 3.5 Sonnet, GPT-4o, DeepSeek R1 with per-token metering
- **Nexus Studio** — Visual drag-and-drop workflow builder
- **Agent Builder** — Create autonomous agents with model fallback chains
- **x402 Settlement** — Every paid run generates a machine-readable outcome receipt settled on Base Sepolia

**Getting Started:**
1. Click **Workflow Exchange** in the sidebar to browse available workflows
2. Try running the **Company Intelligence Brief** — enter any company name and get a full strategic report
3. Top up your **Unified AI Balance** to unlock metered premium models`;
  }
  
  if (q.includes('meridian') || q.includes('mrdn') || q.includes('token')) {
    return `**MRDN Token & Meridian Settlement**

- **MRDN** is the incentive alignment token for the Meridian ecosystem
- Every paid workflow run yields **2% MRDN cashback** to your connected wallet
- Settlement occurs on **Base Sepolia** (Chain ID 84532) via the x402 protocol
- The platform charges a **1% top-up fee** (MERIDIAN_TOP_UP_FEE_BPS = 100) on deposits
- Example: Depositing $10.00 → $0.10 fee → $9.90 credited to AI Balance

**x402 Protocol Flow:**
1. Client sends capability request with payment authorization
2. Server validates, executes AI generation, and returns outcome
3. Settlement receipt includes: token counts, model used, cost breakdown, and on-chain tx hash`;
  }
  
  if (q.includes('workflow') || q.includes('exchange') || q.includes('run')) {
    return `**Workflow Exchange — Available Workflows**

| Workflow | Category | Price |
|----------|----------|-------|
| Company Intelligence Brief | Research | $4.99 |
| Marketing Campaign Builder | Marketing | $6.99 |
| Sales Outreach Generator | Sales | $3.99 |
| Vendor Comparison Analyst | Procurement | $7.99 |
| Document Insight Extractor | Research | $5.99 |
| Business Strategy Planner | Strategy | $8.99 |
| Data Analysis Brief | Analytics | $4.99 |

**How to run a workflow:**
1. Navigate to **Workflow Exchange** in the sidebar
2. Click any workflow card to view details
3. Click **Run Workflow** and fill in the input form
4. Receive structured AI-generated results with an outcome receipt`;
  }
  
  if (q.includes('model') || q.includes('antseed') || q.includes('paid') || q.includes('premium')) {
    return `**AntSeed Model Marketplace**

Premium metered models available through unified AI balance:

| Model | Provider | Input $/M | Output $/M |
|-------|----------|-----------|------------|
| Claude 3.5 Sonnet | Anthropic | $3.00 | $15.00 |
| GPT-4o | OpenAI | $2.50 | $10.00 |
| DeepSeek R1 | DeepSeek | $0.55 | $2.19 |
| Gemini 2.5 Flash | Google | $0.15 | $0.60 |
| Llama 3.1 405B | Meta | $0.80 | $0.80 |

Navigate to **AntSeed Model Marketplace** in the sidebar to explore all models, or use **Paid Chat** to test them interactively.`;
  }

  if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('balance')) {
    return `**Pricing & Fee Structure**

- **1% Platform Top-Up Fee**: Applied on all EVM deposits (MERIDIAN_TOP_UP_FEE_BPS = 100)
- **Per-token Model Pricing**: Each AntSeed model has input/output rates per million tokens
- **Free Tier**: Dolphin 8x7B chat is completely free and unmetered
- **Session Budget**: Set a maximum spend limit per session for safety
- **2% MRDN Cashback**: Earned on every paid workflow execution

Top up your balance via **Unified AI Balance** in the sidebar using USDC, ETH, or DAI on Base Sepolia.`;
  }

  if (q.includes('studio') || q.includes('build') || q.includes('create') || q.includes('custom')) {
    return `**Nexus Studio — Custom Workflow Builder**

Build your own multi-step AI workflows:
1. Navigate to **Nexus Studio** in the sidebar
2. Click **Create New Workflow**
3. Define input fields (text, select, number)
4. Configure AI model steps with prompts and output schemas
5. Set pricing, category, and publish to the Exchange

**Tips:**
- Chain multiple AI steps together for complex analysis
- Use the visual workflow graph to see execution flow
- Test with the built-in runner before publishing`;
  }

  if (q.includes('agent') || q.includes('autonomous')) {
    return `**Agent Builder**

Create autonomous AI agents with:
- **Primary Model**: Main reasoning endpoint (e.g., Claude 3.5 Sonnet)
- **Fallback Chain**: Automatic failover to backup models if primary is down
- **Tool Integration**: Connect to external APIs and data sources
- **Budget Controls**: Set per-agent spending limits

Navigate to **Agent Builder** in the sidebar to get started.`;
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! Welcome to Meridian Nexus. I'm your free Dolphin AI assistant.

Here's what I can help with:
- **Explain any Nexus feature** — workflows, models, settlement, agents
- **Guide you through the platform** — where to find things, how to run workflows
- **Answer questions about MRDN, x402, and pricing**
- **Help with technical integration** — API endpoints, SDKs, protocol specs

What would you like to explore?`;
  }

  // General catch-all with actionable guidance
  return `Great question! Here's how I can help you with "${prompt}":

**Quick Actions:**
- 🔍 **Explore Workflows** → Click **Workflow Exchange** in the sidebar
- 💰 **Check Balance** → Go to **Unified AI Balance** to manage funds
- 🤖 **Try Premium Models** → Visit **AntSeed Model Marketplace**
- 🛠 **Build Custom Workflows** → Open **Nexus Studio**
- 📊 **View Run History** → Check **Run Activity** for past results

Ask me anything specific about Nexus features, pricing, settlement, or how to use any capability!`;
}

export { router as chatRouter };
