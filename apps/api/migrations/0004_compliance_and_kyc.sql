-- ─── Meridian Nexus — Compliance & KYC Schema ───────────────────────
-- Migration: 0004_compliance_and_kyc.sql
-- Adds compliance and KYC verification tracking to users table
-- ─────────────────────────────────────────────────────────────────────

ALTER TABLE users ADD COLUMN kyc_status TEXT DEFAULT 'verified' CHECK (kyc_status IN ('pending', 'verified', 'rejected'));
