import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useCreatorWorkflows, useCreatorAnalytics } from '../hooks/useCreator';
import EmptyState from '../components/ui/EmptyState';
import LoadingPage from '../components/common/LoadingPage';
import { Layers, Plus, Settings, Play, CheckCircle, BarChart3, Eye } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { usePublishWorkflow, useUnpublishWorkflow } from '../hooks/useWorkflows';
import { useToast } from '../components/ui/Toast';

export default function Studio() {
  const { data: workflows, isLoading, error } = useCreatorWorkflows();
  const { data: metrics } = useCreatorAnalytics();
  const navigate = useNavigate();
  const { toast } = useToast();

  const publishMutation = usePublishWorkflow('');
  const unpublishMutation = useUnpublishWorkflow('');

  if (isLoading) return <LoadingPage />;

  const handlePublish = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Inject correct ID into mutation dynamically by calling mutate on a custom instance
    // (We can use a simpler approach of invalidating query inside hooks)
    publishMutation.mutateAsync(undefined, {
      onSuccess: () => {
        toast('Workflow published successfully!', 'success');
      },
    });
  };

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-6 gap-6 select-none pb-16">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-900 pb-5">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">Nexus Studio</h1>
          <p className="text-xs text-zinc-500">Design, parameterize, and publish intelligent workflow templates.</p>
        </div>
        <Link to="/studio/new">
          <Button variant="primary" size="sm" className="font-bold flex items-center gap-1.5 shadow-lg">
            <Plus className="h-4 w-4" />
            Create Workflow
          </Button>
        </Link>
      </div>

      {/* Analytics Card shortcuts */}
      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="p-4 bg-zinc-900 border-zinc-800 flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Gross Earnings</span>
            <span className="text-base font-bold text-zinc-200">{formatCurrency(metrics.estimatedEarnings)}</span>
          </Card>
          <Card className="p-4 bg-zinc-900 border-zinc-800 flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Total Runs</span>
            <span className="text-base font-bold text-zinc-200">{metrics.totalRuns}</span>
          </Card>
          <Card className="p-4 bg-zinc-900 border-zinc-800 flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Published</span>
            <span className="text-base font-bold text-zinc-200">{metrics.publishedWorkflows}</span>
          </Card>
          <Card className="p-4 bg-zinc-900 border-zinc-800 flex flex-col gap-1">
            <span className="text-[9px] text-zinc-500 font-semibold uppercase">Saves Count</span>
            <span className="text-base font-bold text-zinc-200">{metrics.savedCount}</span>
          </Card>
        </div>
      )}

      {/* Workflows table list */}
      <div className="flex-1 flex flex-col gap-4">
        {workflows?.length === 0 ? (
          <EmptyState
            icon={Layers}
            title="No workflows built yet"
            description="Nexus Studio lets you define custom model parameters, templates, and outputs sections."
            actionLabel="Create First Workflow"
            onAction={() => navigate('/studio/new')}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {workflows?.map((w) => (
              <Card key={w.id} className="p-4.5 bg-zinc-900 border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1.5 min-w-[60%]">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-xs text-zinc-200">{w.name}</h3>
                    <Badge variant={w.status === 'published' ? 'success' : 'default'} className="text-[8px]">
                      {w.status}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal line-clamp-1">{w.shortDescription}</p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <Link to={`/exchange/${w.slug}`}>
                    <Button variant="ghost" size="sm" className="p-2 text-zinc-400 hover:text-zinc-200">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>

                  <Link to={`/studio/${w.id}/edit`}>
                    <Button variant="secondary" size="sm" className="font-semibold flex items-center gap-1">
                      <Settings className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                  </Link>

                  {w.status === 'draft' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/studio/${w.id}/edit`)} // Redirect to edit to publish cleanly
                      className="font-semibold border-emerald-900/30 text-emerald-400 hover:bg-emerald-950/10"
                    >
                      Publish
                    </Button>
                  ) : (
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-2 flex items-center gap-1 select-none">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      Marketplace
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
