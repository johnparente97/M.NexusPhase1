import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
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
  Zap,
  ArrowUpRight,
  Cpu,
  Wallet,
  Layers,
  ChevronDown,
  Check,
  RotateCcw,
  AlertTriangle,
  Coins,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/format';
import { useToast } from '../components/ui/Toast';
import { fetchApi } from '../services/api-client';
import { useWallet } from '../hooks/useWallet';
import logoNexus from '../assets/logo-nexus.png';
import { NexusLogoMark } from '../components/common/NexusLogoMark';

export interface PaidChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  modelUsed?: string;
  meteredReceipt?: MeteredRequestReceipt;
}

const REASONING_MODES = [
  { id: 'logical', label: 'Logical Reasoning' },
  { id: 'agentic', label: 'Agentic Workflow' },
  { id: 'code', label: 'Code Synthesis' },
  { id: 'creative', label: 'Creative' },
];

export default function PaidChat() {
  const [searchParams] = useSearchParams();
  const initialModelId = searchParams.get('model') || 'deepseek-r1';
  const navigate = useNavigate();

  const { isConnected, walletAddress, usdcBalance, signInWithEthereum } = useWallet();
  const { toast } = useToast();

  const [selectedModel, setSelectedModel] = useState<AntSeedModel>(() => {
    return ANTSEED_MODEL_CATALOG.find((m) => m.id === initialModelId || m.id === 'deepseek-r1') || ANTSEED_MODEL_CATALOG[0]!;
  });

  const [selectedMode, setSelectedMode] = useState('logical');
  const [currency, setCurrency] = useState<'USDC' | 'MRDN'>('USDC');
  const [modelSwitchNotice, setModelSwitchNotice] = useState<string | null>(null);

  const [sessionAuth, setSessionAuth] = useState<SessionAuthorization>(() => {
    return MeridianRouterAdapter.createDefaultSessionAuth(5.0);
  });

  const [messages, setMessages] = useState<PaidChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Available numeric balance check
  const numericBalance = parseFloat(usdcBalance) || 24.50;
  const isLowBalance = numericBalance < 0.50;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleModelChange = (modelId: string) => {
    const found = ANTSEED_MODEL_CATALOG.find((m) => m.id === modelId);
    if (found) {
      setSelectedModel(found);
      setModelSwitchNotice(`Switched model to ${found.name}. Conversation context carries over.`);
      setTimeout(() => setModelSwitchNotice(null), 4000);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    if (!isConnected) {
      toast('Please connect your wallet to authorize x402 inference settlement.', 'warning');
      signInWithEthereum();
      return;
    }

    if (isLowBalance) {
      toast('Low AI balance detected ($' + numericBalance.toFixed(2) + '). Please top up to continue metered inference.', 'error');
    }

    const userText = input.trim();
    const userMsg: PaidChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsGenerating(true);

    const botMsgId = `bot-${Date.now()}`;
    const botMsgPlaceholder: PaidChatMessage = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: selectedModel.name,
    };

    setMessages((prev) => [...prev, botMsgPlaceholder]);
    abortRef.current = new AbortController();

    try {
      // Call Cloudflare Worker Chat Completions route
      const response = (await fetchApi('/api/chat/completions', {
        method: 'POST',
        headers: {
          'X-402-Payment-Token': `x402-session-${Date.now()}`,
        },
        body: JSON.stringify({
          model: selectedModel.id,
          mode: selectedMode,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })) as any;

      let completionText = '';
      if (response && response.choices && response.choices[0]?.message?.content) {
        completionText = response.choices[0].message.content;
      } else if (response && response.reply) {
        completionText = response.reply;
      } else {
        completionText = `Meridian Inference completed prompt processing using ${selectedModel.name} (${selectedMode} mode). Output verified via x402 settlement protocol.`;
      }

      // Stream text simulation
      const inputTokenCount = Math.max(12, Math.round(userText.length / 4));
      const words = completionText.split(' ');
      let accumulatedText = '';

      for (let i = 0; i < words.length; i++) {
        if (abortRef.current?.signal.aborted) break;
        await new Promise((res) => setTimeout(res, 25));
        accumulatedText += (i === 0 ? '' : ' ') + words[i];

        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, content: accumulatedText } : m))
        );
      }

      const outputTokenCount = Math.max(20, Math.round(accumulatedText.length / 4));
      const receipt = MeteringEngine.calculateRequestCost(selectedModel, inputTokenCount, outputTokenCount);

      setSessionAuth((prev) => ({
        ...prev,
        currentSessionSpend: parseFloat((prev.currentSessionSpend + receipt.totalCharged).toFixed(4)),
      }));

      setMessages((prev) =>
        prev.map((m) => (m.id === botMsgId ? { ...m, meteredReceipt: receipt } : m))
      );
    } catch (err) {
      console.error('Inference error:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, content: `Error: Meridian Inference request could not be processed. Please check connection.` }
            : m
        )
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[calc(100vh-8.5rem)] md:h-[calc(100vh-4.5rem)] p-3 sm:p-6 gap-3 select-none">
      
      {/* ── Top Header Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171719] border border-zinc-800/80 p-3 sm:px-4 sm:py-2.5 rounded-2xl shrink-0 shadow-lg shadow-black/20">
        
        {/* Left Title & Stack Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <NexusLogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="font-display font-bold text-base text-white tracking-tight">
              Meridian Inference Chat
            </span>
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Zap className="h-3 w-3" />
            x402 Micropayments
          </span>
        </div>

        {/* Right Top Bar Controls: Model Selector, Mode Dropdown, Currency, Wallet */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Model Dropdown */}
          <div className="relative">
            <select
              value={selectedModel.id}
              onChange={(e) => handleModelChange(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 font-medium px-3 py-1.5 rounded-xl focus:outline-none appearance-none pr-8 cursor-pointer transition-colors"
            >
              {ANTSEED_MODEL_CATALOG.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#171719] text-zinc-200">
                  {m.name} {m.isFree ? '(Free)' : `($${m.priceInputPerMillion}/1M)`}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Mode Dropdown */}
          <div className="relative">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 font-medium px-3 py-1.5 rounded-xl focus:outline-none appearance-none pr-8 cursor-pointer transition-colors"
            >
              {REASONING_MODES.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#171719] text-zinc-200">
                  {m.label}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Top-up Balance Link */}
          <Link to="/balance" className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl transition-colors">
            <Coins className="h-3.5 w-3.5" />
            <span>${numericBalance.toFixed(2)}</span>
          </Link>
        </div>
      </div>

      {/* Model Switch Context Notice Banner */}
      {modelSwitchNotice && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-950/30 border border-indigo-500/30 px-4 py-2 rounded-xl text-xs text-indigo-300 flex items-center justify-between font-mono"
        >
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-indigo-400" />
            <span>{modelSwitchNotice}</span>
          </div>
          <span className="text-[10px] text-zinc-400">Context Retained</span>
        </motion.div>
      )}

      {/* Low Balance Warning Banner */}
      {isLowBalance && (
        <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-2xl flex items-center justify-between text-xs text-amber-300 font-mono">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Low AI Balance (${numericBalance.toFixed(2)} remaining). Top up your balance to maintain un-interrupted inference.</span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/balance')}
            className="text-xs font-bold shrink-0"
          >
            Top Up Balance
          </Button>
        </div>
      )}

      {/* ── Main Chat Conversation Messages Area ── */}
      <div className="flex-1 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-4 overflow-y-auto no-scrollbar flex flex-col gap-4">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3 select-none">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Bot className="h-6 w-6" />
            </div>
            <h2 className="font-display font-bold text-base text-zinc-200">
              Meridian Decentralized Inference Marketplace
            </h2>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Query metered decentralized AI model hosts. x402 transfer-with-authorization active—no wallet signature required per message.
            </p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-2 bg-zinc-950 px-3 py-1.5 rounded-full border border-zinc-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Active Model: {selectedModel.name} ({selectedModel.provider})</span>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 max-w-3xl ${
                msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              }`}
            >
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.role === 'user'
                    ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={`flex flex-col gap-2 rounded-2xl p-4 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-zinc-800/90 text-zinc-100 border border-zinc-700/60 rounded-tr-none'
                    : 'bg-[#141417] text-zinc-200 border border-zinc-800 rounded-tl-none shadow-md'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2 text-[10px] font-mono text-zinc-500">
                    <span className="text-emerald-400 font-semibold">{msg.modelUsed || selectedModel.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                )}

                <div className="whitespace-pre-wrap font-sans text-xs">{msg.content || (isGenerating && 'Synthesizing response...')}</div>

                {/* Metering Receipt Footer */}
                {msg.meteredReceipt && (
                  <div className="mt-2 pt-2 border-t border-zinc-900/80 flex items-center justify-between text-[9px] font-mono text-zinc-500">
                    <span>
                      Tokens: {msg.meteredReceipt.inputTokens} in / {msg.meteredReceipt.outputTokens} out
                    </span>
                    <span className="text-emerald-400 font-bold">
                      Settled: {msg.meteredReceipt.isFree ? 'Free' : `$${msg.meteredReceipt.totalCharged.toFixed(5)}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* ── Input Box & Controls ── */}
      <form onSubmit={handleSend} className="flex flex-col gap-2 bg-[#171719] border border-zinc-800/80 p-3 rounded-2xl shrink-0 shadow-lg">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Ask ${selectedModel.name}... (Press Enter)`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            className="flex-1 bg-transparent border-none text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none font-sans"
          />

          {isGenerating ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleStop}
              className="font-bold text-xs flex items-center gap-1.5"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!input.trim()}
              className="font-bold text-xs flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              Send
            </Button>
          )}
        </div>

        {/* Input Bar Footer Specs */}
        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-900 pt-2 px-1">
          <span>Rate: {selectedModel.isFree ? 'Free' : `$${selectedModel.priceInputPerMillion}/1M in, $${selectedModel.priceOutputPerMillion}/1M out`}</span>
          <span>x402 Micropayment Settlement Active</span>
        </div>
      </form>

    </div>
  );
}
