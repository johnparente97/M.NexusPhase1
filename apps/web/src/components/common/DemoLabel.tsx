import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';

export default function DemoLabel() {
  return (
    <Tooltip content="All actions are simulated for Phase 1 MVP evaluation.">
      <div>
        <Badge variant="outline" className="text-[8px] border-indigo-500/20 text-indigo-400 bg-indigo-500/5 normal-case font-bold py-0.5 px-1.5 rounded-full select-none cursor-help">
          Demonstration Mode
        </Badge>
      </div>
    </Tooltip>
  );
}
export { DemoLabel as DemoBadge };
