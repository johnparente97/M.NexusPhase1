import { useRef, useState, useEffect, useCallback } from 'react';

interface UseChatScrollOptions {
  threshold?: number; // Distance from bottom in px to consider "near bottom"
  smooth?: boolean;
}

export function useChatScroll<T = any>(
  dependencies: T[],
  options: UseChatScrollOptions = {}
) {
  const { threshold = 100 } = options;
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  const checkIfNearBottom = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return true;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    return distanceToBottom <= threshold;
  }, [threshold]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const nearBottom = checkIfNearBottom();
    if (nearBottom) {
      setIsUserScrolledUp(false);
      setHasUnreadMessages(false);
    } else {
      setIsUserScrolledUp(true);
    }
  }, [checkIfNearBottom]);

  const scrollToBottom = useCallback(
    (smooth = true) => {
      const el = scrollRef.current;
      if (!el) return;

      const behavior = prefersReducedMotion || !smooth ? 'auto' : 'smooth';
      el.scrollTo({
        top: el.scrollHeight,
        behavior,
      });

      setIsUserScrolledUp(false);
      setHasUnreadMessages(false);
    },
    [prefersReducedMotion]
  );

  // Auto-scroll when dependencies (messages or streaming text) update
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const nearBottom = checkIfNearBottom();
    if (nearBottom || !isUserScrolledUp) {
      // Internal container scroll only — NEVER calls window.scrollTo or document scrollIntoView!
      el.scrollTop = el.scrollHeight;
    } else {
      setHasUnreadMessages(true);
    }
  }, [dependencies, isUserScrolledUp, checkIfNearBottom]);

  return {
    scrollRef,
    isUserScrolledUp,
    hasUnreadMessages,
    handleScroll,
    scrollToBottom,
  };
}
