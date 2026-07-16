import { WorkflowResult } from '@meridian-nexus/shared-types';

export class ExportService {
  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  static downloadFile(content: string, filename: string, contentType: string) {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  static downloadMarkdown(mdContent: string, runId: string) {
    this.downloadFile(mdContent, `nexus-run-${runId}.md`, 'text/markdown;charset=utf-8;');
  }

  static downloadJson(result: WorkflowResult) {
    const jsonStr = JSON.stringify(result, null, 2);
    this.downloadFile(jsonStr, `nexus-result-${result.runId}.json`, 'application/json;charset=utf-8;');
  }
}
