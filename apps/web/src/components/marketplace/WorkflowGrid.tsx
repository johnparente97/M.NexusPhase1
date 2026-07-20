import React from 'react';
import WorkflowCard from './WorkflowCard';
import { Workflow } from '@meridian-nexus/shared-types';
import { Skeleton } from '../ui/Skeleton';
import { useFavorites } from '../../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { StarRating } from '../ui/StarRating';
import { Clock, User, CheckCircle, ArrowUpRight, Sparkles, Zap, Shield, Database } from 'lucide-react';
import { formatCurrency, formatDuration, formatRating } from '../../utils/format';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../utils/constants';
import { useInspectorStore } from '../../stores/inspector-store';

export interface WorkflowGridProps {
  workflows?: Workflow[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
}

export const WorkflowGrid: React.FC<WorkflowGridProps> = ({
  workflows,
  isLoading,
  viewMode = 'list',
}) => {
  const { data: favorites } = useFavorites();
  const { setSelectedWorkflow, selectedWorkflow } = useInspectorStore();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between border border-zinc-800/80 bg-[#141417] rounded-2xl p-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Skeleton className="h-12 w-12 rounded-2xl shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-36 rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4.5 w-full">
        {workflows?.map((w) => {
          const isFav = favorites?.some((f) => f.id === w.id) ?? false;
          const displayPrice = w.isFree ? 'FREE DEMO' : formatCurrency(w.pricePerRun);
          const displayDuration = formatDuration(w.estimatedDurationSeconds);
          const creatorName = w.creator?.displayName || 'Meridian Creator';
          const CategoryIcon = CATEGORY_ICONS[w.category] || Sparkles;
          const isSelected = selectedWorkflow?.id === w.id;

          return (
            <div
              key={w.id}
              onClick={() => setSelectedWorkflow(w)}
              className={`flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-5 sm:p-6 transition-all duration-300 shadow-xl shadow-black/30 rounded-2xl relative overflow-hidden cursor-pointer ${
                isSelected 
                  ? 'border border-emerald-500 ring-1 ring-emerald-500/30 bg-[#141417]/95 shadow-emerald-500/5' 
                  : 'bg-[#141417] border border-zinc-800/90 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-0.5'
              }`}
            >
              
              {/* Background Mesh Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Left Column: Icon & Main Info */}
              <div className="flex items-start gap-4.5 flex-1 min-w-0 z-10">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm mt-0.5 group-hover:scale-105 transition-transform">
                  <CategoryIcon className="h-6 w-6" />
                </div>

                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-extrabold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {CATEGORY_LABELS[w.category] || w.category}
                    </span>

                    {w.verified && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-md">
                        <CheckCircle className="h-3 w-3 fill-emerald-400 text-zinc-950 shrink-0" />
                        Verified
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
                      <Shield className="h-3 w-3 fill-emerald-500 text-zinc-950" />
                      TRUST 98
                    </span>
                  </div>

                  <h3 className="font-display font-black text-base sm:text-lg text-white hover:text-emerald-300 transition-colors leading-snug tracking-tight">
                    {w.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal line-clamp-2">
                    {w.shortDescription}
                  </p>
                </div>
              </div>

              {/* Middle Metrics Row */}
              <div className="flex items-center gap-4.5 flex-wrap lg:flex-nowrap shrink-0 text-xs text-zinc-400 z-10">
                <div className="flex items-center gap-1.5 font-bold text-zinc-200">
                  <StarRating rating={w.averageRating} size="sm" />
                  <span>{formatRating(w.averageRating)}</span>
                  <span className="text-zinc-500 text-[11px]">({w.reviewCount})</span>
                </div>

                <div className="flex items-center gap-1.5 text-zinc-300 font-semibold bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-lg">
                  <User className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>{creatorName}</span>
                </div>

                <div className="flex items-center gap-1 font-medium text-zinc-400">
                  <Clock className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
                  <span>{displayDuration}</span>
                </div>
              </div>

              {/* Right Column: CTA & Price */}
              <div className="flex items-center gap-3 shrink-0 justify-between lg:justify-end border-t lg:border-t-0 border-zinc-800/80 pt-3 lg:pt-0 z-10">
                <span className={`text-xs font-black px-3.5 py-2 rounded-xl shadow-md font-mono ${
                  w.isFree 
                    ? 'bg-emerald-400 text-zinc-950 shadow-emerald-500/25' 
                    : 'bg-zinc-900 text-zinc-100 border border-zinc-700/80'
                }`}>
                  {displayPrice}
                </span>

                <Link to={`/workflows/${w.slug}/run`} className="inline-flex items-center gap-2 text-xs font-black px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-zinc-950 shadow-lg shadow-emerald-500/30 group-hover:scale-[1.03] active:scale-[0.97] transition-all duration-200">
                  <Zap className="h-4 w-4 fill-zinc-950" />
                  <span>Run</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 w-full">
      {workflows?.map((w) => {
        const isFav = favorites?.some((f) => f.id === w.id) ?? false;
        return <WorkflowCard key={w.id} workflow={w} isFavorited={isFav} />;
      })}
    </div>
  );
};

export default WorkflowGrid;
