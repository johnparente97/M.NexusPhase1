import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ChevronLeft, ChevronRight, Play, Sparkles, Zap, ShieldCheck } from 'lucide-react';
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
    <div className="relative w-full min-h-[300px] bg-gradient-to-br from-[#1c1c20] via-[#141417] to-[#0d0d0f] border border-zinc-800/90 hover:border-emerald-500/40 rounded-3xl flex flex-col justify-between overflow-hidden group select-none shadow-2xl shadow-black/50 p-6 sm:p-9 transition-all duration-300">
      
      {/* Background radial gradient accent light */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative flex flex-col gap-4 z-10 max-w-3xl">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Agent Capability
          </span>
          <span className="text-xs text-zinc-400 font-bold tracking-wider uppercase font-mono bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-800">
            {current.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" />
            x402 Verified
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
            {current.name}
          </h2>
          <p className="text-sm sm:text-base text-zinc-300/90 leading-relaxed line-clamp-2 font-normal max-w-2xl">
            {current.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-3">
          <Link to={`/exchange/${current.slug}`}>
            <Button
              variant="primary"
              size="md"
              className="font-extrabold flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 shadow-xl shadow-emerald-500/25 border-none rounded-xl text-sm transition-all"
            >
              <Zap className="h-4 w-4 fill-zinc-950" />
              Configure & Run Agent
            </Button>
          </Link>
          <span className="text-xs sm:text-sm text-zinc-400 font-medium">
            Settlement Fee: <span className="font-extrabold text-white text-base">{current.isFree ? 'FREE DEMO' : formatCurrency(current.pricePerRun)}</span>
          </span>
        </div>
      </div>

      {/* Carousel control buttons */}
      {workflows.length > 1 && (
        <>
          <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-emerald-500/50 hover:bg-zinc-800 transition-all cursor-pointer shadow-lg"
              title="Previous capability"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-emerald-500/50 hover:bg-zinc-800 transition-all cursor-pointer shadow-lg"
              title="Next capability"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-10 flex items-center gap-2">
            {workflows.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-8 bg-emerald-400 shadow-md shadow-emerald-500/30' : 'w-2.5 bg-zinc-700 hover:bg-zinc-500'
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
