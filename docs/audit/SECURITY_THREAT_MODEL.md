# Nexus Security Threat Model & Defense Architecture

## Overview
This document specifies the security boundaries, threat vectors, and defense controls for the Nexus programmable commerce platform.

---

## 1. Threat Matrix & Defense Controls

| Vulnerability Vector | Risk Level | Threat Scenario | Mitigation Control |
| :--- | :--- | :--- | :--- |
| **Signature Replay** | High | Intercepted payment authorization replayed on multiple requests | CAIP-2 chain binding, nonces, and timestamped idempotency keys |
| **Floating-Point Loss** | Critical | Precision loss during token/fiat balance conversions | Enforce atomic integer math across ledger journal entries |
| **Unverified Status** | High | Mock or failed provider execution returning false success claims | Enforce machine-readable maturity badges & evidence hashes |
| **Prompt / Tool Injection** | High | Malicious workflow input executing unauthorized tools or payment actions | Policy engine evaluation before executing tool, storage, or payment nodes |
| **Secret Leakage** | Critical | Provider API keys or private keys exposed to client bundles | Isolate provider execution inside Cloudflare Worker proxy endpoints |
| **Reentrancy / Double-Spend** | High | Concurrent settlement attempts draining prepaid user accounts | Database transaction locks & double-entry ledger balancing |

---

## 2. Security Principles
1. **Server-Side Policy Decision Engine**: Policy decisions (`allow`, `deny`, `require_action`, `allow_with_limits`) evaluated server-side based on user, organization, jurisdiction, asset, and feature flags.
2. **Evidence-Derived Trust**: Badges generated dynamically from timestamped evidence records (`EvidenceRecord`) rather than static frontend constants.
3. **Strict Environment Boundary**: Development, testnet, and mainnet configurations completely isolated with zero hardcoded production fallbacks.
