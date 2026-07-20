import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/marketplace/SearchBar';
import CategoryChips from '../components/marketplace/CategoryChips';
import FilterSidebar from '../components/marketplace/FilterSidebar';
import WorkflowGrid from '../components/marketplace/WorkflowGrid';
import FeaturedCarousel from '../components/marketplace/FeaturedCarousel';
import EmptyState from '../components/ui/EmptyState';
import { useWorkflows } from '../hooks/useWorkflows';
import { useDebounce } from '../hooks/useDebounce';
import { Compass, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Workflow } from '@meridian-nexus/shared-types';

export default function Exchange() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [isFree, setIsFree] = useState(searchParams.get('isFree') === 'true');
  const [minRating, setMinRating] = useState(Number(searchParams.get('minRating')) || 0);
  const [sort, setSort] = useState(searchParams.get('sort') || 'popular');
  const [verified, setVerified] = useState(searchParams.get('verified') === 'true');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
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

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 py-6 gap-6 select-none pb-16">
      
      {/* Search Header Banner */}
      <div className="flex flex-col gap-4 w-full">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryChips activeCategory={category} onChange={setCategory} />
      </div>

      {/* Featured Banner Carousel */}
      {!search && !category && featuredWorkflows.length > 0 && (
        <FeaturedCarousel workflows={featuredWorkflows} />
      )}

      {/* Mobile filter Toggle controls */}
      <div className="flex items-center justify-between md:hidden border-b border-zinc-900 pb-3">
        <span className="text-xs text-zinc-500 font-bold uppercase">Workflows list ({total})</span>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-1.5"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Layout Columns */}
      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        {/* Desktop Sidebar Filters */}
        <div className="hidden md:block">
          <FilterSidebar
            category={category}
            setCategory={setCategory}
            isFree={isFree}
            setIsFree={setIsFree}
            minRating={minRating}
            setMinRating={setMinRating}
            sort={sort}
            setSort={setSort}
            verified={verified}
            setVerified={setVerified}
            onReset={handleClearFilters}
          />
        </div>

        {/* Mobile slide drawer filters */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/70 md:hidden p-4 sm:p-6 flex flex-col justify-end">
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-900">
                <span className="text-sm font-semibold text-zinc-200">Adjust Filters</span>
                <button onClick={() => setShowMobileFilters(false)} className="text-xs text-zinc-500 font-bold">Close</button>
              </div>
              <FilterSidebar
                category={category}
                setCategory={setCategory}
                isFree={isFree}
                setIsFree={setIsFree}
                minRating={minRating}
                setMinRating={setMinRating}
                sort={sort}
                setSort={setSort}
                verified={verified}
                setVerified={setVerified}
              />
            </div>
          </div>
        )}

        {/* Workflows List Grid */}
        <div className="flex-1 flex flex-col gap-8 w-full">
          {!isLoading && workflows.length === 0 ? (
            <EmptyState
              icon={Compass}
              title="No workflows match query"
              description="Adjust search tags or reset filtering targets to explore other options."
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
            />
          ) : (
            <>
              <WorkflowGrid workflows={workflows} isLoading={isLoading} />
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4 border-t border-zinc-900 pt-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-xs text-zinc-500 font-semibold px-2">
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

    </div>
  );
}
