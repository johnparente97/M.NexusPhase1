import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Clock, User, ArrowUpRight, Zap, Sparkles, Shield, Layers, Eye } from 'lucide-react';
import { Workflow } from '@meridian-nexus/shared-types';
import { formatCurrency, formatDuration } from '../../utils/format';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../../utils/constants';
import { useToggleFavorite } from '../../hooks/useFavorites';
import { useAuth } from '../../hooks/useAuth';
import { useInspectorStore } from '../../stores/inspector-store';

export interface WorkflowCardProps {
  workflow: Workflow;
  isFavorited?: boolean;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ workflow, isFavorited = false }) => {
  const { isSignedIn } = useAuth();
  const toggleFav = useToggleFavorite();
  const navigate = useNavigate();
  const { setSelectedWorkflow, selectedWorkflow } = useInspectorStore();

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSignedIn) {
      toggleFav.mutate(workflow.id);
    }
  };

  const handleInspect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedWorkflow(workflow);
  };

  const handleRun = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/exchange/${workflow.id}/run`);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/exchange/${workflow.id}`);
  };

  const creatorName = workflow.creator?.displayName || 'Meridian Creator';
  const displayPrice = workflow.isFree ? 'FREE DEMO' : formatCurrency(workflow.pricePerRun);
  const displayDuration = formatDuration(workflow.estimatedDurationSeconds);
  const CategoryIcon = CATEGORY_ICONS[workflow.category] || Sparkles;
  const isSelected = selectedWorkflow?.id === workflow.id;

  // Category gradients for collectible cards
  const getBannerGradient = (category: string) => {
    switch (category) {
      case 'research':
        return 'from-emerald-500/20 via-teal-500/10 to-transparent';
      case 'marketing':
        return 'from-indigo-500/20 via-purple-500/10 to-transparent';
      case 'sales':
        return 'from-amber-500/20 via-orange-500/10 to-transparent';
      case 'development':
        return 'from-cyan-500/20 via-blue-500/10 to-transparent';
      case 'data-analysis':
        return 'from-violet-500/20 via-fuchsia-500/10 to-transparent';
      default:
        return 'from-zinc-500/20 via-zinc-800/10 to-transparent';
    }
  };

  return (
    <div
      onClick={handleViewDetails}
      className={`group flex flex-col justify-between h-full bg-[#111113]/90 border rounded-2xl relative overflow-hidden transition-all duration-300 shadow-xl shadow-black/40 cursor-pointer ${
        isSelected 
          ? 'border-emerald-500 ring-1 ring-emerald-500/30 shadow-emerald-500/10' 
          : 'border-zinc-800/80 hover:border-zinc-700/90 hover:shadow-2xl hover:shadow-black/60 hover:-translate-y-1'
      }`}
    >
      {/* Category Gradient Top Banner Artwork */}
      <div className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b ${getBannerGradient(workflow.category)} pointer-events-none z-0`} />
      <div className="absolute top-0 left-0 right-0 h-20 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-0" />

      {/* Main Content Area */}
      <div className="p-5 flex flex-col h-full justify-between z-10 relative">
        
        {/* Top Header Controls: Category & Action icons */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-emerald-400 shrink-0 shadow-sm">
              <CategoryIcon className="h-4 w-4" />
            </div>
            <span className="px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-wider rounded bg-zinc-950/90 text-zinc-400 border border-zinc-800/80">
              {CATEGORY_LABELS[workflow.category] || workflow.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-mono font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
              <Shield className="h-3 w-3 fill-emerald-500 text-zinc-950" />
              Verified Demo
            </span>
          </div>
        </div>

        {/* Center Name & Description */}
        <div className="space-y-2 mb-4">
          <h3 className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {workflow.name}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-sans">
            {workflow.shortDescription || ''}
          </p>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4 pb-3 border-b border-zinc-900">
          <div className="h-5 w-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-300 font-bold shrink-0">
            <User className="h-3 w-3" />
          </div>
          <span className="truncate text-[11px]">{creatorName}</span>
        </div>

        {/* Action Panel / Specifications footer */}
        <div className="flex flex-col gap-3.5 text-xs">
          
          {/* Metadata Specifications strip */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{displayDuration}</span>
            </div>
            <span className="font-black text-emerald-400 bg-zinc-950 border border-zinc-800 px-2 py-0.5 rounded font-mono">
              {displayPrice}
            </span>
          </div>

          {/* Action trigger row */}
          <div className="flex items-center gap-2">
            {/* Run CTA */}
            <button
              onClick={handleRun}
              className="flex-1 inline-flex items-center justify-center gap-1.5 text-[10px] font-black px-3 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-md shadow-emerald-500/20 group-hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Zap className="h-3 w-3 fill-zinc-950" />
              <span>Run</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>

            {/* View Details button */}
            <button
              onClick={handleViewDetails}
              className="px-2.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer font-bold text-[10px] flex items-center justify-center gap-1"
              title="View full workflow details"
            >
              <Eye className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Details</span>
            </button>

            {/* Inspect button */}
            <button
              onClick={handleInspect}
              className="px-2 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer font-bold text-[10px]"
              title="Inspect specifications"
            >
              <Layers className="h-3.5 w-3.5" />
            </button>

            {/* Bookmark button */}
            {isSignedIn && (
              <button
                onClick={handleSave}
                disabled={toggleFav.isPending}
                className="px-2 py-2 rounded-xl bg-zinc-950 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-500 hover:text-rose-400 transition-all cursor-pointer"
                title="Save capability"
              >
                <Bookmark className={`h-3.5 w-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default WorkflowCard;
