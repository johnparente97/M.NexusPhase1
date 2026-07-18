-- ─── Meridian Nexus — Security and Payments Tables ──────────────────
-- Migration: 0002_security_and_payments.sql
-- Creates tables for SIWE wallet linking, payment intents, replay protection, and idempotency
-- ─────────────────────────────────────────────────────────────────────

PRAGMA foreign_keys = ON;

-- ── Web3 Nonces (SIWE Sign-In) ──
CREATE TABLE IF NOT EXISTS web3_nonces (
  nonce TEXT PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Linked Wallets (linked to user profiles) ──
CREATE TABLE IF NOT EXISTS linked_wallets (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wallet_address TEXT UNIQUE NOT NULL,
  verified_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_linked_wallets_user ON linked_wallets(user_id);
CREATE INDEX idx_linked_wallets_address ON linked_wallets(wallet_address);

-- ── Wallet Challenges (linking challenge state) ──
CREATE TABLE IF NOT EXISTS wallet_challenges (
  id TEXT PRIMARY KEY,
  challenge TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_wallet_challenges_address ON wallet_challenges(wallet_address);

-- ── Payment Intents ──
CREATE TABLE IF NOT EXISTS payment_intents (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  linked_wallet TEXT NOT NULL,
  workflow_id TEXT NOT NULL REFERENCES workflows(id),
  workflow_version_id TEXT NOT NULL REFERENCES workflow_versions(id),
  amount REAL NOT NULL,
  token TEXT NOT NULL,
  token_decimals INTEGER NOT NULL,
  chain_id INTEGER NOT NULL,
  recipient TEXT NOT NULL,
  nonce TEXT UNIQUE NOT NULL,
  valid_after INTEGER NOT NULL,
  valid_before INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'signed', 'processing', 'consumed', 'failed', 'refunded')),
  signature TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_payment_intents_user ON payment_intents(user_id);
CREATE INDEX idx_payment_intents_nonce ON payment_intents(nonce);
CREATE INDEX idx_payment_intents_status ON payment_intents(status);

-- ── Payment Nonces (Replay Protection) ──
CREATE TABLE IF NOT EXISTS payment_nonces (
  nonce TEXT PRIMARY KEY,
  consumed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ── Idempotency Keys (Execution De-duplication) ──
CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  run_id TEXT NOT NULL REFERENCES workflow_runs(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_idempotency_run ON idempotency_keys(run_id);
