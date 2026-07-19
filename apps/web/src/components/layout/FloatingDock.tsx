import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Layers, History, LayoutDashboard, Search, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FloatingDockProps {
  onSearchClick: () => void;
  activeRunCount?: number;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ onSearchClick, activeRunCount = 0 }) => {
  const navigate = useNavigate();

  const dockItems = [
    { to: '/exchange', label: 'Exchange', icon: Compass },
    { to: '/studio', label: 'Studio', icon: Layers },
    { to: '/activity', label: 'Activity', icon: History },
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 px-4 py-2 rounded-full shadow-[0_16px_32px_-8px_rgba(0,0,0,0.8)] select-none">
      {/* Search Launcher */}
      <motion.button
        whileHover={{ scale: 1.2, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSearchClick}
        className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-[#00F5D4] hover:border-[#00F5D4]/40 transition-all cursor-pointer relative group"
        title="Spotlight Search (⌘K)"
      >
        <Search className="h-4 w-4" />
        {/* Tooltip */}
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-200 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          ⌘K Spotlight
        </span>
      </motion.button>

      <div className="h-4 w-px bg-zinc-800 mx-1" />

      {/* Dock Navigation Icons */}
      <div className="flex items-center gap-1.5">
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.25, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    'p-2.5 rounded-full transition-all relative group flex items-center justify-center',
                    {
                      'bg-[#00F5D4]/15 text-[#00F5D4] border border-[#00F5D4]/30 shadow-[0_0_12px_rgba(0,245,212,0.2)]':
                        isActive,
                      'bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 border border-zinc-800/60':
                        !isActive,
                    }
                  )}
                >
                  <Icon className="h-4.5 w-4.5" />
                  {/* Tooltip Label */}
                  <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-800 text-[10px] font-display font-semibold text-zinc-200 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {item.label}
                  </span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Active Execution Indicator Mini Badge */}
      {activeRunCount > 0 && (
        <>
          <div className="h-4 w-px bg-zinc-800 mx-1" />
          <motion.div
            whileHover={{ scale: 1.15, y: -3 }}
            onClick={() => navigate('/activity')}
            className="flex items-center gap-1.5 bg-indigo-950/50 border border-indigo-500/40 text-indigo-400 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer animate-pulse"
          >
            <div className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            <span>{activeRunCount} Active Run</span>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default FloatingDock;
