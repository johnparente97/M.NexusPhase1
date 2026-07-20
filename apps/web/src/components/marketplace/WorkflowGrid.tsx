import React from 'react';
import WorkflowCard from './WorkflowCard';
import { Workflow } from '@meridian-nexus/shared-types';
import { Skeleton } from '../ui/Skeleton';
import { useFavorites } from '../../hooks/useFavorites';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { Clock, User, CheckCircle, ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatDuration, formatRating } from '../../utils/format';
import { CATEGORY_LABELS } from '../../utils/constants';

export interface WorkflowGridProps {
  workflows?: Workflow[];
  isLoading?: boolean;
  viewMode?: 'grid' | 'list';
}

export const WorkflowGrid: React.FC<WorkflowGridProps> = ({
  workflows,
  isLoading,
  viewMode = 'grid',
}) => {
  const { data: favorites } = useFavorites();

  if (isLoading) {
    return (
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'flex flex-col gap-4'}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex flex-col h-[200px] border border-zinc-800 bg-[#171719] rounded-2xl p-6 gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-full" />
            <div className="mt-auto flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {workflows?.map((w) => {
          const isFav = favorites?.some((f) => f.id === w.id) ?? false;
          const displayPrice = w.isFree ? 'Free' : formatCurrency(w.pricePerRun);
          const displayDuration = formatDuration(w.estimatedDurationSeconds);
          const creatorName = w.creator?.displayName || 'Creator';

          return (
            <Link key={w.id} to={`/exchange/${w.slug}`} className="block group">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#171719] border border-zinc-800/80 hover:border-emerald-500/40 rounded-2xl p-5 transition-all shadow-md shadow-black/20 hover:shadow-emerald-500/5 group-hover:-translate-y-0.5">
                
                {/* Left Meta & Main info */}
                <div className="flex-1 flex flex-col gap-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <Badge variant={w.isFree ? 'success' : 'info'} className="text-xs px-2.5 py-0.5 font-semibold">
                      {CATEGORY_LABELS[w.category] || w.category}
                    </Badge>
                    {w.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        <CheckCircle className="h-3 w-3 fill-emerald-400 text-zinc-950" />
                        Verified
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors truncate">
                    {w.name}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-1 leading-relaxed">
                    {w.shortDescription}
                  </p>
                </div>

                {/* Center Ratings & Creator */}
                <div className="flex items-center gap-6 shrink-0 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <StarRating rating={w.averageRating} size="sm" />
                    <span className="font-medium">{formatRating(w.averageRating)} ({w.reviewCount})</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-medium">
                    <User className="h-3.5 w-3.5 text-zinc-500" />
                    <span className="text-zinc-300">{creatorName}</span>
                  </div>

                  <div className="flex items-center gap-1 font-medium">
                    <Clock className="h-3.5 w-3.5 text-zinc-500" />
                    <span>{displayDuration}</span>
                  </div>
                </div>

                {/* Right Action CTA */}
                <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/80 justify-between md:justify-end">
                  <span className="text-xs font-bold text-white bg-zinc-800/80 px-3 py-1.5 rounded-xl border border-zinc-700/60">
                    {displayPrice}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500 text-emerald-400 group-hover:text-zinc-950 border border-emerald-500/30 transition-all">
                    <span>Configure & Run</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6 sm:gap-8">
      {workflows?.map((w) => {
        const isFav = favorites?.some((f) => f.id === w.id) ?? false;
        return <WorkflowCard key={w.id} workflow={w} isFavorited={isFav} />;
      })}
    </div>
  );
};
export default WorkflowGrid;
