import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Layers,
  Lock,
  ExternalLink,
  ChevronRight,
  Info,
  AlertTriangle,
  FileText,
  DollarSign,
  Globe,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useWallet } from '../hooks/useWallet';

interface YieldOpportunity {
  id: string;
  name: string;
  protocol: string;
  asset: string;
  apy: number;
  tvl: string;
  riskRating: 'Low' | 'Medium' | 'High';
  custodyType: 'Non-Custodial Smart Contract' | 'Third-Party Facilitated';
  verified: boolean;
  network: string;
}

const YIELD_OPPORTUNITIES: YieldOpportunity[] = [
  {
    id: 'yield-aave-usdc',
    name: 'Aave v3 USDC Supply Vault',
    protocol: 'Aave Protocol',
    asset: 'USDC',
    apy: 5.24,
    tvl: '$1.42B',
    riskRating: 'Low',
    custodyType: 'Non-Custodial Smart Contract',
    verified: true,
    network: 'Base',
  },
  {
    id: 'yield-compound-usdt',
    name: 'Compound v3 USDT Prime',
    protocol: 'Compound Finance',
    asset: 'USDT',
    apy: 4.88,
    tvl: '$890M',
    riskRating: 'Low',
    custodyType: 'Non-Custodial Smart Contract',
    verified: true,
    network: 'Ethereum Mainnet',
  },
  {
    id: 'yield-aerodrome-lp',
    name: 'Aerodrome USDC/USDT Volatile Pool',
    protocol: 'Aerodrome Finance',
    asset: 'USDC-USDT LP',
    apy: 12.65,
    tvl: '$140M',
    riskRating: 'Medium',
    custodyType: 'Non-Custodial Smart Contract',
    verified: true,
    network: 'Base',
  },
];

export default function DeFiHub() {
  const { isConnected, walletAddress, usdcBalance, signInWithEthereum } = useWallet();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'yield' | 'swap' | 'risk'>('portfolio');
  const [showRiskModal, setShowRiskModal] = useState(false);

  return (
    <div className="space-y-8 pb-16">
      {/* ── Header & Custody Banner ── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <Coins className="h-6 w-6 text-purple-400" />
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Curated DeFi & Financial Interface
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
            Non-custodial asset portfolio, stablecoin liquidity, verified yield discovery, and cross-chain routing with explicit risk disclosures.
          </p>
        </div>

        <button
          onClick={() => setShowRiskModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-mono font-semibold transition-colors cursor-pointer shrink-0"
        >
          <ShieldAlert className="h-4 w-4" />
          <span>DeFi Risk Disclosures</span>
        </button>
      </div>

      {/* ── Custody & Operational Clarity Panel ── */}
      <div className="p-4 rounded-2xl bg-[#121216] border border-purple-500/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-display font-bold text-white">Custody & Protocol Boundary Notice</span>
          </div>
          <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 rounded">
            Non-Custodial Interface
          </span>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Nexus does not take custody of user funds or make investment recommendations. All smart contract transactions are user-directed or governed by explicit user spending policies. Features vary by jurisdiction and legal eligibility.
        </p>
      </div>

      {/* ── Portfolio Overview Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Connected Wallet</span>
            <span className="font-mono text-emerald-400 font-bold">{isConnected ? 'Active' : 'Disconnected'}</span>
          </div>
          {isConnected ? (
            <div>
              <div className="text-xl font-bold font-mono text-white">
                {walletAddress ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : ''}
              </div>
              <div className="text-xs text-zinc-500 font-mono mt-1">Self-Custody Address</div>
            </div>
          ) : (
            <button
              onClick={signInWithEthereum}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-400 text-zinc-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Connect Web3 Wallet
            </button>
          )}
        </div>

        <div className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Stablecoin Balance (USDC)</span>
            <Coins className="h-4 w-4 text-purple-400" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-white">${usdcBalance || '24.50'}</div>
            <div className="text-xs text-zinc-500 font-mono mt-1">Available for x402 Commerce</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Active Settlement Chains</span>
            <Globe className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
              Base
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
              Arbitrum
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
              Solana
            </span>
          </div>
        </div>
      </div>

      {/* ── Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-3">
        <button
          onClick={() => setActiveTab('portfolio')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer',
            activeTab === 'portfolio'
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
          )}
        >
          <Wallet className="h-4 w-4" />
          <span>Asset Balances</span>
        </button>

        <button
          onClick={() => setActiveTab('yield')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer',
            activeTab === 'yield'
              ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
          )}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Verified Yield Discovery ({YIELD_OPPORTUNITIES.length})</span>
        </button>
      </div>

      {/* ── TAB 1: Asset Balances Table ── */}
      {activeTab === 'portfolio' && (
        <div className="rounded-2xl bg-[#121216] border border-zinc-800 overflow-hidden shadow-lg space-y-4 p-5">
          <h3 className="font-display text-sm font-bold text-white">Supported Multichain Assets</h3>
          <div className="divide-y divide-zinc-800/60 text-xs">
            <div className="py-3 flex items-center justify-between text-zinc-400 font-mono">
              <span>ASSET</span>
              <span>NETWORK</span>
              <span>BALANCE</span>
              <span>STATUS</span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-base p-1.5 rounded-lg bg-blue-500/20 text-blue-300">🔵</span>
                <div>
                  <div className="font-bold text-white">USD Coin (USDC)</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Circle Native</div>
                </div>
              </div>
              <span className="font-mono text-zinc-300">Base / Arbitrum / Solana</span>
              <span className="font-mono font-bold text-emerald-400">${usdcBalance || '24.50'}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                x402 Ready
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-base p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300">🟢</span>
                <div>
                  <div className="font-bold text-white">Tether USD (USDT)</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Tether Protocol</div>
                </div>
              </div>
              <span className="font-mono text-zinc-300">Ethereum / Base</span>
              <span className="font-mono text-zinc-400">$0.00</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                Supported
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: Yield Opportunities ── */}
      {activeTab === 'yield' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {YIELD_OPPORTUNITIES.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-[#121216] border border-zinc-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/25">
                      {item.network}
                    </span>
                    <h3 className="font-display text-sm font-bold text-white mt-1.5">{item.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-mono font-bold text-emerald-400">{item.apy}% APY</span>
                    <div className="text-[10px] font-mono text-zinc-500">Variable yield</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 text-xs space-y-2 font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>TVL:</span>
                    <span className="text-white font-medium">{item.tvl}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Risk Rating:</span>
                    <span className="text-emerald-400 font-bold">{item.riskRating}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Custody Type:</span>
                    <span className="text-zinc-300 text-[10px]">{item.custodyType}</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowRiskModal(true)}
                  className="w-full py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 hover:text-white font-medium transition-colors cursor-pointer"
                >
                  Review Risk & View Protocol
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── MODAL: Comprehensive DeFi Risk Panel ── */}
      <AnimatePresence>
        {showRiskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-2xl bg-[#121216] border border-amber-500/40 p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-amber-400" />
                  <h3 className="font-display text-base font-bold text-white">DeFi & Smart Contract Risk Disclosure</h3>
                </div>
                <button onClick={() => setShowRiskModal(false)} className="text-zinc-500 hover:text-white text-sm">
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-zinc-300 leading-relaxed max-h-64 overflow-y-auto pr-1">
                <p>
                  <strong>1. Smart Contract Vulnerability:</strong> Interacting with third-party decentralized protocols exposes users to potential smart contract bugs, exploit risks, or unexpected protocol parameter changes.
                </p>
                <p>
                  <strong>2. Liquidity & De-pegging Risk:</strong> Yield generation and stablecoin positions may experience impermanent loss or de-pegging events under volatile market conditions.
                </p>
                <p>
                  <strong>3. Non-Custodial Responsibility:</strong> User wallet signatures are final and irreversible on target blockchains. Nexus does not possess master keys or administrative access to reverse completed transactions.
                </p>
                <p>
                  <strong>4. Regulatory & Jurisdiction Limits:</strong> Financial interface availability is strictly subject to regional laws and user eligibility declarations.
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-end">
                <button
                  onClick={() => setShowRiskModal(false)}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-zinc-950 font-bold hover:brightness-110 cursor-pointer text-xs"
                >
                  I Understand & Acknowledge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
