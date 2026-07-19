import React from 'react';
import { Card } from '../components/ui/Card';
import { BookOpen, ShieldCheck, Coins, Sparkles, Layers, Cpu, HelpCircle } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Header */}
      <div className="flex flex-col gap-1 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#27F293]" />
          <h1 className="text-xl font-display font-bold text-zinc-100">Meridian Nexus Documentation</h1>
        </div>
        <p className="text-xs text-zinc-400">
          Learn how Meridian coordinates value movement and how Nexus coordinates AI capabilities and verified outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#27F293]" />
            Dolphin Free Experience
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Dolphin 8x7B is an unmetered, zero-cost AI model available to all community members. Use it for unlimited general chat without requiring funds in your AI balance.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Cpu className="h-4 w-4 text-emerald-400" />
            AntSeed Model Marketplace
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            AntSeed provides access to frontier models (Claude 3.5 Sonnet, GPT-4o, DeepSeek R1). Prompts are billed based on exact input and output token counts.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <Coins className="h-4 w-4 text-[#27F293]" />
            Multichain Top-Up & 1% Fee
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Fund your universal dollar balance from Base, Ethereum, Arbitrum, Polygon, and more. A configurable 1% Meridian Top-Up Fee applies to converted deposits.
          </p>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-3">
          <h3 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Session Authorization & x402 Receipts
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Approve a spending session once with your wallet. Interact continuously without signing every message. Every completed run produces a machine-readable outcome receipt.
          </p>
        </Card>
      </div>

    </div>
  );
}
