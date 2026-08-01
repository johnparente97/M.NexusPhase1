import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  MessageSquare,
  Target,
  Compass,
  Layers,
  Terminal,
  Bot,
  Cloud,
  Database,
  History,
  Coins,
  LayoutDashboard,
  Building2,
  Server,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
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

  const navSections = [
    {
      title: 'Use',
      items: [
        { to: '/chat', label: 'Chat', icon: MessageSquare },
        { to: '/missions', label: 'Missions', icon: Target },
      ]
    },
    {
      title: 'Explore',
      items: [
        { to: '/explore', label: 'Explore', icon: Compass },
        { to: '/workflows', label: 'Workflows', icon: Layers },
      ]
    },
    {
      title: 'Build',
      items: [
        { to: '/studio', label: 'Studio', icon: Terminal, requiresAuth: true },
        { to: '/agents/new', label: 'Agent Builder', icon: Bot, requiresAuth: true },
      ]
    },
    {
      title: 'Cloud',
      items: [
        { to: '/cloud', label: 'Nexus Cloud', icon: Cloud },
        { to: '/data', label: 'Data', icon: Database },
      ]
    },
    {
      title: 'Manage',
      items: [
        { to: '/activity', label: 'Activity', icon: History, requiresAuth: true },
        { to: '/payments', label: 'Payments', icon: Coins, requiresAuth: true },
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, requiresAuth: true },
        { to: '/teams', label: 'Teams', icon: Building2, requiresAuth: true },
      ]
    },
    {
      title: 'Provide',
      items: [
        { to: '/provide', label: 'Provider Hub', icon: Server },
      ]
    },
    {
      title: 'Developers',
      items: [
        { to: '/developer', label: 'Dev Console', icon: Terminal },
        { to: '/docs', label: 'Docs', icon: BookOpen },
      ]
    }
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 h-screen bg-[#0E0E14] border-r border-zinc-800/80 flex flex-col select-none transition-all duration-200 z-layer-header hidden lg:flex shrink-0 shadow-xl',
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
            </div>
          </Link>
        ) : (
          <Link to="/" className="mx-auto" title="Nexus">
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
      <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pb-6 pt-2">
        {navSections.map((section, idx) => {
          const visibleItems = section.items.filter(item => !(item as any).requiresAuth || isSignedIn);
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <h4 className="text-[10px] text-zinc-500 font-bold px-3 pt-3 pb-1 uppercase tracking-wider">
                  {section.title}
                </h4>
              )}
              {visibleItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between px-3 py-2 text-sm transition-all cursor-pointer group relative',
                        {
                          'border-l-2 border-violet-500 bg-violet-500/10 text-violet-300 font-semibold': isActive,
                          'border-l-2 border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]': !isActive,
                          'justify-center px-0 border-l-0 mx-2 rounded-xl': isCollapsed,
                          'bg-violet-500/10 text-violet-300': isActive && isCollapsed,
                          'hover:bg-white/[0.04]': !isActive && isCollapsed,
                        }
                      )
                    }
                  >
                    {({ isActive }) => (
                      <div className={cn("flex items-center gap-3", isActive && !isCollapsed && "ml-[10px]", !isActive && !isCollapsed && "ml-3")}>
                        <Icon className={cn('h-4 w-4 shrink-0 transition-colors', isActive ? 'text-violet-400' : 'text-zinc-400 group-hover:text-zinc-200')} />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* ── User Profile & Sidebar Collapse Toggle ── */}
      <div className="p-3 border-t border-zinc-800/80 shrink-0 bg-[#0E0E14] flex flex-col gap-2">
        {isSignedIn && !isCollapsed && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-7 w-7 rounded-full bg-violet-500 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-md">
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
            <ChevronRight className="h-4 w-4 text-violet-400" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 text-violet-400" />
              <span className="text-[11px] font-mono">Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default MissionControlSidebar;
