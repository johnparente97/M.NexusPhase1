import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Wallet, Coins, Menu, Copy, ChevronDown, ExternalLink } from 'lucide-react';
import { NexusLogoMark } from '../common/NexusLogoMark';
import DemoLabel from '../common/DemoLabel';
import { useWallet } from '../../hooks/useWallet';
import { useSidebarStore } from '../../stores/sidebar-store';
import { cn } from '../../utils/cn';

interface TopNavProps {
  onSearchClick: () => void;
  onMobileMenuClick: () => void;
}

export default function TopNav({ onSearchClick, onMobileMenuClick }: TopNavProps) {
  const { isCollapsed } = useSidebarStore();
  const { isConnected, walletAddress, chainId, usdcBalance, signInWithEthereum, switchNetwork } = useWallet();
  const isWrongNetwork = isConnected && chainId !== null && chainId !== 84532;
  
  const [networkFamily, setNetworkFamily] = useState<'EVM' | 'Solana'>('EVM');
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-14 bg-[#171719]/90 backdrop-blur-xl border-b border-zinc-800/80 px-3 sm:px-6 flex items-center justify-between z-layer-header transition-all duration-200 left-0',
        {
          'lg:left-64': !isCollapsed,
          'lg:left-16': isCollapsed,
        }
      )}
    >
      {/* Mobile Left: Hamburger + Brand */}
      <div className="flex items-center gap-2.5 lg:hidden shrink-0">
        <button
          onClick={onMobileMenuClick}
          className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <NexusLogoMark className="h-6 w-6 text-emerald-400" />
          <span className="font-display font-bold text-sm text-white tracking-tight">
            Meridian <span className="text-emerald-400">Nexus</span>
          </span>
        </Link>
      </div>

      {/* Desktop Navigation Links — Canonical Meridian Product Suite Navigation */}
      <nav className="hidden lg:flex items-center gap-5 text-xs font-display">
        <Link to="/" className="flex items-center gap-2 mr-1 group">
          <NexusLogoMark className="h-6 w-6 text-emerald-400 group-hover:rotate-45 transition-transform duration-300" />
          <span className="font-display font-bold text-sm text-white tracking-tight">
            Meridian <span className="text-emerald-400">Nexus</span>
          </span>
        </Link>

        <Link
          to="/chat"
          className="text-zinc-300 hover:text-white transition-colors font-medium"
        >
          Inference
        </Link>

        <Link
          to="/exchange"
          className="text-zinc-300 hover:text-white transition-colors font-medium"
        >
          Workflows
        </Link>

        <Link
          to="/marketplace/models"
          className="text-zinc-300 hover:text-white transition-colors font-medium"
        >
          Models
        </Link>

        {/* Payments Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaymentsOpen(true)}
          onMouseLeave={() => setIsPaymentsOpen(false)}
        >
          <button
            type="button"
            className="inline-flex items-center gap-1 text-zinc-300 hover:text-white transition-colors font-medium cursor-pointer py-1"
          >
            <span>Payments</span>
            <ChevronDown className={cn("h-3.5 w-3.5 text-emerald-400 transition-transform duration-200", isPaymentsOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isPaymentsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full pt-1 z-50 w-52"
              >
                <div className="space-y-1 rounded-xl bg-[#1B1B1C] border border-zinc-800 p-2 text-white shadow-2xl shadow-black/80">
                  <a
                    href="https://pay.mrdn.finance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <span className="font-bold">Mpay (Gasless)</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                  <a
                    href="https://instant.mrdn.finance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <span>Instant x402</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                  <a
                    href="https://nanopayments.mrdn.finance/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/10 hover:text-emerald-300"
                  >
                    <span>Batched Nanopayments</span>
                    <ExternalLink className="h-3 w-3 opacity-60" />
                  </a>
                  <Link
                    to="/balance"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
                  >
                    <span>AI Vault & Top-Up</span>
                    <Coins className="h-3 w-3 text-emerald-400" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Command Centre — Meridian Glowing Signature Link */}
        <Link
          to="/auth"
          className="font-display font-medium text-[#F0F0F0] transition-colors hover:text-emerald-300"
          style={{
            textShadow: '0 0 6px rgba(52, 211, 153, 0.45), 0 0 14px rgba(52, 211, 153, 0.25), 0 0 24px rgba(52, 211, 153, 0.12)',
          }}
        >
          Command Centre
        </Link>

        <Link
          to="/activity"
          className="text-zinc-300 hover:text-white transition-colors font-medium"
        >
          Stats
        </Link>

        <Link
          to="/alignment"
          className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
        >
          Alignment
        </Link>

        <a
          href="https://docs.mrdn.finance/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-300 hover:text-white transition-colors font-medium inline-flex items-center gap-1"
        >
          <span>Docs</span>
          <ExternalLink className="h-3 w-3 opacity-60" />
        </a>
      </nav>

      {/* Right Controls: Network Toggle, Spotlight Search, AI Balance, Wallet */}
      <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
        {/* Network Family Switcher (EVM vs Solana) */}
        <div className="hidden xl:flex items-center rounded-full bg-zinc-900 p-0.5 border border-zinc-800">
          <button
            type="button"
            onClick={() => setNetworkFamily('EVM')}
            className={cn(
              "px-2.5 py-1 text-[10px] font-mono font-bold rounded-full transition-all cursor-pointer",
              networkFamily === 'EVM'
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            EVM
          </button>
          <button
            type="button"
            onClick={() => setNetworkFamily('Solana')}
            className={cn(
              "px-2.5 py-1 text-[10px] font-mono font-bold rounded-full transition-all cursor-pointer",
              networkFamily === 'Solana'
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            Solana
          </button>
        </div>

        {/* Spotlight Search Launcher */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900/90 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-1.5 transition-colors cursor-pointer select-none shadow-sm"
        >
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <span className="hidden md:inline">Spotlight</span>
          <kbd className="text-[9px] text-zinc-500 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </motion.button>

        {/* AI Balance Quick Link */}
        <Link
          to="/balance"
          className="flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/40 text-[11px] sm:text-xs font-mono text-emerald-400 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors shrink-0 shadow-sm"
          title="Unified AI Balance"
        >
          <Coins className="h-3.5 w-3.5 text-emerald-400" />
          <span>${usdcBalance || '24.50'}</span>
        </Link>

        {/* Wallet Button */}
        {isWrongNetwork ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={switchNetwork}
            className="text-[11px] sm:text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors cursor-pointer font-semibold"
          >
            Switch
          </motion.button>
        ) : isConnected ? (
          <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl p-1 px-2.5 sm:px-3 text-xs">
            <button
              onClick={() => { navigator.clipboard.writeText(walletAddress || ''); }}
              className="font-mono text-zinc-300 hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs"
              title="Copy wallet address"
            >
              {walletAddress ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 3)}` : ''}
              <Copy className="h-3 w-3 text-zinc-500 hidden sm:inline" />
            </button>
          </div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={signInWithEthereum}
            className="flex items-center gap-1.5 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold px-2.5 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs shadow-md transition-colors cursor-pointer shrink-0"
          >
            <Wallet className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </motion.button>
        )}
      </div>
    </header>
  );
}

