import { Hono } from 'hono';
import { AppEnv } from '../types';
import { ValidationError, AuthError } from '../utils/errors';
import { verifyMessage } from 'viem';
import { requireAuth } from '../middleware/auth';

const app = new Hono<AppEnv>();

// GET /api/auth/web3/nonce
app.get('/nonce', async (c) => {
  if (c.env.ENVIRONMENT === 'production') {
    throw new AuthError('Demo authentication is disabled in production environments.');
  }
  const nonce = crypto.randomUUID().replace(/-/g, '').substring(0, 16);
  const expiresAt = Date.now() + 300 * 1000; // 5 mins expiry

  await c.env.DB.prepare(
    'INSERT INTO web3_nonces (nonce, expires_at) VALUES (?, ?)'
  )
    .bind(nonce, expiresAt)
    .run();

  return c.json({
    success: true,
    data: { nonce }
  });
});

// POST /api/auth/web3/verify (SIWE Demo Login)
app.post('/verify', async (c) => {
  if (c.env.ENVIRONMENT === 'production') {
    throw new AuthError('Demo authentication is disabled in production environments.');
  }
  const { address, message, signature } = await c.req.json<{
    address: string;
    message: string;
    signature: string;
  }>();

  if (!address || !message || !signature) {
    throw new ValidationError('Missing address, message, or signature parameter.');
  }

  // Extract nonce from SIWE message
  const nonceMatch = message.match(/Nonce:\s*([a-fA-F0-9]+)/);
  if (!nonceMatch || !nonceMatch[1]) {
    throw new ValidationError('Could not extract nonce from message structure.');
  }
  const nonce = nonceMatch[1];

  // Verify nonce exists and is not expired
  const now = Date.now();
  const dbNonce = await c.env.DB.prepare(
    'SELECT * FROM web3_nonces WHERE nonce = ? AND expires_at > ?'
  )
    .bind(nonce, now)
    .first<{ nonce: string }>();

  if (!dbNonce) {
    throw new AuthError('Authentication nonce is invalid or expired. Please request a new signature.');
  }

  // Delete nonce to prevent replay attacks
  await c.env.DB.prepare('DELETE FROM web3_nonces WHERE nonce = ?')
    .bind(nonce)
    .run();

  // Verify personal_sign signature using viem
  let isValid = false;
  try {
    isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });
  } catch (err: any) {
    console.error('Signature verification error:', err);
    throw new AuthError('Failed to verify cryptographic signature: ' + err.message);
  }

  if (!isValid) {
    throw new AuthError('Cryptographic signature verification failed.');
  }

  // Create or retrieve user
  const walletId = address.toLowerCase();
  const clerkId = `wallet_${walletId}`;
  const userId = `usr-${walletId}`;

  // Check if user exists
  let user = await c.env.DB.prepare(
    'SELECT id, display_name as displayName, role FROM users WHERE clerk_id = ?'
  )
    .bind(clerkId)
    .first<{ id: string; displayName: string; role: string }>();

  if (!user) {
    // Auto-create user profile
    const displayName = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    const email = `${walletId}@meridian.finance`;

    // Insert user
    await c.env.DB.prepare(
      'INSERT INTO users (id, clerk_id, email, display_name, role) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(userId, clerkId, email, displayName, 'user')
      .run();

    // Insert profile
    await c.env.DB.prepare(
      'INSERT INTO user_profiles (id, user_id, bio, theme) VALUES (?, ?, ?, ?)'
    )
      .bind(crypto.randomUUID(), userId, `Web3 Wallet Operator: ${address}`, 'dark')
      .run();

    // Auto-link this wallet address since they logged in directly via SIWE in demo mode
    await c.env.DB.prepare(
      'INSERT OR IGNORE INTO linked_wallets (id, user_id, wallet_address, verified_at) VALUES (?, ?, ?, ?)'
    )
      .bind(crypto.randomUUID(), userId, walletId, new Date().toISOString())
      .run();

    user = { id: userId, displayName, role: 'user' };
  }

  // Generate bearer session token
  const token = `demo_user_${walletId}`;

  return c.json({
    success: true,
    data: {
      token,
      user: {
        id: user.id,
        displayName: user.displayName,
        role: user.role,
        walletAddress: address,
      }
    }
  });
});

// POST /api/auth/web3/challenge (Request wallet-linking challenge)
app.post('/challenge', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  const { walletAddress } = await c.req.json<{ walletAddress: string }>();

  if (!walletAddress) {
    throw new ValidationError('Missing walletAddress parameter.');
  }

  const walletLower = walletAddress.toLowerCase();
  const challengeId = `chg_${crypto.randomUUID()}`;
  const nonce = crypto.randomUUID().replace(/-/g, '').substring(0, 16);
  const now = new Date();
  
  const challengeMessage = `Link your wallet to Meridian Nexus:\n\n` +
    `Wallet: ${walletLower}\n` +
    `User ID: ${authUser.id}\n` +
    `Nonce: ${nonce}\n` +
    `Issued At: ${now.toISOString()}\n` +
    `URI: https://mrdn.finance`;

  const expiresAt = Date.now() + 300 * 1000; // 5 mins expiry

  await c.env.DB.prepare(
    'INSERT INTO wallet_challenges (id, challenge, wallet_address, expires_at) VALUES (?, ?, ?, ?)'
  )
    .bind(challengeId, challengeMessage, walletLower, expiresAt)
    .run();

  return c.json({
    success: true,
    data: {
      challengeId,
      challenge: challengeMessage,
    },
  });
});

// POST /api/auth/web3/link (Verify challenge signature & link wallet to Clerk user)
app.post('/link', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  const { challengeId, signature, walletAddress } = await c.req.json<{
    challengeId: string;
    signature: string;
    walletAddress: string;
  }>();

  if (!challengeId || !signature || !walletAddress) {
    throw new ValidationError('Missing challengeId, signature, or walletAddress parameter.');
  }

  const walletLower = walletAddress.toLowerCase();
  const now = Date.now();

  // Load challenge from database
  const challengeRecord = await c.env.DB.prepare(
    'SELECT * FROM wallet_challenges WHERE id = ? AND expires_at > ?'
  )
    .bind(challengeId, now)
    .first<{ challenge: string; wallet_address: string }>();

  if (!challengeRecord) {
    throw new AuthError('The wallet linking challenge is invalid or has expired.');
  }

  // Delete challenge immediately to prevent replays
  await c.env.DB.prepare('DELETE FROM wallet_challenges WHERE id = ?')
    .bind(challengeId)
    .run();

  // Verify signature cryptographically using viem
  let isValid = false;
  try {
    isValid = await verifyMessage({
      address: walletLower as `0x${string}`,
      message: challengeRecord.challenge,
      signature: signature as `0x${string}`,
    });
  } catch (err: any) {
    console.error('SIWE link challenge signature validation error:', err);
    throw new AuthError('Failed to verify linking signature: ' + err.message);
  }

  if (!isValid) {
    throw new AuthError('Cryptographic signature verification failed.');
  }

  // Check if wallet is already linked to another user profile
  const linkedRecord = await c.env.DB.prepare(
    'SELECT user_id FROM linked_wallets WHERE wallet_address = ?'
  )
    .bind(walletLower)
    .first<{ user_id: string }>();

  if (linkedRecord) {
    if (linkedRecord.user_id === authUser.id) {
      return c.json({
        success: true,
        data: {
          message: 'Wallet is already linked to this profile.',
          walletAddress: walletLower,
        },
      });
    }
    throw new ValidationError('This wallet is already linked to another user account.');
  }

  // Insert linked wallet mapping
  const linkId = `link_${crypto.randomUUID()}`;
  await c.env.DB.prepare(
    'INSERT INTO linked_wallets (id, user_id, wallet_address, verified_at) VALUES (?, ?, ?, ?)'
  )
    .bind(linkId, authUser.id, walletLower, new Date().toISOString())
    .run();

  return c.json({
    success: true,
    data: {
      message: 'Wallet successfully linked to account.',
      walletAddress: walletLower,
    },
  });
});

export default app;
