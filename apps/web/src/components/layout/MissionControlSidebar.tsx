import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Layers,
  History,
  LayoutDashboard,
  Award,
  Bookmark,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Sparkles,
  Zap,
  Star,
  Pin,
  Clock,
  LogOut,
  User,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useWallet } from '../../hooks/useWallet';
import { cn } from '../../utils/cn';
import DemoLabel from '../common/DemoLabel';

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

  const navItems = [
    { to: '/exchange', label: 'Discover Exchange', icon: Compass },
    { to: '/studio', label: 'Nexus Studio', icon: Layers, requiresAuth: true },
    { to: '/activity', label: 'Run Activity', icon: History, requiresAuth: true },
    { to: '/dashboard', label: 'Workspace Dashboard', icon: LayoutDashboard, requiresAuth: true },
    { to: '/saved', label: 'Saved Workflows', icon: Bookmark, requiresAuth: true },
    { to: '/creator', label: 'Creator Portal', icon: Award, requiresAuth: true, role: 'creator' },
  ];

  const pinnedWorkflows = [
    { name: 'Business Intelligence Mission', slug: 'business-intelligence-mission' },
    { name: 'Financial Model Auditor', slug: 'financial-model-auditor' },
    { name: 'Autonomous Competitor Tracker', slug: 'autonomous-competitor-tracker' },
  ];

  return (
    <aside
      className={cn(
        'bg-zinc-950/90 border-r border-zinc-900 flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none transition-all duration-200 z-30 hidden lg:flex',
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
              <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#27F293]" />
              <span>⌘K Spotlight</span>
            </div>
            <kbd className="text-[9px] font-mono bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">
              ⌘K
            </kbd>
          </button>
        ) : (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-center p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-[#27F293]"
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
            <span className="px-3 text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              Mission Control
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
                      'bg-[#27F293]/10 text-[#27F293] border border-[#27F293]/20': isActive,
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
                  key={pw.slug}
                  to={`/exchange/${pw.slug}`}
                  className="px-3 py-1.5 rounded-lg text-[11px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40 truncate flex items-center gap-2 group"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-[#27F293]/60 group-hover:bg-[#27F293] shrink-0" />
                  <span className="truncate">{pw.name}</span>
                </Link>
              ))}
            </div>
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
                className="flex-1 py-1.5 px-2 bg-[#27F293]/10 hover:bg-[#27F293]/20 border border-[#27F293]/30 text-[#27F293] rounded-lg text-[10px] font-semibold text-center transition-colors cursor-pointer"
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
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-[#27F293] flex items-center justify-center text-[10px] font-bold text-zinc-950 shrink-0">
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
