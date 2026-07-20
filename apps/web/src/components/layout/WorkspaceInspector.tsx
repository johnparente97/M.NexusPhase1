import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
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
  FileCode,
  Layers,
  Award,
  Lock,
  X,
  Database,
  ArrowUpRight,
  Heart,
  Globe
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { useInspectorStore } from '../../stores/inspector-store';
import { formatCurrency } from '../../utils/format';
import { MOCK_WORKFLOWS } from '../../services/mock-db';
import { Workflow } from '@meridian-nexus/shared-types';

export interface WorkspaceInspectorProps {
  activeWorkflow?: any;
  activeRun?: any;
}

export const WorkspaceInspector: React.FC<WorkspaceInspectorProps> = ({
  activeWorkflow: propActiveWorkflow,
  activeRun: propActiveRun,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const { user } = useAuth();
  const { usdcBalance, isConnected } = useWallet();

  // Retrieve global inspector store states
  const { selectedWorkflow, selectedRun, setSelectedWorkflow } = useInspectorStore();

  const isExchange = location.pathname.startsWith('/exchange');
  
  // Choose which target data to display (prefer global store, fallback to props)
  const workflow = selectedWorkflow || propActiveWorkflow;
  const run = selectedRun || propActiveRun;

  // Toggle Collapse
  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed right-4 top-24 z-40 bg-[#171719] border border-zinc-800 hover:border-emerald-500/50 text-zinc-400 hover:text-emerald-400 px-3 py-2.5 rounded-xl flex items-center gap-2 shadow-xl shadow-black/40 transition-all cursor-pointer group"
        title="Expand Context Inspector"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-500" />
        <span className="text-xs font-bold font-display text-zinc-300 group-hover:text-white hidden xl:inline">Context Inspector</span>
        <ChevronLeft className="h-4 w-4 text-zinc-400 group-hover:text-emerald-400" />
      </button>
    );
  }

  return (
    <aside className="w-80 shrink-0 border-l border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md hidden xl:flex flex-col h-[calc(100vh-6rem)] sticky top-24 select-none overflow-y-auto no-scrollbar p-5 gap-5 z-30 transition-all duration-200">
      
      {/* Inspector Top Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3.5">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-500" />
          <span className="text-xs font-display font-black tracking-widest text-zinc-300 uppercase">
            Context Inspector
          </span>
        </div>
        <button
          onClick={() => setIsCollapsed(true)}
          className="text-zinc-500 hover:text-zinc-300 p-1 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
          title="Collapse Panel"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* VIEW A: Contextual Workflow Specifications */}
        {workflow ? (
          <motion.div
            key="workflow-context"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-4.5"
          >
            {/* Header / Dismiss */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                  {workflow.category} Spec
                </span>
                <h3 className="font-display font-black text-sm text-white leading-tight">
                  {workflow.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedWorkflow(null)}
                className="text-zinc-500 hover:text-zinc-300 p-1 hover:bg-zinc-900 rounded-lg cursor-pointer transition-colors"
                title="Reset Context"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Outcome Statement */}
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-3 rounded-xl flex flex-col gap-1">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Target Outcome</span>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                {workflow.shortDescription}
              </p>
            </div>

            {/* Trust Rating Rating Scorecard */}
            <div className="flex flex-col gap-3.5 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-zinc-200 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-[#27F293]" />
                  Nexus Trust Score
                </span>
                <Badge variant="success" className="text-[10px] font-mono font-black">
                  {workflow.averageRating >= 4.8 ? '98 / 100' : '95 / 100'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-zinc-500 font-bold uppercase text-[8px]">Executions</span>
                  <span className="font-mono font-black text-zinc-200">
                    {workflow.totalRuns.toLocaleString()}
                  </span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-zinc-500 font-bold uppercase text-[8px]">Avg Duration</span>
                  <span className="font-mono font-black text-zinc-200">
                    {workflow.estimatedDurationSeconds}s
                  </span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-zinc-500 font-bold uppercase text-[8px]">Security</span>
                  <span className="font-mono font-black text-emerald-400">0 Alerts</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col gap-0.5">
                  <span className="text-zinc-500 font-bold uppercase text-[8px]">x402 Verified</span>
                  <span className="font-mono font-black text-emerald-400">Active</span>
                </div>
              </div>
            </div>

            {/* Creator Specifications */}
            <div className="flex flex-col gap-2.5 bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-3.5 text-xs text-zinc-300">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Developer</span>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-zinc-800 flex items-center justify-center font-bold text-[10px] text-emerald-400 border border-zinc-700/50 uppercase">
                  {workflow.creator?.displayName?.slice(0, 2) || 'ML'}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-white text-[11px]">{workflow.creator?.displayName || 'Meridian Labs'}</span>
                  <span className="text-[9px] text-zinc-500">{workflow.creator?.verificationLabel || 'Verified Creator'}</span>
                </div>
              </div>
            </div>

            {/* Inputs & Outputs Signature Fields */}
            <div className="flex flex-col gap-2.5 bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-3.5 text-xs">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Data Contracts</span>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Database className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="font-bold text-[11px]">Inputs:</span>
                  <span className="text-zinc-500 text-[10px] font-mono">
                    {workflow.currentVersion?.inputDefinitions?.map((i: any) => i.fieldKey).join(', ') || 'Parameters'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <FileCode className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="font-bold text-[11px]">Outputs:</span>
                  <span className="text-zinc-500 text-[10px] font-mono">ResultSections[]</span>
                </div>
              </div>
            </div>

            {/* Pricing Tiers & Cashback */}
            <div className="flex flex-col gap-2.5 bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-3.5 text-xs">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide">Settlement Specs</span>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-zinc-400">Price per Run:</span>
                <span className="text-white font-bold">{workflow.isFree ? 'FREE' : formatCurrency(workflow.pricePerRun)}</span>
              </div>
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-zinc-400">MRDN Cashback:</span>
                <span className="text-emerald-400 font-bold">+2.0%</span>
              </div>
            </div>

            {/* Launch Action */}
            <Link to={`/workflows/${workflow.slug}/run`}>
              <Button variant="primary" className="w-full justify-center py-2.5 rounded-xl font-black text-xs gap-2">
                <Zap className="h-3.5 w-3.5 fill-zinc-950" />
                <span>Configure & Run Wizard</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>
        ) : run ? (
          /* VIEW B: Contextual Telemetry View */
          <motion.div
            key="run-context"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-black uppercase text-indigo-400 tracking-wider">Run Telemetry</span>
                <h3 className="font-display font-bold text-xs text-white uppercase font-mono tracking-tight">
                  {run.id}
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
              <span className="text-xs font-bold text-zinc-200 flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-emerald-400 animate-pulse" />
                Telemetry Trace
              </span>

              <div className="flex flex-col gap-2 text-[11px] font-mono">
                <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                  <span className="text-zinc-500">Status:</span>
                  <span className="text-[#27F293] font-bold uppercase">{run.status}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                  <span className="text-zinc-500">Duration:</span>
                  <span className="text-zinc-300">{run.durationMs ? `${run.durationMs}ms` : '1,240ms'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">x402 Settlement:</span>
                  <span className="text-emerald-400 font-bold">CONFIRMED</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* VIEW C: Default Idle Platform View */
          <motion.div
            key="idle-context"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-5"
          >
            {/* Daily Intelligence Briefing */}
            <div className="bg-gradient-to-br from-indigo-950/20 via-zinc-900/50 to-zinc-950 border border-indigo-900/30 rounded-2xl p-4 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold font-display">Intelligence Briefing</span>
              </div>
              <p className="text-[11px] text-zinc-300 leading-relaxed">
                Good day <span className="font-semibold text-white">{user?.displayName || 'Builder'}</span>.
                All 19 seed capabilities are operating with 100% synthesis uptime on Base Sepolia.
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-indigo-900/30 pt-2.5">
                <span>MRDN Cashback: +2.0%</span>
                <span className="text-[#27F293] font-semibold">{usdcBalance || '0.00'} USDC</span>
              </div>
            </div>

            {/* Meridian Network Stats */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3">
              <span className="text-xs font-black text-zinc-200 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <Globe className="h-4 w-4 text-emerald-400" />
                Meridian Network Stats
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col">
                  <span className="text-zinc-500 text-[8px] uppercase">Active Agents</span>
                  <span className="font-black text-white mt-0.5">19 Online</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col">
                  <span className="text-zinc-500 text-[8px] uppercase">Avg Settlement</span>
                  <span className="font-black text-white mt-0.5">850ms</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col">
                  <span className="text-zinc-500 text-[8px] uppercase">Compliance Gate</span>
                  <span className="font-black text-emerald-400 mt-0.5">SOC2/GDPR</span>
                </div>
                <div className="bg-zinc-950 border border-zinc-900 p-2 rounded-lg flex flex-col">
                  <span className="text-zinc-500 text-[8px] uppercase">Base Gas</span>
                  <span className="font-black text-white mt-0.5">0.02 Gwei</span>
                </div>
              </div>
            </div>

            {/* Trending Capabilities shortcuts */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-black text-zinc-300 flex items-center gap-2 uppercase tracking-wider text-[10px]">
                <TrendingUp className="h-4 w-4 text-indigo-400" />
                Trending Capabilities
              </span>
              <div className="flex flex-col gap-2.5">
                {MOCK_WORKFLOWS.slice(0, 3).map((w: Workflow) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWorkflow(w)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:bg-zinc-900/60 hover:border-zinc-700 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight">
                        {w.name}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {w.isFree ? 'FREE' : formatCurrency(w.pricePerRun)} • {w.estimatedDurationSeconds}s
                      </span>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Network Quick Badge */}
      <div className="mt-auto bg-zinc-950 border border-zinc-900 rounded-xl p-3 flex items-center justify-between text-[10px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#27F293]" />
          <span>Base Sepolia (84532)</span>
        </div>
        <span className="font-mono text-zinc-400">v1.4.0</span>
      </div>
    </aside>
  );
};

export default WorkspaceInspector;
