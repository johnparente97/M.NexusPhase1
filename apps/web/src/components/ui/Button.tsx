import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline' | 'emerald';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
}

// MRDN brand button system
// primary = white pill (mrdn.finance CTA style)
// emerald = emerald-500 pill (MRDN token accent)
// secondary = dark rounded card button
// outline = ghost bordered
// ghost = transparent
// danger = rose destructive

export const Button = React.forwardRef<any, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', isLoading, leftIcon, rightIcon, to, children, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap decoration-none',
      {
        // Primary = MRDN white pill (like "Connect Wallet")
        'bg-white hover:bg-gray-100 text-zinc-950 font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.25)] rounded-full':
          variant === 'primary',

        // Emerald = MRDN brand color pill
        'bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow-[0_4px_16px_0_rgba(16,185,129,0.25)] rounded-full':
          variant === 'emerald',

        // Secondary = dark card style (MRDN bg-[#171719] card)
        'bg-[#171719] hover:bg-[#1E1E20] text-zinc-100 border border-zinc-800 hover:border-zinc-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] rounded-xl':
          variant === 'secondary',

        // Outline = ghost with border
        'border border-zinc-800 hover:border-zinc-600 bg-transparent text-zinc-300 hover:text-zinc-100 rounded-xl':
          variant === 'outline',

        // Ghost = minimal, no border
        'hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 rounded-xl':
          variant === 'ghost',

        // Danger = destructive
        'bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/40 text-rose-400 rounded-xl':
          variant === 'danger',

        // Sizes
        'px-3.5 py-1.5 text-xs gap-1.5': size === 'sm',
        'px-5 py-2 text-sm gap-2': size === 'md',
        'px-7 py-3 text-base gap-2.5': size === 'lg',

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
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">{children}</span>
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
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        className={classes}
        disabled={isLoading || props.disabled}
        {...(props as any)}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
