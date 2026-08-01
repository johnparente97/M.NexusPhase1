import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Sparkles, Box, Cpu, Database, Network, Server, ArrowRight, Play, Eye, FileText, Blocks, Cloud } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { cn } from '../utils/cn';

type Category = 'All' | 'Models' | 'Agents' | 'Workflows' | 'Storage' | 'Compute' | 'APIs';

interface Capability {
  id: string;
  title: string;
  category: Category;
  provider: string;
  description: string;
  pricing: string;
  status: 'live' | 'connected' | 'demo' | 'planned';
  action: 'Run' | 'View details';
  icon: React.ElementType;
}

const CATEGORIES: { label: Category; icon: React.ElementType }[] = [
  { label: 'All', icon: Blocks },
  { label: 'Models', icon: Network },
  { label: 'Agents', icon: Sparkles },
  { label: 'Workflows', icon: FileText },
  { label: 'Storage', icon: Database },
  { label: 'Compute', icon: Server },
  { label: 'APIs', icon: Cloud },
];

const CAPABILITIES: Capability[] = [
  {
    id: 'llama-3-70b',
    title: 'Llama 3 70B Instruct',
    category: 'Models',
    provider: 'Meta',
    description: 'Highly capable open-source large language model optimized for dialogue and instruction following.',
    pricing: '$0.0008 / 1K tokens',
    status: 'live',
    action: 'Run',
    icon: Network,
  },
  {
    id: 'research-agent',
    title: 'Research Analyst Agent',
    category: 'Agents',
    provider: 'Nexus Native',
    description: 'Autonomous agent that scours the web to compile comprehensive research reports with citations.',
    pricing: '$0.05 / run',
    status: 'live',
    action: 'Run',
    icon: Sparkles,
  },
  {
    id: 'video-gen-workflow',
    title: 'Text-to-Video Generator',
    category: 'Workflows',
    provider: 'SoraLabs',
    description: 'End-to-end workflow that converts a text prompt into a highly realistic 10-second video clip.',
    pricing: '$0.20 / run',
    status: 'demo',
    action: 'View details',
    icon: FileText,
  },
  {
    id: 's3-compatible-storage',
    title: 'Distributed Object Storage',
    category: 'Storage',
    provider: 'Filecoin Network',
    description: 'Decentralized, S3-compatible object storage with high durability and low latency.',
    pricing: '$0.001 / GB / month',
    status: 'connected',
    action: 'View details',
    icon: Database,
  },
  {
    id: 'h100-cluster',
    title: 'H100 GPU Cluster',
    category: 'Compute',
    provider: 'Akash Network',
    description: 'High-performance NVIDIA H100 instances for demanding AI training and inference workloads.',
    pricing: '$2.50 / hour',
    status: 'planned',
    action: 'View details',
    icon: Server,
  },
  {
    id: 'dex-aggregator-api',
    title: 'DEX Aggregator API',
    category: 'APIs',
    provider: '1inch',
    description: 'Real-time routing and execution API for optimal decentralized exchange token swaps.',
    pricing: 'Free tier available',
    status: 'live',
    action: 'View details',
    icon: Cloud,
  }
];

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const searchParam = searchParams.get('q') || '';
  const categoryParam = (searchParams.get('category') as Category) || 'All';
  
  const [searchInput, setSearchInput] = useState(searchParam);
  const debouncedSearch = useDebounce(searchInput, 300);

  // Sync search state to URL
  React.useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      next.set('q', debouncedSearch);
    } else {
      next.delete('q');
    }
    setSearchParams(next, { replace: true });
  }, [debouncedSearch, setSearchParams]);

  const handleCategoryChange = (cat: Category) => {
    const next = new URLSearchParams(searchParams);
    if (cat === 'All') {
      next.delete('category');
    } else {
      next.set('category', cat);
    }
    setSearchParams(next);
  };

  const filteredCapabilities = useMemo(() => {
    return CAPABILITIES.filter((cap) => {
      const matchesSearch = cap.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
                            cap.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                            cap.provider.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = categoryParam === 'All' || cap.category === categoryParam;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, categoryParam]);

  const handleActionClick = (cap: Capability) => {
    if (cap.action === 'Run') {
      navigate(`/exchange/${cap.id}/run`);
    } else {
      navigate(`/exchange/${cap.id}`);
    }
  };

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-10 select-none pb-20">
      
      {/* Header Section */}
      <section className="flex flex-col gap-4">
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Explore Capabilities
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
          Browse verified AI models, workflows, agents, storage, compute, and APIs.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="flex flex-col gap-6">
        <div className="relative max-w-xl w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <Input
            type="text"
            className="pl-10 h-12 bg-[#121214] border-zinc-800 text-white rounded-xl focus:ring-emerald-500 focus:border-emerald-500 w-full transition-all shadow-sm"
            placeholder="Search capabilities by name, provider, or keyword..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = categoryParam === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => handleCategoryChange(cat.label)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
                  isActive
                    ? "bg-gradient-to-r from-[#00F5D4] via-[#A855F7] to-[#FF007F] text-zinc-950 font-extrabold shadow-lg shadow-purple-500/25"
                    : "bg-[#0F0F1D] border border-white/[0.08] text-zinc-400 hover:text-white hover:border-[#00F5D4]/40"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-zinc-950" : "text-[#00F5D4]")} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Results Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCapabilities.length > 0 ? (
          filteredCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                onClick={() => handleActionClick(cap)}
                className="group flex flex-col justify-between h-full bg-[#111113] border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden transition-all duration-300 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/60 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex flex-col gap-4 relative z-10 h-full">
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-display font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                          {cap.title}
                        </h3>
                        <span className="text-xs font-medium text-zinc-500">
                          by {cap.provider}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <TruthStateBadge status={cap.status} />
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {cap.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans mt-2 flex-1">
                    {cap.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 mt-2">
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      {cap.pricing}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleActionClick(cap);
                      }}
                      className={cn(
                        "inline-flex items-center justify-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all",
                        cap.action === 'Run' 
                          ? "bg-emerald-400 hover:bg-emerald-300 text-zinc-950 shadow-sm shadow-emerald-500/20" 
                          : "bg-zinc-800 hover:bg-zinc-700 text-white"
                      )}
                    >
                      {cap.action === 'Run' ? <Play className="h-3 w-3 fill-zinc-950" /> : <Eye className="h-3.5 w-3.5" />}
                      <span>{cap.action}</span>
                    </button>
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl bg-[#111113]">
            <Search className="h-8 w-8 text-zinc-600 mb-3" />
            <h3 className="text-zinc-300 font-bold mb-1">No capabilities found</h3>
            <p className="text-zinc-500 text-sm">Try adjusting your search or filters to find what you're looking for.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchInput('');
                handleCategoryChange('All');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
