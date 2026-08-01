import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Wallet, Coins, Menu, Copy } from 'lucide-react';
import { NexusLogoMark } from '../common/NexusLogoMark';
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
        'fixed top-0 right-0 h-14 bg-[#08080C]/90 backdrop-blur-xl border-b border-white/[0.07] px-3 sm:px-6 flex items-center justify-between z-layer-header transition-all duration-200 left-0',
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
          className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/" className="flex items-center gap-2 group">
          <NexusLogoMark className="h-6 w-6 text-violet-400" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-bold text-sm text-white tracking-tight">
              Nexus
            </span>
          </div>
        </Link>
      </div>

      <div className="hidden lg:block flex-1" />

      {/* Right Controls: Search, Balance, Wallet */}
      <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
        {/* Search Launcher */}
        <button
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 bg-[#14141E] border border-white/[0.08] hover:border-violet-500/40 rounded-xl px-3 py-1.5 transition-colors cursor-pointer select-none shadow-sm"
        >
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <span className="hidden md:inline">Search</span>
          <kbd className="text-[9px] text-zinc-500 bg-[#0E0E14] border border-white/[0.08] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </button>

        {/* Balance Quick Link */}
        <Link
          to="/payments"
          className="flex items-center gap-1.5 bg-[#14141E] border border-violet-500/30 hover:border-violet-400/60 text-[11px] sm:text-xs font-mono text-violet-300 px-2.5 sm:px-3 py-1.5 rounded-xl transition-colors shrink-0 shadow-sm"
          title="Payments & Balance"
        >
          <Coins className="h-3.5 w-3.5 text-violet-400" />
          <span>${usdcBalance || '24.50'}</span>
        </Link>

        {/* Wallet Button */}
        {isWrongNetwork ? (
          <button
            onClick={switchNetwork}
            className="text-[11px] sm:text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold"
          >
            Switch
          </button>
        ) : isConnected ? (
          <div className="flex items-center gap-1.5 bg-[#14141E] border border-violet-500/30 rounded-lg p-1 px-2.5 sm:px-3 text-xs">
            <button
              onClick={() => { navigator.clipboard.writeText(walletAddress || ''); }}
              className="font-mono text-zinc-300 hover:text-violet-300 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs"
              title="Copy wallet address"
            >
              {walletAddress ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 3)}` : ''}
              <Copy className="h-3 w-3 text-zinc-500 hidden sm:inline" />
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithEthereum}
            className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs shadow-md shadow-violet-600/20 transition-colors cursor-pointer shrink-0"
          >
            <Wallet className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">Connect Wallet</span>
            <span className="sm:hidden">Connect</span>
          </button>
        )}
      </div>
    </header>
  );
}
