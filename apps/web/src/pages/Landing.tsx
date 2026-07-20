import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import {
  Compass,
  Layers,
  ArrowRight,
  Sparkles,
  Lock,
  Workflow as WorkflowIcon,
  ShieldCheck,
  Cpu,
  Zap,
  BarChart3,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { WORKFLOW_CATEGORIES } from '@meridian-nexus/shared-types';
import { CATEGORY_ICONS } from '../utils/constants';
import logoNexus from '../assets/logo-nexus.png';
import { NexusLogoMark } from '../components/common/NexusLogoMark';

export default function Landing() {
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
  const item = { hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } };

  const features = [
    {
      icon: Cpu,
      title: 'Outcome-First Interface',
      description: 'Define inputs and output schema once. The system coordinates instructions, context mappings, and validation checks automatically.',
      accent: 'emerald',
    },
    {
      icon: Lock,
      title: 'Zero Key Exposure',
      description: 'All API credentials are hosted securely server-side. Creators run analyses without exposing internal systems or tokens.',
      accent: 'emerald',
    },
    {
      icon: ShieldCheck,
      title: 'Verification & Trust',
      description: 'Audit output templates, data handling rules, and refund criteria before initiating any settlement authorization.',
      accent: 'emerald',
    },
    {
      icon: Zap,
      title: 'x402 Native Settlement',
      description: 'Built on the Meridian x402 payment protocol. Instant, verifiable USDC micropayments settled on Base.',
      accent: 'blue',
    },
    {
      icon: BarChart3,
      title: 'Creator Analytics',
      description: 'Real-time revenue tracking, run metrics, and workflow performance dashboards for every published capability.',
      accent: 'emerald',
    },
    {
      icon: Globe,
      title: 'Open Marketplace',
      description: 'Publish your AI workflows to the Nexus Exchange. Earn MRDN rewards for every successful execution.',
      accent: 'emerald',
    },
  ];

  return (
    <div className="flex-1 flex flex-col w-full select-none overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative py-24 sm:py-36 px-6 flex flex-col items-center text-center justify-center min-h-[85vh]">
        {/* MRDN-style ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] bg-emerald-500/8 blur-[120px] rounded-full" />
          <div className="absolute top-2/3 left-1/4 h-[300px] w-[400px] bg-emerald-400/5 blur-[90px] rounded-full" />
          <div className="absolute top-1/4 right-1/4 h-[200px] w-[300px] bg-blue-500/5 blur-[80px] rounded-full" />
        </div>

        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-4xl mx-auto flex flex-col items-center gap-8 z-10 relative">

          {/* Nexus Logo with MRDN glow */}
          <motion.div variants={item}>
            <motion.div
              whileHover={{ rotate: 8, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="cursor-pointer"
            >
              <NexusLogoMark className="h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40" />
            </motion.div>
          </motion.div>

          {/* Live badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Meridian Nexus — Phase 1 Live
            </span>
          </motion.div>

          {/* Hero heading — Funnel Display, MRDN style */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-white tracking-tight leading-[1.05] max-w-4xl"
          >
            Build intelligence.{' '}
            <br className="hidden sm:block" />
            Market capabilities.{' '}
            <br className="hidden sm:block" />
            <span
              className="text-emerald-400"
              style={{ textShadow: '0 0 40px rgba(52, 211, 153, 0.4), 0 0 80px rgba(52, 211, 153, 0.2)' }}
            >
              Synthesize outcomes.
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.p variants={item} className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-sans">
            The open creation, marketplace, workflow, and intelligence synthesis layer built on Meridian.{' '}
            <span className="text-zinc-300">Nexus coordinates intelligence. Meridian coordinates value.</span>
          </motion.p>

          {/* Trust badges */}
          <motion.div variants={item} className="flex items-center gap-4 flex-wrap justify-center">
            {['x402 Protocol Native', 'USDC on Base', 'MRDN Token Rewards', 'Non-Custodial'].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                {label}
              </span>
            ))}
          </motion.div>

          {/* CTAs — MRDN white pill primary + emerald outline secondary */}
          <motion.div variants={item} className="flex items-center gap-3 mt-2 flex-wrap justify-center">
            <Button to="/exchange" variant="primary" size="lg" className="font-semibold gap-2 shadow-xl shadow-black/30">
              <Compass className="h-4 w-4" />
              Explore Exchange
            </Button>
            <Button to="/studio" variant="outline" size="lg" className="font-semibold gap-2 hover:border-emerald-500/40 hover:text-emerald-400">
              <Layers className="h-4 w-4" />
              Nexus Studio
            </Button>
            <Button to="/chat/free" variant="ghost" size="lg" className="font-semibold gap-2 text-emerald-400 hover:text-emerald-300">
              <Sparkles className="h-4 w-4" />
              Try Dolphin AI
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features Grid ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="flex flex-col items-center text-center gap-3 mb-14">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">Platform Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
            Built for Secure AI Operations
          </h2>
          <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
            Meridian Nexus abstracts complex parameter tuning, key exposure, and settlement orchestration into a clean, composable layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#171719] border border-zinc-800/60 rounded-2xl p-6 flex flex-col gap-4 premium-card"
              >
                <div className={`p-2.5 rounded-xl w-fit shrink-0 ${
                  f.accent === 'blue'
                    ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-sm text-white leading-snug">{f.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{f.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Workflow Categories ── */}
      <section className="w-full py-20 border-y border-zinc-900/60 bg-[#171719]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-3 mb-14">
            <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">Workflow Exchange</span>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
              Explore by Category
            </h2>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Discover tailored strategic AI workflows built across 12 operational domains.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {WORKFLOW_CATEGORIES.map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.value] || WorkflowIcon;
              return (
                <motion.div
                  key={cat.value}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <Link to={`/exchange?category=${cat.value}`}>
                    <div className="bg-[#171719] border border-zinc-800/60 hover:border-emerald-500/30 rounded-2xl p-4 flex flex-col items-center text-center gap-3 cursor-pointer transition-all duration-200 group hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                      <div className="p-2 bg-zinc-900 border border-zinc-800 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/5 rounded-xl text-zinc-400 group-hover:text-emerald-400 transition-all">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors truncate w-full">
                        {cat.label}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── x402 Protocol Callout — MRDN Blue Accent ── */}
      <section className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="bg-[#171719] border border-zinc-800/60 rounded-[28px] p-10 sm:p-14 flex flex-col sm:flex-row items-center gap-8 sm:gap-12 overflow-hidden relative">
          {/* Blue glow for x402 */}
          <div className="absolute top-0 right-0 h-[250px] w-[400px] bg-blue-600/8 blur-[80px] rounded-full pointer-events-none" />
          <div className="flex flex-col gap-4 flex-1 z-10">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-blue-400 uppercase tracking-widest">
              <Zap className="h-3.5 w-3.5" />
              x402 Protocol
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
              Meridian-native micropayments,<br />
              <span className="text-blue-400">settled on Base.</span>
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              Every workflow execution routes through the Meridian x402 facilitator. Instant USDC settlement, verifiable on-chain receipts, and automatic MRDN token distribution to creators.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <Button to="/docs" variant="secondary" size="md" className="font-medium">
                Read the Docs
              </Button>
              <Button to="/exchange" variant="ghost" size="md" className="text-blue-400 hover:text-blue-300 font-medium gap-1.5">
                View Workflows <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div className="shrink-0 z-10 grid grid-cols-2 gap-3 text-xs font-mono">
            {[
              { label: 'Protocol', value: 'x402' },
              { label: 'Chain', value: 'Base Sepolia' },
              { label: 'Asset', value: 'USDC' },
              { label: 'Token', value: 'MRDN' },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 flex flex-col gap-1">
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider">{stat.label}</span>
                <span className="text-white font-semibold">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6 pb-32 md:pb-20">
        <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">Get Started Today</span>
        <h2 className="text-3xl sm:text-4xl font-display font-semibold text-white tracking-tight">
          Ready to build your first AI workflow?
        </h2>
        <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
          Open Nexus Studio to declare parameters, instructions, and templates. Publish to the marketplace in minutes.
        </p>
        <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
          <Button to="/studio" variant="primary" size="lg" className="font-semibold gap-2 shadow-xl shadow-black/30">
            <Layers className="h-4 w-4" />
            Open Nexus Studio
          </Button>
          <Button to="/chat/free" variant="outline" size="lg" className="font-semibold gap-2 hover:border-emerald-500/40 hover:text-emerald-400">
            <Sparkles className="h-4 w-4" />
            Try Dolphin AI Free
          </Button>
        </div>
      </section>

    </div>
  );
}
