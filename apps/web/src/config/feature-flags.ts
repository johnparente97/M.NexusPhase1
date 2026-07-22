// ─── Meridian Nexus — Feature Flags & Integration Configuration ───────
// Centralized configuration for backend service boundaries, mock modes, & feature flags.
// ─────────────────────────────────────────────────────────────────────

export interface FeatureFlags {
  // Mock vs Production service toggles
  useMockApi: boolean;
  useMockWallet: boolean;
  useMockInference: boolean;
  useMockSettlement: boolean;

  // Feature Toggles
  enableDecentralizedMarketplace: boolean;
  enableWorkflowBuilder: boolean;
  enableOrgPermissions: boolean;
  enableMrdnCashbackBenefit: boolean;

  // Environmental Configuration
  apiBaseUrl: string;
  defaultChainId: number;
  environment: 'development' | 'staging' | 'production';
}

export const getFeatureFlags = (): FeatureFlags => {
  const env = (import.meta as any).env || {};

  return {
    useMockApi: env.VITE_USE_MOCK_API === 'true' || true, // Default to resilient fallback mock mode
    useMockWallet: env.VITE_USE_MOCK_WALLET === 'true' || false,
    useMockInference: env.VITE_USE_MOCK_INFERENCE === 'true' || true,
    useMockSettlement: env.VITE_USE_MOCK_SETTLEMENT === 'true' || true,

    enableDecentralizedMarketplace: true,
    enableWorkflowBuilder: true,
    enableOrgPermissions: true,
    enableMrdnCashbackBenefit: true,

    apiBaseUrl: env.VITE_API_BASE_URL || 'https://meridian-nexus-api.jrjohnparente.workers.dev',
    defaultChainId: Number(env.VITE_DEFAULT_CHAIN_ID || 84532), // Base Sepolia default
    environment: (env.MODE as any) || 'development',
  };
};

export const FEATURE_FLAGS = getFeatureFlags();
