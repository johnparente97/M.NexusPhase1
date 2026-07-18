import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

import { Compass, Layers, History, Award, LayoutDashboard, Search, Wallet, LogOut as LogOutIcon, Copy } from 'lucide-react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';
import DemoLabel from '../common/DemoLabel';
import { useWallet } from '../../hooks/useWallet';

export interface TopNavProps {
  onSearchClick?: () => void;
}

export default function TopNav({ onSearchClick }: TopNavProps) {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const navigate = useNavigate();
  const {
    walletAddress,
    chainId,
    isConnected,
    isConnecting,
    usdcBalance,
    switchNetwork,
    signInWithEthereum,
    disconnectWallet
  } = useWallet();

  const handleDemoLogin = (role: 'user' | 'creator' | 'admin') => {
    signInAsDemo(role);
    navigate('/dashboard');
  };

  const navItemVariants = {
    hover: { y: -1, scale: 1.03 },
    tap: { scale: 0.97 }
  };

  const isWrongNetwork = isConnected && chainId !== 84532;

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.svg 
              whileHover={{ rotate: 5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-7 w-7 text-[#27F293]" 
              viewBox="0 0 100 100" 
              fill="none"
            >
              <rect width="100" height="100" rx="22" fill="#1B1B1C" />
              <path d="M 30,30 L 30,70 L 42,70 L 42,48 L 58,70 L 70,70 L 70,30 L 58,30 L 58,52 L 42,30 Z" fill="currentColor" />
            </motion.svg>
            <span className="font-display font-bold text-base tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent group-hover:text-white transition-colors">
              Meridian Nexus
            </span>
          </Link>
          <DemoLabel />
        </div>

        {/* Center Nav Links */}
        <nav className="flex items-center gap-6">
          <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
            <NavLink
              to="/exchange"
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors py-1.5 px-3 rounded-full hover:bg-zinc-900/40',
                  { 'text-[#27F293] font-bold bg-[#27F293]/10': isActive }
                )
              }
            >
              <Compass className="h-4 w-4" />
              Exchange
            </NavLink>
          </motion.div>

          {isSignedIn && (
            <>
              <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                <NavLink
                  to="/studio"
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors py-1.5 px-3 rounded-full hover:bg-zinc-900/40',
                      { 'text-[#27F293] font-bold bg-[#27F293]/10': isActive }
                    )
                  }
                >
                  <Layers className="h-4 w-4" />
                  Studio
                </NavLink>
              </motion.div>

              <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                <NavLink
                  to="/activity"
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors py-1.5 px-3 rounded-full hover:bg-zinc-900/40',
                      { 'text-[#27F293] font-bold bg-[#27F293]/10': isActive }
                    )
                  }
                >
                  <History className="h-4 w-4" />
                  Activity
                </NavLink>
              </motion.div>

              {user?.role === 'creator' && (
                <motion.div whileHover="hover" whileTap="tap" variants={navItemVariants}>
                  <NavLink
                    to="/creator"
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-100 transition-colors py-1.5 px-3 rounded-full hover:bg-zinc-900/40',
                        { 'text-[#27F293] font-bold bg-[#27F293]/10': isActive }
                      )
                    }
                  >
                    <Award className="h-4 w-4" />
                    Creator Portal
                  </NavLink>
                </motion.div>
              )}
            </>
          )}
        </nav>

        {/* Right Auth controls */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSearchClick}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900/40 rounded-lg px-3 py-1.5 transition-colors cursor-pointer select-none"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Search...</span>
            <kbd className="text-[10px] text-zinc-500 bg-zinc-950 border border-zinc-800 px-1 py-0.2 rounded font-mono">⌘K</kbd>
          </motion.button>

          {/* Web3 Wallet Widget */}
          {isWrongNetwork ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={switchNetwork}
              className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer font-semibold"
            >
              Switch to Base Sepolia
            </motion.button>
          ) : isConnected ? (
            <div className="flex items-center gap-2.5 bg-zinc-900/60 border border-zinc-800 rounded-lg p-1.5 px-3">
              <span className="text-xs font-semibold text-[#27F293]">{usdcBalance} USDC</span>
              <span className="text-zinc-700">|</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(walletAddress || '');
                  alert('Address copied!');
                }}
                className="text-xs font-mono text-zinc-300 hover:text-[#27F293] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Click to copy wallet address"
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
              className="flex items-center gap-1.5 text-xs font-semibold text-[#27F293] border border-[#27F293]/35 hover:border-[#27F293]/60 bg-[#27F293]/10 hover:bg-[#27F293]/15 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Wallet className="h-3.5 w-3.5" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </motion.button>
          )}

          {isSignedIn ? (
            <div className="flex items-center gap-3 border-l border-zinc-800 pl-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/dashboard" className="text-xs font-semibold text-zinc-300 hover:text-[#27F293] transition-colors flex items-center gap-1">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Link>
              </motion.div>
              <Link to="/profile" title="Profile">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-[#27F293] flex items-center justify-center text-[10px] font-bold text-zinc-950 cursor-pointer hover:opacity-90 transition-opacity">
                  {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut} className="text-zinc-400 hover:text-zinc-100 text-xs">
                Log Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-l border-zinc-800 pl-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDemoLogin('user')}
                className="text-[10px] font-semibold text-zinc-400 hover:text-[#27F293] border border-zinc-800 hover:border-[#27F293]/30 px-2.5 py-1 rounded-full bg-zinc-900/40 hover:bg-[#27F293]/5 transition-all duration-150 cursor-pointer"
              >
                User Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDemoLogin('creator')}
                className="text-[10px] font-semibold text-zinc-400 hover:text-[#27F293] border border-zinc-800 hover:border-[#27F293]/30 px-2.5 py-1 rounded-full bg-zinc-900/40 hover:bg-[#27F293]/5 transition-all duration-150 cursor-pointer"
              >
                Creator Demo
              </motion.button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
