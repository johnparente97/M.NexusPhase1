# Nexus Product Gap Analysis

## Overview
This document compares claimed platform capabilities against verified codebase implementations, establishing explicit integration maturity ratings across all product surfaces.

---

## 1. Maturity Matrix

| Capability Category | Target Surface | Current Status | Maturity Rating | Action Required |
| :--- | :--- | :--- | :--- | :--- |
| **AI Model Chat** | `/explore`, `/chat` | Active Stream Adapter | `sandbox` / `beta` | Connect normalized Gemini & OpenAI-compatible provider adapters |
| **Workflow Execution** | `/compose`, `/operate` | React Graph & State Machine | `sandbox` | Implement durable state machine & worker retry queue |
| **Cloud Storage** | `/cloud`, `/operate` | Simulated Local Upload | `mock` / `demo` | Connect S3 / Filecoin ecosystem storage adapters with client-side encryption |
| **Compute Pools** | `/explore`, `/network` | Simulated Lease Allocator | `mock` / `demo` | Connect Akash compute provider registry adapter |
| **x402 Micropayments** | `/operate`, `/payments` | Bespoke EIP-3009 Helper | `testnet` | Upgrade to x402 v2 protocol & Circle Gateway Nanopayments adapter |
| **Prepaid Balances** | `/operate`, `/payments` | React Local Storage State | `sandbox` | Build double-entry ledger journal with atomic integer accounting |
| **Provider Registry** | `/network/provider` | Hardcoded Market Fixtures | `demo` | Implement normalized Capability Registry & health checks |
| **Staking & Bonds** | `/network/stake` | Specification / UI Mock | `planned` | Document 4-purpose staking model (`access`, `bond`, `curation`, `governance`) |

---

## 2. Information Architecture Alignment

### Legacy Hierarchy vs Consolidated 4-Surface Architecture
- **Legacy (14 Peer Items)**: Chat, Missions, Explore, Workflows, Studio, Agents, Cloud, Compute, Payments, Activity, Teams, Provide, Developer, Docs.
- **Consolidated (4 Core Surfaces + Supporting Utilities)**:
  1. **Explore (`/explore`)**: Universal discovery for Models, Agents, Workflows, Storage, Compute, and APIs.
  2. **Compose (`/compose`)**: Guided (templates) & Advanced (Workflow Studio & Agent Builder) creation.
  3. **Operate (`/operate`)**: Operational command center for Active Runs, Assets, Budgets, Receipts, and Team Controls.
  4. **Earn & Govern (`/network`)**: Network operations for Providers, Security Bonds, Staking Tiers, Reputation, and Governance.
  5. **Supporting Utilities**: Developer Console (`/developer`), Docs (`/docs`), Trust Center (`/trust`), Settings (`/settings`).
