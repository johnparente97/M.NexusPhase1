import React from 'react';
import { Link } from 'react-router-dom';
import { WorkflowRun } from '@meridian-nexus/shared-types';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Clock, PlayCircle, AlertTriangle, CheckCircle2, Circle } from 'lucide-react';
import { formatDate } from '../../utils/format';

export interface ActivityListProps {
  runs?: WorkflowRun[];
  limit?: number;
}

export const ActivityList: React.FC<ActivityListProps> = ({ runs = [], limit }) => {
  const displayRuns = limit ? runs.slice(0, limit) : runs;

  const statusIcons = {
    pending: <Circle className="h-4 w-4 text-zinc-500 shrink-0" />,
    running: <Clock className="h-4 w-4 text-emerald-400 shrink-0 animate-pulse" />,
    completed: <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />,
    failed: <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />,
    cancelled: <Circle className="h-4 w-4 text-zinc-600 shrink-0" />,
  };

  const statusBadges = {
    pending: <Badge variant="default">Pending</Badge>,
    running: <Badge variant="info">Running</Badge>,
    completed: <Badge variant="success">Completed</Badge>,
    failed: <Badge variant="error">Failed</Badge>,
    cancelled: <Badge variant="default">Cancelled</Badge>,
  };

  if (displayRuns.length === 0) {
    return (
      <div className="text-xs text-zinc-500 py-6 text-center italic border border-dashed border-zinc-800 rounded-xl">
        No execution run records found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {displayRuns.map((run) => (
        <Link key={run.id} to={`/activity/${run.id}`} className="block">
          <Card hover className="p-4 bg-zinc-900 border-zinc-800 hover:border-zinc-700 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-[70%]">
              {statusIcons[run.status]}
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-xs font-semibold text-zinc-200 truncate leading-tight">
                  {run.workflow?.name || 'Workflow Run'}
                </span>
                <span className="text-[10px] text-zinc-500 flex items-center gap-1.5 font-medium">
                  Run ID: <span className="font-mono text-zinc-400">{run.id.substring(0, 8)}</span>
                  <span>•</span>
                  <span>{formatDate(run.createdAt)}</span>
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {statusBadges[run.status]}
              <PlayCircle className="h-4.5 w-4.5 text-zinc-600 hover:text-zinc-300" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};
export default ActivityList;
