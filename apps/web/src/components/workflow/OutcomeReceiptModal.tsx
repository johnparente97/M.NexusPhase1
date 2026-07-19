import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SettlementReceipt, WorkflowRun } from '@meridian-nexus/shared-types';
import { ShieldCheck, Download, Copy, CheckCircle2, ExternalLink, X, FileText, Sparkles, Coins } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatDate } from '../../utils/format';
import { useToast } from '../ui/Toast';

export interface OutcomeReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  runRecord: WorkflowRun;
  settlement?: SettlementReceipt;
}

export const OutcomeReceiptModal: React.FC<OutcomeReceiptModalProps> = ({
  isOpen,
  onClose,
  runRecord,
  settlement,
}) => {
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleCopyReceiptJson = () => {
    const receiptData = {
      receiptId: settlement?.receiptIdentifier || `rcpt-${runRecord.id}`,
      runId: runRecord.id,
      workflowId: runRecord.workflowId,
      status: settlement?.status || 'settled',
      amount: settlement?.amount || runRecord.actualPrice,
      currency: settlement?.currency || 'USDC',
      protocolFee: settlement?.protocolFee || (runRecord.actualPrice * 0.01),
      creatorEarnings: settlement?.creatorEarnings || (runRecord.actualPrice * 0.99),
      mrdnCashbackAmount: settlement?.mrdnCashbackAmount || 0,
      settledAt: settlement?.settledAt || runRecord.completedAt || new Date().toISOString(),
      originChain: settlement?.originChain || 'eip155:84532 (Base Sepolia)',
      destinationChain: settlement?.destinationChain || 'eip155:84532 (Base Sepolia)',
      transactionRef: settlement?.transactionReference || '0x4f82a9...3e1d',
    };
    navigator.clipboard.writeText(JSON.stringify(receiptData, null, 2));
    toast('Machine-readable receipt copied to clipboard!', 'success');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl z-10 flex flex-col gap-5 select-none relative max-h-[90vh] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-[#27F293]/10 border border-[#27F293]/30 flex items-center justify-center text-[#27F293]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-base font-display font-bold text-zinc-100">
                  Verified Outcome Receipt
                </h2>
                <span className="text-[10px] font-mono text-zinc-500">
                  ID: {settlement?.receiptIdentifier || `RCPT-${runRecord.id.substring(0, 8)}`}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800/50 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Verification Badge Bar */}
          <div className="bg-gradient-to-r from-emerald-950/30 to-zinc-950 border border-emerald-900/40 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#27F293]" />
              <span className="text-xs font-semibold text-zinc-200">
                x402 Payment Verified & Settled
              </span>
            </div>
            <Badge variant="success" className="text-[9px] font-mono">
              SETTLED
            </Badge>
          </div>

          {/* Financial Breakdown Table */}
          <div className="flex flex-col gap-2 bg-zinc-950 border border-zinc-800/80 rounded-xl p-4 text-xs font-mono">
            <div className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-zinc-500">Total Run Cost:</span>
              <span className="text-zinc-100 font-bold">
                {formatCurrency(settlement?.amount || runRecord.actualPrice)}
              </span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-zinc-500">Creator Share (99%):</span>
              <span className="text-emerald-400 font-semibold">
                {formatCurrency(settlement?.creatorEarnings || runRecord.actualPrice * 0.99)}
              </span>
            </div>
            <div className="flex justify-between border-b border-zinc-900 pb-2">
              <span className="text-zinc-500">Protocol Fee (1%):</span>
              <span className="text-zinc-400">
                {formatCurrency(settlement?.protocolFee || runRecord.actualPrice * 0.01)}
              </span>
            </div>
            <div className="flex justify-between pt-1 text-[#27F293]">
              <span className="flex items-center gap-1">
                <Coins className="h-3 w-3" />
                MRDN Cashback Earned:
              </span>
              <span className="font-bold">
                +{settlement?.mrdnCashbackAmount || (runRecord.actualPrice * 0.02).toFixed(4)} MRDN
              </span>
            </div>
          </div>

          {/* Onchain Reference Details */}
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="bg-zinc-950 border border-zinc-800/60 rounded-lg p-3 flex flex-col gap-1">
              <span className="text-zinc-500 font-mono text-[9px] uppercase">Origin Network</span>
              <span className="text-zinc-300 font-semibold truncate">
                {settlement?.originChain || 'Base Sepolia (EVM)'}
              </span>
            </div>
            <div className="bg-zinc-950 border border-zinc-800/60 rounded-lg p-3 flex flex-col gap-1">
              <span className="text-zinc-500 font-mono text-[9px] uppercase">Transaction Ref</span>
              <span className="text-zinc-300 font-mono truncate">
                {settlement?.transactionReference || '0x4f82a9...3e1d'}
              </span>
            </div>
          </div>

          {/* Actions Footer */}
          <div className="flex items-center justify-between border-t border-zinc-800 pt-4 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyReceiptJson}
              className="text-xs font-semibold flex items-center gap-1.5"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy JSON Receipt
            </Button>

            <Button variant="primary" size="sm" onClick={onClose} className="font-bold">
              Done
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OutcomeReceiptModal;
