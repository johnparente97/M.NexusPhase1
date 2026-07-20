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
    <div className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar shrink-0 select-none">
      <button
        onClick={() => onChange('')}
        className={cn(
          'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer whitespace-nowrap',
          {
            'bg-emerald-500 text-zinc-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20': !activeCategory,
            'bg-[#171719] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700': activeCategory,
          }
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
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
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer whitespace-nowrap',
              {
                'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-bold shadow-sm shadow-emerald-500/10': isActive,
                'bg-[#171719] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700': !isActive,
              }
            )}
          >
            {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-300' : 'text-zinc-500'}`} />}
            <span>{cat.label}</span>
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />}
          </button>
        );
      })}
    </div>
  );
};
export default CategoryChips;
