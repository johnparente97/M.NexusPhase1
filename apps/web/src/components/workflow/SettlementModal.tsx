import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CreditCard, Landmark, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

export interface SettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onConfirm: () => void;
}

export const SettlementModal: React.FC<SettlementModalProps> = ({ isOpen, onClose, amount, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Authorize Settlement Authorization" size="sm">
      <div className="flex flex-col gap-6 select-none">
        
        {/* Payment Summary */}
        <div className="flex flex-col items-center gap-1 bg-zinc-950 border border-zinc-800 rounded-xl p-6">
          <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Mpay checkout</span>
          <span className="text-2xl font-bold text-zinc-100">{amount === 0 ? 'Free' : formatCurrency(amount)}</span>
          <span className="text-[9px] text-zinc-500 mt-1 uppercase font-bold tracking-wide">
            Simulated Meridian network
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <h4 className="text-xs font-semibold text-zinc-300">Choose simulated payment source</h4>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between border-2 border-indigo-500/50 bg-indigo-500/5 p-3 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <Landmark className="h-4 w-4 text-indigo-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-zinc-200">Meridian Mpay Wallet</span>
                  <span className="text-[9px] text-zinc-500">Balance: 1,245.00 MRDN</span>
                </div>
              </div>
              <Check className="h-4 w-4 text-indigo-400 shrink-0" />
            </div>

            <div className="flex items-center justify-between border border-zinc-800 bg-zinc-950 p-3 rounded-lg opacity-40 cursor-not-allowed">
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-zinc-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-zinc-400">Credit Card (Stripe demo)</span>
                  <span className="text-[9px] text-zinc-600">Phase 2 integration only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-zinc-500 leading-relaxed text-center px-4">
          By clicking authorize, you approve a simulated value movement of {formatCurrency(amount)} on the testnet. No real funds are moved.
        </p>

        <div className="flex items-center justify-end gap-3 mt-4 border-t border-zinc-800 pt-5">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm} className="font-bold">
            Authorize & Execute
          </Button>
        </div>

      </div>
    </Modal>
  );
};
export default SettlementModal;
