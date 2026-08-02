import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'error' | 'info' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide border select-none uppercase',
        {
          'bg-violet-500/10 text-violet-400 border-violet-500/20': variant === 'default',
          'bg-[#1A1A26] text-zinc-300 border-white/[0.08]': variant === 'secondary',
          'bg-emerald-500/10 text-emerald-400 border-emerald-500/20': variant === 'success',
          'bg-amber-500/10 text-amber-400 border-amber-500/20': variant === 'warning',
          'bg-rose-500/10 text-rose-400 border-rose-500/20': variant === 'danger' || variant === 'error',
          'bg-cyan-500/10 text-cyan-400 border-cyan-500/20': variant === 'info',
          'border-white/[0.12] text-zinc-400 bg-transparent': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
