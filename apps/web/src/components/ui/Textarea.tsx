import React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  description?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, description, ...props }, ref) => {
    const id = React.useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={id} className="text-xs font-semibold text-zinc-300">
            {label} {props.required && <span className="text-rose-500">*</span>}
          </label>
        )}
        <textarea
          id={id}
          ref={ref}
          className={cn(
            'w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 hover:border-zinc-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200 min-h-[100px] resize-y disabled:opacity-50 disabled:cursor-not-allowed',
            {
              'border-rose-500/50 focus:border-rose-500 focus:ring-rose-500': error,
            },
            className
          )}
          {...props}
        />
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

Textarea.displayName = 'Textarea';
