# Meridian Nexus — AI Capability Marketplace & Intelligence Synthesis Platform

> **Build intelligence. Market capabilities. Synthesize outcomes.**
> *Meridian coordinates value. Nexus coordinates capabilities, workflows, and outcomes. MRDN aligns productive participation.*

---

## 🌟 Overview

**Meridian Nexus** is the application, marketplace, orchestration, and distribution layer built on top of Meridian's payment and settlement infrastructure.

It provides a unified AI operating system where users can:
1. Access the **Dolphin Free Experience** (unmetered, zero cost per prompt AI chat).
2. Discover, compare, and execute models in the **AntSeed Model Marketplace** (Claude 3.5 Sonnet, GPT-4o, DeepSeek R1, Llama 3.3 70B, Gemini 2.5 Flash, Flux 1.1 Pro).
3. Fund a **Universal Dollar AI Balance** across EVM networks (Base, Ethereum, Arbitrum, Polygon, Avalanche) with a configurable **1% Meridian Top-Up Fee (`MERIDIAN_TOP_UP_FEE_BPS=100`)**.
4. Authorize **Session-Based Spending Limits** once without signing a wallet message for every AI prompt.
5. Track **Usage-Based Token Billing** with real-time input/output token metering (`inputCost + outputCost`) and machine-readable outcome receipts.
6. Compose agents in **Agent Builder** and outcome workflows in **Nexus Studio**.
7. Manage enterprise teams, budgets, and member roles in **Organization Dashboard**.

---

## 🛠️ Monorepo Architecture

```
M.NexusPhase1/
├── .github/workflows/deploy.yml # GitHub Actions automated Pages deployment
├── INTEGRATION_STATUS.md       # Operational status matrix (Live vs Testnet vs Mocks)
├── apps/
│   ├── api/                    # Cloudflare Worker API (Hono + D1 Database)
│   └── web/                    # Vite + React + Tailwind + Framer Motion UI
└── packages/
    ├── shared-types/           # Shared TypeScript contracts and entity types
    └── validation/             # Zod validation schemas
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Typecheck & Validate
```bash
npm run typecheck
```

### 3. Launch Development Server
```bash
npm run dev
```
- **Web App**: `http://localhost:5173`
- **API Worker**: `http://localhost:8787` (proxied automatically via `/api`)

---

## 📦 Production Deployment

### Frontend (GitHub Pages)
The web application is automatically built and deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

To trigger a manual production build:
```bash
npm run build
```

### Backend (Cloudflare Workers)
Deploy the API Worker to Cloudflare Workers edge network:
```bash
cd apps/api && npx wrangler deploy
```
Deployed Worker URL: `https://meridian-nexus-api.jrjohnparente.workers.dev`

---

## 📄 License & Attribution

Built on Meridian Infrastructure. All rights reserved.
