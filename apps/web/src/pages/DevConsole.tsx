import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Terminal, Key, Copy, Code, Info, Globe, ExternalLink, BookOpen } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export default function DevConsole() {
  const [apiKey] = useState('mrdn_live_9f82a1b4c3d2e5f678901234567890ab');
  const { toast } = useToast();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast('API key copied to clipboard!', 'info');
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-[#27F293]" />
          <h1 className="text-xl font-display font-bold text-zinc-100">Dev Hub & API Console</h1>
          <Badge variant="info" className="text-[10px] font-mono">x402 UNIFIED API</Badge>
        </div>
        <p className="text-xs text-zinc-400">
          Programmatic access to Nexus inference router capabilities powered by REST APIs, Model Context Protocol (MCP), and x402 authorization headers.
        </p>
      </div>

      {/* API Key Box */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Key className="h-4 w-4 text-[#27F293]" />
            API Key
          </h3>
          <Badge variant="success" className="text-[9px]">x402 ENABLED</Badge>
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
            Drop-in replacement for OpenAI endpoints (`api.mrdn.finance/v1/inference`).
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
      <Card className="bg-gradient-to-br from-emerald-950/20 via-zinc-900 to-zinc-950 border-emerald-500/30 p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-zinc-100 font-display">
              Official x402 Payment Reference Demos & Documentation
            </h3>
          </div>
          <a
            href="https://docs.mrdn.finance/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-mono"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>docs.mrdn.finance ↗</span>
          </a>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Inspect fully functional reference implementations for cross-chain x402 settlement, same-chain Base Sepolia payments, and Solana SPL token headers:
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <a
            href="https://demo.mrdn.finance/cross-chain"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-zinc-950/80 border border-emerald-500/30 hover:border-emerald-400 transition-all flex flex-col gap-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 group-hover:text-emerald-200">Cross-Chain x402</span>
              <ExternalLink className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <span className="text-[10px] text-zinc-400">Multi-source EVM payment headers</span>
          </a>

          <a
            href="https://demo.mrdn.finance/protected"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col gap-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200 group-hover:text-white">Same-Chain x402</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            </div>
            <span className="text-[10px] text-zinc-400">Base Sepolia EIP-712 auth flow</span>
          </a>

          <a
            href="https://demo.mrdn.finance/protected_solana"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col gap-1.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-200 group-hover:text-white">Solana x402 Route</span>
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
            </div>
            <span className="text-[10px] text-zinc-400">SOL & SPL token header flow</span>
          </a>
        </div>
      </Card>

      {/* Canonical API Curl Request */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Code className="h-4 w-4 text-emerald-400" />
            Canonical Inference API Request
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">POST api.mrdn.finance/v1/inference</span>
        </div>
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto">
          <pre>{`curl -X POST https://api.mrdn.finance/v1/inference \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "X-PAYMENT-AUTHORIZATION: eip712_signature_hash_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "deepseek-r1",
    "messages": [{"role": "user", "content": "Analyze protocol economics"}]
  }'`}</pre>
        </div>
      </Card>

    </div>
  );
}


