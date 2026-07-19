import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';
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
    <Card padding="none" className="relative w-full h-[320px] sm:h-[280px] bg-zinc-900 border-zinc-800 flex flex-col justify-end overflow-hidden group select-none">
      
      {/* Background radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_60%)] pointer-events-none" />

      {/* Content wrapper */}
      <div className="relative p-6 sm:p-8 flex flex-col gap-4.5 z-10 max-w-xl">
        <div className="flex items-center gap-2">
          <Badge variant="info" className="text-[9px]">Featured</Badge>
          <span className="text-[10px] text-emerald-400 font-semibold tracking-wide uppercase">
            {current.category}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight leading-tight">
            {current.name}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-normal line-clamp-2">
            {current.shortDescription}
          </p>
        </div>

        <div className="flex items-center gap-3.5 mt-1">
          <Link to={`/exchange/${current.slug}`}>
            <Button variant="primary" size="sm" className="font-bold flex items-center gap-1.5 shadow-lg">
              <Play className="h-3.5 w-3.5 fill-current" />
              Configure & Run
            </Button>
          </Link>
          <span className="text-xs text-zinc-400 font-medium">
            Starting at <span className="font-semibold text-zinc-200">{current.isFree ? 'Free' : formatCurrency(current.pricePerRun)}</span> per execution
          </span>
        </div>
      </div>

      {/* Carousel control buttons */}
      {workflows.length > 1 && (
        <>
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-1">
            {workflows.map((_, idx) => (
              <span
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                  idx === activeIndex ? 'w-4 bg-emerald-500' : 'w-1.5 bg-zinc-800 hover:bg-zinc-700'
                }`}
              />
            ))}
          </div>
        </>
      )}

    </Card>
  );
};
export default FeaturedCarousel;
