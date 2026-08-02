import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useRun, useRunResult } from '../hooks/useWorkflowRun';
import ResultRenderer from '../components/workflow/ResultRenderer';
import LoadingPage from '../components/common/LoadingPage';
import NotFound from '../components/common/NotFound';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatDate, formatCurrency, formatDuration } from '../utils/format';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, XCircle, FileText, Share2 } from 'lucide-react';
import DemoLabel from '../components/common/DemoLabel';
import ReceiptModal from '../components/common/ReceiptModal';

export default function RunDetail() {
  const { id } = useParams<{ id: string }>();
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const { data: run, isLoading: loadingRun, error: runError } = useRun(id || '');
  const { data: result, isLoading: loadingResult } = useRunResult(id || '', run?.status === 'completed');

  if (loadingRun) return <LoadingPage />;
  if (runError || !run) return <NotFound />;

  const statusColors = {
    pending: 'default',
    running: 'info',
    completed: 'success',
    failed: 'error',
    cancelled: 'default',
  } as const;

  const mockReceiptData = {
    id: run.settlement?.receiptIdentifier || `rcpt_nexus_${run.id.slice(0, 8)}`,
    runId: run.id,
    capabilityTitle: run.workflow?.name || 'Execution Capability',
    creator: 'Nexus Creator',
    user: 'Connected User',
    modelCost: '$0.18',
    toolCost: '$0.05',
    creatorEarnings: formatCurrency((run.actualPrice || 0.5) * 0.70),
    nexusFee: formatCurrency((run.actualPrice || 0.5) * 0.10),
    settlementCost: '$0.01',
    totalAmount: formatCurrency(run.actualPrice || 0.5),
    facilitator: 'MRDN',
    network: 'Base Sepolia',
    settlementStatus: 'Settled (x402)',
    transactionReference: run.settlement?.transactionReference || '0x71a...998b',
    settledAt: formatDate(run.completedAt || run.createdAt),
  };

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-6 gap-8 select-none pb-16">
      
      {/* Back button */}
      <Link to="/activity" className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 w-fit">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Activity History
      </Link>

      {/* Main Execution summary card */}
      <Card className="bg-[var(--nx-surface-1)] border-[var(--nx-border)] p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 border-b border-[var(--nx-border)] pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-zinc-200">{run.workflow?.name || 'Execution Run'}</h2>
            <span className="text-[10px] text-zinc-500">
              Run ID: <span className="font-mono text-zinc-400">{run.id}</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={statusColors[run.status]}>{run.status}</Badge>
            {run.status === 'completed' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowReceiptModal(true)}
                className="text-xs font-semibold flex items-center gap-1.5"
              >
                <FileText className="h-3.5 w-3.5 text-emerald-400" />
                View Receipt
              </Button>
            )}
          </div>
        </div>

        {/* Timelines grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Created At</span>
            <span className="text-zinc-300 font-semibold">{formatDate(run.createdAt)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Execution duration</span>
            <span className="text-zinc-300 font-semibold">
              {run.durationMs ? formatDuration(Math.floor(run.durationMs / 1000)) : 'Pending'}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Quote</span>
            <span className="text-zinc-300 font-semibold">{run.estimatedPrice === 0 ? 'Free' : formatCurrency(run.estimatedPrice)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Total Settled</span>
            <span className="text-emerald-400 font-semibold">{run.actualPrice === 0 ? 'Free' : formatCurrency(run.actualPrice)}</span>
          </div>
        </div>
      </Card>

      {/* Result Display */}
      {run.status === 'completed' && result ? (
        <ResultRenderer result={result} workflowName={run.workflow?.name || 'Workflow'} />
      ) : (
        run.status === 'running' && <LoadingPage />
      )}

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        receipt={mockReceiptData}
      />
    </div>
  );
}
export { RunDetail };
