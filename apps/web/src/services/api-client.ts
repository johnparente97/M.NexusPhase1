import { ApiError } from '@meridian-nexus/shared-types';

export const PRODUCTION_WORKER_URL = 'https://meridian-nexus-api.jrjohnparente.workers.dev';

export function getApiBaseUrl(): string {
  // If running in production on a public domain (like github.io),
  // we must unconditionally route all API traffic to the live Cloudflare Worker
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return PRODUCTION_WORKER_URL;
  }

  const envUrl =
    (import.meta as any).env.VITE_API_BASE_URL || (import.meta as any).env.VITE_API_URL;

  if (envUrl && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/$/, '');
  }

  return PRODUCTION_WORKER_URL;
}

export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseUrl}${cleanPath}`;

  // Build default headers
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Inject Terms of Service acceptance header for backend compliance validation
  headers.set('X-Nexus-Accept-ToS', 'true');

  // Inject Bearer token if user is signed in or in demo mode
  const demoUser = typeof localStorage !== 'undefined' ? localStorage.getItem('nexus_demo_user') : null;
  if (demoUser) {
    headers.set('Authorization', `Bearer demo_${demoUser}`);
  } else {
    headers.set('Authorization', 'Bearer demo_guest_user');
  }

  // Setup abort controller for timeout resilience (8s timeout)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: options.signal || controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorData: any;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: { message: `API request failed with HTTP ${response.status}` } };
      }

      const apiError = errorData as ApiError;
      throw new Error(apiError.error?.message || `API error (${response.status})`);
    }

    const result = await response.json();
    return (result.data !== undefined ? result.data : result) as T;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`[Nexus API Client] Call to ${url} failed or timed out:`, err?.message || err);
    throw err;
  }
}
