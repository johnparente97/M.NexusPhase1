import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  MessageSquare,
  Compass,
  Layers,
  Terminal,
  Bot,
  Cloud,
  Coins,
  Activity,
  Server,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Award,
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
      title: 'Marketplace & Suite',
      items: [
        { to: '/explore', label: 'Explore Marketplace', icon: Compass },
        { to: '/chat', label: 'AI Chat & Agents', icon: MessageSquare },
      ]
    },
    {
      title: 'Build & Compose',
      items: [
        { to: '/compose', label: 'Build Agent / Workflow', icon: Terminal },
        { to: '/studio', label: 'Visual Graph Studio', icon: Layers },
      ]
    },
    {
      title: 'Run & Operate',
      items: [
        { to: '/activity', label: 'Activity & Receipts', icon: Activity },
        { to: '/cloud', label: 'Workspace Files & Memory', icon: Cloud },
      ]
    },
    {
      title: 'Workspace & Creator',
      items: [
        { to: '/dashboard', label: 'Workspace Overview', icon: Bot },
        { to: '/creator', label: 'Creator Console & Earnings', icon: Coins },
        { to: '/payments', label: 'Membership & Credits', icon: Award },
      ]
    },
    {
      title: 'Developer & Trust',
      items: [
        { to: '/developer', label: 'Developer Console', icon: Terminal },
        { to: '/docs', label: 'Documentation', icon: BookOpen },
        { to: '/trust', label: 'Trust Center', icon: ShieldCheck },
      ]
    }
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 bottom-0 h-screen bg-[#0A0A14] border-r border-white/[0.08] flex flex-col select-none transition-all duration-200 z-layer-header hidden lg:flex shrink-0 shadow-2xl backdrop-blur-2xl',
        {
          'w-64': !isCollapsed,
          'w-16': isCollapsed,
        }
      )}
    >
      {/* ── Top Brand Header ── */}
      <div className="h-14 px-3 border-b border-white/[0.08] flex items-center justify-between shrink-0">
        {!isCollapsed ? (
          <Link to="/" className="flex items-center gap-2.5 group overflow-hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 ring-1 ring-purple-500/30 group-hover:ring-[#00F5D4]/60 transition-all">
              <NexusLogoMark className="h-5 w-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-display font-extrabold text-sm text-white tracking-tight group-hover:text-prismatic transition-all truncate">
                Nexus
              </span>
            </div>
          </Link>
        ) : (
          <Link to="/" className="mx-auto" title="Nexus">
            <NexusLogoMark className="h-6 w-6" />
          </Link>
        )}
      </div>

      {/* ── ⌘K Search Launcher ── */}
      <div className="p-3 border-b border-white/[0.08] shrink-0">
        {!isCollapsed ? (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-between gap-2 bg-[#0F0F1D] border border-white/[0.08] hover:border-[#00F5D4]/40 text-zinc-400 hover:text-white px-3 py-2 rounded-xl text-xs transition-all cursor-pointer shadow-sm group"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#00F5D4] transition-colors" />
              <span>Search Nexus...</span>
            </div>
            <kbd className="text-[9px] text-zinc-500 bg-[#05050A] border border-white/[0.08] px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
          </button>
        ) : (
          <button
            onClick={onSearchClick}
            className="w-full flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-[#00F5D4] hover:bg-white/[0.05] transition-colors cursor-pointer"
            title="Search (⌘K)"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Navigation Links List ── */}
      <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar pb-6 pt-2">
        {navSections.map((section, idx) => {
          const visibleItems = section.items;
          if (visibleItems.length === 0) return null;

          return (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <h4 className="text-[10px] text-[#00F5D4] font-bold px-3 pt-3 pb-1 uppercase tracking-wider font-mono">
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
                        'flex items-center justify-between px-3 py-2 text-xs transition-all cursor-pointer group relative font-medium',
                        {
                          'border-l-2 border-[#00F5D4] bg-gradient-to-r from-[#00F5D4]/15 via-[#A855F7]/10 to-transparent text-white font-bold shadow-[0_0_15px_rgba(0,245,212,0.15)]': isActive,
                          'border-l-2 border-transparent text-zinc-400 hover:text-white hover:bg-white/[0.05]': !isActive,
                          'justify-center px-0 border-l-0 mx-2 rounded-xl': isCollapsed,
                          'bg-[#00F5D4]/15 text-[#00F5D4]': isActive && isCollapsed,
                          'hover:bg-white/[0.05]': !isActive && isCollapsed,
                        }
                      )
                    }
                  >
                    {({ isActive }) => (
                      <div className={cn("flex items-center gap-3", isActive && !isCollapsed && "ml-[10px]", !isActive && !isCollapsed && "ml-3")}>
                        <Icon className={cn('h-4 w-4 shrink-0 transition-colors', isActive ? 'text-[#00F5D4]' : 'text-zinc-400 group-hover:text-white')} />
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
      <div className="p-3 border-t border-white/[0.08] shrink-0 bg-[#0A0A14] flex flex-col gap-2">
        {isSignedIn && !isCollapsed && (
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#0F0F1D] border border-white/[0.08]">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-[#00F5D4] via-[#A855F7] to-[#FF007F] text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-md">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-white truncate">{user?.displayName || 'User'}</span>
                <span className="text-[10px] text-zinc-500 font-mono truncate">{user?.email || 'Connected'}</span>
              </div>
            </div>

            <button
              onClick={signOut}
              className="p-1 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-[#0F0F1D] border border-white/[0.08] hover:border-[#00F5D4]/40 text-zinc-400 hover:text-white text-xs font-semibold transition-all cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4 text-[#00F5D4]" /> : <ChevronLeft className="h-4 w-4 text-[#00F5D4]" />}
          {!isCollapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
};

export default MissionControlSidebar;
