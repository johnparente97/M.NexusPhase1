import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryChips from '../components/marketplace/CategoryChips';
import WorkflowGrid from '../components/marketplace/WorkflowGrid';
import FeaturedCarousel from '../components/marketplace/FeaturedCarousel';
import EmptyState from '../components/ui/EmptyState';
import { useWorkflows } from '../hooks/useWorkflows';
import { useDebounce } from '../hooks/useDebounce';
import { Compass, Filter, LayoutGrid, List, X, Sparkles, CheckCircle2, ShieldCheck, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Workflow } from '@meridian-nexus/shared-types';
import { CATEGORY_LABELS } from '../utils/constants';

export default function Exchange() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [isFree, setIsFree] = useState(searchParams.get('isFree') === 'true');
  const [minRating, setMinRating] = useState(Number(searchParams.get('minRating')) || 0);
  const [sort, setSort] = useState(searchParams.get('sort') || 'popular');
  const [verified, setVerified] = useState(searchParams.get('verified') === 'true');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  // 1. Fetch query workflows listing
  const { data, isLoading } = useWorkflows({
    search: debouncedSearch,
    category: (category || undefined) as any,
    isFree: isFree || undefined,
    minRating: minRating || undefined,
    sort: (sort || undefined) as any,
    verified: verified || undefined,
    page,
    pageSize: 12,
  });

  const workflows = (data as any)?.workflows || (data as Workflow[]) || [];
  const total = (data as any)?.total || workflows.length;
  const totalPages = Math.ceil(total / 12);

  // Extract featured workflows for banner display
  const featuredWorkflows = workflows.filter((w: Workflow) => w.featuredOrder !== null).slice(0, 3);

  const handlePageChange = (p: number) => {
    setPage(p);
    setSearchParams((prev) => {
      prev.set('page', p.toString());
      return prev;
    });
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setIsFree(false);
    setMinRating(0);
    setVerified(false);
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(search || category || isFree || minRating > 0 || verified);

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-6 select-none pb-20">
      
      {/* ── Marketplace Title Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Workflow Exchange
            </h1>
            <span className="px-3 py-1 text-xs font-mono font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              x402 Protocol Native
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed font-normal">
            Discover, execute, and deploy decentralized AI agent workflows. Settlement-backed by Meridian Protocol on Base Sepolia.
          </p>
        </div>

        {/* Real-time Metric Pill */}
        <div className="flex items-center gap-4 shrink-0 text-xs font-medium text-zinc-300 bg-[#141417] border border-zinc-800/90 px-5 py-3 rounded-2xl shadow-xl shadow-black/30">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-md shadow-emerald-500/50" />
            <span className="text-white font-extrabold text-base">{total}</span>
            <span className="text-zinc-400">Active Capabilities</span>
          </div>
          <span className="text-zinc-800">|</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="h-4 w-4" />
            <span>100% Verified</span>
          </div>
        </div>
      </div>

      {/* ── Search Bar & Category Chips ── */}
      <div className="flex flex-col gap-4 w-full">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryChips activeCategory={category} onChange={setCategory} />
      </div>

      {/* ── Featured Banner Carousel ── */}
      {!search && !category && featuredWorkflows.length > 0 && (
        <FeaturedCarousel workflows={featuredWorkflows} />
      )}

      {/* ── Unified Horizontal Filter Command Toolbar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#141417] border border-zinc-800/90 p-4 rounded-2xl shadow-xl shadow-black/30 w-full select-none">
        
        {/* Left Controls: Sort Select + Verified Pill + Free Pill */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-zinc-950/90 border border-zinc-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-300">
            <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-wider">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-zinc-900 text-white">Most Popular</option>
              <option value="newest" className="bg-zinc-900 text-white">Newest Releases</option>
              <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
              <option value="price-asc" className="bg-zinc-900 text-white">Price: Low to High</option>
              <option value="price-desc" className="bg-zinc-900 text-white">Price: High to Low</option>
            </select>
          </div>

          {/* Verified Toggle Button Pill */}
          <button
            onClick={() => setVerified(!verified)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-sm ${
              verified
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/50 shadow-md shadow-emerald-500/10'
                : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <ShieldCheck className={`h-3.5 w-3.5 ${verified ? 'text-emerald-400' : 'text-zinc-500'}`} />
            <span>x402 Verified Only</span>
          </button>

          {/* Free Runs Toggle Button Pill */}
          <button
            onClick={() => setIsFree(!isFree)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer shadow-sm ${
              isFree
                ? 'bg-teal-500/15 text-teal-300 border-teal-500/50 shadow-md shadow-teal-500/10'
                : 'bg-zinc-950/80 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Sparkles className={`h-3.5 w-3.5 ${isFree ? 'text-teal-400' : 'text-zinc-500'}`} />
            <span>Free Runs</span>
          </button>

          {/* Active Filter Tags */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap ml-1">
              {category && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-xl font-bold">
                  {CATEGORY_LABELS[category] || category}
                  <X className="h-3.5 w-3.5 cursor-pointer hover:text-white" onClick={() => setCategory('')} />
                </span>
              )}
              {search && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 px-2.5 py-1 rounded-xl font-bold">
                  "{search}"
                  <X className="h-3.5 w-3.5 cursor-pointer hover:text-white" onClick={() => setSearch('')} />
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="text-xs text-zinc-400 hover:text-emerald-400 underline font-semibold ml-1 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Right Controls: Result Count & View Mode Switcher */}
        <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 border-t lg:border-t-0 border-zinc-800/80 pt-3 lg:pt-0">
          <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">
            Showing <span className="text-white font-extrabold">{workflows.length}</span> of <span className="text-white font-extrabold">{total}</span>
          </span>

          {/* Grid vs List View Mode Toggle */}
          <div className="flex items-center gap-1 bg-zinc-950/90 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Wide Capability Strips"
            >
              <List className="h-3.5 w-3.5" />
              <span>Strips</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-zinc-800 text-emerald-400 shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
              }`}
              title="Wide Feature Tiles"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Tiles</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Full-Width Workflows Container ── */}
      <div className="w-full flex flex-col gap-8">
        {!isLoading && workflows.length === 0 ? (
          <EmptyState
            icon={Compass}
            title="No capabilities match your criteria"
            description="Try clearing search keywords or resetting filters to explore all available AI workflows."
            actionLabel="Reset All Filters"
            onAction={handleClearFilters}
          />
        ) : (
          <>
            <WorkflowGrid workflows={workflows} isLoading={isLoading} viewMode={viewMode} />
            
            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-4 border-t border-zinc-800/80 pt-6">
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                <span className="text-xs text-zinc-400 font-semibold px-3.5 py-1.5 bg-[#141417] rounded-xl border border-zinc-800">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
