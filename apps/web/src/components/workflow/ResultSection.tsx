import React from 'react';
import { ResultSection as SectionType } from '@meridian-nexus/shared-types';
import { CheckCircle2, AlertTriangle, Play } from 'lucide-react';

export interface ResultSectionProps {
  section: SectionType;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ section }) => {
  const { type, content } = section;

  if (type === 'paragraph') {
    return <p className="text-zinc-300 whitespace-pre-wrap leading-relaxed">{String(content)}</p>;
  }

  if (type === 'list') {
    const items = content as string[];
    return (
      <ul className="list-disc pl-5 flex flex-col gap-2 text-zinc-300">
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (type === 'metrics') {
    const items = content as Array<{ metric: string; target: string; status: string }>;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {items.map((item, idx) => (
          <div key={idx} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col gap-1.5 shadow-sm">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">{item.metric}</span>
            <div className="flex items-baseline justify-between gap-2 mt-1">
              <span className="text-base font-bold text-zinc-100">{item.target}</span>
              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    const table = content as { headers: string[]; rows: string[][] };
    if (!table.headers || !table.rows) return null;
    return (
      <div className="overflow-x-auto border border-zinc-800 rounded-xl w-full">
        <table className="min-w-full divide-y divide-zinc-800 text-left text-xs text-zinc-300">
          <thead className="bg-zinc-950 text-zinc-400 select-none">
            <tr>
              {table.headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3 font-semibold tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 bg-zinc-900/30">
            {table.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-zinc-900/50 transition-colors">
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 whitespace-nowrap leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === 'risks') {
    const risks = content as Array<{ risk: string; impact: string; mitigation: string }>;
    return (
      <div className="flex flex-col gap-3 w-full">
        {risks.map((r, idx) => (
          <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-4 border border-rose-950/20 bg-rose-950/5 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-rose-400 shrink-0 font-bold">
              <AlertTriangle className="h-4 w-4 shrink-0 animate-pulse" />
              <span className="text-[10px] bg-rose-500/10 px-1.5 py-0.5 rounded uppercase">{r.impact} IMPACT</span>
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <h4 className="font-semibold text-zinc-200 text-xs">{r.risk}</h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                <span className="font-semibold text-emerald-400">Mitigation:</span> {r.mitigation}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'action-items') {
    const items = content as Array<{ item: string; priority: string }>;
    return (
      <div className="flex flex-col gap-2.5 w-full">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-zinc-950/60 border border-zinc-900 p-3 rounded-lg">
            <div className="shrink-0 h-4.5 w-4.5 rounded border border-zinc-700 flex items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors">
              <CheckCircle2 className="h-3 w-3 text-transparent hover:text-emerald-400" />
            </div>
            <span className="flex-1 text-zinc-300 leading-normal">{item.item}</span>
            <span className="text-[9px] font-bold text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded uppercase shrink-0 select-none">
              {item.priority}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'timeline') {
    const phases = content as Array<{ phase: string; tasks: string[] }>;
    return (
      <div className="flex flex-col gap-6 relative pl-6 border-l border-zinc-800 w-full ml-2 py-2">
        {phases.map((p, idx) => (
          <div key={idx} className="relative flex flex-col gap-2">
            {/* Timeline node */}
            <span className="absolute -left-[30px] top-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-900" />
            <h4 className="font-semibold text-emerald-400 text-xs tracking-tight">{p.phase}</h4>
            <div className="flex flex-col gap-1.5 pl-1.5 text-zinc-400 text-[11px]">
              {p.tasks.map((task, tIdx) => (
                <p key={tIdx} className="leading-relaxed">
                  {task}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'content-draft') {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4.5 font-mono text-[11px] text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
        {String(content)}
      </div>
    );
  }

  return <div className="text-zinc-400 leading-normal">{JSON.stringify(content, null, 2)}</div>;
};
export default ResultSection;
