import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryChips from '../components/marketplace/CategoryChips';
import WorkflowGrid from '../components/marketplace/WorkflowGrid';
import FeaturedCarousel from '../components/marketplace/FeaturedCarousel';
import EmptyState from '../components/ui/EmptyState';
import { useWorkflows } from '../hooks/useWorkflows';
import { useDebounce } from '../hooks/useDebounce';
import { Compass, Filter, LayoutGrid, List, X, Sparkles, CheckCircle2, ShieldCheck, RotateCcw, Search, TrendingUp, HelpCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Workflow } from '@meridian-nexus/shared-types';
import { CATEGORY_LABELS } from '../utils/constants';
import WorkflowCard from '../components/marketplace/WorkflowCard';

export default function Exchange() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  // Read URL search params for bookmarkable state
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const isFree = searchParams.get('isFree') === 'true';
  const verified = searchParams.get('verified') === 'true';
  const sort = searchParams.get('sort') || 'popular';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Debounce search input to avoid double fetching
  const debouncedSearch = useDebounce(search, 300);

  // Set Search State helpers
  const setSearch = (val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val) next.set('search', val);
    else next.delete('search');
    next.set('page', '1');
    setSearchParams(next);
  };

  const setCategory = (val: string) => {
    const next = new URLSearchParams(searchParams);
    if (val) next.set('category', val);
    else next.delete('category');
    next.set('page', '1');
    setSearchParams(next);
  };

  const setIsFree = (val: boolean) => {
    const next = new URLSearchParams(searchParams);
    if (val) next.set('isFree', 'true');
    else next.delete('isFree');
    next.set('page', '1');
    setSearchParams(next);
  };

  const setVerified = (val: boolean) => {
    const next = new URLSearchParams(searchParams);
    if (val) next.set('verified', 'true');
    else next.delete('verified');
    next.set('page', '1');
    setSearchParams(next);
  };

  const setSort = (val: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', val);
    setSearchParams(next);
  };

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', nextPage.toString());
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Fetch workflows matching filters
  const { data: workflows = [], isLoading, error } = useWorkflows({
    search: debouncedSearch,
    category: (category || undefined) as any,
    isFree: isFree || undefined,
    verified: verified || undefined,
    sort: sort as any,
    page,
    pageSize: 12,
  });

  const total = workflows.length;
  const hasActiveFilters = search || category || isFree || verified;

  const featuredWorkflows = workflows.filter((w) => w.featuredOrder !== null)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));

  const trendingWorkflows = workflows.slice(0, 3);

  // Suggested searches matching our seed agents
  const SUGGESTED_SEARCHES = [
    { label: 'Solidity Audit', query: 'Solidity' },
    { label: 'OpenAPI Creator', query: 'OpenAPI' },
    { label: 'Company Brief', query: 'Company' },
    { label: 'React Components', query: 'React' }
  ];

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-10 select-none">
      
      {/* ── Premium Hero Area ── */}
      <section className="relative bg-gradient-to-br from-[#121214] via-zinc-950 to-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-10 overflow-hidden shadow-2xl shadow-black/60 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Glow meshes */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col gap-4 max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Meridian Protocol Native
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.1]">
            Discover AI Workflows
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
            Run verified AI workflows powered by Meridian Protocol. Pay per execution using x402 header settlement. Earn MRDN Cashback. Deploy in seconds.
          </p>

          {/* Natural Language Suggested Searches */}
          <div className="flex items-center gap-2 flex-wrap mt-2 text-xs">
            <span className="text-zinc-500 font-bold">Suggested:</span>
            {SUGGESTED_SEARCHES.map((item) => (
              <button
                key={item.label}
                onClick={() => setSearch(item.query)}
                className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer font-bold"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time stats panel */}
        <div className="flex flex-col gap-3 bg-[#171719]/90 border border-zinc-800/80 p-5 rounded-2xl shadow-xl shrink-0 w-full sm:w-72 z-10 relative">
          <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-2.5">
            <span className="text-zinc-500 font-bold">Base Gas Price</span>
            <span className="text-emerald-400 font-mono font-bold">0.02 Gwei</span>
          </div>
          <div className="flex justify-between items-center text-xs border-b border-zinc-900 pb-2.5">
            <span className="text-zinc-500 font-bold">Settlement Protocol</span>
            <span className="text-white font-mono font-bold">x402 Direct</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500 font-bold">Synthesis Uptime</span>
            <span className="text-emerald-400 font-mono font-bold">100.0%</span>
          </div>
        </div>

      </section>

      {/* ── Curated Section A: Featured Showcases ── */}
      {!search && !category && featuredWorkflows.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-sm text-zinc-300 uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Featured Showcases
            </h2>
          </div>
          <FeaturedCarousel workflows={featuredWorkflows} />
        </div>
      )}

      {/* ── Curated Section B: Trending Today ── */}
      {!search && !category && trendingWorkflows.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-black text-sm text-zinc-300 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-400 animate-pulse" />
              Trending Today
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {trendingWorkflows.map((w) => (
              <WorkflowCard key={w.id} workflow={w} />
            ))}
          </div>
        </div>
      )}

      {/* ── Curated Section C: Workflow Catalog Marketplace ── */}
      <section className="flex flex-col gap-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div className="flex flex-col gap-1">
            <h2 className="font-display font-black text-xl text-white">
              Workflow Catalog
            </h2>
            <p className="text-xs text-zinc-500">
              Browse the largest directory of autonomous capabilities.
            </p>
          </div>

          {/* Search bar integration */}
          <div className="w-full md:w-80">
            <SearchBar value={search} onChange={setSearch} />
          </div>
        </div>

        {/* Collapsible Category pills */}
        <div className="w-full">
          <CategoryChips activeCategory={category} onChange={setCategory} />
        </div>

        {/* Toolbar Center Control bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#141417]/80 border border-zinc-800/80 p-3.5 rounded-2xl shadow-xl w-full">
          
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Collapsible filters expand trigger button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border active:scale-95 ${
                showFilters 
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Filter className="h-3.5 w-3.5" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            {/* Sort Dropdown Selector */}
            <div className="flex items-center gap-1.5 bg-zinc-950 border border-zinc-800 px-3.5 py-2 rounded-xl text-xs font-black text-zinc-400">
              <span className="text-zinc-500 font-black uppercase text-[9px] tracking-wider">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent text-xs font-black text-white focus:outline-none cursor-pointer"
              >
                <option value="popular" className="bg-zinc-900 text-white font-bold">Popular</option>
                <option value="newest" className="bg-zinc-900 text-white font-bold">Newest</option>
                <option value="rating" className="bg-zinc-900 text-white font-bold">Rated</option>
                <option value="price-asc" className="bg-zinc-900 text-white font-bold">Price: Low</option>
                <option value="price-desc" className="bg-zinc-900 text-white font-bold">Price: High</option>
              </select>
            </div>

            {/* Active filters summary */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap">
                {category && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-xl font-extrabold shadow-sm">
                    {CATEGORY_LABELS[category] || category}
                    <X className="h-3.5 w-3.5 cursor-pointer hover:text-white" onClick={() => setCategory('')} />
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-indigo-500/15 text-indigo-300 border border-indigo-500/40 px-3 py-1 rounded-xl font-extrabold shadow-sm">
                    "{search}"
                    <X className="h-3.5 w-3.5 cursor-pointer hover:text-white" onClick={() => setSearch('')} />
                  </span>
                )}
                <button
                  onClick={handleClearFilters}
                  className="inline-flex items-center gap-1 text-[10px] text-zinc-500 hover:text-emerald-400 font-extrabold ml-1 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 shrink-0 justify-between lg:justify-end border-t lg:border-t-0 border-zinc-800/80 pt-3 lg:pt-0">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
              {workflows.length} Catalog matches
            </span>

            {/* Segmented View Mode Toggle */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-850">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer active:scale-95 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 shadow-md shadow-emerald-500/20' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <List className="h-3.5 w-3.5" />
                <span>Strips</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer active:scale-95 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 shadow-md shadow-emerald-500/20' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Tiles</span>
              </button>
            </div>
          </div>

        </div>

        {/* Collapsible Filters Drawer panel */}
        {showFilters && (
          <div className="bg-[#141417] border border-zinc-850 p-5 rounded-2xl shadow-xl flex flex-wrap gap-5 select-none w-full animate-slideDown">
            
            <div className="flex flex-col gap-2 min-w-44">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Verification</span>
              <button
                onClick={() => setVerified(!verified)}
                className={`inline-flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  verified
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>x402 Verified Only</span>
                </div>
                {verified && <CheckCircle2 className="h-3.5 w-3.5 fill-emerald-400 text-zinc-950" />}
              </button>
            </div>

            <div className="flex flex-col gap-2 min-w-44">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Pricing tier</span>
              <button
                onClick={() => setIsFree(!isFree)}
                className={`inline-flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isFree
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-400 shadow-sm'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Free Runs Only</span>
                </div>
                {isFree && <CheckCircle2 className="h-3.5 w-3.5 fill-teal-400 text-zinc-950" />}
              </button>
            </div>

          </div>
        )}

        {/* Workflows listing / grid render */}
        {isLoading ? (
          <WorkflowGrid isLoading={true} viewMode={viewMode} />
        ) : error ? (
          <div className="bg-red-950/20 border border-red-900/30 rounded-2xl p-6 text-center text-red-400 font-bold">
            Failed to fetch capabilities from the registry. Please check fallback settings.
          </div>
        ) : workflows.length === 0 ? (
          <EmptyState
            title="No capabilities found"
            description="Try modifying search query, category parameters or clearing filters."
            icon={Compass}
            actionLabel="Reset Search Parameters"
            onAction={handleClearFilters}
          />
        ) : (
          <WorkflowGrid workflows={workflows} viewMode={viewMode} />
        )}

      </section>

    </div>
  );
}
