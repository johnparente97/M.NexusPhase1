# Changelog & Audit Summary — Meridian Nexus

## 1. Audit Overview

A comprehensive audit was performed across the entire Meridian Nexus codebase covering product positioning, top-up fee rules, decentralized AI model prioritization, front-end architecture, bugs, accessibility, responsiveness, testing, and backend handoff readiness.

---

## 2. Changes & Enhancements Completed

### Product Alignment & Positioning
- **MRDN Token Optionality & Fee Benefit**:
  - Configured `chain-config.ts` and `router.ts` so that **MRDN top-ups incur a 0% top-up fee**, while **USDC and other assets incur a 1% top-up fee**.
  - Updated `UnifiedBalancePage.tsx` with a clear fee utility information banner explaining this benefit without creating mandatory token pressure.
- **Decentralized AI Model Host Prioritization**:
  - Updated `ANTSEED_MODEL_CATALOG` in `src/adapters/antseed/adapter.ts` to place **decentralized AI model hosts** (Dolphin 8x7B, DeepSeek R1, Llama 3.3 70B, Qwen 2.5 72B, Mistral, Nous Hermes 3) as the primary foundation of the inference marketplace.
  - Positioned centralized model providers (Claude, GPT-4o) as optional secondary workflow connectors.

### User Experience Elevate
- **Inference Chat Enhancements** (`PaidChat.tsx`):
  - Defaulted initial model selection to `deepseek-r1` (decentralized reasoning model).
  - Added **Low Balance Warning Banner** (`<$0.50`) with direct link to `/balance`.
  - Added **Model Switcher Context Notice** ("Switched model to [Name]. Context retained.") when changing models.
- **Model Marketplace Enhancements** (`ModelMarketplace.tsx`):
  - Added **Host Type Filtering** (`Decentralized Hosts`, `Open-Weights Nodes`, `Workflow Connectors`).
  - Implemented **Side-by-Side Model Comparison Modal** allowing users to select and compare up to 3 models on cost, speed, context window, and trust score.

### Architecture & Service Boundaries
- **Centralized Feature Flags** (`src/config/feature-flags.ts`):
  - Created centralized environment & feature flag settings (`useMockApi`, `useMockWallet`, `useMockInference`, `useMockSettlement`).
- **Test Coverage & Verification**:
  - Created `apps/web/src/adapters/meridian/router.test.ts` testing MRDN 0% top-up fee vs USDC 1% top-up fee calculations.
  - Created `apps/web/src/adapters/pricing/metering.test.ts` testing input/output token metering formulas.
  - Configured root `package.json` test runner executing vitest suites across both `apps/api` and `apps/web`.

---

## 3. Validation Results

- **`npm run typecheck`**: Passed (`0 errors`).
- **`npm test`**: Passed (6 tests across 3 files: `router.test.ts`, `metering.test.ts`, `payment-crypto.test.ts`).
- **`npm run build`**: Passed cleanly in **2.68s**.
