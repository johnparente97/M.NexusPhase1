import React from 'react';
import { NavLink } from 'react-router-dom';
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
  Bot,
  User,
  LogOut,
  Wallet,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { NexusLogoMark } from '../common/NexusLogoMark';
import { Button } from '../ui/Button';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavDrawerItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  requiresAuth?: boolean;
  tag?: string;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ isOpen, onClose }) => {
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const { isConnected, walletAddress, usdcBalance, signInWithEthereum } = useWallet();

  const isDemoBalance = usdcBalance === undefined || usdcBalance === null;
  const balanceDisplay = isDemoBalance ? '$24.50 Demo' : `$${parseFloat(usdcBalance || '0').toFixed(2)}`;

  const mainSections: Array<{
    title: string;
    items: NavDrawerItem[];
  }> = [
    {
      title: 'AI & Inference',
      items: [
        { to: '/chat', label: 'Inference Playground', icon: Bot, tag: 'Free' },
        { to: '/marketplace/models', label: 'Model Registry', icon: Cpu },
        { to: '/exchange', label: 'Workflow Exchange', icon: Compass },
      ],
    },
    {
      title: 'Vault & Creation',
      items: [
        { to: '/balance', label: 'Unified Vault', icon: Coins },
        { to: '/studio', label: 'Workflow Studio', icon: Layers, requiresAuth: true },
        { to: '/activity', label: 'Run Telemetry', icon: History, requiresAuth: true },
        { to: '/dashboard', label: 'Mission Control', icon: LayoutDashboard, requiresAuth: true },
      ],
    },
    {
      title: 'Developer & Docs',
      items: [
        { to: '/developer', label: 'Developer Console', icon: Terminal },
        { to: '/organization', label: 'Team Workspace', icon: Building2, requiresAuth: true },
        { to: '/docs', label: 'Documentation', icon: BookOpen },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-layer-modal lg:hidden flex">
          {/* Glass backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md"
          />

          {/* Slide-Out Navigation Sheet */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative w-4/5 max-w-xs bg-[#121214] border-r border-zinc-800/80 h-full flex flex-col z-10 shadow-2xl overflow-hidden"
          >
            {/* Sheet Header */}
            <div className="h-16 px-4 border-b border-zinc-800/80 flex items-center justify-between shrink-0 bg-[#121214]">
              <div className="flex items-center gap-2.5">
                <NexusLogoMark className="h-7 w-7 text-emerald-400" />
                <div className="flex flex-col">
                  <span className="font-display font-bold text-sm text-white tracking-tight">Nexus</span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">Powered by Meridian</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800/60 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">

              {/* Top AI Balance Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-zinc-900/90 to-zinc-950 border border-emerald-500/25 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                    <Coins className="h-4 w-4 text-emerald-400" />
                    <span>Unified Vault</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {balanceDisplay}
                  </span>
                </div>
                <Button
                  to="/balance"
                  onClick={onClose}
                  variant="primary"
                  size="sm"
                  className="w-full text-xs font-semibold py-2 justify-center"
                >
                  <Zap className="h-3.5 w-3.5 mr-1.5" />
                  Manage AI Balance
                </Button>
              </div>

              {/* Categorized Navigation Sections */}
              {mainSections.map((section) => (
                <div key={section.title} className="space-y-2">
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500 px-2">
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      if (item.requiresAuth && !isSignedIn) return null;
                      const Icon = item.icon;

                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                              isActive
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold'
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                            }`
                          }
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 shrink-0 text-emerald-400" />
                            <span>{item.label}</span>
                          </div>
                          {item.tag && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              {item.tag}
                            </span>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Wallet Status Card */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Wallet className="h-4 w-4 text-emerald-400" />
                    Web3 Wallet
                  </span>
                  {isConnected ? (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <ShieldCheck className="h-3 w-3" /> Connected
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500 font-mono">Disconnected</span>
                  )}
                </div>

                {isConnected ? (
                  <div className="text-xs font-mono text-zinc-300 bg-zinc-950 p-2 rounded-xl border border-zinc-800 truncate">
                    {walletAddress}
                  </div>
                ) : (
                  <button
                    onClick={() => { signInWithEthereum(); onClose(); }}
                    className="w-full py-2 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Wallet className="h-3.5 w-3.5" />
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>

            {/* Sheet Footer Account Controls */}
            <div className="p-4 border-t border-zinc-800/80 bg-[#121214] shrink-0">
              {isSignedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center text-xs shadow-md">
                      {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-zinc-200">{user?.displayName || 'User'}</span>
                      <span className="text-[10px] font-mono text-zinc-500">Explorer</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { signOut(); onClose(); }}
                    className="p-2 text-zinc-400 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { signInAsDemo('user'); onClose(); }}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-emerald-400 font-bold border border-emerald-500/30 rounded-xl text-xs transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Sign In (Instant Demo Access)
                </button>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileNavDrawer;
