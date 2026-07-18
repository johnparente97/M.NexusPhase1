import { Hono } from 'hono';
import { AppEnv } from '../types';
import { ValidationError, NotFoundError, AuthError } from '../utils/errors';
import { requireAuth } from '../middleware/auth';
import { D1WorkflowRepository } from '../repositories/workflow-repo';

export const paymentRouter = new Hono<AppEnv>();

// helper to format uuid as bytes32 hex
function formatBytes32Nonce(uuid: string): string {
  const clean = uuid.replace(/-/g, '').toLowerCase();
  return '0x' + clean.padStart(64, '0');
}

// ── POST /api/payment/intent ──
paymentRouter.post('/intent', requireAuth(), async (c) => {
  const authUser = c.get('user')!;
  const { workflowId, walletAddress } = await c.req.json<{
    workflowId: string;
    walletAddress: string;
  }>();

  if (!workflowId || !walletAddress) {
    throw new ValidationError('Missing workflowId or walletAddress parameter.');
  }

  const walletLower = walletAddress.toLowerCase();

  // 1. Verify connected wallet is linked to the authenticated Clerk user profile
  const linkedWallet = await c.env.DB.prepare(
    'SELECT wallet_address FROM linked_wallets WHERE user_id = ? AND wallet_address = ?'
  )
    .bind(authUser.id, walletLower)
    .first<{ wallet_address: string }>();

  if (!linkedWallet) {
    throw new AuthError('The connected wallet is not linked to your Clerk user account.');
  }

  // 2. Fetch workflow and its associated price
  const workflowRepo = new D1WorkflowRepository(c.env.DB);
  const workflow = await workflowRepo.getById(workflowId);

  if (!workflow) {
    throw new NotFoundError('Workflow not found.');
  }

  // Define pricing and parameters
  const amount = workflow.pricePerRun || 0.0;
  const token = c.env.USDC_ADDRESS || '0x036cbd53842c3db6650800b2854ef71e213fd2db';
  const tokenDecimals = 6; // USDC decimals
  const chainId = c.env.CHAIN_ID ? parseInt(c.env.CHAIN_ID, 10) : 84532; // Base Sepolia default
  const recipient = c.env.MERIDIAN_FACILITATOR_ADDRESS || '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';

  // Scale amount to token decimals
  const rawValue = BigInt(Math.round(amount * Math.pow(10, tokenDecimals)));

  // Generate random nonce and format it as bytes32 hex
  const rawNonce = crypto.randomUUID();
  const bytes32Nonce = formatBytes32Nonce(rawNonce);

  const nowUnix = Math.floor(Date.now() / 1000);
  const validAfter = nowUnix;
  const validBefore = nowUnix + 3600; // Expires in 1 hour

  const paymentIntentId = `pi_${crypto.randomUUID()}`;

  // 3. Write pending payment intent to D1 database
  await c.env.DB.prepare(
    `INSERT INTO payment_intents (
      id, user_id, linked_wallet, workflow_id, workflow_version_id,
      amount, token, token_decimals, chain_id, recipient, nonce,
      valid_after, valid_before, status, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      paymentIntentId,
      authUser.id,
      walletLower,
      workflow.id,
      workflow.currentVersion?.id || 'latest',
      amount,
      token.toLowerCase(),
      tokenDecimals,
      chainId,
      recipient.toLowerCase(),
      bytes32Nonce,
      validAfter,
      validBefore,
      'pending',
      new Date().toISOString(),
      new Date().toISOString()
    )
      .run();

  // 4. Build EIP-712 Domain and Typed Data payload matching EIP-3009 TransferWithAuthorization
  const domain = {
    name: 'USD Coin',
    version: '2',
    chainId: chainId,
    verifyingContract: token as `0x${string}`,
  };

  const types = {
    TransferWithAuthorization: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'validAfter', type: 'uint256' },
      { name: 'validBefore', type: 'uint256' },
      { name: 'nonce', type: 'bytes32' },
    ],
  };

  const value = {
    from: walletLower as `0x${string}`,
    to: recipient.toLowerCase() as `0x${string}`,
    value: rawValue.toString(), // Needs to be string for JSON representation of bigints
    validAfter: validAfter.toString(),
    validBefore: validBefore.toString(),
    nonce: bytes32Nonce as `0x${string}`,
  };

  return c.json({
    success: true,
    data: {
      paymentIntentId,
      domain,
      types,
      value,
    },
  });
});
