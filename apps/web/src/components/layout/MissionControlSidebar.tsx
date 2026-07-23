import React from 'react';
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
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import { NexusLogoMark } from '../common/NexusLogoMark';
import { useSidebarStore } from '../../stores/sidebar-store';

export interface MissionControlSidebarProps {
  onSearchClick: () => void;
}

export const MissionControlSidebar: React.FC<MissionControlSidebarProps> = ({ onSearchClick }) => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const { isSignedIn, user, signOut } = useAuth();

  const navItems: Array<{
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    requiresAuth?: boolean;
    tag?: string;
  }> = [
    { to: '/chat', label: 'Inference Hub', icon: Bot, tag: 'Free' },
    { to: '/marketplace/models', label: 'Model Hub', icon: Cpu },
    { to: '/exchange', label: 'Workflow Market', icon: Compass },
    { to: '/balance', label: 'AI Vault', icon: Coins, requiresAuth: true },
    { to: '/studio', label: 'Workflow Builder', icon: Layers, requiresAuth: true },
    { to: '/activity', label: 'Live Activity', icon: History, requiresAuth: true },
    { to: '/dashboard', label: 'Mission Control', icon: LayoutDashboard, requiresAuth: true },
    { to: '/organization', label: 'Team Workspace', icon: Building2, requiresAuth: true },
    { to: '/developer', label: 'Dev Hub', icon: Terminal },
    { to: '/docs', label: 'Docs', icon: BookOpen },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 h-screen bg-[#121214] border-r border-zinc-800/80 flex flex-col select-none transition-all duration-200 z-layer-header hidden lg:flex shrink-0 shadow-xl',
        {
          'w-64': !isCollapsed,
          'w-16': isCollapsed,
        }
      )}
    >
      {/* ── Top Brand Header ── */}
      <div className="h-14 px-3 border-b border-zinc-800/80 flex items-center justify-between shrink-0">
        {!isCollapsed ? (
          <Link to="/" className="flex items-center gap-2.5 group overflow-hidden">
            <NexusLogoMark className="h-7 w-7 text-emerald-400 shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-sm text-white tracking-tight group-hover:text-emerald-300 transition-colors truncate">
                Nexus
              </span>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-none">
                Powered by Meridian
              </span>
            </div>
          </Link>
        ) : (
          <Link to="/" className="mx-auto" title="Nexus • Powered by Meridian">
            <NexusLogoMark className="h-7 w-7 text-emerald-400" />
          </Link>
        )}
      </div>

      {/* ── ⌘K Search Launcher ── */}
      <div className="p-3 border-b border-zinc-800/80 shrink-0">
        {!isCollapsed ? (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-between gap-2 bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200 px-3 py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
              <span>Search Nexus...</span>
            </div>
            <kbd className="text-[9px] text-zinc-500 bg-zinc-950 border border-zinc-800 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>
        ) : (
          <button
            onClick={onSearchClick}
            className="w-10 h-10 mx-auto flex items-center justify-center bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-emerald-400 rounded-xl transition-all cursor-pointer shadow-sm"
            title="Search (⌘K)"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Navigation Links List ── */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 no-scrollbar">
        {navItems.map((item) => {
          if (item.requiresAuth && !isSignedIn) return null;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              title={isCollapsed ? item.label : undefined}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer group',
                  {
                    'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold shadow-sm': isActive,
                    'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80': !isActive,
                    'justify-center px-0': isCollapsed,
                  }
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={cn('h-4 w-4 shrink-0 transition-colors', isActive ? 'text-emerald-400' : 'text-zinc-400 group-hover:text-zinc-200')} />
                    {!isCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.tag && (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                      {item.tag}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* ── User Profile & Sidebar Collapse Toggle ── */}
      <div className="p-3 border-t border-zinc-800/80 shrink-0 bg-[#121214] flex flex-col gap-2">
        {isSignedIn && !isCollapsed && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-7 w-7 rounded-full bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center text-xs shrink-0 shadow-md">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-xs font-medium text-zinc-200 truncate">{user?.displayName || 'User'}</span>
            </div>
            <button
              onClick={signOut}
              className="text-zinc-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 text-zinc-400 hover:text-zinc-200 text-xs transition-all cursor-pointer"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-emerald-400" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 text-emerald-400" />
              <span className="text-[11px] font-mono">Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default MissionControlSidebar;
