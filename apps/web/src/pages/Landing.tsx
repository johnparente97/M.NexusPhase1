import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Terminal,
  Activity,
  Folder,
  Search,
  Sparkles,
  Bot,
  Layers,
  Coins,
  Shield,
  Zap,
  Cpu,
  Lock,
  Code,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { CyberSigilMark } from '../components/common/CyberSigilIcon';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils/cn';

const FEATURED_CAPABILITIES = [
  {
    id: 'cap-1',
    title: 'SEC Financial Intelligence Agent',
    category: 'AI Inference',
    creator: 'Nexus Core',
    price: '$0.50 / run',
    maturity: 'production' as const,
    description: 'Autonomous financial cross-referencing of quarterly SEC 10-K filings and earnings transcripts via DeepSeek R1.',
    route: '/explore?q=SEC',
  },
  {
    id: 'cap-2',
    title: 'Cyber Audit & Vulnerability Scanner',
    category: 'Autonomous Orchestration',
    creator: 'CyberSigil Lab',
    price: '$1.00 / run',
    maturity: 'production' as const,
    description: 'Multi-step vulnerability audit scanning codebase for OWASP Top 10 vulnerabilities & secret token leaks.',
    route: '/explore?q=Audit',
  },
  {
    id: 'cap-3',
    title: 'Document Vectorizer & RAG Pipeline',
    category: 'Digital Capability',
    creator: 'DataMesh',
    price: '$0.25 / run',
    maturity: 'production' as const,
    description: 'Parses raw PDFs and markdown docs into vectorized embeddings stored in R2 for context-augmented inference.',
    route: '/explore?q=Vector',
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center w-full select-none overflow-hidden bg-[#05050A]">
      
      {/* ── CYBER-SIGILIC HERO SECTION ── */}
      <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 text-center space-y-10">
        
        {/* Glowing Cyber-Sigil Background Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial-glow pointer-events-none -z-10" />
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* Top Cyber Sigil Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 backdrop-blur-xl shadow-lg">
          <CyberSigilMark className="h-4 w-4 text-violet-400" />
          <span className="text-xs font-mono font-bold tracking-wider text-violet-300 uppercase">
            NEXUS OS • CYBER-SIGILIC ENVIRONMENT
          </span>
          <TruthStateBadge status="production" text="Operational" />
        </div>

        {/* Locked Cyber-Sigilic Tagline Headline */}
        <div className="space-y-6 max-w-4xl mx-auto">
          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
            The independent <span className="text-prismatic">cyber-sigilic workspace</span> for intelligent digital capabilities, AI inference, and autonomous orchestrations.
          </h1>
          
          <p className="text-sm sm:text-base text-zinc-400 font-sans max-w-2xl mx-auto leading-relaxed">
            Discover, compose, and execute high-performance AI agents and workflow graphs under atomic USDC spending caps and x402 settlement.
          </p>
        </div>

        {/* Cyber Command Search Input */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto w-full relative">
          <div className="relative flex items-center bg-[#0F0F1D]/90 border border-violet-500/40 focus-within:border-cyan-400 rounded-2xl shadow-2xl p-2 transition-all backdrop-blur-2xl">
            <Search className="h-5 w-5 text-cyan-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents, workflows, models, or MCP tools..."
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="shrink-0 font-bold px-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-600/30"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Execute Search
            </Button>
          </div>
        </form>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            to="/explore"
            variant="primary"
            size="lg"
            className="font-extrabold px-8 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-violet-600/25"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore Marketplace
          </Button>

          <Button
            to="/compose"
            variant="outline"
            size="lg"
            className="font-extrabold px-8 border-violet-500/40 text-violet-300 hover:bg-violet-500/10"
            leftIcon={<Terminal className="h-4 w-4 text-cyan-400" />}
          >
            Build Capability
          </Button>
        </div>

      </section>

      {/* ── SIGNED-IN COMMAND FEED ── */}
      {isSignedIn && (
        <section className="w-full bg-[#0A0A14] border-y border-violet-500/20 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-lg text-white tracking-tight">
                    Active Workspace Feed
                  </h2>
                  <p className="text-xs text-zinc-400">Welcome back, {user?.displayName || 'Developer'}! Continue active orchestrations.</p>
                </div>
              </div>

              <Button to="/activity" variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Activity Thread
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 space-y-2">
                <span className="text-cyan-400 text-[10px] uppercase font-bold">Latest Execution</span>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>SEC Financial Brief</span>
                  <TruthStateBadge status="live" text="Running" />
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">Step 3/5: Cross-referencing SEC quarterly 10-K filings...</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 space-y-2">
                <span className="text-violet-400 text-[10px] uppercase font-bold">Library Assets</span>
                <div className="text-white font-bold text-base">5 Workspace Items</div>
                <Link to="/library" className="text-cyan-400 hover:underline text-[11px] block">View Library →</Link>
              </div>

              <div className="p-5 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 space-y-2">
                <span className="text-emerald-400 text-[10px] uppercase font-bold">Pending Approvals</span>
                <div className="text-white font-bold text-base">0 Action Approvals</div>
                <span className="text-zinc-500 text-[11px] block font-sans">All agent runs authorized</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4 CYBER-SIGILIC PRODUCT GATEWAYS ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Cyber-Sigilic Architecture Gateways
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Modular infrastructure for AI inference, durable workflow orchestration, digital capability publishing, and x402 settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/explore"
            className="group p-6 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                AI Inference Registry
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Discover verified model agents, DeepSeek R1 architects, and Dolphin 8x7B reasoners.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
              Explore Agents <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/compose"
            className="group p-6 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-violet-300 transition-colors">
                Autonomous Orchestration
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Compose visual workflow graphs with spending caps, MCP tools, and human approvals.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-violet-400 flex items-center gap-1">
              Build Workflow <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/activity"
            className="group p-6 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-fuchsia-300 transition-colors">
                Execution Receipts
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Durable task threads, step timelines, generated artifacts, and x402 settlement.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-fuchsia-400 flex items-center gap-1">
              View Activity <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/creator"
            className="group p-6 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                Creator Economy
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Publish agents, set price per run, and earn 85% net USDC payouts directly.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
              Creator Console <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ── FEATURED DIGITAL CAPABILITIES ── */}
      <section className="w-full bg-[#0A0A14] border-t border-violet-500/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Featured Cyber Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Verified agents with explicit permissions, disclosed provider costs, and x402 settlement.
              </p>
            </div>
            <Button to="/explore" variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              Registry Catalog
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_CAPABILITIES.map((cap) => (
              <Link
                key={cap.id}
                to={cap.route}
                className="group p-6 rounded-2xl bg-[#0F0F1D] border border-violet-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-6 shadow-xl cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-0.5 rounded-full uppercase">
                      {cap.category}
                    </span>
                    <TruthStateBadge status={cap.maturity} />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {cap.title}
                    </h3>
                    <span className="text-xs text-zinc-500 font-mono">by {cap.creator}</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                    {cap.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{cap.price}</span>
                  <span className="text-white group-hover:text-cyan-300 font-bold flex items-center gap-1">
                    Execute Agent <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
