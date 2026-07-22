# Technical Handoff Package — Meridian Development Team

## 1. Executive Summary

This handoff package prepares **Meridian Nexus Phase 1** for complete integration by the Meridian core development team.

The application has been audited, optimized, type-checked, and equipped with clean typed adapter boundaries.

---

## 2. What Is Operational vs. What Needs Connection

### Operational (Front-End Ready)
- **Decentralized AI Model Marketplace** (`/marketplace/models`): Filterable model catalog with side-by-side comparison modal.
- **Inference Chat Engine** (`/chat/free`, `/chat/paid`): Free Dolphin 8x7B chat & metered x402 paid chat with streaming text, low-balance warnings, and model switching notifications.
- **Multichain Top-Up Calculator** (`/balance`): Top-up wizard applying **0% top-up fee for MRDN** and **1% top-up fee for USDC / other tokens**.
- **Workflow Exchange** (`/exchange`): Hero section, natural language search suggestions, collectible category cards, and expandable filters drawer.
- **Nexus Studio Builder** (`/studio/new`): Visual workflow form builder and contract definition tool.
- **Offline Client Fallback System** (`src/services/api-client.ts` & `mock-db.ts`): Gracefully handles proxy blockades and offline environments.

### Needs Meridian Backend Connection
1. **x402 Facilitator Smart Contract**: Replace simulated transaction handler in `UnifiedBalancePage.tsx` with live EIP-3009 transfer-with-authorization calls.
2. **Streaming AI Completion Worker**: Connect `POST /api/chat/completions` to live inference worker nodes for Dolphin 8x7B, DeepSeek R1, Llama 3.3 70B, Qwen 2.5 72B, and Mistral.
3. **Onchain Balance API**: Replace static balance state with `GET /api/users/me/balance`.

---

## 3. Recommended Integration Sequence

1. **Sprint Step 1: Environment & API Base URL Setup**
   - Point `VITE_API_URL` in `apps/web/.env` to the Meridian staging API Worker.
2. **Sprint Step 2: Onchain Balance & Wallet Connection**
   - Connect `useWallet.tsx` to live wagmi/viem provider for Base Mainnet & Base Sepolia.
   - Wire `GET /api/users/me/balance` to return live USDC & MRDN balances.
3. **Sprint Step 3: Top-Up Submission**
   - Connect `handleExecuteTopUp` in `UnifiedBalancePage.tsx` to Meridian Facilitator contract.
4. **Sprint Step 4: Streaming Inference Chat**
   - Connect `POST /api/chat/completions` in `PaidChat.tsx` and `DolphinChat.tsx` to live Worker model endpoints.
5. **Sprint Step 5: D1 Workflow Persistence**
   - Connect `useWorkflows.ts` to live Cloudflare D1 database.

---

## 4. Required Environment Variables

```bash
# Frontend (apps/web/.env)
VITE_API_URL=https://meridian-nexus-api.jrjohnparente.workers.dev
VITE_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA

# Backend Secrets (wrangler secret put)
GEMINI_API_KEY=your-gemini-key
CLERK_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX
CLERK_JWT_KEY=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA...
```
