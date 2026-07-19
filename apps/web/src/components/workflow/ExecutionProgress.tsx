import React, { useState, useEffect } from 'react';
import { WorkflowRunStep } from '@meridian-nexus/shared-types';
import { Loader2, CheckCircle2, Clock, AlertCircle, ShieldCheck, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { Progress } from '../ui/Progress';
import { motion } from 'framer-motion';

export interface ExecutionProgressProps {
  runStatus: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  estimatedDuration: number;
  steps?: WorkflowRunStep[];
}

export const ExecutionProgress: React.FC<ExecutionProgressProps> = ({
  runStatus,
  estimatedDuration,
  steps = [],
}) => {
  // Default animated steps if steps array is empty
  const defaultSteps = [
    { label: 'Understanding request intent & scope...', status: 'completed' },
    { label: 'Planning execution graph & provider selection...', status: runStatus === 'pending' ? 'pending' : 'completed' },
    { label: 'Verifying x402 payment authorization on Base Sepolia...', status: runStatus === 'completed' ? 'completed' : 'running' },
    { label: 'Calling Gemini 2.5 Flash specialist model adapter...', status: runStatus === 'completed' ? 'completed' : 'pending' },
    { label: 'Validating output against Trust Policy schemas...', status: runStatus === 'completed' ? 'completed' : 'pending' },
    { label: 'Generating machine-readable outcome receipt & MRDN cashback...', status: runStatus === 'completed' ? 'completed' : 'pending' },
  ];

  const activeStepList = steps.length > 0 ? steps : (defaultSteps as any);
  const completedCount = activeStepList.filter((s: any) => s.status === 'completed').length;
  const activeCount = activeStepList.filter((s: any) => s.status === 'running').length;
  const totalSteps = activeStepList.length;
  const percentage = runStatus === 'completed' ? 100 : Math.round(((completedCount + activeCount * 0.5) / totalSteps) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-6 max-w-lg w-full gap-6 select-none my-auto">
      {/* Active Header Icon */}
      <div className="relative h-16 w-16 flex items-center justify-center">
        {runStatus === 'failed' ? (
          <AlertCircle className="h-12 w-12 text-rose-500" />
        ) : runStatus === 'completed' ? (
          <CheckCircle2 className="h-12 w-12 text-[#27F293]" />
        ) : (
          <div className="relative flex items-center justify-center">
            <Loader2 className="h-12 w-12 text-[#27F293] animate-spin" />
            <Terminal className="absolute h-5 w-5 text-zinc-400" />
          </div>
        )}
      </div>

      {/* Main Execution Title */}
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="font-display font-bold text-base text-zinc-100">
          {runStatus === 'failed'
            ? 'Execution Aborted'
            : runStatus === 'completed'
            ? 'Outcome Synthesis Complete'
            : 'Executing Capability Graph...'}
        </h3>
        <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
          {runStatus === 'failed'
            ? 'One or more agent reasoning steps encountered an error.'
            : runStatus === 'completed'
            ? 'All intelligence steps validated and settled via x402.'
            : `Vercel-style live telemetry tracing (~${estimatedDuration}s expected runtime)`}
        </p>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full flex flex-col gap-2">
        <Progress value={percentage} className={runStatus === 'failed' ? 'bg-rose-500/20' : ''} />
        <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-500">
          <span>{runStatus === 'failed' ? 'RUN FAILED' : 'TELEMETRY PROGRESS'}</span>
          <span className="text-[#27F293]">{percentage}%</span>
        </div>
      </div>

      {/* Vercel-style Live Execution Step Log */}
      <div className="w-full flex flex-col gap-2.5 bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-xs font-mono">
        {activeStepList.map((step: any, idx: number) => {
          const isDone = step.status === 'completed';
          const isRunning = step.status === 'running';

          return (
            <div
              key={idx}
              className={`flex items-center justify-between gap-3 border-b border-zinc-900/60 pb-2 last:border-0 last:pb-0 ${
                step.status === 'pending' ? 'opacity-30' : 'opacity-100'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-zinc-600 text-[10px]">[{idx + 1}]</span>
                <span className={isDone ? 'text-zinc-300' : isRunning ? 'text-[#27F293] font-bold' : 'text-zinc-500'}>
                  {step.label || step.stepKey}
                </span>
              </div>

              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#27F293]" />
                ) : isRunning ? (
                  <Loader2 className="h-3.5 w-3.5 text-[#27F293] animate-spin" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-zinc-700" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExecutionProgress;
