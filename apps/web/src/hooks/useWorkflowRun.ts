import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '../services/api-client';
import { WorkflowRun, WorkflowResult } from '@meridian-nexus/shared-types';

export function useExecuteWorkflow(workflowId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (inputs: Record<string, unknown>) =>
      fetchApi<WorkflowRun>(`/api/workflows/${workflowId}/run`, {
        method: 'POST',
        body: JSON.stringify({ workflowId, inputs }),
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
  });
}

export function useRunResult(runId: string) {
  return useQuery({
    queryKey: ['run-result', runId],
    queryFn: () => fetchApi<WorkflowResult>(`/api/runs/${runId}/result`),
    enabled: !!runId,
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
