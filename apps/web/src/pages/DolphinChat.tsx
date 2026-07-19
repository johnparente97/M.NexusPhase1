import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { motion } from 'framer-motion';
import { DolphinAdapter, DolphinChatMessage } from '../adapters/dolphin/adapter';
import { Sparkles, Send, Square, Bot, User, ArrowRight, RefreshCw } from 'lucide-react';

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

  // Structured layout formatter helper
  const renderMessageContent = (content: string) => {
    if (!content) return null;

    if (content.trim().startsWith('[') || content.trim().startsWith('{')) {
      try {
        const sections = JSON.parse(content);
        if (Array.isArray(sections)) {
          return (
            <div className="flex flex-col gap-4 text-xs">
              {sections.map((sec: any, index: number) => (
                <div key={index} className="flex flex-col gap-1.5 border-l-2 border-[#34D399]/40 pl-3">
                  <span className="font-mono font-bold text-zinc-100 text-xs tracking-tight">{sec.label || sec.key}</span>
                  {Array.isArray(sec.content) ? (
                    <ul className="list-disc pl-4 flex flex-col gap-1 text-[11px] text-zinc-300">
                      {sec.content.map((item: any, i: number) => {
                        if (typeof item === 'object') {
                          return (
                            <li key={i} className="leading-relaxed">
                              <strong className="text-zinc-200">{item.item}</strong>
                              {item.priority && (
                                <span className={`ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                                  item.priority === 'High' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                }`}>
                                  {item.priority}
                                </span>
                              )}
                            </li>
                          );
                        }
                        return <li key={i} className="leading-relaxed">{item}</li>;
                      })}
                    </ul>
                  ) : (
                    <p className="text-[11px] text-zinc-300 leading-relaxed whitespace-pre-wrap">{sec.content}</p>
                  )}
                </div>
              ))}
            </div>
          );
        }
      } catch {}
    }

    return <div className="whitespace-pre-wrap font-sans">{content}</div>;
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full h-[calc(100vh-4rem)] p-4 sm:p-6 gap-4 select-none">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#34D399]/20 to-teal-950 border border-[#34D399]/40 flex items-center justify-center text-[#34D399] shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-base text-zinc-100">Dolphin Free Experience</h1>
              <Badge variant="success" className="text-[9px] font-mono bg-[#34D399]/10 border border-[#34D399]/30 text-[#34D399]">100% FREE</Badge>
            </div>
            <p className="text-[11px] text-zinc-400">
              Unmetered open-weights AI assistant powered by Dolphin Mixtral 8x7B. Zero cost per prompt.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="sm" onClick={handleClearHistory} className="text-zinc-400 hover:text-zinc-200 text-xs">
            <RefreshCw className="h-3.5 w-3.5" />
            Clear
          </Button>

          <Button to="/marketplace/models" variant="primary" size="sm" className="font-bold flex items-center gap-1 text-xs">
            AntSeed Marketplace
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Streamed Chat Window */}
      <div className="flex-1 overflow-y-auto border border-zinc-800 bg-zinc-950/70 rounded-2xl p-4 flex flex-col gap-4 scrollbar-thin">
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
                  ? 'bg-gradient-to-br from-emerald-500 to-[#34D399] text-zinc-950 font-bold'
                  : 'bg-zinc-900 border border-zinc-800 text-[#34D399]'
              }`}
            >
              {msg.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-zinc-800 text-zinc-100 rounded-tr-none'
                    : 'bg-zinc-900/90 border border-zinc-800/80 text-zinc-200 rounded-tl-none font-sans shadow-sm'
                }`}
              >
                {msg.content ? (
                  renderMessageContent(msg.content)
                ) : (
                  <span className="text-zinc-500 italic flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-[#34D399] animate-spin" />
                    Dolphin is generating...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-[9px] font-mono text-zinc-500 px-1">
                <span>{msg.timestamp}</span>
                {msg.role === 'assistant' && (
                  <>
                    <span>•</span>
                    <span className="text-[#34D399] font-semibold">$0.00 (Free)</span>
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

      {/* Bottom Chat Input Bar */}
      <form onSubmit={handleSend} className="flex items-center gap-2 shrink-0 bg-zinc-900/90 border border-zinc-800 p-2 rounded-2xl">
        <input
          type="text"
          placeholder="Ask Dolphin anything (free, unmetered)..."
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
