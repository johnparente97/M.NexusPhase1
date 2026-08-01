import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MessageSquare,
  Layers,
  HardDrive,
  Coins,
} from 'lucide-react';
import { NexusLogoMark } from '../components/common/NexusLogoMark';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const HERO_PROMPTS = [
  {
    id: 'p-1',
    title: 'Analyze Financial Dataset',
    model: 'DeepSeek R1 (Reasoning Model)',
    speed: '240 tok/s',
    cost: '$0.00012',
    response: 'Data processing complete. Cross-referencing 14,200 metrics against x402 settlement ledger. Financial health index: 94.2/100.',
  },
  {
    id: 'p-2',
    title: 'Orchestrate Multi-Step Workflow',
    model: 'Dolphin 8x7B (Inference Engine)',
    speed: '310 tok/s',
    cost: '$0.00008',
    response: 'Autonomous workflow deployed. 3 execution nodes verified: Web Retrieval -> Entity Extraction -> Vector Memory Index.',
  },
  {
    id: 'p-3',
    title: 'Verify Cloud Encryption & Durability',
    model: 'Nexus Storage Guard',
    speed: 'Instant',
    cost: 'Free ($0.00)',
    response: 'Filecoin 10x proof verified. Client-side AES-256-GCM encryption valid. Durability rating: 99.999999999%.',
  },
];

const SUITE_PILLARS = [
  {
    icon: MessageSquare,
    title: 'Use AI Models',
    tagline: 'AI Chat & Model Inference',
    description: 'Interact with Dolphin 8x7B, DeepSeek R1, and open-weights models with sub-penny x402 settlement.',
    to: '/chat',
    color: 'from-[#A855F7]/30 to-[#FF007F]/20 border-[#A855F7]/40 text-[#D8B4FE]',
  },
  {
    icon: Layers,
    title: 'Build Workflows',
    tagline: 'Workflow Studio & Agents',
    description: 'Build multi-step AI automations, configure autonomous agent personas, and enforce spending controls.',
    to: '/studio',
    color: 'from-[#00F5D4]/30 to-[#3B82F6]/20 border-[#00F5D4]/40 text-[#00F5D4]',
  },
  {
    icon: HardDrive,
    title: 'Nexus Cloud',
    tagline: 'Files, AI Memory & Backups',
    description: 'Store encrypted files, attach vector knowledge bases to agents, and back up PC game saves safely.',
    to: '/cloud',
    color: 'from-[#FF007F]/30 to-[#FFD700]/20 border-[#FF007F]/40 text-[#FF66B2]',
  },
  {
    icon: Coins,
    title: 'Manage & Pay',
    tagline: 'x402 Micropayments & Receipts',
    description: 'Track prepaid balances, inspect verifiable execution receipts, and manage multi-chain agent budgets.',
    to: '/payments',
    color: 'from-[#FFD700]/30 to-[#00F5D4]/20 border-[#FFD700]/40 text-[#FFD700]',
  },
];

const INTEGRATION_PROVIDERS = [
  { name: 'DeepSeek R1', type: 'Reasoning AI Model', status: 'connected' as const },
  { name: 'Dolphin 8x7B Host', type: 'AI Inference Engine', status: 'connected' as const },
  { name: 'Filecoin Network', type: 'Distributed Storage Proof', status: 'connected' as const },
  { name: 'Arweave Blockweave', type: 'Permanent Object Storage', status: 'connected' as const },
  { name: 'Base Sepolia x402', type: 'Micro-settlement Protocol', status: 'live' as const },
  { name: 'Storj DCS Adapter', type: 'Encrypted Cloud Storage', status: 'planned' as const },
  { name: 'AWS S3 Adapter', type: 'Object Cloud Connector', status: 'demo' as const },
  { name: 'Solana SPL Rail', type: 'Payment Settlement Rail', status: 'planned' as const },
];

const DEFAULT_PROMPT = HERO_PROMPTS[0]!;

export default function Landing() {
  const [activePrompt, setActivePrompt] = useState(DEFAULT_PROMPT);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSelectPrompt = (prompt: typeof HERO_PROMPTS[0]) => {
    setIsSimulating(true);
    setActivePrompt(prompt);
    setTimeout(() => setIsSimulating(false), 400);
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full select-none overflow-hidden bg-[var(--nx-bg)]">
      
      {/* ── HERO SECTION ── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Prismatic Ambient Backdrop Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-gradient-to-tr from-[#A855F7]/20 via-[#00F5D4]/15 to-[#FF007F]/20 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" />

        {/* Left Column: Headline & Value Prop */}
        <div className="space-y-6 max-w-2xl text-left">
          
          {/* Top Industry Badge */}
          <div className="inline-flex items-center gap-2">
            <TruthStateBadge status="connected" text="Nexus v2.0 • Intelligent Digital Services Workspace" />
          </div>

          {/* Main Title */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
            One platform to <span className="text-prismatic">use, build, and orchestrate</span> intelligent digital capabilities.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-[var(--nx-text-secondary)] leading-relaxed font-sans max-w-xl">
            Execute AI models, build autonomous agents, manage zero-knowledge cloud memory, provision GPU compute, and settle micropayments in real-time.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              to="/chat"
              variant="primary"
              size="lg"
              className="font-extrabold shadow-xl"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Launch Workspace
            </Button>

            <Button
              to="/explore"
              variant="cyan"
              size="lg"
              className="font-extrabold"
            >
              Explore Capabilities
            </Button>
          </div>

          {/* Secondary Link */}
          <p className="text-xs text-zinc-500 pt-1 font-mono">
            Looking for developer tools or API keys?{' '}
            <Link to="/developer" className="text-[#00F5D4] hover:underline font-bold">
              Open Developer Console ↗
            </Link>
          </p>
        </div>

        {/* Right Column: Live Interactive Execution Playground */}
        <div className="w-full max-w-lg shrink-0">
          <div className="p-6 rounded-3xl bg-[var(--nx-surface-1)] border border-[#A855F7]/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] space-y-5 relative">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/40 flex items-center justify-center">
                  <NexusLogoMark className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-sm text-white flex items-center gap-1.5">
                    <span>Live Execution Simulator</span>
                  </h3>
                  <span className="text-[10px] text-[#00F5D4] font-mono">Test capabilities in real-time</span>
                </div>
              </div>
              <TruthStateBadge status="live" text="ACTIVE" />
            </div>

            {/* Prompt Selector Pills */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-bold block uppercase tracking-wider font-mono">Select Sample Action:</span>
              <div className="grid grid-cols-1 gap-2">
                {HERO_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handleSelectPrompt(prompt)}
                    className={cn(
                      'p-3 rounded-xl text-xs text-left transition-all cursor-pointer flex items-center justify-between border font-mono',
                      activePrompt.id === prompt.id
                        ? 'bg-[#A855F7]/20 border-[#A855F7] text-white font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-[var(--nx-bg)] border-white/[0.06] text-zinc-400 hover:text-white hover:border-[#00F5D4]/40'
                    )}
                  >
                    <span className="truncate">{prompt.title}</span>
                    <span className="text-[10px] text-[#00F5D4] shrink-0 ml-2 font-bold">{prompt.model}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Output Area */}
            <div className="p-4 rounded-2xl bg-[var(--nx-bg)] border border-white/[0.08] space-y-3 min-h-[130px] flex flex-col justify-between shadow-inner">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[10px] text-zinc-500 border-b border-white/[0.06] pb-1.5">
                  <span>Model Engine: <strong className="text-[#D8B4FE]">{activePrompt.model}</strong></span>
                  <span>Speed: <strong className="text-[#00F5D4]">{activePrompt.speed}</strong></span>
                </div>
                <p className={cn('text-zinc-200 text-[11px] leading-relaxed pt-1', isSimulating && 'animate-pulse text-[#00F5D4]')}>
                  {isSimulating ? 'Synthesizing response and x402 settlement proof...' : activePrompt.response}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/[0.06] pt-2 text-zinc-400">
                <span>x402 Micropayment Proof:</span>
                <span className="text-[#00F5D4] font-bold">{activePrompt.cost}</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── SUITE LAUNCHER GRID (4 WORKSPACE PILLARS) ── */}
      <section className="w-full bg-[var(--nx-bg-subtle)] border-y border-white/[0.08] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Four Core <span className="text-prismatic">Product Workspaces</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Nexus structures full digital capabilities into task-focused workspaces engineered for high-performance productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUITE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.title}
                  to={pillar.to}
                  className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] hover:border-[#00F5D4]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_0_30px_rgba(0,245,212,0.15)]"
                >
                  <div className="space-y-4">
                    <div className={cn('h-12 w-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-md', pillar.color)}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#00F5D4] tracking-wider">{pillar.tagline}</span>
                      <h3 className="font-display font-extrabold text-lg text-white group-hover:text-prismatic transition-all flex items-center justify-between">
                        <span>{pillar.title}</span>
                        <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#00F5D4] group-hover:translate-x-1 transition-all" />
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#00F5D4] group-hover:text-white flex items-center gap-1 pt-2 border-t border-white/[0.06] font-mono">
                    Launch Workspace ↗
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── ECOSYSTEM & INTEGRATIONS STRIP ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Ecosystem & Infrastructure Registry
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Real-time telemetry and verified status for all connected models, storage networks, and payment rails.
            </p>
          </div>

          <Button to="/integrations" variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            View Full Registry
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {INTEGRATION_PROVIDERS.map((item) => (
            <div key={item.name} className="p-4 rounded-xl bg-[var(--nx-surface-1)] border border-white/[0.08] flex items-center justify-between gap-3 hover:border-[#A855F7]/40 transition-colors">
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                <p className="text-[10px] text-zinc-500 font-mono">{item.type}</p>
              </div>
              <TruthStateBadge status={item.status} />
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
