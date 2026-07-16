import React from 'react';
import { Card } from '../ui/Card';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number; // percentage
    direction: 'up' | 'down';
  };
  className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  icon: Icon,
  title,
  value,
  description,
  trend,
  className,
}) => {
  return (
    <Card className={cn('bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-4 select-none', className)}>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{title}</span>
        <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400">
          <Icon className="h-4.5 w-4.5" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-100 tracking-tight">{value}</h3>
        
        {(description || trend) && (
          <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
            {trend && (
              <span
                className={cn('inline-flex items-center gap-0.5 font-bold', {
                  'text-emerald-400': trend.direction === 'up',
                  'text-rose-400': trend.direction === 'down',
                })}
              >
                {trend.direction === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend.value}%
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </div>
    </Card>
  );
};
export default StatsCard;
