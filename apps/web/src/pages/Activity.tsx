import { useState } from 'react';
import { useRuns } from '../hooks/useWorkflowRun';
import ActivityList from '../components/dashboard/ActivityList';
import LoadingPage from '../components/common/LoadingPage';
import EmptyState from '../components/ui/EmptyState';
import { Card } from '../components/ui/Card';
import { History, Search } from 'lucide-react';

export default function Activity() {
  const [statusFilter, setStatusFilter] = useState('');
  const { data: runs, isLoading } = useRuns(statusFilter || undefined);

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-6 gap-6 select-none pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">Run History</h1>
          <p className="text-xs text-zinc-500">Track and review all model execution timelines and results.</p>
        </div>
        
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none focus:border-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="running">Running</option>
          <option value="failed">Failed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Activity Log list */}
      <div className="flex-1 flex flex-col gap-4">
        {runs?.length === 0 ? (
          <EmptyState
            icon={History}
            title="No executions recorded"
            description="Run workflows inside the exchange marketplace page to generate history logs."
          />
        ) : (
          <ActivityList runs={runs || []} />
        )}
      </div>

    </div>
  );
}
