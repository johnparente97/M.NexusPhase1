import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Terminal, Key, Copy, Code, Info, Globe, ExternalLink, BookOpen } from 'lucide-react';
import { useToast } from '../components/ui/Toast';
import { TruthStateBadge } from '../components/common/TruthStateBadge';

export default function DevConsole() {
  const [apiKey] = useState('nexus_test_demo_key_9f82a1b4c3d2e5f67890');
  const { toast } = useToast();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast('Demo API key copied to clipboard!', 'info');
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none pb-20">
      
      {/* Header */}
      <div className="flex flex-col gap-2 border-b border-white/[0.07] pb-6">
        <div className="flex items-center gap-3">
          <Terminal className="h-6 w-6 text-violet-400" />
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Developer Console & APIs</h1>
          <TruthStateBadge status="connected" text="API Sandbox Ready" />
        </div>
        <p className="text-xs sm:text-sm text-zinc-400">
          Programmatic access to Nexus AI models, agent tools, cloud storage, compute orchestration, and x402 payment headers.
        </p>
      </div>

      {/* API Key Box */}
      <Card className="bg-[#14141E] border-white/[0.07] p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Key className="h-4 w-4 text-violet-400" />
            Developer API Key
          </h3>
          <Badge variant="outline" className="text-[10px] font-mono border-violet-500/30 text-violet-300">DEMO SANDBOX</Badge>
        </div>
        <p className="text-xs text-zinc-400">
          Use this key for x402 HTTP header authorization, or supply your Web3 session signature directly per prompt execution.
        </p>
        <div className="flex items-center gap-3">
          <Input value={apiKey} readOnly className="font-mono text-xs text-zinc-300 flex-1 bg-zinc-950" />
          <Button variant="secondary" size="md" onClick={handleCopyKey} className="shrink-0 text-xs font-semibold flex items-center gap-1.5">
            <Copy className="h-3.5 w-3.5" />
            Copy Key
          </Button>
        </div>
      </Card>

      {/* Protocol Compatibility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200">Model Context Protocol (MCP)</span>
            <Badge variant="info" className="text-[9px]">LIVE SERVER</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Expose & consume tools, datasets, prompts, and workflows across AI client desktop apps.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200">OpenAI-Compatible API</span>
            <Badge variant="success" className="text-[9px]">100% COMPATIBLE</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Drop-in replacement for OpenAI endpoints (`api.nexus.app/v1/inference`).
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200">x402 Facilitator v2</span>
            <Badge variant="success" className="text-[9px]">MULTI-CHAIN</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Pay-per-token settlement and outcome receipts on Base, Arbitrum, Optimism, & Solana.
          </p>
        </Card>
      </div>

      {/* Official x402 Reference Demos Card */}
      <Card className="bg-gradient-to-br from-violet-950/20 via-[#14141E] to-[#0E0E14] border-violet-500/30 p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-violet-400" />
            <h3 className="text-sm font-semibold text-white font-display">
              x402 Payment Reference Specifications & Documentation
            </h3>
          </div>
          <a
            href="https://x402.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 font-mono"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>x402 Spec ↗</span>
          </a>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Inspect reference implementations for cross-chain x402 settlement, same-chain Base Sepolia payments, and Solana SPL token headers:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-[#0E0E14] border border-violet-500/30 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-violet-300">Cross-Chain x402</span>
              <ExternalLink className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <span className="text-[10px] text-zinc-400">Multi-source EVM payment headers</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E0E14] border border-white/[0.06] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-200">Same-Chain x402</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            </div>
            <span className="text-[10px] text-zinc-400">Base Sepolia EIP-712 auth flow</span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0E0E14] border border-white/[0.06] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-200">Solana x402 Route</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            </div>
            <span className="text-[10px] text-zinc-400">SOL & SPL token header flow</span>
          </div>
        </div>
      </Card>

      {/* Canonical API Curl Request */}
      <Card className="bg-[#14141E] border-white/[0.07] p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Code className="h-4 w-4 text-violet-400" />
            Canonical Nexus Inference API Request
          </h3>
          <span className="text-[10px] font-mono text-violet-400 font-bold">POST api.nexus.app/v1/inference</span>
        </div>
        <div className="bg-[#0E0E14] p-4 rounded-xl border border-white/[0.06] font-mono text-xs text-violet-300 overflow-x-auto">
          <pre>{`curl -X POST https://api.nexus.app/v1/inference \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "X-PAYMENT-AUTHORIZATION: eip712_signature_hash_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-r1",
    "messages": [{"role": "user", "content": "Analyze digital service economics"}]
  }'`}</pre>
        </div>
      </Card>

    </div>
  );
}


