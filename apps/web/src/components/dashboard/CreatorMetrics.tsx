import React from 'react';
import StatsCard from './StatsCard';
import { CreatorMetrics as MetricsType } from '@meridian-nexus/shared-types';
import { DollarSign, Award, Users, CheckCircle, BarChart3 } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/format';

export interface CreatorMetricsProps {
  metrics: MetricsType;
}

export const CreatorMetrics: React.FC<CreatorMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <StatsCard
        icon={DollarSign}
        title="Gross Volume"
        value={formatCurrency(metrics.grossVolume)}
        description="Simulated checkout value"
        trend={{ value: 12.4, direction: 'up' }}
      />
      <StatsCard
        icon={Award}
        title="Estimated Earnings"
        value={formatCurrency(metrics.estimatedEarnings)}
        description="80% creator payout cut"
        trend={{ value: 11.2, direction: 'up' }}
      />
      <StatsCard
        icon={Users}
        title="Total Execution Runs"
        value={formatNumber(metrics.totalRuns)}
        description="Platform usage counts"
        trend={{ value: 8.5, direction: 'up' }}
      />
      <StatsCard
        icon={CheckCircle}
        title="Run Completion Rate"
        value={`${metrics.completionRate}%`}
        description="Success validation rating"
      />
    </div>
  );
};
export default CreatorMetrics;
