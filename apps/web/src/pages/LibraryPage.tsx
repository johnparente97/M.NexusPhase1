import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Folder,
  FileText,
  Bot,
  Layers,
  Database,
  Download,
  Share2,
  Trash2,
  Search,
  Plus,
  Sparkles,
  ExternalLink,
  Code,
  HardDrive,
} from 'lucide-react';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

interface LibraryItem {
  id: string;
  name: string;
  type: 'agent' | 'workflow' | 'artifact' | 'knowledge' | 'template' | 'connection';
  description: string;
  sizeOrDetails: string;
  updatedAt: string;
  status?: 'active' | 'synced' | 'ready';
}

const INITIAL_LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 'lib-1',
    name: 'Company Intelligence Brief Agent',
    type: 'agent',
    description: 'Autonomous research agent for SEC filing cross-referencing and financial health metrics.',
    sizeOrDetails: 'v2.1 • Fixed $0.50/run',
    updatedAt: '2 hours ago',
    status: 'ready',
  },
  {
    id: 'lib-2',
    name: 'Q3 Financial Analysis Report.pdf',
    type: 'artifact',
    description: 'Generated structured financial report with data visualization & metric summaries.',
    sizeOrDetails: '2.4 MB • PDF Document',
    updatedAt: 'Yesterday',
    status: 'synced',
  },
  {
    id: 'lib-3',
    name: 'Autonomous Code Auditor Workflow',
    type: 'workflow',
    description: 'Multi-step static code vulnerability scanner for OWASP & API key leaks.',
    sizeOrDetails: 'v1.4 • Fixed $1.00/run',
    updatedAt: '3 days ago',
    status: 'ready',
  },
  {
    id: 'lib-4',
    name: 'Corporate Filings Knowledge Index',
    type: 'knowledge',
    description: 'Vectorized knowledge base of 2025 tech company 10-K & 10-Q filings.',
    sizeOrDetails: '14,200 Vectors • R2 Object',
    updatedAt: '4 days ago',
    status: 'synced',
  },
  {
    id: 'lib-5',
    name: 'GitHub MCP Server Connection',
    type: 'connection',
    description: 'Model Context Protocol integration for repository reading & PR creation.',
    sizeOrDetails: 'OAuth Authorized • 4 Tools',
    updatedAt: '1 week ago',
    status: 'active',
  },
];

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'agents' | 'artifacts' | 'knowledge' | 'connections'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<LibraryItem[]>(INITIAL_LIBRARY_ITEMS);

  const filteredItems = items.filter((item) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'agents' && (item.type === 'agent' || item.type === 'workflow')) ||
      (activeTab === 'artifacts' && item.type === 'artifact') ||
      (activeTab === 'knowledge' && item.type === 'knowledge') ||
      (activeTab === 'connections' && item.type === 'connection');

    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none">
      
      {/* ── Top Header Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/20 px-2 py-0.5 rounded-full uppercase">
              Workspace Repository
            </span>
            <TruthStateBadge status="production" text="Cloud Storage R2 Synced" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Library & <span className="text-prismatic">Workspace Assets</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Consolidated repository for your saved agents, workflows, knowledge bases, generated artifacts, and tool connections.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button
            to="/compose"
            variant="primary"
            size="sm"
            className="font-bold shadow-lg"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Create New Asset
          </Button>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--nx-surface-1)] border border-[var(--nx-border)] p-4 rounded-2xl shadow-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#00F5D4]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved agents, artifacts, vector knowledge, or tools..."
            className="w-full bg-[var(--nx-bg)] border border-[var(--nx-border)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#00F5D4] transition-all font-mono"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'agents', label: 'Agents & Workflows' },
            { id: 'artifacts', label: 'Artifacts' },
            { id: 'knowledge', label: 'Knowledge' },
            { id: 'connections', label: 'Connections' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-[#6366F1] text-white border-transparent shadow-md'
                  : 'bg-[var(--nx-bg)] border-[var(--nx-border)] text-zinc-400 hover:text-white'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Items Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          let Icon = FileText;
          if (item.type === 'agent') Icon = Bot;
          if (item.type === 'workflow') Icon = Layers;
          if (item.type === 'knowledge') Icon = Database;
          if (item.type === 'connection') Icon = Code;

          return (
            <div
              key={item.id}
              className="group p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-[var(--nx-border)] hover:border-[#6366F1]/50 transition-all flex flex-col justify-between space-y-5 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#6366F1]/15 border border-[#6366F1]/30 flex items-center justify-center text-[#6366F1]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#00F5D4] uppercase">
                        {item.type}
                      </span>
                      <h3 className="font-display font-bold text-base text-white group-hover:text-[#818CF8] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-2">
                  {item.description}
                </p>

                <div className="text-[11px] font-mono text-zinc-500 pt-1">
                  {item.sizeOrDetails} • Updated {item.updatedAt}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--nx-border)] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Downloading ${item.name}`)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                    title="Download Asset"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                    title="Share Asset"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Asset"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <Link
                  to={item.type === 'agent' || item.type === 'workflow' ? '/explore' : '/cloud'}
                  className="text-[#6366F1] font-bold hover:underline flex items-center gap-1"
                >
                  Open <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
