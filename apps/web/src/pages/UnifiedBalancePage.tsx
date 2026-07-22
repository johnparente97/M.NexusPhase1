import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SUPPORTED_CHAINS, SupportedToken, STANDARD_TOP_UP_FEE_BPS, MRDN_TOP_UP_FEE_BPS } from '../config/chain-config';
import { MeridianRouterAdapter, TopUpCalculation } from '../adapters/meridian/router';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import {
  Coins,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  CreditCard,
  History,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { useWallet } from '../hooks/useWallet';
import { useToast } from '../components/ui/Toast';

export default function UnifiedBalancePage() {
  const { walletAddress, chainId, isConnected } = useWallet();
  const { toast } = useToast();

  const [availableBalance, setAvailableBalance] = useState(24.50);
  const [lifetimeUsage, setLifetimeUsage] = useState(14.20);
  const [sessionSpend, setSessionSpend] = useState(1.45);
  const [showAdvancedTech, setShowAdvancedTech] = useState(false);

  // Top-Up Form State
  const [selectedChainId, setSelectedChainId] = useState<string>('84532');
  const [depositAmount, setDepositAmount] = useState<number>(25);
  const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);
  const [isProcessingTopUp, setIsProcessingTopUp] = useState(false);

  const activeChain = SUPPORTED_CHAINS[selectedChainId] || SUPPORTED_CHAINS['84532']!;
  const activeToken = activeChain.tokens[selectedTokenIndex] || activeChain.tokens[0]!;
  const calculation: TopUpCalculation = MeridianRouterAdapter.calculateTopUp(
    depositAmount,
    activeToken,
    activeChain.id
  );

  const handleExecuteTopUp = () => {
    setIsProcessingTopUp(true);
    setTimeout(() => {
      setAvailableBalance((prev) => parseFloat((prev + calculation.netCreditedUsdc).toFixed(2)));
      setIsProcessingTopUp(false);
      toast(
        `Successfully credited $${calculation.netCreditedUsdc.toFixed(2)} USDC to your Unified AI Balance! ${
          calculation.isMrdnZeroFeeBenefit ? '(0% Fee MRDN Benefit Applied)' : '(1% Top-Up Fee)'
        }`,
        'success'
      );
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 gap-8 select-none pb-20">
      
      {/* Header */}
      <div className="flex flex-col gap-1.5 border-b border-zinc-900 pb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-display font-bold text-zinc-100">Unified Meridian AI Balance</h1>
          <Badge variant="success" className="text-[10px] font-mono">x402 ROUTER</Badge>
        </div>
        <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
          Fund your AI balance using supported EVM tokens. Paid automatically per request via Meridian settlement infrastructure.
        </p>
      </div>

      {/* Main Dollar Balance Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-950/20 to-zinc-900 border-zinc-800 p-5 flex flex-col gap-2 shadow-lg">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Available Balance</span>
          <span className="text-3xl font-display font-bold text-[#27F293]">
            {formatCurrency(availableBalance)}
          </span>
          <span className="text-[10px] text-zinc-400 mt-1 font-mono">
            ~{Math.round(availableBalance / 0.002)} prompts remaining
          </span>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Current Session Spend</span>
          <span className="text-2xl font-display font-bold text-zinc-200">
            {formatCurrency(sessionSpend)}
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">Session Limit: $10.00</span>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Lifetime AI Spend</span>
          <span className="text-2xl font-display font-bold text-zinc-200">
            {formatCurrency(lifetimeUsage)}
          </span>
          <span className="text-[10px] text-zinc-500 font-mono">14 Completed Runs</span>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 p-5 flex flex-col gap-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">MRDN Fee Benefit</span>
          <span className="text-2xl font-display font-bold text-emerald-400">
            0% Top-Up Fee
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">USDC / Other Assets: 1% Fee</span>
        </Card>
      </div>

      {/* Transparent Fee Utility Information Banner */}
      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-zinc-300">
        <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <span className="font-bold text-white text-xs">Top-Up Fee Structure</span>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Deposit using <strong className="text-emerald-400">MRDN for a 0% top-up fee</strong>, or <strong className="text-zinc-200">USDC / standard tokens for a 1% top-up fee</strong>. MRDN is optional—you can access all inference models and workflows using USDC or any supported asset.
          </p>
        </div>
      </div>

      {/* Multichain Top-Up Guided Wizard */}
      <Card className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-[#27F293]" />
            <h2 className="text-base font-display font-bold text-zinc-100">
              Multichain AI Balance Top-Up
            </h2>
          </div>
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800">
            Fee Rate: <span className={calculation.isMrdnZeroFeeBenefit ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>{calculation.feePercentageDisplay}</span>
          </span>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Select Chain */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-zinc-400 uppercase">1. Source Network</label>
            <select
              value={selectedChainId}
              onChange={(e) => {
                setSelectedChainId(e.target.value);
                setSelectedTokenIndex(0);
              }}
              className="bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-100 p-3 rounded-xl focus:outline-none cursor-pointer"
            >
              {Object.values(SUPPORTED_CHAINS).map((chain) => (
                <option key={chain.id} value={String(chain.id)} disabled={!chain.supported}>
                  {chain.name} {!chain.supported ? '(Coming Soon)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Select Token */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-zinc-400 uppercase">2. Deposited Token</label>
            <select
              value={selectedTokenIndex}
              onChange={(e) => setSelectedTokenIndex(Number(e.target.value))}
              className="bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-100 p-3 rounded-xl focus:outline-none cursor-pointer"
            >
              {activeChain.tokens.map((tok, idx) => (
                <option key={tok.symbol} value={idx}>
                  {tok.symbol} — {tok.name}
                </option>
              ))}
            </select>
          </div>

          {/* Deposit Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-zinc-400 uppercase">3. Deposit Amount</label>
            <input
              type="number"
              min={1}
              value={depositAmount}
              onChange={(e) => setDepositAmount(Math.max(1, Number(e.target.value)))}
              className="bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-100 p-3 rounded-xl focus:outline-none font-mono"
            />
          </div>
        </div>

        {/* Top-Up Fee & Conversion Breakdown Box */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4.5 flex flex-col gap-2.5 text-xs font-mono">
          <div className="flex justify-between text-zinc-400 border-b border-zinc-900 pb-2">
            <span>Gross Deposit Value:</span>
            <span className="text-zinc-200 font-semibold">{formatCurrency(calculation.grossUsdValue)}</span>
          </div>
          <div className="flex justify-between text-zinc-400 border-b border-zinc-900 pb-2">
            <span>Top-Up Fee Rate:</span>
            {calculation.isMrdnZeroFeeBenefit ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Badge variant="success" className="text-[9px] py-0">0% MRDN BENEFIT</Badge>
                $0.00
              </span>
            ) : (
              <span className="text-amber-400 font-semibold">
                -$${calculation.meridianTopUpFeeUsd.toFixed(2)} (1%)
              </span>
            )}
          </div>
          <div className="flex justify-between text-zinc-400 border-b border-zinc-900 pb-2">
            <span>Estimated Network Gas & Slippage:</span>
            <span className="text-zinc-400">-${(calculation.estimatedNetworkFeeUsd + calculation.slippageUsd).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[#27F293] font-bold text-sm pt-1">
            <span>Net Credited AI Balance:</span>
            <span>+{formatCurrency(calculation.netCreditedUsdc)}</span>
          </div>
        </div>

        {/* Execute Top-Up Button */}
        <div className="flex items-center justify-between pt-2 flex-wrap gap-3">
          <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>x402 Transfer-With-Authorization (No signature per prompt)</span>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={handleExecuteTopUp}
            isLoading={isProcessingTopUp}
            className="font-bold px-6 text-xs flex items-center gap-2"
          >
            Confirm Top-Up Transaction
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Advanced Technical Blockchain View Drawer */}
      <div className="flex flex-col gap-4 border-t border-zinc-900 pt-6">
        <button
          onClick={() => setShowAdvancedTech((prev) => !prev)}
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-zinc-200 cursor-pointer w-fit"
        >
          {showAdvancedTech ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <span>{showAdvancedTech ? 'Hide Technical Architecture View' : 'Show Technical Architecture View'}</span>
        </button>

        {showAdvancedTech && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3 text-xs font-mono text-zinc-400"
          >
            <h3 className="text-xs font-bold text-zinc-200">Onchain Settlement Architecture</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="bg-zinc-900/60 p-3 rounded-lg flex justify-between">
                <span>Source CAIP-2 Chain:</span>
                <span className="text-zinc-200">{activeChain.caip2Id}</span>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-lg flex justify-between">
                <span>Contract Address:</span>
                <span className="text-zinc-200 truncate max-w-[140px]">{activeToken.address}</span>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-lg flex justify-between">
                <span>Payment Facilitator:</span>
                <span className="text-[#27F293]">Meridian Facilitator Proxy</span>
              </div>
              <div className="bg-zinc-900/60 p-3 rounded-lg flex justify-between">
                <span>Settlement Protocol:</span>
                <span className="text-zinc-200">x402 (EIP-3009 Transfer-With-Authorization)</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
