import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'secondary', size = 'md', isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref as any}
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 500, damping: 18 }}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#27F293]/50 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer',
          {
            // Variants
            'bg-[#27F293] hover:bg-[#1fe285] text-zinc-950 font-semibold shadow-[0_4px_20px_0_rgba(39,242,147,0.18),inset_0_1px_0_0_rgba(255,255,255,0.4)] border border-[#27F293]/20 rounded-full':
              variant === 'primary',
            'bg-[#1E1E20] hover:bg-[#252528] text-zinc-100 border border-zinc-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] rounded-lg': 
              variant === 'secondary',
            'border border-zinc-800 hover:border-zinc-700 bg-transparent text-zinc-300 hover:text-zinc-100 rounded-lg': 
              variant === 'outline',
            'hover:bg-zinc-900/40 text-zinc-400 hover:text-zinc-100 rounded-lg': 
              variant === 'ghost',
            'bg-rose-950/20 border border-rose-900/30 hover:bg-rose-950/40 text-rose-400 rounded-lg': 
              variant === 'danger',
            
            // Sizes
            'px-3.5 py-1.5 text-xs gap-1.5': size === 'sm',
            'px-5 py-2 text-sm gap-2': size === 'md',
            'px-7 py-3 text-base gap-2.5': size === 'lg',
            
            // Loading
            'relative !text-transparent pointer-events-none': isLoading,
          },
          className
        )}
        disabled={isLoading || props.disabled}
        {...(props as any)}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-4 w-4 text-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
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
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
