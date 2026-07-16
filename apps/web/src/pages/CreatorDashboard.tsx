import { useCreatorAnalytics, useCreatorChart } from '../hooks/useCreator';
import CreatorMetrics from '../components/dashboard/CreatorMetrics';
import RunsChart from '../components/dashboard/RunsChart';
import LoadingPage from '../components/common/LoadingPage';
import EmptyState from '../components/ui/EmptyState';
import { Card } from '../components/ui/Card';
import { Award, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreatorDashboard() {
  const { data: metrics, isLoading: loadingMetrics } = useCreatorAnalytics();
  const { data: chartData, isLoading: loadingChart } = useCreatorChart();

  if (loadingMetrics || loadingChart) return <LoadingPage />;

  if (!metrics) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 select-none">
        <EmptyState
          icon={Award}
          title="Not registered as a creator"
          description="Register your developer profile inside the studio settings to start building and tracking earnings."
          actionLabel="Open Studio"
          onAction={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-6 gap-8 select-none pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col gap-1.5 border-b border-zinc-900 pb-5">
        <h1 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">Creator Portal</h1>
        <p className="text-xs text-zinc-500">Track gross checkout volumes, earnings splits, and runs frequency metrics.</p>
      </div>

      {/* KPI Cards Grid */}
      <CreatorMetrics metrics={metrics} />

      {/* Recharts area analytics graph */}
      <div className="w-full">
        <RunsChart data={chartData || []} />
      </div>

      {/* Bottom workflows/reviews logs highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        {/* Most Popular workflow preview */}
        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <h4 className="font-semibold text-xs text-zinc-200">Most Popular Workflow</h4>
          {metrics.mostPopularWorkflow ? (
            <div className="flex justify-between items-center bg-zinc-950 p-4 rounded-xl border border-zinc-900 text-xs">
              <span className="font-semibold text-zinc-300">{metrics.mostPopularWorkflow.name}</span>
              <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded font-bold uppercase">
                {metrics.mostPopularWorkflow.totalRuns} Runs
              </span>
            </div>
          ) : (
            <span className="text-xs text-zinc-500 italic">No runs recorded on published workflows yet.</span>
          )}
        </Card>

        {/* Platform stats */}
        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <h4 className="font-semibold text-xs text-zinc-200">System Information</h4>
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Creator split cut:</span>
              <span className="text-zinc-300 font-semibold">80% creator / 20% platform</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-500">Verification label:</span>
              <span className="text-zinc-300 font-semibold">Demonstration verified</span>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}
