import { D1Database } from '@cloudflare/workers-types';
import { Workflow } from '@meridian-nexus/shared-types';
import { FavoriteRepository } from './interfaces';
import { generateId } from '../utils/id';
import { getIsoTimestamp } from '../utils/time';

export class D1FavoriteRepository implements FavoriteRepository {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async toggle(userId: string, workflowId: string): Promise<{ favorited: boolean }> {
    const isFav = await this.isFavorited(userId, workflowId);
    const now = getIsoTimestamp();

    if (isFav) {
      // Remove Favorite
      await this.db.prepare('DELETE FROM favorites WHERE user_id = ?1 AND workflow_id = ?2')
        .bind(userId, workflowId)
        .run();

      // Decrement counter
      await this.db.prepare('UPDATE workflows SET saved_count = MAX(0, saved_count - 1) WHERE id = ?1')
        .bind(workflowId)
        .run();

      return { favorited: false };
    }

    // Add Favorite
    const id = generateId('fav');
    await this.db.prepare('INSERT INTO favorites (id, user_id, workflow_id, created_at) VALUES (?1, ?2, ?3, ?4)')
      .bind(id, userId, workflowId, now)
      .run();

    // Increment counter
    await this.db.prepare('UPDATE workflows SET saved_count = saved_count + 1 WHERE id = ?1')
      .bind(workflowId)
      .run();

    return { favorited: true };
  }

  async isFavorited(userId: string, workflowId: string): Promise<boolean> {
    const row = await this.db.prepare('SELECT 1 FROM favorites WHERE user_id = ?1 AND workflow_id = ?2')
      .bind(userId, workflowId)
      .first<any>();

    return !!row;
  }

  async listUserFavorites(userId: string): Promise<Workflow[]> {
    const query = `
      SELECT 
        w.*,
        c.display_name as creator_display_name,
        c.avatar_url as creator_avatar_url,
        c.verified as creator_verified,
        c.verification_label as creator_verification_label
      FROM favorites f
      JOIN workflows w ON f.workflow_id = w.id
      JOIN creator_profiles c ON w.creator_id = c.id
      WHERE f.user_id = ?1 AND w.deleted_at IS NULL
      ORDER BY f.created_at DESC
    `;

    const { results } = await this.db.prepare(query).bind(userId).all<any>();

    return results.map((row) => ({
      id: row.id,
      creatorId: row.creator_id,
      currentVersionId: row.current_version_id,
      name: row.name,
      slug: row.slug,
      shortDescription: row.short_description,
      fullDescription: row.full_description,
      outcomeStatement: row.outcome_statement,
      category: row.category,
      tags: row.tags ? JSON.parse(row.tags) : [],
      status: row.status,
      visibility: row.visibility,
      isFree: row.is_free === 1,
      pricePerRun: row.price_per_run,
      estimatedDurationSeconds: row.estimated_duration_seconds,
      thumbnailUrl: row.thumbnail_url,
      totalRuns: row.total_runs,
      completedRuns: row.completed_runs,
      averageRating: row.average_rating,
      reviewCount: row.review_count,
      savedCount: row.saved_count,
      dataHandlingSummary: row.data_handling_summary,
      refundPolicy: row.refund_policy,
      verified: row.verified === 1,
      verificationLabel: row.verification_label,
      featuredOrder: row.featured_order,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
      creator: {
        id: row.creator_id,
        userId: '',
        displayName: row.creator_display_name,
        bio: null,
        avatarUrl: row.creator_avatar_url,
        website: null,
        verified: row.creator_verified === 1,
        verificationLabel: row.creator_verification_label,
        publishedWorkflowCount: 0,
        totalRuns: 0,
        averageRating: 0,
        createdAt: '',
        updatedAt: '',
      },
    }));
  }
}
