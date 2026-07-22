# QA Test Plan & Verification Checklist — Meridian Nexus

This QA test plan outlines the critical user journeys, automated test coverage, manual verification steps, and regression checklists for Meridian Nexus.

---

## 1. Automated Test Coverage

### Test Commands
```bash
# Run all vitest unit & component test suites
npm test

# Run TypeScript static type verification
npm run typecheck

# Verify production build compilation
npm run build
```

### Automated Unit Test Suites (`npm test`)
- `apps/web/src/adapters/meridian/router.test.ts`:
  - Verify **0% top-up fee** calculation for MRDN token deposits.
  - Verify **1% top-up fee** calculation for USDC token deposits.
  - Verify net credited balance math across EVM chains.
- `apps/web/src/adapters/pricing/metering.test.ts`:
  - Verify zero cost for free model inference requests.
  - Verify input and output token cost formula: `(tokens / 1,000,000) * pricePerMillion`.
- `apps/api/src/services/payment-crypto.test.ts`:
  - Verify payment signature verification logic on backend worker.

---

## 2. Critical User Journey Verification Matrix

| User Journey | Key Steps | Expected Behavior | Verification Status |
|--------------|-----------|-------------------|---------------------|
| **1. Wallet Connection** | Click `Connect Wallet` in TopNav | Connects Web3 wallet or allows Demo User login | **PASSED** |
| **2. Model Marketplace** | Navigate to `/marketplace/models` | Displays model cards; filters by category/host; allows model comparison | **PASSED** |
| **3. Model Comparison** | Click `+ Compare` on 2+ models | Opens side-by-side comparison modal with costs, latency, trust scores | **PASSED** |
| **4. Dolphin Free Chat** | Navigate to `/chat/free` | Streams free chat completions without requiring wallet signature or payment | **PASSED** |
| **5. Metered Paid Chat** | Navigate to `/chat/paid` | Displays model selector, reasoning mode, rates, streaming, and low-balance alerts | **PASSED** |
| **6. Model Switcher** | Select a new model in `/chat/paid` | Displays context retention banner ("Switched model to [Name]. Context retained.") | **PASSED** |
| **7. Top-Up Wizard** | Navigate to `/balance` | Displays available balance, token selector (MRDN 0% fee / USDC 1% fee), confirms deposit | **PASSED** |
| **8. Workflow Exchange** | Navigate to `/exchange` | Hero section, suggested search pills, collectible cards, expandable filter drawer | **PASSED** |
| **9. Workflow Runner** | Select workflow & click `Run` | Opens multi-step wizard, accepts parameters, executes simulated step DAG | **PASSED** |
| **10. Mobile Responsive**| Resize viewport to 375px mobile | TopNav collapses into mobile nav; cards stack without horizontal overflow | **PASSED** |

---

## 3. Regression Checklist

- [x] `npm run build` compiles with 0 errors.
- [x] `npm run typecheck` passes with 0 errors.
- [x] `npm test` runs 6 tests across 3 files with 0 failures.
- [x] Top-up fee displays 0% for MRDN deposits and 1% for USDC deposits.
- [x] Primary chat product features decentralized AI model hosts.
- [x] Context Inspector updates dynamically upon selecting workflows or runs.
- [x] Dark mode colors and visual contrast adhere to design system guidelines.
