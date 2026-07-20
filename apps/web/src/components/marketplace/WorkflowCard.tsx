import React from 'react';
import { Link } from 'react-router-dom';
import { StarRating } from '../ui/StarRating';
import { Bookmark, Clock, User, CheckCircle, ArrowUpRight, Zap, Sparkles } from 'lucide-react';
import { Workflow } from '@meridian-nexus/shared-types';
import { formatCurrency, formatDuration, formatRating } from '../../utils/format';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../utils/constants';
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
  const CategoryIcon = CATEGORY_ICONS[workflow.category] || Sparkles;

  return (
    <Link to={`/exchange/${workflow.slug}`} className="block group h-full">
      <div className="flex flex-col justify-between h-full bg-[#141417] border border-zinc-800/90 hover:border-emerald-500/50 rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 shadow-xl shadow-black/30 hover:shadow-2xl hover:shadow-emerald-500/10 group-hover:-translate-y-1">
        
        {/* Subtle Background Glow Mesh */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all pointer-events-none" />

        {/* 1. Header Row: Icon + Category Badge + Price Pill */}
        <div className="flex items-center justify-between gap-3 mb-3 z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <CategoryIcon className="h-4.5 w-4.5" />
            </div>

            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-extrabold uppercase tracking-wider rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {CATEGORY_LABELS[workflow.category] || workflow.category}
              </span>

              {workflow.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-md">
                  <CheckCircle className="h-3 w-3 fill-emerald-400 text-zinc-950 shrink-0" />
                  Verified
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md transition-all ${
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
        <div className="flex flex-col gap-1.5 mb-4 z-10">
          <h3 className="font-display font-extrabold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors leading-snug tracking-tight">
            {workflow.name}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-normal line-clamp-2">
            {workflow.shortDescription}
          </p>
        </div>

        {/* 3. Footer Row: Ratings, Creator & Configure Button */}
        <div className="flex items-center justify-between gap-3 pt-3.5 border-t border-zinc-800/80 text-xs z-10">
          <div className="flex items-center gap-3 text-zinc-400">
            <div className="flex items-center gap-1.5 font-bold text-zinc-200">
              <StarRating rating={workflow.averageRating} size="sm" />
              <span>{formatRating(workflow.averageRating)}</span>
            </div>

            <span className="hidden sm:flex items-center gap-1 text-zinc-400 font-medium">
              <Clock className="h-3.5 w-3.5 text-zinc-500 shrink-0" />
              <span>{displayDuration}</span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:from-emerald-400 group-hover:to-teal-400 text-zinc-950 shadow-md shadow-emerald-500/20 transition-all">
            <span>Configure & Run</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>

      </div>
    </Link>
  );
};
export default WorkflowCard;
