export function stripHtml(text: string): string {
  if (!text) return '';
  return text.replace(/<[^>]*>/g, '');
}

export function sanitizeText(text: string): string {
  if (!text) return '';
  return stripHtml(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
