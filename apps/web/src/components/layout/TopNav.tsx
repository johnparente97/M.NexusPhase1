import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { Compass, Layers, History, Award, LayoutDashboard, Search, Wallet, LogOut as LogOutIcon, Copy, Menu, Coins } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import DemoLabel from '../common/DemoLabel';
import { useWallet } from '../../hooks/useWallet';
import { NexusLogoMark } from '../common/NexusLogoMark';

export interface TopNavProps {
  onSearchClick?: () => void;
  onMobileMenuClick?: () => void;
}

export default function TopNav({ onSearchClick, onMobileMenuClick }: TopNavProps) {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const navigate = useNavigate();
  const { walletAddress, chainId, isConnected, isConnecting, usdcBalance, switchNetwork, signInWithEthereum, disconnectWallet } = useWallet();

  const handleDemoLogin = (role: 'user' | 'creator' | 'admin') => {
    signInAsDemo(role);
    navigate('/dashboard');
  };

  const navItemVariants = { hover: { y: -1, scale: 1.03 }, tap: { scale: 0.97 } };
  const isWrongNetwork = isConnected && chainId !== 84532;

  return (
    <header className="fixed top-0 left-0 right-0 z-layer-header h-16 px-3 sm:px-6 bg-[#171719]/90 backdrop-blur-xl border-b border-zinc-800/80 flex items-center justify-between select-none">
      <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">

        {/* Left: Mobile Menu Toggle + Brand Logo & Title */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuClick}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors lg:hidden"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div whileHover={{ rotate: 8, scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <NexusLogoMark className="h-7 w-7 sm:h-8 sm:w-8" />
            </motion.div>
            <span className="font-display font-bold text-sm sm:text-base text-white tracking-tight group-hover:text-emerald-300 transition-colors">
              Meridian Nexus
            </span>
          </Link>
          <DemoLabel />
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5">
          {[
            { to: '/chat', label: 'Inference Chat' },
            { to: '/marketplace/models', label: 'Models' },
            { to: '/exchange', label: 'Exchange' },
            ...(isSignedIn ? [
              { to: '/studio', label: 'Studio' },
              { to: '/activity', label: 'Activity' },
              ...(user?.role === 'creator' ? [{ to: '/creator', label: 'Creator' }] : []),
            ] : []),
          ].map(({ to, label }) => (
            <motion.div key={to} whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  cn(
                    'text-xs font-medium transition-colors py-1',
                    isActive
                      ? 'text-emerald-400 font-semibold border-b-2 border-emerald-400'
                      : 'text-zinc-400 hover:text-white'
                  )
                }
              >
                {label}
              </NavLink>
            </motion.div>
          ))}

          {/* Command Centre Link */}
          {isSignedIn && (
            <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-1.5 text-xs font-semibold transition-colors',
                    isActive ? 'text-emerald-400' : 'text-zinc-200 hover:text-white'
                  )
                }
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-emerald-400" />
                Command Centre
              </NavLink>
            </motion.div>
          )}
        </nav>

        {/* Right Controls: Search, Wallet & Balance */}
        <div className="flex items-center gap-2">
          {/* Spotlight Search Pill */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSearchClick}
            className="hidden sm:flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl px-3 py-1.5 transition-colors cursor-pointer select-none"
          >
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="text-[9px] text-zinc-500 bg-zinc-950 border border-zinc-800 px-1 py-0.5 rounded font-mono">⌘K</kbd>
          </motion.button>

          {/* AI Balance Quick Action */}
          <Link
            to="/balance"
            className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono text-emerald-400 px-3 py-1.5 rounded-xl transition-colors shrink-0"
            title="Unified AI Balance"
          >
            <Coins className="h-3.5 w-3.5 text-emerald-400" />
            <span>${usdcBalance}</span>
          </Link>

          {/* Wallet Button */}
          {isWrongNetwork ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={switchNetwork}
              className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl transition-colors cursor-pointer font-semibold"
            >
              Switch Network
            </motion.button>
          ) : isConnected ? (
            <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1.5 px-3 text-xs">
              <button
                onClick={() => { navigator.clipboard.writeText(walletAddress || ''); }}
                className="font-mono text-zinc-300 hover:text-emerald-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Copy wallet address"
              >
                {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : ''}
                <Copy className="h-3 w-3 text-zinc-500" />
              </button>
              <button
                onClick={disconnectWallet}
                className="text-zinc-500 hover:text-red-400 p-0.5 hover:bg-zinc-800/40 rounded transition-colors cursor-pointer"
                title="Disconnect Wallet"
              >
                <LogOutIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={signInWithEthereum}
              className="flex items-center gap-1.5 text-xs font-semibold bg-white hover:bg-gray-100 text-zinc-950 px-3.5 py-1.5 rounded-xl shadow-md transition-all cursor-pointer shrink-0"
            >
              <Wallet className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
              <span className="sm:hidden">Connect</span>
            </motion.button>
          )}

          {/* User Profile Avatar */}
          {isSignedIn ? (
            <Link to="/profile" title="Profile" className="ml-1">
              <div className="h-7 w-7 rounded-full bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center text-xs hover:opacity-90 transition-opacity">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </Link>
          ) : (
            <div className="hidden xl:flex items-center gap-1 border-l border-zinc-800 pl-2">
              <button
                onClick={() => handleDemoLogin('user')}
                className="text-[10px] font-medium text-zinc-400 hover:text-white px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors"
              >
                User Demo
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
