import React, { useState } from 'react';
import { Send, CheckCircle2, Zap, Delete } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';

export const MpayWidget: React.FC = () => {
  const { isConnected, usdcBalance, signInWithEthereum } = useWallet();
  const [recipient, setRecipient] = useState<string>('');
  const [amountStr, setAmountStr] = useState<string>('0');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [txSuccess, setTxSuccess] = useState<boolean>(false);

  const handleKeyClick = (val: string) => {
    if (val === 'DEL') {
      setAmountStr((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (val === '.') {
      if (!amountStr.includes('.')) {
        setAmountStr((prev) => prev + '.');
      }
    } else {
      setAmountStr((prev) => (prev === '0' ? val : prev + val));
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || parseFloat(amountStr) <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTxSuccess(true);
      setAmountStr('0');
      setRecipient('');
      setTimeout(() => setTxSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="bg-[#1B1B1C] rounded-2xl border border-zinc-800 p-5 space-y-5 shadow-xl">
      {/* Mpay Brand Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-display font-extrabold text-emerald-400 text-lg">
            M
          </div>
          <div>
            <h3 className="font-display font-bold text-base text-white flex items-center gap-1.5">
              <span>Mpay</span>
              <span className="text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                EIP-2612 Gasless
              </span>
            </h3>
            <p className="text-xs text-zinc-400">Send USDC gaslessly using off-chain signatures & x402 settlement.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Powered by x402</span>
      </div>

      <form onSubmit={handleSend} className="space-y-4">
        {/* Recipient Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block">To Recipient</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Wallet address (0x...) or ENS"
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-zinc-600 focus:border-emerald-500/50"
          />
        </div>

        {/* Display Amount */}
        <div className="bg-zinc-900/90 rounded-2xl p-4 border border-zinc-800 text-center space-y-1">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">Transfer Amount</span>
          <div className="text-4xl font-display font-extrabold text-white tracking-tight flex items-center justify-center gap-1">
            <span className="text-emerald-400">$</span>
            <span>{amountStr}</span>
            <span className="text-xs font-mono text-zinc-400 font-normal self-end mb-1">USDC</span>
          </div>
          <div className="text-[11px] font-mono text-zinc-400">Available: ${usdcBalance || '24.50'}</div>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'DEL'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleKeyClick(key)}
              className="h-12 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-mono font-bold text-base border border-zinc-800 transition-colors flex items-center justify-center cursor-pointer select-none active:scale-95"
            >
              {key === 'DEL' ? <Delete className="h-4 w-4 text-zinc-400" /> : key}
            </button>
          ))}
        </div>

        {/* Action Button */}
        {isConnected ? (
          <button
            type="submit"
            disabled={isProcessing || !recipient || parseFloat(amountStr) <= 0}
            className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
                <span>Signing Gasless Permit (EIP-2612)...</span>
              </>
            ) : txSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-zinc-950" />
                <span>Mpay Transfer Complete!</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4 text-zinc-950" />
                <span>Send Mpay (${amountStr})</span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={signInWithEthereum}
            className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold rounded-xl text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
          >
            <Zap className="h-4 w-4" />
            <span>Connect Wallet for Gasless Mpay</span>
          </button>
        )}
      </form>
    </div>
  );
};
