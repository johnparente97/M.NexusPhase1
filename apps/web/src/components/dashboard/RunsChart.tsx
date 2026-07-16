import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '../ui/Card';

export interface RunsChartProps {
  data?: Array<{ date: string; runs: number; revenue: number }>;
  height?: number;
}

export const RunsChart: React.FC<RunsChartProps> = ({ data = [], height = 240 }) => {
  return (
    <Card className="p-4 bg-zinc-900 border-zinc-800 w-full select-none">
      <div className="flex flex-col gap-1 mb-4">
        <h4 className="text-xs font-semibold text-zinc-300">Execution Frequency</h4>
        <p className="text-[10px] text-zinc-500">Daily system runs coordinates</p>
      </div>

      <div style={{ width: '100%', height }}>
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-zinc-500 italic">No chart data points available.</div>
        ) : (
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis
                dataKey="date"
                stroke="#52525b"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                dy={8}
              />
              <YAxis
                stroke="#52525b"
                fontSize={9}
                tickLine={false}
                axisLine={false}
                dx={-4}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: '#27272a',
                  borderRadius: '8px',
                  fontSize: '11px',
                  color: '#f4f4f5',
                }}
              />
              <Area
                type="monotone"
                dataKey="runs"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#chartGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};
export default RunsChart;
