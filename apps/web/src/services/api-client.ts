import { ApiError } from '@meridian-nexus/shared-types';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || '';

export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;

  // Build default headers
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject Clerk session token if Clerk is initialized in the browser
  if (typeof window !== 'undefined' && (window as any).Clerk?.session) {
    try {
      const token = await (window as any).Clerk.session.getToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (e) {
      console.warn('Failed to retrieve Clerk token:', e);
    }
  } else {
    // If Clerk is not loaded, check if we have a simulated user email in localStorage.
    // If we do, we can construct a Bearer demo token so auth middleware works seamlessly in demo mode!
    const demoUser = localStorage.getItem('nexus_demo_user');
    if (demoUser) {
      headers.set('Authorization', `Bearer demo_${demoUser}`);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: any;
    try {
      errorData = await response.json();
    } catch {
      errorData = { error: { message: `Request failed with status ${response.status}` } };
    }
    
    const apiError = errorData as ApiError;
    throw new Error(apiError.error?.message || 'An unexpected error occurred.');
  }

  const result = await response.json();
  return result.data as T;
}
