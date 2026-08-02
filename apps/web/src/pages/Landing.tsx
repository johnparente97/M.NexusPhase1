import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Terminal,
  Activity,
  Coins,
  Bot,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { cn } from '../utils/cn';

const PRODUCT_GATEWAYS = [
  {
    icon: Compass,
    title: 'Explore',
    tagline: 'Marketplace Discovery',
    description: 'Discover trusted agents, multi-step workflows, AI models, and tools from top creators.',
    to: '/explore',
    color: 'from-[#00F5D4]/20 via-[#00F5D4]/10 to-transparent border-[#00F5D4]/30 text-[#00F5D4]',
    cta: 'Explore Marketplace',
  },
  {
    icon: Terminal,
    title: 'Build',
    tagline: 'Creation & Studio',
    description: 'Create, test, price, and publish intelligent agents and multi-step workflow graphs.',
    to: '/compose',
    color: 'from-[#A855F7]/20 via-[#A855F7]/10 to-transparent border-[#A855F7]/30 text-[#D8B4FE]',
    cta: 'Build an Agent',
  },
  {
    icon: Activity,
    title: 'Run',
    tagline: 'Execution & Receipts',
    description: 'Manage active runs, review execution steps, track budgets, and inspect itemized receipts.',
    to: '/activity',
    color: 'from-[#3B82F6]/20 via-[#3B82F6]/10 to-transparent border-[#3B82F6]/30 text-[#60A5FA]',
    cta: 'View Activity',
  },
  {
    icon: Coins,
    title: 'Earn',
    tagline: 'Creator Revenue',
    description: 'Publish AI capabilities, set your pricing margin, and earn net revenue from every successful run.',
    to: '/creator',
    color: 'from-[#FFD700]/20 via-[#FFD700]/10 to-transparent border-[#FFD700]/30 text-[#FFD700]',
    cta: 'Creator Console',
  },
];

const DEMO_LISTINGS = [
  {
    id: 'agent-company-intel',
    name: 'Company Intelligence Brief',
    creator: 'Nexus Labs',
    type: 'Agent',
    price: '$0.50 / run',
    rating: 4.9,
    maturity: 'production' as const,
    description: 'Autonomous agent that cross-references corporate filings, market news, and executive team bios.',
    route: '/explore?q=Company+Intelligence',
  },
  {
    id: 'wf-financial-auditor',
    name: 'Autonomous Code Auditor',
    creator: 'CyberGuard',
    type: 'Workflow',
    price: '$1.00 / run',
    rating: 4.8,
    maturity: 'production' as const,
    description: 'Deep static code analysis workflow checking for OWASP vulnerabilities and secret leaks.',
    route: '/explore?q=Security',
  },
  {
    id: 'agent-deepseek-r1',
    name: 'DeepSeek R1 Architect Agent',
    creator: 'Logic Systems',
    type: 'Agent',
    price: '$0.25 / run',
    rating: 4.95,
    maturity: 'production' as const,
    description: 'Chain-of-thought mathematical reasoning model agent for database & API schema design.',
    route: '/explore?q=DeepSeek',
  },
];

export default function Landing() {
  const { isSignedIn, user } = useAuth();
  const [activeTab, setActiveTab] = useState<'how' | 'preview'>('how');

  return (
    <div className="flex-1 flex flex-col items-center w-full select-none overflow-hidden bg-[var(--nx-bg)]">
      
      {/* ── HERO SECTION ── */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24 flex flex-col items-center text-center space-y-8">
        
        {/* Ambient Glow Backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#A855F7]/15 via-[#00F5D4]/10 to-[#FF007F]/15 blur-[140px] rounded-full pointer-events-none -z-10" />

        {/* Signed-in Continuation Header Banner */}
        {isSignedIn ? (
          <div className="p-3 px-5 rounded-2xl bg-[var(--nx-surface-1)] border border-[#00F5D4]/40 flex items-center gap-3 shadow-lg shadow-[#00F5D4]/10 animate-fade-in">
            <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#00F5D4] to-[#A855F7] text-zinc-950 font-extrabold flex items-center justify-center text-xs shrink-0">
              {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="text-left text-xs font-mono">
              <span className="text-white font-bold">Welcome back, {user?.displayName || 'Creator'}!</span>
              <span className="text-zinc-400 block text-[11px]">Active workspace ready • Continue your recent agent runs</span>
            </div>
            <Link to="/activity" className="ml-2 text-[11px] font-bold text-[#00F5D4] hover:underline flex items-center gap-1">
              Resume <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2">
            <TruthStateBadge status="production" text="Nexus Marketplace Platform v2.0" />
          </div>
        )}

        {/* Hero Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            Build, discover, and run <span className="text-prismatic">intelligent agents</span> from one connected marketplace.
          </h1>
          <p className="text-base sm:text-lg text-[var(--nx-text-secondary)] leading-relaxed font-sans max-w-2xl mx-auto">
            Explore trusted agents and workflows, create your own, and pay only when they run.
          </p>
        </div>

        {/* Primary & Secondary Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <Button
            to="/explore"
            variant="primary"
            size="lg"
            className="font-extrabold px-8 shadow-xl shadow-purple-600/25"
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Explore Agents
          </Button>

          <Button
            to="/compose"
            variant="cyan"
            size="lg"
            className="font-extrabold px-8"
          >
            Build an Agent
          </Button>

          <a
            href="#how-it-works"
            className="text-xs font-mono text-zinc-400 hover:text-white transition-colors py-2 px-3 font-semibold"
          >
            See how Nexus works ↓
          </a>
        </div>
      </section>

      {/* ── PRODUCT GATEWAYS (4 PILLARS) ── */}
      <section className="w-full bg-[var(--nx-bg-subtle)] border-y border-white/[0.08] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
              Four Connected <span className="text-prismatic">Product Gateways</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Nexus unifies discovery, creation, execution, and monetization in a calm, production-grade operational workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_GATEWAYS.map((gateway) => {
              const Icon = gateway.icon;
              return (
                <Link
                  key={gateway.title}
                  to={gateway.to}
                  className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] hover:border-[#00F5D4]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl hover:shadow-[0_0_30px_rgba(0,245,212,0.15)]"
                >
                  <div className="space-y-4">
                    <div className={cn('h-12 w-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 shadow-md', gateway.color)}>
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#00F5D4] tracking-wider">{gateway.tagline}</span>
                      <h3 className="font-display font-extrabold text-lg text-white group-hover:text-prismatic transition-all flex items-center justify-between">
                        <span>{gateway.title}</span>
                        <ArrowRight className="h-4 w-4 text-zinc-600 group-hover:text-[#00F5D4] group-hover:translate-x-1 transition-all" />
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                      {gateway.description}
                    </p>
                  </div>

                  <span className="text-[11px] font-bold text-[#00F5D4] group-hover:text-white flex items-center gap-1 pt-2 border-t border-white/[0.06] font-mono">
                    {gateway.cta} ↗
                  </span>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── HOW NEXUS WORKS SECTION ── */}
      <section id="how-it-works" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            How <span className="text-prismatic">Nexus Works</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Transparent pricing, verifiable receipts, and seamless creator payouts for every execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono font-bold text-[#00F5D4]">01. Discover & Select</div>
            <h3 className="font-display font-bold text-base text-white">Find Capabilities</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Browse agents and workflows with clear price disclosures, inputs, and permission requirements.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono font-bold text-[#A855F7]">02. Itemized Quote</div>
            <h3 className="font-display font-bold text-base text-white">Approve Total Price</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Review underlying AI costs, creator margin, and platform fees before authorizing execution.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono font-bold text-[#3B82F6]">03. Orchestrated Run</div>
            <h3 className="font-display font-bold text-base text-white">Execute & Receive Result</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Execution engine runs the agent steps safely and delivers structured outputs and artifacts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-3">
            <div className="text-xs font-mono font-bold text-[#FFD700]">04. Settle & Pay Creator</div>
            <h3 className="font-display font-bold text-base text-white">Verifiable Receipt</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Payment is processed, creator earnings update immediately, and an audit-ready receipt is saved.
            </p>
          </div>
        </div>
      </section>

      {/* ── MARKETPLACE FEATURED PREVIEW ── */}
      <section className="w-full bg-[var(--nx-bg-subtle)] border-t border-white/[0.08] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <h2 className="font-display font-extrabold text-xl sm:text-3xl text-white tracking-tight">
                Featured Marketplace Agents
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Explore production-ready agents ready for immediate execution.
              </p>
            </div>
            <Button to="/explore" variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
              View All Listings
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEMO_LISTINGS.map((listing) => (
              <Link
                key={listing.id}
                to={listing.route}
                className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] hover:border-[#00F5D4]/50 transition-all flex flex-col justify-between space-y-6 shadow-xl cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/20 px-2 py-0.5 rounded-full uppercase">
                      {listing.type}
                    </span>
                    <TruthStateBadge status={listing.maturity} />
                  </div>

                  <div>
                    <h3 className="font-display font-extrabold text-base text-white group-hover:text-prismatic transition-all">
                      {listing.name}
                    </h3>
                    <span className="text-xs text-zinc-500 font-mono">by {listing.creator}</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {listing.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-xs font-mono">
                  <span className="text-[#00F5D4] font-bold">{listing.price}</span>
                  <span className="text-white font-bold group-hover:text-[#00F5D4] flex items-center gap-1">
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
