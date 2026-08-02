import {
  AdapterMetadata,
  HealthSnapshot,
  QuoteRequest,
  Quote,
  ExecutionHandle,
  EvidenceRecord,
  IntegrationMaturity,
} from '@nexus/shared-types';

export interface DiscoveryRequest {
  category?: string;
  query?: string;
  minMaturity?: IntegrationMaturity;
}

export interface ExecutionValidationRequest {
  capabilityId: string;
  inputs: Record<string, unknown>;
  quoteId?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

export interface ExecutionRequest {
  capabilityId: string;
  inputs: Record<string, unknown>;
  quoteId: string;
  accountRef?: string;
}

export interface ExecutionStatus {
  status: 'pending' | 'running' | 'completed' | 'failed';
  progressPercent?: number;
  output?: Record<string, unknown>;
  errorMessage?: string;
}

export interface UsageRecord {
  requestId: string;
  capabilityId: string;
  providerId: string;
  unitsConsumed: number;
  unitsUnit: string;
  atomicCost: string;
  timestamp: string;
}

export interface CapabilityAdapter {
  metadata(): Promise<AdapterMetadata>;
  health(): Promise<HealthSnapshot>;
  quote(input: QuoteRequest): Promise<Quote>;
  validate(input: ExecutionValidationRequest): Promise<ValidationResult>;
  execute(input: ExecutionRequest): Promise<ExecutionHandle>;
  getStatus(handle: ExecutionHandle): Promise<ExecutionStatus>;
  collectUsage(handle: ExecutionHandle): Promise<UsageRecord[]>;
  collectEvidence(handle: ExecutionHandle): Promise<EvidenceRecord[]>;
}

export class AdapterRegistry {
  private static adapters = new Map<string, CapabilityAdapter>();

  public static register(id: string, adapter: CapabilityAdapter): void {
    this.adapters.set(id, adapter);
  }

  public static get(id: string): CapabilityAdapter | undefined {
    return this.adapters.get(id);
  }

  public static list(): string[] {
    return Array.from(this.adapters.keys());
  }
}
