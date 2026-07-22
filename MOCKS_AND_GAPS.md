# Mocks and Gaps Matrix — Meridian Nexus

This document tracks operational vs. mocked capabilities, hardcoded assumptions, and required backend connections.

---

## 1. Capability Operational Status Matrix

| Component / Feature | Front-End UI Location | Current Status | Current Behavior | Desired Production Behavior | Priority |
|--------------------|----------------------|----------------|------------------|-----------------------------|----------|
| **Dolphin Free Chat** | `/chat/free` | **OPERATIONAL** (With Fallback) | Streams client completions or calls Worker `/api/chat/completions` | Stream from live open-weights Dolphin worker node | High |
| **AntSeed Model Marketplace** | `/marketplace/models` | **OPERATIONAL** | Displays catalog with filtering & side-by-side comparison modal | Fetch live model status & latency metrics from Meridian registry | High |
| **Top-Up Calculator** | `/balance` | **OPERATIONAL** | Calculates 0% MRDN fee vs 1% USDC fee, simulates credit | Submit EIP-3009 transfer-with-authorization to Meridian Facilitator | High |
| **x402 Paid Chat** | `/chat/paid` | **OPERATIONAL** (With Fallback) | Metered token calculation, low-balance warning, model switcher notice | Live x402 header verification & streaming completions | High |
| **Workflow Exchange** | `/exchange` | **OPERATIONAL** (With Fallback) | 19 seed workflows, search, category chips, collectible cards | Query D1 database `/api/workflows` | High |
| **Workflow Execution** | `/workflows/:id/run` | **OPERATIONAL** (With Fallback) | Simulates multi-step wizard & output section rendering | Execute step DAG on Worker engine | High |
| **Nexus Studio Builder**| `/studio/new` | **OPERATIONAL** | Visual form builder, saves to local storage | Persist workflow manifest & schemas to D1 | Medium |
| **User Balance Service** | `/balance`, `TopNav` | **MOCKED** | Displays $24.50 demo balance | Fetch onchain balance from Meridian Balance Service | High |
| **Organization Management**| `/organization` | **PREVIEW / MOCKED** | Displays team seats & budget quotas | Connect to Meridian Organization & Permissions API | Medium |
| **Developer Console** | `/developer` | **PREVIEW** | Displays API documentation & code snippets | Generate live API keys via Meridian Auth | Low |

---

## 2. Configuration & Mock Mode Flags

Mock mode is controlled via `src/config/feature-flags.ts`:
```typescript
export const FEATURE_FLAGS = {
  useMockApi: true,          // Intercepts network failures and routes to mock-db.ts
  useMockWallet: false,       // Uses connected browser wallet or demo fallback
  useMockInference: true,     // Simulates streaming completions if Worker API is unreachable
  useMockSettlement: true,    // Simulates x402 top-up transaction credits
};
```

---

## 3. High-Priority Backend Connection Dependencies

1. **Meridian Facilitator Top-Up Contract**: Connect `handleExecuteTopUp` in `UnifiedBalancePage.tsx` to live EIP-3009 smart contract.
2. **Streaming AI Completion API**: Provide `POST /api/chat/completions` endpoint for Dolphin 8x7B, DeepSeek R1, Llama 3.3 70B, Qwen 2.5 72B, and Mistral.
3. **Onchain Balance Endpoint**: Connect `GET /api/users/me/balance` to return live USDC & MRDN balances.
