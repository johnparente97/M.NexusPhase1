import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRuns } from '../hooks/useWorkflowRun';
import { useFavorites } from '../hooks/useFavorites';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityList from '../components/dashboard/ActivityList';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { PlayCircle, Bookmark, Compass, Clock, Zap, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatNumber } from '../utils/format';
import { TruthStateBadge } from '../components/common/TruthStateBadge';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: runs } = useRuns();
  const { data: favorites } = useFavorites();

  // Aggregate stats using memoization
  const totalRuns = runs?.length ?? 0;
  
  const { completedRuns, totalSpent } = useMemo(() => {
    if (!runs) return { completedRuns: 0, totalSpent: 0 };
    return runs.reduce(
      (acc, r) => {
        if (r.status === 'completed') {
          acc.completedRuns += 1;
          acc.totalSpent += r.actualPrice || 0;
        }
        return acc;
      },
      { completedRuns: 0, totalSpent: 0 }
    );
  }, [runs]);

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none pb-16">
      
      {/* Personalized Workspace Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--nx-border)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-[#6366F1] bg-[#6366F1]/10 border border-[#6366F1]/20 px-2 py-0.5 rounded-full uppercase">
              Workspace Overview
            </span>
            <TruthStateBadge status="production" text="Engine Active" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Welcome back, <span className="text-prismatic">{user?.displayName || 'User'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Overview of your active runs, saved capabilities, and total execution activity.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button to="/explore" variant="primary" size="sm" rightIcon={<ArrowUpRight className="h-4 w-4" />}>
            Explore Agents
          </Button>
        </div>
      </div>

      {/* KPI Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={PlayCircle}
          title="Total Executions"
          value={formatNumber(totalRuns)}
          description="Initiated agent runs"
        />
        <StatsCard
          icon={Zap}
          title="Success Rate"
          value={totalRuns > 0 ? `${Math.round((completedRuns / totalRuns) * 100)}%` : '100%'}
          description="Runs completed successfully"
        />
        <StatsCard
          icon={Bookmark}
          title="Saved Agents"
          value={formatNumber(favorites?.length ?? 0)}
          description="Bookmarked in marketplace"
        />
        <StatsCard
          icon={Clock}
          title="Total Spent"
          value={formatCurrency(totalSpent)}
          description="USDC spent on completed runs"
        />
      </div>

      {/* Grid columns split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
        {/* Left: Recent Executions list */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[var(--nx-border)] pb-3">
            <h3 className="font-semibold text-sm text-zinc-200">Recent Executions</h3>
            <Link to="/activity" className="text-xs font-bold text-[#6366F1] hover:underline">
              View All
            </Link>
          </div>
          <ActivityList runs={runs || []} limit={5} />
        </div>

        {/* Right: Saved Bookmarks shortcut */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[var(--nx-border)] pb-3">
            <h3 className="font-semibold text-sm text-zinc-200">Saved Bookmarks</h3>
            <Link to="/library" className="text-xs font-bold text-[#6366F1] hover:underline">
              View All
            </Link>
          </div>
          
          {favorites?.length === 0 ? (
            <div className="text-xs text-zinc-500 py-6 text-center italic border border-dashed border-[var(--nx-border)] rounded-2xl bg-[var(--nx-surface-1)]">
              No bookmarked agents yet. Browse the{' '}
              <Link to="/explore" className="text-[#6366F1] font-semibold underline">
                Explore Marketplace
              </Link>{' '}
              to save items.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {favorites?.slice(0, 3).map((fav) => (
                <Link key={fav.id} to={`/explore?q=${encodeURIComponent(fav.name)}`} className="block">
                  <Card hover className="p-3.5 bg-[var(--nx-surface-1)] border-[var(--nx-border)] hover:border-[#6366F1]/50 flex items-center justify-between shadow-md">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-semibold text-zinc-200">{fav.name}</span>
                      <span className="text-[10px] text-zinc-500 capitalize">{fav.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-300">
                        {fav.isFree ? 'Free' : formatCurrency(fav.pricePerRun)}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500" />
                    </div>
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
