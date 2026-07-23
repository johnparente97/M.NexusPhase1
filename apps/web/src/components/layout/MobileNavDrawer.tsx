import React, { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Compass,
  Layers,
  History,
  LayoutDashboard,
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
  ArrowUpRight,
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

  const isDemoBalance = usdcBalance === undefined || usdcBalance === null;
  const balanceDisplay = isDemoBalance ? '$24.50 Demo' : `$${parseFloat(usdcBalance || '0').toFixed(2)}`;

  interface NavDrawerItem {
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    requiresAuth?: boolean;
    tag?: string;
  }

  const mainSections: Array<{
    title: string;
    items: NavDrawerItem[];
  }> = [
    {
      title: 'AI Inference & Marketplace',
      items: [
        { to: '/chat', label: 'Inference Chat', icon: Bot, tag: 'Live' },
        { to: '/marketplace/models', label: 'AntSeed Model Catalog', icon: Cpu },
        { to: '/exchange', label: 'Workflow Exchange', icon: Compass },
      ],
    },
    {
      title: 'Workspace & Funds',
      items: [
        { to: '/balance', label: 'Unified AI Balance', icon: Coins },
        { to: '/studio', label: 'Nexus Studio', icon: Layers, requiresAuth: true },
        { to: '/activity', label: 'Run Activity', icon: History, requiresAuth: true },
        { to: '/dashboard', label: 'Command Centre', icon: LayoutDashboard, requiresAuth: true },
      ],
    },
    {
      title: 'Developer & Protocol',
      items: [
        { to: '/developer', label: 'Developer Console', icon: Terminal },
        { to: '/organization', label: 'Organization Enterprise', icon: Building2, requiresAuth: true },
        { to: '/docs', label: 'Documentation', icon: BookOpen },
      ],
    },
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
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-layer-drawer-backdrop lg:hidden cursor-pointer"
          />

          {/* Slide-out Drawer Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            role="dialog"
            aria-label="Navigation Menu"
            aria-modal="true"
            className="fixed top-0 left-0 bottom-0 w-[84vw] max-w-sm bg-[#121214] border-r border-zinc-800/80 z-layer-drawer flex flex-col lg:hidden select-none shadow-2xl safe-area-pb"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800/80 shrink-0">
              <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2.5">
                <NexusLogoMark className="h-7 w-7 text-emerald-400" />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-white tracking-tight">
                    Nexus
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
                    Powered by Meridian
                  </span>
                </div>
              </Link>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors cursor-pointer"
                aria-label="Close Navigation Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Wallet & AI Balance Card */}
            <div className="p-4 border-b border-zinc-800/80 shrink-0 bg-zinc-950/60">
              <div className="flex flex-col gap-2.5 bg-zinc-900/90 border border-zinc-800 p-3.5 rounded-2xl shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <Coins className="h-4 w-4 text-emerald-400" />
                    <span>AI Balance</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold text-sm">
                    {balanceDisplay}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px] font-mono">
                  {isConnected ? (
                    <>
                      <span className="text-zinc-300 truncate max-w-[150px]">{walletAddress}</span>
                      <button
                        onClick={disconnectWallet}
                        className="text-rose-400 hover:underline text-[10px] font-semibold cursor-pointer"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/balance"
                      onClick={handleLinkClick}
                      className="w-full flex items-center justify-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold py-1.5 rounded-xl text-xs transition-colors"
                    >
                      <span>Top Up AI Balance</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Navigation Links Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {mainSections.map((sec, secIdx) => (
                <div key={secIdx} className="space-y-1.5">
                  <h4 className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider px-2">
                    {sec.title}
                  </h4>
                  <div className="space-y-1">
                    {sec.items.map((item) => {
                      if (item.requiresAuth && !isSignedIn) return null;
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                              isActive
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                                : 'text-zinc-300 hover:text-white hover:bg-zinc-900/80'
                            }`
                          }
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 shrink-0 text-zinc-400" />
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
                </div>
              ))}
            </div>

            {/* Drawer Footer Auth & Demo Options */}
            <div className="p-4 border-t border-zinc-800/80 shrink-0 bg-zinc-950/80 flex flex-col gap-2.5">
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
                    className="flex items-center gap-1 text-zinc-400 hover:text-rose-400 text-xs font-medium cursor-pointer"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider text-center">
                    Demo Mode Login
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDemoLogin('user')}
                      className="py-2 px-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-semibold text-center transition-colors cursor-pointer"
                    >
                      As User
                    </button>
                    <button
                      onClick={() => handleDemoLogin('creator')}
                      className="py-2 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold text-center transition-colors cursor-pointer"
                    >
                      As Creator
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
