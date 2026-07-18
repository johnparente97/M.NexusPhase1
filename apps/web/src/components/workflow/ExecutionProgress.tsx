import React from 'react';
import { WorkflowRunStep } from '@meridian-nexus/shared-types';
import { Loader2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Progress } from '../ui/Progress';

export interface ExecutionProgressProps {
  runStatus: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  estimatedDuration: number;
  steps?: WorkflowRunStep[];
}

export const ExecutionProgress: React.FC<ExecutionProgressProps> = ({ runStatus, estimatedDuration, steps = [] }) => {
  // Calculate percentage based on completed steps
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const activeCount = steps.filter(s => s.status === 'running').length;
  const totalSteps = steps.length || 8;
  const percentage = Math.round(((completedCount + (activeCount * 0.5)) / totalSteps) * 100);

  const getStepStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'running':
        return <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      default:
        return <Clock className="h-4 w-4 text-zinc-600" />;
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-zinc-200 font-semibold';
      case 'running':
        return 'text-indigo-400 font-bold';
      case 'failed':
        return 'text-rose-400 font-bold';
      default:
        return 'text-zinc-500 font-medium';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md w-full gap-6 select-none">
      
      {/* Active Header Spinner */}
      <div className="relative h-14 w-14 flex items-center justify-center">
        {runStatus === 'failed' ? (
          <AlertCircle className="h-10 w-10 text-rose-500" />
        ) : runStatus === 'completed' ? (
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        ) : (
          <>
            <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
            <Clock className="absolute h-4 w-4 text-zinc-500" />
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="font-semibold text-sm text-zinc-200">
          {runStatus === 'failed'
            ? 'Execution Failed'
            : runStatus === 'completed'
            ? 'Execution Completed'
            : 'Executing intelligent agents...'}
        </h3>
        <p className="text-[11px] text-zinc-500 max-w-[240px] leading-normal">
          {runStatus === 'failed'
            ? 'One or more agent reasoning steps encountered an error. Please try again.'
            : runStatus === 'completed'
            ? 'Result successfully compiled and saved.'
            : `This run takes approximately ${estimatedDuration} seconds to complete reasoning tasks.`}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full flex flex-col gap-2">
        <Progress value={percentage} className={runStatus === 'failed' ? 'bg-rose-500/20' : ''} />
        <div className="flex justify-between text-[9px] font-bold text-zinc-500">
          <span>{runStatus === 'failed' ? 'RUN ABORTED' : 'RUNNING OPERATIONS'}</span>
          <span>{percentage}%</span>
        </div>
      </div>

      {/* Steps List */}
      {steps && steps.length > 0 && (
        <div className="w-full flex flex-col gap-3 border border-zinc-800 bg-zinc-950/60 p-4 rounded-xl text-xs">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex items-center justify-between border-b border-zinc-900/50 pb-2 last:border-0 last:pb-0 transition-opacity duration-200 ${
                step.status === 'pending' ? 'opacity-35' : 'opacity-100'
              }`}
            >
              <span className={getStepStatusColor(step.status)}>
                {step.label}
              </span>
              
              <span className="shrink-0">
                {getStepStatusIcon(step.status)}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
export default ExecutionProgress;
