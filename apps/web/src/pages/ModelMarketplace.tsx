import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ANTSEED_MODEL_CATALOG, AntSeedModel } from '../adapters/antseed/adapter';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Search,
  Filter,
  Sparkles,
  Zap,
  ShieldCheck,
  Cpu,
  Clock,
  MessageSquare,
  ArrowRight,
  Lock,
  Layers,
  Coins,
  CheckCircle2,
} from 'lucide-react';
import { formatCurrency } from '../utils/format';

export default function ModelMarketplace() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyEnterprise, setOnlyEnterprise] = useState(false);
  const navigate = useNavigate();

  const filteredModels = ANTSEED_MODEL_CATALOG.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(search.toLowerCase()) ||
      model.provider.toLowerCase().includes(search.toLowerCase()) ||
      model.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
    const matchesFree = !onlyFree || model.isFree;
    const matchesEnterprise = !onlyEnterprise || model.privacy === 'Encrypted Enterprise';

    return matchesSearch && matchesCategory && matchesFree && matchesEnterprise;
  });

  const categories = [
    { key: 'all', label: 'All Models' },
    { key: 'reasoning', label: 'Reasoning' },
    { key: 'coding', label: 'Coding' },
    { key: 'research', label: 'Research' },
    { key: 'general', label: 'General' },
    { key: 'image', label: 'Image AI' },
    { key: 'enterprise', label: 'Enterprise' },
  ];

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-zinc-100">AntSeed Model Marketplace</h1>
            <Badge variant="info" className="text-[10px] font-mono">20+ MODELS</Badge>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Discover, compare, and execute free & metered frontier AI models powered by Meridian x402 settlement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/chat/free">
            <Button variant="secondary" size="sm" className="font-semibold text-xs flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#27F293]" />
              Free Dolphin Chat
            </Button>
          </Link>
          <Link to="/balance">
            <Button variant="primary" size="sm" className="font-bold text-xs flex items-center gap-1.5">
              <Coins className="h-3.5 w-3.5" />
              Unified AI Balance
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#27F293] text-zinc-950 font-bold shadow-sm'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Toggles & Search Field */}
        <div className="flex items-center gap-3 shrink-0">
          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyFree}
              onChange={(e) => setOnlyFree(e.target.checked)}
              className="accent-[#27F293] rounded"
            />
            <span>Free Only</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyEnterprise}
              onChange={(e) => setOnlyEnterprise(e.target.checked)}
              className="accent-[#27F293] rounded"
            />
            <span>Enterprise</span>
          </label>

          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 w-48 sm:w-64">
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search models..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none w-full font-sans"
            />
          </div>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <Card
            key={model.id}
            className="bg-zinc-900 border-zinc-800 p-5 flex flex-col justify-between gap-5 hover:border-zinc-700 transition-all shadow-lg group relative overflow-hidden"
          >
            {/* Model Card Header */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={model.isFree ? 'success' : 'info'} className="text-[9px]">
                    {model.category.toUpperCase()}
                  </Badge>
                  {model.badge && (
                    <span className="text-[9px] font-mono font-bold bg-[#27F293]/10 text-[#27F293] border border-[#27F293]/20 px-2 py-0.5 rounded-full">
                      {model.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#27F293]" />
                  <span>{model.trustScore}/100</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="font-display font-bold text-base text-zinc-100 group-hover:text-white">
                  {model.name}
                </h3>
                <span className="text-[10px] font-mono text-zinc-500">{model.provider}</span>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {model.description}
              </p>

              {/* Pricing & Performance Bar */}
              <div className="grid grid-cols-2 gap-2 bg-zinc-950 border border-zinc-900 p-3 rounded-xl text-[10px] font-mono mt-1">
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500">Input / 1M</span>
                  <span className="text-zinc-200 font-semibold">
                    {model.isFree ? 'Free' : `$${model.priceInputPerMillion}`}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-zinc-500">Output / 1M</span>
                  <span className="text-zinc-200 font-semibold">
                    {model.isFree ? 'Free' : `$${model.priceOutputPerMillion}`}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 border-t border-zinc-900 pt-1.5">
                  <span className="text-zinc-500">Latency</span>
                  <span className="text-emerald-400 font-semibold">{model.latencyMs}ms</span>
                </div>
                <div className="flex flex-col gap-0.5 border-t border-zinc-900 pt-1.5">
                  <span className="text-zinc-500">Context</span>
                  <span className="text-zinc-300 font-semibold">{(model.contextWindow / 1000).toFixed(0)}k tokens</span>
                </div>
              </div>
            </div>

            {/* Model Card Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(model.isFree ? '/chat/free' : `/chat/paid?model=${model.id}`)}
                className="flex-1 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                {model.isFree ? 'Free Chat' : 'Start Paid Chat'}
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/studio/new?model=${model.id}`)}
                className="text-xs p-2 shrink-0"
                title="Add to Workflow Builder"
              >
                <Layers className="h-4 w-4 text-zinc-400" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
