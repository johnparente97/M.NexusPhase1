import {
  PaymentAuthorizationInput,
  PaymentVerification,
  SettlementRequest,
  SettlementReceipt,
  RefundRequest,
  RefundResult,
  SettlementStatus,
} from '@meridian-nexus/shared-types';
import { SettlementProvider } from './interface';
import { generateId } from '../../utils/id';
import { getIsoTimestamp, addHours } from '../../utils/time';

export class MockMeridianSettlementProvider implements SettlementProvider {
  async createAuthorization(input: PaymentAuthorizationInput): Promise<PaymentVerification> {
    const expiresAt = addHours(new Date(), 24).toISOString();
    const transactionReference = generateId('txref');

    return {
      authorized: true,
      authorizationId: generateId('auth'),
      transactionReference,
      expiresAt,
    };
  }

  async verifyAuthorization(reference: string): Promise<PaymentVerification> {
    return {
      authorized: true,
      authorizationId: reference,
      transactionReference: generateId('txref'),
      expiresAt: addHours(new Date(), 23).toISOString(),
    };
  }

  async settleUsage(input: SettlementRequest): Promise<SettlementReceipt> {
    const settledAt = getIsoTimestamp();
    const transactionReference = generateId('txref');
    const receiptIdentifier = generateId('rcpt');

    return {
      id: generateId('settled'),
      authorizationId: input.authorizationId,
      runId: input.runId,
      amount: input.amount,
      currency: input.currency,
      status: 'settled' as SettlementStatus,
      paymentMethod: 'Simulated Meridian Mpay authorization',
      payerReference: generateId('mpay_payer'),
      receiverReference: generateId('mpay_receiver'),
      transactionReference,
      receiptIdentifier,
      network: 'Meridian Demo Network',
      mode: 'demo',
      refundEligible: true,
      settledAt,
      createdAt: settledAt,
    };
  }

  async getReceipt(reference: string): Promise<SettlementReceipt> {
    const now = getIsoTimestamp();
    return {
      id: generateId('settled'),
      authorizationId: generateId('auth'),
      runId: generateId('run'),
      amount: 4.99,
      currency: 'USD',
      status: 'settled' as SettlementStatus,
      paymentMethod: 'Simulated Meridian Mpay authorization',
      payerReference: 'mpay_payer_demo12345',
      receiverReference: 'mpay_receiver_demo67890',
      transactionReference: 'txref_demo1234567890',
      receiptIdentifier: reference,
      network: 'Meridian Demo Network',
      mode: 'demo',
      refundEligible: true,
      settledAt: now,
      createdAt: now,
    };
  }

  async requestRefund(input: RefundRequest): Promise<RefundResult> {
    return {
      success: true,
      refundId: generateId('refd'),
      amount: 4.99,
      message: `Refund of $4.99 for receipt ${input.receiptId} processed successfully on the simulated Meridian network.`,
    };
  }
}
