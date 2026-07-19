import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, description, icon, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-zinc-300">
            {label} {props.required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">
              {icon}
            </span>
          )}
          <input
            id={id}
            ref={ref}
            type={type}
            className={cn(
              'w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 hover:border-zinc-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
              {
                'pl-10': icon,
                'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500': error,
              },
              className
            )}
            {...props}
          />
        </div>
        {description && !error && (
          <p className="text-[11px] text-zinc-500">{description}</p>
        )}
        {error && (
          <p className="text-[11px] text-rose-400 font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
