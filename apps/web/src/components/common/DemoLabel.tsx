import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';

export default function DemoLabel() {
  const envMode = (import.meta as any).env?.VITE_APP_ENV || 'testnet';

  const badgeText =
    envMode === 'production'
      ? 'Production'
      : envMode === 'testnet'
      ? 'Base Sepolia Testnet'
      : 'Demo & Testnet Mode';

  return (
    <Tooltip content="Operating on Base Sepolia Testnet & Phase 1 Sandbox. No real funds required.">
      <div>
        <Badge
          variant="outline"
          className="text-[9px] border-[#27F293]/30 text-[#27F293] bg-[#27F293]/10 font-mono font-bold py-0.5 px-2 rounded-full select-none cursor-help"
        >
          {badgeText}
        </Badge>
      </div>
    </Tooltip>
  );
}
export { DemoLabel as DemoBadge };
