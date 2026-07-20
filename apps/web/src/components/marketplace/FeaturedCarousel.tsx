import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ChevronLeft, ChevronRight, Play, Sparkles } from 'lucide-react';
import { Workflow } from '@meridian-nexus/shared-types';
import { formatCurrency } from '../../utils/format';

export interface FeaturedCarouselProps {
  workflows?: Workflow[];
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ workflows }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!workflows || workflows.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % workflows.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [workflows]);

  if (!workflows || workflows.length === 0) return null;

  const current = workflows[activeIndex]!;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev - 1 + workflows.length) % workflows.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev + 1) % workflows.length);
  };

  return (
    <div className="relative w-full min-h-[280px] bg-[#171719] border border-zinc-800/80 rounded-2xl flex flex-col justify-between overflow-hidden group select-none shadow-xl shadow-black/30 p-6 sm:p-8">
      
      {/* Background radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.12),transparent_60%)] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative flex flex-col gap-4 z-10 max-w-2xl">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            Featured Capability
          </span>
          <span className="text-xs text-zinc-400 font-semibold tracking-wide uppercase">
            {current.category}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
            {current.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2 font-normal">
            {current.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <Link to={`/exchange/${current.slug}`}>
            <Button
              variant="primary"
              size="md"
              className="font-bold flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/25 border-none"
            >
              <Play className="h-4 w-4 fill-current" />
              Configure & Run Agent
            </Button>
          </Link>
          <span className="text-xs text-zinc-400 font-medium">
            Starting at <span className="font-bold text-white text-sm">{current.isFree ? 'Free' : formatCurrency(current.pricePerRun)}</span> per execution
          </span>
        </div>
      </div>

      {/* Carousel control buttons */}
      {workflows.length > 1 && (
        <>
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-md"
              title="Previous capability"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-700/60 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer shadow-md"
              title="Next capability"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-1.5">
            {workflows.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                }`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
};
export default FeaturedCarousel;
