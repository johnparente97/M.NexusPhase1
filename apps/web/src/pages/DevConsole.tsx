import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Terminal, Key, Copy, Code, Info, Globe, ExternalLink } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export default function DevConsole() {
  const [apiKey] = useState('nx_demo_9f82a1b4c3d2e5f678901234567890ab');
  const { toast } = useToast();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast('Demo API key copied to clipboard!', 'info');
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-[#27F293]" />
          <h1 className="text-xl font-display font-bold text-zinc-100">Dev Hub</h1>
          <Badge variant="info" className="text-[10px] font-mono">DEVELOPER PREVIEW</Badge>
        </div>
        <p className="text-xs text-zinc-400">
          Programmatic access to Meridian Nexus capabilities via REST, SDKs, MCP, A2A, and x402 endpoints.
        </p>
      </div>

      {/* API Key Box */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Key className="h-4 w-4 text-[#27F293]" />
            Developer Preview Demo Key
          </h3>
          <Badge variant="warning" className="text-[9px]">DEMO KEY</Badge>
        </div>
        <p className="text-xs text-zinc-400">
          This key is provided for demonstration and integration testing purposes. Live production API credentials will be issued upon backend deployment.
        </p>
        <div className="flex items-center gap-3">
          <Input value={apiKey} readOnly className="font-mono text-xs text-zinc-300 flex-1 bg-zinc-950" />
          <Button variant="outline" size="md" onClick={handleCopyKey} className="shrink-0 text-xs font-semibold flex items-center gap-1.5">
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
            <Badge variant="info" className="text-[9px]">PREVIEW</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Expose & consume tools, datasets, prompts, and workflows across AI client clients.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200">Agent-to-Agent (A2A)</span>
            <Badge variant="info" className="text-[9px]">PREVIEW</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Autonomous agent task delegation, capability discovery, and result verification.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200">x402 Facilitator v2</span>
            <Badge variant="success" className="text-[9px]">LIVE TESTNET</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Pay-per-token settlement and outcome receipts on Base, Arbitrum, Optimism, & Solana.
          </p>
        </Card>
      </div>

      {/* Official Meridian x402 Reference Demos Card */}
      <Card className="bg-gradient-to-br from-emerald-950/20 via-zinc-900 to-zinc-950 border-emerald-500/30 p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-zinc-100 font-display">
              Meridian Official x402 Payment Reference Demos
            </h3>
          </div>
          <Badge variant="success" className="text-[9px]">LIVE DEMO DEPLOYED</Badge>
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

      {/* Example Curl Request */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Code className="h-4 w-4 text-emerald-400" />
            Example API Request (Demo Endpoint)
          </h3>
          <span className="text-[10px] font-mono text-zinc-500">POST /api/chat/completions</span>
        </div>
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto">
          <pre>{`curl -X POST https://api.meridian.nexus/v1/chat/completions \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "dolphin-mixtral-8x7b-free",
    "messages": [{"role": "user", "content": "Hello Meridian"}]
  }'`}</pre>
        </div>
      </Card>

    </div>
  );
}
