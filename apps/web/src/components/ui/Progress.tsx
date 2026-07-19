import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressProps {
  value: number; // 0 to 100
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({ value, className }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full h-2 bg-zinc-800 rounded-full overflow-hidden border border-zinc-800/50', className)}>
      <div
        className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
};
