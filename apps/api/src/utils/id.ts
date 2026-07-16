export function generateId(prefix: string): string {
  const uuid = crypto.randomUUID();
  return `${prefix}_${uuid.replace(/-/g, '')}`;
}
