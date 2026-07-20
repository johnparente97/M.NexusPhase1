import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { Bookmark, Clock, User, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Workflow } from '@meridian-nexus/shared-types';
import { formatCurrency, formatDuration, formatRating } from '../../utils/format';
import { CATEGORY_LABELS } from '../../utils/constants';
import { useToggleFavorite } from '../../hooks/useFavorites';
import { useAuth } from '../../hooks/useAuth';

export interface WorkflowCardProps {
  workflow: Workflow;
  isFavorited?: boolean;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, isFavorited = false }) => {
  const { isSignedIn } = useAuth();
  const toggleFav = useToggleFavorite();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSignedIn) {
      toggleFav.mutate(workflow.id);
    }
  };

  const creatorName = workflow.creator?.displayName || 'Creator';
  const displayPrice = workflow.isFree ? 'Free' : formatCurrency(workflow.pricePerRun);
  const displayDuration = formatDuration(workflow.estimatedDurationSeconds);

  return (
    <Link to={`/exchange/${workflow.slug}`} className="block group">
      <div className="flex flex-col h-full bg-[#171719] border border-zinc-800/80 hover:border-emerald-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-lg shadow-black/20 hover:shadow-emerald-500/5 group-hover:-translate-y-0.5">
        
        {/* Top Meta Bar: Category Pill & Save Bookmark */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <Badge
            variant={workflow.isFree ? 'success' : 'info'}
            className="text-xs px-2.5 py-0.5 font-semibold tracking-wide"
          >
            {CATEGORY_LABELS[workflow.category] || workflow.category}
          </Badge>

          <div className="flex items-center gap-2">
            {workflow.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <CheckCircle className="h-3 w-3 fill-emerald-400 text-zinc-950" />
                Verified
              </span>
            )}
            {isSignedIn && (
              <button
                onClick={handleSave}
                disabled={toggleFav.isPending}
                className="text-zinc-500 hover:text-emerald-400 p-1.5 rounded-lg hover:bg-zinc-800/60 transition-colors disabled:opacity-50"
                title="Bookmark workflow"
              >
                <Bookmark className={`h-4 w-4 ${isFavorited ? 'fill-emerald-500 text-emerald-500' : ''}`} />
              </button>
            )}
          </div>
        </div>

        {/* Title & Short Description — Highly Readable */}
        <div className="flex flex-col gap-2 mb-4">
          <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug tracking-tight">
            {workflow.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 line-clamp-3 leading-relaxed font-normal">
            {workflow.shortDescription}
          </p>
        </div>

        {/* Rating & Creator Info */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-zinc-800/60 text-xs">
          <div className="flex items-center gap-2">
            <StarRating rating={workflow.averageRating} size="sm" />
            <span className="text-xs text-zinc-400 font-medium">
              {formatRating(workflow.averageRating)} ({workflow.reviewCount})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400 font-medium truncate max-w-[120px]">
            <User className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
            <span className="truncate">{creatorName}</span>
          </div>
        </div>

        {/* Card Action & Price CTA Button */}
        <div className="mt-4 pt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
            <Clock className="h-3.5 w-3.5 text-zinc-500" />
            <span>{displayDuration}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white bg-zinc-800/80 px-2.5 py-1 rounded-lg border border-zinc-700/60">
              {displayPrice}
            </span>
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500 text-emerald-400 group-hover:text-zinc-950 border border-emerald-500/30 transition-all">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
};
export default WorkflowCard;
