import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Shield, CheckCircle, ArrowRight, Play, Coins, Activity, FileText, Code, Sparkles, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { TruthStateBadge } from '../common/TruthStateBadge';

export interface AgentDetailModalProps {
  agent: {
    id: string;
    title: string;
    category: string;
    description: string;
    creator: string;
    version: string;
    pricing: string;
    maturity: 'production' | 'beta' | 'demo';
    permissions: string[];
    exampleInput: string;
    exampleOutput: string;
    evidence: {
      totalRuns: number;
      completionRate: string;
      refundRate: string;
      repeatUsers: number;
    };
    route: string;
  } | null;
  onClose: () => void;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agent, onClose }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'overview' | 'explanation' | 'evidence'>('overview');

  if (!agent) return null;

  return (
    <div className="fixed inset-0 z-layer-modal flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[var(--nx-surface-1)] border border-[#6366F1]/40 rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[var(--nx-border)] pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center text-[#06B6D4]">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-lg text-white">{agent.title}</h2>
                <TruthStateBadge status={agent.maturity} />
              </div>
              <span className="text-xs text-zinc-400 font-mono">v{agent.version} by {agent.creator}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[var(--nx-border)] pb-2 text-xs font-mono">
          <button
            onClick={() => setTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'overview' ? 'bg-[#6366F1] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setTab('explanation')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'explanation' ? 'bg-[#6366F1] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            How it Works
          </button>
          <button
            onClick={() => setTab('evidence')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              tab === 'evidence' ? 'bg-[#6366F1] text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Evidence & Reliability
          </button>
        </div>

        {/* Tab Content */}
        {tab === 'overview' && (
          <div className="space-y-4 text-xs font-sans">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Outcome Statement</span>
              <p className="text-zinc-200 leading-relaxed">{agent.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[var(--nx-bg-subtle)] p-3 rounded-xl border border-[var(--nx-border)] space-y-1">
                <span className="text-[10px] font-mono text-[#06B6D4] uppercase font-bold">Example Input</span>
                <p className="text-zinc-300 font-mono text-[11px]">{agent.exampleInput}</p>
              </div>

              <div className="bg-[var(--nx-bg-subtle)] p-3 rounded-xl border border-[var(--nx-border)] space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Example Output</span>
                <p className="text-zinc-300 font-mono text-[11px]">{agent.exampleOutput}</p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Permissions Needed</span>
              <div className="flex flex-wrap gap-2">
                {agent.permissions.map((perm, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--nx-surface-2)] border border-[var(--nx-border)] text-zinc-300 text-[11px]">
                    <CheckCircle className="h-3 w-3 text-[#06B6D4]" />
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'explanation' && (
          <div className="space-y-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-[var(--nx-bg-subtle)] border border-[var(--nx-border)] space-y-2">
              <span className="text-[#06B6D4] font-bold block text-sm">Understand → Process → Act → Deliver</span>
              <p className="text-zinc-300 leading-relaxed">
                This agent analyzes your inputs, executes necessary tool calls using verified provider adapters, formats structured JSON data, and validates outputs before settlement.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Architecture Specs</span>
              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg bg-[var(--nx-surface-2)] border border-[var(--nx-border)]">
                  <span className="text-zinc-400 block">Model Strategy</span>
                  <span className="text-white font-bold">Gemini 2.5 Flash + Fallback</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[var(--nx-surface-2)] border border-[var(--nx-border)]">
                  <span className="text-zinc-400 block">Execution Engine</span>
                  <span className="text-white font-bold">Cloudflare Workflows</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'evidence' && (
          <div className="space-y-4 text-xs font-sans">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3 rounded-xl bg-[var(--nx-bg-subtle)] border border-[var(--nx-border)] text-center space-y-1">
                <span className="text-[10px] text-zinc-500 block">Observed Runs</span>
                <span className="text-white font-bold text-base">{agent.evidence.totalRuns}</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--nx-bg-subtle)] border border-[var(--nx-border)] text-center space-y-1">
                <span className="text-[10px] text-zinc-500 block">Completion Rate</span>
                <span className="text-emerald-400 font-bold text-base">{agent.evidence.completionRate}</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--nx-bg-subtle)] border border-[var(--nx-border)] text-center space-y-1">
                <span className="text-[10px] text-zinc-500 block">Refund Rate</span>
                <span className="text-amber-400 font-bold text-base">{agent.evidence.refundRate}</span>
              </div>
              <div className="p-3 rounded-xl bg-[var(--nx-bg-subtle)] border border-[var(--nx-border)] text-center space-y-1">
                <span className="text-[10px] text-zinc-500 block">Repeat Users</span>
                <span className="text-[#06B6D4] font-bold text-base">{agent.evidence.repeatUsers}</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 italic">
              Evidence metrics are computed from verified independent execution receipts over the past 30 days.
            </p>
          </div>
        )}

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--nx-border)]">
          <div className="font-mono text-xs">
            <span className="text-zinc-400 block text-[10px]">Price per successful run</span>
            <span className="text-emerald-400 font-bold text-sm">{agent.pricing}</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] font-bold px-6"
              leftIcon={<Play className="h-3.5 w-3.5" />}
              onClick={() => {
                onClose();
                navigate(agent.route);
              }}
            >
              Run Capability
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailModal;
