import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRuns } from '../hooks/useWorkflowRun';
import { useFavorites } from '../hooks/useFavorites';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityList from '../components/dashboard/ActivityList';
import { Card } from '../components/ui/Card';
import { PlayCircle, Bookmark, Compass, Clock, Zap, Star, Shield } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/format';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: runs, isLoading: loadingRuns } = useRuns();
  const { data: favorites, isLoading: loadingFavs } = useFavorites();

  // Aggregate stats
  const totalRuns = runs?.length ?? 0;
  const completedRuns = runs?.filter((r) => r.status === 'completed').length ?? 0;
  const totalSpent = runs?.reduce((acc, r) => acc + (r.status === 'completed' ? r.actualPrice : 0), 0) ?? 0;

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-6 gap-8 select-none pb-16">
      
      {/* Welcome Banner */}
      <div className="flex flex-col gap-1.5 border-b border-zinc-900 pb-5">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">
          Welcome, {user?.displayName || 'Developer'}
        </h1>
        <p className="text-xs text-zinc-500">Monitor your execution history, spending quotas, and saved bookmarks.</p>
      </div>

      {/* KPI Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={PlayCircle}
          title="Total Executions"
          value={formatNumber(totalRuns)}
          description="Initiated pipeline runs"
        />
        <StatsCard
          icon={Zap}
          title="Success Rate"
          value={totalRuns > 0 ? `${Math.round((completedRuns / totalRuns) * 100)}%` : '100%'}
          description="Runs completing successfully"
        />
        <StatsCard
          icon={Bookmark}
          title="Saved Workflows"
          value={formatNumber(favorites?.length ?? 0)}
          description="Bookmarked in marketplace"
        />
        <StatsCard
          icon={Clock}
          title="Simulated Spent"
          value={formatCurrency(totalSpent)}
          description="Meridian value movement"
        />
      </div>

      {/* Grid columns split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
        {/* Left: Recent Activity list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h3 className="font-semibold text-sm text-zinc-200">Recent Executions</h3>
            <Link to="/activity" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300">
              View All
            </Link>
          </div>
          <ActivityList runs={runs || []} limit={5} />
        </div>

        {/* Right: Saved/Featured list shortcut */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h3 className="font-semibold text-sm text-zinc-200">Saved Bookmarks</h3>
            <Link to="/saved" className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300">
              View All
            </Link>
          </div>
          
          {favorites?.length === 0 ? (
            <div className="text-xs text-zinc-500 py-6 text-center italic border border-dashed border-zinc-800 rounded-xl">
              No bookmarked workflows. Explore the{' '}
              <Link to="/exchange" className="text-indigo-400 font-semibold underline">
                Exchange
              </Link>{' '}
              to save items.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {favorites?.slice(0, 3).map((fav) => (
                <Link key={fav.id} to={`/exchange/${fav.slug}`} className="block">
                  <Card hover className="p-3.5 bg-zinc-900 border-zinc-800 hover:border-zinc-700 flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-zinc-200">{fav.name}</span>
                      <span className="text-[10px] text-zinc-500 capitalize">{fav.category}</span>
                    </div>
                    <span className="text-xs font-semibold text-zinc-200">
                      {fav.isFree ? 'Free' : formatCurrency(fav.pricePerRun)}
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
