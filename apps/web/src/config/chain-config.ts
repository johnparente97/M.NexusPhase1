// ─── Meridian Nexus — Multichain & Token Configuration ──────────────
// Centralized configuration for EVM chains, tokens, and top-up fee rules.
// Utility Model:
// - Top-up using MRDN: 0% top-up fee
// - Top-up using USDC or other supported assets: 1% top-up fee
// ─────────────────────────────────────────────────────────────────────

export const MRDN_TOP_UP_FEE_BPS = 0; // 0% Top-Up Fee for MRDN Token
export const STANDARD_TOP_UP_FEE_BPS = 100; // 1% Top-Up Fee for USDC / standard assets (100 basis points)
export const MERIDIAN_TOP_UP_FEE_BPS = 100; // Legacy default reference
export const MERIDIAN_PROTOCOL_FEE_BPS = 100; // 1% Platform Protocol Fee
export const CREATOR_EARNINGS_BPS = 9900; // 99% Creator Share

export interface SupportedToken {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  icon: string;
  isStablecoin: boolean;
  estimatedSlippageBps: number;
  topUpFeeBps?: number;
}

export interface ChainConfig {
  id: number;
  caip2Id: string;
  name: string;
  network: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  supported: boolean;
  status: 'live' | 'testnet' | 'planned';
  tokens: SupportedToken[];
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  '84532': {
    id: 84532,
    caip2Id: 'eip155:84532',
    name: 'Base Sepolia',
    network: 'base-sepolia',
    rpcUrl: 'https://sepolia.base.org',
    explorerUrl: 'https://sepolia.basescan.org',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    supported: true,
    status: 'testnet',
    tokens: [
      {
        symbol: 'MRDN',
        name: 'Meridian Token (0% Fee Benefit)',
        decimals: 18,
        address: '0x5c421e42ba921e1494957e2d93e1b78292850901',
        icon: 'sparkles',
        isStablecoin: false,
        estimatedSlippageBps: 0,
        topUpFeeBps: 0,
      },
      {
        symbol: 'USDC',
        name: 'USD Coin (1% Fee)',
        decimals: 6,
        address: '0x036cbd53842c3db6650800b2854ef71e213fd2db',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 5,
        topUpFeeBps: 100,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum (1% Fee)',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000',
        icon: 'coins',
        isStablecoin: false,
        estimatedSlippageBps: 20,
        topUpFeeBps: 100,
      },
    ],
  },
  '8453': {
    id: 8453,
    caip2Id: 'eip155:8453',
    name: 'Base Mainnet',
    network: 'base',
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    supported: true,
    status: 'live',
    tokens: [
      {
        symbol: 'MRDN',
        name: 'Meridian Token (0% Fee Benefit)',
        decimals: 18,
        address: '0x3a4b91ef4172b8d0092c23f1148f47c945199201',
        icon: 'sparkles',
        isStablecoin: false,
        estimatedSlippageBps: 0,
        topUpFeeBps: 0,
      },
      {
        symbol: 'USDC',
        name: 'USD Coin (1% Fee)',
        decimals: 6,
        address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 2,
        topUpFeeBps: 100,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum (1% Fee)',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000',
        icon: 'coins',
        isStablecoin: false,
        estimatedSlippageBps: 15,
        topUpFeeBps: 100,
      },
    ],
  },
  '1': {
    id: 1,
    caip2Id: 'eip155:1',
    name: 'Ethereum Mainnet',
    network: 'ethereum',
    rpcUrl: 'https://eth.llamarpc.com',
    explorerUrl: 'https://etherscan.io',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    supported: true,
    status: 'live',
    tokens: [
      {
        symbol: 'MRDN',
        name: 'Meridian Token (0% Fee Benefit)',
        decimals: 18,
        address: '0x3a4b91ef4172b8d0092c23f1148f47c945199201',
        icon: 'sparkles',
        isStablecoin: false,
        estimatedSlippageBps: 0,
        topUpFeeBps: 0,
      },
      {
        symbol: 'USDC',
        name: 'USD Coin (1% Fee)',
        decimals: 6,
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 5,
        topUpFeeBps: 100,
      },
      {
        symbol: 'USDG',
        name: 'Global Dollar (1% Fee)',
        decimals: 6,
        address: '0x0000000000000000000000000000000000000000',
        icon: 'shield',
        isStablecoin: true,
        estimatedSlippageBps: 10,
        topUpFeeBps: 100,
      },
    ],
  },
  '42161': {
    id: 42161,
    caip2Id: 'eip155:42161',
    name: 'Arbitrum One',
    network: 'arbitrum',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    supported: true,
    status: 'live',
    tokens: [
      {
        symbol: 'USDC',
        name: 'USD Coin Native (1% Fee)',
        decimals: 6,
        address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 5,
        topUpFeeBps: 100,
      },
    ],
  },
  '137': {
    id: 137,
    caip2Id: 'eip155:137',
    name: 'Polygon PoS',
    network: 'polygon',
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    supported: true,
    status: 'live',
    tokens: [
      {
        symbol: 'USDC',
        name: 'USD Coin (1% Fee)',
        decimals: 6,
        address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 10,
        topUpFeeBps: 100,
      },
    ],
  },
  'solana': {
    id: 999999,
    caip2Id: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    name: 'Solana (Future Adapter)',
    network: 'solana',
    rpcUrl: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://explorer.solana.com',
    nativeCurrency: { name: 'SOL', symbol: 'SOL', decimals: 9 },
    supported: false,
    status: 'planned',
    tokens: [
      {
        symbol: 'USDC',
        name: 'USDC SPL (1% Fee)',
        decimals: 6,
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 10,
        topUpFeeBps: 100,
      },
    ],
  },
};
