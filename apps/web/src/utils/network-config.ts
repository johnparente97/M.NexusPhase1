export interface ChainConfig {
  name: string;
  chainId: number;
  hexChainId: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  usdcAddress: string;
  usdcDecimals: number;
  meridianFacilitatorAddress: string;
}

export const BASE_SEPOLIA_CONFIG: ChainConfig = {
  name: 'Base Sepolia Testnet',
  chainId: 84532,
  hexChainId: '0x14a34',
  rpcUrl: 'https://sepolia.base.org',
  explorerUrl: 'https://sepolia.basescan.org',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
  },
  // Canonical Base Sepolia USDC proxy contract address
  usdcAddress: '0x036cbd53842c3db6650800b2854ef71e213fd2db',
  usdcDecimals: 6,
  // Simulated Meridian Facilitator contract address
  meridianFacilitatorAddress: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
};
