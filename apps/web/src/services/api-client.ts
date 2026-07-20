import { ApiError } from '@meridian-nexus/shared-types';
import {
  mockGetWorkflows,
  mockGetWorkflow,
  mockRunWorkflow,
  mockGetRuns,
  mockGetRun,
} from './mock-db';

export const PRODUCTION_WORKER_URL = 'https://meridian-nexus-api.jrjohnparente.workers.dev';

export function getApiBaseUrl(): string {
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

// Intercepts path requests and handles them using local state simulator
async function handleMockRoute(path: string, options: RequestInit = {}): Promise<any> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const urlObj = new URL(cleanPath, 'http://localhost');
  const pathname = urlObj.pathname;
  const searchParams = urlObj.searchParams;

  if (pathname === '/api/workflows') {
    const params = {
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      isFree: searchParams.get('isFree') || undefined,
      verified: searchParams.get('verified') || undefined,
      sort: searchParams.get('sort') || undefined,
    };
    return mockGetWorkflows(params);
  }

  const runMatch = pathname.match(/^\/api\/workflows\/([^/]+)\/run$/);
  if (runMatch) {
    const workflowId = runMatch[1]!;
    const body = options.body ? JSON.parse(options.body as string) : {};
    return await mockRunWorkflow(workflowId, body);
  }

  const workflowMatch = pathname.match(/^\/api\/workflows\/([^/]+)$/);
  if (workflowMatch) {
    const idOrSlug = workflowMatch[1]!;
    const wf = mockGetWorkflow(idOrSlug);
    if (!wf) throw new Error(`Workflow ${idOrSlug} not found`);
    return wf;
  }

  if (pathname === '/api/runs') {
    return mockGetRuns();
  }

  const resultMatch = pathname.match(/^\/api\/runs\/([^/]+)\/result$/);
  if (resultMatch) {
    const runId = resultMatch[1]!;
    const run = mockGetRun(runId);
    return run?.result || null;
  }

  const runDetailMatch = pathname.match(/^\/api\/runs\/([^/]+)$/);
  if (runDetailMatch) {
    const runId = runDetailMatch[1]!;
    const run = mockGetRun(runId);
    if (!run) throw new Error(`Run ${runId} not found`);
    return run;
  }

  if (pathname === '/api/users/me') {
    return {
      id: 'usr-demo-1',
      display_name: 'Protocol Developer',
      role: 'user',
      created_at: new Date().toISOString()
    };
  }

  if (pathname.includes('/creator/analytics')) {
    return { totalRuns: 1420, averageRating: 4.9, activeUsers: 342, totalEarnings: 1540.50 };
  }

  return null;
}

export async function fetchApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${baseUrl}${cleanPath}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  headers.set('X-Nexus-Accept-ToS', 'true');

  const demoUser = typeof localStorage !== 'undefined' ? localStorage.getItem('nexus_demo_user') : null;
  if (demoUser) {
    headers.set('Authorization', `Bearer demo_${demoUser}`);
  } else {
    headers.set('Authorization', 'Bearer demo_guest_user');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: options.signal || controller.signal,
    });
    clearTimeout(timeoutId);

    // If request got blocked, rejected, or rate-limited by policy (like a 403 proxy policy)
    if (response.status === 403) {
      const responseText = await response.clone().text();
      if (responseText.includes('policy') || responseText.includes('allowed')) {
        console.warn(`[Nexus API Client] Access blocked by corporate policy header. Falling back to local offline simulator.`);
        const localData = await handleMockRoute(path, options);
        if (localData !== null) return localData as T;
      }
    }

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
    console.info(`[Nexus API Client] Activating offline local database fallback for route: ${path}`);
    
    // Attempt local database fallback
    try {
      const fallbackResult = await handleMockRoute(path, options);
      if (fallbackResult !== null) {
        return fallbackResult as T;
      }
    } catch (fallbackErr) {
      console.error('[Nexus API Client] Fallback handler failed:', fallbackErr);
    }
    
    throw err;
  }
}
