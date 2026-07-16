import React from 'react';
import { cn } from '../../utils/cn';

export interface TabOption {
  key: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  options: TabOption[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ options, activeKey, onChange, className }) => {
  return (
    <div className={cn('border-b border-zinc-800 flex gap-6 overflow-x-auto no-scrollbar', className)}>
      {options.map((opt) => {
        const isActive = opt.key === activeKey;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            className={cn(
              'flex items-center gap-2 pb-3.5 text-xs font-semibold text-zinc-400 border-b-2 border-transparent transition-all duration-200 select-none hover:text-zinc-200 whitespace-nowrap',
              {
                'text-indigo-400 border-indigo-500 font-bold': isActive,
              }
            )}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.count !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-zinc-800 text-zinc-400',
                  { 'bg-indigo-500/10 text-indigo-400': isActive }
                )}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
