import { describe, it, expect } from 'vitest';
import { verifyTypedData } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

describe('EIP-712 Payment Signature Validation', () => {
  it('should successfully verify a valid TransferWithAuthorization typed data signature', async () => {
    // Generate ephemeral private key and wallet account
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    const walletAddress = account.address;

    const domain = {
      name: 'USD Coin',
      version: '2',
      chainId: 84532,
      verifyingContract: '0x036cbd53842c3db6650800b2854ef71e213fd2db' as `0x${string}`
    };

    const types = {
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' }
      ]
    };

    const message = {
      from: walletAddress,
      to: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4' as `0x${string}`,
      value: 1000000n, // 1.00 USDCscaled
      validAfter: 0n,
      validBefore: BigInt(Math.floor(Date.now() / 1000) + 3600),
      nonce: '0x' + '1'.repeat(64) as `0x${string}`
    };

    // Sign typed data payload using viem's private key account signer
    const signature = await account.signTypedData({
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message
    });

    // Verify signature using the same viem validator we use in workflow execution service
    const isValid = await verifyTypedData({
      address: walletAddress,
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message,
      signature
    });

    expect(isValid).toBe(true);
  });

  it('should fail validation if the signature or parameters are mutated', async () => {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    const walletAddress = account.address;

    const domain = {
      name: 'USD Coin',
      version: '2',
      chainId: 84532,
      verifyingContract: '0x036cbd53842c3db6650800b2854ef71e213fd2db' as `0x${string}`
    };

    const types = {
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' }
      ]
    };

    const message = {
      from: walletAddress,
      to: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4' as `0x${string}`,
      value: 1000000n,
      validAfter: 0n,
      validBefore: BigInt(Math.floor(Date.now() / 1000) + 3600),
      nonce: '0x' + '1'.repeat(64) as `0x${string}`
    };

    const signature = await account.signTypedData({
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message
    });

    // Attempt to verify with a different value amount (e.g. scale up charge amount!)
    const mutatedMessage = {
      ...message,
      value: 2000000n // scale up charge to 2.00 USDC
    };

    const isValidMutated = await verifyTypedData({
      address: walletAddress,
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message: mutatedMessage,
      signature
    });

    expect(isValidMutated).toBe(false);
  });
});
