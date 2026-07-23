import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Terminal, Key, Copy, Code, Info } from 'lucide-react';
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
            <Badge variant="success" className="text-[9px]">TESTNET</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Pay-per-token settlement and outcome receipts on Base Sepolia testnet.
          </p>
        </Card>
      </div>

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
