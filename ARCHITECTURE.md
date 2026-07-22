# Architecture & System Boundaries — Meridian Nexus

## 1. Overview & High-Level Architecture

Meridian Nexus follows a decoupled **Adapter Pattern Architecture** separating UI presentation, domain logic, and backend infrastructure.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           MERIDIAN NEXUS UI                             │
│     React 19 + Tailwind CSS + Framer Motion + TanStack React Query      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                             TYPED ADAPTERS                              │
│   src/adapters/antseed/    src/adapters/dolphin/    src/adapters/meridian/
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                        SERVICE & ROUTER LAYER                           │
│   src/services/api-client.ts    src/services/mock-db.ts  model-router.ts│
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                        BACKEND INFRASTRUCTURE                           │
│     Cloudflare Workers (Hono) + D1 Database + Meridian x402 Settlement │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Front-End Layer Architecture (`apps/web/src`)

- **`adapters/`**: Typed domain adapters mapping marketplace catalogs, top-up fee calculations, and model inference requests.
  - `antseed/adapter.ts`: Decentralized AI model host catalog and pricing metadata.
  - `dolphin/adapter.ts`: Free open-weights Dolphin 8x7B chat adapter.
  - `meridian/router.ts`: Multichain top-up calculator (0% MRDN fee, 1% USDC/others) and session authorization limits.
  - `pricing/metering.ts`: Usage metering engine calculating input/output token costs.
- **`config/`**: Centralized configuration.
  - `chain-config.ts`: Multichain CAIP-2 IDs, RPCs, token contract addresses, and top-up fee rates.
  - `feature-flags.ts`: Feature toggles and environment backend integration boundaries.
- **`services/`**: Infrastructure fetch wrappers and fallback engines.
  - `api-client.ts`: Resilient fetch client that automatically routes to local mock simulator if corporate proxies or offline networks block Workers.
  - `mock-db.ts`: In-memory D1 database fallback containing 19 workflows, seed creators, and run simulators.
  - `model-router.ts`: Client-side model routing priorities (Lowest Cost, Lowest Latency, Highest Reliability).
- **`stores/`**: State management via Zustand.
  - `inspector-store.ts`: Synchronizes active selection state across workspace to drive Context Inspector.
  - `theme-store.ts`: Theme preferences.
- **`hooks/`**: Data fetching and wallet custom hooks.
  - `useWallet.tsx`: Wallet connection, balance state, network validation, and mock fallback handlers.
  - `useAuth.ts`: Authentication state wrapper.
  - `useWorkflows.ts`, `useWorkflowRun.ts`, `useFavorites.ts`, `useReviews.ts`: React Query hooks.

---

## 3. Modular Product Areas

1. **Inference Marketplace** (`/marketplace/models`): Browse & compare free & metered decentralized AI model hosts side-by-side.
2. **Inference Chat** (`/chat/free`, `/chat/paid`): Free Dolphin 8x7B chat and metered x402 paid chat with streaming text, low-balance warnings, and model switching notifications.
3. **Wallet & Balance** (`/balance`): Unified AI balance, top-up wizard with 0% MRDN / 1% USDC fee selector, and transaction logs.
4. **Workflows & Marketplace** (`/exchange`, `/workflows/:id/run`): Curated AI workflow marketplace and execution runner.
5. **Studio & Creator** (`/studio`, `/creator`): Visual workflow builder, input/output contract definition, and creator analytics.
6. **Developer & Organization** (`/developer`, `/organization`): Developer API documentation, team member roles, and organization budget quotas.

---

## 4. State & Data Flow

1. **State Management**: Local component state for UI controls, Zustand for workspace inspector state, React Query for server state caching.
2. **Fallback Strategy**: If live worker API endpoints return network errors or proxy blocks, `api-client.ts` catches errors and routes seamlessly to `mock-db.ts` so the user interface remains 100% operational.
