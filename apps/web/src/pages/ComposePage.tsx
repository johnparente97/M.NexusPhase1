import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Bot, Sparkles, Layers, ArrowRight, Code, Sliders, CheckCircle2 } from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';

const STARTER_TEMPLATES = [
  {
    id: 'tmpl-1',
    title: 'Financial Data Summarizer',
    category: 'Market Intelligence',
    description: 'Retrieves quarterly SEC filings, extracts financial metrics via DeepSeek R1, and renders structured charts.',
    estimatedCost: '$0.00050 / run',
    executionNodes: 3,
    route: '/studio/new?template=financial-summarizer',
  },
  {
    id: 'tmpl-2',
    title: 'Multi-Agent Web Scraper & Indexer',
    category: 'Data Ingestion',
    description: 'Scrapes domain endpoints, extracts key entities using Dolphin 8x7B, and stores vector embeddings in Arweave.',
    estimatedCost: '$0.00020 / run',
    executionNodes: 4,
    route: '/studio/new?template=web-scraper',
  },
  {
    id: 'tmpl-3',
    title: 'Encrypted Cloud Backup Robot',
    category: 'Storage & Security',
    description: 'Encrypts client files locally with AES-256-GCM and backs up data across Filecoin 10x testnet nodes.',
    estimatedCost: 'Free ($0.00)',
    executionNodes: 2,
    route: '/studio/new?template=cloud-backup',
  },
];

export default function ComposePage() {
  const [mode, setMode] = useState<'guided' | 'advanced'>('guided');
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--nx-border)] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Compose <span className="text-prismatic">Studio & Agents</span>
            </h1>
            <TruthStateBadge status="production" text="Engine Ready" />
          </div>
          <p className="text-xs sm:text-sm text-[var(--nx-text-secondary)] mt-1">
            Build autonomous AI agents, multi-step workflow graphs, and automated data pipelines under spending caps.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-[var(--nx-surface-1)] border border-[var(--nx-border)] p-1 rounded-xl">
          <button
            onClick={() => setMode('guided')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              mode === 'guided' ? 'bg-[#00F5D4] text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Guided Mode
          </button>
          <button
            onClick={() => setMode('advanced')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              mode === 'advanced' ? 'bg-[#A855F7] text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Advanced Studio
          </button>
        </div>
      </div>

      {mode === 'guided' ? (
        /* ── Guided Creation Mode ── */
        <div className="space-y-8">
          
          <div className="p-8 rounded-3xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] space-y-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00F5D4]">
                <Sparkles className="h-4 w-4" />
                <span>Outcome-First Guided Creation</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl text-white">What would you like to build?</h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Select a verified template below to configure your model preferences, set spending budgets, and deploy your workflow in seconds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button to="/studio/new" variant="primary" size="md" leftIcon={<Terminal className="h-4 w-4" />}>
                Open Blank Studio Canvas
              </Button>
              <Button to="/agents/new" variant="cyan" size="md" leftIcon={<Bot className="h-4 w-4" />}>
                Configure New AI Agent
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-extrabold text-xl text-white">Verified Starter Templates</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {STARTER_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => navigate(tmpl.route)}
                  className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] hover:border-[#00F5D4]/50 transition-all flex flex-col justify-between space-y-4 shadow-lg cursor-pointer"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#00F5D4]">{tmpl.category}</span>
                    <h4 className="font-display font-extrabold text-base text-white group-hover:text-prismatic transition-all">
                      {tmpl.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">{tmpl.description}</p>
                  </div>

                  <div className="pt-4 border-t border-[var(--nx-border)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#00F5D4] font-bold">{tmpl.estimatedCost}</span>
                    <span className="text-white group-hover:text-[#00F5D4] flex items-center gap-1 font-bold">
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
            <Terminal className="h-12 w-12 text-[#A855F7] mx-auto" />
            <h2 className="font-display font-extrabold text-xl text-white">Advanced Visual Graph Studio</h2>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">
              Drag-and-drop nodes for AI inference, conditional logic, Web3 micropayments, Filecoin storage, and human approval steps.
            </p>
            <Button to="/studio/new" variant="primary" size="md" leftIcon={<Terminal className="h-4 w-4" />}>
              Launch Studio Canvas Editor ↗
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}
