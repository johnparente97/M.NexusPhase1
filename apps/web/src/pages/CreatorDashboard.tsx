import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Wallet,
  Download,
  Plus,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  Percent,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { formatAtomicCurrency, atomicToDisplay, computePriceBreakdownAtomic } from '../utils/currency';
import { useAuth } from '../hooks/useAuth';

export default function CreatorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');

  // Atomic revenue metrics (micro-USDC: 1 USDC = 1,000,000 atomic)
  const grossSalesAtomic = '1450000000';      // $1,450.00
  const providerCostsAtomic = '362500000';    // $362.50
  const nexusFeesAtomic = '145000000';        // $145.00
  const refundsAtomic = '25000000';           // $25.00
  const netEarningsAtomic = '917500000';      // $917.50
  const pendingSettlementAtomic = '120000000';// $120.00
  const settledTotalAtomic = '797500000';     // $797.50

  const totalRuns = 1240;
  const successfulRuns = 1210;
  const failedRuns = 30;
  const refundRate = ((30 / totalRuns) * 100).toFixed(1);
  const profitMarginPercent = '63.3%';

  const publishedAgents = [
    {
      id: 'agent-1',
      name: 'Company Intelligence Brief',
      runs: 840,
      price: '$0.50',
      grossAtomic: '420000000',
      netAtomic: '273000000',
      rating: 4.9,
      status: 'production' as const,
    },
    {
      id: 'agent-2',
      name: 'DeepSeek R1 Architect Agent',
      runs: 400,
      price: '$0.25',
      grossAtomic: '100000000',
      netAtomic: '65000000',
      rating: 4.95,
      status: 'production' as const,
    },
  ];

  const recentSettlements = [
    {
      id: 'stl-1049',
      date: '2026-08-01 14:32',
      amountAtomic: '240000000',
      status: 'settled',
      facilitator: 'MRDN x402 Facilitator',
      txHash: '0x8f3c...921a',
    },
    {
      id: 'stl-1048',
      date: '2026-07-28 09:15',
      amountAtomic: '557500000',
      status: 'settled',
      facilitator: 'MRDN x402 Facilitator',
      txHash: '0x3a1b...44ff',
    },
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8,Listing,Runs,Gross(USDC),Net(USDC),Rating\n" +
      publishedAgents.map(a => `"${a.name}",${a.runs},${atomicToDisplay(a.grossAtomic)},${atomicToDisplay(a.netAtomic)},${a.rating}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexus_creator_earnings_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Top Header Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/20 px-2 py-0.5 rounded-full uppercase">
              Creator Console
            </span>
            <TruthStateBadge status="production" text="Verified Creator" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Creator Economy & <span className="text-prismatic">Revenue Analytics</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track gross sales, underlying provider costs, Nexus fees, and itemized USDC settlements.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            onClick={handleExportCSV}
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export CSV
          </Button>

          <Button
            to="/compose"
            variant="primary"
            size="sm"
            className="font-bold shadow-lg"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Publish New Agent
          </Button>
        </div>
      </div>

      {/* ── Financial Summary KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Net Creator Earnings */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#00F5D4]/15 via-[#00F5D4]/5 to-transparent border border-[#00F5D4]/40 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Net Creator Earnings</span>
            <DollarSign className="h-4 w-4 text-[#00F5D4]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-white">
            {formatAtomicCurrency(netEarningsAtomic)}
          </div>
          <div className="text-[10px] font-mono text-[#00F5D4] flex items-center gap-1 font-bold">
            <TrendingUp className="h-3 w-3" /> Profit Margin: {profitMarginPercent}
          </div>
        </div>

        {/* Gross Marketplace Sales */}
        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Gross Sales</span>
            <BarChart3 className="h-4 w-4 text-[#A855F7]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-white">
            {formatAtomicCurrency(grossSalesAtomic)}
          </div>
          <div className="text-[10px] font-mono text-zinc-500">
            Total customer payments received
          </div>
        </div>

        {/* Pending Settlement */}
        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Pending Settlement</span>
            <Wallet className="h-4 w-4 text-[#FFD700]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-[#FFD700]">
            {formatAtomicCurrency(pendingSettlementAtomic)}
          </div>
          <div className="text-[10px] font-mono text-zinc-500">
            Ready for next x402 payout batch
          </div>
        </div>

        {/* Total Runs & Refund Rate */}
        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Total Executions</span>
            <Activity className="h-4 w-4 text-[#60A5FA]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-white">
            {totalRuns.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between">
            <span className="text-[#00F5D4]">{successfulRuns} Success</span>
            <span className="text-rose-400">{refundRate}% Refund Rate</span>
          </div>
        </div>

      </div>

      {/* ── Transparent Price Construction Explanation ── */}
      <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-base text-white flex items-center gap-2">
            <Percent className="h-4 w-4 text-[#00F5D4]" />
            <span>Transparent Creator Earnings Formula</span>
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">USDC Atomic Ledger Standard</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-[var(--nx-bg)] border border-white/[0.06] space-y-1">
            <span className="text-zinc-500 block">Gross Customer Payment</span>
            <span className="text-white font-bold">{formatAtomicCurrency(grossSalesAtomic)}</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--nx-bg)] border border-white/[0.06] space-y-1">
            <span className="text-zinc-500 block">− Provider Costs</span>
            <span className="text-rose-400 font-bold">-{formatAtomicCurrency(providerCostsAtomic)}</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--nx-bg)] border border-white/[0.06] space-y-1">
            <span className="text-zinc-500 block">− Nexus Fee & Refunds</span>
            <span className="text-rose-400 font-bold">-{formatAtomicCurrency(BigInt(nexusFeesAtomic) + BigInt(refundsAtomic))}</span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--nx-bg)] border border-[#00F5D4]/40 space-y-1">
            <span className="text-[#00F5D4] block font-bold font-mono">= Net Creator Earnings</span>
            <span className="text-white font-extrabold text-sm">{formatAtomicCurrency(netEarningsAtomic)}</span>
          </div>
        </div>
      </div>

      {/* ── Published Listings Performance Table ── */}
      <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-extrabold text-base text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#A855F7]" />
            <span>Published Capabilities & Revenue Breakdown</span>
          </h3>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.08] text-zinc-500 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-semibold">Capability Name</th>
                <th className="pb-3 font-semibold">Listing Price</th>
                <th className="pb-3 font-semibold">Total Runs</th>
                <th className="pb-3 font-semibold">Gross Sales</th>
                <th className="pb-3 font-semibold">Net Earnings</th>
                <th className="pb-3 font-semibold">Rating</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {publishedAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 pr-4 font-bold text-white">
                    <Link to={`/explore?q=${encodeURIComponent(agent.name)}`} className="hover:text-[#00F5D4] transition-colors">
                      {agent.name}
                    </Link>
                  </td>
                  <td className="py-3.5 pr-4 text-zinc-300">{agent.price}</td>
                  <td className="py-3.5 pr-4 text-zinc-300">{agent.runs}</td>
                  <td className="py-3.5 pr-4 text-white font-bold">{formatAtomicCurrency(agent.grossAtomic)}</td>
                  <td className="py-3.5 pr-4 text-[#00F5D4] font-bold">{formatAtomicCurrency(agent.netAtomic)}</td>
                  <td className="py-3.5 pr-4 text-amber-400 font-bold">★ {agent.rating}</td>
                  <td className="py-3.5 text-right">
                    <TruthStateBadge status={agent.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Settlement History & Wallet Destination ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Receiving Wallet Settings */}
        <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-4">
          <h3 className="font-display font-extrabold text-base text-white flex items-center gap-2">
            <Wallet className="h-4 w-4 text-[#FFD700]" />
            <span>Settlement Receiving Destination</span>
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            MRDN x402 settlement payouts are deposited directly to your verified receiving destination upon execution completion.
          </p>

          <div className="p-4 rounded-xl bg-[var(--nx-bg)] border border-white/[0.08] space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center text-zinc-400">
              <span>Settlement Network:</span>
              <span className="text-white font-bold">Base Sepolia / x402 Rail</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Receiving Address:</span>
              <span className="text-[#00F5D4] font-bold">0x71C...89B2</span>
            </div>
            <div className="flex justify-between items-center text-zinc-400">
              <span>Payout Asset:</span>
              <span className="text-white font-bold">USDC (Atomic 6 Decimals)</span>
            </div>
          </div>
        </div>

        {/* Recent Settlement Logs */}
        <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-4">
          <h3 className="font-display font-extrabold text-base text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#00F5D4]" />
            <span>Recent Settlement Receipts</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {recentSettlements.map((stl) => (
              <div key={stl.id} className="p-3 rounded-xl bg-[var(--nx-bg)] border border-white/[0.06] flex items-center justify-between gap-3">
                <div>
                  <span className="text-white font-bold block">{formatAtomicCurrency(stl.amountAtomic)}</span>
                  <span className="text-[10px] text-zinc-500">{stl.date} • {stl.facilitator}</span>
                </div>
                <TruthStateBadge status="live" text="Settled" />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
