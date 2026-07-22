import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Compass,
  Layers,
  History,
  LayoutDashboard,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cpu,
  Coins,
  Building2,
  Terminal,
  BookOpen,
  Bot,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

export interface MissionControlSidebarProps {
  onSearchClick: () => void;
}

export const MissionControlSidebar: React.FC<MissionControlSidebarProps> = ({ onSearchClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isSignedIn } = useAuth();

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

  return (
    <aside
      className={cn(
        'bg-[#171719]/90 border-r border-zinc-800/80 backdrop-blur-md flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none transition-all duration-200 z-layer-header hidden lg:flex shrink-0',
        {
          'w-64': !isCollapsed,
          'w-16': isCollapsed,
        }
      )}
    >
      {/* ⌘K Search Command Trigger */}
      <div className="p-3 border-b border-zinc-900 shrink-0">
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
            className="w-full flex items-center justify-center p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-emerald-400"
            title="Spotlight Search (⌘K)"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Navigation List Container (Independent scrolling) */}
      <nav className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
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
                  'flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group',
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                )
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </div>

              {!isCollapsed && item.tag && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {item.tag}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse / Expand Footer Toggle */}
      <div className="p-3 border-t border-zinc-900 shrink-0 flex items-center justify-between">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-zinc-200 p-2 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="font-mono text-[10px]">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default MissionControlSidebar;
