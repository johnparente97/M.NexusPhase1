import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '../services/api-client';
import { Review } from '@meridian-nexus/shared-types';

export function useReviews(workflowId: string) {
  return useQuery({
    queryKey: ['reviews', workflowId],
    queryFn: () => fetchApi<Review[]>(`/api/reviews?workflowId=${workflowId}`),
    enabled: !!workflowId,
  });
}

export function useSubmitReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { workflowId: string; runId: string; rating: number; comment?: string }) =>
      fetchApi<Review>('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.workflowId] });
      queryClient.invalidateQueries({ queryKey: ['workflow', variables.workflowId] });
      queryClient.invalidateQueries({ queryKey: ['run', variables.runId] });
    },
  });
}
