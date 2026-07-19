import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { BASE_SEPOLIA_CONFIG } from '../utils/network-config';
import { fetchApi } from '../services/api-client';

// Safe window.ethereum reference
const getEthereum = () => {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    return (window as any).ethereum;
  }
  return null;
};

export interface WalletState {
  walletAddress: string | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  usdcBalance: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchNetwork: () => Promise<void>;
  personalSign: (message: string) => Promise<string>;
  signPaymentAuthorization: (recipient: string, amount: number, nonce: string) => Promise<string>;
  signTypedData: (domain: any, types: any, value: any) => Promise<string>;
  signInWithEthereum: () => Promise<void>;
  linkWalletAddress: () => Promise<void>;
}

// Simple ERC20 balanceOf encoder helper
const encodeBalanceOf = (address: string): string => {
  const cleanAddress = address.replace(/^0x/, '').toLowerCase();
  const padded = cleanAddress.padStart(64, '0');
  return '0x70a08231' + padded;
};

export const useWalletInternal = (): WalletState => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [usdcBalance, setUsdcBalance] = useState<string>('0.00');
  const [isConnecting, setIsConnecting] = useState(false);

  const fetchUsdcBalance = useCallback(async (address: string) => {
    const ethereum = getEthereum();
    if (!ethereum) return;
    try {
      const data = encodeBalanceOf(address);
      const hexBalance = await ethereum.request({
        method: 'eth_call',
        params: [
          {
            to: BASE_SEPOLIA_CONFIG.usdcAddress,
            data: data,
          },
          'latest',
        ],
      });
      if (hexBalance && hexBalance !== '0x') {
        const raw = BigInt(hexBalance);
        // Base Sepolia USDC has 6 decimals
        const formatted = (Number(raw) / 1000000).toFixed(2);
        setUsdcBalance(formatted);
      } else {
        setUsdcBalance('0.00');
      }
    } catch (err) {
      console.warn('Failed to query USDC balance:', err);
      setUsdcBalance('0.00');
    }
  }, []);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length > 0 && accounts[0]) {
      const activeAcct = accounts[0];
      setWalletAddress(activeAcct);
      localStorage.setItem('wallet_connected', 'true');
      fetchUsdcBalance(activeAcct);
    } else {
      setWalletAddress(null);
      setUsdcBalance('0.00');
      localStorage.removeItem('wallet_connected');
    }
  }, [fetchUsdcBalance]);

  const handleChainChanged = useCallback((hexChainId: string) => {
    const parsed = parseInt(hexChainId, 16);
    setChainId(parsed);
    if (walletAddress) {
      fetchUsdcBalance(walletAddress);
    }
  }, [walletAddress, fetchUsdcBalance]);

  // Connect injected provider
  const connectWallet = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) {
      alert('No Web3 wallet detected. Please install MetaMask to interact with the Meridian testnet.');
      return;
    }
    setIsConnecting(true);
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const rawChainId = await ethereum.request({ method: 'eth_chainId' });
      
      setChainId(parseInt(rawChainId, 16));
      handleAccountsChanged(accounts);
    } catch (err) {
      console.error('Wallet connection rejected:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [handleAccountsChanged]);

  const disconnectWallet = useCallback(() => {
    setWalletAddress(null);
    setUsdcBalance('0.00');
    localStorage.removeItem('wallet_connected');
  }, []);

  const switchNetwork = useCallback(async () => {
    const ethereum = getEthereum();
    if (!ethereum) return;
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: BASE_SEPOLIA_CONFIG.hexChainId }],
      });
    } catch (switchError: any) {
      // Chain not added to user's wallet
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: BASE_SEPOLIA_CONFIG.hexChainId,
                chainName: BASE_SEPOLIA_CONFIG.name,
                rpcUrls: [BASE_SEPOLIA_CONFIG.rpcUrl],
                blockExplorerUrls: [BASE_SEPOLIA_CONFIG.explorerUrl],
                nativeCurrency: BASE_SEPOLIA_CONFIG.nativeCurrency,
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add Base Sepolia network:', addError);
        }
      } else {
        console.error('Failed to switch network:', switchError);
      }
    }
  }, []);

  // SIWE Personal Sign Challenge
  const personalSign = useCallback(async (message: string): Promise<string> => {
    const ethereum = getEthereum();
    if (!ethereum || !walletAddress) throw new Error('Wallet not connected');
    return ethereum.request({
      method: 'personal_sign',
      params: [message, walletAddress],
    });
  }, [walletAddress]);

  // x402 payment requirements signer (EIP-712 / EIP-3009 structure)
  const signPaymentAuthorization = useCallback(async (
    recipient: string,
    amount: number,
    nonce: string
  ): Promise<string> => {
    const ethereum = getEthereum();
    if (!ethereum || !walletAddress) throw new Error('Wallet not connected');

    // USDC amount in integer base units (6 decimals)
    const rawAmount = Math.round(amount * 1000000).toString();
    const validAfter = 0;
    // Set 1-hour expiration
    const validBefore = Math.floor(Date.now() / 1000) + 3600; 

    const eip712Data = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' }
        ],
        TransferWithAuthorization: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
          { name: 'validAfter', type: 'uint256' },
          { name: 'validBefore', type: 'uint256' },
          { name: 'nonce', type: 'bytes32' }
        ]
      },
      primaryType: 'TransferWithAuthorization',
      domain: {
        name: 'USD Coin',
        version: '2',
        chainId: BASE_SEPOLIA_CONFIG.chainId,
        verifyingContract: BASE_SEPOLIA_CONFIG.usdcAddress
      },
      message: {
        from: walletAddress,
        to: recipient,
        value: rawAmount,
        validAfter,
        validBefore,
        nonce
      }
    };

    return ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [walletAddress, JSON.stringify(eip712Data)],
    });
  }, [walletAddress]);

  const signTypedData = useCallback(async (
    domain: any,
    types: any,
    value: any
  ): Promise<string> => {
    const ethereum = getEthereum();
    if (!ethereum || !walletAddress) {
      throw new Error('Wallet not connected or ethereum provider missing');
    }

    const payload = {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' }
        ],
        ...types
      },
      primaryType: Object.keys(types)[0],
      domain,
      message: value
    };

    return ethereum.request({
      method: 'eth_signTypedData_v4',
      params: [walletAddress, JSON.stringify(payload)],
    });
  }, [walletAddress]);

  // Eager connection hook
  useEffect(() => {
    const ethereum = getEthereum();
    if (ethereum && localStorage.getItem('wallet_connected') === 'true') {
      ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            handleAccountsChanged(accounts);
            ethereum.request({ method: 'eth_chainId' })
              .then((hexChain: string) => setChainId(parseInt(hexChain, 16)));
          }
        })
        .catch(console.warn);

      // Listen for account and chain switches
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('chainChanged', handleChainChanged);

      return () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [handleAccountsChanged, handleChainChanged]);

  const signInWithEthereum = useCallback(async () => {
    let activeAddress = walletAddress;
    const ethereum = getEthereum();

    if (!ethereum) {
      // Fallback for environments without MetaMask/Coinbase Wallet extensions installed
      const demoAddress = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
      const useSimulated = confirm(
        'No Web3 browser extension (e.g. MetaMask) was detected in this browser.\n\n' +
        'Would you like to connect with a simulated Base Sepolia Testnet Wallet (0x71C7...976F) for local testing?'
      );

      if (useSimulated) {
        setWalletAddress(demoAddress);
        localStorage.setItem('wallet_connected', 'true');
        localStorage.setItem('nexus_demo_user', `user_${demoAddress.toLowerCase()}`);
        window.location.reload();
      }
      return;
    }

    setIsConnecting(true);
    try {
      if (!activeAddress) {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts[0]) {
          activeAddress = accounts[0];
          setWalletAddress(activeAddress);
          localStorage.setItem('wallet_connected', 'true');
        }
      }

      if (!activeAddress) {
        alert('No active wallet account selected.');
        return;
      }

      const finalAddress = activeAddress;
      const { nonce } = await fetchApi<{ nonce: string }>('/api/auth/web3/nonce');
      const message = `mrdn.finance wants you to sign in with your Ethereum account:\n${finalAddress}\n\nI accept the Meridian Nexus Terms of Service and Privacy Policy.\n\nURI: https://mrdn.finance\nVersion: 1\nChain ID: ${chainId || BASE_SEPOLIA_CONFIG.chainId}\nNonce: ${nonce}\nIssued At: ${new Date().toISOString()}`;

      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [message, finalAddress],
      });

      const response = await fetchApi<{ success: boolean; token: string; user: any }>('/api/auth/web3/verify', {
        method: 'POST',
        body: JSON.stringify({
          address: finalAddress,
          message,
          signature,
        }),
      });

      if (response.success && response.token) {
        localStorage.setItem('nexus_demo_user', `user_${finalAddress.toLowerCase()}`);
        window.location.reload();
      }
    } catch (err: any) {
      console.error('Sign-in with Ethereum failed:', err);
      alert(err?.message || 'SIWE Signature request rejected or verification failed.');
    } finally {
      setIsConnecting(false);
    }
  }, [walletAddress, chainId]);

  const linkWalletAddress = useCallback(async (): Promise<void> => {
    let activeAddress = walletAddress;
    const ethereum = getEthereum();
    if (!ethereum) {
      alert('No Web3 wallet detected.');
      return;
    }
    if (!activeAddress) {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts[0]) {
        activeAddress = accounts[0];
        setWalletAddress(activeAddress);
        localStorage.setItem('wallet_connected', 'true');
      }
    }

    if (!activeAddress) {
      alert('No active wallet account connected.');
      return;
    }

    try {
      // 1. Fetch challenge from API
      const responseChallenge = await fetchApi<{ challengeId: string; challenge: string }>(
        '/api/auth/web3/challenge',
        {
          method: 'POST',
          body: JSON.stringify({ walletAddress: activeAddress }),
        }
      );

      // 2. Request user signature
      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [responseChallenge.challenge, activeAddress],
      });

      // 3. Post signature for linking
      const responseLink = await fetchApi<{ message: string; walletAddress: string }>(
        '/api/auth/web3/link',
        {
          method: 'POST',
          body: JSON.stringify({
            challengeId: responseChallenge.challengeId,
            signature,
            walletAddress: activeAddress,
          }),
        }
      );

      alert(responseLink.message || 'Wallet linked successfully!');
      window.location.reload();
    } catch (err: any) {
      console.error('Wallet linking signature failed:', err);
      alert(err.message || 'Verification rejected.');
    }
  }, [walletAddress]);

  return {
    walletAddress,
    chainId,
    isConnected: !!walletAddress,
    isConnecting,
    usdcBalance,
    connectWallet,
    disconnectWallet,
    switchNetwork,
    personalSign,
    signPaymentAuthorization,
    signTypedData,
    signInWithEthereum,
    linkWalletAddress,
  };
};

const WalletContext = createContext<WalletState | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useWalletInternal();
  return <WalletContext.Provider value={wallet}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
