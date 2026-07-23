import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Wallet, Coins, Menu, Copy } from 'lucide-react';
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

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-14 bg-[#121214]/90 backdrop-blur-xl border-b border-zinc-800/80 px-3 sm:px-6 flex items-center justify-between z-layer-header transition-all duration-200 left-0',
        {
          'lg:left-64': !isCollapsed,
          'lg:left-16': isCollapsed,
        }
      )}
    >
      {/* Mobile Only: Brand Logo & Hamburger Menu */}
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
            Nexus
          </span>
        </Link>
        <div className="hidden sm:block">
          <DemoLabel />
        </div>
      </div>

      {/* Desktop Left: Adaptive Section Status Indicator */}
      <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-400">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AntSeed Decentralized AI Node Active
        </span>
      </div>

      {/* Right Controls: Spotlight Search, AI Balance, Wallet */}
      <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
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
          <span>${usdcBalance}</span>
        </Link>

        {/* Wallet Button (Compact on Mobile to prevent overflow) */}
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
