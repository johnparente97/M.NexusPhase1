import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  MessageSquare,
  Zap,
  HardDrive,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  LayoutGrid,
  List as ListIcon,
  SlidersHorizontal,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { TruthStateBadge, TruthState } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';

interface CapabilityItem {
  id: string;
  title: string;
  category: string;
  description: string;
  provider: string;
  pricing: string;
  status: TruthState;
  route: string;
  icon: any;
}

const CATEGORIES = [
  { label: 'All', icon: Sparkles },
  { label: 'Models', icon: MessageSquare },
  { label: 'Workflows', icon: Layers },
  { label: 'Storage', icon: HardDrive },
  { label: 'Compute', icon: Cpu },
];

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cap-1',
    title: 'DeepSeek R1 Reasoning',
    category: 'Models',
    description: 'High-speed chain-of-thought reasoning AI model for complex logic, math, and code architecture.',
    provider: 'DeepSeek / AntSeed',
    pricing: '$0.00012 / request',
    status: 'live',
    route: '/chat?model=deepseek-r1',
    icon: MessageSquare,
  },
  {
    id: 'cap-2',
    title: 'Dolphin 8x7B Inference',
    category: 'Models',
    description: 'Uncensored high-throughput open-weights AI inference engine for creative and agentic workflows.',
    provider: 'Dolphin Host',
    pricing: 'Free ($0.00)',
    status: 'connected',
    route: '/chat?model=dolphin-mixtral-8x7b-free',
    icon: MessageSquare,
  },
  {
    id: 'cap-3',
    title: 'Financial Data Summarizer',
    category: 'Workflows',
    description: 'Multi-step autonomous workflow retrieving quarterly filings, calculating metrics, and rendering charts.',
    provider: 'Nexus Labs',
    pricing: '$0.00050 / run',
    status: 'live',
    route: '/workflows/wf-finance/run',
    icon: Layers,
  },
  {
    id: 'cap-4',
    title: 'Filecoin Distributed Backup',
    category: 'Storage',
    description: 'Zero-knowledge end-to-end encrypted object backup with verifiable Filecoin 10x storage proofs.',
    provider: 'Filecoin Network',
    pricing: '$0.00001 / GB / mo',
    status: 'connected',
    route: '/cloud',
    icon: HardDrive,
  },
  {
    id: 'cap-5',
    title: 'NVIDIA H100 GPU Cluster',
    category: 'Compute',
    description: 'On-demand GPU compute instance allocation for model fine-tuning and heavy batch processing.',
    provider: 'Decentralized Compute Pool',
    pricing: '$2.50 / hr (x402)',
    status: 'planned',
    route: '/compute',
    icon: Cpu,
  },
  {
    id: 'cap-6',
    title: 'Arweave Blockweave Storage',
    category: 'Storage',
    description: 'Permanent immutable cloud storage for agent knowledge bases and critical execution logs.',
    provider: 'Arweave Protocol',
    pricing: '$0.005 / MB flat',
    status: 'connected',
    route: '/cloud',
    icon: HardDrive,
  },
];

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = searchParams.get('category') || 'All';
  const searchQueryParam = searchParams.get('q') || '';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'popular' | 'newest'>('popular');

  const handleCategoryChange = (label: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (label === 'All') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', label);
    }
    setSearchParams(nextParams);
  };

  const handleSearchChange = (val: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (val) {
      nextParams.set('q', val);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams);
  };

  const filteredCapabilities = CAPABILITIES.filter((cap) => {
    const matchesCategory = categoryParam === 'All' || cap.category === categoryParam;
    const matchesSearch =
      cap.title.toLowerCase().includes(searchQueryParam.toLowerCase()) ||
      cap.description.toLowerCase().includes(searchQueryParam.toLowerCase()) ||
      cap.provider.toLowerCase().includes(searchQueryParam.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleActionClick = (cap: CapabilityItem) => {
    navigate(cap.route);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Header Banner ── */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2">
          <TruthStateBadge status="live" text="Marketplace Online" />
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Explore <span className="text-prismatic">AI Marketplace</span>
        </h1>
        <p className="text-sm text-[var(--nx-text-secondary)] max-w-2xl leading-relaxed">
          Discover agents, workflows, models, and tools for any task.
        </p>
      </div>

      {/* ── Filter & Search Toolbar ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[var(--nx-surface-1)] border border-[var(--nx-border)] p-4 rounded-2xl shadow-xl">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00F5D4]" />
          <input
            type="text"
            value={searchQueryParam}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search AI models, workflows, or cloud storage..."
            className="w-full bg-[var(--nx-bg)] border border-[var(--nx-border)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00F5D4] transition-all font-mono"
          />
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex items-center gap-3 shrink-0">
          
          <div className="flex items-center gap-1 bg-[var(--nx-bg)] p-1 rounded-xl border border-[var(--nx-border)]">
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-1.5 rounded-lg transition-all cursor-pointer',
                viewMode === 'grid' ? 'bg-[#00F5D4] text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
              )}
              title="Grid View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-1.5 rounded-lg transition-all cursor-pointer',
                viewMode === 'list' ? 'bg-[#00F5D4] text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
              )}
              title="List View"
            >
              <ListIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[var(--nx-bg)] border border-[var(--nx-border)] px-3 py-2 rounded-xl text-xs font-mono text-zinc-400">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#00F5D4]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="popular" className="bg-[#05050A]">Popular</option>
              <option value="newest" className="bg-[#05050A]">Newest</option>
            </select>
          </div>
        </div>

      </div>

      {/* ── Category Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = categoryParam === cat.label;
          return (
            <button
              key={cat.label}
              onClick={() => handleCategoryChange(cat.label)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap cursor-pointer border',
                isActive
                  ? 'bg-gradient-to-r from-[#00F5D4] via-[#A855F7] to-[#FF007F] text-zinc-950 border-transparent shadow-lg shadow-purple-500/20'
                  : 'bg-[var(--nx-surface-1)] border-[var(--nx-border)] text-zinc-400 hover:text-white hover:border-[#00F5D4]/40'
              )}
            >
              <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-zinc-950' : 'text-[#00F5D4]')} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── Results Container ── */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                onClick={() => handleActionClick(cap)}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] hover:border-[#00F5D4]/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(0,245,212,0.15)] cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-[#00F5D4]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-base text-white group-hover:text-prismatic transition-all">
                          {cap.title}
                        </h3>
                        <span className="text-[11px] text-zinc-500 font-mono">by {cap.provider}</span>
                      </div>
                    </div>
                    <TruthStateBadge status={cap.status} />
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                    {cap.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[var(--nx-border)] mt-4 text-xs font-mono">
                  <span className="text-[#00F5D4] font-bold">{cap.pricing}</span>
                  <span className="text-zinc-400 group-hover:text-white flex items-center gap-1 font-bold">
                    Execute <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform text-[#00F5D4]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                onClick={() => handleActionClick(cap)}
                className="group p-4 rounded-xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] hover:border-[#00F5D4]/50 transition-all flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center text-[#00F5D4] shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-sm text-white group-hover:text-prismatic transition-all truncate">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-zinc-400 truncate">{cap.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                  <span className="text-[#00F5D4] font-bold">{cap.pricing}</span>
                  <TruthStateBadge status={cap.status} />
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
