import React from 'react';
import { cn } from '../../utils/cn';

export type TruthState =
  | 'mock'
  | 'sandbox'
  | 'testnet'
  | 'beta'
  | 'production'
  | 'degraded'
  | 'unavailable'
  // Legacy backward-compatibility aliases
  | 'live'
  | 'connected'
  | 'demo'
  | 'planned'
  | 'external';

export interface TruthStateBadgeProps {
  status: TruthState;
  className?: string;
  label?: string;
  text?: string;
}

const statusConfig: Record<TruthState, { defaultLabel: string; className: string; dotColor?: string }> = {
  production: {
    defaultLabel: 'Production',
    className: 'bg-[#00F5D4]/10 text-[#00F5D4] border-[#00F5D4]/30 shadow-[0_0_10px_rgba(0,245,212,0.2)]',
    dotColor: 'bg-[#00F5D4]',
  },
  beta: {
    defaultLabel: 'Beta',
    className: 'bg-[#A855F7]/10 text-[#D8B4FE] border-[#A855F7]/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    dotColor: 'bg-[#A855F7]',
  },
  testnet: {
    defaultLabel: 'Testnet',
    className: 'bg-[#0284C7]/10 text-[#38BDF8] border-[#0284C7]/30 shadow-[0_0_10px_rgba(2,132,199,0.2)]',
    dotColor: 'bg-[#38BDF8]',
  },
  sandbox: {
    defaultLabel: 'Sandbox',
    className: 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 shadow-[0_0_10px_rgba(255,215,0,0.2)]',
    dotColor: 'bg-[#FFD700]',
  },
  mock: {
    defaultLabel: 'Mock / Demo',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    dotColor: 'bg-amber-400',
  },
  degraded: {
    defaultLabel: 'Degraded',
    className: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    dotColor: 'bg-rose-400',
  },
  unavailable: {
    defaultLabel: 'Unavailable',
    className: 'bg-zinc-800/40 text-zinc-400 border-zinc-700/40',
  },
  // Backward compatibility mappings
  live: {
    defaultLabel: 'Production',
    className: 'bg-[#00F5D4]/10 text-[#00F5D4] border-[#00F5D4]/30 shadow-[0_0_10px_rgba(0,245,212,0.2)]',
    dotColor: 'bg-[#00F5D4]',
  },
  connected: {
    defaultLabel: 'Connected',
    className: 'bg-[#00F5D4]/10 text-[#00F5D4] border-[#00F5D4]/30 shadow-[0_0_10px_rgba(0,245,212,0.2)]',
    dotColor: 'bg-[#00F5D4]',
  },
  demo: {
    defaultLabel: 'Sandbox',
    className: 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 shadow-[0_0_10px_rgba(255,215,0,0.2)]',
    dotColor: 'bg-[#FFD700]',
  },
  planned: {
    defaultLabel: 'Planned',
    className: 'bg-[#A855F7]/10 text-[#D8B4FE] border-[#A855F7]/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    dotColor: 'bg-[#A855F7]',
  },
  external: {
    defaultLabel: 'External Protocol',
    className: 'bg-[#FF007F]/10 text-[#FF66B2] border-[#FF007F]/30 shadow-[0_0_10px_rgba(255,0,127,0.2)]',
    dotColor: 'bg-[#FF007F]',
  },
};

export function TruthStateBadge({ status, className, label, text }: TruthStateBadgeProps) {
  const config = statusConfig[status] || statusConfig.sandbox;
  const displayText = label || text || config.defaultLabel;
  
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border backdrop-blur-md select-none",
        config.className,
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        {config.dotColor && (
          <span className="relative flex h-1.5 w-1.5">
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", config.dotColor)} />
            <span className={cn("relative inline-flex rounded-full h-1.5 w-1.5", config.dotColor)} />
          </span>
        )}
        {displayText}
      </span>
    </div>
  );
}
