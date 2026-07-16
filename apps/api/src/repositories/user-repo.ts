import { D1Database } from '@cloudflare/workers-types';
import { User, UserProfile, CreatorProfile } from '@meridian-nexus/shared-types';
import { UserRepository } from './interfaces';
import { generateId } from '../utils/id';
import { getIsoTimestamp } from '../utils/time';
import { NotFoundError } from '../utils/errors';

export class D1UserRepository implements UserRepository {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async getById(id: string): Promise<User | null> {
    const row = await this.db.prepare('SELECT * FROM users WHERE id = ?1')
      .bind(id)
      .first<any>();

    if (!row) return null;
    return this.mapRowToUser(row);
  }

  async getByClerkId(clerkId: string): Promise<User | null> {
    const row = await this.db.prepare('SELECT * FROM users WHERE clerk_id = ?1')
      .bind(clerkId)
      .first<any>();

    if (!row) return null;
    return this.mapRowToUser(row);
  }

  async createOrUpdateFromClerk(user: {
    clerkId: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
  }): Promise<User> {
    const existing = await this.getByClerkId(user.clerkId);
    const now = getIsoTimestamp();

    if (existing) {
      // Update User
      await this.db.prepare(`
        UPDATE users 
        SET email = ?1, display_name = ?2, avatar_url = ?3, updated_at = ?4
        WHERE clerk_id = ?5
      `).bind(user.email, user.displayName, user.avatarUrl ?? null, now, user.clerkId).run();

      return (await this.getByClerkId(user.clerkId))!;
    }

    // Create User
    const id = generateId('usr');
    await this.db.prepare(`
      INSERT INTO users (id, clerk_id, email, display_name, avatar_url, role, created_at, updated_at)
      VALUES (?1, ?2, ?3, ?4, ?5, 'user', ?6, ?7)
    `).bind(id, user.clerkId, user.email, user.displayName, user.avatarUrl ?? null, now, now).run();

    // Create User Profile Defaults
    const profileId = generateId('prof');
    await this.db.prepare(`
      INSERT INTO user_profiles (id, user_id, theme, notifications_enabled, created_at, updated_at)
      VALUES (?1, ?2, 'dark', 1, ?3, ?4)
    `).bind(profileId, id, now, now).run();

    return (await this.getById(id))!;
  }

  async updateProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    const existing = await this.getProfile(userId);
    const now = getIsoTimestamp();

    if (!existing) {
      const profileId = generateId('prof');
      await this.db.prepare(`
        INSERT INTO user_profiles (
          id, user_id, bio, company, website, location, theme,
          notifications_enabled, created_at, updated_at
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)
      `).bind(
        profileId,
        userId,
        profile.bio ?? null,
        profile.company ?? null,
        profile.website ?? null,
        profile.location ?? null,
        profile.theme ?? 'dark',
        profile.notificationsEnabled ? 1 : 0,
        now,
        now
      ).run();

      return (await this.getProfile(userId))!;
    }

    const updates: string[] = ['updated_at = ?1'];
    const bindings: any[] = [now];
    let bindIdx = 2;

    if (profile.bio !== undefined) {
      updates.push(`bio = ?${bindIdx++}`);
      bindings.push(profile.bio);
    }
    if (profile.company !== undefined) {
      updates.push(`company = ?${bindIdx++}`);
      bindings.push(profile.company);
    }
    if (profile.website !== undefined) {
      updates.push(`website = ?${bindIdx++}`);
      bindings.push(profile.website);
    }
    if (profile.location !== undefined) {
      updates.push(`location = ?${bindIdx++}`);
      bindings.push(profile.location);
    }
    if (profile.theme !== undefined) {
      updates.push(`theme = ?${bindIdx++}`);
      bindings.push(profile.theme);
    }
    if (profile.notificationsEnabled !== undefined) {
      updates.push(`notifications_enabled = ?${bindIdx++}`);
      bindings.push(profile.notificationsEnabled ? 1 : 0);
    }

    bindings.push(userId);
    const query = `UPDATE user_profiles SET ${updates.join(', ')} WHERE user_id = ?${bindIdx}`;
    await this.db.prepare(query).bind(...bindings).run();

    return (await this.getProfile(userId))!;
  }

  async getProfile(userId: string): Promise<UserProfile | null> {
    const row = await this.db.prepare('SELECT * FROM user_profiles WHERE user_id = ?1')
      .bind(userId)
      .first<any>();

    if (!row) return null;

    return {
      id: row.id,
      userId: row.user_id,
      bio: row.bio,
      company: row.company,
      website: row.website,
      location: row.location,
      theme: row.theme as any,
      notificationsEnabled: row.notifications_enabled === 1,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  async getCreatorProfile(userId: string): Promise<CreatorProfile | null> {
    const row = await this.db.prepare('SELECT * FROM creator_profiles WHERE user_id = ?1')
      .bind(userId)
      .first<any>();

    if (!row) return null;

    return this.mapRowToCreator(row);
  }

  async createCreatorProfile(
    userId: string,
    profile: { displayName: string; bio?: string; website?: string }
  ): Promise<CreatorProfile> {
    const existing = await this.getCreatorProfile(userId);
    if (existing) return existing;

    const creatorId = generateId('crt');
    const now = getIsoTimestamp();

    await this.db.prepare(`
      INSERT INTO creator_profiles (
        id, user_id, display_name, bio, website, verified,
        verification_label, published_workflow_count, total_runs,
        average_rating, created_at, updated_at
      ) VALUES (?1, ?2, ?3, ?4, ?5, 0, 'Creator verification pending', 0, 0, 0, ?6, ?7)
    `).bind(
      creatorId,
      userId,
      profile.displayName,
      profile.bio ?? null,
      profile.website ?? null,
      now,
      now
    ).run();

    // Promote User Role to Creator
    await this.db.prepare("UPDATE users SET role = 'creator', updated_at = ?1 WHERE id = ?2")
      .bind(now, userId)
      .run();

    return (await this.getCreatorProfile(userId))!;
  }

  // ── Helper Mappers ──

  private mapRowToUser(row: any): User {
    return {
      id: row.id,
      clerkId: row.clerk_id,
      email: row.email,
      displayName: row.display_name,
      avatarUrl: row.avatar_url,
      role: row.role as any,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToCreator(row: any): CreatorProfile {
    return {
      id: row.id,
      userId: row.user_id,
      displayName: row.display_name,
      bio: row.bio,
      avatarUrl: row.avatar_url,
      website: row.website,
      verified: row.verified === 1,
      verificationLabel: row.verification_label,
      publishedWorkflowCount: row.published_workflow_count,
      totalRuns: row.total_runs,
      averageRating: row.average_rating,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
