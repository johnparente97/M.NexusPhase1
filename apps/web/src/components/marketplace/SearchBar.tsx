import React from 'react';
import { Search, X, Command } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Search 19+ intelligent AI agent workflows...' 
}) => {
  return (
    <div className="relative w-full group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
        <Search className="h-4.5 w-4.5 text-zinc-400 group-focus-within:text-emerald-400 transition-colors shrink-0" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#141417] border border-zinc-800/90 rounded-2xl pl-12 pr-24 py-3.5 text-sm text-zinc-100 placeholder-zinc-500 hover:border-zinc-700/90 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 shadow-lg shadow-black/30 transition-all duration-200"
      />

      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
        {value ? (
          <button
            onClick={() => onChange('')}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 pointer-events-none select-none">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchBar;
