import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWorkflow } from '../hooks/useWorkflows';
import { useReviews } from '../hooks/useReviews';
import { Tabs } from '../components/ui/Tabs';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { StarRating } from '../components/ui/StarRating';
import LoadingPage from '../components/common/LoadingPage';
import NotFound from '../components/common/NotFound';
import { formatCurrency, formatDuration } from '../utils/format';
import { CATEGORY_LABELS } from '../utils/constants';
import { Bookmark, Clock, User, Shield, Info, ArrowLeft, Star, Play, CheckCircle } from 'lucide-react';
import { useToggleFavorite, useFavorites } from '../hooks/useFavorites';
import { useAuth } from '../hooks/useAuth';

export default function WorkflowDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const { isSignedIn } = useAuth();
  const { data: workflow, isLoading, error } = useWorkflow(id || '');
  const { data: reviews } = useReviews(workflow?.id || '');
  const { data: favorites } = useFavorites();
  const toggleFav = useToggleFavorite();

  if (isLoading) return <LoadingPage />;
  if (error || !workflow) return <NotFound />;

  const isFav = favorites?.some((f) => f.id === workflow.id) ?? false;
  const version = workflow.currentVersion;

  const tabOptions = [
    { key: 'overview', label: 'Overview', icon: <Info className="h-3.5 w-3.5" /> },
    { key: 'technical', label: 'Technical Details', icon: <Shield className="h-3.5 w-3.5" /> },
    { key: 'reviews', label: 'Reviews', count: reviews?.length || 0, icon: <Star className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-6 py-6 gap-8 select-none pb-16">
      
      {/* Top Breadcrumb Back navigation links */}
      <Link to="/exchange" className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-300 w-fit">
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Exchange
      </Link>

      {/* Hero Header pane */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-zinc-900 pb-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="info">{CATEGORY_LABELS[workflow.category]}</Badge>
            {workflow.verified && (
              <Badge variant="success" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 fill-emerald-950" />
                Verified
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100 tracking-tight leading-tight">
              {workflow.name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              {workflow.shortDescription}
            </p>
          </div>

          {/* Ratings Summary */}
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={workflow.averageRating} size="sm" />
            <span className="text-[11px] text-zinc-500 font-semibold">
              {workflow.averageRating} ({workflow.reviewCount} reviews) • {workflow.totalRuns} execution runs
            </span>
          </div>
        </div>

        {/* Pricing Actions checkout card */}
        <Card className="w-full md:max-w-[280px] shrink-0 bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-4 shadow-xl">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase">Cost per Run</span>
            <span className="text-2xl font-display font-bold text-zinc-100">
              {workflow.isFree ? 'Free' : formatCurrency(workflow.pricePerRun)}
            </span>
          </div>

          <hr className="border-zinc-800/80" />

          <div className="flex flex-col gap-2 text-[10px] text-zinc-400">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
              <span>Average run time: <strong>{formatDuration(workflow.estimatedDurationSeconds)}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
              <span>Created by: <strong>{workflow.creator?.displayName}</strong></span>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <Link to={`/exchange/${workflow.slug}/run`} className="w-full">
              <Button variant="primary" size="md" className="w-full font-bold flex items-center gap-1.5 shadow-lg">
                <Play className="h-3.5 w-3.5 fill-current" />
                Run Workflow
              </Button>
            </Link>
            {isSignedIn && (
              <Button
                variant={isFav ? 'outline' : 'secondary'}
                size="md"
                onClick={() => toggleFav.mutate(workflow.id)}
                disabled={toggleFav.isPending}
                className="w-full font-bold flex items-center gap-1.5"
              >
                <Bookmark className={`h-4 w-4 ${isFav ? 'fill-indigo-400 text-indigo-400' : ''}`} />
                {isFav ? 'Saved' : 'Save to Favorites'}
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Tabs Layout contents */}
      <div className="flex flex-col gap-6">
        <Tabs options={tabOptions} activeKey={activeTab} onChange={setActiveTab} />

        {activeTab === 'overview' && (
          <div className="flex flex-col gap-6 text-xs text-zinc-300 leading-relaxed font-medium">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-zinc-200">Outcome Goal</h3>
              <p className="bg-zinc-900 border border-zinc-800 rounded-xl p-4.5 italic text-zinc-400 font-sans">
                "{workflow.outcomeStatement}"
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-zinc-200">Detailed Description</h3>
              <p className="whitespace-pre-wrap">{workflow.fullDescription}</p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-zinc-200">Data Security & Storage Policy</h3>
              <p className="bg-zinc-900 border border-zinc-800 rounded-xl p-4.5 text-zinc-400">
                {workflow.dataHandlingSummary}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="flex flex-col gap-6 text-xs text-zinc-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
                <h4 className="font-semibold text-sm text-zinc-200">System Parameters</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Target Model:</span>
                    <span className="text-zinc-300 font-semibold">{version?.modelId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Provider:</span>
                    <span className="text-zinc-300 font-semibold capitalize">{version?.modelProvider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Version Notes:</span>
                    <span className="text-zinc-300 font-semibold">{version?.versionNotes}</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
                <h4 className="font-semibold text-sm text-zinc-200">Required Parameters</h4>
                <div className="flex flex-col gap-2.5">
                  {version?.inputDefinitions.map((def: any) => (
                    <div key={def.id} className="flex justify-between border-b border-zinc-800/50 pb-2">
                      <span className="text-zinc-300 font-semibold">{def.label}</span>
                      <span className="text-[10px] text-zinc-500 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded font-mono uppercase">
                        {def.type}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
                <h4 className="font-semibold text-sm text-zinc-200">Capability Manifest</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1 border-b border-zinc-800/50 pb-2">
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Outcome Goal</span>
                    <span className="text-zinc-300">{workflow.outcomeStatement}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-zinc-800/50 pb-2">
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Runtime Sandbox Permissions</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      <Badge variant="outline" className="text-[9px] border-zinc-800 bg-zinc-950 text-zinc-400">Strictly Sandboxed</Badge>
                      <Badge variant="outline" className="text-[9px] border-zinc-800 bg-zinc-950 text-zinc-400">No Persistent Storage</Badge>
                      <Badge variant="outline" className="text-[9px] border-zinc-800 bg-zinc-950 text-zinc-400">No Web Access</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase">Verification Evidence</span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-md">
                        <CheckCircle className="h-3 w-3" />
                        <span>Verified outcome matches goal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-5">
            <h3 className="text-sm font-semibold text-zinc-200">Ratings & Feedback</h3>
            
            {reviews?.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center italic border border-dashed border-zinc-800 rounded-xl">
                No user feedback ratings submitted yet. Run the workflow and submit the first rating!
              </p>
            ) : (
              <div className="flex flex-col gap-4">
                {reviews?.map((rev) => (
                  <Card key={rev.id} className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-4 select-none">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-300 font-semibold">
                          {rev.user?.displayName?.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="text-xs font-semibold text-zinc-300">{rev.user?.displayName}</span>
                      </div>
                      <StarRating rating={rev.rating} size="sm" />
                    </div>
                    {rev.comment && <p className="text-xs text-zinc-400 leading-relaxed">{rev.comment}</p>}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
