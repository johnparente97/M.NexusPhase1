# Meridian Nexus — Integration Status Matrix

This document provides complete transparency regarding the operational status of all Meridian settlement, AI model provider, and wallet integration capabilities in Meridian Nexus.

---

## 🟢 1. Live Production Integrations

| Feature / Capability | Operational Status | Underlying Infrastructure | Notes |
| :--- | :--- | :--- | :--- |
| **Dolphin Free Experience** | **LIVE** | Dolphin Open Intelligence (Mixtral 8x7B) | Unmetered, 100% free streaming completions for all community members. |
| **AntSeed Model Marketplace** | **LIVE** | AntSeed Gateway / Open Model Protocols | Catalog of 8+ models (Claude 3.5 Sonnet, GPT-4o, DeepSeek R1, Llama 3.3 70B, Gemini 2.5 Flash, Flux 1.1 Pro). |
| **Usage-Based Token Metering** | **LIVE** | `MeteringEngine` (Vite / TypeScript) | Calculates input & output token pricing per 1M tokens: `(tokens/1,000,000) * pricePerMillion`. |
| **Web3 Wallet Connectivity** | **LIVE** | viem / window.ethereum / EIP-1193 | Full support for MetaMask, Coinbase Wallet, SIWE (`personal_sign`), and EIP-712 payment authorization. |
| **Simulated Testnet Fallback** | **LIVE** | Injected Provider Guard | Automatic simulated testnet wallet fallback (`0x71C7...976F`) for extensionless browsers (Safari). |
| **Cloudflare Worker Backend** | **LIVE** | Cloudflare Workers + D1 Database | Deployed to `https://meridian-nexus-api.jrjohnparente.workers.dev`. |

---

## 🟡 2. Testnet / Sandbox Integrations

| Feature / Capability | Operational Status | Testnet Environment | Notes |
| :--- | :--- | :--- | :--- |
| **Multichain AI Balance Top-Up** | **TESTNET** | Base Sepolia (Chain ID: `84532`) | Calculates gross deposit, 1% Meridian Top-Up Fee (`MERIDIAN_TOP_UP_FEE_BPS=100`), gas, slippage, and credits USDC. |
| **x402 Facilitator Settlement** | **TESTNET** | Meridian Base Sepolia Facilitator | EIP-712 TransferWithAuthorization payload signing for 1% protocol fee / 99% creator split. |
| **MRDN Cashback Allocation** | **TESTNET** | Meridian Base Cashback Router | Calculates 2% base MRDN cashback token rewards per completed paid outcome run. |
| **Session Spending Authorization** | **TESTNET** | `MeridianRouterAdapter` | Secure session budget caps ($5.00 limit, max cost/request, daily limit) with zero private key exposure. |

---

## 🔵 3. Extensible Adapters (Ready for Production Credentials)

| Feature / Capability | Adapter Location | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Solana Settlement Router** | `config/chain-config.ts` | Planned Adapter | Configured for Solana Mainnet SPL-USDC; ready to plug in `@solana/web3.js` wallet adapter. |
| **Circle Nanopayments** | `adapters/meridian/router.ts` | Planned Adapter | Ready for micro-cent batched HTTP settlement via Circle Gateway API. |
| **Enterprise SSO & SAML** | `pages/OrgDashboard.tsx` | UI Ready | Role-based access control (Owner, Admin, Developer, Finance, Creator, User, Viewer) ready for Clerk SAML. |

---

## 🔒 Security & Privacy Notice

- **No Private Keys**: Private keys are never requested, stored, or transmitted by the application.
- **No Secret Leakage**: All client-side environment variables (`VITE_*`) are non-sensitive public configs. API secrets reside safely inside Cloudflare Workers `.dev.vars`.
