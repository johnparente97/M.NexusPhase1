import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Compass,
  Layers,
  History,
  LayoutDashboard,
  Search,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Coins,
  Building2,
  Terminal,
  BookOpen,
  Bot,
  User,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import { NexusLogoMark } from '../common/NexusLogoMark';
import DemoLabel from '../common/DemoLabel';

export interface MissionControlSidebarProps {
  onSearchClick: () => void;
}

export const MissionControlSidebar: React.FC<MissionControlSidebarProps> = ({ onSearchClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isSignedIn, user, signOut } = useAuth();

  const navItems: Array<{
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    requiresAuth?: boolean;
    tag?: string;
  }> = [
    { to: '/chat', label: 'Inference Chat', icon: Bot, tag: 'AI' },
    { to: '/marketplace/models', label: 'AntSeed Models', icon: Cpu },
    { to: '/exchange', label: 'Workflow Exchange', icon: Compass },
    { to: '/balance', label: 'Unified AI Balance', icon: Coins, requiresAuth: true },
    { to: '/studio', label: 'Nexus Studio', icon: Layers, requiresAuth: true },
    { to: '/activity', label: 'Run Activity', icon: History, requiresAuth: true },
    { to: '/dashboard', label: 'Command Centre', icon: LayoutDashboard, requiresAuth: true },
    { to: '/organization', label: 'Organization', icon: Building2, requiresAuth: true },
    { to: '/developer', label: 'Developer Console', icon: Terminal },
    { to: '/docs', label: 'Documentation', icon: BookOpen },
  ];

  return (
    <aside
      className={cn(
        'bg-[#121214] border-r border-zinc-800/80 flex flex-col h-screen sticky top-0 select-none transition-all duration-200 z-layer-header hidden lg:flex shrink-0 shadow-xl',
        {
          'w-64': !isCollapsed,
          'w-16': isCollapsed,
        }
      )}
    >
      {/* ── Top Brand Section (OpenAI/Claude Style) ── */}
      <div className="h-14 px-3 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
        {!isCollapsed ? (
          <Link to="/" className="flex items-center gap-2.5 group overflow-hidden">
            <NexusLogoMark className="h-7 w-7 text-emerald-400 shrink-0" />
            <span className="font-display font-bold text-sm text-white tracking-tight group-hover:text-emerald-300 transition-colors truncate">
              Meridian Nexus
            </span>
            <DemoLabel />
          </Link>
        ) : (
          <Link to="/" className="mx-auto" title="Meridian Nexus">
            <NexusLogoMark className="h-7 w-7 text-emerald-400" />
          </Link>
        )}
      </div>

      {/* ── ⌘K Search Command Launcher ── */}
      <div className="p-3 border-b border-zinc-800/80 shrink-0">
        {!isCollapsed ? (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-between gap-2 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-emerald-400" />
              <span>⌘K Search</span>
            </div>
            <kbd className="text-[9px] font-mono bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500">
              ⌘K
            </kbd>
          </button>
        ) : (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/60 transition-colors cursor-pointer"
            title="Spotlight Search (⌘K)"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Main Navigation List ── */}
      <div className="flex-1 py-3 px-2 overflow-y-auto no-scrollbar space-y-1">
        {navItems.map((item) => {
          if (item.requiresAuth && !isSignedIn) return null;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all group relative',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn('h-4 w-4 shrink-0 transition-colors', {
                      'text-emerald-400': isActive,
                      'text-zinc-500 group-hover:text-zinc-300': !isActive,
                    })}
                  />

                  {!isCollapsed && (
                    <span className="truncate flex-1">{item.label}</span>
                  )}

                  {!isCollapsed && item.tag && (
                    <span className="text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {item.tag}
                    </span>
                  )}

                  {/* Tooltip when collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-16 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium px-2.5 py-1.5 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-layer-dropdown">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* ── Bottom Section: Profile & Sidebar Toggle ── */}
      <div className="p-2 border-t border-zinc-800/80 shrink-0 space-y-2">
        {/* User Card */}
        {isSignedIn && !isCollapsed && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-xs">
            <div className="flex items-center gap-2 truncate">
              <div className="h-6 w-6 rounded-full bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center text-[10px]">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-zinc-300 font-medium truncate">{user?.displayName || 'User'}</span>
            </div>
            <button
              onClick={() => signOut()}
              className="text-zinc-500 hover:text-red-400 p-1 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors cursor-pointer"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
    </aside>
  );
};

export default MissionControlSidebar;
