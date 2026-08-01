import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[#14141E] border border-white/[0.07] rounded-2xl overflow-hidden',
          {
            'premium-card hover:shadow-lg hover:shadow-black/20 hover:border-white/[0.12] transition-all duration-200': hover,
            'p-0': padding === 'none',
            'p-4': padding === 'sm',
            'p-6': padding === 'md',
            'p-8': padding === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
