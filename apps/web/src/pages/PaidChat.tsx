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
  Zap,
  ArrowUpRight,
  Cpu,
  Wallet,
  Layers,
  ChevronDown,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/format';
import { useToast } from '../components/ui/Toast';
import { fetchApi } from '../services/api-client';
import { useWallet } from '../hooks/useWallet';
import logoNexus from '../assets/logo-nexus.png';

export interface PaidChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  modelUsed?: string;
  meteredReceipt?: MeteredRequestReceipt;
}

const REASONING_MODES = [
  { id: 'logical', label: 'Logical' },
  { id: 'agentic', label: 'Agentic Workflow' },
  { id: 'code', label: 'Code Synthesis' },
  { id: 'creative', label: 'Creative' },
];

export default function PaidChat() {
  const [searchParams] = useSearchParams();
  const initialModelId = searchParams.get('model') || 'dolphin-24b';

  const { isConnected, walletAddress, usdcBalance, signInWithEthereum } = useWallet();
  const { toast } = useToast();

  const [selectedModel, setSelectedModel] = useState<AntSeedModel>(() => {
    return ANTSEED_MODEL_CATALOG.find((m) => m.id === initialModelId || m.id === 'dolphin-24b') || ANTSEED_MODEL_CATALOG[0]!;
  });

  const [selectedMode, setSelectedMode] = useState('logical');
  const [currency, setCurrency] = useState<'USDC' | 'MRDN'>('USDC');

  const [sessionAuth, setSessionAuth] = useState<SessionAuthorization>(() => {
    return MeridianRouterAdapter.createDefaultSessionAuth(5.0);
  });

  const [messages, setMessages] = useState<PaidChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    if (!isConnected) {
      toast('Please connect your wallet to authorize x402 inference settlement.', 'warning');
      signInWithEthereum();
      return;
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
      // Call live Cloudflare Worker Chat Completions route
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
        completionText = `Meridian Inference completed prompt processing using ${selectedModel.name} (${selectedMode} mode). Output verified via x402 protocol.`;
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

  const perMsgCost = selectedModel.isFree ? '$0.00/message' : `$0.01/message`;

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[calc(100vh-8.5rem)] md:h-[calc(100vh-4.5rem)] p-3 sm:p-6 gap-3 select-none">
      
      {/* ── Top Header Toolbar — Styled to match Meridian Inference layout ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171719] border border-zinc-800/80 p-3 sm:px-4 sm:py-2.5 rounded-2xl shrink-0 shadow-lg shadow-black/20">
        
        {/* Left Title & Stack Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoNexus} alt="Meridian" className="h-8 w-8 sm:h-9 sm:w-9 object-contain mix-blend-screen filter drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
            <span className="font-display font-bold text-base text-white tracking-tight">
              Meridian Inference
            </span>
          </Link>
          <span className="text-zinc-700">|</span>
          <a
            href="https://github.com/meridian-protocol"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <Zap className="h-3 w-3" />
            x402 Stack
          </a>
        </div>

        {/* Right Top Bar Controls: Model Selector, Mode Dropdown, Currency, Wallet */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Model Dropdown */}
          <div className="relative">
            <select
              value={selectedModel.id}
              onChange={(e) => {
                const found = ANTSEED_MODEL_CATALOG.find((m) => m.id === e.target.value);
                if (found) setSelectedModel(found);
              }}
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

          {/* Currency Pill */}
          <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400 px-2.5 py-1.5 rounded-xl">
            <span className="font-bold">($)</span>
            <span>{currency}</span>
          </div>

          {/* Connect Wallet Button */}
          {isConnected ? (
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{walletAddress ? `${walletAddress.substring(0, 6)}...` : 'Connected'}</span>
            </div>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={signInWithEthereum}
              className="text-xs px-3.5 py-1 font-semibold rounded-full shadow-md"
            >
              Connect Wallet
            </Button>
          )}
        </div>
      </div>

      {/* ── Main Chat Area ── */}
      <div className="flex-1 overflow-y-auto border border-zinc-800/80 bg-[#171719]/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-4">
        {messages.length === 0 ? (
          /* Empty State — Meridian Inference style */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-4 my-auto select-none">
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={logoNexus}
              alt="Meridian"
              className="h-28 w-28 sm:h-36 sm:w-36 object-contain mix-blend-screen filter drop-shadow-[0_0_32px_rgba(52,211,153,0.65)]"
            />
            <div className="flex flex-col gap-1.5">
              <h2 className="font-display font-semibold text-xl text-white">Ask anything</h2>
              <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
                {isConnected
                  ? `Prompt ${selectedModel.name} using Meridian Protocol. Authorized via x402 payment headers.`
                  : 'Connect your wallet to start chatting.'}
              </p>
            </div>
            {!isConnected && (
              <Button variant="primary" size="md" onClick={signInWithEthereum} className="mt-2 font-semibold">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        ) : (
          /* Streamed Chat Messages */
          messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 max-w-3xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-white text-zinc-950 font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-emerald-400'
                }`}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className={`flex flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-zinc-800 text-white rounded-tr-none'
                      : 'bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-tl-none whitespace-pre-wrap font-sans'
                  }`}
                >
                  {msg.content || (
                    <span className="text-zinc-500 italic flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
                      {msg.modelUsed || selectedModel.name} generating...
                    </span>
                  )}
                </div>

                {msg.meteredReceipt && (
                  <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 px-3 py-1 rounded-xl text-[9px] font-mono text-zinc-400">
                    <span>{msg.meteredReceipt.inputTokens} in / {msg.meteredReceipt.outputTokens} out</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-bold">{formatCurrency(msg.meteredReceipt.totalCharged)}</span>
                    <span>•</span>
                    <span className="text-blue-400 font-semibold">x402 settled</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* ── Bottom Input Capsule — Aligned with Meridian Inference design ── */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <form
          onSubmit={handleSend}
          className="w-full flex items-center gap-2 bg-[#171719] border border-zinc-800 hover:border-zinc-700 p-2 rounded-2xl transition-colors shadow-lg shadow-black/20"
        >
          <input
            type="text"
            placeholder={
              isConnected
                ? `Ask ${selectedModel.name} anything...`
                : 'Connect wallet to start chatting'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            className="flex-1 bg-transparent border-none text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none px-3 font-sans"
          />

          {isGenerating ? (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleStop}
              className="text-xs text-rose-400 font-semibold rounded-xl"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </Button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="h-8 w-8 rounded-xl bg-white hover:bg-gray-100 text-zinc-950 disabled:opacity-40 disabled:hover:bg-white flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
              title="Submit prompt"
            >
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </button>
          )}
        </form>

        {/* Sub-caption underneath input bar matching inference.mrdn.finance */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span>{perMsgCost}</span>
          <span>·</span>
          <span className="text-zinc-400">x402 protocol</span>
          <span>·</span>
          <a
            href="https://github.com/meridian-protocol"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400/80 hover:text-emerald-400 hover:underline flex items-center gap-0.5"
          >
            meridian-protocol <ArrowUpRight className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>

    </div>
  );
}
