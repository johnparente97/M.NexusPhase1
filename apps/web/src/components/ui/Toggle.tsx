import React from 'react';
import { cn } from '../../utils/cn';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, disabled = false, className }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none bg-zinc-800',
        {
          'bg-emerald-600': checked,
        },
        className
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-zinc-100 shadow-sm ring-0 transition duration-200 ease-in-out',
          {
            'translate-x-4': checked,
            'translate-x-0': !checked,
          }
        )}
      />
    </button>
  );
};
export default Toggle;
