import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Zap,
  Globe,
  ShieldCheck,
  Leaf,
  Activity,
  Server,
  Terminal,
  Play,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  DollarSign,
  Info,
} from 'lucide-react';
import { cn } from '../utils/cn';

interface ComputeProvider {
  id: string;
  name: string;
  hardware: string;
  vram: string;
  region: string;
  pricePerHour: number;
  pricePerMillionTokens: number;
  latencyMs: number;
  reliability: string;
  carbonScore: string;
  securityPosture: string;
  status: 'Available' | 'High Demand' | 'Verified Partner';
  verified: boolean;
}

const COMPUTE_PROVIDERS: ComputeProvider[] = [
  {
    id: 'cmp-h100-cluster-us',
    name: 'NVIDIA H100 SXM5 Tensor Cluster',
    hardware: '8x NVIDIA H100 SXM5',
    vram: '640 GB HBM3',
    region: 'US-East (Virginia)',
    pricePerHour: 2.85,
    pricePerMillionTokens: 0.18,
    latencyMs: 14,
    reliability: '99.99%',
    carbonScore: 'A+ (100% Hydro/Wind)',
    securityPosture: 'SOC2 Type II + Confidential Compute',
    status: 'Available',
    verified: true,
  },
  {
    id: 'cmp-a100-eu',
    name: 'NVIDIA A100 80GB Sovereign Node',
    hardware: '4x NVIDIA A100 80GB',
    vram: '320 GB HBM2e',
    region: 'EU-Central (Frankfurt)',
    pricePerHour: 1.45,
    pricePerMillionTokens: 0.12,
    latencyMs: 22,
    reliability: '99.95%',
    carbonScore: 'A (Solar Backup)',
    securityPosture: 'GDPR ISO 27001 Certified',
    status: 'Verified Partner',
    verified: true,
  },
  {
    id: 'cmp-rtx4090-decentralized',
    name: 'Distributed RTX 4090 Mesh',
    hardware: 'RTX 4090 Community Node',
    vram: '24 GB GDDR6X',
    region: 'AP-Southeast (Singapore)',
    pricePerHour: 0.42,
    pricePerMillionTokens: 0.05,
    latencyMs: 38,
    reliability: '99.80%',
    carbonScore: 'B+ (Grid Standard)',
    securityPosture: 'TEE Encrypted Enclave',
    status: 'High Demand',
    verified: false,
  },
  {
    id: 'cmp-apple-m3max-edge',
    name: 'Apple M3 Max Apple Silicon Cluster',
    hardware: '128GB Unified Memory M3 Max',
    vram: '128 GB Unified',
    region: 'US-West (Oregon)',
    pricePerHour: 0.85,
    pricePerMillionTokens: 0.08,
    latencyMs: 18,
    reliability: '99.90%',
    carbonScore: 'A+ Zero Emission',
    securityPosture: 'Apple Secure Enclave Architecture',
    status: 'Available',
    verified: true,
  },
];

export default function ComputeMarketplace() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHardwareFilter, setSelectedHardwareFilter] = useState<string>('All');
  const [selectedProviderForJob, setSelectedProviderForJob] = useState<ComputeProvider | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobPrompt, setJobPrompt] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [jobSuccess, setJobSuccess] = useState<string | null>(null);

  const filteredProviders = COMPUTE_PROVIDERS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.hardware.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedHardwareFilter === 'All') return matchesSearch;
    return matchesSearch && p.hardware.includes(selectedHardwareFilter);
  });

  const handleDeployJob = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeploying(true);

    setTimeout(() => {
      setIsDeploying(false);
      setJobSuccess(`Task provisioned on ${selectedProviderForJob?.name}. Execution cost estimated at $0.04 x402 USDC.`);
      setTimeout(() => {
        setJobSuccess(null);
        setIsJobModalOpen(false);
        setJobPrompt('');
      }, 2500);
    }, 1800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <Cpu className="h-6 w-6 text-emerald-400" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Decentralized & Sovereign Compute Marketplace
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
            Provision GPU hardware, serverless AI inference nodes, confidential compute enclaves, and low-latency render tasks with transparent pricing and carbon accounting.
          </p>
        </div>
      </div>

      {/* ── Metric Highlights Bar ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Avg Latency</div>
            <div className="text-base font-bold text-white font-mono">18ms</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Total VRAM Pool</div>
            <div className="text-base font-bold text-white font-mono">1,112 GB HBM</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Leaf className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Renewable Power</div>
            <div className="text-base font-bold text-white font-mono">94% Green</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Confidential Enclaves</div>
            <div className="text-base font-bold text-white font-mono">TEE Active</div>
          </div>
        </div>
      </div>

      {/* ── Filters & Search ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-xl px-3 py-2 w-full sm:w-80">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search GPUs, regions, or specs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-white focus:outline-none placeholder-zinc-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'H100', 'A100', 'RTX', 'Apple'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedHardwareFilter(filter)}
              className={cn(
                'px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap',
                selectedHardwareFilter === filter
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* ── Provider Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProviders.map((provider) => (
          <motion.div
            key={provider.id}
            whileHover={{ y: -2 }}
            className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between shadow-lg space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {provider.name}
                    </h3>
                    {provider.verified && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-zinc-400 mt-1 flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-zinc-500" /> {provider.region}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-emerald-400">${provider.pricePerHour}/hr</div>
                  <div className="text-[10px] font-mono text-zinc-500">${provider.pricePerMillionTokens}/1M tok</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-[10px] font-mono text-zinc-500 block">Hardware / VRAM</span>
                  <span className="font-mono text-zinc-200 text-[11px] font-bold block truncate">{provider.hardware}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">{provider.vram}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <span className="text-[10px] font-mono text-zinc-500 block">Latency & Uptime</span>
                  <span className="font-mono text-cyan-300 text-[11px] block">{provider.latencyMs}ms avg</span>
                  <span className="text-[10px] text-zinc-400 font-mono">{provider.reliability} SLA</span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 col-span-2">
                  <span className="text-[10px] font-mono text-zinc-500 block">Security Posture</span>
                  <span className="font-medium text-zinc-300 text-[11px] truncate block">{provider.securityPosture}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Leaf className="h-3 w-3" /> {provider.carbonScore}
                </span>
                <span className="text-zinc-500">{provider.status}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-500">Pay via x402 micro-settlement</span>
              <button
                onClick={() => {
                  setSelectedProviderForJob(provider);
                  setIsJobModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:brightness-110 text-zinc-950 font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Launch Task</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── MODAL: Provision Task on Selected Node ── */}
      <AnimatePresence>
        {isJobModalOpen && selectedProviderForJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#121216] border border-zinc-800 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-emerald-400" />
                    <span>Provision Compute Task</span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5 font-mono">{selectedProviderForJob.name}</p>
                </div>
                <button onClick={() => setIsJobModalOpen(false)} className="text-zinc-500 hover:text-white text-sm">
                  ✕
                </button>
              </div>

              {jobSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{jobSuccess}</span>
                </div>
              )}

              <form onSubmit={handleDeployJob} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-medium">Task Definition / Container Payload</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter model inference prompt, python script URL, or Docker image tag..."
                    value={jobPrompt}
                    onChange={(e) => setJobPrompt(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-white font-mono focus:border-emerald-400 focus:outline-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between text-zinc-400">
                    <span>Region Node:</span>
                    <span className="text-white">{selectedProviderForJob.region}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Rate Structure:</span>
                    <span className="text-emerald-400">${selectedProviderForJob.pricePerMillionTokens}/1M Tokens</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>x402 Facilitator:</span>
                    <span className="text-cyan-300">Meridian x402 Protocol</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsJobModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isDeploying}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-zinc-950 font-bold hover:brightness-110 cursor-pointer shadow-lg flex items-center gap-2"
                  >
                    {isDeploying ? (
                      <>
                        <Clock className="h-4 w-4 animate-spin" />
                        <span>Provisioning Hardware...</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 fill-current" />
                        <span>Execute on Node</span>
                      </>
                    )}
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
