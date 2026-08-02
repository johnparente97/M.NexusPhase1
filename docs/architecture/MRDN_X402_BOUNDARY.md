# MRDN x402 Facilitator Boundary Specification

## Boundary Overview
MRDN is integrated into Nexus solely as an x402 payment facilitator for eligible transactions. MRDN is not the parent product, infrastructure owner, marketplace operator, or Nexus brand.

---

## Responsibility Matrix

| Responsibility | Owner |
|---|---|
| Marketplace UI & Discovery | **Nexus** |
| Agent & Workflow Listings | **Nexus** |
| Pricing & Creator Margins | **Nexus** |
| Creator Revenue Logic | **Nexus** |
| Agent Execution & Orchestration | **Nexus** |
| Usage Accounting & Itemized Receipts | **Nexus** |
| Refund & Dispute Workflows | **Nexus** |
| x402 Payment Authorization Verification | **MRDN** |
| Settlement Facilitation & Status | **MRDN** |
| Facilitator Transaction Receipt Data | **MRDN** |

---

## Adapter Interface Boundary

All MRDN facilitator interactions are strictly encapsulated behind the `X402FacilitatorAdapter` contract in `@nexus/shared-types`:

```ts
export interface X402FacilitatorAdapter {
  getCapabilities(): Promise<FacilitatorCapabilities>;
  createPaymentRequirements(request: PaymentRequirementRequest): Promise<PaymentRequirements>;
  verifyAuthorization(authorization: PaymentAuthorization): Promise<VerificationResult>;
  settle(authorization: PaymentAuthorization): Promise<SettlementResult>;
  getSettlementStatus(settlementId: string): Promise<'pending' | 'settled' | 'failed'>;
  getReceipt(settlementId: string): Promise<FacilitatorReceipt>;
}
```

The Nexus core application logic interacts exclusively with this interface via `MrdnFacilitatorAdapter` (`apps/api/src/providers/settlement/mrdn-adapter.ts`).

---

## Branding Rules
MRDN attribution appears only contextually in payment-related interfaces:
- "Payment facilitated through MRDN"
- "x402 settlement facilitator: MRDN"
- "View facilitator receipt"

Global phrases such as "Powered by Meridian", "Built on Meridian", or "Meridian Nexus" are removed from primary product surfaces.
