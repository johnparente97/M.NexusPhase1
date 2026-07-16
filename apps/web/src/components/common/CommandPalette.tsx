import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass, Layers, History, Award, User, LogOut, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle global escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleDemoLogin = (role: 'user' | 'creator') => {
    signInAsDemo(role);
    onClose();
    navigate('/dashboard');
  };

  const handleLogout = () => {
    signOut();
    onClose();
    navigate('/');
  };

  const commands = [
    { id: 'exchange', label: 'Go to Exchange', category: 'Navigation', icon: Compass, action: () => handleNavigate('/exchange') },
    { id: 'studio', label: 'Go to Studio', category: 'Navigation', icon: Layers, action: () => handleNavigate('/studio') },
    { id: 'activity', label: 'Go to Run Activity', category: 'Navigation', icon: History, action: () => handleNavigate('/activity') },
    { id: 'dashboard', label: 'Go to Dashboard', category: 'Navigation', icon: User, action: () => handleNavigate('/dashboard') },
    
    // Auth
    ...(isSignedIn 
      ? [{ id: 'logout', label: 'Log Out Session', category: 'Authentication', icon: LogOut, action: handleLogout }]
      : [
          { id: 'login-user', label: 'Log In as Guest User', category: 'Authentication', icon: User, action: () => handleDemoLogin('user') },
          { id: 'login-creator', label: 'Log In as Creator', category: 'Authentication', icon: Award, action: () => handleDemoLogin('creator') }
        ]
    )
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase()) || 
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="bg-[#171719] border border-zinc-800 rounded-xl w-full max-w-lg shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85)] overflow-hidden z-10 flex flex-col max-h-[450px]"
          >
            {/* Header Search Field */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800/80 shrink-0">
              <Search className="h-4.5 w-4.5 text-zinc-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands, pages, or workflows..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-0 font-sans"
              />
              <button 
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 p-1 rounded-md transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Commands List Area */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
              {filteredCommands.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {filteredCommands.map((cmd) => {
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-semibold text-zinc-300 hover:text-zinc-100 hover:bg-[#27F293]/10 transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-zinc-400 group-hover:text-[#27F293]" />
                          <span>{cmd.label}</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 group-hover:text-[#27F293]/80 uppercase tracking-wider font-mono">
                          {cmd.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <Sparkles className="h-6 w-6 text-zinc-500 mb-2" />
                  <p className="text-xs text-zinc-400">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-[10px] text-zinc-600 mt-1">Try another query or press Esc to exit</p>
                </div>
              )}
            </div>

            {/* Quick tips footer */}
            <div className="px-4 py-2 border-t border-zinc-800/80 bg-zinc-900/30 text-[10px] text-zinc-500 font-mono flex items-center justify-between shrink-0">
              <span>Use ↑↓ to navigate, Enter to select</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
