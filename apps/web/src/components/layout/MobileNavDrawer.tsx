import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Compass,
  Layers,
  History,
  LayoutDashboard,
  Award,
  Sparkles,
  Cpu,
  Coins,
  Building2,
  Terminal,
  BookOpen,
  Wallet,
  LogOut,
  Bot,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { NexusLogoMark } from '../common/NexusLogoMark';
import DemoLabel from '../common/DemoLabel';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const { isConnected, walletAddress, usdcBalance, signInWithEthereum, disconnectWallet } = useWallet();
  const navigate = useNavigate();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems: Array<{
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    requiresAuth?: boolean;
    tag?: string;
  }> = [
    { to: '/chat', label: 'Inference Chat', icon: Bot },
    { to: '/marketplace/models', label: 'AntSeed Model Catalog', icon: Cpu },
    { to: '/exchange', label: 'Workflow Exchange', icon: Compass },
    { to: '/balance', label: 'Unified AI Balance', icon: Coins, requiresAuth: true },
    { to: '/studio', label: 'Nexus Studio', icon: Layers, requiresAuth: true },
    { to: '/activity', label: 'Run Activity', icon: History, requiresAuth: true },
    { to: '/dashboard', label: 'Command Centre', icon: LayoutDashboard, requiresAuth: true },
    { to: '/organization', label: 'Organization Enterprise', icon: Building2, requiresAuth: true },
    { to: '/developer', label: 'Developer Console', icon: Terminal },
    { to: '/docs', label: 'Meridian Documentation', icon: BookOpen },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  const handleDemoLogin = (role: 'user' | 'creator') => {
    signInAsDemo(role);
    onClose();
    navigate('/dashboard');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-layer-drawer-backdrop lg:hidden cursor-pointer"
          />

          {/* Slide-out Drawer Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            role="dialog"
            aria-label="Navigation Menu"
            aria-modal="true"
            className="fixed top-0 left-0 bottom-0 w-[82vw] max-w-sm bg-[#171719] border-r border-zinc-800/80 z-layer-drawer flex flex-col lg:hidden select-none shadow-2xl safe-area-pb"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/80 shrink-0">
              <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2.5">
                <NexusLogoMark className="h-8 w-8" />
                <span className="font-display font-bold text-base text-white tracking-tight">
                  Meridian Nexus
                </span>
                <DemoLabel />
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Wallet & Balance Capsule */}
            <div className="p-4 border-b border-zinc-900 shrink-0 bg-zinc-950/40">
              {isConnected ? (
                <div className="flex flex-col gap-2 bg-zinc-900 border border-zinc-800 p-3 rounded-2xl">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-mono">AI Balance</span>
                    <span className="font-mono text-emerald-400 font-bold">${usdcBalance} USDC</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-300 pt-1 border-t border-zinc-800/60">
                    <span className="truncate max-w-[160px]">{walletAddress}</span>
                    <button
                      onClick={disconnectWallet}
                      className="text-red-400 hover:underline text-[10px] font-semibold"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signInWithEthereum();
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-zinc-950 font-bold py-2.5 px-4 rounded-xl text-xs shadow-md transition-colors"
                >
                  <Wallet className="h-4 w-4" />
                  <span>Connect Wallet</span>
                </button>
              )}
            </div>

            {/* Drawer Navigation Links Container */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {navItems.map((item) => {
                if (item.requiresAuth && !isSignedIn) return null;
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                          : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.tag && (
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {item.tag}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Drawer Footer Auth & Demo Options */}
            <div className="p-4 border-t border-zinc-900 shrink-0 bg-zinc-950/60 flex flex-col gap-2">
              {isSignedIn ? (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center text-xs">
                      {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-zinc-200 font-medium">{user?.displayName || 'User'}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="text-xs text-zinc-400 hover:text-red-400 flex items-center gap-1"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-zinc-500">Demo Quick Access</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDemoLogin('user')}
                      className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-xl text-xs border border-zinc-800 transition-colors"
                    >
                      User Demo
                    </button>
                    <button
                      onClick={() => handleDemoLogin('creator')}
                      className="py-1.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 rounded-xl text-xs border border-zinc-800 transition-colors font-semibold"
                    >
                      Creator Demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavDrawer;
