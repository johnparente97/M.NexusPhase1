import React from 'react';
import { ShieldCheck, Award, Server, Coins, Lock, ArrowUpRight, FileCheck } from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';

const STAKING_TIERS = [
  {
    tier: 'Explorer',
    target: 'No Stake Required',
    lock: 'None',
    feeDiscount: '0% Protocol Discount',
    benefits: 'Standard API concurrency, public marketplace access.',
    status: 'production' as const,
  },
  {
    tier: 'Builder',
    target: '~$250 Target Equivalent',
    lock: '90 Days',
    feeDiscount: '10% Protocol Fee Reduction',
    benefits: 'Increased API concurrency, priority run queues, beta capabilities.',
    status: 'testnet' as const,
  },
  {
    tier: 'Operator',
    target: '~$2,500 Target Equivalent',
    lock: '180 Days',
    feeDiscount: '20% Protocol Fee Reduction',
    benefits: 'Advanced policy enforcement, custom domain routing, dedicated support.',
    status: 'planned' as const,
  },
  {
    tier: 'Studio',
    target: '~$10,000 Target Equivalent',
    lock: '365 Days',
    feeDiscount: '35% Protocol Fee Reduction',
    benefits: 'Max concurrency, governance proposal rights, custom SLAs.',
    status: 'planned' as const,
  },
];

export default function EarnGovernPage() {
  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--nx-border)] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Earn & <span className="text-prismatic">Govern</span>
            </h1>
            <TruthStateBadge status="testnet" text="Testnet Staking & Bonds" />
          </div>
          <p className="text-xs sm:text-sm text-[var(--nx-text-secondary)] mt-1">
            Provider operations, accountable security bonds, user staking benefit tiers, curator reputation, and governance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button to="/provide" variant="primary" size="sm" leftIcon={<Server className="h-4 w-4" />}>
            Provider Hub
          </Button>
        </div>
      </div>

      {/* ── Staking Purpose Architecture Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-3 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-[#00F5D4]/15 border border-[#00F5D4]/30 flex items-center justify-center text-[#00F5D4]">
            <Coins className="h-5 w-5" />
          </div>
          <h3 className="font-display font-extrabold text-base text-white">Access Staking</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Lock tokens for platform fee discounts, higher concurrency, and priority queue placement.
          </p>
          <TruthStateBadge status="testnet" text="Testnet Mode" />
        </div>

        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-3 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-[#D8B4FE]">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="font-display font-extrabold text-base text-white">Provider Bonds</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Providers post collateral scaled to transaction volume and SLA commitments to ensure accountability.
          </p>
          <TruthStateBadge status="testnet" text="Testnet Mode" />
        </div>

        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-3 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-[#FF007F]/15 border border-[#FF007F]/30 flex items-center justify-center text-[#FF66B2]">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-display font-extrabold text-base text-white">Curation Staking</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Curators stake behind verified provider lists and benchmarks. Verified manipulation results in slashing.
          </p>
          <TruthStateBadge status="planned" text="Phase 2 Roadmap" />
        </div>

        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-3 shadow-sm">
          <div className="h-10 w-10 rounded-xl bg-[#FFD700]/15 border border-[#FFD700]/30 flex items-center justify-center text-[#FFD700]">
            <Lock className="h-5 w-5" />
          </div>
          <h3 className="font-display font-extrabold text-base text-white">Governance Signaling</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Participate in nonbinding parameter signaling and community RFC discussions.
          </p>
          <TruthStateBadge status="sandbox" text="Signaling Only" />
        </div>
      </div>

      {/* ── Staking Benefit Tiers ── */}
      <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-6 shadow-xl">
        <div>
          <h2 className="font-display font-extrabold text-xl text-white">User Benefit Tiers (USD Target References)</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Fee reductions apply exclusively to the Nexus protocol fee, never the provider’s base price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STAKING_TIERS.map((t) => (
            <div key={t.tier} className="p-4 rounded-xl bg-[var(--nx-bg)] border border-[var(--nx-border)] flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-base text-white">{t.tier}</h4>
                  <TruthStateBadge status={t.status} />
                </div>
                <span className="text-xs font-mono text-[#00F5D4] font-bold block">{t.target}</span>
                <span className="text-[11px] font-mono text-zinc-500 block">Lock: {t.lock}</span>
                <p className="text-xs text-zinc-400 leading-relaxed pt-1">{t.benefits}</p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-xs font-mono font-bold text-white">
                {t.feeDiscount}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
