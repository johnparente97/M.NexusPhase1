// ─── Meridian Nexus — Multichain & Token Configuration ──────────────
// Centralized configuration for EVM chains, tokens, and top-up fee rules.
// ─────────────────────────────────────────────────────────────────────

export const MERIDIAN_TOP_UP_FEE_BPS = 100; // 1% Top-Up Fee (100 basis points)
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
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0x036cbd53842c3db6650800b2854ef71e213fd2db',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 5,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000',
        icon: 'coins',
        isStablecoin: false,
        estimatedSlippageBps: 20,
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
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 2,
      },
      {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        address: '0x0000000000000000000000000000000000000000',
        icon: 'coins',
        isStablecoin: false,
        estimatedSlippageBps: 15,
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
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 5,
      },
      {
        symbol: 'USDG',
        name: 'Global Dollar',
        decimals: 6,
        address: '0x0000000000000000000000000000000000000000',
        icon: 'shield',
        isStablecoin: true,
        estimatedSlippageBps: 10,
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
        name: 'USD Coin Native',
        decimals: 6,
        address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 5,
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
        name: 'USD Coin',
        decimals: 6,
        address: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 10,
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
        name: 'USDC SPL',
        decimals: 6,
        address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        icon: 'dollar-sign',
        isStablecoin: true,
        estimatedSlippageBps: 10,
      },
    ],
  },
};
