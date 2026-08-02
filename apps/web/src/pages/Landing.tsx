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
  Code,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { CyberSigilMark } from '../components/common/CyberSigilIcon';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const FEATURED_AGENTS = [
  {
    id: 'agent-1',
    title: 'SEC Financial Analyst',
    category: 'Research',
    creator: 'Nexus Core',
    price: '$0.50 / run',
    maturity: 'production' as const,
    description: 'Reads company 10-K filings, extracts key financial numbers, and creates clear summary reports.',
    route: '/explore?q=SEC',
  },
  {
    id: 'agent-2',
    title: 'Code Vulnerability Auditor',
    category: 'Development',
    creator: 'CyberGuard',
    price: '$1.00 / run',
    maturity: 'production' as const,
    description: 'Scans code repositories for OWASP security flaws, exposed tokens, and recommends fixes.',
    route: '/explore?q=Audit',
  },
  {
    id: 'agent-3',
    title: 'Document Vectorizer & RAG',
    category: 'Data & Knowledge',
    creator: 'DataMesh',
    price: '$0.25 / run',
    maturity: 'production' as const,
    description: 'Parses PDFs and documents into searchable vector knowledge for AI questions.',
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
    <div className="flex-1 flex flex-col items-center w-full select-none overflow-hidden bg-[var(--nx-bg)] text-[var(--nx-text)]">
      
      {/* ── HERO SECTION ── */}
      <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 text-center space-y-8">
        
        {/* Ambient Glow Atmosphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-radial-glow pointer-events-none -z-10" />

        {/* Top Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 backdrop-blur-xl shadow-lg">
          <CyberSigilMark className="h-4 w-4 text-violet-400" />
          <span className="text-xs font-mono font-bold tracking-wider text-violet-300 uppercase">
            NEXUS OS v2.0
          </span>
          <TruthStateBadge status="production" text="Online" />
        </div>

        {/* Straight-to-the-point Headline & Copy */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.1]">
            Build, discover, and run <span className="text-prismatic">AI agents.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-zinc-400 font-sans max-w-xl mx-auto leading-relaxed">
            Discover ready-to-use agents, create your own in minutes, and pay only when useful work is completed.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto w-full relative">
          <div className="relative flex items-center bg-[var(--nx-surface-1)]/90 border border-violet-500/40 focus-within:border-cyan-400 rounded-2xl shadow-2xl p-2 transition-all backdrop-blur-2xl">
            <Search className="h-5 w-5 text-cyan-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What do you want to build or run today? (e.g. Audit code, summarize reports...)"
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none font-sans"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="shrink-0 font-bold px-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-600/30"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Search
            </Button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button
            to="/explore"
            variant="primary"
            size="lg"
            className="font-extrabold px-8 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 hover:opacity-95 shadow-xl shadow-violet-600/25"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore Agents
          </Button>

          <Button
            to="/compose"
            variant="outline"
            size="lg"
            className="font-extrabold px-8 border-violet-500/40 text-violet-300 hover:bg-violet-500/10"
            leftIcon={<Terminal className="h-4 w-4 text-cyan-400" />}
          >
            Build an Agent
          </Button>
        </div>

      </section>

      {/* ── SIGNED-IN FEED ── */}
      {isSignedIn && (
        <section className="w-full bg-[var(--nx-bg-subtle)] border-y border-violet-500/20 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display font-extrabold text-lg text-white tracking-tight">
                    Personal Workspace
                  </h2>
                  <p className="text-xs text-zinc-400">Welcome back, {user?.displayName || 'User'}! Continue your latest project.</p>
                </div>
              </div>

              <Button to="/activity" variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                View Activity
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 space-y-2">
                <span className="text-cyan-400 text-[10px] uppercase font-bold">Active Run</span>
                <div className="flex items-center justify-between text-white font-bold">
                  <span>SEC Financial Analyst</span>
                  <TruthStateBadge status="live" text="Running" />
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">Analyzing quarterly filing metrics...</p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 space-y-2">
                <span className="text-violet-400 text-[10px] uppercase font-bold">Saved Items</span>
                <div className="text-white font-bold text-base">5 Items in Library</div>
                <Link to="/library" className="text-cyan-400 hover:underline text-[11px] block">Open Library →</Link>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 space-y-2">
                <span className="text-emerald-400 text-[10px] uppercase font-bold">Pending Approvals</span>
                <div className="text-white font-bold text-base">0 Approvals Needed</div>
                <span className="text-zinc-500 text-[11px] block font-sans">All runs ready</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 4 PRODUCT GATEWAYS ── */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
            Everything you need for AI
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Discover, build, run, and publish AI agents with clear pricing and complete transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/explore"
            className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                Explore Marketplace
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Browse ready-to-use agents for coding, research, data analysis, and automation.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
              Explore Marketplace <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/compose"
            className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-violet-300 transition-colors">
                Build an Agent
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Create custom agents or visual workflows with Spending Caps and simple rules.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-violet-400 flex items-center gap-1">
              Build Now <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/activity"
            className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-fuchsia-500/15 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-fuchsia-300 transition-colors">
                Activity & Receipts
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Track your active runs, task history, generated files, and itemized receipts.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-fuchsia-400 flex items-center gap-1">
              View Activity <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            to="/creator"
            className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 hover:border-violet-500/60 transition-all flex flex-col justify-between space-y-4 shadow-xl"
          >
            <div className="space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Coins className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                Creator Console
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                Publish agents to the marketplace, set your price per run, and earn USDC.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
              Creator Console <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* ── FEATURED AGENTS ── */}
      <section className="w-full bg-[var(--nx-bg-subtle)] border-t border-violet-500/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                Featured Agents
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Popular agents ready to run with clear pricing and verified results.
              </p>
            </div>
            <Button to="/explore" variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              View All Agents
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_AGENTS.map((agent) => (
              <Link
                key={agent.id}
                to={agent.route}
                className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-violet-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between space-y-6 shadow-xl cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-2.5 py-0.5 rounded-full uppercase">
                      {agent.category}
                    </span>
                    <TruthStateBadge status={agent.maturity} />
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                      {agent.title}
                    </h3>
                    <span className="text-xs text-zinc-500 font-mono">by {agent.creator}</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                    {agent.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono">
                  <span className="text-emerald-400 font-bold">{agent.price}</span>
                  <span className="text-white group-hover:text-cyan-300 font-bold flex items-center gap-1">
                    Run Agent <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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
