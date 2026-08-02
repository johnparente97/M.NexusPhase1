import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Terminal,
  Bot,
  Sparkles,
  Layers,
  ArrowRight,
  Code,
  ShieldCheck,
  DollarSign,
  FileText,
  Lock,
  Cpu,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';

const STARTER_TEMPLATES = [
  {
    id: 'tmpl-1',
    title: 'Financial Data Summarizer',
    category: 'Market Intelligence',
    description: 'Retrieves quarterly SEC filings, extracts financial metrics via DeepSeek R1, and renders structured charts.',
    estimatedCost: '$0.50 / run',
    executionNodes: 3,
    route: '/studio/new?template=financial-summarizer',
  },
  {
    id: 'tmpl-2',
    title: 'Autonomous Code Auditor',
    category: 'Security & Audit',
    description: 'Scrapes repository files, identifies OWASP vulnerabilities, and drafts PR fix suggestions.',
    estimatedCost: '$1.00 / run',
    executionNodes: 4,
    route: '/studio/new?template=code-auditor',
  },
  {
    id: 'tmpl-3',
    title: 'Document Knowledge Vectorizer',
    category: 'Knowledge Base',
    description: 'Parses PDF documents into vector embeddings stored in R2 for RAG retrieval.',
    estimatedCost: '$0.25 / run',
    executionNodes: 2,
    route: '/studio/new?template=document-vectorizer',
  },
];

export default function ComposePage() {
  const [mode, setMode] = useState<'guided' | 'advanced'>('guided');
  const navigate = useNavigate();

  // Guided Form state for non-technical users
  const [agentGoal, setAgentGoal] = useState('');
  const [costCeiling, setCostCeiling] = useState('1.00');
  const [allowFileAccess, setAllowFileAccess] = useState(true);
  const [selectedModel, setSelectedModel] = useState('claude-3-5-sonnet');

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--nx-border)] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Build <span className="text-prismatic">Agents & Workflows</span>
            </h1>
            <TruthStateBadge status="production" text="Build Suite v2" />
          </div>
          <p className="text-xs sm:text-sm text-[var(--nx-text-secondary)] mt-1">
            Configure agent goals, tool permissions, spending limits, and model routing in plain language.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-[var(--nx-surface-1)] border border-[var(--nx-border)] p-1 rounded-xl">
          <button
            onClick={() => setMode('guided')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              mode === 'guided' ? 'bg-[#6366F1] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Guided Mode
          </button>
          <button
            onClick={() => setMode('advanced')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              mode === 'advanced' ? 'bg-[#818CF8] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Advanced Studio
          </button>
        </div>
      </div>

      {mode === 'guided' ? (
        /* ── Guided Creation Mode (Plain-Language Wizard) ── */
        <div className="space-y-8">
          
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6366F1] font-bold">
                <Sparkles className="h-4 w-4" />
                <span>Plain-Language Agent Builder</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl text-white">1. Describe the outcome you need</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Tell Nexus what your agent should accomplish. We’ll handle model routing, spending caps, and safety bounds.
              </p>
            </div>

            <div className="space-y-4">
              <textarea
                value={agentGoal}
                onChange={(e) => setAgentGoal(e.target.value)}
                placeholder="e.g. Monitor SEC 10-K filings for tech companies, extract key revenue numbers, and alert me if YoY growth exceeds 20%..."
                className="w-full h-28 bg-[var(--nx-bg)] border border-[var(--nx-border)] rounded-2xl p-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#6366F1] transition-all font-sans"
              />

              {/* Disclosed Plain Language Permissions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[var(--nx-bg)] border border-[var(--nx-border)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#6366F1]" /> File Access Disclosure
                    </span>
                    <input
                      type="checkbox"
                      checked={allowFileAccess}
                      onChange={(e) => setAllowFileAccess(e.target.checked)}
                      className="rounded border-zinc-700 text-[#6366F1] focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    "Allow this agent to read files from your selected Workspace folder during runs."
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[var(--nx-bg)] border border-[var(--nx-border)] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-[#00F5D4]" /> Cost Budget Ceiling
                    </span>
                    <span className="text-xs font-mono font-bold text-[#00F5D4]">${costCeiling}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    "Stop this run immediately if underlying provider & tool costs exceed ${costCeiling}."
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  onClick={() => navigate(`/studio/new?goal=${encodeURIComponent(agentGoal)}`)}
                  variant="primary"
                  size="md"
                  className="font-bold shadow-lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Test & Preview Agent
                </Button>
              </div>
            </div>
          </div>

          {/* Starter Templates */}
          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-xl text-white">Or Start From Verified Templates</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STARTER_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => navigate(tmpl.route)}
                  className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] hover:border-[#6366F1]/50 transition-all flex flex-col justify-between space-y-4 shadow-lg cursor-pointer"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#6366F1]">{tmpl.category}</span>
                    <h4 className="font-display font-extrabold text-base text-white group-hover:text-[#818CF8] transition-all">
                      {tmpl.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{tmpl.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[var(--nx-border)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#00F5D4] font-bold">{tmpl.estimatedCost}</span>
                    <span className="text-white group-hover:text-[#818CF8] flex items-center gap-1 font-bold">
                      Use Template <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* ── Advanced Studio Canvas View ── */
        <div className="p-8 rounded-3xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-6 shadow-xl text-center">
          <div className="max-w-md mx-auto space-y-3">
            <Terminal className="h-12 w-12 text-[#6366F1] mx-auto" />
            <h2 className="font-display font-extrabold text-xl text-white">Advanced Visual Node Graph Studio</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Inspect model routing schemas, MCP tool protocols, JSON input/output validation, retries, and x402 financial receipts.
            </p>
            <Button to="/studio/new" variant="primary" size="md" leftIcon={<Terminal className="h-4 w-4" />}>
              Open Studio Canvas Editor ↗
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
