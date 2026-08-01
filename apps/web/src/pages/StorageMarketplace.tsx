import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardDrive,
  Shield,
  Clock,
  Lock,
  Download,
  Upload,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Server,
  Gamepad2,
  FileCode,
  Database,
  Layers,
  ChevronRight,
  Info,
  Key,
  Globe,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface StorageProvider {
  id: string;
  name: string;
  type: 'Decentralized' | 'Cloud' | 'Hybrid' | 'Enterprise';
  pricePerGbMonth: number;
  redundancy: string;
  geography: string;
  jurisdiction: string;
  encryption: string;
  retrievalSpeed: string;
  durability: string;
  retention: string;
  compliance: string[];
  status: 'Active' | 'Verified' | 'Partner';
  rating: number;
  icon: string;
}

const STORAGE_PROVIDERS: StorageProvider[] = [
  {
    id: 'sp-filecoin',
    name: 'Filecoin Network',
    type: 'Decentralized',
    pricePerGbMonth: 0.002,
    redundancy: '10x Distributed Proof of Storage',
    geography: 'Global (150+ Regions)',
    jurisdiction: 'Decentralized',
    encryption: 'Client-side AES-256-GCM',
    retrievalSpeed: '< 80ms',
    durability: '99.999999999%',
    retention: 'Permanent / Programmable',
    compliance: ['SOC2 Type II Ready', 'GDPR Encrypted'],
    status: 'Verified',
    rating: 4.9,
    icon: '⚡',
  },
  {
    id: 'sp-arweave',
    name: 'Arweave Permanent Weave',
    type: 'Decentralized',
    pricePerGbMonth: 0.005,
    redundancy: 'Blockweave Consensus Replication',
    geography: 'Global Distributed',
    jurisdiction: 'Decentralized',
    encryption: 'End-to-End Zero Knowledge',
    retrievalSpeed: '< 120ms',
    durability: '100% Perpetual',
    retention: 'Permanent (200+ years prefunded)',
    compliance: ['Immutable Storage', 'Audit Proof'],
    status: 'Verified',
    rating: 4.8,
    icon: '🌐',
  },
  {
    id: 'sp-aws-s3',
    name: 'AWS S3 Glacier / Standard Adapter',
    type: 'Enterprise',
    pricePerGbMonth: 0.023,
    redundancy: 'Multi-AZ (3+ Zones)',
    geography: 'US-East, EU-Central, AP-South',
    jurisdiction: 'United States / EU',
    encryption: 'AWS KMS / SSE-C',
    retrievalSpeed: '< 20ms',
    durability: '99.999999999%',
    retention: 'Policy Managed',
    compliance: ['HIPAA', 'SOC1/2/3', 'ISO 27001', 'PCI-DSS'],
    status: 'Active',
    rating: 4.9,
    icon: '☁️',
  },
  {
    id: 'sp-storj',
    name: 'Storj DCS (Decentralized Cloud)',
    type: 'Hybrid',
    pricePerGbMonth: 0.004,
    redundancy: 'Reed-Solomon 80/30 Erasure Coding',
    geography: 'Global (20,000+ Nodes)',
    jurisdiction: 'Multi-Jurisdictional',
    encryption: 'Default Zero-Knowledge AES-256',
    retrievalSpeed: '< 45ms',
    durability: '99.9999999%',
    retention: 'Flexible Expiration',
    compliance: ['GDPR Compliant', 'SOC2'],
    status: 'Verified',
    rating: 4.7,
    icon: '🚀',
  },
];

interface StoredObject {
  id: string;
  name: string;
  category: 'Gaming Save' | 'AI Memory' | 'Developer File' | 'Workflow Output' | 'Backup';
  sizeMb: number;
  provider: string;
  lastModified: string;
  versionCount: number;
  encrypted: boolean;
  gameTitle?: string;
}

const INITIAL_OBJECTS: StoredObject[] = [
  {
    id: 'obj-1',
    name: 'Elden_Ring_Save_Slot01.sl2',
    category: 'Gaming Save',
    sizeMb: 12.4,
    provider: 'Filecoin Network',
    lastModified: '2026-08-01 08:30',
    versionCount: 5,
    encrypted: true,
    gameTitle: 'Elden Ring: Shadow of the Erdtree',
  },
  {
    id: 'obj-2',
    name: 'Cyberpunk2077_Mod_Preset_v2.4.json',
    category: 'Gaming Save',
    sizeMb: 3.1,
    provider: 'Storj DCS',
    lastModified: '2026-07-30 19:15',
    versionCount: 3,
    encrypted: false,
    gameTitle: 'Cyberpunk 2077',
  },
  {
    id: 'obj-3',
    name: 'agent_rag_embeddings_v4.parquet',
    category: 'AI Memory',
    sizeMb: 480.2,
    provider: 'Arweave Permanent Weave',
    lastModified: '2026-07-31 14:00',
    versionCount: 12,
    encrypted: true,
  },
  {
    id: 'obj-4',
    name: 'workflow_audit_log_2026_Q3.log.gz',
    category: 'Workflow Output',
    sizeMb: 95.8,
    provider: 'AWS S3 Glacier / Standard Adapter',
    lastModified: '2026-08-01 01:10',
    versionCount: 1,
    encrypted: true,
  },
];

export default function StorageMarketplace() {
  const [activeTab, setActiveTab] = useState<'providers' | 'files' | 'gaming'>('providers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<StorageProvider | null>(null);
  const [objects, setObjects] = useState<StoredObject[]>(INITIAL_OBJECTS);
  const [selectedObjectForRestore, setSelectedObjectForRestore] = useState<StoredObject | null>(null);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<StoredObject['category']>('Developer File');
  const [uploadFileName, setUploadFileName] = useState('');
  const [clientEncryption, setClientEncryption] = useState(true);
  const [restoreSuccess, setRestoreSuccess] = useState<string | null>(null);

  const filteredProviders = STORAGE_PROVIDERS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const gamingSaves = objects.filter((o) => o.category === 'Gaming Save');

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName) return;

    const newObj: StoredObject = {
      id: `obj-${Date.now()}`,
      name: uploadFileName,
      category: uploadCategory,
      sizeMb: Math.round((Math.random() * 25 + 1) * 10) / 10,
      provider: selectedProvider?.name || 'Filecoin Network',
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16),
      versionCount: 1,
      encrypted: clientEncryption,
      gameTitle: uploadCategory === 'Gaming Save' ? 'PC Game Protection' : undefined,
    };

    setObjects([newObj, ...objects]);
    setUploadFileName('');
    setIsUploadModalOpen(false);
  };

  const handleRestoreVersion = (versionNum: number) => {
    setRestoreSuccess(`Successfully restored version v${versionNum} for ${selectedObjectForRestore?.name}`);
    setTimeout(() => {
      setRestoreSuccess(null);
      setIsRestoreModalOpen(false);
      setSelectedObjectForRestore(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <HardDrive className="h-6 w-6 text-cyan-400" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Programmable Storage Marketplace
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
            Discover, compare, and connect multi-cloud, decentralized, and encrypted storage adapters for AI memory, workflow outputs, developer files, and PC gaming cloud backup protection.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:brightness-110 text-zinc-950 font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition-all cursor-pointer"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Object</span>
          </button>
        </div>
      </div>

      {/* ── Quick Stats Bar ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Active Providers</div>
            <div className="text-base font-bold text-white font-mono">4 Networks</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Stored Volume</div>
            <div className="text-base font-bold text-white font-mono">591.5 MB</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Encryption</div>
            <div className="text-base font-bold text-white font-mono">AES-256 Zero-K</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Gamepad2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Gaming Sync</div>
            <div className="text-base font-bold text-white font-mono">2 Saved Games</div>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
        <button
          onClick={() => setActiveTab('providers')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer',
            activeTab === 'providers'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
          )}
        >
          <Server className="h-4 w-4" />
          <span>Storage Providers ({STORAGE_PROVIDERS.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('files')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer',
            activeTab === 'files'
              ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
          )}
        >
          <Layers className="h-4 w-4" />
          <span>My Stored Objects ({objects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('gaming')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer',
            activeTab === 'gaming'
              ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
          )}
        >
          <Gamepad2 className="h-4 w-4" />
          <span>PC Gaming Save Protection ({gamingSaves.length})</span>
        </button>
      </div>

      {/* ── TAB 1: Storage Providers ── */}
      {activeTab === 'providers' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-xl px-3 py-2">
            <Search className="h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search storage providers by name, jurisdiction, or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProviders.map((provider) => (
              <motion.div
                key={provider.id}
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-lg group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-2 rounded-xl bg-zinc-900 border border-zinc-800">{provider.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {provider.name}
                          </h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            {provider.type}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                          <Globe className="h-3 w-3 text-zinc-500" /> {provider.geography}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      ${provider.pricePerGbMonth}/GB/mo
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                      <span className="text-[10px] font-mono text-zinc-500 block">Redundancy</span>
                      <span className="font-medium text-zinc-200 text-[11px] truncate block">{provider.redundancy}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                      <span className="text-[10px] font-mono text-zinc-500 block">Encryption</span>
                      <span className="font-medium text-zinc-200 text-[11px] truncate block">{provider.encryption}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                      <span className="text-[10px] font-mono text-zinc-500 block">Durability Guarantee</span>
                      <span className="font-medium text-emerald-300 text-[11px] font-mono">{provider.durability}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                      <span className="text-[10px] font-mono text-zinc-500 block">Jurisdiction</span>
                      <span className="font-medium text-zinc-200 text-[11px]">{provider.jurisdiction}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {provider.compliance.map((c) => (
                      <span key={c} className="text-[9px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-mono">
                    ★ {provider.rating} / 5.0
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProvider(provider);
                      setIsUploadModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-xs text-cyan-300 font-medium hover:text-cyan-200 cursor-pointer"
                  >
                    <span>Connect & Store</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: Stored Objects ── */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#121216] border border-zinc-800 overflow-hidden shadow-lg">
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-white">Stored Files & AI Memories</h3>
              <span className="text-xs font-mono text-zinc-400">{objects.length} Items</span>
            </div>

            <div className="divide-y divide-zinc-800/60">
              {objects.map((obj) => (
                <div key={obj.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-zinc-900/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-cyan-400 shrink-0">
                      {obj.category === 'Gaming Save' ? <Gamepad2 className="h-5 w-5 text-amber-400" /> : <FileCode className="h-5 w-5" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs text-white">{obj.name}</span>
                        {obj.encrypted && (
                          <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                            <Lock className="h-2.5 w-2.5" /> Encrypted
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-zinc-500 mt-1">
                        <span>{obj.category}</span>
                        <span>•</span>
                        <span>{obj.sizeMb} MB</span>
                        <span>•</span>
                        <span className="text-zinc-400">{obj.provider}</span>
                        <span>•</span>
                        <span className="font-mono">{obj.lastModified}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => {
                        setSelectedObjectForRestore(obj);
                        setIsRestoreModalOpen(true);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                    >
                      <Clock className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Versions ({obj.versionCount})</span>
                    </button>

                    <button
                      onClick={() => alert(`Downloading decrypted payload for ${obj.name}...`)}
                      className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: PC Gaming Save & Mod Protection (POC) ── */}
      {activeTab === 'gaming' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="h-8 w-8 text-amber-400" />
              <div>
                <h2 className="font-display text-lg font-bold text-white">PC Game Save & Mod Cloud Protection</h2>
                <p className="text-xs text-zinc-300">
                  Proof-of-Concept: Automatically backup local game saves, mod presets, and graphics configuration to decentralized storage with point-in-time version rollback.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 block">Detected Local Directory</span>
                <span className="font-mono text-amber-300 font-semibold text-[11px] truncate block">C:\Users\Gamer\Saved Games</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 block">Cloud Protection Status</span>
                <span className="font-mono text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Sync Active (Filecoin)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 block">Conflict Prevention</span>
                <span className="font-mono text-cyan-300 font-semibold text-[11px]">Hash Verification Active</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gamingSaves.map((save) => (
              <div key={save.id} className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                      {save.gameTitle}
                    </span>
                    <h3 className="font-display text-sm font-bold text-white mt-1">{save.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{save.sizeMb} MB</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-xs space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Stored Provider:</span>
                    <span className="text-white font-medium">{save.provider}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Last Cloud Backup:</span>
                    <span className="text-zinc-300 font-mono">{save.lastModified}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Restore Points Available:</span>
                    <span className="text-cyan-400 font-mono font-bold">{save.versionCount} Restore Points</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedObjectForRestore(save);
                      setIsRestoreModalOpen(true);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Rollback Save Version</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL 1: Version History & 1-Click Restore ── */}
      <AnimatePresence>
        {isRestoreModalOpen && selectedObjectForRestore && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#121216] border border-zinc-800 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-zinc-800 pb-4">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-cyan-400" />
                    <span>Version History & Point-in-Time Restore</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">{selectedObjectForRestore.name}</p>
                </div>
                <button
                  onClick={() => setIsRestoreModalOpen(false)}
                  className="text-zinc-500 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>

              {restoreSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{restoreSuccess}</span>
                </div>
              )}

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {[5, 4, 3, 2, 1].slice(0, selectedObjectForRestore.versionCount).map((vNum) => (
                  <div
                    key={vNum}
                    className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between hover:border-cyan-500/30 transition-colors text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-300">v{vNum}.0</span>
                        {vNum === selectedObjectForRestore.versionCount && (
                          <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                            Current Head
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                        SHA-256: 0x8f...3a9 • {2026 - (5 - vNum)}-08-01 0{vNum}:15
                      </div>
                    </div>

                    <button
                      onClick={() => handleRestoreVersion(vNum)}
                      className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 text-zinc-300 text-xs font-mono font-bold transition-all cursor-pointer"
                    >
                      Restore
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
                <span>Storage Provider: {selectedObjectForRestore.provider}</span>
                <button
                  onClick={() => setIsRestoreModalOpen(false)}
                  className="text-zinc-400 hover:text-white cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL 2: Upload Object & Encryption Setup ── */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-2xl bg-[#121216] border border-zinc-800 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Upload className="h-5 w-5 text-cyan-400" />
                  <span>Upload & Encrypt Object</span>
                </h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-zinc-500 hover:text-white text-sm">
                  ✕
                </button>
              </div>

              <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Object Name / Path</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. my_game_save.sl2 or agent_memory.parquet"
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Category</label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value as any)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Gaming Save">PC Gaming Save / Mod Preset</option>
                    <option value="AI Memory">AI Memory / Context Embeddings</option>
                    <option value="Developer File">Developer File / Config</option>
                    <option value="Workflow Output">Workflow Execution Output</option>
                    <option value="Backup">System Backup</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-emerald-400" />
                    <div>
                      <div className="font-medium text-white">Client-Side Zero-Knowledge Encryption</div>
                      <div className="text-[10px] text-zinc-500">Encrypt with AES-256 before network transit</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={clientEncryption}
                    onChange={(e) => setClientEncryption(e.target.checked)}
                    className="h-4 w-4 rounded accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-zinc-950 font-bold hover:brightness-110 cursor-pointer shadow-lg"
                  >
                    Confirm Upload
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
