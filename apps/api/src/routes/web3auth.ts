import { Hono } from 'hono';
import { AppEnv } from '../types';
import { ValidationError, AuthError } from '../utils/errors';
import { verifyMessage } from 'viem';

const app = new Hono<AppEnv>();

// GET /api/auth/web3/nonce
app.get('/nonce', async (c) => {
  const nonce = crypto.randomUUID().replace(/-/g, '').substring(0, 16);
  const expiresAt = Date.now() + 300 * 1000; // 5 mins expiry

  await c.env.DB.prepare(
    'INSERT INTO web3_nonces (nonce, expires_at) VALUES (?, ?)'
  )
    .bind(nonce, expiresAt)
    .run();

  return c.json({ nonce });
});

// POST /api/auth/web3/verify
app.post('/verify', async (c) => {
  const { address, message, signature } = await c.req.json<{
    address: string;
    message: string;
    signature: string;
  }>();

  if (!address || !message || !signature) {
    throw new ValidationError('Missing address, message, or signature parameter.');
  }

  // Extract nonce from SIWE message
  // Example: "Nonce: 3a2c4e..."
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

    user = { id: userId, displayName, role: 'user' };
  }

  // Generate bearer session token
  const token = `demo_user_${walletId}`;

  return c.json({
    success: true,
    token,
    user: {
      id: user.id,
      displayName: user.displayName,
      role: user.role,
      walletAddress: address,
    },
  });
});

export default app;
