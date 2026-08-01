import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardDrive,
  FolderPlus,
  Upload,
  Search,
  FileText,
  Database,
  Brain,
  Gamepad2,
  Lock,
  Download,
  Share2,
  Trash2,
  Plus,
  CheckCircle2,
  Info,
  Server,
  Layers,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { TruthStateBadge } from '../components/common/TruthStateBadge';
import { Button } from '../components/ui/Button';

interface CloudItem {
  id: string;
  name: string;
  type: 'folder' | 'document' | 'memory' | 'dataset' | 'game_save' | 'code';
  size: string;
  updatedAt: string;
  provider: string;
  isEncrypted: boolean;
  attachedTo?: string;
}

const INITIAL_FILES: CloudItem[] = [
  {
    id: 'f-1',
    name: 'Agent Knowledge Bases',
    type: 'folder',
    size: '1.2 GB',
    updatedAt: '2 hours ago',
    provider: 'Filecoin Network',
    isEncrypted: true,
    attachedTo: 'Dolphin 8x7B Chat',
  },
  {
    id: 'f-2',
    name: 'Market_Research_Q3_2026.pdf',
    type: 'document',
    size: '14.2 MB',
    updatedAt: 'Yesterday',
    provider: 'Filecoin Network',
    isEncrypted: true,
    attachedTo: 'Company Intel Workflow',
  },
  {
    id: 'f-3',
    name: 'vector_embeddings_finance.idx',
    type: 'memory',
    size: '420 MB',
    updatedAt: '3 days ago',
    provider: 'Arweave Permanent',
    isEncrypted: true,
    attachedTo: 'DeepSeek R1 Memory',
  },
  {
    id: 'f-4',
    name: 'Cyberpunk2077_Save_Slot01.sav',
    type: 'game_save',
    size: '8.4 MB',
    updatedAt: '5 days ago',
    provider: 'Storj DCS',
    isEncrypted: true,
  },
  {
    id: 'f-5',
    name: 'nexus_workflow_pipeline.json',
    type: 'code',
    size: '128 KB',
    updatedAt: 'Just now',
    provider: 'AWS S3 Adapter',
    isEncrypted: false,
  },
];

interface StorageProviderInfo {
  id: string;
  name: string;
  type: string;
  priceGbMonth: string;
  redundancy: string;
  durability: string;
  encryption: string;
  truthStatus: 'connected' | 'demo' | 'planned';
}

const STORAGE_PROVIDERS: StorageProviderInfo[] = [
  {
    id: 'sp-filecoin',
    name: 'Filecoin Network',
    type: 'Decentralized Proof of Storage',
    priceGbMonth: '$0.002',
    redundancy: '10x Distributed Replication',
    durability: '99.999999999%',
    encryption: 'Client-side AES-256-GCM',
    truthStatus: 'connected',
  },
  {
    id: 'sp-arweave',
    name: 'Arweave Permanent Weave',
    type: 'Permanent Archival Storage',
    priceGbMonth: '$0.005',
    redundancy: 'Blockweave Consensus Replication',
    durability: '100% Perpetual',
    encryption: 'Zero Knowledge End-to-End',
    truthStatus: 'connected',
  },
  {
    id: 'sp-aws-s3',
    name: 'AWS S3 Glacier Adapter',
    type: 'Enterprise Cloud Object Storage',
    priceGbMonth: '$0.023',
    redundancy: 'Multi-AZ (3+ Zones)',
    durability: '99.999999999%',
    encryption: 'AWS KMS / SSE-C',
    truthStatus: 'demo',
  },
  {
    id: 'sp-storj',
    name: 'Storj DCS',
    type: 'Decentralized Encrypted Cloud',
    priceGbMonth: '$0.004',
    redundancy: '80-Node Erasure Coding',
    durability: '99.9999999%',
    encryption: 'Zero Knowledge End-to-End',
    truthStatus: 'planned',
  },
];

export default function NexusCloudPage() {
  const [activeTab, setActiveTab] = useState<'files' | 'memory' | 'gaming' | 'providers'>('files');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<CloudItem[]>(INITIAL_FILES);
  const [selectedFile, setSelectedFile] = useState<CloudItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newFile: CloudItem = {
      id: `f-${Date.now()}`,
      name: `uploaded_file_${files.length + 1}.bin`,
      type: 'document',
      size: '2.5 MB',
      updatedAt: 'Just now',
      provider: 'Filecoin Network',
      isEncrypted: true,
    };
    setFiles([newFile, ...files]);
    setIsUploadModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
    if (selectedFile?.id === id) setSelectedFile(null);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-6 sm:gap-8 select-none">
      
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Nexus Cloud
            </h1>
            <TruthStateBadge status="connected" text="Decentralized Cloud Connected" />
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Store files, manage AI agent memory, connect knowledge bases, and configure storage providers.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            leftIcon={<FolderPlus className="h-4 w-4" />}
          >
            New Folder
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsUploadModalOpen(true)}
            leftIcon={<Upload className="h-4 w-4" />}
          >
            Upload File
          </Button>
        </div>
      </div>

      {/* ── Demo Mode Notice Banner ── */}
      <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/30 flex items-start gap-3">
        <Info className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" />
        <div className="text-xs text-zinc-300 leading-relaxed">
          <span className="font-bold text-violet-300">Nexus Storage Adapter Mode:</span> Files uploaded in demo mode are encrypted client-side and simulated across connected Filecoin and Arweave test nodes. Attach files directly to Chat or Workflows below.
        </div>
      </div>

      {/* ── Cloud Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'files', label: 'Files & Storage', icon: HardDrive },
          { id: 'memory', label: 'AI Memory & Knowledge', icon: Brain },
          { id: 'gaming', label: 'Game Saves & Backups', icon: Gamepad2 },
          { id: 'providers', label: 'Storage Providers', icon: Server },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap',
                isActive
                  ? 'bg-violet-600/15 text-violet-300 border border-violet-500/30'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── TAB 1: Files & Storage ── */}
      {activeTab === 'files' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main File Browser Table */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search files, knowledge bases, or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#0E0E14] border border-white/[0.08] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Files List */}
            <div className="bg-[#14141E] border border-white/[0.07] rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-12 gap-3 px-4 py-3 border-b border-white/[0.06] text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Provider</div>
                <div className="col-span-3 text-right">Size</div>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {filteredFiles.map((file) => {
                  const isSelected = selectedFile?.id === file.id;
                  return (
                    <div
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={cn(
                        'grid grid-cols-12 gap-3 px-4 py-3.5 text-xs items-center cursor-pointer transition-colors hover:bg-white/[0.03]',
                        isSelected && 'bg-violet-600/10 border-l-2 border-violet-500'
                      )}
                    >
                      <div className="col-span-6 flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-white/[0.04] text-violet-400 shrink-0">
                          {file.type === 'folder' ? <HardDrive className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">{file.name}</p>
                          <p className="text-[10px] text-zinc-500">{file.updatedAt}</p>
                        </div>
                      </div>

                      <div className="col-span-3 text-zinc-400 truncate">
                        {file.provider}
                      </div>

                      <div className="col-span-3 text-right font-mono text-zinc-400">
                        {file.size}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: File Inspector / Capacity Details */}
          <div className="space-y-6">
            
            {/* Storage Usage Card */}
            <div className="p-5 rounded-2xl bg-[#14141E] border border-white/[0.07] space-y-4 shadow-lg">
              <h3 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-violet-400" />
                <span>Storage Quota</span>
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">1.63 GB used</span>
                  <span className="text-violet-400 font-bold">10.0 GB Limit</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 w-[16.3%]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                <div className="p-2.5 rounded-xl bg-[#0E0E14] border border-white/[0.05]">
                  <span className="text-zinc-500 block">Encryption</span>
                  <span className="text-emerald-400 font-semibold">AES-256-GCM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#0E0E14] border border-white/[0.05]">
                  <span className="text-zinc-500 block">Providers</span>
                  <span className="text-violet-400 font-semibold">4 Connected</span>
                </div>
              </div>
            </div>

            {/* Selected File Details */}
            {selectedFile ? (
              <div className="p-5 rounded-2xl bg-[#14141E] border border-violet-500/30 space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-white truncate">{selectedFile.name}</h4>
                  <button onClick={() => handleDelete(selectedFile.id)} className="text-zinc-500 hover:text-rose-400 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-2 text-xs text-zinc-400 font-mono">
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span>Type:</span>
                    <span className="text-white uppercase">{selectedFile.type}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span>Size:</span>
                    <span className="text-white">{selectedFile.size}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/[0.04]">
                    <span>Provider:</span>
                    <span className="text-violet-400">{selectedFile.provider}</span>
                  </div>
                  {selectedFile.attachedTo && (
                    <div className="flex justify-between py-1 border-b border-white/[0.04]">
                      <span>Attached:</span>
                      <span className="text-emerald-400 font-bold">{selectedFile.attachedTo}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="w-full" leftIcon={<Download className="h-3.5 w-3.5" />}>
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full" leftIcon={<Share2 className="h-3.5 w-3.5" />}>
                    Share
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-[#14141E] border border-white/[0.05] text-center text-xs text-zinc-500">
                Select a file to inspect details, attachments, and encryption proofs.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── TAB 2: AI Memory & Knowledge ── */}
      {activeTab === 'memory' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#14141E] border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-600/10 text-violet-400">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Conversation & Agent Vector Memory</h3>
                <p className="text-xs text-zinc-400">Attach long-term memory indexes to persistent Chat sessions.</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Nexus AI Memory allows Dolphin 8x7B, DeepSeek R1, and custom agents to recall previous conversation contexts, project specifications, and uploaded documents across sessions.
            </p>
            <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Create New Vector Memory Index
            </Button>
          </div>

          <div className="p-6 rounded-2xl bg-[#14141E] border border-white/[0.07] space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-400">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">Knowledge Base Connectors</h3>
                <p className="text-xs text-zinc-400">Index PDF research, Markdown docs, and code repos for RAG retrieval.</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Connect external data sources or local file directories directly into the Nexus Workflow Builder for automated context retrieval.
            </p>
            <Button variant="secondary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
              Connect Knowledge Base
            </Button>
          </div>
        </div>
      )}

      {/* ── TAB 3: Game Saves & Backups ── */}
      {activeTab === 'gaming' && (
        <div className="p-6 rounded-2xl bg-[#14141E] border border-white/[0.07] space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-600/10 text-cyan-400">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-base text-white">PC Game Saves & Application Configuration Sync</h3>
              <p className="text-xs text-zinc-400">Encrypted backup vault for game save files, mod configurations, and app state.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0E0E14] border border-white/[0.05] space-y-2">
              <span className="text-xs font-semibold text-white block">Automated Sync</span>
              <p className="text-[11px] text-zinc-500">Backs up local save states to decentralized storage when changes are detected.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0E0E14] border border-white/[0.05] space-y-2">
              <span className="text-xs font-semibold text-white block">Cross-Device Restore</span>
              <p className="text-[11px] text-zinc-500">Restore your save files instantly on any desktop device with zero-knowledge keys.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#0E0E14] border border-white/[0.05] space-y-2">
              <span className="text-xs font-semibold text-white block">Version Rollback</span>
              <p className="text-[11px] text-zinc-500">Roll back to prior save states or backup snapshots anytime.</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: Storage Providers ── */}
      {activeTab === 'providers' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {STORAGE_PROVIDERS.map((sp) => (
            <div key={sp.id} className="p-5 rounded-2xl bg-[#14141E] border border-white/[0.07] space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-white">{sp.name}</h4>
                  <span className="text-[11px] text-zinc-500">{sp.type}</span>
                </div>
                <TruthStateBadge status={sp.truthStatus} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded-lg bg-[#0E0E14] text-zinc-400">
                  <span>Price: </span>
                  <span className="text-violet-400 font-bold">{sp.priceGbMonth} / GB</span>
                </div>
                <div className="p-2 rounded-lg bg-[#0E0E14] text-zinc-400">
                  <span>Durability: </span>
                  <span className="text-white font-bold">{sp.durability}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-500">
                <span className="text-zinc-400 font-medium">Encryption: </span>
                {sp.encryption}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── Upload Modal ── */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#14141E] border border-violet-500/30 rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
                <h3 className="font-semibold text-base text-white flex items-center gap-2">
                  <Upload className="h-5 w-5 text-violet-400" />
                  <span>Upload File to Nexus Cloud</span>
                </h3>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-zinc-500 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div className="border-2 border-dashed border-white/[0.1] hover:border-violet-500/50 rounded-xl p-8 text-center space-y-3 cursor-pointer">
                  <Upload className="h-8 w-8 text-violet-400 mx-auto" />
                  <p className="text-xs text-zinc-300">Drag and drop files here or click to browse</p>
                  <span className="text-[10px] text-zinc-500 block">Encrypted client-side before network transmission</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setIsUploadModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit">
                    Simulate Upload
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
