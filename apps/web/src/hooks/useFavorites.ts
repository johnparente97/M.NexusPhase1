import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '../services/api-client';
import { Workflow } from '@meridian-nexus/shared-types';

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => fetchApi<Workflow[]>('/api/favorites'),
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (workflowId: string) =>
      fetchApi<{ favorited: boolean }>(`/api/favorites/${workflowId}`, {
        method: 'POST',
      }),
    onSuccess: (data, workflowId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['workflow', workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflows'] });
    },
  });
}
