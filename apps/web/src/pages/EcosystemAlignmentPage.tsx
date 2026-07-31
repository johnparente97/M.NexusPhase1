import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NexusLogoMark } from '../components/common/NexusLogoMark';
import {
  ShieldCheck, Zap, Coins, Bot, Layers, Compass, Terminal,
  ExternalLink, ArrowRight, Sparkles, CheckCircle2, Lock,
  Globe, Send, Cpu, KeyRound, FileCode2, Check, Flame,
} from 'lucide-react';

const WORKSPACES = [
  { name: 'Inference Hub', route: '/chat', desc: 'Sub-penny prompt execution across open-weight AI models with live model switching.', linkText: 'Open Chat ↗', icon: Bot },
  { name: 'Workflow Market', route: '/exchange', desc: 'Discover & execute multi-step AI capabilities created by protocol developers.', linkText: 'Explore Market ↗', icon: Compass },
  { name: 'Model Hub', route: '/marketplace/models', desc: 'Compare latency, benchmark scores, and sub-penny pricing across 400+ model hosts.', linkText: 'Compare Models ↗', icon: Cpu },
  { name: 'AI Vault & Payment Suite', route: '/balance', desc: 'Manage Web3 AI funds, Circle Gateway deposits, Mpay gasless transfers, and 5% MRDN cashback.', linkText: 'Manage Vault ↗', icon: Coins },
  { name: 'Workflow Builder', route: '/studio', desc: 'Build, parameterize, and monetize custom multi-step AI workflow templates.', linkText: 'Launch Studio ↗', icon: Layers },
  { name: 'Dev Hub & API Console', route: '/developer', desc: 'OpenAI-compatible REST APIs (`api.mrdn.finance/v1/inference`), MCP server, and x402 headers.', linkText: 'Dev Docs ↗', icon: Terminal },
  { name: 'Command Centre', route: '/auth', desc: 'Dual EVM & Solana Web3 wallet authentication and account management hub.', linkText: 'Sign In ↗', icon: KeyRound },
];

export default function EcosystemAlignmentPage() {
  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 gap-12 sm:gap-16 select-none pb-28 min-w-0">
      
      {/* Hero Brand Section */}
      <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-950/40 via-[#121216] to-[#0B0B0F] border border-purple-500/30 p-5 sm:p-10 shadow-2xl space-y-6 sm:space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4 min-w-0">
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-300 prismatic-glow shrink-0">
              <NexusLogoMark className="h-6 w-6 sm:h-7 sm:w-7 text-purple-300" />
            </div>
            <div className="space-y-2 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-3xl font-display font-bold text-white tracking-tight truncate">
                  Ecosystem Alignment
                </h1>
                <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/30 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider shrink-0 shadow-sm">
                  <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400 animate-pulse" />
                  100% Meridian Protocol Native
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
                Official specification detailing how <strong className="text-emerald-400">Nexus</strong> serves as the unified Intelligence, AI Inference, and Workflow Presentation Layer <strong className="text-white">powered by the Meridian Ecosystem (`mrdn.finance`)</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/chat" className="flex-1 sm:flex-none">
              <Button variant="primary" size="sm" className="w-full sm:w-auto font-bold text-xs flex items-center justify-center gap-2 px-4 py-2 shadow-lg">
                <Sparkles className="h-3.5 w-3.5" />
                Launch AI Playground
              </Button>
            </Link>
            <a
              href="https://mrdn.finance/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-3.5 py-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-white rounded-xl transition-all inline-flex items-center justify-center gap-1.5"
            >
              <span>mrdn.finance</span>
              <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
            </a>
          </div>
        </div>

        {/* Meridian Brand Token Values Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-3 border-t border-zinc-800/80 pt-6 relative z-10 text-[10px] sm:text-xs font-mono">
          <div className="flex flex-col gap-1 sm:gap-0.5 truncate">
            <span className="text-zinc-500 uppercase truncate">Protocol Brand</span>
            <span className="text-emerald-400 font-bold truncate">Meridian (`$MRDN`)</span>
          </div>
          <div className="flex flex-col gap-1 sm:gap-0.5 truncate">
            <span className="text-zinc-500 uppercase truncate">Payment Protocol</span>
            <span className="text-white font-bold truncate">x402 Facilitator v2</span>
          </div>
          <div className="flex flex-col gap-1 sm:gap-0.5 truncate">
            <span className="text-zinc-500 uppercase truncate">Gasless Rail</span>
            <span className="text-emerald-400 font-bold truncate">Mpay EIP-2612</span>
          </div>
          <div className="flex flex-col gap-1 sm:gap-0.5 truncate">
            <span className="text-zinc-500 uppercase truncate">Nanopayments Rail</span>
            <span className="text-white font-bold truncate">Circle Gateway</span>
          </div>
        </div>
      </div>

      {/* System Division of Responsibilities */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-4">
          <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          <span>Division of System Responsibilities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meridian Infrastructure Card */}
          <Card className="bg-[#141416]/90 backdrop-blur-xl border border-zinc-800/90 rounded-3xl p-5 sm:p-8 space-y-5 shadow-xl hover:border-zinc-700 transition-all flex flex-col h-full">
            <h3 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-emerald-400" />
              <span>Meridian Protocol Layer</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex-1">
              Coordinates <strong className="text-zinc-200">value, multi-chain liquidity, payment routing, and settlement infrastructure</strong> across the 7 core Meridian ecosystem services:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 font-mono pt-2">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>mrdn.finance</strong> — Main protocol hub & token rotators</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>pay.mrdn.finance</strong> — Mpay EIP-2612 gasless transfers</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>nanopayments.mrdn.finance</strong> — Circle Gateway 11-chain USDC</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>mrdn.finance/auth</strong> — EVM & Solana Command Centre</span>
              </li>
            </ul>
          </Card>

          {/* Nexus Presentation & Intelligence Layer Card */}
          <Card className="bg-[#141416]/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-5 sm:p-8 space-y-5 shadow-xl hover:border-emerald-500/50 transition-all flex flex-col h-full">
            <h3 className="font-display font-bold text-base sm:text-lg text-emerald-400 flex items-center gap-2">
              <NexusLogoMark className="h-5 w-5 text-emerald-400" />
              <span>Meridian Nexus Layer</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex-1">
              Coordinates <strong className="text-zinc-200">intelligence, AI model execution, workflow orchestration, and user interaction</strong> powered by Meridian settlement:
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 font-mono pt-2">
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>Inference Hub (`/chat`)</strong> — Sub-penny model sandbox</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>Model Hub (`/marketplace/models`)</strong> — 400+ model comparison</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>AI Vault (`/balance`)</strong> — Multi-rail top-up & 5% cashback</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-tight"><strong>Workflow Builder (`/studio`)</strong> — Visual drag-and-drop studio</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* System Alignment Visual Diagram */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-4">
          <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          <span>System Alignment Architecture Map</span>
        </h2>

        <div className="bg-[#141416] border border-zinc-800/90 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl font-mono text-xs">
          
          {/* Top Layer */}
          <div className="bg-zinc-950 border border-emerald-500/30 p-4 sm:p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-3 gap-2">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest truncate">Presentation & Intelligence Suite</span>
              <span className="text-[10px] text-zinc-500 hidden sm:block">APPLICATION LAYER</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-white block">MERIDIAN NEXUS SUITE</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 text-[10px] sm:text-[11px]">
              <span className="bg-zinc-900/80 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold truncate">Inference Hub</span>
              <span className="bg-zinc-900/80 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold truncate">Workflow Market</span>
              <span className="bg-zinc-900/80 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold truncate">Model Hub</span>
              <span className="bg-zinc-900/80 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold truncate">Workflow Builder</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-emerald-400/70 font-bold gap-2 my-4">
            <span className="text-[9px] sm:text-[10px] text-zinc-500 font-mono tracking-widest text-center px-4">x402 SESSION AUTHORIZATION & TELEMETRY</span>
            <span className="text-lg">↓</span>
          </div>

          {/* Bottom Layer */}
          <div className="bg-zinc-950 border border-zinc-800 p-4 sm:p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-3 gap-2">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest truncate">Value & Settlement Infrastructure</span>
              <span className="text-[10px] text-zinc-500 hidden sm:block">PROTOCOL LAYER</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-emerald-400 block">MERIDIAN PROTOCOL ENGINE</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1 text-[10px] sm:text-[11px]">
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-emerald-300 text-center font-semibold truncate">x402 Facilitator v2</span>
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-emerald-300 text-center font-semibold truncate">Mpay Gasless</span>
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-emerald-300 text-center font-semibold truncate">Circle Gateway</span>
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-emerald-300 text-center font-semibold truncate">Command Centre</span>
            </div>
          </div>

        </div>
      </section>

      {/* The 4 Core Meridian Payment Modalities in Nexus */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-4">
          <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          <span>Alignment Across Meridian's 4 Payment Modalities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Modality 1 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 sm:p-6 flex flex-col gap-4 hover:border-emerald-500/40 transition-all h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="h-4.5 w-4.5 text-emerald-400" />
                1. Instant x402 Payments
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full w-fit">
                instant.mrdn.finance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex-1">
              Per-request prompt billing using `X-PAYMENT-AUTHORIZATION` HTTP headers. Enables model execution with zero repeated wallet confirmation popups using single session authorizations.
            </p>
          </Card>

          {/* Modality 2 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 sm:p-6 flex flex-col gap-4 hover:border-emerald-500/40 transition-all h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="h-4.5 w-4.5 text-emerald-400" />
                2. Circle Gateway Nanopayments
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full w-fit">
                nanopayments.mrdn.finance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex-1">
              Multi-chain USDC deposit & withdrawal hub integrated into the Nexus AI Vault (`/balance`). Supports 11 chains (Base, Ethereum, Arbitrum, Optimism, Avalanche, Polygon, Unichain, etc.).
            </p>
          </Card>

          {/* Modality 3 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 sm:p-6 flex flex-col gap-4 hover:border-emerald-500/40 transition-all h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Send className="h-4.5 w-4.5 text-emerald-400" />
                3. Mpay Gasless Transfers
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full w-fit">
                pay.mrdn.finance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex-1">
              Gasless token transfer keypad powered by EIP-2612 permit signatures. Enables instant peer-to-peer transfers and creator workflow tipping without ETH gas.
            </p>
          </Card>

          {/* Modality 4 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 sm:p-6 flex flex-col gap-4 hover:border-emerald-500/40 transition-all h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Coins className="h-4.5 w-4.5 text-emerald-400" />
                4. MRDN Token Utility & Cashback
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full w-fit">
                0% MRDN FEE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex-1">
              Top up using <strong className="text-emerald-400">MRDN for 0% top-up fee</strong> (vs 0.5% for USDC). Every model execution automatically earns <strong className="text-emerald-400">5% MRDN Token Cashback</strong> credited to the wallet.
            </p>
          </Card>
        </div>
      </section>

      {/* Complete Nexus Workspace Routing Matrix */}
      <section className="space-y-6">
        <h2 className="text-lg sm:text-xl font-display font-bold text-white flex items-center gap-2 border-b border-zinc-800/80 pb-4">
          <Compass className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-400" />
          <span>Nexus Workspaces & Routing Matrix</span>
        </h2>

        <div className="bg-[#141416] border border-zinc-800/90 rounded-3xl overflow-hidden shadow-2xl">
          {/* Mobile view (stacked cards) */}
          <div className="block md:hidden divide-y divide-zinc-800/60">
            {WORKSPACES.map((workspace, idx) => (
              <div key={idx} className="p-4 space-y-3">
                <div className="flex items-center justify-between min-w-0">
                  <div className="flex items-center gap-2 font-bold text-white truncate">
                    <workspace.icon className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="truncate">{workspace.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                    {workspace.route}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{workspace.desc}</p>
                <div className="pt-2 flex justify-end">
                  <Link to={workspace.route} className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">
                    {workspace.linkText}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop view (table) */}
          <div className="hidden md:block overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800/90 text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-5 font-bold">Workspace Name</th>
                  <th className="py-4 px-5 font-bold">Route</th>
                  <th className="py-4 px-5 font-bold">Primary Function & Capability</th>
                  <th className="py-4 px-5 font-bold text-right whitespace-nowrap">Ecosystem Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300 font-sans">
                {WORKSPACES.map((workspace, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/60 transition-colors">
                    <td className="py-4 px-5 font-bold text-white flex items-center gap-2 whitespace-nowrap">
                      <workspace.icon className="h-4.5 w-4.5 text-emerald-400" />
                      {workspace.name}
                    </td>
                    <td className="py-4 px-5 font-mono text-emerald-400 font-semibold">{workspace.route}</td>
                    <td className="py-4 px-5 text-zinc-400 leading-relaxed min-w-[300px]">{workspace.desc}</td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <Link to={workspace.route} className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">
                        {workspace.linkText}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Official Meridian Reference Links Footer Card */}
      <div className="bg-[#141416] border border-zinc-800/90 rounded-3xl p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 shadow-2xl mt-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <NexusLogoMark className="h-6 w-6 sm:h-7 sm:w-7 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-bold text-sm sm:text-base text-white truncate">Meridian Protocol Official References</h3>
            <p className="text-xs text-zinc-400 mt-1 leading-relaxed">Explore live protocol sites, documentation, and payment reference implementations.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap shrink-0 w-full sm:w-auto">
          <a
            href="https://mrdn.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 text-xs font-mono text-emerald-400 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 font-bold"
          >
            <span>mrdn.finance</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://docs.mrdn.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 sm:py-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 text-xs font-mono text-emerald-400 rounded-xl transition-all inline-flex items-center justify-center gap-1.5 font-bold"
          >
            <span>docs.mrdn.finance</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
