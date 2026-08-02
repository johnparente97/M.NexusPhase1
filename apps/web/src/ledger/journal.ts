import { LedgerEntry } from '@nexus/shared-types';

export interface JournalTransaction {
  id: string;
  referenceId: string;
  description: string;
  timestamp: string;
  entries: LedgerEntry[];
}

export class DoubleEntryLedger {
  private static transactions: JournalTransaction[] = [];

  /**
   * Records a balanced double-entry transaction.
   * Asserts sum(debits) === sum(credits) in atomic units before committing.
   */
  public static commitTransaction(
    referenceId: string,
    description: string,
    debits: { account: string; atomicAmount: string }[],
    credits: { account: string; atomicAmount: string }[],
    currency: string = 'USDC'
  ): JournalTransaction {
    const totalDebit = debits.reduce((acc, d) => acc + BigInt(d.atomicAmount), BigInt(0));
    const totalCredit = credits.reduce((acc, c) => acc + BigInt(c.atomicAmount), BigInt(0));

    if (totalDebit !== totalCredit) {
      throw new Error(`Double-Entry Ledger Mismatch: Debits (${totalDebit}) !== Credits (${totalCredit})`);
    }

    const journalId = `jnl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const timestamp = new Date().toISOString();

    const entries: LedgerEntry[] = [
      ...debits.map((d, i) => ({
        id: `${journalId}-d${i}`,
        journalId,
        account: d.account,
        debitAtomic: d.atomicAmount,
        creditAtomic: '0',
        currency,
        referenceId,
        timestamp,
      })),
      ...credits.map((c, i) => ({
        id: `${journalId}-c${i}`,
        journalId,
        account: c.account,
        debitAtomic: '0',
        creditAtomic: c.atomicAmount,
        currency,
        referenceId,
        timestamp,
      })),
    ];

    const transaction: JournalTransaction = {
      id: journalId,
      referenceId,
      description,
      timestamp,
      entries,
    };

    this.transactions.push(transaction);
    return transaction;
  }

  public static getHistory(): JournalTransaction[] {
    return this.transactions;
  }
}
