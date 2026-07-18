// ─── Meridian Nexus — Shared Validation Schemas ──────────────────────
// Zod schemas used by both frontend (React Hook Form) and backend (Hono).
// ─────────────────────────────────────────────────────────────────────

import { z } from 'zod';

// ── Constants ──

export const MAX_NAME_LENGTH = 120;
export const MAX_SHORT_DESC_LENGTH = 280;
export const MAX_FULL_DESC_LENGTH = 5000;
export const MAX_INSTRUCTIONS_LENGTH = 10000;
export const MAX_COMMENT_LENGTH = 2000;
export const MAX_TAG_LENGTH = 50;
export const MAX_TAGS = 10;
export const MAX_INPUT_FIELDS = 25;
export const MAX_OUTPUT_SECTIONS = 15;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_PROMPT_LENGTH = 10000;
export const MAX_INPUT_TEXT_LENGTH = 5000;
export const ALLOWED_FILE_TYPES = ['.txt', '.csv', '.md', '.json'] as const;

// ── Reusable Schema Parts ──

export const workflowCategorySchema = z.enum([
  'research', 'marketing', 'sales', 'business-operations',
  'data-analysis', 'development', 'content', 'finance',
  'customer-support', 'productivity', 'procurement', 'strategy',
]);

export const workflowVisibilitySchema = z.enum(['public', 'private', 'unlisted']);
export const workflowStatusSchema = z.enum(['draft', 'published', 'unpublished', 'archived']);
export const runStatusSchema = z.enum(['pending', 'running', 'completed', 'failed', 'cancelled']);

export const inputFieldTypeSchema = z.enum([
  'text', 'textarea', 'number', 'currency', 'url', 'email', 'date',
  'select', 'multi-select', 'radio', 'checkbox', 'toggle', 'tags',
  'file', 'range', 'tone', 'audience', 'repeating-list', 'structured-criteria',
]);

export const outputSectionTypeSchema = z.enum([
  'heading', 'paragraph', 'list', 'table', 'metrics', 'recommendations',
  'risks', 'action-items', 'timeline', 'content-draft', 'comparison',
  'sources', 'confidence', 'metadata',
]);

// ── Input Field Definition Schema ──

const inputFieldOptionSchema = z.object({
  label: z.string().min(1).max(200),
  value: z.string().min(1).max(200),
});

const inputFieldValidationSchema = z.object({
  minLength: z.number().int().min(0).optional(),
  maxLength: z.number().int().min(1).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  pattern: z.string().max(500).optional(),
  patternMessage: z.string().max(200).optional(),
  maxItems: z.number().int().min(1).max(50).optional(),
  maxFileSize: z.number().int().min(1).max(MAX_FILE_SIZE).optional(),
  allowedFileTypes: z.array(z.string()).optional(),
}).optional();

export const inputFieldDefinitionSchema = z.object({
  fieldKey: z.string().min(1).max(100).regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, 'Must start with a letter, then letters/numbers/underscores'),
  label: z.string().min(1).max(200),
  description: z.string().max(500).nullable().optional(),
  type: inputFieldTypeSchema,
  placeholder: z.string().max(500).nullable().optional(),
  required: z.boolean().default(true),
  defaultValue: z.string().max(1000).nullable().optional(),
  options: z.array(inputFieldOptionSchema).nullable().optional(),
  validation: inputFieldValidationSchema,
  displayOrder: z.number().int().min(0),
});

// ── Output Definition Schema ──

export const outputDefinitionSchema = z.object({
  sectionKey: z.string().min(1).max(100),
  label: z.string().min(1).max(200),
  type: outputSectionTypeSchema,
  description: z.string().max(500).nullable().optional(),
  displayOrder: z.number().int().min(0),
});

// ── Workflow Schemas ──

export const createWorkflowSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(MAX_NAME_LENGTH),
  shortDescription: z.string().min(10, 'Description must be at least 10 characters').max(MAX_SHORT_DESC_LENGTH),
  fullDescription: z.string().min(20).max(MAX_FULL_DESC_LENGTH),
  outcomeStatement: z.string().min(10).max(MAX_SHORT_DESC_LENGTH),
  category: workflowCategorySchema,
  tags: z.array(z.string().max(MAX_TAG_LENGTH)).max(MAX_TAGS).default([]),
  isFree: z.boolean().default(false),
  pricePerRun: z.number().min(0).max(999.99).default(0),
  estimatedDurationSeconds: z.number().int().min(5).max(600).default(30),
  dataHandlingSummary: z.string().min(10).max(1000).default('Inputs are processed in memory and not stored beyond execution.'),
  refundPolicy: z.string().max(500).default('Demonstration runs are non-refundable.'),
  visibility: workflowVisibilitySchema.default('public'),
  systemInstructions: z.string().min(10).max(MAX_INSTRUCTIONS_LENGTH),
  creatorInstructions: z.string().max(MAX_INSTRUCTIONS_LENGTH).default(''),
  modelProvider: z.string().min(1).max(100).default('gemini'),
  modelId: z.string().min(1).max(100).default('gemini-2.5-flash'),
  inputDefinitions: z.array(inputFieldDefinitionSchema).min(1, 'At least one input field is required').max(MAX_INPUT_FIELDS),
  outputDefinitions: z.array(outputDefinitionSchema).min(1).max(MAX_OUTPUT_SECTIONS),
});

export const updateWorkflowSchema = createWorkflowSchema.partial();

// ── Run Schemas ──

export const executeWorkflowSchema = z.object({
  workflowId: z.string().uuid(),
  inputs: z.record(z.unknown()),
  turnstileToken: z.string().optional(),
  paymentSignature: z.string().optional(),
  paymentNonce: z.string().optional(),
  paymentValidBefore: z.number().optional(),
});

// ── Review Schemas ──

export const submitReviewSchema = z.object({
  workflowId: z.string().uuid(),
  runId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(MAX_COMMENT_LENGTH).optional(),
});

// ── Search/Filter Schemas ──

export const workflowListParamsSchema = z.object({
  search: z.string().max(200).optional(),
  category: workflowCategorySchema.optional(),
  minRating: z.coerce.number().min(1).max(5).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  isFree: z.coerce.boolean().optional(),
  verified: z.coerce.boolean().optional(),
  sort: z.enum(['popular', 'newest', 'rating', 'price-asc', 'price-desc']).optional().default('popular'),
  page: z.coerce.number().int().min(1).optional().default(1),
  pageSize: z.coerce.number().int().min(1).max(50).optional().default(12),
});

// ── User Schemas ──

export const updateProfileSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  company: z.string().max(200).optional(),
  website: z.string().url().max(500).optional().or(z.literal('')),
  location: z.string().max(200).optional(),
  theme: z.enum(['dark', 'light', 'system']).optional(),
});

// ── Type exports from schemas ──

export type CreateWorkflowInput = z.infer<typeof createWorkflowSchema>;
export type UpdateWorkflowInput = z.infer<typeof updateWorkflowSchema>;
export type ExecuteWorkflowInput = z.infer<typeof executeWorkflowSchema>;
export type SubmitReviewInput = z.infer<typeof submitReviewSchema>;
export type WorkflowListParams = z.infer<typeof workflowListParamsSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type InputFieldDefinition = z.infer<typeof inputFieldDefinitionSchema>;
export type OutputDefinition = z.infer<typeof outputDefinitionSchema>;

// ── Dynamic Input Validation ──

/**
 * Creates a Zod schema for validating workflow run inputs
 * based on the workflow's input definitions.
 */
export function createDynamicInputSchema(
  inputDefs: Array<{
    fieldKey: string;
    type: string;
    required: boolean;
    validation?: {
      minLength?: number;
      maxLength?: number;
      min?: number;
      max?: number;
      pattern?: string;
      patternMessage?: string;
    } | null;
  }>
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const def of inputDefs) {
    let fieldSchema: z.ZodTypeAny;

    switch (def.type) {
      case 'number':
      case 'currency':
      case 'range': {
        let numSchema = z.coerce.number();
        if (def.validation?.min !== undefined) numSchema = numSchema.min(def.validation.min);
        if (def.validation?.max !== undefined) numSchema = numSchema.max(def.validation.max);
        fieldSchema = numSchema;
        break;
      }
      case 'checkbox':
      case 'toggle':
        fieldSchema = z.boolean();
        break;
      case 'multi-select':
      case 'tags':
      case 'repeating-list':
        fieldSchema = z.array(z.string().max(MAX_INPUT_TEXT_LENGTH));
        break;
      case 'file':
        fieldSchema = z.string().max(MAX_INPUT_TEXT_LENGTH); // File reference or text extraction
        break;
      case 'structured-criteria':
        fieldSchema = z.array(z.object({ criterion: z.string(), weight: z.string().optional() }));
        break;
      case 'email':
        fieldSchema = z.string().email().max(500);
        break;
      case 'url':
        fieldSchema = z.string().url().max(2000);
        break;
      default: {
        let strSchema = z.string().max(def.validation?.maxLength ?? MAX_INPUT_TEXT_LENGTH);
        if (def.validation?.minLength) strSchema = strSchema.min(def.validation.minLength);
        if (def.validation?.pattern) {
          strSchema = strSchema.regex(
            new RegExp(def.validation.pattern),
            def.validation.patternMessage ?? 'Invalid format'
          );
        }
        fieldSchema = strSchema;
        break;
      }
    }

    if (!def.required) {
      fieldSchema = fieldSchema.optional();
    }

    shape[def.fieldKey] = fieldSchema;
  }

  return z.object(shape);
}
