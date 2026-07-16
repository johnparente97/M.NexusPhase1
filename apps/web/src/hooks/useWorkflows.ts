import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '../services/api-client';
import { Workflow, WorkflowListParams } from '@meridian-nexus/shared-types';

export function useWorkflows(params: WorkflowListParams = {}) {
  return useQuery({
    queryKey: ['workflows', params],
    queryFn: () => {
      // Build query string
      const searchParams = new URLSearchParams();
      if (params.search) searchParams.append('search', params.search);
      if (params.category) searchParams.append('category', params.category);
      if (params.minRating) searchParams.append('minRating', params.minRating.toString());
      if (params.maxPrice) searchParams.append('maxPrice', params.maxPrice.toString());
      if (params.isFree !== undefined) searchParams.append('isFree', params.isFree ? 'true' : 'false');
      if (params.verified !== undefined) searchParams.append('verified', params.verified ? 'true' : 'false');
      if (params.sort) searchParams.append('sort', params.sort);
      if (params.page) searchParams.append('page', params.page.toString());
      if (params.pageSize) searchParams.append('pageSize', params.pageSize.toString());

      const queryStr = searchParams.toString();
      return fetchApi<Workflow[]>(`/api/workflows?${queryStr}`);
    },
  });
}

export function useWorkflow(idOrSlug: string) {
  return useQuery({
    queryKey: ['workflow', idOrSlug],
    queryFn: () => fetchApi<Workflow>(`/api/workflows/${idOrSlug}`),
    enabled: !!idOrSlug,
  });
}

export function useCreateWorkflow() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => fetchApi<Workflow>('/api/workflows', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function useUpdateWorkflow(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => fetchApi<Workflow>(`/api/workflows/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workflow', id] });
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function usePublishWorkflow(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchApi<Workflow>(`/api/workflows/${id}/publish`, {
      method: 'POST',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', id] });
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}

export function useUnpublishWorkflow(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchApi<Workflow>(`/api/workflows/${id}/unpublish`, {
      method: 'POST',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workflow', id] });
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}
