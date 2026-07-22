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
  Scale,
  X,
  Database,
  ArrowUpRight
} from 'lucide-react';
import { formatCurrency } from '../utils/format';

export default function ModelMarketplace() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedHostType, setSelectedHostType] = useState<string>('all');
  const [onlyFree, setOnlyFree] = useState(false);
  const [onlyEnterprise, setOnlyEnterprise] = useState(false);
  
  // Model Comparison State
  const [comparedModelIds, setComparedModelIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const navigate = useNavigate();

  const toggleCompare = (modelId: string) => {
    setComparedModelIds((prev) => {
      if (prev.includes(modelId)) return prev.filter((id) => id !== modelId);
      if (prev.length >= 3) return prev; // max 3 models
      return [...prev, modelId];
    });
  };

  const filteredModels = ANTSEED_MODEL_CATALOG.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(search.toLowerCase()) ||
      model.provider.toLowerCase().includes(search.toLowerCase()) ||
      model.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || model.category === selectedCategory;
    const matchesHostType = selectedHostType === 'all' || model.hostType === selectedHostType;
    const matchesFree = !onlyFree || model.isFree;
    const matchesEnterprise = !onlyEnterprise || model.privacy === 'Encrypted Enterprise';

    return matchesSearch && matchesCategory && matchesHostType && matchesFree && matchesEnterprise;
  });

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'reasoning', label: 'Reasoning' },
    { key: 'coding', label: 'Coding' },
    { key: 'research', label: 'Research' },
    { key: 'general', label: 'General' },
    { key: 'image', label: 'Image AI' },
    { key: 'enterprise', label: 'Enterprise' },
  ];

  const hostTypes = [
    { key: 'all', label: 'All Hosts' },
    { key: 'decentralized-host', label: 'Decentralized Hosts' },
    { key: 'open-weights-node', label: 'Open-Weights Nodes' },
    { key: 'workflow-connector', label: 'Workflow Connectors' },
  ];

  const comparedModels = ANTSEED_MODEL_CATALOG.filter((m) => comparedModelIds.includes(m.id));

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-zinc-100">Decentralized AI Model Marketplace</h1>
            <Badge variant="info" className="text-[10px] font-mono">DECENTRALIZED HOSTS</Badge>
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Discover, compare, and execute free & metered decentralized AI model hosts powered by Meridian x402 settlement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {comparedModelIds.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsComparing(true)}
              className="font-bold text-xs flex items-center gap-1.5 border-emerald-500/30 text-emerald-400 bg-emerald-950/40"
            >
              <Scale className="h-3.5 w-3.5" />
              Compare ({comparedModelIds.length})
            </Button>
          )}
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
      <div className="flex flex-col gap-4 bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl">
        
        {/* Host Type Pills & Categories */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0 font-bold">Category:</span>
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

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
            <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0 font-bold">Host Type:</span>
            {hostTypes.map((ht) => (
              <button
                key={ht.key}
                onClick={() => setSelectedHostType(ht.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedHostType === ht.key
                    ? 'bg-indigo-500 text-white font-bold shadow-sm'
                    : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {ht.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles & Search Field */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-zinc-800/60 pt-3">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyFree}
                onChange={(e) => setOnlyFree(e.target.checked)}
                className="accent-[#27F293] rounded"
              />
              <span>Free Models Only</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyEnterprise}
                onChange={(e) => setOnlyEnterprise(e.target.checked)}
                className="accent-[#27F293] rounded"
              />
              <span>Encrypted Enterprise</span>
            </label>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-1.5 w-full sm:w-72">
            <Search className="h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search model hosts or providers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none w-full font-sans"
            />
          </div>
        </div>

      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => {
          const isSelectedForCompare = comparedModelIds.includes(model.id);

          return (
            <Card
              key={model.id}
              className={`bg-zinc-900 border-zinc-800 p-5 flex flex-col justify-between gap-5 hover:border-zinc-700 transition-all shadow-lg group relative overflow-hidden ${
                isSelectedForCompare ? 'ring-1 ring-emerald-500/50 border-emerald-500/40' : ''
              }`}
            >
              {/* Model Card Header */}
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={model.isFree ? 'success' : 'info'} className="text-[9px]">
                      {model.category.toUpperCase()}
                    </Badge>
                    {model.badge && (
                      <span className="text-[9px] font-mono font-bold bg-[#27F293]/10 text-[#27F293] border border-[#27F293]/20 px-2 py-0.5 rounded-full">
                        {model.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleCompare(model.id)}
                      className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        isSelectedForCompare
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-bold'
                          : 'bg-zinc-950 text-zinc-500 border-zinc-800 hover:text-zinc-300'
                      }`}
                    >
                      {isSelectedForCompare ? '✓ Compared' : '+ Compare'}
                    </button>
                    <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-semibold">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#27F293]" />
                      <span>{model.trustScore}/100</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="font-display font-bold text-base text-zinc-100 group-hover:text-white flex items-center gap-2">
                    {model.name}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 font-semibold">{model.provider}</span>
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {model.description}
                </p>

                {/* Pricing & Performance Bar */}
                <div className="grid grid-cols-2 gap-2 bg-zinc-950 border border-zinc-900 p-3 rounded-xl text-[10px] font-mono mt-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-zinc-500 uppercase text-[8px]">Input Rate</span>
                    <span className="text-zinc-200 font-semibold">
                      {model.isFree ? 'Free' : `$${model.priceInputPerMillion}/1M`}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-zinc-500 uppercase text-[8px]">Output Rate</span>
                    <span className="text-zinc-200 font-semibold">
                      {model.isFree ? 'Free' : `$${model.priceOutputPerMillion}/1M`}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-zinc-900 pt-1.5">
                    <span className="text-zinc-500 uppercase text-[8px]">Latency</span>
                    <span className="text-emerald-400 font-semibold">{model.latencyMs}ms</span>
                  </div>
                  <div className="flex flex-col gap-0.5 border-t border-zinc-900 pt-1.5">
                    <span className="text-zinc-500 uppercase text-[8px]">Context Window</span>
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
                  {model.isFree ? 'Free Chat' : 'Start Inference Chat'}
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
          );
        })}
      </div>

      {/* Model Comparison Side-by-Side Modal Drawer */}
      {isComparing && comparedModels.length > 0 && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141417] border border-zinc-800 rounded-3xl max-w-4xl w-full p-6 flex flex-col gap-6 max-h-[90vh] overflow-y-auto no-scrollbar shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-emerald-400" />
                <h2 className="font-display font-bold text-lg text-white">Decentralized Model Comparison</h2>
              </div>
              <button
                onClick={() => setIsComparing(false)}
                className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              {comparedModels.map((m) => (
                <div key={m.id} className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <Badge variant={m.isFree ? 'success' : 'info'} className="text-[9px]">
                      {m.category}
                    </Badge>
                    <button
                      onClick={() => toggleCompare(m.id)}
                      className="text-zinc-500 hover:text-red-400 text-[10px]"
                    >
                      Remove
                    </button>
                  </div>

                  <h3 className="font-display font-bold text-sm text-white">{m.name}</h3>
                  <span className="text-[10px] text-zinc-500">{m.provider}</span>

                  <div className="flex flex-col gap-2 border-t border-zinc-900 pt-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Input Cost:</span>
                      <span className="text-white font-bold">{m.isFree ? 'Free' : `$${m.priceInputPerMillion}/1M`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Output Cost:</span>
                      <span className="text-white font-bold">{m.isFree ? 'Free' : `$${m.priceOutputPerMillion}/1M`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Speed / Latency:</span>
                      <span className="text-emerald-400 font-bold">{m.latencyMs}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Context Window:</span>
                      <span className="text-zinc-300">{(m.contextWindow / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Trust Rating:</span>
                      <span className="text-emerald-400 font-bold">{m.trustScore}/100</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsComparing(false);
                      navigate(m.isFree ? '/chat/free' : `/chat/paid?model=${m.id}`);
                    }}
                    className="w-full font-bold text-xs mt-2"
                  >
                    Select Model
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
