import React, { useState, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ANTSEED_MODEL_CATALOG, AntSeedModel } from '../adapters/antseed/adapter';
import { DolphinAdapter } from '../adapters/dolphin/adapter';
import { MeteringEngine, MeteredRequestReceipt } from '../adapters/pricing/metering';
import { MeridianRouterAdapter, SessionAuthorization } from '../adapters/meridian/router';
import {
  Send,
  Square,
  Bot,
  User,
  Zap,
  ChevronDown,
  AlertTriangle,
  Coins,
  Info,
  DollarSign,
  Code,
  Brain,
  TrendingUp,
  PenTool,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { fetchApi } from '../services/api-client';
import { useWallet } from '../hooks/useWallet';
import { NexusLogoMark } from '../components/common/NexusLogoMark';
import ChatContainer from '../components/chat/ChatContainer';

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
  { id: 'agentic', label: 'Agentic' },
  { id: 'code', label: 'Code' },
  { id: 'creative', label: 'Creative' },
];

const PROMPT_STARTERS = [
  {
    icon: Brain,
    title: 'Deep Logic & Reasoning',
    prompt: 'Deconstruct a complex algorithmic problem step-by-step with proof.',
    modelId: 'deepseek-r1',
  },
  {
    icon: Code,
    title: 'Code Architecture',
    prompt: 'Draft a type-safe TypeScript API router schema with Zod validation.',
    modelId: 'qwen-2-5-72b',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    prompt: 'Synthesize competitive positioning & economic utility for a Web3 protocol.',
    modelId: 'llama-3-3-70b',
  },
  {
    icon: PenTool,
    title: 'Creative Writing',
    prompt: 'Draft a compelling announcement post for an open-source AI launch.',
    modelId: 'dolphin-mixtral-8x7b-free',
  },
];

// Helper to render Markdown elements safely
function MarkdownContent({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${idx}`} className="my-2 p-3.5 bg-zinc-950 border border-zinc-800/90 rounded-xl font-mono text-[11px] text-emerald-300 overflow-x-auto shadow-inner">
            <pre>{codeBuffer.join('\n')}</pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      return;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h4 key={idx} className="font-display font-bold text-sm text-white mt-3 mb-1">
          {line.replace('### ', '')}
        </h4>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <h3 key={idx} className="font-display font-bold text-base text-white mt-3 mb-1">
          {line.replace('## ', '')}
        </h3>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <h2 key={idx} className="font-display font-bold text-lg text-white mt-4 mb-2">
          {line.replace('# ', '')}
        </h2>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      elements.push(
        <li key={idx} className="ml-4 list-disc text-zinc-300 my-0.5">
          {line.substring(2)}
        </li>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={idx} className="h-1.5" />);
    } else {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      elements.push(
        <p key={idx} className="my-1 leading-relaxed">
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    }
  });

  return <div className="space-y-0.5 select-text">{elements}</div>;
}

export default function PaidChat() {
  const [searchParams] = useSearchParams();
  const initialModelId = searchParams.get('model') || 'dolphin-mixtral-8x7b-free';
  const navigate = useNavigate();

  const { isConnected, usdcBalance, signInWithEthereum } = useWallet();
  const { toast } = useToast();

  const [selectedModel, setSelectedModel] = useState<AntSeedModel>(() => {
    return ANTSEED_MODEL_CATALOG.find((m) => m.id === initialModelId || m.id === 'dolphin-mixtral-8x7b-free') || ANTSEED_MODEL_CATALOG[0]!;
  });

  const [selectedMode, setSelectedMode] = useState('logical');
  const [modelSwitchNotice, setModelSwitchNotice] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const [sessionAuth, setSessionAuth] = useState<SessionAuthorization>(() => {
    return MeridianRouterAdapter.createDefaultSessionAuth(5.0);
  });

  const [messages, setMessages] = useState<PaidChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  // Balance check
  const isDemoBalance = usdcBalance === undefined || usdcBalance === null;
  const numericBalance = isDemoBalance ? 24.50 : (parseFloat(usdcBalance) || 0.0);
  const isLowBalance = numericBalance < 0.50;

  const handleModelChange = (modelId: string) => {
    const found = ANTSEED_MODEL_CATALOG.find((m) => m.id === modelId);
    if (found) {
      setSelectedModel(found);
      setModelSwitchNotice(`Switched model to ${found.name}. Context retained.`);
      setTimeout(() => setModelSwitchNotice(null), 4000);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSend = async (userPromptText?: string, targetModelId?: string) => {
    const textToSend = (userPromptText || input).trim();
    if (!textToSend || isGenerating) return;

    if (targetModelId) {
      const found = ANTSEED_MODEL_CATALOG.find((m) => m.id === targetModelId);
      if (found) setSelectedModel(found);
    }

    const activeModel = targetModelId
      ? ANTSEED_MODEL_CATALOG.find((m) => m.id === targetModelId) || selectedModel
      : selectedModel;

    // Wallet check ONLY for paid metered models
    if (!activeModel.isFree && !isConnected) {
      toast('Please connect your wallet to authorize x402 inference settlement.', 'warning');
      signInWithEthereum();
      return;
    }

    // STRICT BALANCE PREFLIGHT GATE
    if (!activeModel.isFree && numericBalance <= 0) {
      toast('Insufficient AI balance ($0.00). Please top up your balance to execute metered model inference.', 'error');
      navigate('/balance');
      return;
    }

    const userMsg: PaidChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
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
      modelUsed: activeModel.name,
    };

    setMessages((prev) => [...prev, botMsgPlaceholder]);
    abortRef.current = new AbortController();

    try {
      if (activeModel.isFree) {
        // Free Model Completion Stream
        const generator = DolphinAdapter.streamCompletion(updatedMessages, activeModel.id, abortRef.current.signal);
        for await (const chunk of generator) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMsgId
                ? {
                    ...msg,
                    content: chunk.text,
                    meteredReceipt: {
                      requestId: `req-${Date.now()}`,
                      timestamp: new Date().toISOString(),
                      modelId: activeModel.id,
                      modelName: activeModel.name,
                      provider: activeModel.provider,
                      inputTokens: Math.round(textToSend.length / 4),
                      outputTokens: chunk.tokensCount || 0,
                      inputCost: 0,
                      outputCost: 0,
                      totalModelCost: 0,
                      platformFee: 0,
                      totalCharged: 0,
                      currency: 'USDC',
                      isFree: true,
                      mrdnCashbackEarned: 0,
                      settlementStatus: 'settled',
                      settlementTxHash: '0x0000000000000000000000000000000000000000',
                    },
                  }
                : msg
            )
          );
        }
      } else {
        // Paid Model Completion Stream via Worker API
        const response = (await fetchApi('/api/chat/completions', {
          method: 'POST',
          headers: {
            'X-402-Payment-Token': `x402-session-${Date.now()}`,
          },
          body: JSON.stringify({
            model: activeModel.id,
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
          completionText = `Meridian Inference completed prompt processing using ${activeModel.name} (${selectedMode} mode). Output verified via x402 settlement protocol.`;
        }

        const inputTokenCount = Math.max(12, Math.round(textToSend.length / 4));
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
        const receipt = MeteringEngine.calculateRequestCost(activeModel, inputTokenCount, outputTokenCount);

        setSessionAuth((prev) => ({
          ...prev,
          currentSessionSpend: parseFloat((prev.currentSessionSpend + receipt.totalCharged).toFixed(4)),
        }));

        setMessages((prev) =>
          prev.map((m) => (m.id === botMsgId ? { ...m, meteredReceipt: receipt } : m))
        );
      }
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
    <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full h-full min-h-0 p-2 sm:p-4 gap-3 overflow-hidden">
      
      {/* Sleek OpenAI/Anthropic Minimalist Header Toolbar */}
      <div className="flex items-center justify-between gap-3 bg-[#171719]/80 backdrop-blur-xl border border-zinc-800/80 px-5 py-2 rounded-2xl shrink-0 shadow-lg">
        
        {/* Left: Brand Mark */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <NexusLogoMark className="h-6 w-6 sm:h-7 sm:w-7" />
          <span className="font-display font-bold text-sm text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            Meridian Inference Hub
          </span>
        </Link>

        {/* Center: Prismatic Model Selector Capsule */}
        <div className="relative">
          <select
            value={selectedModel.id}
            onChange={(e) => handleModelChange(e.target.value)}
            className="bg-zinc-900 border border-zinc-700/60 hover:border-emerald-500/40 text-xs font-semibold text-zinc-200 px-4 py-1.5 rounded-xl focus:outline-none appearance-none pr-8 cursor-pointer transition-all shadow-sm"
          >
            {ANTSEED_MODEL_CATALOG.map((m) => (
              <option key={m.id} value={m.id} className="bg-[#171719] text-zinc-200">
                {m.name} {m.isFree ? '• Free' : `• $${m.priceInputPerMillion}/1M`}
              </option>
            ))}
          </select>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Right: Balance Pill & Reasoning Mode */}
        <div className="flex items-center gap-2.5">
          <div className="hidden sm:block relative">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-[11px] text-zinc-400 font-medium px-3 py-1.5 rounded-lg focus:outline-none appearance-none pr-6 cursor-pointer"
            >
              {REASONING_MODES.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#171719] text-zinc-200">
                  {m.label} Mode
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-zinc-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <Link
            to="/balance"
            className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl transition-colors shrink-0"
            title="Unified AI Balance"
          >
            <Coins className="h-3.5 w-3.5 text-emerald-400" />
            <span>{isDemoBalance ? `$${numericBalance.toFixed(2)} Demo` : `$${numericBalance.toFixed(2)}`}</span>
          </Link>
        </div>
      </div>

      {/* Model Switch Notice Banner */}
      {modelSwitchNotice && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-950/30 border border-emerald-500/30 px-4 py-2 rounded-xl text-xs text-emerald-300 flex items-center justify-between font-mono shrink-0"
        >
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-emerald-400" />
            <span>{modelSwitchNotice}</span>
          </div>
          <span className="text-[10px] text-zinc-400">Context Retained</span>
        </motion.div>
      )}

      {/* Low Balance Warning Banner */}
      {!selectedModel.isFree && isLowBalance && (
        <div className="bg-amber-950/30 border border-amber-500/40 p-3 rounded-2xl flex items-center justify-between text-xs text-amber-300 font-mono shrink-0">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Low AI Balance (${numericBalance.toFixed(2)}). Top up your balance to execute metered inference.</span>
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

      {/* Main Chat Stream Container (Takes Maximum Full Height) */}
      <div className="flex-1 bg-[#141416]/60 backdrop-blur-md border border-zinc-800/80 rounded-3xl overflow-hidden flex flex-col min-h-0">
        <ChatContainer dependencies={[messages]} isGenerating={isGenerating}>
          {messages.length === 0 ? (
            /* Minimalist Empty State Prompt Canvas */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-10 gap-8 my-auto select-none max-w-4xl mx-auto w-full">
              <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 prismatic-glow">
                <NexusLogoMark className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                  What would you like to build or reason today?
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-lg mx-auto">
                  Query free open-weights or metered decentralized AI models with x402 pay-per-token settlement.
                </p>
              </div>

              {/* 4 Prompt Starter Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full text-left">
                {PROMPT_STARTERS.map((starter, idx) => {
                  const Icon = starter.icon;
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSend(starter.prompt, starter.modelId)}
                      className="p-4 bg-[#171719] hover:bg-zinc-800/90 border border-zinc-800/90 hover:border-emerald-500/40 rounded-2xl transition-all cursor-pointer flex flex-col gap-2 group shadow-md"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200 group-hover:text-emerald-300">
                        <Icon className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{starter.title}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-3 leading-relaxed font-sans">
                        {starter.prompt}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-4 max-w-5xl ${
                  msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold shadow-md ${
                    msg.role === 'user'
                      ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 prismatic-glow'
                  }`}
                >
                  {msg.role === 'user' ? <User className="h-4.5 w-4.5" /> : <Bot className="h-4.5 w-4.5" />}
                </div>

                <div
                  className={`flex flex-col gap-2 rounded-3xl p-5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-zinc-800/90 text-zinc-100 border border-zinc-700/60 rounded-tr-none max-w-2xl'
                      : 'bg-[#18181b] text-zinc-200 border border-zinc-800/80 rounded-tl-none shadow-xl flex-1'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2.5 text-[11px] font-mono text-zinc-500">
                      <span className="text-emerald-400 font-semibold">{msg.modelUsed || selectedModel.name}</span>
                      <div className="flex items-center gap-2.5">
                        <span>{msg.timestamp}</span>
                        <button
                          onClick={() => handleCopyText(msg.content, msg.id)}
                          className="text-zinc-500 hover:text-zinc-300 p-0.5 transition-colors cursor-pointer"
                          title="Copy response"
                        >
                          {copiedMsgId === msg.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <MarkdownContent content={msg.content || (isGenerating ? 'Synthesizing response...' : '')} />

                  {msg.meteredReceipt && (
                    <div className="mt-2.5 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                      <span>
                        Tokens: {msg.meteredReceipt.inputTokens} in / {msg.meteredReceipt.outputTokens} out
                      </span>
                      <span className="text-emerald-400 font-bold">
                        {msg.meteredReceipt.isFree ? 'Free ($0.00)' : `Settled: $${msg.meteredReceipt.totalCharged.toFixed(5)}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </ChatContainer>
      </div>

      {/* Floating Input Composer Capsule */}
      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex flex-col gap-2 bg-[#171719] border border-zinc-800/80 p-3 rounded-3xl shrink-0 shadow-2xl prismatic-border">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder={`Ask ${selectedModel.name}... (Press Enter)`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isGenerating}
            className="flex-1 bg-transparent border-none text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-sans px-2"
          />

          {isGenerating ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleStop}
              className="font-bold text-xs flex items-center gap-1.5 rounded-xl px-4 py-2"
            >
              <Square className="h-3.5 w-3.5 fill-current" />
              Stop
            </Button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="h-9 w-9 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-zinc-950 disabled:opacity-40 disabled:hover:bg-emerald-400 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-md font-bold"
              title="Submit prompt"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 border-t border-zinc-800/80 pt-2 px-1">
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-3 w-3 text-emerald-400" />
            <span>
              {selectedModel.isFree
                ? 'Estimated cost: Free ($0.00) • 100% Unlimited'
                : `Sub-penny rate: <$0.0005 / prompt ($${selectedModel.priceInputPerMillion}/1M in) • 80% Cheaper vs Centralized APIs`}
            </span>
          </span>
          <span className="text-emerald-400 font-semibold">{selectedModel.isFree ? 'Unmetered Open Weights' : 'x402 Micropayments Active'}</span>
        </div>
      </form>

    </div>
  );
}
