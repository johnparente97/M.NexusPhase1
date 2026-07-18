import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { ShieldAlert, Check, Wallet, HelpCircle, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { useWallet } from '../../hooks/useWallet';
import { fetchApi } from '../../services/api-client';

export interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  workflowId: string;
  onConfirm: (paymentIntentId: string, signature: string) => void;
}

export const SettlementModal: React.FC<SettlementModalProps> = ({ isOpen, onClose, amount, workflowId, onConfirm }) => {
  const {
    walletAddress,
    chainId,
    isConnected,
    isConnecting,
    usdcBalance,
    connectWallet,
    switchNetwork,
    signTypedData
  } = useWallet();

  const [isSigning, setIsSigning] = useState(false);
  const [signingError, setSigningError] = useState<string | null>(null);

  const isWrongNetwork = isConnected && chainId !== 84532;
  const parsedUsdcBalance = parseFloat(usdcBalance);
  const isInsufficientBalance = isConnected && !isWrongNetwork && parsedUsdcBalance < amount;

  const handleAuthorize = async () => {
    if (!walletAddress) return;
    setIsSigning(true);
    setSigningError(null);

    try {
      // 1. Fetch server-side calculated payment intent parameter specifications
      const intent = await fetchApi<{
        paymentIntentId: string;
        domain: any;
        types: any;
        value: any;
      }>('/api/payment/intent', {
        method: 'POST',
        body: JSON.stringify({
          workflowId,
          walletAddress: walletAddress.toLowerCase(),
        }),
      });

      // 2. Request EIP-712 typed signature from wallet provider
      const signature = await signTypedData(
        intent.domain,
        intent.types,
        intent.value
      );
      
      // 3. Confirm with parent
      onConfirm(intent.paymentIntentId, signature);
    } catch (err: any) {
      console.error('Payment authorization rejected:', err);
      setSigningError(err.message || 'Signature request rejected by user.');
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Authorize Meridian Settlement" size="sm">
      <div className="flex flex-col gap-5 select-none">
        
        {/* Payment Summary Header */}
        <div className="flex flex-col items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5 shadow-inner">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Required Payment</span>
          <span className="text-2xl font-bold text-[#27F293]">{amount === 0 ? 'Free' : `${amount.toFixed(2)} USDC`}</span>
          <span className="text-[9px] text-zinc-400 mt-1 uppercase font-bold tracking-wide flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#27F293] animate-ping" />
            Base Sepolia Network
          </span>
        </div>

        {/* Diagnostic States */}
        {!isConnected ? (
          <div className="flex flex-col gap-3.5 items-center justify-center py-4 border border-dashed border-zinc-800 rounded-xl p-4 bg-zinc-900/10">
            <Wallet className="h-6 w-6 text-zinc-500" />
            <p className="text-xs text-zinc-400 text-center">Wallet not connected. Connect your Web3 wallet to authorize testnet payment.</p>
            <Button
              variant="primary"
              size="sm"
              onClick={connectWallet}
              isLoading={isConnecting}
              className="w-full text-xs font-semibold"
            >
              Connect Wallet
            </Button>
          </div>
        ) : isWrongNetwork ? (
          <div className="flex flex-col gap-3.5 items-center justify-center py-4 border border-red-500/20 bg-red-500/5 rounded-xl p-4">
            <ShieldAlert className="h-6 w-6 text-red-400 animate-bounce" />
            <p className="text-xs text-red-400 text-center font-semibold">Wrong Network Detected</p>
            <p className="text-[10px] text-zinc-500 text-center">Nexus runs on Base Sepolia. Please switch networks in your wallet to continue.</p>
            <Button
              variant="primary"
              size="sm"
              onClick={switchNetwork}
              className="w-full text-xs font-bold bg-red-500 hover:bg-red-600 text-white"
            >
              Switch to Base Sepolia
            </Button>
          </div>
        ) : isInsufficientBalance ? (
          <div className="flex flex-col gap-3.5 items-center justify-center py-4 border border-amber-500/20 bg-amber-500/5 rounded-xl p-4">
            <ShieldAlert className="h-6 w-6 text-amber-400" />
            <p className="text-xs text-amber-400 text-center font-semibold">Insufficient USDC Balance</p>
            <p className="text-[10px] text-zinc-400 text-center">You have {usdcBalance} USDC but {amount.toFixed(2)} USDC is required.</p>
            <a
              href="https://faucets.chain.link/base-sepolia"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center"
            >
              <Button
                variant="primary"
                size="sm"
                className="w-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center gap-1.5"
              >
                Request Testnet Funds
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border border-zinc-800 bg-[#1E1E20]/40 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <Wallet className="h-4 w-4 text-[#27F293]" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-zinc-200">MetaMask / Injected Wallet</span>
                  <span className="text-[9px] text-zinc-500">Balance: {usdcBalance} USDC</span>
                </div>
              </div>
              <Check className="h-4 w-4 text-[#27F293]" />
            </div>

            {signingError && (
              <p className="text-[10px] text-red-400 bg-red-500/5 border border-red-500/20 rounded p-2 text-center">
                {signingError}
              </p>
            )}

            <p className="text-[10px] text-zinc-500 leading-relaxed text-center px-2 mt-2">
              By confirming, you will sign a gasless EIP-712 TransferWithAuthorization payload. The Meridian facilitator will execute and settle the payment on-chain.
            </p>
          </div>
        )}

        {/* Modal Controls */}
        <div className="flex items-center justify-end gap-3 mt-4 border-t border-zinc-800 pt-4">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSigning}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAuthorize}
            disabled={!isConnected || isWrongNetwork || isInsufficientBalance}
            isLoading={isSigning}
            className="font-bold px-4"
          >
            Sign & Authorize
          </Button>
        </div>

      </div>
    </Modal>
  );
};
export default SettlementModal;
