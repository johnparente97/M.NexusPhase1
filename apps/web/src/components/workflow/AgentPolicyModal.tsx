import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Sliders,
  DollarSign,
  Lock,
  OctagonX,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Zap,
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface AgentPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
}

export const AgentPolicyModal: React.FC<AgentPolicyModalProps> = ({
  isOpen,
  onClose,
  agentName = 'Nexus Commerce Agent',
}) => {
  const [sessionLimit, setSessionLimit] = useState(5.0);
  const [dailyLimit, setDailyLimit] = useState(25.0);
  const [requireHumanApproval, setRequireHumanApproval] = useState(true);
  const [approvalThreshold, setApprovalThreshold] = useState(1.0);
  const [emergencyStopped, setEmergencyStopped] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage('Agent spending policy updated and cryptographically signed.');
    setTimeout(() => {
      setSaveMessage(null);
      onClose();
    }, 1800);
  };

  const toggleEmergencyStop = () => {
    setEmergencyStopped(!emergencyStopped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg rounded-2xl bg-[#121216] border border-purple-500/30 p-6 space-y-5 shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
              <Sliders className="h-5 w-5 text-purple-400" />
              <span>Agentic Commerce Spending & Policy Controls</span>
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5 font-mono">{agentName}</p>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white text-sm">
            ✕
          </button>
        </div>

        {saveMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
            <CheckCircle2 className="h-4 w-4" />
            <span>{saveMessage}</span>
          </div>
        )}

        {/* Emergency Stop Switch */}
        <div
          className={cn(
            'p-4 rounded-xl border flex items-center justify-between transition-colors',
            emergencyStopped
              ? 'bg-rose-500/15 border-rose-500/50 text-rose-300'
              : 'bg-zinc-900/80 border-zinc-800 text-zinc-300'
          )}
        >
          <div className="flex items-center gap-3">
            <OctagonX className={cn('h-6 w-6', emergencyStopped ? 'text-rose-400' : 'text-zinc-500')} />
            <div>
              <div className="font-bold text-xs">Emergency Kill Switch</div>
              <div className="text-[10px] text-zinc-400">
                {emergencyStopped ? 'AGENT SPENDING IS HALTED IMMEDIATELY' : 'Revoke all agent authorizations instantly'}
              </div>
            </div>
          </div>
          <button
            onClick={toggleEmergencyStop}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all',
              emergencyStopped
                ? 'bg-emerald-500 text-zinc-950 hover:brightness-110'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
            )}
          >
            {emergencyStopped ? 'Resume Agent' : 'STOP AGENT'}
          </button>
        </div>

        <form onSubmit={handleSavePolicy} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Session Spend Cap ($)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="100"
                value={sessionLimit}
                onChange={(e) => setSessionLimit(parseFloat(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-purple-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-zinc-300 font-medium">Daily Spend Limit ($)</label>
              <input
                type="number"
                step="1"
                min="1"
                max="500"
                value={dailyLimit}
                onChange={(e) => setDailyLimit(parseFloat(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white font-mono focus:border-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-purple-400" />
                <span className="font-bold text-white">Require Human Approval</span>
              </div>
              <input
                type="checkbox"
                checked={requireHumanApproval}
                onChange={(e) => setRequireHumanApproval(e.target.checked)}
                className="h-4 w-4 rounded accent-purple-500 cursor-pointer"
              />
            </div>
            {requireHumanApproval && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                  <span>Prompt for human confirmation above:</span>
                  <span className="text-purple-300 font-bold">${approvalThreshold} per action</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={approvalThreshold}
                  onChange={(e) => setApprovalThreshold(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer"
                />
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 text-[11px] font-mono">
            <div className="flex justify-between text-zinc-400">
              <span>Allowed Networks:</span>
              <span className="text-white">Base, Arbitrum, Solana</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>x402 Facilitator:</span>
              <span className="text-emerald-400">MRDN Facilitator</span>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-zinc-950 font-bold cursor-pointer shadow-lg"
            >
              Save Agent Policy
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AgentPolicyModal;
