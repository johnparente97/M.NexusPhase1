import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { DolphinAdapter, DolphinChatMessage } from '../adapters/dolphin/adapter';
import { Sparkles, Send, Square, Bot, User, ArrowUpRight, RefreshCw, Zap, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoNexus from '../assets/logo-nexus.png';

export default function DolphinChat() {
  const [messages, setMessages] = useState<DolphinChatMessage[]>(() => {
    const saved = localStorage.getItem('nexus_dolphin_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [
      {
        id: 'msg-init',
        role: 'assistant',
        content: `Hello! I am Dolphin 8x7B, your free open-weights assistant on Meridian Nexus. How can I help you explore AI models, agents, or workflows today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedMode, setSelectedMode] = useState('logical');

  const abortRef = useRef<AbortController | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('nexus_dolphin_history', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    };

    setMessages((prev) => [...prev, botMsgPlaceholder]);
    abortRef.current = new AbortController();

    try {
      const generator = DolphinAdapter.streamCompletion(updatedMessages, abortRef.current.signal);
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
      console.error('Dolphin stream failed:', err);
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
        content: `Chat history cleared. I'm Dolphin 8x7B, ready for your next question!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setMessages(initial);
    localStorage.removeItem('nexus_dolphin_history');
  };

  const renderMessageContent = (content: string) => {
    if (!content) return null;
    return <div className="whitespace-pre-wrap font-sans">{content}</div>;
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[calc(100vh-8.5rem)] md:h-[calc(100vh-4.5rem)] p-3 sm:p-6 gap-3 select-none">
      
      {/* ── Top Toolbar — Meridian Inference layout ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#171719] border border-zinc-800/80 p-3 sm:px-4 sm:py-2.5 rounded-2xl shrink-0 shadow-lg shadow-black/20">
        
        {/* Left Title & x402 Stack Badge */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoNexus} alt="Meridian" className="h-8 w-8 sm:h-9 sm:w-9 object-contain mix-blend-screen filter drop-shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
            <span className="font-display font-bold text-base text-white tracking-tight">
              Meridian Free Inference
            </span>
          </Link>
          <span className="text-zinc-700">|</span>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <Sparkles className="h-3 w-3" />
            Dolphin 8x7B (Free)
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Dropdown */}
          <div className="relative">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-200 font-medium px-3 py-1.5 rounded-xl focus:outline-none appearance-none pr-8 cursor-pointer transition-colors"
            >
              <option value="logical">Logical</option>
              <option value="creative">Creative</option>
              <option value="agentic">Agentic Workflow</option>
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

      {/* ── Main Streamed Chat Window ── */}
      <div className="flex-1 overflow-y-auto border border-zinc-800/80 bg-[#171719]/60 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-4">
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
                {msg.content ? (
                  renderMessageContent(msg.content)
                ) : (
                  <span className="text-zinc-500 italic flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400 animate-spin" />
                    Dolphin is generating...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 px-1">
                <span>{msg.timestamp}</span>
                {msg.role === 'assistant' && (
                  <>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">$0.00 (Free)</span>
                    {msg.tokensEstimated && (
                      <>
                        <span>•</span>
                        <span>~{msg.tokensEstimated} tokens</span>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* ── Bottom Input Capsule Bar ── */}
      <div className="flex flex-col items-center gap-1.5 shrink-0">
        <form
          onSubmit={handleSend}
          className="w-full flex items-center gap-2 bg-[#171719] border border-zinc-800 hover:border-zinc-700 p-2 rounded-2xl transition-colors shadow-lg shadow-black/20"
        >
          <input
            type="text"
            placeholder="Ask Dolphin anything (free, unmetered)..."
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
          <span>$0.00/message</span>
          <span>·</span>
          <span className="text-zinc-400">Meridian open-weights stack</span>
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
