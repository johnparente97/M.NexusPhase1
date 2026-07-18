import { useState, useEffect } from 'react';
import { fetchApi } from '../services/api-client';

export interface AuthState {
  isSignedIn: boolean;
  isLoaded: boolean;
  userId: string | null;
  user: {
    id: string;
    email: string;
    displayName: string;
    role: 'user' | 'creator' | 'admin';
    avatarUrl: string | null;
  } | null;
  linkedWallets?: Array<{ walletAddress: string; verifiedAt: string }>;
  signOut: () => void;
  signInAsDemo: (role: 'user' | 'creator' | 'admin') => void;
}

export function useAuth(): AuthState {
  const [clerkTimeout, setClerkTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setClerkTimeout(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [demoUser, setDemoUser] = useState<string | null>(() => {
    return localStorage.getItem('nexus_demo_user');
  });

  const [dbUser, setDbUser] = useState<any>(null);
  const [loadingDb, setLoadingDb] = useState(false);

  // Sync user record from API on sign-in
  useEffect(() => {
    if (demoUser) {
      setLoadingDb(true);
      fetchApi<any>('/api/users/me')
        .then((data) => {
          setDbUser(data);
        })
        .catch((e) => {
          console.error('Failed to load user profile details:', e);
          if (demoUser) {
            localStorage.removeItem('nexus_demo_user');
            setDemoUser(null);
          }
        })
        .finally(() => {
          setLoadingDb(false);
        });
    } else {
      setDbUser(null);
    }
  }, [demoUser]);

  const signOut = () => {
    localStorage.removeItem('nexus_demo_user');
    setDemoUser(null);
    setDbUser(null);
  };

  const signInAsDemo = (role: 'user' | 'creator' | 'admin') => {
    const roleKey = `${role}_${role}`;
    localStorage.setItem('nexus_demo_user', roleKey);
    setDemoUser(roleKey);
  };

  const isLoaded = clerkTimeout && !loadingDb;
  const isSignedIn = !!demoUser;

  let user: AuthState['user'] = null;
  let userId: string | null = null;

  if (demoUser) {
    const parts = demoUser.split('_');
    const role = parts[0] as any;
    const address = parts[1] || '';
    userId = address ? `usr-${address}` : `usr-${role}`;
    user = {
      id: userId,
      email: address ? `${address}@meridian.finance` : `${role}@nexus.dev`,
      displayName:
        dbUser?.displayName ||
        dbUser?.user?.displayName ||
        (address
          ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
          : role.charAt(0).toUpperCase() + role.slice(1) + ' Account'),
      role: dbUser?.role || dbUser?.user?.role || role || 'user',
      avatarUrl: null,
    };
  }

  return {
    isSignedIn,
    isLoaded,
    userId,
    user,
    linkedWallets: dbUser?.linkedWallets || [],
    signOut,
    signInAsDemo,
  };
}
