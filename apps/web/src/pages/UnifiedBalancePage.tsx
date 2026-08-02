import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Award,
  Lock,
} from 'lucide-react';
import { formatAtomicCurrency, computePriceBreakdownAtomic } from '../utils/currency';
import { useWallet } from '../hooks/useWallet';
import { useToast } from '../components/ui/Toast';
import { TruthStateBadge } from '../components/common/TruthStateBadge';

export default function UnifiedBalancePage() {
  const { walletAddress, chainId, isConnected } = useWallet();
  const { toast } = useToast();

  const [availableBalanceAtomic, setAvailableBalanceAtomic] = useState('24500000'); // $24.50
  const [nexusCreditsAtomic, setNexusCreditsAtomic] = useState('10000000');        // $10.00 Nexus Credits
  const [membershipTier, setMembershipTier] = useState<'explorer' | 'builder' | 'creator' | 'studio'>('builder');
  const [topUpAmount, setTopUpAmount] = useState<number>(25);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);

  const membershipTiers = [
    {
      id: 'explorer',
      name: 'Explorer',
      price: 'Free',
      nexRequirement: '0 NEX',
      feeDiscount: '0%',
      features: ['Standard marketplace access', 'Fixed-price agent runs', 'Standard result retention'],
    },
    {
      id: 'builder',
      name: 'Builder',
      price: 'Optional NEX Lock',
      nexRequirement: '1,000 NEX (Testnet)',
      feeDiscount: '25% off Nexus fee',
      features: ['Higher concurrent run limits', 'Extended result history', '25% discount on Nexus fees'],
    },
    {
      id: 'creator',
      name: 'Creator',
      price: 'Optional NEX Lock',
      nexRequirement: '5,000 NEX (Testnet)',
      feeDiscount: '50% off Nexus fee',
      features: ['Advanced creator analytics', 'Unlimited agent listings', '50% discount on Nexus fees'],
    },
    {
      id: 'studio',
      name: 'Studio',
      price: 'Optional NEX Lock',
      nexRequirement: '25,000 NEX (Testnet)',
      feeDiscount: '75% off Nexus fee',
      features: ['Team organization tools', 'Priority execution queues', 'Dedicated API routing'],
    },
  ];

  const handleTopUp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const addedAtomic = BigInt(topUpAmount * 1000000);
      setAvailableBalanceAtomic((prev) => (BigInt(prev) + addedAtomic).toString());
      setIsProcessing(false);
      toast(`Successfully added $${topUpAmount}.00 USDC balance via MRDN x402 facilitator!`, 'success');
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 gap-8 select-none pb-20">
      
      {/* ── Top Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold text-[#00F5D4] bg-[#00F5D4]/10 border border-[#00F5D4]/20 px-2 py-0.5 rounded-full uppercase">
              Workspace Payments & Membership
            </span>
            <TruthStateBadge status="production" text="x402 Facilitator Connected" />
          </div>
          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Payments, Credits & <span className="text-prismatic">NEX Membership</span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Manage your USDC balance, nontransferable Nexus Credits, and optional NEX membership benefits.
          </p>
        </div>
      </div>

      {/* ── Balance & Credit KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Available USDC Balance */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-[#00F5D4]/15 via-[#00F5D4]/5 to-transparent border border-[#00F5D4]/40 space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Available USDC Balance</span>
            <Coins className="h-4 w-4 text-[#00F5D4]" />
          </div>
          <div className="font-display font-extrabold text-3xl text-white">
            {formatAtomicCurrency(availableBalanceAtomic)}
          </div>
          <div className="text-[10px] font-mono text-[#00F5D4] font-bold">
            Settlement Facilitator: MRDN x402
          </div>
        </div>

        {/* Nexus Service Credits */}
        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Nexus Service Credits</span>
            <Sparkles className="h-4 w-4 text-[#A855F7]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-white">
            {formatAtomicCurrency(nexusCreditsAtomic)}
          </div>
          <div className="text-[10px] font-mono text-zinc-500">
            Nontransferable promotional credits
          </div>
        </div>

        {/* Current NEX Membership Tier */}
        <div className="p-5 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>NEX Membership Tier</span>
            <Award className="h-4 w-4 text-[#FFD700]" />
          </div>
          <div className="font-display font-extrabold text-2xl text-[#FFD700] capitalize">
            {membershipTier} Tier
          </div>
          <div className="text-[10px] font-mono text-zinc-500">
            25% discount on Nexus marketplace fees
          </div>
        </div>

      </div>

      {/* ── Top-Up & Balance Management ── */}
      <div className="p-6 rounded-2xl bg-[var(--nx-surface-1)] border border-white/[0.08] space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <h2 className="font-display font-extrabold text-base text-white flex items-center gap-2">
            <Coins className="h-4 w-4 text-[#00F5D4]" />
            <span>USDC Balance Top-Up</span>
          </h2>
          <span className="text-[11px] font-mono text-zinc-400">x402 Facilitator: MRDN</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-zinc-400 uppercase">Currency Asset</label>
            <input
              type="text"
              disabled
              value="USDC (Standard Market Asset)"
              className="bg-[var(--nx-bg)] border border-white/[0.08] text-xs font-mono text-zinc-300 p-3 rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-mono text-zinc-400 uppercase">Top-Up Amount (USD)</label>
            <input
              type="number"
              min={5}
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(Math.max(5, Number(e.target.value)))}
              className="bg-[var(--nx-bg)] border border-white/[0.08] text-xs font-mono text-white p-3 rounded-xl focus:outline-none focus:border-[#00F5D4]"
            />
          </div>

          <div className="flex items-end">
            <Button
              onClick={handleTopUp}
              isLoading={isProcessing}
              variant="primary"
              size="md"
              className="w-full font-bold"
              rightIcon={<ArrowUpRight className="h-4 w-4" />}
            >
              Add USDC Balance
            </Button>
          </div>
        </div>
      </div>

      {/* ── NEX Membership Tiers Section ── */}
      <div className="space-y-6">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            Optional NEX <span className="text-prismatic">Membership Tiers</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            NEX is optional and never required to buy, sell, or execute agents. Lock testnet NEX for platform fee discounts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {membershipTiers.map((tier) => {
            const isCurrent = membershipTier === tier.id;
            return (
              <div
                key={tier.id}
                className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 transition-all ${
                  isCurrent
                    ? 'bg-[#00F5D4]/10 border-[#00F5D4] shadow-lg shadow-[#00F5D4]/15'
                    : 'bg-[var(--nx-surface-1)] border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-extrabold text-lg text-white">{tier.name}</h3>
                    {isCurrent && (
                      <span className="text-[10px] font-mono font-bold text-zinc-950 bg-[#00F5D4] px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    <span className="text-[#00F5D4] font-bold block">{tier.feeDiscount}</span>
                    <span className="text-zinc-400 block text-[11px]">{tier.nexRequirement}</span>
                  </div>

                  <ul className="space-y-2 text-xs text-zinc-400 font-sans">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00F5D4] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  onClick={() => setMembershipTier(tier.id as any)}
                  variant={isCurrent ? 'cyan' : 'outline'}
                  size="sm"
                  className="w-full font-bold"
                >
                  {isCurrent ? 'Current Tier' : `Switch to ${tier.name}`}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
