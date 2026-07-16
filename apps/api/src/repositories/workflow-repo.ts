import { D1Database } from '@cloudflare/workers-types';
import {
  Workflow,
  WorkflowVersion,
  WorkflowInputDefinition,
  WorkflowOutputDefinition,
  WorkflowListParams,
  CreateWorkflowInput,
  UpdateWorkflowInput,
  Capability,
} from '@meridian-nexus/shared-types';
import { WorkflowRepository } from './interfaces';
import { generateId } from '../utils/id';
import { getIsoTimestamp } from '../utils/time';
import { NotFoundError } from '../utils/errors';

export class D1WorkflowRepository implements WorkflowRepository {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async list(params: WorkflowListParams): Promise<{ workflows: Workflow[]; total: number }> {
    let whereClauses: string[] = ['w.deleted_at IS NULL'];
    const bindings: any[] = [];
    let bindIndex = 1;

    if (params.status) {
      whereClauses.push(`w.status = ?${bindIndex++}`);
      bindings.push(params.status);
    } else {
      whereClauses.push("w.status = 'published'");
    }

    if (params.search) {
      whereClauses.push(`(w.name LIKE ?${bindIndex} OR w.short_description LIKE ?${bindIndex})`);
      bindings.push(`%${params.search}%`);
      bindIndex++;
    }

    if (params.category) {
      whereClauses.push(`w.category = ?${bindIndex++}`);
      bindings.push(params.category);
    }

    if (params.isFree !== undefined) {
      whereClauses.push(`w.is_free = ?${bindIndex++}`);
      bindings.push(params.isFree ? 1 : 0);
    }

    if (params.maxPrice !== undefined) {
      whereClauses.push(`w.price_per_run <= ?${bindIndex++}`);
      bindings.push(params.maxPrice);
    }

    if (params.verified !== undefined) {
      whereClauses.push(`w.verified = ?${bindIndex++}`);
      bindings.push(params.verified ? 1 : 0);
    }

    if (params.minRating !== undefined) {
      whereClauses.push(`w.average_rating >= ?${bindIndex++}`);
      bindings.push(params.minRating);
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Calculate total count
    const countQuery = `SELECT COUNT(*) as count FROM workflows w ${whereSql}`;
    const countResult = await this.db.prepare(countQuery).bind(...bindings).first<{ count: number }>();
    const total = countResult?.count ?? 0;

    // Sorting
    let orderBySql = 'ORDER BY w.total_runs DESC'; // popular by default
    if (params.sort === 'newest') {
      orderBySql = 'ORDER BY w.created_at DESC';
    } else if (params.sort === 'rating') {
      orderBySql = 'ORDER BY w.average_rating DESC';
    } else if (params.sort === 'price-asc') {
      orderBySql = 'ORDER BY w.price_per_run ASC';
    } else if (params.sort === 'price-desc') {
      orderBySql = 'ORDER BY w.price_per_run DESC';
    }

    // Pagination
    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 12;
    const offset = (page - 1) * pageSize;

    const query = `
      SELECT 
        w.*,
        c.display_name as creator_display_name,
        c.avatar_url as creator_avatar_url,
        c.verified as creator_verified,
        c.verification_label as creator_verification_label
      FROM workflows w
      JOIN creator_profiles c ON w.creator_id = c.id
      ${whereSql}
      ${orderBySql}
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    const { results } = await this.db.prepare(query).bind(...bindings).all<any>();

    const workflows = results.map((row) => this.mapRowToWorkflow(row));
    return { workflows, total };
  }

  async getById(id: string): Promise<Workflow | null> {
    const query = `
      SELECT 
        w.*,
        c.display_name as creator_display_name,
        c.avatar_url as creator_avatar_url,
        c.verified as creator_verified,
        c.verification_label as creator_verification_label
      FROM workflows w
      JOIN creator_profiles c ON w.creator_id = c.id
      WHERE w.id = ?1 AND w.deleted_at IS NULL
    `;

    const row = await this.db.prepare(query).bind(id).first<any>();
    if (!row) return null;

    const workflow = this.mapRowToWorkflow(row);

    // Fetch current version and definitions
    if (workflow.currentVersionId) {
      workflow.currentVersion = await this.getVersionDetails(workflow.currentVersionId);
    }

    // Fetch capabilities
    workflow.capabilities = await this.getWorkflowCapabilities(workflow.id);

    return workflow;
  }

  async getBySlug(slug: string): Promise<Workflow | null> {
    const query = `
      SELECT 
        w.*,
        c.display_name as creator_display_name,
        c.avatar_url as creator_avatar_url,
        c.verified as creator_verified,
        c.verification_label as creator_verification_label
      FROM workflows w
      JOIN creator_profiles c ON w.creator_id = c.id
      WHERE w.slug = ?1 AND w.deleted_at IS NULL
    `;

    const row = await this.db.prepare(query).bind(slug).first<any>();
    if (!row) return null;

    const workflow = this.mapRowToWorkflow(row);

    // Fetch current version and definitions
    if (workflow.currentVersionId) {
      workflow.currentVersion = await this.getVersionDetails(workflow.currentVersionId);
    }

    // Fetch capabilities
    workflow.capabilities = await this.getWorkflowCapabilities(workflow.id);

    return workflow;
  }

  async create(creatorId: string, input: CreateWorkflowInput): Promise<Workflow> {
    const workflowId = generateId('wf');
    const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const versionId = generateId('wv');
    const now = getIsoTimestamp();

    // 1. Insert Workflow
    await this.db.prepare(`
      INSERT INTO workflows (
        id, creator_id, current_version_id, name, slug, short_description,
        full_description, outcome_statement, category, tags, status,
        visibility, is_free, price_per_run, estimated_duration_seconds,
        data_handling_summary, refund_policy, created_at, updated_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, 'draft', ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)
    `).bind(
      workflowId,
      creatorId,
      versionId,
      input.name,
      slug,
      input.shortDescription,
      input.fullDescription,
      input.outcomeStatement,
      input.category,
      JSON.stringify(input.tags),
      input.visibility,
      input.isFree ? 1 : 0,
      input.pricePerRun,
      input.estimatedDurationSeconds,
      input.dataHandlingSummary,
      input.refundPolicy,
      now,
      now
    ).run();

    // 2. Insert Version
    await this.db.prepare(`
      INSERT INTO workflow_versions (
        id, workflow_id, version_number, version_notes, system_instructions,
        creator_instructions, model_provider, model_id, created_at
      ) VALUES (?1, ?2, 1, 'Initial draft', ?3, ?4, ?5, ?6, ?7)
    `).bind(
      versionId,
      workflowId,
      input.systemInstructions,
      input.creatorInstructions ?? '',
      input.modelProvider,
      input.modelId,
      now
    ).run();

    // 3. Insert Inputs
    for (const [idx, inp] of input.inputDefinitions.entries()) {
      await this.db.prepare(`
        INSERT INTO workflow_input_definitions (
          id, version_id, field_key, label, description, type, placeholder,
          required, default_value, options, validation, display_order
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
      `).bind(
        generateId('inp'),
        versionId,
        inp.fieldKey,
        inp.label,
        inp.description ?? null,
        inp.type,
        inp.placeholder ?? null,
        inp.required ? 1 : 0,
        inp.defaultValue ?? null,
        inp.options ? JSON.stringify(inp.options) : null,
        inp.validation ? JSON.stringify(inp.validation) : null,
        idx
      ).run();
    }

    // 4. Insert Outputs
    for (const [idx, out] of input.outputDefinitions.entries()) {
      await this.db.prepare(`
        INSERT INTO workflow_output_definitions (
          id, version_id, section_key, label, type, description, display_order
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
      `).bind(
        generateId('out'),
        versionId,
        out.sectionKey,
        out.label,
        out.type,
        out.description ?? null,
        idx
      ).run();
    }

    return (await this.getById(workflowId))!;
  }

  async update(id: string, input: UpdateWorkflowInput): Promise<Workflow> {
    const workflow = await this.getById(id);
    if (!workflow) throw new NotFoundError('Workflow not found');

    const now = getIsoTimestamp();
    
    // Build update dynamic fields
    const updates: string[] = [];
    const bindings: any[] = [];
    let bindIdx = 1;

    if (input.name !== undefined) {
      updates.push(`name = ?${bindIdx++}`);
      bindings.push(input.name);
    }
    if (input.shortDescription !== undefined) {
      updates.push(`short_description = ?${bindIdx++}`);
      bindings.push(input.shortDescription);
    }
    if (input.fullDescription !== undefined) {
      updates.push(`full_description = ?${bindIdx++}`);
      bindings.push(input.fullDescription);
    }
    if (input.outcomeStatement !== undefined) {
      updates.push(`outcome_statement = ?${bindIdx++}`);
      bindings.push(input.outcomeStatement);
    }
    if (input.category !== undefined) {
      updates.push(`category = ?${bindIdx++}`);
      bindings.push(input.category);
    }
    if (input.tags !== undefined) {
      updates.push(`tags = ?${bindIdx++}`);
      bindings.push(JSON.stringify(input.tags));
    }
    if (input.isFree !== undefined) {
      updates.push(`is_free = ?${bindIdx++}`);
      bindings.push(input.isFree ? 1 : 0);
    }
    if (input.pricePerRun !== undefined) {
      updates.push(`price_per_run = ?${bindIdx++}`);
      bindings.push(input.pricePerRun);
    }
    if (input.estimatedDurationSeconds !== undefined) {
      updates.push(`estimated_duration_seconds = ?${bindIdx++}`);
      bindings.push(input.estimatedDurationSeconds);
    }
    if (input.dataHandlingSummary !== undefined) {
      updates.push(`data_handling_summary = ?${bindIdx++}`);
      bindings.push(input.dataHandlingSummary);
    }
    if (input.refundPolicy !== undefined) {
      updates.push(`refund_policy = ?${bindIdx++}`);
      bindings.push(input.refundPolicy);
    }
    if (input.visibility !== undefined) {
      updates.push(`visibility = ?${bindIdx++}`);
      bindings.push(input.visibility);
    }

    if (updates.length > 0) {
      updates.push(`updated_at = ?${bindIdx++}`);
      bindings.push(now);

      bindings.push(id);
      const updateQuery = `UPDATE workflows SET ${updates.join(', ')} WHERE id = ?${bindIdx}`;
      await this.db.prepare(updateQuery).bind(...bindings).run();
    }

    return (await this.getById(id))!;
  }

  async publish(id: string): Promise<Workflow> {
    await this.db.prepare("UPDATE workflows SET status = 'published', updated_at = ?1 WHERE id = ?2")
      .bind(getIsoTimestamp(), id)
      .run();
    return (await this.getById(id))!;
  }

  async unpublish(id: string): Promise<Workflow> {
    await this.db.prepare("UPDATE workflows SET status = 'unpublished', updated_at = ?1 WHERE id = ?2")
      .bind(getIsoTimestamp(), id)
      .run();
    return (await this.getById(id))!;
  }

  async createVersion(workflowId: string, versionNumber: number, input: CreateWorkflowInput): Promise<WorkflowVersion> {
    const versionId = generateId('wv');
    const now = getIsoTimestamp();

    // 1. Insert Version
    await this.db.prepare(`
      INSERT INTO workflow_versions (
        id, workflow_id, version_number, version_notes, system_instructions,
        creator_instructions, model_provider, model_id, created_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)
    `).bind(
      versionId,
      workflowId,
      versionNumber,
      `Version ${versionNumber} update`,
      input.systemInstructions,
      input.creatorInstructions ?? '',
      input.modelProvider,
      input.modelId,
      now
    ).run();

    // 2. Insert Inputs
    for (const [idx, inp] of input.inputDefinitions.entries()) {
      await this.db.prepare(`
        INSERT INTO workflow_input_definitions (
          id, version_id, field_key, label, description, type, placeholder,
          required, default_value, options, validation, display_order
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12)
      `).bind(
        generateId('inp'),
        versionId,
        inp.fieldKey,
        inp.label,
        inp.description ?? null,
        inp.type,
        inp.placeholder ?? null,
        inp.required ? 1 : 0,
        inp.defaultValue ?? null,
        inp.options ? JSON.stringify(inp.options) : null,
        inp.validation ? JSON.stringify(inp.validation) : null,
        idx
      ).run();
    }

    // 3. Insert Outputs
    for (const [idx, out] of input.outputDefinitions.entries()) {
      await this.db.prepare(`
        INSERT INTO workflow_output_definitions (
          id, version_id, section_key, label, type, description, display_order
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
      `).bind(
        generateId('out'),
        versionId,
        out.sectionKey,
        out.label,
        out.type,
        out.description ?? null,
        idx
      ).run();
    }

    // 4. Update workflow with new version
    await this.db.prepare("UPDATE workflows SET current_version_id = ?1, updated_at = ?2 WHERE id = ?3")
      .bind(versionId, now, workflowId)
      .run();

    return (await this.getVersionDetails(versionId))!;
  }

  // ── Helper Mappers ──

  private mapRowToWorkflow(row: any): Workflow {
    return {
      id: row.id,
      creatorId: row.creator_id,
      currentVersionId: row.current_version_id,
      name: row.name,
      slug: row.slug,
      shortDescription: row.short_description,
      fullDescription: row.full_description,
      outcomeStatement: row.outcome_statement,
      category: row.category,
      tags: row.tags ? JSON.parse(row.tags) : [],
      status: row.status,
      visibility: row.visibility,
      isFree: row.is_free === 1,
      pricePerRun: row.price_per_run,
      estimatedDurationSeconds: row.estimated_duration_seconds,
      thumbnailUrl: row.thumbnail_url,
      totalRuns: row.total_runs,
      completedRuns: row.completed_runs,
      averageRating: row.average_rating,
      reviewCount: row.review_count,
      savedCount: row.saved_count,
      dataHandlingSummary: row.data_handling_summary,
      refundPolicy: row.refund_policy,
      verified: row.verified === 1,
      verificationLabel: row.verification_label,
      featuredOrder: row.featured_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
      creator: {
        id: row.creator_id,
        userId: '', // Ignored in UI
        displayName: row.creator_display_name,
        bio: null,
        avatarUrl: row.creator_avatar_url,
        website: null,
        verified: row.creator_verified === 1,
        verificationLabel: row.creator_verification_label,
        publishedWorkflowCount: 0,
        totalRuns: 0,
        averageRating: 0,
        createdAt: '',
        updatedAt: '',
      },
    };
  }

  private async getVersionDetails(versionId: string): Promise<WorkflowVersion> {
    const ver = await this.db.prepare('SELECT * FROM workflow_versions WHERE id = ?1')
      .bind(versionId)
      .first<any>();

    if (!ver) throw new NotFoundError('Workflow version not found');

    const { results: inputs } = await this.db.prepare('SELECT * FROM workflow_input_definitions WHERE version_id = ?1 ORDER BY display_order ASC')
      .bind(versionId)
      .all<any>();

    const { results: outputs } = await this.db.prepare('SELECT * FROM workflow_output_definitions WHERE version_id = ?1 ORDER BY display_order ASC')
      .bind(versionId)
      .all<any>();

    return {
      id: ver.id,
      workflowId: ver.workflow_id,
      versionNumber: ver.version_number,
      versionNotes: ver.version_notes,
      systemInstructions: ver.system_instructions,
      creatorInstructions: ver.creator_instructions,
      modelProvider: ver.model_provider,
      modelId: ver.model_id,
      inputDefinitions: inputs.map((inp) => ({
        id: inp.id,
        versionId: inp.version_id,
        fieldKey: inp.field_key,
        label: inp.label,
        description: inp.description,
        type: inp.type as any,
        placeholder: inp.placeholder,
        required: inp.required === 1,
        defaultValue: inp.default_value,
        options: inp.options ? JSON.parse(inp.options) : null,
        validation: inp.validation ? JSON.parse(inp.validation) : null,
        displayOrder: inp.display_order,
      })),
      outputDefinitions: outputs.map((out) => ({
        id: out.id,
        versionId: out.version_id,
        sectionKey: out.section_key,
        label: out.label,
        type: out.type as any,
        description: out.description,
        displayOrder: out.display_order,
      })),
      outputSchema: ver.output_schema ? JSON.parse(ver.output_schema) : null,
      maxTokens: ver.max_tokens,
      temperature: ver.temperature,
      createdAt: ver.created_at,
    };
  }

  private async getWorkflowCapabilities(workflowId: string): Promise<Capability[]> {
    const query = `
      SELECT c.* FROM capabilities c
      JOIN workflow_capabilities wc ON c.id = wc.capability_id
      WHERE wc.workflow_id = ?1
    `;
    const { results } = await this.db.prepare(query).bind(workflowId).all<any>();
    return results;
  }
}
