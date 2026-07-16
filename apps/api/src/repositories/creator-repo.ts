import { D1Database } from '@cloudflare/workers-types';
import { CreatorMetrics } from '@meridian-nexus/shared-types';
import { CreatorRepository } from './interfaces';

export class D1CreatorRepository implements CreatorRepository {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async getMetrics(creatorId: string): Promise<CreatorMetrics> {
    // 1. Get counts
    const counts = await this.db.prepare(`
      SELECT 
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_count,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_count,
        SUM(total_runs) as runs_count,
        SUM(completed_runs) as completed_runs_count,
        SUM(saved_count) as total_saves,
        SUM(review_count) as total_reviews,
        AVG(average_rating) as avg_rating
      FROM workflows
      WHERE creator_id = ?1 AND deleted_at IS NULL
    `).bind(creatorId).first<any>();

    // 2. Get popular workflow
    const popular = await this.db.prepare(`
      SELECT id, name, total_runs
      FROM workflows
      WHERE creator_id = ?1 AND deleted_at IS NULL AND status = 'published'
      ORDER BY total_runs DESC
      LIMIT 1
    `).bind(creatorId).first<any>();

    // Calculate simulated gross volume and earnings
    const runsCount = counts?.runs_count ?? 0;
    const grossVolume = parseFloat((runsCount * 4.99).toFixed(2)); // Simulated average run price
    const estimatedEarnings = parseFloat((grossVolume * 0.8).toFixed(2)); // 80% creator cut

    return {
      publishedWorkflows: counts?.published_count ?? 0,
      draftWorkflows: counts?.draft_count ?? 0,
      totalRuns: runsCount,
      completedRuns: counts?.completed_runs_count ?? 0,
      completionRate: runsCount > 0 ? parseFloat(((counts?.completed_runs_count ?? 0) / runsCount * 100).toFixed(1)) : 100,
      grossVolume,
      estimatedEarnings,
      averageRating: counts?.avg_rating ? parseFloat(counts.avg_rating.toFixed(1)) : 0,
      reviewCount: counts?.total_reviews ?? 0,
      savedCount: counts?.total_saves ?? 0,
      repeatUserRate: 15.4, // Canned demo metrics
      mostPopularWorkflow: popular ? {
        id: popular.id,
        name: popular.name,
        totalRuns: popular.total_runs,
      } : null,
    };
  }

  async getAnalyticsChart(creatorId: string, days: number = 30): Promise<Array<{ date: string; runs: number; revenue: number }>> {
    // Generate dates representing the last N days
    const result: Array<{ date: string; runs: number; revenue: number }> = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0]!;

      // Canned realistic random curve mapped by days
      const randSeed = (i % 7) + 1;
      const runs = Math.floor(Math.random() * 25) + randSeed * 4 + 5;
      const revenue = parseFloat((runs * 3.99).toFixed(2));

      result.push({
        date: dateStr,
        runs,
        revenue,
      });
    }

    return result;
  }
}
