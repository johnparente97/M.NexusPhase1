import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  MessageSquare,
  Cpu,
  Compass,
  Layers,
  Bot,
  Terminal,
  History,
  Coins,
  Shield,
  Zap,
  HardDrive,
  Brain,
  Gamepad2,
  Play,
  CheckCircle2,
  Sparkles,
  Lock,
  Globe,
  Server,
} from 'lucide-react';
import { NexusLogoMark } from '../components/common/NexusLogoMark';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

const HERO_PROMPTS = [
  {
    id: 'p-1',
    title: 'Analyze Financial Dataset',
    model: 'DeepSeek R1 (Reasoning)',
    speed: '184 tok/s',
    cost: '$0.00012',
    response: 'Data synthesis complete. Cross-referencing 14,200 quarterly metrics against x402 settlement ledger. Financial health index: 94.2/100.',
  },
  {
    id: 'p-2',
    title: 'Synthesize Agent Workflow',
    model: 'Dolphin 8x7B (Uncensored)',
    speed: '210 tok/s',
    cost: '$0.00008',
    response: 'Workflow node structure validated. 3 execution steps mapped: Web Retrieval -> Entity Extraction -> Vector Memory Storage.',
  },
  {
    id: 'p-3',
    title: 'Inspect Cloud Durability',
    model: 'Nexus Storage Guard',
    speed: 'Instant',
    cost: 'Free ($0.00)',
    response: 'Filecoin 10x distributed proof verified. AES-256-GCM client-side encryption valid. Durability rating: 99.999999999%.',
  },
];

const SUITE_PILLARS = [
  {
    icon: MessageSquare,
    title: 'Use AI',
    tagline: 'Conversations & Reasoning',
    description: 'Chat with Dolphin 8x7B, DeepSeek R1, and open-weights models with sub-penny x402 settlement.',
    to: '/chat',
    color: 'from-violet-500/20 to-purple-600/10 border-violet-500/30 text-violet-400',
  },
  {
    icon: Layers,
    title: 'Build Workflows',
    tagline: 'Autonomous Studio',
    description: 'Create multi-step AI automations, configure agent personas, and set spending policies.',
    to: '/studio',
    color: 'from-indigo-500/20 to-blue-600/10 border-indigo-500/30 text-indigo-400',
  },
  {
    icon: HardDrive,
    title: 'Nexus Cloud',
    tagline: 'Files & AI Memory',
    description: 'Store files, attach knowledge bases to agents, and back up PC game saves with zero-knowledge keys.',
    to: '/cloud',
    color: 'from-cyan-500/20 to-teal-600/10 border-cyan-500/30 text-cyan-400',
  },
  {
    icon: Coins,
    title: 'Manage & Pay',
    tagline: 'Payments & Receipts',
    description: 'Track prepaid balances, inspect execution receipts, and manage multi-chain agent budgets.',
    to: '/payments',
    color: 'from-emerald-500/20 to-green-600/10 border-emerald-500/30 text-emerald-400',
  },
];

const INTEGRATION_PROVIDERS = [
  { name: 'Dolphin 8x7B Host', type: 'AI Inference', status: 'connected' as const },
  { name: 'DeepSeek R1', type: 'Reasoning AI', status: 'connected' as const },
  { name: 'Filecoin Network', type: 'Storage Proof', status: 'connected' as const },
  { name: 'Arweave Blockweave', type: 'Permanent Cloud', status: 'connected' as const },
  { name: 'Base Sepolia x402', type: 'Micropayments', status: 'live' as const },
  { name: 'Storj DCS', type: 'Encrypted Storage', status: 'planned' as const },
  { name: 'AWS S3 Adapter', type: 'Object Storage', status: 'demo' as const },
  { name: 'Solana SPL Rail', type: 'Settlement', status: 'planned' as const },
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
    <div className="flex-1 flex flex-col items-center w-full select-none overflow-hidden">
      
      {/* ── HERO SECTION ── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 sm:pb-24 flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-violet-600/15 via-indigo-600/10 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Left Column: Headline & Value Prop */}
        <div className="space-y-6 max-w-2xl text-left">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2">
            <TruthStateBadge status="connected" text="Nexus v2.0 • Intelligent Digital Services Platform" />
          </div>

          {/* Main Title */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            One platform to <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">use, build, and orchestrate</span> digital capabilities.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-zinc-400 leading-relaxed font-sans max-w-xl">
            Execute AI models, build autonomous workflows, manage cloud memory, provision compute, and settle micropayments without navigating disconnected platforms.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <Button
              to="/chat"
              variant="primary"
              size="lg"
              className="font-semibold shadow-lg shadow-violet-600/25"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Start Using Nexus
            </Button>

            <Button
              to="/explore"
              variant="secondary"
              size="lg"
              className="font-semibold"
            >
              Explore Capabilities
            </Button>
          </div>

          {/* Secondary Link */}
          <p className="text-xs text-zinc-500 pt-1">
            Looking for developer tools or provider listing docs?{' '}
            <Link to="/developer" className="text-violet-400 hover:text-violet-300 underline font-medium">
              Open Developer Console ↗
            </Link>
          </p>
        </div>

        {/* Right Column: Live Interactive Execution Playground */}
        <div className="w-full max-w-lg shrink-0">
          <div className="p-6 rounded-3xl bg-[#14141E]/90 border border-violet-500/30 backdrop-blur-xl shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <NexusLogoMark className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">Live Execution Simulator</h3>
                  <span className="text-[10px] text-zinc-400 font-mono">Test capabilities in real-time</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                ● Interactive
              </span>
            </div>

            {/* Prompt Selector Pills */}
            <div className="space-y-2">
              <span className="text-[11px] text-zinc-400 font-semibold block uppercase tracking-wider">Select Sample Action:</span>
              <div className="grid grid-cols-1 gap-2">
                {HERO_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.id}
                    onClick={() => handleSelectPrompt(prompt)}
                    className={cn(
                      'p-2.5 rounded-xl text-xs text-left transition-all cursor-pointer flex items-center justify-between border',
                      activePrompt.id === prompt.id
                        ? 'bg-violet-600/15 border-violet-500/50 text-white font-medium'
                        : 'bg-[#0E0E14] border-white/[0.06] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]'
                    )}
                  >
                    <span className="truncate">{prompt.title}</span>
                    <span className="text-[10px] font-mono text-violet-400 shrink-0 ml-2">{prompt.model}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Output Area */}
            <div className="p-4 rounded-2xl bg-[#0E0E14] border border-white/[0.06] space-y-3 min-h-[120px] flex flex-col justify-between">
              <div className="space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-[10px] text-zinc-500 border-b border-white/[0.04] pb-1.5">
                  <span>Model: <strong className="text-violet-300">{activePrompt.model}</strong></span>
                  <span>Speed: <strong className="text-cyan-400">{activePrompt.speed}</strong></span>
                </div>
                <p className={cn('text-zinc-300 text-[11px] leading-relaxed pt-1', isSimulating && 'animate-pulse')}>
                  {isSimulating ? 'Synthesizing output and settlement proof...' : activePrompt.response}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono border-t border-white/[0.04] pt-2 text-zinc-500">
                <span>x402 Settlement:</span>
                <span className="text-emerald-400 font-bold">{activePrompt.cost}</span>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── SUITE LAUNCHER GRID (4 PILLARS) ── */}
      <section className="w-full bg-[#0E0E14] border-y border-white/[0.06] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Four Focused Product Workspaces
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Nexus organizes the full digital capabilities suite into task-focused workspaces so nontechnical users and technical creators can navigate cleanly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUITE_PILLARS.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Link
                  key={pillar.title}
                  to={pillar.to}
                  className="group p-6 rounded-2xl bg-[#14141E] border border-white/[0.07] hover:border-violet-500/40 transition-all flex flex-col justify-between space-y-6 shadow-lg hover:shadow-violet-600/10"
                >
                  <div className="space-y-4">
                    <div className={cn('h-12 w-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105', pillar.color)}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-violet-400 tracking-wider">{pillar.tagline}</span>
                      <h3 className="font-display font-bold text-lg text-white group-hover:text-violet-300 transition-colors flex items-center justify-between">
                        <span>{pillar.title}</span>
                        <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {pillar.description}
                    </p>
                  </div>

                  <span className="text-[11px] font-semibold text-violet-400 group-hover:text-violet-300 flex items-center gap-1 pt-2 border-t border-white/[0.04]">
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
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
          <div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Ecosystem & Integrations Directory
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Transparently identifying connected models, storage networks, compute nodes, and settlement rails.
            </p>
          </div>

          <Button to="/integrations" variant="secondary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
            View Full Registry
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {INTEGRATION_PROVIDERS.map((item) => (
            <div key={item.name} className="p-4 rounded-xl bg-[#14141E] border border-white/[0.06] flex items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-semibold text-white truncate">{item.name}</h4>
                <p className="text-[10px] text-zinc-500">{item.type}</p>
              </div>
              <TruthStateBadge status={item.status} />
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
