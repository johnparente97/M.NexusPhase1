import React from 'react';
import WorkflowCard from './WorkflowCard';
import { Workflow } from '@meridian-nexus/shared-types';
import { Skeleton } from '../ui/Skeleton';
import { useFavorites } from '../../hooks/useFavorites';

export interface WorkflowGridProps {
  workflows?: Workflow[];
  isLoading?: boolean;
}

export const WorkflowGrid: React.FC<WorkflowGridProps> = ({ workflows, isLoading }) => {
  const { data: favorites } = useFavorites();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex flex-col h-[200px] border border-zinc-800 bg-zinc-900/50 rounded-xl p-5 gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-12 w-full" />
            <div className="mt-auto flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {workflows?.map((w) => {
        const isFav = favorites?.some((f) => f.id === w.id) ?? false;
        return <WorkflowCard key={w.id} workflow={w} isFavorited={isFav} />;
      })}
    </div>
  );
};
export default WorkflowGrid;
