import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useChatScroll } from '../../hooks/useChatScroll';

interface ChatContainerProps {
  children: React.ReactNode;
  dependencies: any[];
  isGenerating?: boolean;
  className?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  children,
  dependencies,
  isGenerating = false,
  className = '',
}) => {
  const { scrollRef, isUserScrolledUp, hasUnreadMessages, handleScroll, scrollToBottom } =
    useChatScroll(dependencies, { threshold: 120 });

  return (
    <div className="relative flex-1 flex flex-col min-h-0 w-full overflow-hidden">
      {/* ── Independent Chat Scroll Window (Never scrolls parent document window) ── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        tabIndex={0}
        role="region"
        aria-label="Inference Chat Stream"
        className={`flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar scroll-smooth ${className}`}
      >
        {children}
      </div>

      {/* ── Accessible Live Region for Screen Readers (Announces status without spamming tokens) ── */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isGenerating ? 'AI Model response is streaming...' : 'Response complete.'}
      </div>

      {/* ── Floating "Jump to Latest" Button ── */}
      <AnimatePresence>
        {isUserScrolledUp && (
          <motion.button
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            onClick={() => scrollToBottom(true)}
            className="absolute bottom-4 right-6 z-layer-sticky flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-3.5 py-2 rounded-full font-mono text-xs font-bold shadow-lg shadow-emerald-500/20 border border-emerald-300/40 transition-all cursor-pointer"
          >
            {isGenerating && <Sparkles className="h-3.5 w-3.5 animate-spin text-zinc-950" />}
            <span>{hasUnreadMessages ? 'New response below' : 'Jump to latest'}</span>
            <ArrowDown className="h-3.5 w-3.5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatContainer;
