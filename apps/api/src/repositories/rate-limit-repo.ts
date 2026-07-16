import { D1Database } from '@cloudflare/workers-types';

export class D1RateLimitRepository {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async increment(key: string, windowStart: string): Promise<number> {
    const id = `${key}:${windowStart}`;
    const query = `
      INSERT INTO rate_limit_counters (id, key, window_start, count)
      VALUES (?1, ?2, ?3, 1)
      ON CONFLICT(key, window_start) DO UPDATE SET count = count + 1
      RETURNING count;
    `;

    const result = await this.db.prepare(query)
      .bind(id, key, windowStart)
      .first<{ count: number }>();

    return result?.count ?? 1;
  }
}
