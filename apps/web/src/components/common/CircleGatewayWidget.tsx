import React, { useState } from 'react';
import { Shield, ArrowUpRight, ArrowDownLeft, CheckCircle2, Info, Lock } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

const SUPPORTED_MAINNETS = [
  { name: 'Ethereum', symbol: 'ETH', icon: '🌐' },
  { name: 'Base', symbol: 'BASE', icon: '🔵' },
  { name: 'Optimism', symbol: 'OP', icon: '🔴' },
  { name: 'Arbitrum', symbol: 'ARB', icon: '🔷' },
  { name: 'Avalanche', symbol: 'AVAX', icon: '🔺' },
  { name: 'Polygon', symbol: 'MATIC', icon: '💜' },
  { name: 'Unichain', symbol: 'UNI', icon: '🦄' },
  { name: 'Sonic', symbol: 'S', icon: '⚡' },
  { name: 'World Chain', symbol: 'WLD', icon: '🌍' },
  { name: 'Sei', symbol: 'SEI', icon: '🔴' },
  { name: 'HyperEVM', symbol: 'HYPER', icon: '⚡' },
];

export const CircleGatewayWidget: React.FC = () => {
  const { isConnected, usdcBalance, signInWithEthereum } = useWallet();
  const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>('deposit');
  const [selectedChain, setSelectedChain] = useState<string>('Base');
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [txSuccess, setTxSuccess] = useState<boolean>(false);

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTxSuccess(true);
      setAmount('');
      setTimeout(() => setTxSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="bg-[#1B1B1C] rounded-2xl border border-zinc-800 p-5 space-y-6 shadow-xl">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div>
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <span>Circle Gateway Nanopayments</span>
            <span className="text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              x402 Unified Balance
            </span>
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Deposit USDC from any chain to fund your unified balance for zero-gas batched nanopayments.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl font-mono">
          <Shield className="h-3.5 w-3.5 text-emerald-400" />
          <span>Circle Gateway</span>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800">
        <button
          type="button"
          onClick={() => setActiveTab('deposit')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'deposit'
              ? 'bg-emerald-400 text-zinc-950 shadow-md font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ArrowDownLeft className="h-3.5 w-3.5" />
          <span>Deposit</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('withdraw')}
          className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'withdraw'
              ? 'bg-emerald-400 text-zinc-950 shadow-md font-bold'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          <span>Withdraw</span>
        </button>
      </div>

      {/* Main Interactive Form */}
      <form onSubmit={handleAction} className="space-y-5">
        {/* Chain Selector Grid */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">
            Select Source Chain ({SUPPORTED_MAINNETS.length} Supported)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1 no-scrollbar">
            {SUPPORTED_MAINNETS.map((chain) => (
              <button
                key={chain.name}
                type="button"
                onClick={() => setSelectedChain(chain.name)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer truncate ${
                  selectedChain === chain.name
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40 shadow-sm font-semibold'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
                }`}
              >
                <span className="text-sm">{chain.icon}</span>
                <span className="truncate">{chain.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span>{activeTab === 'deposit' ? 'Deposit Amount (USDC)' : 'Withdraw Amount (USDC)'}</span>
            <span>Balance: ${usdcBalance || '24.50'}</span>
          </div>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              min="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-lg font-mono font-bold text-white placeholder:text-zinc-600 focus:border-emerald-500/50"
            />
            <button
              type="button"
              onClick={() => setAmount(usdcBalance || '24.50')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-md hover:bg-emerald-500/25 transition-colors cursor-pointer"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Incentive Callout */}
        <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800 text-xs text-zinc-400 space-y-1 font-mono">
          <div className="flex items-center justify-between text-zinc-300">
            <span>Protocol Deposit Fee:</span>
            <span className="text-emerald-400 font-bold">0.5% (0% with $MRDN)</span>
          </div>
          <div className="flex items-center justify-between text-zinc-300">
            <span>MRDN Cashback Rewards:</span>
            <span className="text-emerald-400 font-bold">+5% on all executions</span>
          </div>
        </div>

        {/* Action Button */}
        {isConnected ? (
          <button
            type="submit"
            disabled={isProcessing || !amount}
            className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                <span>Processing Gateway Transaction...</span>
              </>
            ) : txSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-zinc-950" />
                <span>Transaction Confirmed!</span>
              </>
            ) : (
              <span>{activeTab === 'deposit' ? `Deposit ${amount ? `$${amount}` : ''} via Circle Gateway` : `Initiate Withdrawal ${amount ? `$${amount}` : ''}`}</span>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={signInWithEthereum}
            className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <Lock className="h-4 w-4" />
            <span>Connect Wallet to Access Gateway</span>
          </button>
        )}
      </form>

      {/* How it Works Footer Note */}
      <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800/80 flex items-start gap-2 text-[11px] text-zinc-400">
        <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-normal">
          <strong className="text-zinc-200">How Circle Gateway Works</strong>: Deposits on any chain fund your unified session balance. Withdrawals initiate on-chain and unlock after settlement period. Fully trustless and gas-free for nanopayments.
        </p>
      </div>
    </div>
  );
};
