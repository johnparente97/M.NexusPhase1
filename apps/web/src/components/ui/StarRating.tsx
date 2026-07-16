import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StarRatingProps {
  rating: number; // 0 to 5
  max?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  interactive = false,
  onChange,
  size = 'sm',
  className,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
  };

  const handleRatingClick = (val: number) => {
    if (interactive && onChange) {
      onChange(val);
    }
  };

  const handleStarHover = (val: number | null) => {
    if (interactive) {
      setHoverRating(val);
    }
  };

  const displayRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= displayRating;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => handleRatingClick(starValue)}
            onMouseEnter={() => handleStarHover(starValue)}
            onMouseLeave={() => handleStarHover(null)}
            className={cn(
              'p-0.5 text-zinc-600 focus:outline-none transition-colors duration-100',
              {
                'text-amber-400': isFilled,
                'cursor-pointer hover:scale-110 active:scale-95': interactive,
              }
            )}
          >
            <Star
              className={cn(sizeClasses[size], {
                'fill-current': isFilled,
              })}
            />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
