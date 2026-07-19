import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Compass,
  Layers,
  History,
  Award,
  User,
  LogOut,
  X,
  Sparkles,
  Play,
  Wallet,
  Coins,
  ShieldCheck,
  Zap,
  Filter,
  DollarSign,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { useToast } from '../ui/Toast';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const { isConnected, walletAddress, usdcBalance, switchNetwork, signInWithEthereum } = useWallet();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle keyboard navigation (Arrow Up, Arrow Down, Enter, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex]);

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
    toast('Logged out successfully', 'info');
  };

  const commands = [
    // Core Navigation
    { id: 'exchange', label: 'Discover Capability Exchange', category: 'Navigation', icon: Compass, action: () => handleNavigate('/exchange') },
    { id: 'studio', label: 'Nexus Studio Workflow Builder', category: 'Navigation', icon: Layers, action: () => handleNavigate('/studio') },
    { id: 'activity', label: 'View Execution History & Activity', category: 'Navigation', icon: History, action: () => handleNavigate('/activity') },
    { id: 'dashboard', label: 'Open Workspace Dashboard', category: 'Navigation', icon: User, action: () => handleNavigate('/dashboard') },
    { id: 'creator', label: 'Open Creator Portal Analytics', category: 'Navigation', icon: Award, action: () => handleNavigate('/creator') },

    // Instant Workflows Actions
    { id: 'run-bi', label: 'Execute: Business Intelligence Mission', category: 'Quick Action', icon: Play, action: () => handleNavigate('/exchange/business-intelligence-mission/run') },
    { id: 'run-audit', label: 'Execute: Financial Model Auditor', category: 'Quick Action', icon: Play, action: () => handleNavigate('/exchange/financial-model-auditor/run') },
    { id: 'run-competitor', label: 'Execute: Autonomous Competitor Tracker', category: 'Quick Action', icon: Play, action: () => handleNavigate('/exchange/autonomous-competitor-tracker/run') },

    // Spotlight Natural Language Shortcuts
    { id: 'filter-free', label: 'Filter: Show Workflows Under $2', category: 'Filter', icon: DollarSign, action: () => handleNavigate('/exchange?maxPrice=2') },
    { id: 'filter-[#27F293]', label: 'Filter: Show Verified Workflows', category: 'Filter', icon: ShieldCheck, action: () => handleNavigate('/exchange?verified=true') },

    // Wallet & Web3 Actions
    ...(isConnected
      ? [
          {
            id: 'copy-wallet',
            label: `Copy Wallet Address (${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress.length - 4)})`,
            category: 'Wallet',
            icon: Wallet,
            action: () => {
              navigator.clipboard.writeText(walletAddress || '');
              toast('Wallet address copied to clipboard!', 'success');
              onClose();
            },
          },
          { id: 'switch-base', label: 'Switch Network to Base Sepolia', category: 'Wallet', icon: Zap, action: () => { switchNetwork(); onClose(); } },
        ]
      : [{ id: 'connect-wallet', label: 'Connect Web3 Wallet (SIWE)', category: 'Wallet', icon: Wallet, action: () => { signInWithEthereum(); onClose(); } }]
    ),

    // Auth
    ...(isSignedIn
      ? [{ id: 'logout', label: 'Sign Out Current Session', category: 'Authentication', icon: LogOut, action: handleLogout }]
      : [
          { id: 'login-user', label: 'Sign In as Guest User (Demo)', category: 'Authentication', icon: User, action: () => handleDemoLogin('user') },
          { id: 'login-creator', label: 'Sign In as Creator (Demo)', category: 'Authentication', icon: Award, action: () => handleDemoLogin('creator') },
        ]
    ),
  ];

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/85 backdrop-blur-md"
          />

          {/* Spotlight Dialog Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="bg-[#121214] border border-zinc-800 rounded-2xl w-full max-w-xl shadow-[0_32px_80px_-16px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col max-h-[500px]"
          >
            {/* Spotlight Header Field */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-800/80 shrink-0 bg-zinc-950/60">
              <Search className="h-5 w-5 text-[#27F293]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search (e.g. 'Run BI', 'Filter < $2')..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                className="flex-1 bg-transparent border-none text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-0 font-sans"
              />
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 p-1.5 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Spotlight List */}
            <div className="flex-1 overflow-y-auto p-2.5 scrollbar-thin">
              {filteredCommands.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {filteredCommands.map((cmd, idx) => {
                    const Icon = cmd.icon;
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-xs font-semibold transition-all group cursor-pointer ${
                          isSelected
                            ? 'bg-[#27F293]/15 text-[#27F293] border border-[#27F293]/30 shadow-sm'
                            : 'text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900/60 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-[#27F293]' : 'text-zinc-400'}`} />
                          <span>{cmd.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
                            {cmd.category}
                          </span>
                          {isSelected && <ArrowRight className="h-3.5 w-3.5 text-[#27F293]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <Sparkles className="h-7 w-7 text-zinc-600 mb-2" />
                  <p className="text-xs font-semibold text-zinc-300">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-[10px] text-zinc-500 mt-1">Try another search or press Esc to exit</p>
                </div>
              )}
            </div>

            {/* Spotlight Footer Bar */}
            <div className="px-5 py-2.5 border-t border-zinc-800/80 bg-zinc-950 text-[10px] text-zinc-500 font-mono flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>ESC Exit</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
