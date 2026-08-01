import React from 'react';
import { cn } from '../../utils/cn';

export type TruthState = 'live' | 'connected' | 'demo' | 'planned' | 'external' | 'unavailable';

export interface TruthStateBadgeProps {
  status: TruthState;
  className?: string;
  label?: string;
  text?: string;
}

const statusConfig: Record<TruthState, { defaultLabel: string; className: string }> = {
  live: {
    defaultLabel: 'Live',
    className: 'bg-[#00F5D4]/10 text-[#00F5D4] border-[#00F5D4]/30 shadow-[0_0_10px_rgba(0,245,212,0.2)]'
  },
  connected: {
    defaultLabel: 'Connected',
    className: 'bg-[#00F5D4]/10 text-[#00F5D4] border-[#00F5D4]/30 shadow-[0_0_10px_rgba(0,245,212,0.2)]'
  },
  demo: {
    defaultLabel: 'Demo Sandbox',
    className: 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/30 shadow-[0_0_10px_rgba(255,215,0,0.2)]'
  },
  planned: {
    defaultLabel: 'Planned Sigil',
    className: 'bg-[#A855F7]/10 text-[#D8B4FE] border-[#A855F7]/30 shadow-[0_0_10px_rgba(168,85,247,0.2)]'
  },
  external: {
    defaultLabel: 'External Protocol',
    className: 'bg-[#FF007F]/10 text-[#FF66B2] border-[#FF007F]/30 shadow-[0_0_10px_rgba(255,0,127,0.2)]'
  },
  unavailable: {
    defaultLabel: 'Unavailable',
    className: 'bg-zinc-800/40 text-zinc-400 border-zinc-700/40'
  }
};

export function TruthStateBadge({ status, className, label, text }: TruthStateBadgeProps) {
  const config = statusConfig[status];
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
        {(status === 'live' || status === 'connected' || status === 'demo') && (
          <span className="relative flex h-1.5 w-1.5">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              status === 'demo' ? 'bg-[#FFD700]' : 'bg-[#00F5D4]'
            )} />
            <span className={cn(
              "relative inline-flex rounded-full h-1.5 w-1.5",
              status === 'demo' ? 'bg-[#FFD700]' : 'bg-[#00F5D4]'
            )} />
          </span>
        )}
        {displayText}
      </span>
    </div>
  );
}
