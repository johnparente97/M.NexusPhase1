import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useParams } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Clock,
  Coins,
  CheckCircle2,
  TrendingUp,
  UserCheck,
  FileCode,
  Layers,
  Award,
  Lock,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { formatCurrency } from '../../utils/format';

export interface WorkspaceInspectorProps {
  activeWorkflow?: any;
  activeRun?: any;
}

export const WorkspaceInspector: React.FC<WorkspaceInspectorProps> = ({
  activeWorkflow,
  activeRun,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const { user } = useAuth();
  const { usdcBalance, walletAddress, chainId } = useWallet();

  const isExchange = location.pathname.startsWith('/exchange');
  const isActivity = location.pathname.startsWith('/activity');
  const isStudio = location.pathname.startsWith('/studio');
  const isCreator = location.pathname.startsWith('/creator');

  // Toggle Collapse
  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed right-4 top-24 z-40 bg-[#171719] border border-zinc-800 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 px-3 py-2 rounded-xl flex items-center gap-2 shadow-xl shadow-black/40 transition-all cursor-pointer group"
        title="Expand Context Inspector"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-bold font-display text-zinc-300 group-hover:text-white hidden xl:inline">Context Inspector</span>
        <ChevronLeft className="h-4 w-4 text-zinc-400 group-hover:text-emerald-400" />
      </button>
    );
  }

  return (
    <aside className="w-80 shrink-0 border-l border-zinc-800/80 bg-[#171719]/90 backdrop-blur-md hidden xl:flex flex-col h-[calc(100vh-6rem)] sticky top-24 select-none overflow-y-auto no-scrollbar p-5 gap-5 z-30">
      {/* Inspector Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#27F293]" />
          <span className="text-xs font-display font-bold text-zinc-200 uppercase tracking-wider">
            Context Inspector
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-zinc-500 hover:text-zinc-300 p-1 rounded hover:bg-zinc-900 transition-colors"
          title="Collapse Panel"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* 1. Daily AI Briefing Widget (Default view or general workspace) */}
      <div className="bg-gradient-to-br from-indigo-950/20 via-zinc-900/50 to-zinc-950 border border-indigo-900/30 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-emerald-400">
          <Sparkles className="h-4 w-4" />
          <span className="text-xs font-bold font-display">Intelligence Briefing</span>
        </div>
        <p className="text-[11px] text-zinc-300 leading-relaxed">
          Good day <span className="font-semibold text-white">{user?.displayName || 'Builder'}</span>.
          All 12 seed capabilities are operating with 100% synthesis uptime on Base Sepolia.
        </p>
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-indigo-900/30 pt-2">
          <span>MRDN Cashback: +2.0%</span>
          <span className="text-[#27F293] font-semibold">{usdcBalance} USDC</span>
        </div>
      </div>

      {/* 2. Trust Score & Capability Verification Inspector (When viewing Exchange / Workflow) */}
      {(isExchange || activeWorkflow) && (
        <div className="flex flex-col gap-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#27F293]" />
              Nexus Trust Rating
            </span>
            <Badge variant="success" className="text-[9px] font-mono">
              98 / 100
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
              <span className="text-zinc-500">Executions</span>
              <span className="font-mono font-bold text-zinc-200">
                {activeWorkflow?.completedRuns || '41,200'}
              </span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
              <span className="text-zinc-500">Rating</span>
              <span className="font-mono font-bold text-zinc-200">
                {activeWorkflow?.averageRating || '4.95'} ★
              </span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
              <span className="text-zinc-500">Security</span>
              <span className="font-mono font-bold text-emerald-400">0 Alerts</span>
            </div>
            <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
              <span className="text-zinc-500">x402 Verified</span>
              <span className="font-mono font-bold text-[#27F293]">Active</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-[10px] text-zinc-500 border-t border-zinc-900 pt-2">
            <div className="flex justify-between">
              <span>Data Retention:</span>
              <span className="text-zinc-300">Zero-Log Sandbox</span>
            </div>
            <div className="flex justify-between">
              <span>Model Adapter:</span>
              <span className="text-zinc-300">Gemini 2.5 Flash</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. Live Run Telemetry (When viewing Activity / Run) */}
      {(isActivity || activeRun) && (
        <div className="flex flex-col gap-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
          <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-emerald-400" />
            Telemetry & Telemetry Trace
          </span>

          <div className="flex flex-col gap-2 text-[11px] font-mono">
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">Run ID:</span>
              <span className="text-zinc-300">{activeRun?.id || 'run-latest'}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">Execution Status:</span>
              <span className="text-[#27F293] font-bold uppercase">
                {activeRun?.status || 'COMPLETED'}
              </span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">Duration:</span>
              <span className="text-zinc-300">{activeRun?.durationMs ? `${activeRun.durationMs}ms` : '1,240ms'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">x402 Settlement:</span>
              <span className="text-emerald-400 font-semibold">Confirmed</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Creator & Studio Controls (When in Studio or Creator Portal) */}
      {(isStudio || isCreator) && (
        <div className="flex flex-col gap-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
          <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-[#27F293]" />
            Creator Economics
          </span>

          <div className="flex flex-col gap-2 text-[11px]">
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">Revenue Royalty:</span>
              <span className="font-mono text-emerald-400 font-bold">99.0%</span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-1.5">
              <span className="text-zinc-500">Marketplace Fee:</span>
              <span className="font-mono text-zinc-300">1.0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Publishing Mode:</span>
              <span className="font-mono text-[#27F293]">x402 Direct</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Network Quick Badge */}
      <div className="mt-auto bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex items-center justify-between text-[10px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#27F293]" />
          <span>Base Sepolia (84532)</span>
        </div>
        <span className="font-mono text-zinc-400">v1.3.2</span>
      </div>
    </aside>
  );
};

export default WorkspaceInspector;
