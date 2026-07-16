import { D1Database } from '@cloudflare/workers-types';
import { WorkflowRun, WorkflowRunStep, WorkflowResult } from '@meridian-nexus/shared-types';
import { RunRepository } from './interfaces';
import { generateId } from '../utils/id';
import { getIsoTimestamp } from '../utils/time';
import { NotFoundError } from '../utils/errors';

export class D1RunRepository implements RunRepository {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async create(run: Omit<WorkflowRun, 'createdAt' | 'updatedAt'>): Promise<WorkflowRun> {
    const now = getIsoTimestamp();
    await this.db.prepare(`
      INSERT INTO workflow_runs (
        id, workflow_id, workflow_version_id, user_id, status, inputs,
        started_at, completed_at, duration_ms, model_provider, model_id,
        is_fallback, fallback_reason, estimated_price, actual_price,
        error_message, error_code, created_at, updated_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19)
    `).bind(
      run.id,
      run.workflowId,
      run.workflowVersionId,
      run.userId,
      run.status,
      JSON.stringify(run.inputs),
      run.startedAt,
      run.completedAt,
      run.durationMs,
      run.modelProvider,
      run.modelId,
      run.isFallback ? 1 : 0,
      run.fallbackReason,
      run.estimatedPrice,
      run.actualPrice,
      run.errorMessage,
      run.errorCode,
      now,
      now
    ).run();

    return (await this.getById(run.id))!;
  }

  async getById(id: string): Promise<WorkflowRun | null> {
    const runRow = await this.db.prepare('SELECT * FROM workflow_runs WHERE id = ?1')
      .bind(id)
      .first<any>();

    if (!runRow) return null;

    const { results: steps } = await this.db.prepare('SELECT * FROM workflow_run_steps WHERE run_id = ?1 ORDER BY display_order ASC')
      .bind(id)
      .all<any>();

    const resultRow = await this.db.prepare('SELECT * FROM workflow_results WHERE run_id = ?1')
      .bind(id)
      .first<any>();

    const receiptRow = await this.db.prepare('SELECT * FROM settlement_receipts WHERE run_id = ?1')
      .bind(id)
      .first<any>();

    const workflowRow = await this.db.prepare(`
      SELECT w.*, c.display_name as creator_display_name, c.avatar_url as creator_avatar_url
      FROM workflows w
      JOIN creator_profiles c ON w.creator_id = c.id
      WHERE w.id = ?1
    `).bind(runRow.workflow_id).first<any>();

    return {
      id: runRow.id,
      workflowId: runRow.workflow_id,
      workflowVersionId: runRow.workflow_version_id,
      userId: runRow.user_id,
      status: runRow.status,
      inputs: JSON.parse(runRow.inputs),
      startedAt: runRow.started_at,
      completedAt: runRow.completed_at,
      durationMs: runRow.duration_ms,
      modelProvider: runRow.model_provider,
      modelId: runRow.model_id,
      isFallback: runRow.is_fallback === 1,
      fallbackReason: runRow.fallback_reason,
      estimatedPrice: runRow.estimated_price,
      actualPrice: runRow.actual_price,
      errorMessage: runRow.error_message,
      errorCode: runRow.error_code,
      createdAt: runRow.created_at,
      updatedAt: runRow.updated_at,
      steps: steps.map((s) => ({
        id: s.id,
        runId: s.run_id,
        stepKey: s.step_key,
        label: s.label,
        status: s.status as any,
        startedAt: s.started_at,
        completedAt: s.completed_at,
        durationMs: s.duration_ms,
        metadata: s.metadata ? JSON.parse(s.metadata) : null,
        displayOrder: s.display_order,
      })),
      result: resultRow ? {
        id: resultRow.id,
        runId: resultRow.run_id,
        sections: JSON.parse(resultRow.sections),
        rawOutput: resultRow.raw_output,
        metadata: JSON.parse(resultRow.metadata),
        createdAt: resultRow.created_at,
      } : undefined,
      settlement: receiptRow ? {
        id: receiptRow.id,
        authorizationId: receiptRow.authorization_id,
        runId: receiptRow.run_id,
        amount: receiptRow.amount,
        currency: receiptRow.currency,
        status: receiptRow.status as any,
        paymentMethod: receiptRow.payment_method,
        payerReference: receiptRow.payer_reference,
        receiverReference: receiptRow.receiver_reference,
        transactionReference: receiptRow.transaction_reference,
        receiptIdentifier: receiptRow.receipt_identifier,
        network: receiptRow.network,
        mode: receiptRow.mode as any,
        refundEligible: receiptRow.refund_eligible === 1,
        settledAt: receiptRow.settled_at,
        createdAt: receiptRow.created_at,
      } : undefined,
      workflow: workflowRow ? {
        id: workflowRow.id,
        creatorId: workflowRow.creator_id,
        currentVersionId: workflowRow.current_version_id,
        name: workflowRow.name,
        slug: workflowRow.slug,
        shortDescription: workflowRow.short_description,
        fullDescription: workflowRow.full_description,
        outcomeStatement: workflowRow.outcome_statement,
        category: workflowRow.category,
        tags: JSON.parse(workflowRow.tags),
        status: workflowRow.status,
        visibility: workflowRow.visibility,
        isFree: workflowRow.is_free === 1,
        pricePerRun: workflowRow.price_per_run,
        estimatedDurationSeconds: workflowRow.estimated_duration_seconds,
        thumbnailUrl: workflowRow.thumbnail_url,
        totalRuns: workflowRow.total_runs,
        completedRuns: workflowRow.completed_runs,
        averageRating: workflowRow.average_rating,
        reviewCount: workflowRow.review_count,
        savedCount: workflowRow.saved_count,
        dataHandlingSummary: workflowRow.data_handling_summary,
        refundPolicy: workflowRow.refund_policy,
        verified: workflowRow.verified === 1,
        verificationLabel: workflowRow.verification_label,
        featuredOrder: workflowRow.featured_order,
        createdAt: workflowRow.created_at,
        updatedAt: workflowRow.updated_at,
        deletedAt: workflowRow.deleted_at,
        creator: {
          id: workflowRow.creator_id,
          userId: '',
          displayName: workflowRow.creator_display_name,
          bio: null,
          avatarUrl: workflowRow.creator_avatar_url,
          website: null,
          verified: false,
          verificationLabel: '',
          publishedWorkflowCount: 0,
          totalRuns: 0,
          averageRating: 0,
          createdAt: '',
          updatedAt: '',
        },
      } : undefined,
    };
  }

  async updateStatus(id: string, status: WorkflowRun['status'], extra?: Partial<WorkflowRun>): Promise<WorkflowRun> {
    const now = getIsoTimestamp();
    const updates: string[] = ['status = ?1', 'updated_at = ?2'];
    const bindings: any[] = [status, now];
    let bindIdx = 3;

    if (extra?.startedAt !== undefined) {
      updates.push(`started_at = ?${bindIdx++}`);
      bindings.push(extra.startedAt);
    }
    if (extra?.completedAt !== undefined) {
      updates.push(`completed_at = ?${bindIdx++}`);
      bindings.push(extra.completedAt);
    }
    if (extra?.durationMs !== undefined) {
      updates.push(`duration_ms = ?${bindIdx++}`);
      bindings.push(extra.durationMs);
    }
    if (extra?.modelProvider !== undefined) {
      updates.push(`model_provider = ?${bindIdx++}`);
      bindings.push(extra.modelProvider);
    }
    if (extra?.modelId !== undefined) {
      updates.push(`model_id = ?${bindIdx++}`);
      bindings.push(extra.modelId);
    }
    if (extra?.isFallback !== undefined) {
      updates.push(`is_fallback = ?${bindIdx++}`);
      bindings.push(extra.isFallback ? 1 : 0);
    }
    if (extra?.fallbackReason !== undefined) {
      updates.push(`fallback_reason = ?${bindIdx++}`);
      bindings.push(extra.fallbackReason);
    }
    if (extra?.actualPrice !== undefined) {
      updates.push(`actual_price = ?${bindIdx++}`);
      bindings.push(extra.actualPrice);
    }
    if (extra?.errorMessage !== undefined) {
      updates.push(`error_message = ?${bindIdx++}`);
      bindings.push(extra.errorMessage);
    }
    if (extra?.errorCode !== undefined) {
      updates.push(`error_code = ?${bindIdx++}`);
      bindings.push(extra.errorCode);
    }

    bindings.push(id);
    const query = `UPDATE workflow_runs SET ${updates.join(', ')} WHERE id = ?${bindIdx}`;
    await this.db.prepare(query).bind(...bindings).run();

    // Increment run counters on workflow if completed successfully
    if (status === 'completed') {
      const run = await this.getById(id);
      if (run) {
        await this.db.prepare(`
          UPDATE workflows 
          SET total_runs = total_runs + 1, completed_runs = completed_runs + 1 
          WHERE id = ?1
        `).bind(run.workflowId).run();

        await this.db.prepare(`
          UPDATE creator_profiles 
          SET total_runs = total_runs + 1 
          WHERE id = (SELECT creator_id FROM workflows WHERE id = ?1)
        `).bind(run.workflowId).run();
      }
    }

    return (await this.getById(id))!;
  }

  async createStep(step: WorkflowRunStep): Promise<WorkflowRunStep> {
    await this.db.prepare(`
      INSERT INTO workflow_run_steps (
        id, run_id, step_key, label, status, started_at,
        completed_at, duration_ms, metadata, display_order
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
    `).bind(
      step.id,
      step.runId,
      step.stepKey,
      step.label,
      step.status,
      step.startedAt,
      step.completedAt,
      step.durationMs,
      step.metadata ? JSON.stringify(step.metadata) : null,
      step.displayOrder
    ).run();

    return step;
  }

  async updateStepStatus(id: string, status: WorkflowRunStep['status'], durationMs?: number): Promise<void> {
    const now = getIsoTimestamp();
    if (status === 'running') {
      await this.db.prepare(`
        UPDATE workflow_run_steps 
        SET status = ?1, started_at = ?2 
        WHERE id = ?3
      `).bind(status, now, id).run();
    } else {
      await this.db.prepare(`
        UPDATE workflow_run_steps 
        SET status = ?1, completed_at = ?2, duration_ms = ?3 
        WHERE id = ?4
      `).bind(status, now, durationMs ?? null, id).run();
    }
  }

  async saveResult(result: WorkflowResult): Promise<WorkflowResult> {
    await this.db.prepare(`
      INSERT INTO workflow_results (
        id, run_id, sections, raw_output, metadata, created_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6)
    `).bind(
      result.id,
      result.runId,
      JSON.stringify(result.sections),
      result.rawOutput,
      JSON.stringify(result.metadata),
      result.createdAt
    ).run();

    return result;
  }

  async getResultByRunId(runId: string): Promise<WorkflowResult | null> {
    const row = await this.db.prepare('SELECT * FROM workflow_results WHERE run_id = ?1')
      .bind(runId)
      .first<any>();

    if (!row) return null;

    return {
      id: row.id,
      runId: row.run_id,
      sections: JSON.parse(row.sections),
      rawOutput: row.raw_output,
      metadata: JSON.parse(row.metadata),
      createdAt: row.created_at,
    };
  }

  async listUserRuns(userId: string, filters?: { status?: string; limit?: number }): Promise<WorkflowRun[]> {
    let query = `
      SELECT r.*, w.name as workflow_name, w.slug as workflow_slug, c.display_name as creator_display_name
      FROM workflow_runs r
      JOIN workflows w ON r.workflow_id = w.id
      JOIN creator_profiles c ON w.creator_id = c.id
      WHERE r.user_id = ?1
    `;
    const bindings: any[] = [userId];

    if (filters?.status) {
      query += ' AND r.status = ?2';
      bindings.push(filters.status);
    }

    query += ' ORDER BY r.created_at DESC';

    if (filters?.limit) {
      query += ` LIMIT ${filters.limit}`;
    }

    const { results } = await this.db.prepare(query).bind(...bindings).all<any>();

    return results.map((row) => ({
      id: row.id,
      workflowId: row.workflow_id,
      workflowVersionId: row.workflow_version_id,
      userId: row.user_id,
      status: row.status,
      inputs: JSON.parse(row.inputs),
      startedAt: row.started_at,
      completedAt: row.completed_at,
      durationMs: row.duration_ms,
      modelProvider: row.model_provider,
      modelId: row.model_id,
      isFallback: row.is_fallback === 1,
      fallbackReason: row.fallback_reason,
      estimatedPrice: row.estimated_price,
      actualPrice: row.actual_price,
      errorMessage: row.error_message,
      errorCode: row.error_code,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      workflow: {
        id: row.workflow_id,
        creatorId: '',
        currentVersionId: '',
        name: row.workflow_name,
        slug: row.workflow_slug,
        shortDescription: '',
        fullDescription: '',
        outcomeStatement: '',
        category: 'research',
        tags: [],
        status: 'published',
        visibility: 'public',
        isFree: row.actual_price === 0,
        pricePerRun: row.actual_price,
        estimatedDurationSeconds: 0,
        thumbnailUrl: null,
        totalRuns: 0,
        completedRuns: 0,
        averageRating: 0,
        reviewCount: 0,
        savedCount: 0,
        dataHandlingSummary: '',
        refundPolicy: '',
        verified: false,
        verificationLabel: '',
        featuredOrder: null,
        createdAt: '',
        updatedAt: '',
        deletedAt: null,
        creator: {
          id: '',
          userId: '',
          displayName: row.creator_display_name,
          bio: null,
          avatarUrl: null,
          website: null,
          verified: false,
          verificationLabel: '',
          publishedWorkflowCount: 0,
          totalRuns: 0,
          averageRating: 0,
          createdAt: '',
          updatedAt: '',
        },
      },
    }));
  }

  async createSettlementReceipt(receipt: any): Promise<void> {
    // 1. Save Authorization First
    const authId = generateId('auth');
    const now = getIsoTimestamp();
    
    await this.db.prepare(`
      INSERT INTO settlement_authorizations (
        id, run_id, user_id, amount, currency, status, payment_method,
        payer_reference, transaction_reference, network, mode, created_at, expires_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, 'settled', ?6, ?7, ?8, ?9, ?10, ?11, ?12)
    `).bind(
      authId,
      receipt.runId,
      receipt.payerReference, // Match user reference as auth holder
      receipt.amount,
      receipt.currency,
      receipt.paymentMethod,
      receipt.payerReference,
      receipt.transactionReference,
      receipt.network,
      receipt.mode,
      now,
      now
    ).run();

    // 2. Save Receipt
    await this.db.prepare(`
      INSERT INTO settlement_receipts (
        id, authorization_id, run_id, amount, currency, status, payment_method,
        payer_reference, receiver_reference, transaction_reference,
        receipt_identifier, network, mode, refund_eligible, settled_at, created_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16)
    `).bind(
      receipt.id,
      authId,
      receipt.runId,
      receipt.amount,
      receipt.currency,
      receipt.status,
      receipt.paymentMethod,
      receipt.payerReference,
      receipt.receiverReference,
      receipt.transactionReference,
      receipt.receiptIdentifier,
      receipt.network,
      receipt.mode,
      receipt.refundEligible ? 1 : 0,
      receipt.settledAt,
      receipt.createdAt
    ).run();
  }

  async getSettlementReceipt(runId: string): Promise<any | null> {
    const row = await this.db.prepare('SELECT * FROM settlement_receipts WHERE run_id = ?1')
      .bind(runId)
      .first<any>();

    if (!row) return null;

    return {
      id: row.id,
      authorizationId: row.authorization_id,
      runId: row.run_id,
      amount: row.amount,
      currency: row.currency,
      status: row.status,
      paymentMethod: row.payment_method,
      payerReference: row.payer_reference,
      receiverReference: row.receiver_reference,
      transactionReference: row.transaction_reference,
      receiptIdentifier: row.receipt_identifier,
      network: row.network,
      mode: row.mode,
      refundEligible: row.refund_eligible === 1,
      settledAt: row.settled_at,
      createdAt: row.created_at,
    };
  }
}
