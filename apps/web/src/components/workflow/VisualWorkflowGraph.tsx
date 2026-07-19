import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Workflow, WorkflowRunStep } from '@meridian-nexus/shared-types';
import { Sparkles, ShieldCheck, Zap, CreditCard, Cpu, ArrowRight, CheckCircle2, Clock, Play } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/format';

export interface VisualWorkflowGraphProps {
  workflow: Workflow;
  steps?: WorkflowRunStep[];
  activeStepIndex?: number;
  onNodeClick?: (nodeId: string) => void;
}

export const VisualWorkflowGraph: React.FC<VisualWorkflowGraphProps> = ({
  workflow,
  steps = [],
  activeStepIndex,
  onNodeClick,
}) => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Default graph nodes if no explicit execution steps are provided
  const nodes = [
    {
      id: 'node-input',
      title: 'Context & Input',
      type: 'Ingestion',
      provider: 'Nexus Gateway',
      latency: '12ms',
      cost: 'Free',
      icon: Sparkles,
      status: activeStepIndex !== undefined ? (activeStepIndex >= 0 ? 'completed' : 'pending') : 'completed',
      description: 'Ingests user parameters, uploaded assets, and environment constraints.',
    },
    {
      id: 'node-model',
      title: 'Specialist Reasoning',
      type: 'LLM Provider',
      provider: 'Gemini 2.5 Flash',
      latency: '420ms',
      cost: formatCurrency(workflow.pricePerRun * 0.7),
      icon: Cpu,
      status: activeStepIndex !== undefined ? (activeStepIndex > 1 ? 'completed' : activeStepIndex === 1 ? 'running' : 'pending') : 'completed',
      description: 'Executes primary intelligence task using multi-step prompt chains.',
    },
    {
      id: 'node-trust',
      title: 'Trust & Verification',
      type: 'Validator',
      provider: 'Nexus Trust Engine',
      latency: '45ms',
      cost: 'Included',
      icon: ShieldCheck,
      status: activeStepIndex !== undefined ? (activeStepIndex > 3 ? 'completed' : activeStepIndex === 3 ? 'running' : 'pending') : 'completed',
      description: 'Runs schema validation, output quality check, and policy compliance.',
    },
    {
      id: 'node-[#27F293]',
      title: 'x402 Settlement',
      type: 'Payment Rail',
      provider: 'Meridian Base Rail',
      latency: '180ms',
      cost: formatCurrency(workflow.pricePerRun * 0.3),
      icon: CreditCard,
      status: activeStepIndex !== undefined ? (activeStepIndex > 4 ? 'completed' : activeStepIndex === 4 ? 'running' : 'pending') : 'completed',
      description: 'Authorizes EIP-3009 payment and calculates MRDN cashback allocation.',
    },
    {
      id: 'node-output',
      title: 'Outcome Synthesis',
      type: 'Delivery',
      provider: 'Synthesis Engine',
      latency: '24ms',
      cost: 'Included',
      icon: Zap,
      status: activeStepIndex !== undefined ? (activeStepIndex >= 5 ? 'completed' : 'pending') : 'completed',
      description: 'Packages structured reports, artifacts, and machine-readable receipts.',
    },
  ];

  const handleSelectNode = (id: string) => {
    setSelectedNode(id);
    if (onNodeClick) onNodeClick(id);
  };

  return (
    <div className="w-full flex flex-col gap-4 bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-5 select-none relative overflow-hidden">
      {/* Visual Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#27F293] animate-pulse" />
          <span className="text-xs font-display font-semibold text-zinc-200 tracking-tight">
            Capability Execution Graph
          </span>
          <Badge variant="outline" className="text-[9px] font-mono text-zinc-400">
            {nodes.length} Nodes
          </Badge>
        </div>
        <span className="text-[10px] text-zinc-500 font-mono">
          Model: {workflow.category.toUpperCase()} • x402 Metered
        </span>
      </div>

      {/* Nodes Graph Chain */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 my-2 overflow-x-auto no-scrollbar py-2">
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isSelected = selectedNode === node.id;
          const isRunning = node.status === 'running';

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelectNode(node.id)}
                className={`flex-1 min-w-[150px] p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 relative ${
                  isSelected
                    ? 'bg-zinc-900 border-[#27F293] shadow-[0_0_20px_rgba(39,242,147,0.15)]'
                    : isRunning
                    ? 'bg-zinc-900/90 border-emerald-500/80 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                    : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                }`}
              >
                {/* Node Status Badge */}
                <div className="flex items-center justify-between gap-1">
                  <div className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                    <Icon className="h-3.5 w-3.5 text-[#27F293]" />
                  </div>
                  {isRunning ? (
                    <span className="text-[9px] font-bold text-emerald-400 animate-pulse flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5 animate-spin" /> ACTIVE
                    </span>
                  ) : node.status === 'completed' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#27F293]" />
                  ) : (
                    <span className="text-[9px] font-mono text-zinc-600">IDLE</span>
                  )}
                </div>

                {/* Node Title & Type */}
                <div className="flex flex-col gap-0.5 mt-1">
                  <span className="text-xs font-semibold text-zinc-100 truncate">{node.title}</span>
                  <span className="text-[9px] font-mono text-zinc-500">{node.provider}</span>
                </div>

                {/* Node Latency & Cost Footer */}
                <div className="flex items-center justify-between text-[9px] font-mono text-zinc-400 border-t border-zinc-800/60 pt-2 mt-1">
                  <span>{node.latency}</span>
                  <span className="font-semibold text-zinc-200">{node.cost}</span>
                </div>
              </motion.div>

              {/* Connecting Connector Arrow */}
              {idx < nodes.length - 1 && (
                <div className="hidden sm:flex items-center justify-center shrink-0 text-zinc-700">
                  <ArrowRight className="h-4 w-4 text-zinc-600" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Selected Node Details Drawer */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 flex flex-col gap-2 text-xs"
        >
          {(() => {
            const current = nodes.find((n) => n.id === selectedNode);
            if (!current) return null;
            return (
              <>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-200 flex items-center gap-1.5">
                    <current.icon className="h-3.5 w-3.5 text-[#27F293]" />
                    {current.title} Details
                  </span>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-[10px] text-zinc-500 hover:text-zinc-300 font-mono"
                  >
                    Close [✕]
                  </button>
                </div>
                <p className="text-[11px] text-zinc-400 leading-normal">{current.description}</p>
                <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 pt-1">
                  <span>Provider: {current.provider}</span>
                  <span>Latency: {current.latency}</span>
                  <span>Cost Share: {current.cost}</span>
                </div>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};

export default VisualWorkflowGraph;
