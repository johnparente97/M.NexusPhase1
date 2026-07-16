import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { StarRating } from '../ui/StarRating';
import { Bookmark, Clock, User, CheckCircle } from 'lucide-react';
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
    <Link to={`/exchange/${workflow.slug}`} className="block">
      <Card hover padding="none" className="flex flex-col h-full bg-zinc-900 border-zinc-800">
        
        {/* Card Header Body */}
        <div className="p-5 flex-1 flex flex-col gap-3.5">
          <div className="flex items-start justify-between gap-3">
            <Badge variant={workflow.isFree ? 'success' : 'info'} className="text-[9px]">
              {CATEGORY_LABELS[workflow.category] || workflow.category}
            </Badge>
            {isSignedIn && (
              <button
                onClick={handleSave}
                disabled={toggleFav.isPending}
                className="text-zinc-500 hover:text-indigo-400 p-0.5 rounded transition-colors disabled:opacity-50"
              >
                <Bookmark className={`h-4 w-4 ${isFavorited ? 'fill-indigo-500 text-indigo-500' : ''}`} />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-white line-clamp-1">
              {workflow.name}
            </h3>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-normal">
              {workflow.shortDescription}
            </p>
          </div>

          {/* Trust Ratings */}
          <div className="flex items-center gap-2 mt-auto">
            <StarRating rating={workflow.averageRating} size="sm" />
            <span className="text-[10px] text-zinc-500 font-semibold">
              {formatRating(workflow.averageRating)} ({workflow.reviewCount})
            </span>
          </div>
        </div>

        {/* Card Footer Detail Row */}
        <div className="px-5 py-3 bg-zinc-950 border-t border-zinc-900/80 flex items-center justify-between gap-4 text-[10px] text-zinc-400 font-medium">
          <div className="flex items-center gap-2 max-w-[60%]">
            <div className="h-5 w-5 bg-zinc-800 rounded-full border border-zinc-700 flex items-center justify-center shrink-0">
              <User className="h-3 w-3 text-zinc-400" />
            </div>
            <span className="truncate text-zinc-300 flex items-center gap-1">
              {creatorName}
              {workflow.verified && <CheckCircle className="h-3 w-3 text-indigo-400 fill-indigo-950 shrink-0" />}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-zinc-500" />
              <span>{displayDuration}</span>
            </div>
            <span className="font-semibold text-zinc-200 text-xs">
              {displayPrice}
            </span>
          </div>
        </div>

      </Card>
    </Link>
  );
};
export default WorkflowCard;
