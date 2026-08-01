# NEXUS Architecture & Production Handoff Specification

## 1. System Overview & Core Vision

Nexus is the user-facing application, marketplace, orchestration, and distribution layer for programmable digital services. It sits above underlying Web3, AI, compute, storage, and financial infrastructure—turning low-level protocols into an intuitive, polished operating environment.

Nexus operates across six core platform pillars:
1. **Discover**: Models, Agents, Workflows, APIs, Storage Providers, Compute Nodes, DeFi Tools.
2. **Build**: Dual-mode (Guided & Advanced) Workflow Studio, Agent Builder, Logic, Budgets, Permissions.
3. **Run**: Execution Engine, Live Activity, Non-Intrusive Streaming Output with "Jump to Latest" control.
4. **Pay**: Meridian x402 Micro-settlements, Unified AI Vault, Spending Policies, Multi-chain Settlement (Base, Arbitrum, Solana).
5. **Store**: Multi-cloud, Decentralized, Zero-Knowledge Encrypted Storage (Filecoin, Arweave, AWS S3, Storj) + PC Gaming Save & Mod Protection.
6. **Trust**: Security Audits, Privacy Controls, Jurisdiction Availability Matrix, Legal Governance Framework.

---

## 2. Route Map & Application Architecture

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Landing.tsx` | Homepage strategy: Hero, Capability Gateway, Marketplace Preview, How it Works, Trust, Developer CTA. |
| `/marketplace/models` | `ModelMarketplace.tsx` | AI & Machine Services Marketplace with Sandbox testing drawer. |
| `/exchange` | `Exchange.tsx` | Workflow Capability Exchange & Provider Listings. |
| `/studio` | `Studio.tsx` & `StudioEditor.tsx` | Dual-mode (Guided & Advanced) Visual & Code Workflow Builder. |
| `/storage` | `StorageMarketplace.tsx` | Storage Marketplace comparing providers + PC Gaming Save & Mod Cloud Protection. |
| `/compute` | `ComputeMarketplace.tsx` | Infrastructure Hub for GPU hardware (H100, RTX 4090), serverless, and confidential compute. |
| `/defi` | `DeFiHub.tsx` | Curated DeFi Hub with portfolio overview, asset balances, yield discovery, and risk disclosures. |
| `/trust` | `TrustCenter.tsx` | Trust & Compliance Center: Security, Privacy, Jurisdiction Availability Matrix, Legal Modals. |
| `/balance` | `UnifiedBalancePage.tsx` | AI Vault, Top-Up, x402 micropayments, and transaction history. |
| `/activity` | `Activity.tsx` & `RunDetail.tsx` | Execution timeline, runtime logs, and transaction receipts. |
| `/organization` | `OrgDashboard.tsx` | Team workspaces, role permissions, and organization budget controls. |
| `/developer` | `DevConsole.tsx` | Developer console for API keys, SDKs, webhooks, and provider revenue analytics. |
| `/docs` | `DocsPage.tsx` | Complete documentation and API references. |

---

## 3. Data Model Entities

The platform is structured around the following typed entities:
* **User & Profile**: Multi-auth state (SIWE, Passkeys, Social, Enterprise SSO).
* **Organization & Workspace**: RBAC permissions, daily spend caps, team audit logs.
* **Capability & Listing**: Models, Agents, Workflows, APIs, Storage Adapters, Compute Nodes.
* **Workflow & Execution**: Step graphs, approval thresholds, retry logic, streaming outputs.
* **Storage Object**: File name, version history, encryption status, retention policy, PC gaming metadata.
* **Compute Job**: Container payload, hardware specs (H100, A100, RTX 4090), latency SLA, carbon score.
* **Agent Spending Policy**: Session limit, daily limit, human approval threshold, emergency stop switch.
* **Transaction & Invoice**: Meridian x402 payment hashes, network fees, provider revenue splits.

---

## 4. Integration Boundaries & Adapters

1. **Meridian x402 Protocol**:
   - Payments settled via gasless Mpay and micropayments.
   - Endpoint fallback mocks built in `src/adapters/meridian/`.

2. **Web3 Wallets & Networks**:
   - Multi-chain support for Base, Arbitrum, and Solana.
   - Self-custody signature disclosures before transaction confirmation.

3. **Storage Network Adapters**:
   - Provider-agnostic interfaces for Filecoin, Arweave, AWS S3, and Storj DCS.
   - Zero-knowledge client-side AES-256-GCM encryption before network transit.

4. **Compute Providers**:
   - Hardware comparison engine monitoring VRAM, latency (ms), green power %, and TEE confidential enclaves.

---

## 5. Compliance & Security Matrix

* **Jurisdiction Matrix**: Enforces country-level feature availability (US, EU, UK, JP, OFAC).
* **Privacy & Data Governance**: GDPR/CCPA compliance, zero AI model training on private customer data.
* **DeFi Disclosures**: Non-custodial risk panel and protocol verification badges.
* **Accessibility**: WCAG 2.2 AA compliance (keyboard navigation, focus states, high contrast).

---

## 6. Production Readiness Checklist

- [x] Codebase builds without errors (`npm run build`).
- [x] All 6 Platform Pillars fully integrated into router and navigation.
- [x] Dark / Light / System theme parity maintained.
- [x] Non-intrusive streaming output panel with "Jump to Latest" scroll handling.
- [x] Storage Marketplace with PC Gaming Save & Mod protection POC.
- [x] Compute Marketplace with H100/RTX 4090 GPU comparison.
- [x] DeFi Hub with risk panel and non-custodial boundaries.
- [x] Trust Center with Jurisdiction Matrix and Legal Modals.
- [x] Command Palette (`⌘K`) universal search.
