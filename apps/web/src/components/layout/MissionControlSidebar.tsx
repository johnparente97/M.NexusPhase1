import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Layers,
  History,
  LayoutDashboard,
  Award,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Pin,
  Cpu,
  Coins,
  Building2,
  Terminal,
  BookOpen,
  Github,
  Zap,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { cn } from '../../utils/cn';

export interface MissionControlSidebarProps {
  onSearchClick: () => void;
}

export const MissionControlSidebar: React.FC<MissionControlSidebarProps> = ({ onSearchClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isSignedIn, user, signOut, signInAsDemo } = useAuth();
  const { isConnected, walletAddress, usdcBalance, signInWithEthereum } = useWallet();
  const navigate = useNavigate();

  const handleDemoLogin = (role: 'user' | 'creator') => {
    signInAsDemo(role);
    navigate('/dashboard');
  };

  const navItems: Array<{
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    requiresAuth?: boolean;
    role?: string;
  }> = [
    { to: '/chat/free', label: 'Dolphin Free Chat', icon: Sparkles },
    { to: '/chat/paid', label: 'Meridian Inference (x402)', icon: Bot },
    { to: '/marketplace/models', label: 'AntSeed Model Catalog', icon: Cpu },
    { to: '/exchange', label: 'Workflow Exchange', icon: Compass },
    { to: '/balance', label: 'Unified AI Balance', icon: Coins, requiresAuth: true },
    { to: '/studio', label: 'Nexus Studio', icon: Layers, requiresAuth: true },
    { to: '/activity', label: 'Run Activity', icon: History, requiresAuth: true },
    { to: '/dashboard', label: 'Workspace Dashboard', icon: LayoutDashboard, requiresAuth: true },
    { to: '/organization', label: 'Organization Enterprise', icon: Building2, requiresAuth: true },
    { to: '/developer', label: 'Developer Console', icon: Terminal },
    { to: '/docs', label: 'Meridian Docs', icon: BookOpen },
  ];

  const pinnedWorkflows = [
    { name: 'Company Intelligence Brief', id: 'wf-company-intel' },
    { name: 'Marketing Campaign Builder', id: 'wf-marketing-campaign' },
    { name: 'Sales Outreach Generator', id: 'wf-sales-outreach' },
  ];

  return (
    <aside
      className={cn(
        'bg-[#171719]/90 border-r border-zinc-800/80 backdrop-blur-md flex flex-col h-[calc(100vh-6rem)] sticky top-24 select-none transition-all duration-200 z-30 hidden lg:flex',
        {
          'w-64': !isCollapsed,
          'w-16': isCollapsed,
        }
      )}
    >
      {/* ⌘K Search Command Trigger */}
      <div className="p-3 border-b border-zinc-900">
        {!isCollapsed ? (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-between gap-2 bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-emerald-400" />
              <span>⌘K Spotlight</span>
            </div>
            <kbd className="text-[9px] font-mono bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">
              ⌘K
            </kbd>
          </button>
        ) : (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-emerald-400"
            title="Spotlight Search (⌘K)"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 flex flex-col gap-6">
        {/* Core Links */}
        <div className="flex flex-col gap-1">
          {!isCollapsed && (
            <span className="px-3 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Mission Control</span>
              <span className="text-[9px] text-emerald-400 font-mono">x402</span>
            </span>
          )}
          {navItems.map((item) => {
            if (item.requiresAuth && !isSignedIn) return null;
            if (item.role && user?.role !== item.role) return null;
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all group',
                    {
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20': isActive,
                      'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60': !isActive,
                      'justify-center px-0': isCollapsed,
                    }
                  )
                }
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </div>

        {/* Pinned & Quick Access (Only when expanded) */}
        {!isCollapsed && (
          <div className="flex flex-col gap-2">
            <span className="px-3 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
              <span>Pinned Capabilities</span>
              <Pin className="h-3 w-3 text-zinc-600" />
            </span>
            <div className="flex flex-col gap-1">
              {pinnedWorkflows.map((pw) => (
                <Link
                  key={pw.id}
                  to={`/exchange/${pw.id}`}
                  className="px-3 py-1.5 rounded-lg text-[11px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 truncate flex items-center gap-2 group"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 group-hover:bg-emerald-400 shrink-0" />
                  <span className="truncate">{pw.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Stack Info Footer Widget */}
        {!isCollapsed && (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-emerald-400">
              <Zap className="h-3 w-3" />
              <span>Meridian Protocol Stack</span>
            </div>
            <p className="text-[10px] text-zinc-400 leading-normal">
              Built on x402 payment headers & decentralized AI settlement.
            </p>
            <a
              href="https://github.com/meridian-protocol"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white font-mono transition-colors"
            >
              <Github className="h-3 w-3" />
              <span>meridian-protocol</span>
            </a>
          </div>
        )}

        {/* Quick Demo Switcher if logged out */}
        {!isSignedIn && !isCollapsed && (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-3 flex flex-col gap-2">
            <span className="text-[10px] font-mono text-zinc-400 font-semibold">
              Instant Demo Access
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDemoLogin('user')}
                className="flex-1 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-[10px] font-semibold text-center transition-colors cursor-pointer"
              >
                User
              </button>
              <button
                onClick={() => handleDemoLogin('creator')}
                className="flex-1 py-1.5 px-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg text-[10px] font-semibold text-center transition-colors cursor-pointer"
              >
                Creator
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Profile & Collapse Toggle */}
      <div className="p-3 border-t border-zinc-900 flex items-center justify-between shrink-0 bg-zinc-950">
        {!isCollapsed ? (
          <div className="flex items-center justify-between w-full">
            <Link to="/profile" className="flex items-center gap-2 max-w-[140px]">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-300 flex items-center justify-center text-[10px] font-bold text-zinc-950 shrink-0">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'G'}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-xs font-semibold text-zinc-200 truncate">
                  {user?.displayName || 'Guest User'}
                </span>
                <span className="text-[9px] text-zinc-500 font-mono capitalize">
                  {user?.role || 'demo'}
                </span>
              </div>
            </Link>

            <button
              onClick={() => setIsCollapsed(true)}
              className="text-zinc-500 hover:text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-900 transition-colors"
              title="Collapse Navigation"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsCollapsed(false)}
            className="w-full flex items-center justify-center p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 rounded-lg"
            title="Expand Navigation"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

export default MissionControlSidebar;
