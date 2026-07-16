import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border select-none uppercase',
        {
          'bg-zinc-800 text-zinc-300 border-zinc-700': variant === 'default',
          'bg-emerald-950/40 text-emerald-400 border-emerald-900/30': variant === 'success',
          'bg-amber-950/40 text-amber-400 border-amber-900/30': variant === 'warning',
          'bg-rose-950/40 text-rose-400 border-rose-900/30': variant === 'error',
          'bg-sky-950/40 text-sky-400 border-sky-900/30': variant === 'info',
          'border-zinc-700 text-zinc-400': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
