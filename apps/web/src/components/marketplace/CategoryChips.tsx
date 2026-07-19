import React from 'react';
import { WORKFLOW_CATEGORIES } from '@meridian-nexus/shared-types';
import { CATEGORY_ICONS } from '../../utils/constants';
import { cn } from '../../utils/cn';

export interface CategoryChipsProps {
  activeCategory?: string;
  onChange: (cat: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({ activeCategory, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar shrink-0 select-none">
      <button
        onClick={() => onChange('')}
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer whitespace-nowrap',
          {
            'bg-zinc-800 text-zinc-100 border-zinc-700 font-bold': !activeCategory,
            'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200': activeCategory,
          }
        )}
      >
        All Categories
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
                'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold': isActive,
                'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700': !isActive,
              }
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
export default CategoryChips;
