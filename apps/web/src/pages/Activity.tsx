import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity as ActivityIcon,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  FileText,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  Download,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

interface TaskThreadRun {
  id: string;
  agentName: string;
  version: string;
  creator: string;
  status: 'queued' | 'running' | 'waiting_for_approval' | 'completed' | 'failed' | 'refunded' | 'settled';
  startedAt: string;
  duration: string;
  totalCostAtomic: string;
  inputSummary: string;
  outputArtifact?: string;
  receiptId?: string;
}

const MOCK_TASK_RUNS: TaskThreadRun[] = [
  {
    id: 'run-101',
    agentName: 'Company Intelligence Brief Agent',
    version: 'v2.1',
    creator: 'Nexus Labs',
    status: 'settled',
    startedAt: '10 minutes ago',
    duration: '4.2s',
    totalCostAtomic: '500000', // $0.50
    inputSummary: 'SEC 10-K filing financial cross-reference analysis',
    outputArtifact: 'Q3_Intel_Brief_Report.pdf',
    receiptId: 'rcpt_mrdn_994821',
  },
  {
    id: 'run-102',
    agentName: 'Autonomous Code Auditor',
    version: 'v1.4',
    creator: 'CyberGuard',
    status: 'completed',
    startedAt: '1 hour ago',
    duration: '8.7s',
    totalCostAtomic: '1000000', // $1.00
    inputSummary: 'OWASP vulnerability scan on github.com/user/api-service',
    outputArtifact: 'Vulnerability_Scan_Result.json',
    receiptId: 'rcpt_mrdn_994820',
  },
  {
    id: 'run-103',
    agentName: 'DeepSeek R1 Architect Agent',
    version: 'v3.0',
    creator: 'Logic Systems',
    status: 'waiting_for_approval',
    startedAt: '2 hours ago',
    duration: 'Pending Approval',
    totalCostAtomic: '250000', // $0.25
    inputSummary: 'PostgreSQL schema migration & indexing strategy',
  },
  {
    id: 'run-104',
    agentName: 'Document Knowledge Vectorizer',
    version: 'v1.0',
    creator: 'Nexus Labs',
    status: 'failed',
    startedAt: 'Yesterday',
    duration: '2.1s',
    totalCostAtomic: '0',
    inputSummary: 'Malformed PDF document parsing attempt',
  },
  {
    id: 'run-105',
    agentName: 'Market Sentiment Analyzer',
    version: 'v2.0',
    creator: 'QuantMind',
    status: 'refunded',
    startedAt: '2 days ago',
    duration: '1.5s',
    totalCostAtomic: '0', // Refunded
    inputSummary: 'API timeout during social media stream ingestion',
    receiptId: 'rcpt_refund_10022',
  },
];

export default function Activity() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRuns = MOCK_TASK_RUNS.filter((run) => {
    const matchesFilter = statusFilter === 'all' || run.status === statusFilter;
    const matchesSearch =
      run.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      run.inputSummary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: TaskThreadRun['status']) => {
    switch (status) {
      case 'settled':
      case 'completed':
        return <TruthStateBadge status="production" text={status === 'settled' ? 'Settled (x402)' : 'Completed'} />;
      case 'running':
        return <TruthStateBadge status="live" text="Running" />;
      case 'waiting_for_approval':
        return <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">Awaiting Approval</span>;
      case 'failed':
        return <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full uppercase">Failed</span>;
      case 'refunded':
        return <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full uppercase">Refunded</span>;
      default:
        return <span className="text-[10px] font-mono font-bold text-zinc-400 bg-zinc-800 px-2.5 py-0.5 rounded-full uppercase">{status}</span>;
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Page Header Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-[#6366F1] bg-[#6366F1]/10 border border-[#6366F1]/20 px-2 py-0.5 rounded-full uppercase">
              Task Thread Engine
            </span>
            <TruthStateBadge status="production" text="Durable Workflows Active" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Activity & <span className="text-prismatic">Runs</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Track your active runs, completed tasks, outputs, and receipts.
          </p>
        </div>
      </div>

      {/* ── Controls & Filter Bar ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--nx-surface-1)] border border-[var(--nx-border)] p-4 rounded-2xl shadow-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6366F1]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search execution threads by agent name or input description..."
            className="w-full bg-[var(--nx-bg)] border border-[var(--nx-border)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#6366F1] transition-all font-mono"
          />
        </div>

        {/* Status Select Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[var(--nx-bg)] border border-[var(--nx-border)] rounded-xl px-3 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#6366F1] cursor-pointer"
          >
            <option value="all">All Execution Statuses</option>
            <option value="settled">Settled (x402)</option>
            <option value="completed">Completed</option>
            <option value="waiting_for_approval">Awaiting Approval</option>
            <option value="running">Running</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* ── Task Thread Activity List ── */}
      <div className="space-y-4">
        {filteredRuns.map((run) => {
          const costDisplay = (parseInt(run.totalCostAtomic) / 1000000).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          });

          return (
            <div
              key={run.id}
              className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] hover:border-[#6366F1]/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  {getStatusBadge(run.status)}
                  <span className="text-xs font-mono text-zinc-500">{run.startedAt} • Duration {run.duration}</span>
                  <span className="text-xs font-mono text-zinc-500">by {run.creator}</span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                    {run.agentName} <span className="text-xs font-mono font-normal text-zinc-400">{run.version}</span>
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans mt-0.5">
                    {run.inputSummary}
                  </p>
                </div>

                {run.outputArtifact && (
                  <div className="flex items-center gap-2 pt-1">
                    <FileText className="h-3.5 w-3.5 text-[#00F5D4]" />
                    <span className="text-xs font-mono text-[#00F5D4] font-semibold">{run.outputArtifact}</span>
                    <button
                      onClick={() => alert(`Downloading ${run.outputArtifact}`)}
                      className="p-1 text-zinc-400 hover:text-white transition-colors"
                      title="Download Artifact"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Cost & Receipt Info */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-[var(--nx-border)] pt-4 md:pt-0 md:pl-6 shrink-0 gap-2">
                <div className="text-right">
                  <div className="text-xs font-mono text-zinc-500 uppercase">Cost</div>
                  <div className="text-sm font-mono font-bold text-white">{costDisplay}</div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/activity/${run.id}`}
                    className="text-xs font-mono font-bold text-[#6366F1] hover:underline flex items-center gap-1"
                  >
                    Inspect Thread <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
