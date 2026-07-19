import React from 'react';
import { Card } from '../ui/Card';
import { Toggle } from '../ui/Toggle';
import { Select } from '../ui/Select';
import { WORKFLOW_CATEGORIES } from '@meridian-nexus/shared-types';

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
}) => {
  return (
    <Card className="flex flex-col gap-6 w-full md:max-w-[240px] shrink-0 bg-zinc-900 border-zinc-800 p-5">
      
      {/* Category Filter */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-semibold text-zinc-300">Category</h4>
        <Select
          value={category || ''}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full text-xs"
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
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-semibold text-zinc-300">Sort By</h4>
        <Select
          value={sort || 'popular'}
          onChange={(e) => setSort(e.target.value)}
          className="w-full text-xs"
        >
          <option value="popular">Most Popular</option>
          <option value="newest">Newest Releases</option>
          <option value="rating">Highest Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </Select>
      </div>

      <hr className="border-zinc-800" />

      {/* Verified Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-xs font-semibold text-zinc-300">Verified Only</h4>
          <span className="text-[10px] text-zinc-500">Trusted workflows only</span>
        </div>
        <Toggle checked={!!verified} onChange={setVerified} />
      </div>

      {/* Free workflows Toggle */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-xs font-semibold text-zinc-300">Free Runs</h4>
          <span className="text-[10px] text-zinc-500">Only free tier options</span>
        </div>
        <Toggle checked={!!isFree} onChange={setIsFree} />
      </div>

      <hr className="border-zinc-800" />

      {/* Ratings Filter */}
      <div className="flex flex-col gap-2.5">
        <h4 className="text-xs font-semibold text-zinc-300">Minimum Rating</h4>
        <div className="flex items-center gap-1.5 justify-between">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              onClick={() => setMinRating(val === minRating ? 0 : val)}
              className={`text-xs px-2.5 py-1 rounded font-bold border transition-colors ${
                minRating === val
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {val}★
            </button>
          ))}
        </div>
      </div>

    </Card>
  );
};
export default FilterSidebar;
