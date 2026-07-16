-- ─── Meridian Nexus — D1 Initial Schema ─────────────────────────────
-- Migration: 0001_initial_schema.sql
-- Creates all tables for Phase 1 MVP
-- ─────────────────────────────────────────────────────────────────────

-- Enable foreign keys
PRAGMA foreign_keys = ON;

-- ── Users ──

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'creator', 'admin')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);

-- ── User Profiles ──

CREATE TABLE IF NOT EXISTS user_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  bio TEXT,
  company TEXT,
  website TEXT,
  location TEXT,
  theme TEXT NOT NULL DEFAULT 'dark' CHECK (theme IN ('dark', 'light', 'system')),
  notifications_enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Creator Profiles ──

CREATE TABLE IF NOT EXISTS creator_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  verified INTEGER NOT NULL DEFAULT 0,
  verification_label TEXT NOT NULL DEFAULT 'Creator verification pending',
  published_workflow_count INTEGER NOT NULL DEFAULT 0,
  total_runs INTEGER NOT NULL DEFAULT 0,
  average_rating REAL NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_creator_profiles_user_id ON creator_profiles(user_id);

-- ── Workflows ──

CREATE TABLE IF NOT EXISTS workflows (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL REFERENCES creator_profiles(id),
  current_version_id TEXT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  outcome_statement TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'research', 'marketing', 'sales', 'business-operations',
    'data-analysis', 'development', 'content', 'finance',
    'customer-support', 'productivity', 'procurement', 'strategy'
  )),
  tags TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'unpublished', 'archived')),
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'unlisted')),
  is_free INTEGER NOT NULL DEFAULT 0,
  price_per_run REAL NOT NULL DEFAULT 0,
  estimated_duration_seconds INTEGER NOT NULL DEFAULT 30,
  thumbnail_url TEXT,
  total_runs INTEGER NOT NULL DEFAULT 0,
  completed_runs INTEGER NOT NULL DEFAULT 0,
  average_rating REAL NOT NULL DEFAULT 0,
  review_count INTEGER NOT NULL DEFAULT 0,
  saved_count INTEGER NOT NULL DEFAULT 0,
  data_handling_summary TEXT NOT NULL DEFAULT 'Inputs are processed in memory and not stored beyond execution.',
  refund_policy TEXT NOT NULL DEFAULT 'Demonstration runs are non-refundable.',
  verified INTEGER NOT NULL DEFAULT 0,
  verification_label TEXT NOT NULL DEFAULT 'Demonstration verification',
  featured_order INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  deleted_at TEXT
);

CREATE INDEX idx_workflows_creator_id ON workflows(creator_id);
CREATE INDEX idx_workflows_category ON workflows(category);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflows_slug ON workflows(slug);
CREATE INDEX idx_workflows_featured ON workflows(featured_order) WHERE featured_order IS NOT NULL;
CREATE INDEX idx_workflows_popular ON workflows(total_runs DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX idx_workflows_rating ON workflows(average_rating DESC) WHERE status = 'published' AND deleted_at IS NULL;

-- ── Workflow Versions ──

CREATE TABLE IF NOT EXISTS workflow_versions (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL DEFAULT 1,
  version_notes TEXT NOT NULL DEFAULT 'Initial version',
  system_instructions TEXT NOT NULL,
  creator_instructions TEXT NOT NULL DEFAULT '',
  model_provider TEXT NOT NULL DEFAULT 'gemini',
  model_id TEXT NOT NULL DEFAULT 'gemini-2.5-flash',
  output_schema TEXT,
  max_tokens INTEGER NOT NULL DEFAULT 4096,
  temperature REAL NOT NULL DEFAULT 0.7,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_workflow_versions_workflow ON workflow_versions(workflow_id);

-- ── Workflow Input Definitions ──

CREATE TABLE IF NOT EXISTS workflow_input_definitions (
  id TEXT PRIMARY KEY,
  version_id TEXT NOT NULL REFERENCES workflow_versions(id) ON DELETE CASCADE,
  field_key TEXT NOT NULL,
  label TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN (
    'text', 'textarea', 'number', 'currency', 'url', 'email', 'date',
    'select', 'multi-select', 'radio', 'checkbox', 'toggle', 'tags',
    'file', 'range', 'tone', 'audience', 'repeating-list', 'structured-criteria'
  )),
  placeholder TEXT,
  required INTEGER NOT NULL DEFAULT 1,
  default_value TEXT,
  options TEXT,
  validation TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_input_defs_version ON workflow_input_definitions(version_id);

-- ── Workflow Output Definitions ──

CREATE TABLE IF NOT EXISTS workflow_output_definitions (
  id TEXT PRIMARY KEY,
  version_id TEXT NOT NULL REFERENCES workflow_versions(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN (
    'heading', 'paragraph', 'list', 'table', 'metrics', 'recommendations',
    'risks', 'action-items', 'timeline', 'content-draft', 'comparison',
    'sources', 'confidence', 'metadata'
  )),
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_output_defs_version ON workflow_output_definitions(version_id);

-- ── Capabilities ──

CREATE TABLE IF NOT EXISTS capabilities (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'zap'
);

-- ── Workflow Capabilities ──

CREATE TABLE IF NOT EXISTS workflow_capabilities (
  workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  capability_id TEXT NOT NULL REFERENCES capabilities(id) ON DELETE CASCADE,
  PRIMARY KEY (workflow_id, capability_id)
);

-- ── Workflow Runs ──

CREATE TABLE IF NOT EXISTS workflow_runs (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL REFERENCES workflows(id),
  workflow_version_id TEXT NOT NULL REFERENCES workflow_versions(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  inputs TEXT NOT NULL DEFAULT '{}',
  started_at TEXT,
  completed_at TEXT,
  duration_ms INTEGER,
  model_provider TEXT NOT NULL DEFAULT 'demo',
  model_id TEXT NOT NULL DEFAULT 'demo-v1',
  is_fallback INTEGER NOT NULL DEFAULT 0,
  fallback_reason TEXT,
  estimated_price REAL NOT NULL DEFAULT 0,
  actual_price REAL NOT NULL DEFAULT 0,
  error_message TEXT,
  error_code TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_runs_user ON workflow_runs(user_id);
CREATE INDEX idx_runs_workflow ON workflow_runs(workflow_id);
CREATE INDEX idx_runs_status ON workflow_runs(status);
CREATE INDEX idx_runs_created ON workflow_runs(created_at DESC);

-- ── Workflow Run Steps ──

CREATE TABLE IF NOT EXISTS workflow_run_steps (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL REFERENCES workflow_runs(id) ON DELETE CASCADE,
  step_key TEXT NOT NULL,
  label TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'skipped')),
  started_at TEXT,
  completed_at TEXT,
  duration_ms INTEGER,
  metadata TEXT,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_run_steps_run ON workflow_run_steps(run_id);

-- ── Workflow Results ──

CREATE TABLE IF NOT EXISTS workflow_results (
  id TEXT PRIMARY KEY,
  run_id TEXT UNIQUE NOT NULL REFERENCES workflow_runs(id) ON DELETE CASCADE,
  sections TEXT NOT NULL DEFAULT '[]',
  raw_output TEXT,
  metadata TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Favorites ──

CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(user_id, workflow_id)
);

CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_workflow ON favorites(workflow_id);

-- ── Reviews ──

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  workflow_id TEXT NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  run_id TEXT NOT NULL REFERENCES workflow_runs(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  helpful_count INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_reviews_workflow ON reviews(workflow_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);

-- ── Settlement Authorizations ──

CREATE TABLE IF NOT EXISTS settlement_authorizations (
  id TEXT PRIMARY KEY,
  run_id TEXT NOT NULL REFERENCES workflow_runs(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'authorized', 'settled', 'failed', 'refunded')),
  payment_method TEXT NOT NULL DEFAULT 'Meridian settlement',
  payer_reference TEXT NOT NULL,
  transaction_reference TEXT NOT NULL,
  network TEXT NOT NULL DEFAULT 'Meridian Demo Network',
  mode TEXT NOT NULL DEFAULT 'demo' CHECK (mode IN ('demo', 'meridian-testnet', 'meridian-production')),
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

CREATE INDEX idx_settlement_auth_run ON settlement_authorizations(run_id);

-- ── Settlement Receipts ──

CREATE TABLE IF NOT EXISTS settlement_receipts (
  id TEXT PRIMARY KEY,
  authorization_id TEXT NOT NULL REFERENCES settlement_authorizations(id),
  run_id TEXT NOT NULL REFERENCES workflow_runs(id),
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'settled' CHECK (status IN ('pending', 'authorized', 'settled', 'failed', 'refunded')),
  payment_method TEXT NOT NULL DEFAULT 'Meridian settlement',
  payer_reference TEXT NOT NULL,
  receiver_reference TEXT NOT NULL,
  transaction_reference TEXT NOT NULL,
  receipt_identifier TEXT UNIQUE NOT NULL,
  network TEXT NOT NULL DEFAULT 'Meridian Demo Network',
  mode TEXT NOT NULL DEFAULT 'demo',
  refund_eligible INTEGER NOT NULL DEFAULT 1,
  settled_at TEXT NOT NULL DEFAULT (datetime('now')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_settlement_receipt_run ON settlement_receipts(run_id);

-- ── Rate Limit Counters ──

CREATE TABLE IF NOT EXISTS rate_limit_counters (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  window_start TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  UNIQUE(key, window_start)
);

CREATE INDEX idx_rate_limit_key ON rate_limit_counters(key, window_start);

-- ── Feature Flags ──

CREATE TABLE IF NOT EXISTS feature_flags (
  id TEXT PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL DEFAULT 'true',
  description TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Audit Events ──

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT NOT NULL,
  metadata TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_audit_user ON audit_events(user_id);
CREATE INDEX idx_audit_action ON audit_events(action);
CREATE INDEX idx_audit_created ON audit_events(created_at DESC);

-- ── Usage Metrics (aggregated) ──

CREATE TABLE IF NOT EXISTS usage_metrics (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  total_runs INTEGER NOT NULL DEFAULT 0,
  free_runs INTEGER NOT NULL DEFAULT 0,
  paid_runs INTEGER NOT NULL DEFAULT 0,
  total_spent REAL NOT NULL DEFAULT 0,
  ai_requests INTEGER NOT NULL DEFAULT 0,
  UNIQUE(user_id, date)
);

CREATE INDEX idx_usage_user_date ON usage_metrics(user_id, date);

-- ── Seed: Default Capabilities ──

INSERT INTO capabilities (id, name, slug, description, icon) VALUES
  ('cap-research', 'Research & Analysis', 'research-analysis', 'Deep research, data gathering, and analytical capabilities', 'search'),
  ('cap-writing', 'Content Writing', 'content-writing', 'Professional content creation and copywriting', 'file-text'),
  ('cap-data', 'Data Processing', 'data-processing', 'Data transformation, analysis, and visualization', 'bar-chart-3'),
  ('cap-strategy', 'Strategic Planning', 'strategic-planning', 'Business strategy, roadmaps, and planning frameworks', 'target'),
  ('cap-communication', 'Communication', 'communication', 'Message crafting, outreach, and response generation', 'message-square'),
  ('cap-evaluation', 'Evaluation & Scoring', 'evaluation-scoring', 'Systematic evaluation, comparison, and scoring', 'check-circle'),
  ('cap-extraction', 'Information Extraction', 'info-extraction', 'Extract structured data from unstructured content', 'filter'),
  ('cap-creative', 'Creative Generation', 'creative-generation', 'Creative ideation, brainstorming, and concept development', 'sparkles');

-- ── Seed: Default Feature Flags ──

INSERT INTO feature_flags (id, key, value, description) VALUES
  ('ff-1', 'ENABLE_LIVE_AI', 'true', 'Enable live Gemini AI generation'),
  ('ff-2', 'ENABLE_FILE_UPLOAD', 'false', 'Enable file upload in workflow inputs'),
  ('ff-3', 'MAX_FREE_RUNS_PER_DAY', '50', 'Maximum free workflow runs per user per day'),
  ('ff-4', 'ENABLE_TURNSTILE', 'false', 'Enable Cloudflare Turnstile bot protection'),
  ('ff-5', 'MAINTENANCE_MODE', 'false', 'Disable workflow execution globally');
