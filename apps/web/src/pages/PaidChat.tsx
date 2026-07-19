import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ANTSEED_MODEL_CATALOG, AntSeedModel } from '../adapters/antseed/adapter';
import { MeteringEngine, MeteredRequestReceipt } from '../adapters/pricing/metering';
import { ModelRouterService, RoutingPriority } from '../services/model-router';
import { MeridianRouterAdapter, SessionAuthorization } from '../adapters/meridian/router';
import {
  Send,
  Square,
  Bot,
  User,
  Sparkles,
  ShieldCheck,
  Zap,
  Coins,
  Lock,
  ChevronDown,
  Settings,
  FileText,
  Clock,
  ArrowUpRight,
  Cpu,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/format';
import { useToast } from '../components/ui/Toast';

export interface PaidChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  modelUsed?: string;
  meteredReceipt?: MeteredRequestReceipt;
}

export default function PaidChat() {
  const [searchParams] = useSearchParams();
  const initialModelId = searchParams.get('model') || 'claude-3-5-sonnet';

  const [selectedModel, setSelectedModel] = useState<AntSeedModel>(() => {
    return ANTSEED_MODEL_CATALOG.find((m) => m.id === initialModelId) || ANTSEED_MODEL_CATALOG[1]!;
  });

  const [routingPriority, setRoutingPriority] = useState<RoutingPriority>('balanced');
  const [isAutoRouting, setIsAutoRouting] = useState(false);

  const [sessionAuth, setSessionAuth] = useState<SessionAuthorization>(() => {
    return MeridianRouterAdapter.createDefaultSessionAuth(5.0);
  });

  const [messages, setMessages] = useState<PaidChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: `Welcome to Nexus Paid AI Chat. I am ready to process your prompts using ${selectedModel.name}. Usage is metered per token and settled via your Meridian session authorization.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<MeteredRequestReceipt | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    // Check session budget limit
    if (sessionAuth.currentSessionSpend >= sessionAuth.maxSessionSpend) {
      toast('Session spending limit reached! Please increase budget in settings.', 'warning');
      return;
    }

    // Auto-Routing logic if enabled
    let activeModel = selectedModel;
    if (isAutoRouting) {
      const routed = ModelRouterService.selectModel(routingPriority, input, 'automatic');
      activeModel = routed.selectedModel;
      setSelectedModel(activeModel);
      toast(`Auto-routed to ${activeModel.name}: ${routed.reason}`, 'info');
    }

    const userText = input.trim();
    const userMsg: PaidChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsGenerating(true);

    const botMsgId = `bot-${Date.now()}`;
    const botPlaceholder: PaidChatMessage = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: activeModel.name,
    };

    setMessages((prev) => [...prev, botPlaceholder]);
    abortRef.current = new AbortController();

    // Simulated streamed completion for active model
    const simulatedReply = `Analysis by ${activeModel.name}:\n\nHere is the structured solution for "${userText.substring(0, 45)}...":\n\n1. **Model Specs**: Operating via AntSeed gateway with ${activeModel.contextWindow / 1000}k context window.\n2. **Token Efficiency**: Input processed in ${activeModel.latencyMs}ms.\n3. **Result Summary**: All output lines are verified and settled seamlessly against your Meridian session balance!`;

    const inputTokenCount = Math.max(12, Math.round(userText.length / 4));
    const words = simulatedReply.split(' ');
    let accumulatedText = '';

    try {
      for (let i = 0; i < words.length; i++) {
        if (abortRef.current?.signal.aborted) break;
        await new Promise((res) => setTimeout(res, 30));
        accumulatedText += (i === 0 ? '' : ' ') + words[i];

        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, content: accumulatedText } : m))
        );
      }

      // Finalize request metering
      const outputTokenCount = Math.max(20, Math.round(accumulatedText.length / 4));
      const receipt = MeteringEngine.calculateRequestCost(
        activeModel,
        inputTokenCount,
        outputTokenCount
      );

      setMessages((prev) =>
        prev.map((m) => (m.id === botMsgId ? { ...m, meteredReceipt: receipt } : m))
      );

      // Deduct from session authorized balance
      setSessionAuth((prev) => ({
        ...prev,
        currentSessionSpend: parseFloat((prev.currentSessionSpend + receipt.totalCharged).toFixed(4)),
      }));

      setActiveReceipt(receipt);
    } catch (err) {
      console.error('Paid chat generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      setIsGenerating(false);
      toast('Generation stopped. Metered cost calculated up to stop point.', 'info');
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[calc(100vh-4rem)] p-4 sm:p-6 gap-4 select-none">
      
      {/* Top Header Bar with Model Selector & Session Auth Budget Gauge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-900/70 border border-zinc-800 p-4 rounded-2xl shrink-0">
        
        {/* Model Switcher Dropdown */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Cpu className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">Active AntSeed Model</span>
            <select
              value={selectedModel.id}
              onChange={(e) => {
                const found = ANTSEED_MODEL_CATALOG.find((m) => m.id === e.target.value);
                if (found) setSelectedModel(found);
              }}
              className="bg-transparent text-sm font-display font-bold text-zinc-100 focus:outline-none cursor-pointer"
            >
              {ANTSEED_MODEL_CATALOG.map((m) => (
                <option key={m.id} value={m.id} className="bg-zinc-900 text-zinc-100">
                  {m.name} ({m.isFree ? 'Free' : `$${m.priceInputPerMillion}/1M tokens`})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Session Spending Authorization Status */}
        <div className="flex items-center gap-4 bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl text-xs shrink-0">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zinc-500 uppercase">Session Authorized Budget</span>
            <span className="font-mono font-bold text-emerald-400">
              {formatCurrency(sessionAuth.currentSessionSpend)} / {formatCurrency(sessionAuth.maxSessionSpend)}
            </span>
          </div>
          <Button to="/balance" variant="outline" size="sm" className="text-[10px] py-1 px-2 font-mono">
            Top Up
          </Button>
        </div>
      </div>

      {/* Streamed Messages Container */}
      <div className="flex-1 overflow-y-auto border border-zinc-800 bg-zinc-950/80 rounded-2xl p-4 flex flex-col gap-4 scrollbar-thin">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-3 max-w-3xl ${
              msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            <div
              className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs shrink-0 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-br from-indigo-500 to-[#27F293] text-zinc-950 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-indigo-400'
              }`}
            >
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`flex flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-zinc-800 text-zinc-100 rounded-tr-none'
                    : 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-tl-none whitespace-pre-wrap font-sans'
                }`}
              >
                {msg.content || (
                  <span className="text-zinc-500 italic flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
                    {selectedModel.name} streaming completion...
                  </span>
                )}
              </div>

              {/* Per-Turn Usage Metering Receipt Tag */}
              {msg.meteredReceipt && (
                <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-lg text-[9px] font-mono text-zinc-400">
                  <span>Tokens: {msg.meteredReceipt.inputTokens} in / {msg.meteredReceipt.outputTokens} out</span>
                  <span>•</span>
                  <span className="text-[#27F293] font-bold">Cost: {formatCurrency(msg.meteredReceipt.totalCharged)}</span>
                  <span>•</span>
                  <span className="text-emerald-400">+{msg.meteredReceipt.mrdnCashbackEarned} MRDN</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Form Bar */}
      <form onSubmit={handleSend} className="flex items-center gap-2 shrink-0 bg-zinc-900/90 border border-zinc-800 p-2 rounded-2xl">
        <input
          type="text"
          placeholder={`Prompt ${selectedModel.name} (input: $${selectedModel.priceInputPerMillion}/1M, output: $${selectedModel.priceOutputPerMillion}/1M)...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isGenerating}
          className="flex-1 bg-transparent border-none text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none px-3 font-sans"
        />

        {isGenerating ? (
          <Button type="button" variant="secondary" size="sm" onClick={handleStop} className="text-xs text-rose-400 font-semibold">
            <Square className="h-3.5 w-3.5 fill-current" />
            Stop
          </Button>
        ) : (
          <Button type="submit" variant="primary" size="sm" disabled={!input.trim()} className="font-bold flex items-center gap-1">
            Send
            <Send className="h-3.5 w-3.5" />
          </Button>
        )}
      </form>
    </div>
  );
}
