import { useFavorites } from '../hooks/useFavorites';
import WorkflowGrid from '../components/marketplace/WorkflowGrid';
import LoadingPage from '../components/common/LoadingPage';
import EmptyState from '../components/ui/EmptyState';
import { Bookmark } from 'lucide-react';

export default function SavedWorkflows() {
  const { data: workflows, isLoading } = useFavorites();

  if (isLoading) return <LoadingPage />;

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-6 gap-6 select-none pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-1.5 border-b border-zinc-900 pb-5">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">Saved Workflows</h1>
        <p className="text-xs text-zinc-500">Quickly run or edit your bookmarked workflow templates.</p>
      </div>

      {/* Grid List */}
      <div className="flex-1 flex flex-col gap-4">
        {workflows?.length === 0 ? (
          <EmptyState
            icon={Bookmark}
            title="No bookmarked workflows"
            description="Bookmarked items inside the Exchange marketplace list will appear here for fast access."
          />
        ) : (
          <WorkflowGrid workflows={workflows || []} />
        )}
      </div>

    </div>
  );
}
