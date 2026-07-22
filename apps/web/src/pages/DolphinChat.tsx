import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { DolphinAdapter, DolphinChatMessage, FREE_LLM_CATALOG, FreeLlmModel } from '../adapters/dolphin/adapter';
import { Sparkles, Square, Bot, User, ArrowUpRight, RefreshCw, ChevronDown, ShieldCheck, Info } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { NexusLogoMark } from '../components/common/NexusLogoMark';
import ChatContainer from '../components/chat/ChatContainer';

export default function DolphinChat() {
  const [searchParams] = useSearchParams();
  const initialModelId = searchParams.get('model') || 'dolphin-mixtral-8x7b-free';

  const [selectedModel, setSelectedModel] = useState<FreeLlmModel>(() => {
    return FREE_LLM_CATALOG.find((m) => m.id === initialModelId) || FREE_LLM_CATALOG[0]!;
  });

  const [selectedMode, setSelectedMode] = useState('logical');
  const [modelSwitchNotice, setModelSwitchNotice] = useState<string | null>(null);

  const [messages, setMessages] = useState<DolphinChatMessage[]>(() => {
    const saved = localStorage.getItem('nexus_free_chat_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: 'msg-init',
        role: 'assistant',
        content: `Hello! Welcome to the Meridian Free Multi-LLM Hub. You are currently connected to **${selectedModel.name}**.\n\nYou can chat for free with any of our open-weights models (Dolphin 8x7B, DeepSeek R1, Llama 3.3 70B, Qwen 2.5 72B, Mistral 7B, Nous Hermes 3) using the top selector. How can I help you today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel.name,
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    localStorage.setItem('nexus_free_chat_history', JSON.stringify(messages));
  }, [messages]);

  const handleModelChange = (modelId: string) => {
    const found = FREE_LLM_CATALOG.find((m) => m.id === modelId);
    if (found) {
      setSelectedModel(found);
      setModelSwitchNotice(`Switched model to ${found.name}. Conversation context carries over.`);
      setTimeout(() => setModelSwitchNotice(null), 4000);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userMsg: DolphinChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsGenerating(true);

    const botMsgId = `bot-${Date.now()}`;
    const botMsgPlaceholder: DolphinChatMessage = {
      id: botMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: selectedModel.name,
    };

    setMessages((prev) => [...prev, botMsgPlaceholder]);
    abortRef.current = new AbortController();

    try {
      const generator = DolphinAdapter.streamCompletion(updatedMessages, selectedModel.id, abortRef.current.signal);
      for await (const chunk of generator) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, content: chunk.text, tokensEstimated: chunk.tokensCount }
              : msg
          )
        );
      }
    } catch (err) {
      console.error('Free LLM stream failed:', err);
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

  const handleClearHistory = () => {
    const initial: DolphinChatMessage[] = [
      {
        id: 'msg-init',
        role: 'assistant',
        content: `Chat history cleared. Connected to **${selectedModel.name}**. Ready for your next query!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel.name,
      },
    ];
    setMessages(initial);
    localStorage.removeItem('nexus_free_chat_history');
  };

  const renderMessageContent = (content: string) => {
    if (!content) return null;
    return <div className="whitespace-pre-wrap font-sans">{content}</div>;
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[calc(100vh-7rem)] md:h-[calc(100vh-5rem)] p-3 sm:p-6 gap-3 select-none">
      
      {/* ── Top Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171719] border border-zinc-800/80 p-3 sm:px-4 sm:py-2.5 rounded-2xl shrink-0 shadow-lg shadow-black/20">
        
        {/* Left Title & Free Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <NexusLogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
            <span className="font-display font-bold text-base text-white tracking-tight">
              Free Multi-LLM Hub
            </span>
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="h-3 w-3" />
            Unmetered ($0.00)
          </span>
        </div>

        {/* Right Controls: Free Model Selector, Clear, Paid Link */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {/* Free Model Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedModel.id}
              onChange={(e) => handleModelChange(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-emerald-400 font-bold px-3 py-1.5 rounded-xl focus:outline-none appearance-none pr-8 cursor-pointer transition-colors"
            >
              {FREE_LLM_CATALOG.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#171719] text-zinc-200 font-medium">
                  {m.name} ($0.00 Free)
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <Button variant="ghost" size="sm" onClick={handleClearHistory} className="text-zinc-400 hover:text-zinc-200 text-xs px-2.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Clear
          </Button>

          <Button to="/chat/paid" variant="primary" size="sm" className="text-xs px-3.5 py-1 font-semibold rounded-full shadow-md">
            Paid Models (x402)
          </Button>
        </div>
      </div>

      {/* Model Switch Context Notice Banner */}
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

      {/* ── Main Streamed Independent Chat Window (NO document auto-scroll jumps!) ── */}
      <div className="flex-1 overflow-hidden border border-zinc-800/80 bg-[#171719]/60 backdrop-blur-xl rounded-2xl flex flex-col min-h-0">
        <ChatContainer dependencies={[messages]} isGenerating={isGenerating}>
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
                className={`h-7 w-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-white text-zinc-950 font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-emerald-400'
                }`}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-zinc-800 text-zinc-100 rounded-tr-none'
                      : 'bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-tl-none font-sans'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-2 text-[10px] font-mono text-zinc-500">
                      <span className="text-emerald-400 font-semibold">{msg.modelUsed || selectedModel.name}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  )}

                  {msg.content ? (
                    renderMessageContent(msg.content)
                  ) : (
                    <span className="text-zinc-500 italic flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
                      {selectedModel.name} is generating...
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 px-1">
                  <span className="text-emerald-400 font-semibold">$0.00 (Free Tier)</span>
                  {msg.tokensEstimated && (
                    <>
                      <span>•</span>
                      <span>~{msg.tokensEstimated} tokens</span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </ChatContainer>
      </div>

      {/* ── Bottom Input Capsule Bar ── */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <form
          onSubmit={handleSend}
          className="w-full flex items-center gap-2 bg-[#171719] border border-zinc-800 hover:border-zinc-700 p-2 rounded-2xl transition-colors shadow-lg shadow-black/20"
        >
          <input
            type="text"
            placeholder={`Ask ${selectedModel.name} anything (free, unmetered)...`}
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

        {/* Subcaption */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
          <span>Active: <strong className="text-zinc-300">{selectedModel.name}</strong></span>
          <span>·</span>
          <span className="text-emerald-400">$0.00 / message</span>
          <span>·</span>
          <span className="text-zinc-400">Meridian open-weights network</span>
        </div>
      </div>

    </div>
  );
}
