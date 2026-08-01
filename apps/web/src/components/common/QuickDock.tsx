import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, Terminal, Cloud, Search, Coins, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

interface QuickDockProps {
  onSearchClick: () => void;
}

export const QuickDock: React.FC<QuickDockProps> = ({ onSearchClick }) => {
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1 p-1.5 rounded-2xl bg-[var(--nx-surface-1)]/90 border border-[var(--nx-border)] backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] select-none">
      
      <NavLink
        to="/chat"
        title="AI Chat"
        className={({ isActive }) =>
          cn(
            'p-2.5 rounded-xl transition-all flex items-center justify-center text-xs font-semibold gap-1.5',
            isActive
              ? 'bg-[#00F5D4] text-zinc-950 shadow-[0_0_15px_rgba(0,245,212,0.4)] font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
          )
        }
      >
        <MessageSquare className="h-4 w-4" />
        <span className="text-[11px]">Chat</span>
      </NavLink>

      <NavLink
        to="/studio"
        title="Workflow Studio"
        className={({ isActive }) =>
          cn(
            'p-2.5 rounded-xl transition-all flex items-center justify-center text-xs font-semibold gap-1.5',
            isActive
              ? 'bg-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
          )
        }
      >
        <Terminal className="h-4 w-4" />
        <span className="text-[11px]">Studio</span>
      </NavLink>

      <NavLink
        to="/cloud"
        title="Nexus Cloud Storage"
        className={({ isActive }) =>
          cn(
            'p-2.5 rounded-xl transition-all flex items-center justify-center text-xs font-semibold gap-1.5',
            isActive
              ? 'bg-[#FF007F] text-white shadow-[0_0_15px_rgba(255,0,127,0.4)] font-bold'
              : 'text-zinc-400 hover:text-white hover:bg-white/[0.08]'
          )
        }
      >
        <Cloud className="h-4 w-4" />
        <span className="text-[11px]">Cloud</span>
      </NavLink>

      <div className="h-5 w-[1px] bg-white/[0.1] mx-1" />

      <button
        onClick={onSearchClick}
        title="Search Nexus (⌘K)"
        className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
      >
        <Search className="h-4 w-4 text-[#00F5D4]" />
        <span className="text-[11px]">Search</span>
      </button>

      <NavLink
        to="/payments"
        title="Payments & Vault"
        className="p-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-all flex items-center gap-1.5 text-xs font-semibold"
      >
        <Coins className="h-4 w-4 text-[#FFD700]" />
        <span className="text-[11px]">Vault</span>
      </NavLink>
    </div>
  );
};
