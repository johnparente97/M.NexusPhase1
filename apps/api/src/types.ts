export type Bindings = {
  DB: D1Database;
  GEMINI_API_KEY?: string;
  CLERK_SECRET_KEY?: string;
  CLERK_PUBLISHABLE_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  CORS_ORIGIN?: string;
  ENABLE_LIVE_AI?: string;
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
