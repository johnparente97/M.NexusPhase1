import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Globe,
  FileText,
  AlertCircle,
  CheckCircle2,
  Server,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';

interface JurisdictionStatus {
  country: string;
  code: string;
  aiMarketplace: 'Available' | 'Verification Required';
  storageService: 'Available';
  statusColor: string;
}

const JURISDICTION_MATRIX: JurisdictionStatus[] = [
  {
    country: 'United States',
    code: 'US',
    aiMarketplace: 'Available',
    storageService: 'Available',
    statusColor: 'text-emerald-400',
  },
  {
    country: 'European Union (27 Nations)',
    code: 'EU',
    aiMarketplace: 'Available',
    storageService: 'Available',
    statusColor: 'text-emerald-400',
  },
  {
    country: 'United Kingdom',
    code: 'UK',
    aiMarketplace: 'Available',
    storageService: 'Available',
    statusColor: 'text-emerald-400',
  },
  {
    country: 'Japan',
    code: 'JP',
    aiMarketplace: 'Available',
    storageService: 'Available',
    statusColor: 'text-emerald-400',
  },
  {
    country: 'Australia & New Zealand',
    code: 'AU/NZ',
    aiMarketplace: 'Available',
    storageService: 'Available',
    statusColor: 'text-emerald-400',
  },
];

export default function TrustCenter() {
  const [activeTab, setActiveTab] = useState<'overview' | 'jurisdiction' | 'terms' | 'privacy'>('overview');

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none pb-20">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--nx-border)] pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-[#6366F1] bg-[#6366F1]/10 border border-[#6366F1]/20 px-2 py-0.5 rounded-full uppercase">
              Trust & Security
            </span>
            <TruthStateBadge status="production" text="All Systems Operational" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Trust Center & <span className="text-prismatic">Platform Standards</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Platform security standards, privacy policies, data handling, and marketplace review guidelines.
          </p>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-3 shadow-lg">
          <div className="p-2.5 rounded-xl bg-[#6366F1]/10 text-[#6366F1] border border-[#6366F1]/20 w-fit">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-white">Client-Side Privacy</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            AI memory, workflow outputs, and stored files support client-side encryption. Data keys remain under user control.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-3 shadow-lg">
          <div className="p-2.5 rounded-xl bg-[#00F5D4]/10 text-[#00F5D4] border border-[#00F5D4]/20 w-fit">
            <Globe className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-white">Global Service Standards</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Service availability matrix ensures marketplace compliance with regional data processing standards.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-3 shadow-lg">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="font-display text-base font-bold text-white">Agent Review & Safety</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Marketplace capabilities undergo sandbox testing, tool permission disclosures, and spending budget caps.
          </p>
        </div>
      </div>

      {/* Jurisdiction Table */}
      <div className="rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[var(--nx-border)] pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#00F5D4]" />
              <span>Regional Availability Matrix</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">Service availability by region.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[var(--nx-border)] text-zinc-500 text-[10px] uppercase">
                <th className="pb-3">Region</th>
                <th className="pb-3">AI Marketplace</th>
                <th className="pb-3">File Storage</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--nx-border)] text-zinc-300">
              {JURISDICTION_MATRIX.map((j) => (
                <tr key={j.code}>
                  <td className="py-3 font-bold text-white">{j.country} ({j.code})</td>
                  <td className="py-3 text-emerald-400 font-bold">{j.aiMarketplace}</td>
                  <td className="py-3 text-emerald-400 font-bold">{j.storageService}</td>
                  <td className="py-3 text-right font-bold text-emerald-400">Available</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
