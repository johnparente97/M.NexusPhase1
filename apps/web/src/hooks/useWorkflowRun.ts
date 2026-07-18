import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '../services/api-client';
import { WorkflowRun, WorkflowResult } from '@meridian-nexus/shared-types';

export function useExecuteWorkflow(workflowId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ 
      inputs, 
      paymentIntentId,
      paymentSignature,
      idempotencyKey
    }: { 
      inputs: Record<string, unknown>; 
      paymentIntentId?: string;
      paymentSignature?: string;
      idempotencyKey?: string;
    }) =>
      fetchApi<WorkflowRun>(`/api/workflows/${workflowId}/run`, {
        method: 'POST',
        body: JSON.stringify({ 
          workflowId, 
          inputs, 
          paymentIntentId,
          paymentSignature,
          idempotencyKey
        }),
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['runs'] });
      queryClient.invalidateQueries({ queryKey: ['usage'] });
    },
  });
}

export function useRuns(status?: string) {
  return useQuery({
    queryKey: ['runs', { status }],
    queryFn: () => {
      const url = status ? `/api/runs?status=${status}` : '/api/runs';
      return fetchApi<WorkflowRun[]>(url);
    },
  });
}

export function useRun(runId: string) {
  return useQuery({
    queryKey: ['run', runId],
    queryFn: () => fetchApi<WorkflowRun>(`/api/runs/${runId}`),
    enabled: !!runId,
    refetchInterval: (query) => {
      const data = query.state.data as WorkflowRun | undefined;
      if (data && (data.status === 'completed' || data.status === 'failed' || data.status === 'cancelled')) {
        return false;
      }
      return 1500; // Poll every 1.5 seconds if run is running/pending
    },
  });
}

export function useRunResult(runId: string, enabled = true) {
  return useQuery({
    queryKey: ['run-result', runId],
    queryFn: () => fetchApi<WorkflowResult>(`/api/runs/${runId}/result`),
    enabled: !!runId && enabled,
    retry: false, // Don't retry if result not ready yet
  });
}

export function useCancelRun(runId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchApi<WorkflowRun>(`/api/runs/${runId}/cancel`, {
      method: 'POST',
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['run', runId] });
      queryClient.invalidateQueries({ queryKey: ['runs'] });
    },
  });
}
