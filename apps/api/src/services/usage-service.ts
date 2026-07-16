import { D1Database } from '@cloudflare/workers-types';
import { UsageMetrics } from '@meridian-nexus/shared-types';
import { QuotaError } from '../utils/errors';
import { SECURITY_LIMITS } from '../security/limits';

export class UsageService {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async checkUserLimits(userId: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0]!;
    
    const usage = await this.db.prepare(`
      SELECT total_runs FROM usage_metrics 
      WHERE user_id = ?1 AND date = ?2
    `).bind(userId, today).first<{ total_runs: number }>();

    const runsToday = usage?.total_runs ?? 0;

    if (runsToday >= SECURITY_LIMITS.MAX_FREE_RUNS_PER_USER_PER_DAY) {
      throw new QuotaError(`Daily run quota exceeded. You have reached the limit of ${SECURITY_LIMITS.MAX_FREE_RUNS_PER_USER_PER_DAY} free runs per day.`);
    }
  }

  async incrementUsage(userId: string, isFree: boolean, amount: number): Promise<void> {
    const today = new Date().toISOString().split('T')[0]!;
    const id = `${userId}:${today}`;

    const query = `
      INSERT INTO usage_metrics (id, user_id, date, total_runs, free_runs, paid_runs, total_spent, ai_requests)
      VALUES (?1, ?2, ?3, 1, ?4, ?5, ?6, 1)
      ON CONFLICT(user_id, date) DO UPDATE SET
        total_runs = total_runs + 1,
        free_runs = free_runs + ?4,
        paid_runs = paid_runs + ?5,
        total_spent = total_spent + ?6,
        ai_requests = ai_requests + 1;
    `;

    const freeVal = isFree ? 1 : 0;
    const paidVal = isFree ? 0 : 1;

    await this.db.prepare(query)
      .bind(id, userId, today, freeVal, paidVal, amount)
      .run();
  }

  async getUsageMetrics(userId: string): Promise<UsageMetrics> {
    const row = await this.db.prepare(`
      SELECT 
        SUM(total_runs) as runs,
        SUM(free_runs) as free,
        SUM(paid_runs) as paid,
        SUM(total_spent) as spent
      FROM usage_metrics
      WHERE user_id = ?1
    `).bind(userId).first<any>();

    const favs = await this.db.prepare(`
      SELECT COUNT(*) as count FROM favorites WHERE user_id = ?1
    `).bind(userId).first<{ count: number }>();

    const reviews = await this.db.prepare(`
      SELECT COUNT(*) as count FROM reviews WHERE user_id = ?1
    `).bind(userId).first<{ count: number }>();

    return {
      totalRuns: row?.runs ?? 0,
      freeRuns: row?.free ?? 0,
      paidRuns: row?.paid ?? 0,
      totalSpent: parseFloat((row?.spent ?? 0).toFixed(2)),
      savedWorkflows: favs?.count ?? 0,
      reviewsWritten: reviews?.count ?? 0,
    };
  }
}
