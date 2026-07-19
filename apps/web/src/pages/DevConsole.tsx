import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Terminal, Key, Webhook, Copy, CheckCircle2, Code, ShieldCheck, Zap } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export default function DevConsole() {
  const [apiKey] = useState('nx_live_9f82a1b4c3d2e5f678901234567890ab');
  const { toast } = useToast();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast('API key copied to clipboard!', 'success');
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-2">
          <Terminal className="h-5 w-5 text-[#27F293]" />
          <h1 className="text-xl font-display font-bold text-zinc-100">Developer & Integration Console</h1>
        </div>
        <p className="text-xs text-zinc-400">
          Programmatic access to Meridian Nexus capabilities via REST, SDKs, MCP, A2A, and x402 endpoints.
        </p>
      </div>

      {/* API Key Box */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
        <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
          <Key className="h-4 w-4 text-[#27F293]" />
          Production API Key
        </h3>
        <div className="flex items-center gap-3">
          <Input value={apiKey} readOnly className="font-mono text-xs text-zinc-300 flex-1" />
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
            <Badge variant="success" className="text-[9px]">ACTIVE</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Expose & consume tools, datasets, prompts, and workflows across AI client clients.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200">Agent2Agent (A2A)</span>
            <Badge variant="success" className="text-[9px]">ACTIVE</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Cross-framework agent coordination, task exchange, and status verification protocol.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-200">x402 Protocol v2</span>
            <Badge variant="success" className="text-[9px]">ACTIVE</Badge>
          </div>
          <p className="text-[11px] text-zinc-400">
            Programmatic HTTP payment negotiation & settlement via Meridian EVM facilitator.
          </p>
        </Card>
      </div>

      {/* Code Snippet Example */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-3">
        <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
          <Code className="h-4 w-4 text-emerald-400" />
          cURL API Example
        </h3>
        <pre className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl text-[11px] font-mono text-emerald-400 overflow-x-auto">
{`curl -X POST https://meridian-nexus-api.jrjohnparente.workers.dev/api/workflows/business-intelligence-mission/run \\
  -H "Authorization: Bearer nx_live_9f82a1b4c3d2e5f678901234567890ab" \\
  -H "Content-Type: application/json" \\
  -d '{"inputs": {"companyName": "Acme Corp"}}'`}
        </pre>
      </Card>

    </div>
  );
}
