export type Bindings = {
  DB: D1Database;
  GEMINI_API_KEY?: string;
  CLERK_SECRET_KEY?: string;
  CLERK_PUBLISHABLE_KEY?: string;
  CLERK_JWT_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CORS_ORIGIN?: string;
  ENABLE_LIVE_AI?: string;
  ENVIRONMENT?: string;
  CHAIN_ID?: string;
  USDC_ADDRESS?: string;
  MERIDIAN_FACILITATOR_ADDRESS?: string;
  RPC_URL?: string;
};

export type Variables = {
  user?: {
    id: string;
    email: string;
    displayName: string;
    role: 'user' | 'creator' | 'admin';
  };
};

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};
