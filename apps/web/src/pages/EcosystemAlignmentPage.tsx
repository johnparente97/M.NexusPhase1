import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { NexusLogoMark } from '../components/common/NexusLogoMark';
import {
  ShieldCheck,
  Zap,
  Coins,
  Bot,
  Layers,
  Compass,
  Terminal,
  ExternalLink,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
  Globe,
  Send,
  Cpu,
  KeyRound,
  FileCode2,
  Check,
  Flame,
} from 'lucide-react';

export default function EcosystemAlignmentPage() {
  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 gap-12 select-none pb-28">
      
      {/* Hero Brand Section with Meridian Prismatic Background Glow */}
      <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/50 via-[#121214] to-[#0b0b0c] border border-emerald-500/30 p-6 sm:p-10 shadow-2xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 prismatic-glow shrink-0">
              <NexusLogoMark className="h-7 w-7 text-[#27F293]" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Ecosystem Alignment & System Specification
                </h1>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  100% Meridian Protocol Native
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-3xl leading-relaxed">
                Official specification detailing how <strong className="text-emerald-400">Meridian Nexus</strong> serves as the unified Intelligence, AI Inference, and Workflow Presentation Layer for the <strong className="text-white">Meridian Ecosystem (`mrdn.finance`)</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link to="/chat">
              <Button variant="primary" size="sm" className="font-bold text-xs flex items-center gap-2 px-4 py-2 shadow-lg">
                <Sparkles className="h-3.5 w-3.5" />
                Launch AI Playground
              </Button>
            </Link>
            <a
              href="https://mrdn.finance/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-white rounded-xl transition-all inline-flex items-center gap-1.5"
            >
              <span>mrdn.finance</span>
              <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
            </a>
          </div>
        </div>

        {/* Meridian Brand Token Values Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-zinc-800/80 pt-6 relative z-10 text-xs font-mono">
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 text-[10px] uppercase">Protocol Brand</span>
            <span className="text-emerald-400 font-bold">Meridian (`$MRDN`)</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 text-[10px] uppercase">Payment Protocol</span>
            <span className="text-white font-bold">x402 Facilitator v2</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 text-[10px] uppercase">Gasless Rail</span>
            <span className="text-emerald-400 font-bold">Mpay EIP-2612</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-zinc-500 text-[10px] uppercase">Nanopayments Rail</span>
            <span className="text-white font-bold">Circle Gateway</span>
          </div>
        </div>

      </div>

      {/* System Division of Responsibilities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>Division of System Responsibilities</span>
          </h2>
          <span className="text-xs font-mono text-zinc-500">ARCHITECTURE SPEC</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meridian Infrastructure Card */}
          <div className="bg-[#141416]/90 backdrop-blur-xl border border-zinc-800/90 rounded-3xl p-6 space-y-4 shadow-xl hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                <Globe className="h-5 w-5 text-emerald-400" />
                <span>Meridian Protocol Layer</span>
              </h3>
              <Badge variant="info" className="text-[9px] font-mono">SETTLEMENT ENGINE</Badge>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Coordinates <strong className="text-zinc-200">value, multi-chain liquidity, payment routing, and settlement infrastructure</strong> across the 7 core Meridian ecosystem services:
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 font-mono pt-1">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>mrdn.finance</strong> — Main protocol hub & token rotators</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>pay.mrdn.finance</strong> — Mpay EIP-2612 gasless transfers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>nanopayments.mrdn.finance</strong> — Circle Gateway 11-chain USDC</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>mrdn.finance/auth</strong> — EVM & Solana Command Centre</span>
              </li>
            </ul>
          </div>

          {/* Nexus Presentation & Intelligence Layer Card */}
          <div className="bg-[#141416]/90 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 space-y-4 shadow-xl hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="font-display font-bold text-base text-emerald-400 flex items-center gap-2">
                <NexusLogoMark className="h-5 w-5 text-emerald-400" />
                <span>Meridian Nexus Layer</span>
              </h3>
              <Badge variant="success" className="text-[9px] font-mono">INTELLIGENCE SUITE</Badge>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Coordinates <strong className="text-zinc-200">intelligence, AI model execution, workflow orchestration, and user interaction</strong> powered by Meridian settlement:
            </p>
            <ul className="space-y-2 text-xs text-zinc-300 font-mono pt-1">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Inference Hub (`/chat`)</strong> — Sub-penny model sandbox</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Model Hub (`/marketplace/models`)</strong> — 400+ model comparison</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>AI Vault (`/balance`)</strong> — Multi-rail top-up & 5% cashback</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span><strong>Workflow Builder (`/studio`)</strong> — Visual drag-and-drop studio</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* System Alignment Visual Diagram */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Layers className="h-5 w-5 text-emerald-400" />
          <span>System Alignment Architecture Map</span>
        </h2>

        <div className="bg-[#141416] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl font-mono text-xs">
          
          {/* Top Layer */}
          <div className="bg-zinc-950 border border-emerald-500/30 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">Presentation & Intelligence Suite</span>
              <span className="text-[10px] text-zinc-500">APPLICATION LAYER</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-white block">MERIDIAN NEXUS SUITE</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <span className="bg-zinc-900/80 px-3 py-2 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold">Inference Hub (/chat)</span>
              <span className="bg-zinc-900/80 px-3 py-2 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold">Workflow Market (/exchange)</span>
              <span className="bg-zinc-900/80 px-3 py-2 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold">Model Hub (/marketplace/models)</span>
              <span className="bg-zinc-900/80 px-3 py-2 rounded-xl text-zinc-300 border border-zinc-800 text-center font-semibold">Workflow Builder (/studio)</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-emerald-400 font-bold gap-1 my-2">
            <span className="text-[10px] text-zinc-500 font-mono">x402 SESSION AUTHORIZATION & TELEMETRY</span>
            <span className="h-6 w-px bg-emerald-500/50" />
          </div>

          {/* Bottom Layer */}
          <div className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Value & Settlement Infrastructure</span>
              <span className="text-[10px] text-zinc-500">PROTOCOL LAYER</span>
            </div>
            <span className="text-sm sm:text-base font-bold text-emerald-400 block">MERIDIAN PROTOCOL ENGINE</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-3 py-2 rounded-xl text-emerald-300 text-center font-semibold">x402 Facilitator v2</span>
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-3 py-2 rounded-xl text-emerald-300 text-center font-semibold">Mpay Gasless</span>
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-3 py-2 rounded-xl text-emerald-300 text-center font-semibold">Circle Gateway</span>
              <span className="bg-emerald-950/30 border border-emerald-500/30 px-3 py-2 rounded-xl text-emerald-300 text-center font-semibold">Command Centre</span>
            </div>
          </div>

        </div>
      </div>

      {/* The 4 Core Meridian Payment Modalities in Nexus */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Coins className="h-5 w-5 text-emerald-400" />
          <span>Alignment Across Meridian's 4 Payment Modalities</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Modality 1 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 flex flex-col gap-3 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                1. Instant x402 Payments
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                instant.mrdn.finance
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Per-request prompt billing using `X-PAYMENT-AUTHORIZATION` HTTP headers. Enables model execution with zero repeated wallet confirmation popups using single session authorizations.
            </p>
          </Card>

          {/* Modality 2 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 flex flex-col gap-3 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-400" />
                2. Circle Gateway Nanopayments
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                nanopayments.mrdn.finance
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Multi-chain USDC deposit & withdrawal hub integrated into the Nexus AI Vault (`/balance`). Supports 11 chains (Base, Ethereum, Arbitrum, Optimism, Avalanche, Polygon, Unichain, etc.).
            </p>
          </Card>

          {/* Modality 3 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 flex flex-col gap-3 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Send className="h-4 w-4 text-emerald-400" />
                3. Mpay Gasless Transfers
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                pay.mrdn.finance
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Gasless token transfer keypad powered by EIP-2612 permit signatures. Enables instant peer-to-peer transfers and creator workflow tipping without ETH gas.
            </p>
          </Card>

          {/* Modality 4 */}
          <Card className="bg-[#141416] border-zinc-800/80 p-5 flex flex-col gap-3 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Coins className="h-4 w-4 text-emerald-400" />
                4. MRDN Token Utility & Cashback
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                0% MRDN FEE
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Top up using <strong className="text-emerald-400">MRDN for 0% top-up fee</strong> (vs 0.5% for USDC). Every model execution automatically earns <strong className="text-emerald-400">5% MRDN Token Cashback</strong> credited to the wallet.
            </p>
          </Card>

        </div>
      </div>

      {/* Complete Nexus Workspace Routing Matrix */}
      <div className="space-y-4">
        <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
          <Compass className="h-5 w-5 text-emerald-400" />
          <span>Nexus Workspaces & Routing Matrix</span>
        </h2>

        <div className="bg-[#141416] border border-zinc-800/90 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-950 border-b border-zinc-800/90 text-zinc-400 font-mono uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-5 font-bold">Workspace Name</th>
                  <th className="py-4 px-5 font-bold">Route</th>
                  <th className="py-4 px-5 font-bold">Primary Function & Capability</th>
                  <th className="py-4 px-5 font-bold text-right">Ecosystem Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300 font-sans">
                <tr className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <Bot className="h-4 w-4 text-emerald-400" />
                    Inference Hub
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">/chat</td>
                  <td className="py-3.5 px-5 text-zinc-400">Sub-penny prompt execution across open-weight AI models with live model switching.</td>
                  <td className="py-3.5 px-5 text-right">
                    <Link to="/chat" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">Open Chat ↗</Link>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <Compass className="h-4 w-4 text-emerald-400" />
                    Workflow Market
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">/exchange</td>
                  <td className="py-3.5 px-5 text-zinc-400">Discover & execute multi-step AI capabilities created by protocol developers.</td>
                  <td className="py-3.5 px-5 text-right">
                    <Link to="/exchange" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">Explore Market ↗</Link>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-emerald-400" />
                    Model Hub
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">/marketplace/models</td>
                  <td className="py-3.5 px-5 text-zinc-400">Compare latency, benchmark scores, and sub-penny pricing across 400+ model hosts.</td>
                  <td className="py-3.5 px-5 text-right">
                    <Link to="/marketplace/models" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">Compare Models ↗</Link>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <Coins className="h-4 w-4 text-emerald-400" />
                    AI Vault & Payment Suite
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">/balance</td>
                  <td className="py-3.5 px-5 text-zinc-400">Manage Web3 AI funds, Circle Gateway deposits, Mpay gasless transfers, and 5% MRDN cashback.</td>
                  <td className="py-3.5 px-5 text-right">
                    <Link to="/balance" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">Manage Vault ↗</Link>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    Workflow Builder
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">/studio</td>
                  <td className="py-3.5 px-5 text-zinc-400">Build, parameterize, and monetize custom multi-step AI workflow templates.</td>
                  <td className="py-3.5 px-5 text-right">
                    <Link to="/studio" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">Launch Studio ↗</Link>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    Dev Hub & API Console
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">/developer</td>
                  <td className="py-3.5 px-5 text-zinc-400">OpenAI-compatible REST APIs (`api.mrdn.finance/v1/inference`), MCP server, and x402 headers.</td>
                  <td className="py-3.5 px-5 text-right">
                    <Link to="/developer" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">Dev Docs ↗</Link>
                  </td>
                </tr>

                <tr className="hover:bg-zinc-900/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-white flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-emerald-400" />
                    Command Centre
                  </td>
                  <td className="py-3.5 px-5 font-mono text-emerald-400 font-semibold">/auth</td>
                  <td className="py-3.5 px-5 text-zinc-400">Dual EVM & Solana Web3 wallet authentication and account management hub.</td>
                  <td className="py-3.5 px-5 text-right">
                    <Link to="/auth" className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300">Sign In ↗</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Official Meridian Reference Links Footer Card */}
      <div className="bg-[#141416] border border-zinc-800/90 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <NexusLogoMark className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white">Meridian Protocol Official References</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Explore live protocol sites, documentation, and payment reference implementations.</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          <a
            href="https://mrdn.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 text-xs font-mono text-emerald-400 rounded-xl transition-all inline-flex items-center gap-1.5 font-bold"
          >
            <span>mrdn.finance</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href="https://docs.mrdn.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-zinc-950 border border-zinc-800 hover:border-emerald-500/40 text-xs font-mono text-emerald-400 rounded-xl transition-all inline-flex items-center gap-1.5 font-bold"
          >
            <span>docs.mrdn.finance</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
