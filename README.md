# Meridian Nexus — Front-End Application & AI Capability Marketplace

[![Live Application](https://img.shields.io/badge/LIVE_NEXUS_DEMO-27F293?style=for-the-badge&logo=rocket&logoColor=000)](https://johnparente97.github.io/M.NexusPhase1/)

> **Meridian handles payment, settlement, organization, and value movement.  
> Nexus handles model discovery, chat, workflow orchestration, and user experience.**

---

## 🌟 Overview & Product Positioning

**Meridian Nexus** is the user-facing application, marketplace, orchestration, and distribution layer built on top of Meridian's existing settlement infrastructure.

### Core Value Proposition
- **No Subscription & No KYC**: Instant access to decentralized AI model hosts.
- **Pay Only For What Is Used**: Micro-metered token billing per inference prompt.
- **MRDN Optionality & Fee Benefit**:
  - **Top-Up using MRDN**: **0% top-up fee**
  - **Top-Up using USDC or other supported tokens**: **1% top-up fee**
- **One Top-Up, Zero Repeated Signatures**: Transfer-with-authorization (x402 protocol) funds a session balance so users don't sign a transaction for every message.
- **Decentralized AI First**: Foundation built on decentralized AI model hosts (Dolphin, DeepSeek R1, Llama 3.3 70B, Qwen 2.5 72B, Mistral, Nous Hermes). Centralized models exist as secondary multi-step workflow connectors.

---

## 🛠️ Repository Structure

```
M.NexusPhase1/
├── README.md                           # Product overview & quickstart
├── ARCHITECTURE.md                     # Application architecture & adapter patterns
├── PRODUCT_ALIGNMENT.md                # Meridian vs Nexus boundaries & positioning
├── BACKEND_INTEGRATION_REQUIREMENTS.md # Detailed backend service integration spec
├── MOCKS_AND_GAPS.md                   # Operational vs mocked capabilities matrix
├── QA_TEST_PLAN.md                     # QA test suites & verification checklist
├── HANDOFF.md                          # Handoff guide for Meridian developers
├── CHANGELOG_AUDIT.md                  # Detailed audit log of fixes & refactoring
├── apps/
│   ├── api/                            # Cloudflare Worker API (Hono + D1 Database)
│   └── web/                            # Vite + React 19 + Tailwind CSS UI
└── packages/
    ├── shared-types/                   # Shared TypeScript entity types
    └── validation/                     # Zod validation schemas
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Node.js**: `v18.0.0+` or `v20.0.0+`
- **npm**: `v9.0.0+`

### 1. Install Dependencies
```bash
npm install
```

### 2. Type Check Codebase
```bash
npm run typecheck
```

### 3. Execute Test Suites
```bash
npm test
```

### 4. Build Production Bundle
```bash
npm run build
```

### 5. Start Development Servers
```bash
# Starts both Frontend (Vite) on http://localhost:5173 and Worker API on http://localhost:8787
npm run dev
```

---

## 🔒 Environment Setup

Copy `.env.example` to `.env` in `apps/web/`:
```bash
VITE_API_URL=http://localhost:8787
VITE_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX
VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

Secrets for backend Worker must be set using Wrangler secrets (`wrangler secret put <KEY>`). **Never commit private keys or secrets.**

---

## 📦 Deployment Information

- **Frontend Deployment**: Automated via GitHub Actions `.github/workflows/deploy.yml` to GitHub Pages upon push to `main`.
- **Live Frontend URL**: [https://johnparente97.github.io/M.NexusPhase1/](https://johnparente97.github.io/M.NexusPhase1/)
- **Backend Worker URL**: `https://meridian-nexus-api.jrjohnparente.workers.dev`
