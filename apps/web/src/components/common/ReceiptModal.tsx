import React, { useState } from 'react';
import { FileText, CheckCircle, ShieldCheck, ExternalLink, X, Code, DollarSign } from 'lucide-react';
import { Button } from '../ui/Button';
import { TruthStateBadge } from './TruthStateBadge';

export interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  receipt?: {
    id: string;
    runId: string;
    capabilityTitle: string;
    creator: string;
    user: string;
    modelCost: string;
    toolCost: string;
    creatorEarnings: string;
    nexusFee: string;
    settlementCost: string;
    totalAmount: string;
    facilitator: string;
    network: string;
    settlementStatus: string;
    transactionReference: string;
    settledAt: string;
  };
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ isOpen, onClose, receipt }) => {
  const [viewMode, setViewMode] = useState<'beginner' | 'advanced'>('beginner');

  if (!isOpen || !receipt) return null;

  return (
    <div className="fixed inset-0 z-layer-modal flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[var(--nx-surface-1)] border border-[#6366F1]/40 rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--nx-border)] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-base text-white">Nexus Execution Receipt</h2>
              <span className="text-xs text-zinc-400 font-mono">{receipt.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[var(--nx-bg)] p-1 rounded-lg border border-[var(--nx-border)] text-xs font-mono">
              <button
                onClick={() => setViewMode('beginner')}
                className={`px-2.5 py-1 rounded transition-all ${
                  viewMode === 'beginner' ? 'bg-[#6366F1] text-white font-bold' : 'text-zinc-400'
                }`}
              >
                Summary
              </button>
              <button
                onClick={() => setViewMode('advanced')}
                className={`px-2.5 py-1 rounded transition-all ${
                  viewMode === 'advanced' ? 'bg-[#6366F1] text-white font-bold' : 'text-zinc-400'
                }`}
              >
                Advanced Specs
              </button>
            </div>

            <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'beginner' ? (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-[var(--nx-bg-subtle)] border border-[var(--nx-border)] space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Purchased Capability</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{receipt.capabilityTitle}</span>
                <span className="text-emerald-400 font-mono font-bold text-sm">{receipt.totalAmount}</span>
              </div>
              <span className="text-[11px] text-zinc-400 block font-mono">Creator: {receipt.creator}</span>
            </div>

            <div className="space-y-2 font-mono">
              <div className="flex items-center justify-between text-zinc-300">
                <span>Status</span>
                <TruthStateBadge status="production" text={receipt.settlementStatus} />
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>Settled Timestamp</span>
                <span>{receipt.settledAt}</span>
              </div>
              <div className="flex items-center justify-between text-zinc-300">
                <span>x402 Facilitator</span>
                <span className="text-[#06B6D4] font-bold">{receipt.facilitator}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/30 text-[11px] text-zinc-300 flex items-center justify-between">
              <span>Payment facilitated through {receipt.facilitator}</span>
              <ShieldCheck className="h-4 w-4 text-[#06B6D4]" />
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-2 bg-[var(--nx-bg-subtle)] p-4 rounded-xl border border-[var(--nx-border)]">
              <span className="text-[10px] text-zinc-500 uppercase font-bold block">Itemized Cost Distribution</span>
              <div className="flex justify-between text-zinc-300"><span>Model Usage</span><span>{receipt.modelCost}</span></div>
              <div className="flex justify-between text-zinc-300"><span>Tool & Data Cost</span><span>{receipt.toolCost}</span></div>
              <div className="flex justify-between text-emerald-400"><span>Creator Earnings</span><span>{receipt.creatorEarnings}</span></div>
              <div className="flex justify-between text-zinc-300"><span>Nexus Fee (10%)</span><span>{receipt.nexusFee}</span></div>
              <div className="flex justify-between text-zinc-300"><span>Settlement Fee</span><span>{receipt.settlementCost}</span></div>
              <div className="border-t border-[var(--nx-border)] pt-2 flex justify-between font-bold text-white"><span>Total Authorization</span><span>{receipt.totalAmount}</span></div>
            </div>

            <div className="space-y-1 text-[11px]">
              <span className="text-zinc-500 uppercase text-[10px] font-bold block">Transaction Reference</span>
              <span className="text-zinc-300 bg-[var(--nx-bg)] p-2 rounded-lg block truncate border border-[var(--nx-border)]">{receipt.transactionReference}</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--nx-border)]">
          <span className="text-[11px] font-mono text-zinc-500">x402 Verified Settlement</span>
          <Button variant="outline" size="sm" onClick={onClose}>Close Receipt</Button>
        </div>

      </div>
    </div>
  );
};

export default ReceiptModal;
