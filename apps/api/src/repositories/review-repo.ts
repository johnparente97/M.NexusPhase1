import { D1Database } from '@cloudflare/workers-types';
import { Review } from '@meridian-nexus/shared-types';
import { ReviewRepository } from './interfaces';
import { generateId } from '../utils/id';
import { getIsoTimestamp } from '../utils/time';

export class D1ReviewRepository implements ReviewRepository {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async create(review: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<Review> {
    const id = generateId('rev');
    const now = getIsoTimestamp();

    await this.db.prepare(`
      INSERT INTO reviews (id, workflow_id, user_id, run_id, rating, comment, helpful_count, created_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0, ?7, ?8)
    `).bind(
      id,
      review.workflowId,
      review.userId,
      review.runId,
      review.rating,
      review.comment ?? null,
      now,
      now
    ).run();

    // Update Workflow Aggregated Rating and Review Count
    const avgStats = await this.getAverageRating(review.workflowId);
    await this.db.prepare(`
      UPDATE workflows 
      SET average_rating = ?1, review_count = ?2
      WHERE id = ?3
    `).bind(avgStats.averageRating, avgStats.count, review.workflowId).run();

    // Update Creator Aggregated Rating
    const creatorStats = await this.db.prepare(`
      SELECT AVG(average_rating) as avg_rating
      FROM workflows
      WHERE creator_id = (SELECT creator_id FROM workflows WHERE id = ?1) AND status = 'published'
    `).bind(review.workflowId).first<{ avg_rating: number }>();

    if (creatorStats) {
      await this.db.prepare(`
        UPDATE creator_profiles
        SET average_rating = ?1
        WHERE id = (SELECT creator_id FROM workflows WHERE id = ?2)
      `).bind(creatorStats.avg_rating ?? 0, review.workflowId).run();
    }

    return {
      id,
      ...review,
      helpfulCount: 0,
      createdAt: now,
      updatedAt: now,
    };
  }

  async listByWorkflowId(workflowId: string): Promise<Review[]> {
    const query = `
      SELECT r.*, u.display_name as user_display_name, u.avatar_url as user_avatar_url
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.workflow_id = ?1
      ORDER BY r.created_at DESC
    `;

    const { results } = await this.db.prepare(query).bind(workflowId).all<any>();

    return results.map((row) => ({
      id: row.id,
      workflowId: row.workflow_id,
      userId: row.user_id,
      runId: row.run_id,
      rating: row.rating,
      comment: row.comment,
      helpfulCount: row.helpful_count,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      user: {
        id: row.user_id,
        displayName: row.user_display_name,
        avatarUrl: row.user_avatar_url,
      },
    }));
  }

  async getAverageRating(workflowId: string): Promise<{ averageRating: number; count: number }> {
    const row = await this.db.prepare(`
      SELECT AVG(rating) as avg_rating, COUNT(*) as count 
      FROM reviews 
      WHERE workflow_id = ?1
    `).bind(workflowId).first<any>();

    return {
      averageRating: row?.avg_rating ? parseFloat(row.avg_rating.toFixed(1)) : 0,
      count: row?.count ?? 0,
    };
  }
}
