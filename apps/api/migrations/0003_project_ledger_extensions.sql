-- ─── Meridian Nexus — Project Ledger Extensions ──────────────────────
-- Migration: 0003_project_ledger_extensions.sql
-- Adds columns to settlement_receipts to track cross-chain routing and fee attributions
-- ─────────────────────────────────────────────────────────────────────

ALTER TABLE settlement_receipts ADD COLUMN origin_chain TEXT DEFAULT 'eip155:84532';
ALTER TABLE settlement_receipts ADD COLUMN destination_chain TEXT DEFAULT 'eip155:84532';
ALTER TABLE settlement_receipts ADD COLUMN mrdn_cashback_eligible INTEGER DEFAULT 1;
ALTER TABLE settlement_receipts ADD COLUMN mrdn_cashback_amount REAL DEFAULT 0.0;
ALTER TABLE settlement_receipts ADD COLUMN protocol_fee REAL DEFAULT 0.0;
ALTER TABLE settlement_receipts ADD COLUMN creator_earnings REAL DEFAULT 0.0;
