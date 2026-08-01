import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  Lock,
  ShieldCheck,
  Cpu,
  Zap,
  Globe,
  HardDrive,
  Coins,
  Terminal,
  CheckCircle2,
  Play,
  FileCode,
  Shield,
  ExternalLink,
} from 'lucide-react';
import { NexusLogoMark } from '../components/common/NexusLogoMark';

export default function Landing() {
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
  const item = { hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } };

  const capabilities = [
    {
      icon: Cpu,
      title: 'AI & Agents',
      description: 'Discover, test, and run state-of-the-art AI models, skills, and autonomous agent workflows.',
      link: '/marketplace/models',
      accent: 'purple',
    },
    {
      icon: Layers,
      title: 'Workflow Studio',
      description: 'Compose visual drag-and-drop or code-driven automation with daily budgets and human review steps.',
      link: '/studio',
      accent: 'emerald',
    },
    {
      icon: Coins,
      title: 'DeFi Hub & Payments',
      description: 'Access non-custodial wallet balances, stablecoins, and verified financial tools with x402 micropayments.',
      link: '/defi',
      accent: 'cyan',
    },
    {
      icon: HardDrive,
      title: 'Programmable Storage',
      description: 'Compare decentralized, multi-cloud, and zero-knowledge encrypted storage for files and PC game saves.',
      link: '/storage',
      accent: 'teal',
    },
    {
      icon: Zap,
      title: 'Compute Marketplace',
      description: 'Provision GPU clusters (H100, RTX 4090), serverless tasks, and confidential enclaves on demand.',
      link: '/compute',
      accent: 'amber',
    },
    {
      icon: Terminal,
      title: 'Developer Platform',
      description: 'Integrate x402 payment APIs, SDKs, webhooks, and provider monetization dashboards.',
      link: '/developer',
      accent: 'rose',
    },
  ];

  const featuredListings = [
    {
      name: 'Claude 3.5 Sonnet Vision Inference',
      provider: 'Anthropic',
      type: 'AI Model',
      price: '$0.003 / call',
      latency: '240ms',
      link: '/marketplace/models',
    },
    {
      name: 'Filecoin Decentralized Storage Adapter',
      provider: 'Protocol Labs',
      type: 'Storage',
      price: '$0.002 / GB',
      latency: '80ms',
      link: '/storage',
    },
    {
      name: 'NVIDIA H100 SXM5 Tensor Node',
      provider: 'Sovereign Cloud US',
      type: 'Compute',
      price: '$2.85 / hr',
      latency: '14ms',
      link: '/compute',
    },
    {
      name: 'Autonomous Competitor Tracker Workflow',
      provider: 'Nexus Labs',
      type: 'Workflow',
      price: '$0.50 / run',
      latency: 'Instant',
      link: '/exchange',
    },
  ];

  return (
    <div className="flex-1 flex flex-col w-full select-none overflow-hidden pb-16">
      {/* ── 1. HERO SECTION ── */}
      <section className="relative py-16 sm:py-28 px-4 sm:px-6 flex flex-col items-center text-center justify-center min-h-[75vh]">
        {/* Ambient background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] bg-purple-500/10 blur-[120px] rounded-full" />
          <div className="absolute top-2/3 left-1/4 h-[300px] w-[400px] bg-cyan-400/8 blur-[90px] rounded-full" />
        </div>

        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-4xl mx-auto flex flex-col items-center gap-6 z-10 relative">
          <motion.div variants={item}>
            <NexusLogoMark className="h-16 w-16 sm:h-24 sm:w-24" />
          </motion.div>

          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-purple-500/10 border border-purple-500/30 text-purple-300 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Nexus Operating Layer • Powered by Meridian x402 Protocol
            </span>
          </motion.div>

          <motion.h1 variants={item} className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-4xl">
            One platform for AI, digital services, infrastructure, and programmable commerce.
          </motion.h1>

          <motion.p variants={item} className="text-sm sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Discover, combine, pay for, and run trusted capabilities across networks and providers—without navigating fragmented tools.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
            <Link
              to="/marketplace/models"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 hover:brightness-110 text-zinc-950 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Nexus</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/studio"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="h-4 w-4 text-purple-400" />
              <span>Build a Workflow</span>
            </Link>
          </motion.div>

          <motion.div variants={item} className="pt-2">
            <Link to="/docs" className="text-xs font-mono text-zinc-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
              <span>View developer documentation</span>
              <ChevronRightIcon className="h-3 w-3" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. CAPABILITY GATEWAY ── */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Six Platform Pillars
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Everything in Nexus fits cleanly into reusable platform primitives designed for performance, transparency, and trust.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <Link
                key={cap.title}
                to={cap.link}
                className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-purple-400 w-fit group-hover:text-cyan-300 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{cap.description}</p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-purple-300 font-mono mt-4">
                  <span>Explore Outcome</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 3. MARKETPLACE PREVIEW ── */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Curated Capability Listings</h2>
            <p className="text-xs text-zinc-400">Tested and verified models, compute nodes, storage adapters, and workflows.</p>
          </div>
          <Link to="/marketplace/models" className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1">
            <span>View all marketplace listings</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredListings.map((listing) => (
            <Link
              key={listing.name}
              to={listing.link}
              className="p-4 rounded-xl bg-[#121216] border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  {listing.type}
                </span>
                <h4 className="font-display font-bold text-xs text-white group-hover:text-cyan-300 transition-colors mt-2">
                  {listing.name}
                </h4>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">by {listing.provider}</p>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-emerald-400 font-bold">{listing.price}</span>
                <span className="text-zinc-500">{listing.latency}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 4. HOW NEXUS WORKS ── */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 border border-purple-500/20 space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white">How Nexus Works</h2>
            <p className="text-xs text-zinc-400">Three clean steps from discovery to execution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2">
              <div className="text-xs font-mono font-bold text-purple-400">STEP 01</div>
              <h3 className="font-display text-sm font-bold text-white">Discover a Capability</h3>
              <p className="text-xs text-zinc-400">Browse verified AI models, agents, APIs, storage adapters, or compute nodes in the marketplace.</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400">STEP 02</div>
              <h3 className="font-display text-sm font-bold text-white">Connect to your Workflow</h3>
              <p className="text-xs text-zinc-400">Plug services into guided visual workflows or code parameters with explicit spending policies.</p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400">STEP 03</div>
              <h3 className="font-display text-sm font-bold text-white">Pay Only When It Runs</h3>
              <p className="text-xs text-zinc-400">Settle via Meridian x402 micro-settlements, prepaid balance, or self-custody stablecoins.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. TRUST & COMPLIANCE ── */}
      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        <div className="p-6 rounded-2xl bg-[#121216] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h2 className="font-display text-lg font-bold text-white">Transparent Trust & Compliance</h2>
            </div>
            <Link to="/trust" className="text-xs font-mono text-purple-300 hover:text-purple-200">
              Open Trust Center →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-emerald-400 font-bold block">✓ Transparent Pricing</span>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">Estimated fees before execution</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-emerald-400 font-bold block">✓ Verified Providers</span>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">Automated sandbox testing</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-emerald-400 font-bold block">✓ Spending Policies</span>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">Session caps & kill switch</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-emerald-400 font-bold block">✓ Jurisdiction Awareness</span>
              <span className="text-[11px] text-zinc-400 mt-0.5 block">Features vary by location</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FINAL CTA ── */}
      <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto w-full text-center space-y-4">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
          Start with one capability. Expand when you are ready.
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Join developers, creators, and enterprises building programmable commerce on Nexus.
        </p>

        <div className="pt-2 flex justify-center">
          <Link
            to="/marketplace/models"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-zinc-950 font-bold text-xs shadow-lg hover:brightness-110 cursor-pointer"
          >
            Get Started with Nexus
          </Link>
        </div>
      </section>
    </div>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
