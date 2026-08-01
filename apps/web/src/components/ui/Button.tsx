import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
}

export const Button = React.forwardRef<any, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', isLoading, leftIcon, rightIcon, to, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center font-medium transition-colors duration-150 select-none cursor-pointer whitespace-nowrap rounded-xl',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08080C]',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      {
        // Primary — solid Electric Violet background
        'bg-violet-600 hover:bg-violet-500 text-white font-semibold shadow-sm':
          variant === 'primary',

        // Secondary — Dark Graphite surface
        'bg-[#1A1A26] hover:bg-[#222234] text-zinc-100 border border-white/[0.08] hover:border-white/[0.14]':
          variant === 'secondary',

        // Ghost — Minimal transparent
        'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]':
          variant === 'ghost',

        // Danger — Red destructive
        'bg-rose-500/10 hover:bg-rose-500/15 text-rose-400 border border-rose-500/20':
          variant === 'danger',

        // Outline — Border style
        'border border-violet-500/30 hover:border-violet-500/60 text-violet-300 bg-violet-500/5':
          variant === 'outline',

        // Sizes
        'h-8 px-3 text-xs gap-1.5': size === 'sm',
        'h-9 px-4 text-sm gap-2': size === 'md',
        'h-11 px-6 text-base gap-2.5': size === 'lg',

        // Loading
        'relative !text-transparent pointer-events-none': isLoading,
      },
      className
    );

    const content = (
      <>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    );

    if (to) {
      return (
        <Link ref={ref} to={to} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
