import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
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
  signOut: () => void;
  signInAsDemo: (role: 'user' | 'creator' | 'admin') => void;
}

export function useAuth(): AuthState {
  const { user: clerkUser, isLoaded: clerkLoaded, isSignedIn: clerkSignedIn } = useUser();
  const { signOut: clerkSignOut } = useClerkAuth();

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

  // Sync with DB
  useEffect(() => {
    if (clerkSignedIn || demoUser) {
      setLoadingDb(true);
      fetchApi<any>('/api/users/me')
        .then((data) => {
          setDbUser(data);
        })
        .catch((e) => {
          console.error('Failed to load user profile details:', e);
          // If profile load fails and we are using a demo token, reset it
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
  }, [clerkSignedIn, demoUser]);

  const signOut = () => {
    localStorage.removeItem('nexus_demo_user');
    setDemoUser(null);
    setDbUser(null);
    if (clerkSignedIn) {
      clerkSignOut();
    }
  };

  const signInAsDemo = (role: 'user' | 'creator' | 'admin') => {
    const roleKey = `${role}_${role}`;
    localStorage.setItem('nexus_demo_user', roleKey);
    setDemoUser(roleKey);
  };

  const isLoaded = (clerkLoaded || clerkTimeout) && !loadingDb;
  const isSignedIn = !!clerkSignedIn || !!demoUser;

  let user: AuthState['user'] = null;
  let userId: string | null = null;

  if (clerkSignedIn && clerkUser) {
    userId = clerkUser.id;
    user = {
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || '',
      displayName: clerkUser.fullName || 'Clerk User',
      role: dbUser?.user?.role || 'user',
      avatarUrl: clerkUser.imageUrl,
    };
  } else if (demoUser) {
    const role = demoUser.split('_')[0] as any;
    userId = `usr-${role}`;
    user = {
      id: userId,
      email: `${role}@nexus.dev`,
      displayName: role.charAt(0).toUpperCase() + role.slice(1) + ' Account',
      role: role || 'user',
      avatarUrl: null,
    };
  }

  return {
    isSignedIn,
    isLoaded,
    userId,
    user,
    signOut,
    signInAsDemo,
  };
}
