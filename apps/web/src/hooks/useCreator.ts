import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../services/api-client';
import { CreatorMetrics, Workflow } from '@meridian-nexus/shared-types';

export function useCreatorAnalytics() {
  return useQuery({
    queryKey: ['creator-analytics'],
    queryFn: () => fetchApi<CreatorMetrics>('/api/creator/analytics'),
  });
}

export function useCreatorWorkflows() {
  return useQuery({
    queryKey: ['creator-workflows'],
    queryFn: () => fetchApi<Workflow[]>('/api/creator/workflows'),
  });
}

export function useCreatorChart(days: number = 30) {
  return useQuery({
    queryKey: ['creator-chart', days],
    queryFn: () => fetchApi<Array<{ date: string; runs: number; revenue: number }>>(`/api/creator/analytics/chart?days=${days}`),
  });
}
