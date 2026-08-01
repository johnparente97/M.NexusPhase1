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
    className: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  connected: {
    defaultLabel: 'Connected',
    className: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  demo: {
    defaultLabel: 'Demo Mode',
    className: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  },
  planned: {
    defaultLabel: 'Planned',
    className: 'bg-violet-500/10 text-violet-400 border-violet-500/20'
  },
  external: {
    defaultLabel: 'External',
    className: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  },
  unavailable: {
    defaultLabel: 'Unavailable',
    className: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
  }
};

export function TruthStateBadge({ status, className, label, text }: TruthStateBadgeProps) {
  const config = statusConfig[status];
  const displayText = label || text || config.defaultLabel;
  
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        {(status === 'live' || status === 'connected' || status === 'demo') && (
          <span className="relative flex h-1.5 w-1.5">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              status === 'demo' ? 'bg-amber-400' : 'bg-cyan-400'
            )} />
            <span className={cn(
              "relative inline-flex rounded-full h-1.5 w-1.5",
              status === 'demo' ? 'bg-amber-500' : 'bg-cyan-500'
            )} />
          </span>
        )}
        {displayText}
      </span>
    </div>
  );
}
