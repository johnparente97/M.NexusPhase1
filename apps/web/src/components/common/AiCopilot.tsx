import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Bot, User, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: Date;
}

export default function AiCopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Hi! I am your Nexus Copilot. How can I help you design, configure, or verify your intelligent workflows today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock processing response
    setTimeout(() => {
      let aiText = '';
      const query = input.toLowerCase();

      if (query.includes('nexus') || query.includes('how does')) {
        aiText = 'Meridian Nexus is an Intelligence Synthesis layer built above the Meridian payment protocol. Creators package skills or APIs into "Capabilities," and users combine them into "Workflows." Meridian handles non-custodial token settlements automatically.';
      } else if (query.includes('mrdn') || query.includes('cashback') || query.includes('token')) {
        aiText = 'MRDN is the platform utility asset. Every workflow run settled via Meridian rails yields up to 2% cashback in MRDN. Holding MRDN unlocks premium tools, creator discounts, and elevated participation levels.';
      } else if (query.includes('receipt') || query.includes('outcome')) {
        aiText = 'Outcome Receipts are verifiable, machine-readable audits generated after every run. They detail objective parameters, active models, exact US dollar costs, and a cryptographic trace of the result.';
      } else {
        aiText = 'That is a great question! I can help you compile custom templates, configure run properties, or troubleshoot active parameters. Let me know if you would like me to draft a new workflow outline!';
      }

      const aiMsg: Message = {
        id: Math.random().toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating Sparkles Bubble Trigger */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="hidden lg:flex fixed bottom-6 right-6 z-layer-header h-12 w-12 rounded-full bg-emerald-400 hover:bg-emerald-300 text-zinc-950 items-center justify-center shadow-[0_8px_30px_0_rgba(39,242,147,0.35)] cursor-pointer"
      >
        <Sparkles className="h-5.5 w-5.5 animate-pulse" />
      </motion.button>

      {/* Drawer Overlay/Silder Container */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs"
            />

            {/* Sidebar drawer content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-sm bg-[#171719] border-l border-zinc-800 h-full shadow-2xl flex flex-col z-10"
            >
              {/* Header drawer */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-[#27F293]" />
                  <span className="font-semibold text-sm text-zinc-200">Nexus Copilot Helper</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-zinc-300 p-1 hover:bg-zinc-800/40 rounded transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 scrollbar-thin">
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex items-start gap-2.5 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                  >
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.sender === 'user' ? 'bg-[#1E1E20] text-zinc-200' : 'bg-[#27F293]/10 text-[#27F293]'
                    }`}>
                      {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>
                    <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user' ? 'bg-[#27F293]/15 text-zinc-200 rounded-tr-none' : 'bg-[#1E1E20]/60 border border-zinc-800 text-zinc-300 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-2.5 self-start">
                    <div className="h-7 w-7 rounded-full bg-[#27F293]/10 text-[#27F293] flex items-center justify-center shrink-0">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="bg-[#1E1E20]/60 border border-zinc-800 px-4 py-3 rounded-xl text-xs text-zinc-400 rounded-tl-none flex items-center gap-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.02)]">
                      <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>

              {/* Message inputs */}
              <div className="p-4 border-t border-zinc-800 bg-zinc-900/10 flex flex-col gap-2 shrink-0">
                {/* Suggested prompt chips */}
                <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                  <button 
                    onClick={() => setInput('How does Nexus work?')}
                    className="text-[10px] text-zinc-400 border border-zinc-800 bg-[#1E1E20]/40 px-2 py-0.5 rounded-full hover:border-[#27F293]/30 whitespace-nowrap cursor-pointer"
                  >
                    How does Nexus work?
                  </button>
                  <button 
                    onClick={() => setInput('What is MRDN cashback?')}
                    className="text-[10px] text-zinc-400 border border-zinc-800 bg-[#1E1E20]/40 px-2 py-0.5 rounded-full hover:border-[#27F293]/30 whitespace-nowrap cursor-pointer"
                  >
                    What is MRDN cashback?
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Ask Copilot..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#27F293]/40"
                  />
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={handleSend}
                    className="p-2 h-8 w-8 rounded-lg shrink-0 flex items-center justify-center"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
