import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  HardDrive,
  Coins,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  Sliders,
  Filter,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const OPERATIONAL_RUNS = [
  {
    id: 'run-9021',
    workflow: 'Financial Data Summarizer',
    status: 'completed' as const,
    duration: '2.4s',
    cost: '$0.00050',
    executedAt: '10 mins ago',
    provider: 'DeepSeek R1 / AntSeed',
  },
  {
    id: 'run-9020',
    workflow: 'Multi-Agent Web Extraction',
    status: 'running' as const,
    duration: '1.1s',
    cost: '$0.00012',
    executedAt: 'Just now',
    provider: 'Dolphin 8x7B Host',
  },
  {
    id: 'run-9019',
    workflow: 'Filecoin Storage Backup',
    status: 'completed' as const,
    duration: '0.8s',
    cost: 'Free ($0.00)',
    executedAt: '1 hour ago',
    provider: 'Filecoin Network',
  },
];

const BUDGET_CONSUMPTION = {
  allocated: 100.0,
  spent: 24.5,
  remaining: 75.5,
  currency: 'USDC',
};

export default function OperateCenter() {
  const [activeTab, setActiveTab] = useState<'runs' | 'assets' | 'budgets' | 'receipts'>('runs');

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--nx-border)] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Operate <span className="text-prismatic">Command Center</span>
            </h1>
            <TruthStateBadge status="production" text="Telemetry Live" />
          </div>
          <p className="text-xs sm:text-sm text-[var(--nx-text-secondary)] mt-1">
            Manage active execution runs, cloud assets, prepaid budgets, payment receipts, and policy compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button to="/payments" variant="primary" size="sm" leftIcon={<Coins className="h-4 w-4" />}>
            Manage Vault
          </Button>
        </div>
      </div>

      {/* ── Quick Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-400">Monthly Budget Spent</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">${BUDGET_CONSUMPTION.spent.toFixed(2)}</span>
            <span className="text-xs font-mono text-[#00F5D4]">75.5% Remaining</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00F5D4] to-[#A855F7]" style={{ width: '24.5%' }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-400">Total Execution Runs</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">1,420</span>
            <span className="text-xs font-mono text-[#00F5D4]">99.8% Success</span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">Avg Latency: 420ms</span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-400">Encrypted Cloud Storage</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">2.4 GB</span>
            <span className="text-xs font-mono text-[#A855F7]">Filecoin / S3</span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">5 Active Files & Memories</span>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-2 shadow-sm">
          <span className="text-xs font-mono text-zinc-400">Policy & Compliance</span>
          <div className="flex items-baseline justify-between">
            <span className="font-display font-extrabold text-2xl text-white">0 Violations</span>
            <span className="text-xs font-mono text-[#00F5D4]">Compliant</span>
          </div>
          <span className="text-[11px] text-zinc-500 font-mono">Spending Caps Enforced</span>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex items-center gap-2 border-b border-[var(--nx-border)] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('runs')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border',
            activeTab === 'runs'
              ? 'bg-[#00F5D4] text-zinc-950 border-transparent font-bold'
              : 'bg-[var(--nx-surface-1)] border-[var(--nx-border)] text-zinc-400 hover:text-white'
          )}
        >
          Active & Recent Runs
        </button>
        <button
          onClick={() => setActiveTab('assets')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border',
            activeTab === 'assets'
              ? 'bg-[#00F5D4] text-zinc-950 border-transparent font-bold'
              : 'bg-[var(--nx-surface-1)] border-[var(--nx-border)] text-zinc-400 hover:text-white'
          )}
        >
          Cloud Assets & Memory
        </button>
        <button
          onClick={() => setActiveTab('budgets')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border',
            activeTab === 'budgets'
              ? 'bg-[#00F5D4] text-zinc-950 border-transparent font-bold'
              : 'bg-[var(--nx-surface-1)] border-[var(--nx-border)] text-zinc-400 hover:text-white'
          )}
        >
          Budgets & Limits
        </button>
        <button
          onClick={() => setActiveTab('receipts')}
          className={cn(
            'px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border',
            activeTab === 'receipts'
              ? 'bg-[#00F5D4] text-zinc-950 border-transparent font-bold'
              : 'bg-[var(--nx-surface-1)] border-[var(--nx-border)] text-zinc-400 hover:text-white'
          )}
        >
          x402 Payment Receipts
        </button>
      </div>

      {/* ── Execution Feed ── */}
      <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-lg text-white">Execution Feed</h2>
          <span className="text-xs font-mono text-zinc-400">Showing last 3 runs</span>
        </div>

        <div className="divide-y divide-[var(--nx-border)]">
          {OPERATIONAL_RUNS.map((run) => (
            <div key={run.id} className="py-3.5 flex items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-8 w-8 rounded-lg bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-[#00F5D4] shrink-0">
                  <Activity className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white truncate">{run.workflow}</span>
                    <span className="text-[10px] text-zinc-500">({run.id})</span>
                  </div>
                  <span className="text-[11px] text-zinc-400 block truncate">by {run.provider}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0 text-right">
                <span className="text-[#00F5D4] font-bold">{run.cost}</span>
                <span className="text-zinc-400 text-[11px] hidden sm:inline">{run.duration}</span>
                <TruthStateBadge status={run.status === 'completed' ? 'production' : 'sandbox'} text={run.status.toUpperCase()} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
