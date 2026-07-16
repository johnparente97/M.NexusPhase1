import React from 'react';
import { Button } from '../ui/Button';
import { Copy, FileDown, FileJson, Check } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { ExportService } from '../../services/export-service';
import { WorkflowResult } from '@meridian-nexus/shared-types';

export interface ExportActionsProps {
  result: WorkflowResult;
  workflowName: string;
}

export const ExportActions: React.FC<ExportActionsProps> = ({ result, workflowName }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);

  // Parse sections to basic text representation for copy
  const getRawText = () => {
    let text = `${workflowName} Run Output\n\n`;
    for (const sec of result.sections) {
      text += `=== ${sec.label} ===\n`;
      if (typeof sec.content === 'object') {
        text += JSON.stringify(sec.content, null, 2);
      } else {
        text += String(sec.content);
      }
      text += '\n\n';
    }
    return text;
  };

  const handleCopy = async () => {
    const success = await ExportService.copyToClipboard(getRawText());
    if (success) {
      setCopied(true);
      toast('Copied full result to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast('Copy failed. Please select manually.', 'error');
    }
  };

  const handleDownloadMarkdown = () => {
    // Generate basic markdown manually on client
    let md = `# ${workflowName} Run Report\n\n`;
    for (const sec of result.sections) {
      md += `## ${sec.label}\n\n`;
      if (sec.type === 'list') {
        const items = sec.content as string[];
        for (const item of items) md += `- ${item}\n`;
        md += '\n';
      } else if (sec.type === 'table') {
        const t = sec.content as any;
        if (t.headers && t.rows) {
          md += `| ${t.headers.join(' | ')} |\n`;
          md += `| ${t.headers.map(() => '---').join(' | ')} |\n`;
          for (const r of t.rows) md += `| ${r.join(' | ')} |\n`;
          md += '\n';
        }
      } else {
        md += `${String(sec.content)}\n\n`;
      }
    }
    ExportService.downloadMarkdown(md, result.runId);
    toast('Downloaded report as Markdown!', 'success');
  };

  const handleDownloadJson = () => {
    ExportService.downloadJson(result);
    toast('Downloaded report logs as JSON!', 'success');
  };

  return (
    <div className="flex items-center gap-1.5 shrink-0 select-none">
      <Button variant="ghost" size="sm" onClick={handleCopy} className="text-zinc-400 hover:text-zinc-200">
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
        Copy Output
      </Button>

      <Button variant="ghost" size="sm" onClick={handleDownloadMarkdown} className="text-zinc-400 hover:text-zinc-200">
        <FileDown className="h-3.5 w-3.5" />
        Markdown
      </Button>

      <Button variant="ghost" size="sm" onClick={handleDownloadJson} className="text-zinc-400 hover:text-zinc-200">
        <FileJson className="h-3.5 w-3.5" />
        JSON
      </Button>
    </div>
  );
};
export default ExportActions;
