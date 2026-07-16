import React, { useEffect, useState } from 'react';
import { EXECUTION_STEPS } from '@meridian-nexus/shared-types';
import { Loader2, CheckCircle2, Clock, Play } from 'lucide-react';
import { Progress } from '../ui/Progress';

export interface ExecutionProgressProps {
  runStatus: 'running' | 'completed' | 'failed';
  estimatedDuration: number;
}

export const ExecutionProgress: React.FC<ExecutionProgressProps> = ({ runStatus, estimatedDuration }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (runStatus !== 'running') return;

    // Simulate step progress increments over the estimatedDuration (in seconds)
    const stepDuration = (estimatedDuration * 1000) / EXECUTION_STEPS.length;

    const interval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < EXECUTION_STEPS.length - 1) {
          const next = prev + 1;
          setPercentage(Math.floor((next / EXECUTION_STEPS.length) * 100));
          return next;
        }
        clearInterval(interval);
        return prev;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [runStatus, estimatedDuration]);

  return (
    <div className="flex flex-col items-center justify-center p-8 max-w-md w-full gap-6 select-none">
      
      {/* Active Header Spinner */}
      <div className="relative h-14 w-14 flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-indigo-500 animate-spin" />
        <Clock className="absolute h-4 w-4 text-zinc-500" />
      </div>

      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="font-semibold text-sm text-zinc-200">Executing intelligent agents...</h3>
        <p className="text-[11px] text-zinc-500 max-w-[240px] leading-normal">
          This run takes approximately {estimatedDuration} seconds to complete reasoning tasks.
        </p>
      </div>

      {/* Progress slider bar */}
      <div className="w-full flex flex-col gap-2">
        <Progress value={percentage} />
        <div className="flex justify-between text-[9px] font-bold text-zinc-500">
          <span>RUNNING OPERATIONS</span>
          <span>{percentage}%</span>
        </div>
      </div>

      {/* Steps List */}
      <div className="w-full flex flex-col gap-3 border border-zinc-800 bg-zinc-950/60 p-4 rounded-xl text-xs">
        {EXECUTION_STEPS.map((step, idx) => {
          const isPending = idx > currentStepIdx;
          const isActive = idx === currentStepIdx;
          const isCompleted = idx < currentStepIdx;

          return (
            <div
              key={step.key}
              className={`flex items-center justify-between border-b border-zinc-900/50 pb-2 last:border-0 last:pb-0 transition-opacity duration-200 ${
                isPending ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <span className={`font-medium ${isActive ? 'text-indigo-400 font-bold' : 'text-zinc-400'}`}>
                {step.label}
              </span>
              
              <span className="shrink-0">
                {isCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                {isActive && <Loader2 className="h-4 w-4 text-indigo-500 animate-spin" />}
                {isPending && <Clock className="h-4 w-4 text-zinc-600" />}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
};
export default ExecutionProgress;
