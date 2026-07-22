import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Zap,
  Sparkles,
  ChevronRight,
  Clock,
  Coins,
  TrendingUp,
  FileCode,
  Layers,
  Lock,
  X,
  Database,
  ArrowUpRight,
  Heart,
  Globe,
  Info,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { useInspectorStore } from '../../stores/inspector-store';
import { formatCurrency } from '../../utils/format';

export interface WorkspaceInspectorProps {
  activeWorkflow?: any;
  activeRun?: any;
}

export const WorkspaceInspector: React.FC<WorkspaceInspectorProps> = ({
  activeWorkflow: propActiveWorkflow,
  activeRun: propActiveRun,
}) => {
  const location = useLocation();
  const { user } = useAuth();
  const { usdcBalance, isConnected } = useWallet();

  // Retrieve global inspector store states
  const { selectedWorkflow, selectedRun, setSelectedWorkflow, setSelectedRun } = useInspectorStore();

  const isExchange = location.pathname.startsWith('/exchange');
  
  // Choose which target data to display (prefer global store, fallback to props)
  const workflow = selectedWorkflow || propActiveWorkflow;
  const run = selectedRun || propActiveRun;

  const handleClose = () => {
    setSelectedWorkflow(null);
    setSelectedRun(null);
  };

  // If no workflow or run is selected, render NOTHING (completely un-obstructive!)
  if (!workflow && !run) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="fixed right-0 top-16 bottom-0 w-80 max-w-full bg-[#171719]/95 backdrop-blur-xl border-l border-zinc-800/80 shadow-2xl z-layer-drawer flex flex-col p-5 gap-5 select-none overflow-y-auto no-scrollbar"
      >
        {/* Inspector Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3.5 shrink-0">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-500" />
            <span className="text-xs font-display font-bold tracking-wider text-zinc-200 uppercase">
              Context Inspector
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-zinc-400 hover:text-white p-1 rounded-xl hover:bg-zinc-800/60 transition-colors cursor-pointer"
            title="Close Inspector Panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Contextual Workflow Specifications */}
        {workflow && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  {workflow.category}
                </span>
                <h3 className="font-display font-bold text-sm text-white mt-0.5 leading-snug">
                  {workflow.name}
                </h3>
              </div>
              <Badge variant="outline" className="text-[9px] font-mono border-zinc-700">
                v{workflow.version || '1.0'}
              </Badge>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/60 p-3 rounded-2xl border border-zinc-900">
              {workflow.description}
            </p>

            {/* Pricing & Performance Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                <span className="text-[10px] font-mono text-zinc-500 block">Execution Price</span>
                <span className="font-mono text-emerald-400 font-bold">
                  {workflow.pricingUsd === 0 ? 'Free ($0.00)' : formatCurrency(workflow.pricingUsd)}
                </span>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 p-2.5 rounded-xl">
                <span className="text-[10px] font-mono text-zinc-500 block">Est. Time</span>
                <span className="font-mono text-zinc-300 font-semibold">{workflow.estimatedDurationSeconds || 15}s</span>
              </div>
            </div>

            {/* Input Contract Requirements */}
            {workflow.inputSchema && workflow.inputSchema.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider font-bold block">
                  Input Fields ({workflow.inputSchema.length})
                </span>
                <div className="space-y-1.5">
                  {workflow.inputSchema.map((field: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] bg-zinc-950 p-2 rounded-xl border border-zinc-900">
                      <span className="font-mono text-zinc-300">{field.label || field.name}</span>
                      <span className="text-[9px] font-mono text-zinc-500">{field.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 border-t border-zinc-900">
              <Button
                to={`/exchange/${workflow.id}/run`}
                variant="primary"
                size="sm"
                className="w-full text-xs font-bold justify-center"
                onClick={handleClose}
              >
                Execute Workflow Now
              </Button>
            </div>
          </div>
        )}

        {/* Contextual Run Specifications */}
        {run && !workflow && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                Run Context #{run.id?.substring(0, 8)}
              </span>
              <Badge variant={run.status === 'completed' ? 'success' : 'info'} className="text-[9px]">
                {run.status}
              </Badge>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-500">Run ID</span>
                <span className="text-zinc-300">{run.id?.substring(0, 12)}...</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-500">Total Settled</span>
                <span className="text-emerald-400 font-bold">${run.costUsd?.toFixed(4) || '0.00'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-500">Steps Executed</span>
                <span className="text-zinc-300">{run.steps?.length || 1}</span>
              </div>
            </div>

            <Button
              to={`/activity/${run.id}`}
              variant="secondary"
              size="sm"
              className="w-full text-xs justify-center"
              onClick={handleClose}
            >
              View Full Run Details
            </Button>
          </div>
        )}
      </motion.aside>
    </AnimatePresence>
  );
};

export default WorkspaceInspector;
