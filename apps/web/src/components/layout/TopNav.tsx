import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Wallet, Coins, Menu, Copy, ChevronRight, Sparkles } from 'lucide-react';
import { NexusLogoMark } from '../common/NexusLogoMark';
import { ThemeToggle } from '../common/ThemeToggle';
import { useWallet } from '../../hooks/useWallet';
import { useSidebarStore } from '../../stores/sidebar-store';
import { cn } from '../../utils/cn';

interface TopNavProps {
  onSearchClick: () => void;
  onMobileMenuClick: () => void;
}

const ROUTE_TITLES: Record<string, string> = {
  '/': 'Home',
  '/explore': 'Explore Marketplace',
  '/compose': 'Build Agent',
  '/build': 'Build Agent',
  '/activity': 'Activity & Runs',
  '/library': 'Library',
  '/dashboard': 'Workspace Overview',
  '/workspace': 'Workspace Overview',
  '/creator': 'Creator Console',
  '/payments': 'Payments & Billing',
  '/chat': 'AI Agent Chat',
  '/cloud': 'Files & Knowledge',
  '/developer': 'Developer Console',
  '/docs': 'Documentation',
  '/trust': 'Trust Center',
};

export default function TopNav({ onSearchClick, onMobileMenuClick }: TopNavProps) {
  const location = useLocation();
  const { isCollapsed } = useSidebarStore();
  const { isConnected, walletAddress, chainId, usdcBalance, signInWithEthereum, switchNetwork } = useWallet();
  const isWrongNetwork = isConnected && chainId !== null && chainId !== 84532;

  const currentTitle = ROUTE_TITLES[location.pathname] || 'Workspace';

  return (
    <header
      className={cn(
        'fixed top-0 right-0 h-14 bg-[#05050A]/90 backdrop-blur-2xl border-b border-white/[0.08] px-3 sm:px-6 flex items-center justify-between z-layer-header transition-all duration-200 left-0',
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
          <NexusLogoMark className="h-6 w-6" />
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-sm text-white tracking-tight group-hover:text-prismatic transition-all">
              Nexus
            </span>
          </div>
        </Link>
      </div>

      {/* Desktop Left: Breadcrumb Location Indicator */}
      <div className="hidden lg:flex items-center gap-2 text-xs font-mono select-none">
        <Link to="/" className="text-zinc-400 hover:text-[#00F5D4] transition-colors flex items-center gap-1 font-bold">
          <Sparkles className="h-3.5 w-3.5 text-[#00F5D4]" />
          <span>Nexus</span>
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-zinc-600" />
        <span className="text-white font-semibold truncate max-w-[200px]">
          {currentTitle}
        </span>
      </div>

      <div className="hidden lg:block flex-1" />

      {/* Right Controls: Search, Theme Toggle, Balance, Wallet */}
      <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
        <ThemeToggle />

        {/* Search Launcher */}
        <button
          onClick={onSearchClick}
          className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-[#0F0F1D] border border-white/[0.08] hover:border-[#00F5D4]/40 rounded-xl px-3 py-1.5 transition-all cursor-pointer select-none shadow-sm"
        >
          <Search className="h-3.5 w-3.5 text-[#00F5D4]" />
          <span className="hidden md:inline font-medium">Search</span>
          <kbd className="text-[9px] text-zinc-500 bg-[#05050A] border border-white/[0.08] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </button>

        {/* Balance Quick Link */}
        <Link
          to="/payments"
          className="flex items-center gap-1.5 bg-[#0F0F1D] border border-[#00F5D4]/30 hover:border-[#00F5D4]/60 text-[11px] sm:text-xs font-mono text-[#00F5D4] px-2.5 sm:px-3 py-1.5 rounded-xl transition-all shrink-0 shadow-[0_0_10px_rgba(0,245,212,0.15)] font-bold"
          title="Payments & Balance"
        >
          <Coins className="h-3.5 w-3.5 text-[#00F5D4]" />
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
          <div className="flex items-center gap-1.5 bg-[#0F0F1D] border border-[#A855F7]/30 rounded-lg p-1 px-2.5 sm:px-3 text-xs">
            <button
              onClick={() => { navigator.clipboard.writeText(walletAddress || ''); }}
              className="font-mono text-zinc-300 hover:text-[#00F5D4] flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] sm:text-xs font-bold"
              title="Copy wallet address"
            >
              {walletAddress ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 3)}` : ''}
              <Copy className="h-3 w-3 text-zinc-500 hidden sm:inline" />
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithEthereum}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#A855F7] to-[#FF007F] hover:brightness-110 text-white font-extrabold px-3.5 sm:px-4 py-1.5 rounded-xl text-[11px] sm:text-xs shadow-lg shadow-purple-600/25 transition-all cursor-pointer shrink-0 border border-purple-400/30"
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
