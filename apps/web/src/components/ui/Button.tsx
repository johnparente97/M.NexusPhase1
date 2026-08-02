import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cyan' | 'magenta' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
}

export const Button = React.forwardRef<any, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', isLoading, leftIcon, rightIcon, to, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center font-semibold transition-all duration-200 select-none cursor-pointer whitespace-nowrap rounded-xl',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A855F7]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05050A]',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      {
        // Primary — Prismatic Mecha Cyberpunk Gradient
        'bg-gradient-to-r from-[#A855F7] via-[#7B2CBF] to-[#FF007F] hover:brightness-110 text-white font-bold shadow-lg shadow-purple-600/25 border border-purple-400/30':
          variant === 'primary',

        // Secondary — Cyber Obsidian Surface
        'bg-[#0F0F1D] hover:bg-[#161628] text-zinc-100 border border-white/[0.08] hover:border-[#A855F7]/40 shadow-sm':
          variant === 'secondary',

        // Cyan — Hyper Iridescent Cyan
        'bg-[#00F5D4] hover:bg-[#33F7DD] text-zinc-950 font-bold shadow-lg shadow-cyan-500/25 border border-cyan-300/40':
          variant === 'cyan',

        // Magenta — Neon Cyber Magenta
        'bg-[#FF007F] hover:bg-[#FF3399] text-white font-bold shadow-lg shadow-pink-600/25 border border-pink-400/30':
          variant === 'magenta',

        // Ghost — Minimal transparent
        'text-zinc-400 hover:text-white hover:bg-white/[0.05]':
          variant === 'ghost',

        // Danger — Red destructive
        'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30':
          variant === 'danger',

        // Outline — Cyber Sigil Outline
        'border border-[#A855F7]/40 hover:border-[#00F5D4]/80 text-[#D8B4FE] hover:text-[#00F5D4] bg-[#A855F7]/10 shadow-sm':
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
