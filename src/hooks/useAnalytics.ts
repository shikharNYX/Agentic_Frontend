/**
 * @author Healium Digital
 * Analytics Hook
 */

import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/services/api';
import { DateRange, AnalyticsResponse } from '@/types/analytics';

export function useAnalytics(dateRange: DateRange, channel?: string) {
  // Fetch main analytics data
  const analytics = useQuery<AnalyticsResponse>({
    queryKey: ['analytics', dateRange, channel],
    queryFn: () => analyticsApi.getAnalytics(dateRange, channel),
  });

  // Fetch regional performance
  const regionalPerformance = useQuery({
    queryKey: ['regionalPerformance', dateRange],
    queryFn: () => analyticsApi.getRegionalPerformance(dateRange),
  });

  // Fetch funnel data
  const funnelData = useQuery({
    queryKey: ['funnelData', dateRange],
    queryFn: () => analyticsApi.getFunnelData(dateRange),
  });

  return {
    analytics,
    regionalPerformance,
    funnelData,
    isLoading: analytics.isLoading || regionalPerformance.isLoading || funnelData.isLoading,
    isError: analytics.isError || regionalPerformance.isError || funnelData.isError,
    error: analytics.error || regionalPerformance.error || funnelData.error,
  };
} 