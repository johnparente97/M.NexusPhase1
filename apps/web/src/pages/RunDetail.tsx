import { useParams, Link } from 'react-router-dom';
import { useRun, useRunResult } from '../hooks/useWorkflowRun';
import ResultRenderer from '../components/workflow/ResultRenderer';
import LoadingPage from '../components/common/LoadingPage';
import NotFound from '../components/common/NotFound';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatDate, formatCurrency, formatDuration } from '../utils/format';
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import DemoLabel from '../components/common/DemoLabel';

export default function RunDetail() {
  const { id } = useParams<{ id: string }>();

  const { data: run, isLoading: loadingRun, error: runError } = useRun(id || '');
  const { data: result, isLoading: loadingResult } = useRunResult(id || '');

  if (loadingRun) return <LoadingPage />;
  if (runError || !run) return <NotFound />;

  const statusColors = {
    pending: 'default',
    running: 'info',
    completed: 'success',
    failed: 'error',
    cancelled: 'default',
  } as const;

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-6 gap-8 select-none pb-16">
      
      {/* Back button */}
      <Link to="/activity" className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 w-fit">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Activity History
      </Link>

      {/* Main Execution summary card */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-base font-semibold text-zinc-200">{run.workflow?.name || 'Execution Run'}</h2>
            <span className="text-[10px] text-zinc-500">
              Run ID: <span className="font-mono text-zinc-400">{run.id}</span>
            </span>
          </div>
          <Badge variant={statusColors[run.status]}>{run.status}</Badge>
        </div>

        {/* Timelines grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
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
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Est Price</span>
            <span className="text-zinc-300 font-semibold">{run.estimatedPrice === 0 ? 'Free' : formatCurrency(run.estimatedPrice)}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Actual Payout</span>
            <span className="text-zinc-300 font-semibold">{run.actualPrice === 0 ? 'Free' : formatCurrency(run.actualPrice)}</span>
          </div>
        </div>

        {/* Failed error messages */}
        {run.status === 'failed' && run.errorMessage && (
          <div className="border border-rose-950/20 bg-rose-950/5 p-4 rounded-xl flex items-start gap-3">
            <XCircle className="h-4.5 w-4.5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 text-xs">
              <span className="font-semibold text-rose-300">Execution Error: {run.errorCode}</span>
              <p className="text-zinc-400 leading-normal">{run.errorMessage}</p>
            </div>
          </div>
        )}
      </Card>

      {/* Result Display */}
      {run.status === 'completed' && result ? (
        <ResultRenderer result={result} workflowName={run.workflow?.name || 'Workflow'} />
      ) : (
        run.status === 'running' && <LoadingPage />
      )}

      {/* Settlement Receipt Details */}
      {run.status === 'completed' && run.settlement && (
        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="font-semibold text-sm text-zinc-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4.5 w-4.5 text-indigo-400" />
              Settlement Authorization Receipt
            </h3>
            <DemoLabel />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs leading-normal">
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Transaction Ref:</span>
              <span className="font-mono text-zinc-300">{run.settlement.transactionReference}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Receipt Identifier:</span>
              <span className="font-mono text-zinc-300">{run.settlement.receiptIdentifier}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Authorization Ref:</span>
              <span className="font-mono text-zinc-300">{run.settlement.authorizationId}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Settled Amount:</span>
              <span className="text-zinc-300 font-semibold">{formatCurrency(run.settlement.amount)}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Settled network:</span>
              <span className="text-zinc-300 font-semibold">{run.settlement.network}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Billing Mode:</span>
              <span className="text-zinc-300 font-semibold uppercase">{run.settlement.mode}</span>
            </div>
          </div>
        </Card>
      )}

    </div>
  );
}
export { RunDetail };
