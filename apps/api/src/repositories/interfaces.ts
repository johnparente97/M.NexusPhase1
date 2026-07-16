import {
  Workflow,
  WorkflowVersion,
  WorkflowInputDefinition,
  WorkflowOutputDefinition,
  WorkflowRun,
  WorkflowRunStep,
  WorkflowResult,
  User,
  UserProfile,
  CreatorProfile,
  Review,
  Favorite,
  CreatorMetrics,
  UsageMetrics,
  WorkflowListParams,
  CreateWorkflowInput,
  UpdateWorkflowInput,
} from '@meridian-nexus/shared-types';

export interface WorkflowRepository {
  list(params: WorkflowListParams): Promise<{ workflows: Workflow[]; total: number }>;
  getById(id: string): Promise<Workflow | null>;
  getBySlug(slug: string): Promise<Workflow | null>;
  create(creatorId: string, input: CreateWorkflowInput): Promise<Workflow>;
  update(id: string, input: UpdateWorkflowInput): Promise<Workflow>;
  publish(id: string): Promise<Workflow>;
  unpublish(id: string): Promise<Workflow>;
  createVersion(workflowId: string, versionNumber: number, input: CreateWorkflowInput): Promise<WorkflowVersion>;
}

export interface RunRepository {
  create(run: Omit<WorkflowRun, 'createdAt' | 'updatedAt'>): Promise<WorkflowRun>;
  getById(id: string): Promise<WorkflowRun | null>;
  updateStatus(id: string, status: WorkflowRun['status'], extra?: Partial<WorkflowRun>): Promise<WorkflowRun>;
  createStep(step: WorkflowRunStep): Promise<WorkflowRunStep>;
  updateStepStatus(id: string, status: WorkflowRunStep['status'], durationMs?: number): Promise<void>;
  saveResult(result: WorkflowResult): Promise<WorkflowResult>;
  getResultByRunId(runId: string): Promise<WorkflowResult | null>;
  listUserRuns(userId: string, filters?: { status?: string; limit?: number }): Promise<WorkflowRun[]>;
  createSettlementReceipt(receipt: any): Promise<void>;
  getSettlementReceipt(runId: string): Promise<any | null>;
}

export interface UserRepository {
  getById(id: string): Promise<User | null>;
  getByClerkId(clerkId: string): Promise<User | null>;
  createOrUpdateFromClerk(user: { clerkId: string; email: string; displayName: string; avatarUrl?: string }): Promise<User>;
  updateProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile>;
  getProfile(userId: string): Promise<UserProfile | null>;
  getCreatorProfile(userId: string): Promise<CreatorProfile | null>;
  createCreatorProfile(userId: string, profile: { displayName: string; bio?: string; website?: string }): Promise<CreatorProfile>;
}

export interface ReviewRepository {
  create(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review>;
  listByWorkflowId(workflowId: string): Promise<Review[]>;
  getAverageRating(workflowId: string): Promise<{ averageRating: number; count: number }>;
}

export interface FavoriteRepository {
  toggle(userId: string, workflowId: string): Promise<{ favorited: boolean }>;
  isFavorited(userId: string, workflowId: string): Promise<boolean>;
  listUserFavorites(userId: string): Promise<Workflow[]>;
}

export interface CreatorRepository {
  getMetrics(creatorId: string): Promise<CreatorMetrics>;
  getAnalyticsChart(creatorId: string, days?: number): Promise<Array<{ date: string; runs: number; revenue: number }>>;
}
