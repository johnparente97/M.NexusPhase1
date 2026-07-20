import React from 'react';
import { Toggle } from '../ui/Toggle';
import { Select } from '../ui/Select';
import { WORKFLOW_CATEGORIES } from '@meridian-nexus/shared-types';
import { Filter, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export interface FilterSidebarProps {
  category?: string;
  setCategory: (val: string) => void;
  isFree?: boolean;
  setIsFree: (val: boolean) => void;
  minRating?: number;
  setMinRating: (val: number) => void;
  sort?: string;
  setSort: (val: string) => void;
  verified?: boolean;
  setVerified: (val: boolean) => void;
  onReset?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  category,
  setCategory,
  isFree,
  setIsFree,
  minRating,
  setMinRating,
  sort,
  setSort,
  verified,
  setVerified,
  onReset,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full md:w-64 shrink-0 bg-[#141417] border border-zinc-800/90 rounded-2xl p-6 shadow-xl shadow-black/30 select-none">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3.5">
        <div className="flex items-center gap-2 text-sm font-extrabold text-white tracking-tight">
          <Filter className="h-4 w-4 text-emerald-400" />
          <span>Filter Agents</span>
        </div>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs text-zinc-400 hover:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer font-semibold"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Category</label>
        <Select
          value={category || ''}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full text-xs bg-zinc-950/90 border-zinc-800 rounded-xl focus:border-emerald-500 py-2.5 font-medium text-zinc-200"
        >
          <option value="">All Categories</option>
          {WORKFLOW_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </Select>
      </div>

      {/* Sorting */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Sort By</label>
        <Select
          value={sort || 'popular'}
          onChange={(e) => setSort(e.target.value)}
          className="w-full text-xs bg-zinc-950/90 border-zinc-800 rounded-xl focus:border-emerald-500 py-2.5 font-medium text-zinc-200"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest Releases</option>
          <option value="rating">Highest Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Select>
      </div>

      <hr className="border-zinc-800/80 my-0.5" />

      {/* Verified Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1 text-xs font-bold text-zinc-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Verified Only</span>
          </div>
          <span className="text-[11px] text-zinc-500 font-medium">x402 audited models</span>
        </div>
        <Toggle checked={!!verified} onChange={setVerified} />
      </div>

      {/* Free workflows Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-xs font-semibold text-zinc-200">Free Runs</h4>
          <span className="text-[11px] text-zinc-500">No deposit required</span>
        </div>
        <Toggle checked={!!isFree} onChange={setIsFree} />
      </div>

      <hr className="border-zinc-800/80 my-1" />

      {/* Minimum Rating */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-semibold text-zinc-300">Minimum Rating</h4>
        <div className="grid grid-cols-5 gap-1.5">
          {[0, 2, 3, 4, 5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                minRating === r
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {r === 0 ? 'All' : `${r}★`}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
export default FilterSidebar;
