import React from 'react';
import { Card } from '../ui/Card';
import ResultSection from './ResultSection';
import ExportActions from './ExportActions';
import { WorkflowResult } from '@meridian-nexus/shared-types';
import { Sparkles, HelpCircle, Award } from 'lucide-react';
import DemoLabel from '../common/DemoLabel';

export interface ResultRendererProps {
  result: WorkflowResult;
  workflowName: string;
}

export const ResultRenderer: React.FC<ResultRendererProps> = ({ result, workflowName }) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* Top Banner Control Actions */}
      <Card padding="none" className="p-4 bg-zinc-900 border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
          <span className="text-xs font-semibold text-zinc-300">
            Model: <span className="text-zinc-100 font-bold">{result.metadata.modelId}</span>
          </span>
          {result.metadata.isFallback && (
            <Badge variant="warning" className="text-[8px]">Fallback</Badge>
          )}
        </div>
        <ExportActions result={result} workflowName={workflowName} />
      </Card>

      {/* Structured Sections list */}
      <div className="flex flex-col gap-6">
        {result.sections.map((sec) => (
          <Card key={sec.key} className="bg-zinc-900 border-zinc-800 p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 select-none">
              <h3 className="font-semibold text-sm text-zinc-100 tracking-tight">{sec.label}</h3>
              <DemoLabel />
            </div>
            
            <div className="text-xs leading-relaxed text-zinc-300">
              <ResultSection section={sec} />
            </div>
          </Card>
        ))}
      </div>

    </div>
  );
};
import { Badge } from '../ui/Badge';
export default ResultRenderer;
