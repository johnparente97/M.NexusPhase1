import React from 'react';
import { WORKFLOW_CATEGORIES } from '@meridian-nexus/shared-types';
import { CATEGORY_ICONS } from '../../utils/constants';
import { cn } from '../../utils/cn';
import { Sparkles } from 'lucide-react';

export interface CategoryChipsProps {
  activeCategory?: string;
  onChange: (cat: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ activeCategory, onChange }) => {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto py-1 px-0.5 no-scrollbar shrink-0 select-none">
      <button
        onClick={() => onChange('')}
        className={cn(
          'inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-black border transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95',
          {
            'bg-gradient-to-r from-emerald-400 to-teal-400 text-zinc-950 border-emerald-300 shadow-lg shadow-emerald-500/30 font-extrabold': !activeCategory,
            'bg-[#141417]/90 text-zinc-400 border-zinc-800/90 hover:text-white hover:border-emerald-500/40 hover:bg-zinc-900/90 hover:shadow-md': activeCategory,
          }
        )}
      >
        <Sparkles className={`h-3.5 w-3.5 ${!activeCategory ? 'fill-zinc-950 text-zinc-950' : 'text-emerald-400'}`} />
        <span>All Capabilities</span>
      </button>

      {WORKFLOW_CATEGORIES.map((cat) => {
        const isActive = cat.value === activeCategory;
        const Icon = CATEGORY_ICONS[cat.value] || null;

        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold border transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95',
              {
                'bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-500/15 backdrop-blur-md': isActive,
                'bg-[#141417]/90 text-zinc-400 border-zinc-800/90 hover:text-white hover:border-zinc-700 hover:bg-zinc-900/90': !isActive,
              }
            )}
          >
            {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-500'}`} />}
            <span>{cat.label}</span>
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5 shadow-sm shadow-emerald-500" />}
          </button>
        );
      })}
    </div>
  );
};
export default CategoryChips;
