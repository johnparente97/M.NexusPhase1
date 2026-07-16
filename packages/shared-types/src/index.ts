// ─── Meridian Nexus — Shared Types ───────────────────────────────────
// All types shared between @meridian-nexus/web and @meridian-nexus/api.
// These types define the contract between frontend and backend.
// ─────────────────────────────────────────────────────────────────────

// ── Enums ──

export type WorkflowCategory =
  | 'research'
  | 'marketing'
  | 'sales'
  | 'business-operations'
  | 'data-analysis'
  | 'development'
  | 'content'
  | 'finance'
  | 'customer-support'
  | 'productivity'
  | 'procurement'
  | 'strategy';

export type WorkflowVisibility = 'public' | 'private' | 'unlisted';

export type WorkflowStatus = 'draft' | 'published' | 'unpublished' | 'archived';

export type RunStatus = 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';

export type StepStatus = 'pending' | 'running' | 'completed' | 'failed' | 'skipped';

export type SettlementStatus = 'pending' | 'authorized' | 'settled' | 'failed' | 'refunded';

export type UserRole = 'user' | 'creator' | 'admin';

export type InputFieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'currency'
  | 'url'
  | 'email'
  | 'date'
  | 'select'
  | 'multi-select'
  | 'radio'
  | 'checkbox'
  | 'toggle'
  | 'tags'
  | 'file'
  | 'range'
  | 'tone'
  | 'audience'
  | 'repeating-list'
  | 'structured-criteria';

export type OutputSectionType =
  | 'heading'
  | 'paragraph'
  | 'list'
  | 'table'
  | 'metrics'
  | 'recommendations'
  | 'risks'
  | 'action-items'
  | 'timeline'
  | 'content-draft'
  | 'comparison'
  | 'sources'
  | 'confidence'
  | 'metadata';

export type SettlementMode = 'demo' | 'meridian-testnet' | 'meridian-production';

// ── Core Entities ──

export interface User {
  id: string;
  clerkId: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio: string | null;
  company: string | null;
  website: string | null;
  location: string | null;
  theme: 'dark' | 'light' | 'system';
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  displayName: string;
  bio: string | null;
  avatarUrl: string | null;
  website: string | null;
  verified: boolean;
  verificationLabel: string;
  publishedWorkflowCount: number;
  totalRuns: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
}

// ── Workflow System ──

export interface Workflow {
  id: string;
  creatorId: string;
  currentVersionId: string | null;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  outcomeStatement: string;
  category: WorkflowCategory;
  tags: string[];
  status: WorkflowStatus;
  visibility: WorkflowVisibility;
  isFree: boolean;
  pricePerRun: number;
  estimatedDurationSeconds: number;
  thumbnailUrl: string | null;
  totalRuns: number;
  completedRuns: number;
  averageRating: number;
  reviewCount: number;
  savedCount: number;
  dataHandlingSummary: string;
  refundPolicy: string;
  verified: boolean;
  verificationLabel: string;
  featuredOrder: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  // Joined fields
  creator?: CreatorProfile;
  currentVersion?: WorkflowVersion;
  capabilities?: Capability[];
}

export interface WorkflowVersion {
  id: string;
  workflowId: string;
  versionNumber: number;
  versionNotes: string;
  systemInstructions: string;
  creatorInstructions: string;
  modelProvider: string;
  modelId: string;
  inputDefinitions: WorkflowInputDefinition[];
  outputDefinitions: WorkflowOutputDefinition[];
  outputSchema: Record<string, unknown> | null;
  maxTokens: number;
  temperature: number;
  createdAt: string;
}

export interface WorkflowInputDefinition {
  id: string;
  versionId: string;
  fieldKey: string;
  label: string;
  description: string | null;
  type: InputFieldType;
  placeholder: string | null;
  required: boolean;
  defaultValue: string | null;
  options: InputFieldOption[] | null;
  validation: InputFieldValidation | null;
  displayOrder: number;
}

export interface InputFieldOption {
  label: string;
  value: string;
}

export interface InputFieldValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  patternMessage?: string;
  maxItems?: number;
  maxFileSize?: number;
  allowedFileTypes?: string[];
}

export interface WorkflowOutputDefinition {
  id: string;
  versionId: string;
  sectionKey: string;
  label: string;
  type: OutputSectionType;
  description: string | null;
  displayOrder: number;
}

export interface Capability {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface WorkflowCapability {
  workflowId: string;
  capabilityId: string;
}

// ── Execution ──

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowVersionId: string;
  userId: string;
  status: RunStatus;
  inputs: Record<string, unknown>;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  modelProvider: string;
  modelId: string;
  isFallback: boolean;
  fallbackReason: string | null;
  estimatedPrice: number;
  actualPrice: number;
  errorMessage: string | null;
  errorCode: string | null;
  createdAt: string;
  updatedAt: string;
  // Joined fields
  workflow?: Workflow;
  steps?: WorkflowRunStep[];
  result?: WorkflowResult;
  settlement?: SettlementReceipt;
}

export interface WorkflowRunStep {
  id: string;
  runId: string;
  stepKey: string;
  label: string;
  status: StepStatus;
  startedAt: string | null;
  completedAt: string | null;
  durationMs: number | null;
  metadata: Record<string, unknown> | null;
  displayOrder: number;
}

export interface WorkflowResult {
  id: string;
  runId: string;
  sections: ResultSection[];
  rawOutput: string | null;
  metadata: ResultMetadata;
  createdAt: string;
}

export interface ResultSection {
  key: string;
  label: string;
  type: OutputSectionType;
  content: unknown; // Varies by type
}

export interface ResultMetadata {
  modelProvider: string;
  modelId: string;
  isFallback: boolean;
  fallbackReason?: string;
  tokensUsed?: number;
  promptTokens?: number;
  completionTokens?: number;
  generationTimeMs?: number;
  workflowVersion: number;
  confidence?: number;
}

// ── Settlement ──

export interface SettlementAuthorization {
  id: string;
  runId: string;
  userId: string;
  amount: number;
  currency: string;
  status: SettlementStatus;
  paymentMethod: string;
  payerReference: string;
  transactionReference: string;
  network: string;
  mode: SettlementMode;
  createdAt: string;
  expiresAt: string;
}

export interface SettlementReceipt {
  id: string;
  authorizationId: string;
  runId: string;
  amount: number;
  currency: string;
  status: SettlementStatus;
  paymentMethod: string;
  payerReference: string;
  receiverReference: string;
  transactionReference: string;
  receiptIdentifier: string;
  network: string;
  mode: SettlementMode;
  refundEligible: boolean;
  settledAt: string;
  createdAt: string;
  originChain?: string;
  destinationChain?: string;
  mrdnCashbackAmount?: number;
  mrdnCashbackEligible?: boolean;
}

// ── Social ──

export interface Review {
  id: string;
  workflowId: string;
  userId: string;
  runId: string;
  rating: number;
  comment: string | null;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  // Joined
  user?: Pick<User, 'id' | 'displayName' | 'avatarUrl'>;
}

export interface Favorite {
  id: string;
  userId: string;
  workflowId: string;
  createdAt: string;
}

// ── Analytics ──

export interface CreatorMetrics {
  publishedWorkflows: number;
  draftWorkflows: number;
  totalRuns: number;
  completedRuns: number;
  completionRate: number;
  grossVolume: number;
  estimatedEarnings: number;
  averageRating: number;
  reviewCount: number;
  savedCount: number;
  repeatUserRate: number;
  mostPopularWorkflow: Pick<Workflow, 'id' | 'name' | 'totalRuns'> | null;
}

export interface CreatorAnalyticsPoint {
  date: string;
  runs: number;
  revenue: number;
}

export interface UsageMetrics {
  totalRuns: number;
  freeRuns: number;
  paidRuns: number;
  totalSpent: number;
  savedWorkflows: number;
  reviewsWritten: number;
}

// ── System ──

export interface AuditEvent {
  id: string;
  userId: string | null;
  action: string;
  resourceType: string;
  resourceId: string;
  metadata: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
}

export interface FeatureFlag {
  id: string;
  key: string;
  value: string;
  description: string;
  updatedAt: string;
}

// ── API Types ──

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// ── Request/Response Types ──

export interface WorkflowListParams {
  search?: string;
  category?: WorkflowCategory;
  status?: string;
  minRating?: number;
  maxPrice?: number;
  isFree?: boolean;
  verified?: boolean;
  sort?: 'popular' | 'newest' | 'rating' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
}

export interface CreateWorkflowInput {
  name: string;
  shortDescription: string;
  fullDescription: string;
  outcomeStatement: string;
  category: WorkflowCategory;
  tags: string[];
  isFree: boolean;
  pricePerRun: number;
  estimatedDurationSeconds: number;
  dataHandlingSummary: string;
  refundPolicy: string;
  visibility: WorkflowVisibility;
  // Version data
  systemInstructions: string;
  creatorInstructions: string;
  modelProvider: string;
  modelId: string;
  inputDefinitions: Omit<WorkflowInputDefinition, 'id' | 'versionId'>[];
  outputDefinitions: Omit<WorkflowOutputDefinition, 'id' | 'versionId'>[];
}

export interface UpdateWorkflowInput extends Partial<CreateWorkflowInput> {}

export interface ExecuteWorkflowInput {
  workflowId: string;
  inputs: Record<string, unknown>;
  turnstileToken?: string;
}

export interface RunEstimate {
  price: number;
  currency: string;
  estimatedDurationSeconds: number;
  isFree: boolean;
  settlementMode: SettlementMode;
  modelProvider: string;
}

export interface SubmitReviewInput {
  workflowId: string;
  runId: string;
  rating: number;
  comment?: string;
}

// ── Model Provider Types ──

export interface ModelGenerationRequest {
  systemPrompt: string;
  userPrompt: string;
  outputSchema?: Record<string, unknown>;
  maxTokens?: number;
  temperature?: number;
}

export interface ModelGenerationResult {
  content: string;
  parsedSections?: ResultSection[];
  tokensUsed?: number;
  promptTokens?: number;
  completionTokens?: number;
  generationTimeMs: number;
  provider: string;
  model: string;
  isFallback: boolean;
  fallbackReason?: string;
}

export interface ModelProviderHealth {
  available: boolean;
  provider: string;
  latencyMs?: number;
  quotaRemaining?: number;
  message?: string;
}

// ── Settlement Provider Types ──

export interface PaymentAuthorizationInput {
  userId: string;
  runId: string;
  amount: number;
  currency: string;
  workflowId: string;
  workflowName: string;
}

export interface PaymentVerification {
  authorized: boolean;
  authorizationId: string;
  transactionReference: string;
  expiresAt: string;
}

export interface SettlementRequest {
  authorizationId: string;
  runId: string;
  amount: number;
  currency: string;
}

export interface RefundRequest {
  receiptId: string;
  reason: string;
}

export interface RefundResult {
  success: boolean;
  refundId: string;
  amount: number;
  message: string;
}

// ── UI Helper Types ──

export interface CategoryInfo {
  value: WorkflowCategory;
  label: string;
  icon: string;
  description: string;
}

export const WORKFLOW_CATEGORIES: CategoryInfo[] = [
  { value: 'research', label: 'Research', icon: 'search', description: 'Market research, competitive analysis, intelligence' },
  { value: 'marketing', label: 'Marketing', icon: 'megaphone', description: 'Campaigns, content, brand strategy' },
  { value: 'sales', label: 'Sales', icon: 'trending-up', description: 'Outreach, prospecting, pipeline' },
  { value: 'business-operations', label: 'Business Operations', icon: 'settings', description: 'Process optimization, planning' },
  { value: 'data-analysis', label: 'Data Analysis', icon: 'bar-chart-3', description: 'Analytics, insights, reporting' },
  { value: 'development', label: 'Development', icon: 'code', description: 'Code review, architecture, documentation' },
  { value: 'content', label: 'Content', icon: 'file-text', description: 'Writing, social media, newsletters' },
  { value: 'finance', label: 'Finance', icon: 'dollar-sign', description: 'Budgets, forecasting, analysis' },
  { value: 'customer-support', label: 'Customer Support', icon: 'headphones', description: 'Response drafting, resolution' },
  { value: 'productivity', label: 'Productivity', icon: 'zap', description: 'Meeting prep, task management' },
  { value: 'procurement', label: 'Procurement', icon: 'shopping-cart', description: 'Vendor evaluation, sourcing' },
  { value: 'strategy', label: 'Strategy', icon: 'target', description: 'Planning, roadmaps, initiatives' },
];

// ── Execution Step Definitions ──

export const EXECUTION_STEPS = [
  { key: 'validate', label: 'Validating inputs', durationMs: 500 },
  { key: 'prepare', label: 'Preparing capabilities', durationMs: 800 },
  { key: 'authorize', label: 'Confirming Meridian authorization', durationMs: 1000 },
  { key: 'context', label: 'Preparing model context', durationMs: 500 },
  { key: 'generate', label: 'Running analysis', durationMs: 8000 },
  { key: 'validate-output', label: 'Validating structure', durationMs: 500 },
  { key: 'save', label: 'Saving execution history', durationMs: 300 },
  { key: 'finalize', label: 'Finalizing result', durationMs: 300 },
] as const;
