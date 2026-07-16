import { WorkflowResult, ResultSection } from '@meridian-nexus/shared-types';

export class ExportService {
  static toMarkdown(result: WorkflowResult, workflowName: string): string {
    let md = `# Meridian Nexus Run Result: ${workflowName}\n`;
    md += `Run ID: \`${result.runId}\` | Date: ${new Date(result.createdAt).toLocaleString()}\n\n`;

    md += `## Metadata\n`;
    md += `- **AI Provider**: ${result.metadata.modelProvider}\n`;
    md += `- **Model ID**: ${result.metadata.modelId}\n`;
    md += `- **Fallback Execution**: ${result.metadata.isFallback ? 'Yes' : 'No'}\n`;
    if (result.metadata.fallbackReason) {
      md += `- **Fallback Reason**: ${result.metadata.fallbackReason}\n`;
    }
    md += `\n---\n\n`;

    for (const sec of result.sections) {
      md += `## ${sec.label}\n\n`;

      if (sec.type === 'paragraph') {
        md += `${sec.content}\n\n`;
      } else if (sec.type === 'list') {
        const items = sec.content as string[];
        for (const item of items) {
          md += `- ${item}\n`;
        }
        md += `\n`;
      } else if (sec.type === 'metrics') {
        const metrics = sec.content as Array<{ metric: string; target: string; status: string }>;
        md += `| Metric | Target / Value | Status |\n`;
        md += `|---|---|---|\n`;
        for (const m of metrics) {
          md += `| ${m.metric} | ${m.target} | ${m.status} |\n`;
        }
        md += `\n`;
      } else if (sec.type === 'table') {
        const table = sec.content as { headers: string[]; rows: string[][] };
        if (table.headers && table.rows) {
          md += `| ${table.headers.join(' | ')} |\n`;
          md += `| ${table.headers.map(() => '---').join(' | ')} |\n`;
          for (const row of table.rows) {
            md += `| ${row.join(' | ')} |\n`;
          }
          md += `\n`;
        }
      } else if (sec.type === 'risks') {
        const risks = sec.content as Array<{ risk: string; impact: string; mitigation: string }>;
        md += `| Risk Factors | Impact | Mitigation Strategy |\n`;
        md += `|---|---|---|\n`;
        for (const r of risks) {
          md += `| **${r.risk}** | ${r.impact} | ${r.mitigation} |\n`;
        }
        md += `\n`;
      } else if (sec.type === 'action-items') {
        const items = sec.content as Array<{ item: string; priority: string }>;
        for (const item of items) {
          md += `- [ ] **[${item.priority}]** ${item.item}\n`;
        }
        md += `\n`;
      } else if (sec.type === 'timeline') {
        const phases = sec.content as Array<{ phase: string; tasks: string[] }>;
        for (const p of phases) {
          md += `### ${p.phase}\n`;
          for (const task of p.tasks) {
            md += `- ${task}\n`;
          }
          md += `\n`;
        }
      } else if (sec.type === 'content-draft') {
        md += `\`\`\`markdown\n${sec.content}\n\`\`\`\n\n`;
      } else {
        md += `${JSON.stringify(sec.content, null, 2)}\n\n`;
      }
    }

    md += `\n---\n*Disclaimer: Generated on the Meridian Nexus phase 1 platform. All data is for demonstration and trial purposes.*`;
    return md;
  }

  static toJson(result: WorkflowResult): string {
    return JSON.stringify(result, null, 2);
  }
}
