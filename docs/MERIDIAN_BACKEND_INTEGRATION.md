# Meridian Backend Integration Specification — Meridian Nexus

This document defines the complete backend integration requirements, payload schemas, service boundaries, and operational status matrix for the Meridian core development team.

---

## 1. Feature Status Matrix

| Feature / Domain | Front-End Location | Status | Current Mechanism | Desired Backend Integration |
|------------------|-------------------|--------|-------------------|-----------------------------|
| **Dolphin Free Chat** | `/chat/free` | **Frontend Complete (Backend Required)** | Streams simulated chunks via client adapter | Stream live open-weights completions from Dolphin Worker node |
| **AntSeed Model Catalog** | `/marketplace/models` | **Frontend Complete** | Reads static typed catalog with filters & side-by-side comparison modal | Query live model directory & provider health metrics |
| **Model Comparison** | `/marketplace/models` | **Fully Functional** | Modal compares up to 3 selected models on pricing & context | Pure front-end UI state |
| **Top-Up Calculator** | `/balance` | **Frontend Complete** | Calculates **0% fee for MRDN** and **1% fee for USDC / standard tokens** | Submit EIP-3009 transfer-with-authorization to Meridian Facilitator |
| **x402 Metered Paid Chat** | `/chat/paid` | **Frontend Complete (Backend Required)** | Computes token cost receipts & checks low balance | Validate `X-402-Payment-Token` and stream metered completions |
| **Workflow Exchange** | `/exchange` | **Frontend Complete** | 19 seed workflows with expandable search drawer | Query Cloudflare D1 database `/api/workflows` |
| **Workflow Execution** | `/workflows/:id/run` | **Frontend Complete** | Multi-step wizard executing step DAG simulator | Execute step DAG on Worker engine |
| **Nexus Studio Builder** | `/studio/new` | **Frontend Complete** | Form builder, stores manifest in local storage | Save workflow manifest & Zod schemas to D1 |
| **Onchain Balance** | `/balance`, `TopNav` | **Mocked** | Displays $24.50 demo balance | Query `GET /api/users/me/balance` |
| **Organization Enterprise** | `/organization` | **Frontend Complete (Backend Required)** | Displays seat allocation & quotas | Query Meridian Organization & Permissions API |

---

## 2. Integration Endpoint Specifications

### 1. Provider Directory Endpoint
* **Purpose**: List available decentralized model host providers (Antseed, POD, Surplus Intelligence).
* **Frontend Interface**: `src/adapters/antseed/adapter.ts`
* **Required Request Fields**: `GET /api/providers`
* **Expected Response Fields**: `{ data: Array<{ id: string, name: string, status: 'online' | 'degraded', verified: boolean }> }`
* **Auth**: Optional Bearer token.
* **Error States**: 500 Provider Registry Unavailable.
* **Mock File Used**: `src/adapters/antseed/adapter.ts`
* **Dependent Components**: `ModelMarketplace.tsx`, `PaidChat.tsx`

### 2. Model Catalog Endpoint
* **Purpose**: Retrieve model definitions, capabilities, and token pricing rates.
* **Frontend Interface**: `ANTSEED_MODEL_CATALOG`
* **Required Request Fields**: `GET /api/models?hostType=decentralized-host`
* **Expected Response Fields**: `{ data: AntSeedModel[] }`
* **Auth**: Public / Optional Bearer.
* **Mock File Used**: `src/adapters/antseed/adapter.ts`
* **Dependent Components**: `ModelMarketplace.tsx`, `PaidChat.tsx`

### 3. Model Pricing Endpoint
* **Purpose**: Query live input and output token rates ($/1M tokens).
* **Frontend Interface**: `MeteringEngine` (`src/adapters/pricing/metering.ts`)
* **Required Request Fields**: `GET /api/models/:id/pricing`
* **Expected Response Fields**: `{ modelId: string, priceInputPerMillion: number, priceOutputPerMillion: number, isFree: boolean }`
* **Dependent Components**: `PaidChat.tsx`, `WorkflowRunner.tsx`

### 4. Provider Health Endpoint
* **Purpose**: Check real-time latency, throughput (t/s), and uptime status.
* **Frontend Interface**: `src/adapters/antseed/adapter.ts`
* **Required Request Fields**: `GET /api/providers/:id/health`
* **Expected Response Fields**: `{ providerId: string, latencyMs: number, tokensPerSecond: number, status: 'healthy' }`

### 5. Free vs. Paid Model Status
* **Purpose**: Distinguish unmetered free models (Dolphin 8x7B) from x402 metered models.
* **Frontend Interface**: `AntSeedModel.isFree`
* **Dependent Components**: `DolphinChat.tsx`, `PaidChat.tsx`

### 6. Inference Request Endpoint
* **Purpose**: Send prompt payload to selected decentralized model host.
* **Frontend Interface**: `fetchApi('/api/chat/completions')`
* **Required Request Fields**: `{ model: string, mode: string, messages: Array<{ role: string, content: string }> }`
* **Expected Response Fields**: `{ choices: [{ message: { content: string } }], usage: { prompt_tokens: number, completion_tokens: number } }`
* **Headers**: `X-402-Payment-Token: x402-session-<timestamp>-<uuid>`

### 7. Streaming Protocol
* **Purpose**: Stream text tokens from worker node to client.
* **Format**: Server-Sent Events (`text/event-stream`) or HTTP chunked transfer encoding.
* **Chunk payload**: `data: {"choices": [{"delta": {"content": "text"}}], "usage": {...}}`
* **Dependent Components**: `PaidChat.tsx`, `DolphinChat.tsx`

### 8. Usage Metering Endpoint
* **Purpose**: Record input/output token consumption and deduct from user balance.
* **Frontend Interface**: `MeteringEngine.calculateRequestCost`
* **Required Request Fields**: `POST /api/metering/receipt` `{ requestId: string, inputTokens: number, outputTokens: number, totalCost: number }`

### 9. Balance Endpoint
* **Purpose**: Retrieve current user available AI balance and lifetime spend.
* **Frontend Interface**: `useWallet.tsx`
* **Required Request Fields**: `GET /api/users/me/balance`
* **Expected Response Fields**: `{ availableBalanceUsdc: number, lifetimeSpendUsdc: number, mrdnCashbackBalance: number }`

### 10. Top-Up Quote Endpoint
* **Purpose**: Compute net credited USDC balance and top-up fee (0% for MRDN, 1% for USDC).
* **Frontend Interface**: `MeridianRouterAdapter.calculateTopUp`
* **Required Request Fields**: `POST /api/topup/quote` `{ tokenSymbol: string, amount: number, chainId: number }`
* **Expected Response Fields**: `TopUpCalculation` JSON payload.

### 11. Top-Up Transaction Endpoint
* **Purpose**: Submit signed EIP-3009 transfer-with-authorization to Meridian Facilitator contract.
* **Frontend Interface**: `UnifiedBalancePage.tsx`
* **Required Request Fields**: `POST /api/topup/submit` `{ tokenSymbol: string, amount: number, txHash: string, chainId: number }`

### 12. Payment Authorization Endpoint
* **Purpose**: Authorize a session budget limit (e.g. $5.00) without per-message signatures.
* **Frontend Interface**: `MeridianRouterAdapter.createDefaultSessionAuth`

### 13. Settlement Endpoint
* **Purpose**: Finalize x402 micropayment settlement between user and provider node.
* **Frontend Interface**: `POST /api/settlement/:runId/settle`

### 14. Receipt Endpoint
* **Purpose**: Generate machine-readable outcome receipt for completed inference or workflow run.
* **Frontend Interface**: `OutcomeReceiptModal.tsx`, `RunDetail.tsx`

### 15. Transaction History Endpoint
* **Purpose**: Fetch historical top-ups, inference charges, and receipts.
* **Frontend Interface**: `UnifiedBalancePage.tsx`, `Activity.tsx`

### 16. Provider Verification Data
* **Purpose**: Retrieve cryptographic verification proof of open-weights host execution.
* **Frontend Interface**: `AntSeedModel.trustScore`

### 17. Supported Networks
* **Supported Chains**: Base Sepolia (`84532`), Base Mainnet (`8453`), Ethereum (`1`), Arbitrum (`42161`), Polygon (`137`), Avalanche (`43114`).

### 18. Supported Settlement Assets
* **Supported Assets**: USDC (primary 1% fee asset), MRDN (0% fee benefit asset), WETH, USDT.

---

## 3. Security Considerations & Best Practices

1. **Secret Isolation**: Private keys, API keys, and secret tokens must remain in Cloudflare Worker secrets (`wrangler secret put <KEY>`) or `.env` files excluded from git.
2. **EIP-3009 Security**: Transfer-with-authorization signatures must specify nonces and deadlines to prevent replay attacks.
3. **Parametric SQL Queries**: All D1 database queries must use bound parameters (`db.prepare(...).bind(...)`).
