import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { Bookmark, Clock, User, CheckCircle, ArrowUpRight, Sparkles, Zap } from 'lucide-react';
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

  const creatorName = workflow.creator?.displayName || 'Meridian Creator';
  const displayPrice = workflow.isFree ? 'FREE DEMO' : formatCurrency(workflow.pricePerRun);
  const displayDuration = formatDuration(workflow.estimatedDurationSeconds);

  return (
    <Link to={`/exchange/${workflow.slug}`} className="block group h-full">
      <div className="flex flex-col h-full bg-gradient-to-b from-[#18181b] via-[#141417] to-[#0f0f12] border border-zinc-800/90 hover:border-emerald-500/50 rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-emerald-500/10 group-hover:-translate-y-1">
        
        {/* Subtle Background Glow Mesh */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

        {/* 1. Header Meta Bar: Category Badge + Verified Indicator + Price Tag */}
        <div className="flex items-center justify-between gap-3 mb-4 z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 text-[11px] font-mono font-extrabold uppercase tracking-wider rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm">
              {CATEGORY_LABELS[workflow.category] || workflow.category}
            </span>

            {workflow.verified && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg shadow-sm">
                <CheckCircle className="h-3 w-3 fill-emerald-400 text-zinc-950 shrink-0" />
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-extrabold px-3 py-1 rounded-lg shadow-md transition-all ${
              workflow.isFree 
                ? 'bg-emerald-400 text-zinc-950 shadow-emerald-500/20' 
                : 'bg-zinc-800 text-zinc-100 border border-zinc-700/80'
            }`}>
              {displayPrice}
            </span>

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

        {/* 2. Title & Description — Full Legibility without cutoffs */}
        <div className="flex flex-col gap-2.5 mb-5 z-10">
          <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors leading-snug tracking-tight">
            {workflow.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-normal line-clamp-2">
            {workflow.shortDescription}
          </p>
        </div>

        {/* 3. Metrics & Creator Row */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-zinc-800/80 text-xs z-10">
          <div className="flex items-center gap-2">
            <StarRating rating={workflow.averageRating} size="sm" />
            <span className="text-xs text-zinc-300 font-bold">
              {formatRating(workflow.averageRating)}
            </span>
            <span className="text-xs text-zinc-500">
              ({workflow.reviewCount})
            </span>
          </div>

          <div className="flex items-center gap-3 text-zinc-400 text-xs">
            <span className="flex items-center gap-1.5 text-zinc-300 font-semibold bg-zinc-900/90 border border-zinc-800 px-2.5 py-1 rounded-lg">
              <User className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="truncate max-w-[100px]">{creatorName}</span>
            </span>

            <span className="flex items-center gap-1 text-zinc-400 font-medium">
              <Clock className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
              <span>{displayDuration}</span>
            </span>
          </div>
        </div>

        {/* 4. Prominent Launch CTA Button */}
        <div className="mt-4 z-10">
          <div className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:from-emerald-400 group-hover:to-teal-400 text-zinc-950 font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/35 transition-all">
            <Zap className="h-4 w-4 fill-zinc-950" />
            <span>Configure & Run Agent</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

      </div>
    </Link>
  );
};
export default WorkflowCard;
