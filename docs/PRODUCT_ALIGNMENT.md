# Product Alignment & Infrastructure Boundaries — Meridian Nexus

## 1. System Responsibilities

Nexus is the application and presentation layer. Meridian is the infrastructure and settlement layer.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           MERIDIAN INFRASTRUCTURE                       │
│  • x402 Facilitator                • Settlement Infrastructure          │
│  • Organization & Permissions      • Command Centre                     │
│  • Marketplace Mode                • Mpay                               │
│  • MRDN Incentives                 • Wallet & Transaction Infrastructure│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (Underlying Infrastructure)
┌────────────────────────────────────▼────────────────────────────────────┐
│                             MERIDIAN NEXUS                              │
│  • User Experience & UI            • Decentralized AI Model Discovery   │
│  • Model Comparison & Chat          • Workflow Orchestration             │
│  • Usage Visibility & Metering     • Provider Transparency              │
│  • Trust & Verification Specs       • Creator & Developer Tools          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Core Product Principles

### A. MRDN Token Utility & Positioning
- **MRDN is OPTIONAL**: Users are never required to hold or pay with MRDN to access inference models, chat, or workflows.
- **Top-Up Utility Model**:
  - **Top-Up using MRDN**: **0% top-up fee**
  - **Top-Up using USDC or standard assets**: **1% top-up fee**
- No fake MRDN staking, rewards lock-ups, or token governance pressure.

### B. Decentralized AI Model Host Foundation
- The primary chat & inference marketplace experience is built on **decentralized AI model hosts** (Dolphin 8x7B, DeepSeek R1, Llama 3.3 70B, Qwen 2.5 72B, Mistral, Nous Hermes 3).
- Centralized models (e.g. OpenAI / Claude) are treated as optional secondary workflow connectors, not the primary chat foundation.

### C. No Subscriptions & No KYC
- No monthly recurring subscription paywalls.
- No mandatory KYC for core inference.
- Users fund an AI balance via multichain wallet top-up and pay only for actual input/output token usage.

### D. Single Top-Up, Zero Repeated Signatures
- Users authorize a session balance once using EIP-3009 transfer-with-authorization (x402 protocol).
- Users do NOT need to sign a wallet transaction for every chat message or workflow execution.

---

## 3. Product Area Separation

- **Inference Marketplace** (`/marketplace/models`): Decentralized model discovery & side-by-side comparison.
- **Inference Chat** (`/chat/free`, `/chat/paid`): Dolphin free chat & metered x402 paid chat.
- **Wallet & Balance** (`/balance`): Unified AI balance & top-up fee wizard (0% MRDN / 1% USDC).
- **Workflows & Studio** (`/exchange`, `/studio`): Multi-step AI workflow creation & execution separate from basic inference chat.
- **Developer & Organization** (`/developer`, `/organization`): Developer API docs and team organization settings.
