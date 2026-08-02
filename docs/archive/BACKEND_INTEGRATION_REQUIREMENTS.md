# Backend Integration Requirements — Meridian Developer Handoff

This document details the exact endpoints, data contracts, authentication rules, and events required by the Meridian backend team to replace mock adapters with production services.

---

## 1. Integration Endpoint Specification Matrix

| Integration Domain | Front-End Component / Hook | Required Endpoint / Method | Request Payload | Response Payload | Auth / Headers |
|-------------------|----------------------------|----------------------------|-----------------|------------------|----------------|
| **Model Catalog** | `ModelMarketplace.tsx`, `useWorkflows.ts` | `GET /api/models` | Query params: `category`, `search`, `isFree`, `hostType` | `{ data: AntSeedModel[] }` | Optional Bearer |
| **Top-Up Quote** | `UnifiedBalancePage.tsx`, `router.ts` | `POST /api/topup/quote` | `{ tokenSymbol, amount, chainId }` | `TopUpCalculation` JSON | Optional Bearer |
| **Top-Up Execute** | `UnifiedBalancePage.tsx` | `POST /api/topup/submit` | `{ tokenSymbol, amount, txHash, chainId }` | `{ success: boolean, newBalance: number, receiptId: string }` | Required Bearer / Auth |
| **User Balance** | `TopNav.tsx`, `useWallet.tsx` | `GET /api/users/me/balance` | None | `{ availableBalanceUsdc: number, lifetimeSpendUsdc: number, mrdnCashbackBalance: number }` | Required Bearer |
| **Streaming Chat** | `PaidChat.tsx`, `DolphinChat.tsx` | `POST /api/chat/completions` | `{ model: string, mode: string, messages: Message[] }` | Server-Sent Events (SSE) or JSON stream: `{ choices: [{ message: { content } }] }` | Header: `X-402-Payment-Token` |
| **Usage Metering** | `PaidChat.tsx`, `RunDetail.tsx` | `POST /api/metering/receipt` | `{ requestId, inputTokens, outputTokens, modelId }` | `MeteredRequestReceipt` JSON | Required Bearer |
| **Workflow Catalog**| `Exchange.tsx`, `WorkflowDetail.tsx` | `GET /api/workflows` | Query params: `category`, `search`, `sort`, `page` | `{ data: Workflow[] }` | Optional Bearer |
| **Workflow Run** | `WorkflowRunner.tsx` | `POST /api/workflows/:id/run` | `{ inputs: Record<string, any> }` | `WorkflowRun` object with step status telemetry | Required Bearer |

---

## 2. Token Utility & Fee Calculation Contracts

### Top-Up Fee Business Rules
- **MRDN Token Deposit**: Top-up fee = **0% (0 BPS)**
- **USDC / Standard Asset Deposit**: Top-up fee = **1% (100 BPS)**

### Production Fee Calculation Contract
```typescript
export interface TopUpCalculation {
  depositAmount: number;
  sourceSymbol: string;
  sourceChainId: number;
  conversionRateUsd: number;
  grossUsdValue: number;
  meridianTopUpFeeUsd: number; // $0.00 for MRDN, 1% for USDC
  feeBps: number;              // 0 for MRDN, 100 for USDC
  feePercentageDisplay: string;
  isMrdnZeroFeeBenefit: boolean;
  estimatedNetworkFeeUsd: number;
  slippageUsd: number;
  netCreditedUsdc: number;
}
```

---

## 3. x402 Micropayment Header Requirements

For paid inference requests, the front-end includes:
- `Authorization: Bearer <token>`
- `X-402-Payment-Token: x402-session-<timestamp>-<uuid>`
- `X-Nexus-Accept-ToS: true`

Expected response status on insufficient balance:
- `HTTP 402 Payment Required`
- Response body: `{ error: { code: "INSUFFICIENT_BALANCE", message: "AI balance too low. Please top up at /balance", requiredUsdc: 0.05 } }`

---

## 4. Real-Time Streaming Inference Specification

For `POST /api/chat/completions`:
- Must support HTTP chunked transfer encoding or Server-Sent Events (`text/event-stream`).
- Format per chunk:
```json
data: {"id": "chatcmpl-123", "choices": [{"delta": {"content": "Hello"}}]}
```
- Final chunk:
```json
data: {"id": "chatcmpl-123", "choices": [{"delta": {"content": ""}}], "usage": {"prompt_tokens": 14, "completion_tokens": 82}}
```
