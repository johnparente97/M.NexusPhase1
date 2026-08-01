import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Settings,
  Globe,
  Shield,
  Wallet,
  Zap,
} from 'lucide-react';
import { NexusLogoMark } from '../components/common/NexusLogoMark';

const fadeUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

interface ToolItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  to: string;
}

const toolGroups: Array<{ title: string; items: ToolItem[] }> = [
  {
    title: 'Use AI',
    items: [
      {
        icon: MessageSquare,
        label: 'Chat with Models',
        description: 'Start a conversation with open-weight and premium AI models.',
        to: '/chat',
      },
      {
        icon: Cpu,
        label: 'Compare Models',
        description: 'Browse pricing, benchmarks, and capabilities side by side.',
        to: '/marketplace/models',
      },
      {
        icon: Compass,
        label: 'Run a Workflow',
        description: 'Execute multi-step AI automations built by the community.',
        to: '/exchange',
      },
    ],
  },
  {
    title: 'Build',
    items: [
      {
        icon: Layers,
        label: 'Workflow Studio',
        description: 'Create reusable multi-step workflows with visual tools.',
        to: '/studio',
      },
      {
        icon: Bot,
        label: 'Agent Builder',
        description: 'Configure autonomous agents with custom personas and budgets.',
        to: '/agents/new',
      },
      {
        icon: Terminal,
        label: 'Developer Console',
        description: 'Access APIs, SDKs, and integration documentation.',
        to: '/developer',
      },
    ],
  },
  {
    title: 'Manage',
    items: [
      {
        icon: History,
        label: 'Activity & Results',
        description: 'Review execution history, costs, and output artifacts.',
        to: '/activity',
      },
      {
        icon: Coins,
        label: 'Balance & Payments',
        description: 'Manage funds, top up your balance, and view transactions.',
        to: '/balance',
      },
      {
        icon: Settings,
        label: 'Account & Settings',
        description: 'Update your profile, preferences, and team settings.',
        to: '/profile',
      },
    ],
  },
];

interface IntegrationItem {
  label: string;
  purpose: string;
  status: 'integrated' | 'demo' | 'planned';
}

const integrations: IntegrationItem[] = [
  { label: 'Open-Weight Models', purpose: 'AI inference via supported model hosts', status: 'integrated' },
  { label: 'x402 Protocol', purpose: 'Pay-per-use micropayment settlement', status: 'integrated' },
  { label: 'Circle', purpose: 'Stablecoin payments and top-ups', status: 'demo' },
  { label: 'MetaMask & Wallets', purpose: 'Web3 wallet connectivity', status: 'integrated' },
  { label: 'Meridian', purpose: 'Payment routing and settlement', status: 'demo' },
  { label: 'Base Network', purpose: 'Blockchain settlement layer', status: 'integrated' },
];

const statusLabels: Record<string, { text: string; className: string }> = {
  integrated: { text: 'Integrated', className: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  demo: { text: 'Demo', className: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  planned: { text: 'Planned', className: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' },
};

export default function Landing() {
  return (
    <div className="flex-1 flex flex-col w-full select-none">

      {/* ─── Hero ─── */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 flex flex-col items-center text-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[600px] bg-emerald-500/[0.06] blur-[100px] rounded-full" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto flex flex-col items-center gap-6 relative z-10"
        >
          <motion.div variants={fadeUp}>
            <NexusLogoMark className="h-14 w-14 sm:h-20 sm:w-20" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display font-bold text-3xl sm:text-5xl lg:text-[3.5rem] text-white tracking-tight leading-[1.15] max-w-3xl"
          >
            Build, run, and discover
            <br />
            <span className="text-emerald-400">intelligent tools.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
          >
            Nexus brings AI models, agents, workflows, and verifiable payments
            into one accessible workspace.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto"
          >
            <Link
              to="/chat"
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Start a Chat</span>
            </Link>
            <Link
              to="/exchange"
              className="w-full sm:w-auto px-7 py-3 rounded-lg bg-[#1A1A20] hover:bg-[#222228] border border-white/[0.08] hover:border-white/[0.14] text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Compass className="h-4 w-4 text-emerald-400" />
              <span>Explore Workflows</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Tool Launcher ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-10"
        >
          {toolGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUp} className="space-y-4">
              <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500 px-1">
                {group.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="group p-4 sm:p-5 rounded-xl bg-[#131318] border border-white/[0.06] hover:border-emerald-500/25 transition-all flex flex-col gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.04] text-zinc-400 group-hover:text-emerald-400 transition-colors">
                          <Icon className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-sm text-white group-hover:text-emerald-400 transition-colors">
                          {item.label}
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-auto pt-2 flex items-center text-xs text-zinc-600 group-hover:text-emerald-400/60 transition-colors">
                        <span>Open</span>
                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── Ecosystem ─── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-6"
        >
          <motion.div variants={fadeUp} className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
                Built with an open ecosystem
              </h2>
              <p className="text-sm text-zinc-500 mt-1">
                Nexus connects to models, payment rails, wallets, and infrastructure providers.
              </p>
            </div>
            <Link
              to="/ecosystem"
              className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-400 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {integrations.map((item) => {
              const status = statusLabels[item.status] || { text: item.status, className: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20' };
              return (
                <div
                  key={item.label}
                  className="p-4 rounded-xl bg-[#131318] border border-white/[0.06] flex items-start justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-medium text-zinc-200">{item.label}</h3>
                    <p className="text-xs text-zinc-500">{item.purpose}</p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-md border ${status.className}`}>
                    {status.text}
                  </span>
                </div>
              );
            })}
          </motion.div>

          <Link
            to="/ecosystem"
            className="sm:hidden flex items-center justify-center gap-1.5 text-xs text-zinc-500 hover:text-emerald-400 transition-colors pt-2"
          >
            <span>View all integrations</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
