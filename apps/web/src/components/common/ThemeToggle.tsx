import React from 'react';
import { Sun, Moon, Clock } from 'lucide-react';
import { useThemeStore } from '../../stores/theme-store';
import { cn } from '../../utils/cn';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className, showLabel = false }) => {
  const { mode, activeTheme, toggleTheme, setMode } = useThemeStore();

  const handleNextMode = () => {
    if (mode === 'auto') {
      setMode('day');
    } else if (mode === 'day') {
      setMode('night');
    } else {
      setMode('auto');
    }
  };

  return (
    <button
      onClick={handleNextMode}
      className={cn(
        'flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer select-none border',
        activeTheme === 'day'
          ? 'bg-amber-500/10 text-amber-600 border-amber-500/30 hover:bg-amber-500/20'
          : 'bg-purple-500/15 text-[#00F5D4] border-purple-500/30 hover:bg-purple-500/25 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
        className
      )}
      title={`Theme Mode: ${mode} (Current: ${activeTheme}). Click to cycle.`}
    >
      {mode === 'auto' ? (
        <Clock className="h-3.5 w-3.5 animate-pulse" />
      ) : activeTheme === 'day' ? (
        <Sun className="h-3.5 w-3.5 text-amber-500" />
      ) : (
        <Moon className="h-3.5 w-3.5 text-[#00F5D4]" />
      )}

      {showLabel && (
        <span className="hidden sm:inline capitalize">
          {mode === 'auto' ? `Auto (${activeTheme})` : activeTheme}
        </span>
      )}
    </button>
  );
};
