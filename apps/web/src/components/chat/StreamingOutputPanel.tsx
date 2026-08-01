import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Bot, Loader2, Play } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StreamingOutputPanelProps {
  content: string;
  isStreaming: boolean;
  modelName?: string;
}

export const StreamingOutputPanel: React.FC<StreamingOutputPanelProps> = ({
  content,
  isStreaming,
  modelName = 'Nexus Assistant',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showJumpToLatest, setShowJumpToLatest] = useState(false);
  const isAutoScrollPaused = useRef(false);

  // Monitor scroll position to determine if auto-follow should pause
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 60;

    if (isNearBottom) {
      isAutoScrollPaused.current = false;
      setShowJumpToLatest(false);
    } else {
      isAutoScrollPaused.current = true;
      if (isStreaming) {
        setShowJumpToLatest(true);
      }
    }
  };

  // Auto-scroll when new content arrives IF not manually paused by user scrolling up
  useEffect(() => {
    if (!containerRef.current) return;
    if (!isAutoScrollPaused.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [content]);

  const scrollToBottom = () => {
    if (!containerRef.current) return;
    isAutoScrollPaused.current = false;
    setShowJumpToLatest(false);
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-[#121216] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
      {/* ── Panel Header ── */}
      <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <span className="font-display font-bold text-xs text-white">{modelName}</span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
              {isStreaming ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> Streaming response...
                </span>
              ) : (
                <span className="text-zinc-400">Response Complete</span>
              )}
            </div>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
          x402 Micropayments Active
        </span>
      </div>

      {/* ── Scrollable Output Canvas ── */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-5 space-y-4 text-xs leading-relaxed text-zinc-200 font-sans selectable-text select-text"
      >
        <div className="whitespace-pre-wrap font-sans">{content || 'Awaiting execution trigger...'}</div>
      </div>

      {/* ── Floating "Jump to Latest" Control ── */}
      <AnimatePresence>
        {showJumpToLatest && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 right-4 z-20"
          >
            <button
              onClick={scrollToBottom}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600 text-white font-mono text-[11px] font-bold shadow-2xl hover:bg-purple-500 transition-colors cursor-pointer border border-white/20"
            >
              <span>Jump to latest</span>
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StreamingOutputPanel;
