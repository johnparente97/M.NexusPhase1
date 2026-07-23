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

export default function Dashboard() {
  const { user } = useAuth();
  const { data: runs } = useRuns();
  const { data: favorites } = useFavorites();

  // Aggregate stats
  const totalRuns = runs?.length ?? 0;
  const completedRuns = runs?.filter((r) => r.status === 'completed').length ?? 0;
  const totalSpent = runs?.reduce((acc, r) => acc + (r.status === 'completed' ? r.actualPrice : 0), 0) ?? 0;

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-6 gap-8 select-none pb-16">
      
      {/* Personalized Daily Briefing Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-zinc-900 to-[#1E1E20] border border-zinc-800 rounded-xl p-6 relative overflow-hidden shadow-lg">
        {/* Decorative Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />
        
        <div className="md:col-span-2 flex flex-col gap-2.5 z-10 relative">
          <Badge variant="outline" className="text-[9px] border-[#27F293]/30 text-[#27F293] bg-[#27F293]/5 px-2 py-0.5 rounded-full font-bold w-fit">
            Daily Intelligence Briefing
          </Badge>
          <h2 className="text-lg font-bold text-zinc-100 tracking-tight">
            Welcome back, {user?.displayName || 'Guest Operator'}
          </h2>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
            The Meridian network is active and performing at optimal latency. You have instant sub-penny access to all AI models and verified workflows on the Market.
          </p>
        </div>

        <div className="md:col-span-1 bg-zinc-950/40 border border-zinc-850 rounded-xl p-4.5 flex flex-col gap-3.5 z-10 relative justify-between">
          <div className="flex justify-between items-center text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
            <span>Rate-Limit Quota</span>
            <span className="text-[#27F293] font-bold">{totalRuns} / 20 Runs</span>
          </div>
          <div className="w-full bg-zinc-900 border border-zinc-800 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#27F293] to-[#10B981] h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min((totalRuns / 20) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-zinc-500">
            <span>Quota resets hourly</span>
            <span className="font-mono text-[#27F293]">{Math.max(20 - totalRuns, 0)} left</span>
          </div>
        </div>
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
            <Link to="/activity" className="text-[10px] font-bold text-[#27F293] hover:text-[#1fe285]">
              View All
            </Link>
          </div>
          <ActivityList runs={runs || []} limit={5} />
        </div>

        {/* Right: Saved/Featured list shortcut */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h3 className="font-semibold text-sm text-zinc-200">Saved Bookmarks</h3>
            <Link to="/saved" className="text-[10px] font-bold text-[#27F293] hover:text-[#1fe285]">
              View All
            </Link>
          </div>
          
          {favorites?.length === 0 ? (
            <div className="text-xs text-zinc-500 py-6 text-center italic border border-dashed border-zinc-800 rounded-xl">
              No bookmarked workflows. Explore the{' '}
              <Link to="/exchange" className="text-[#27F293] font-semibold underline">
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
