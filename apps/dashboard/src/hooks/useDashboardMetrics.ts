import { useQuery } from "@tanstack/react-query";

import { getDashboardMetrics } from "@/api/dashboard";

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard-metrics"],
    queryFn: getDashboardMetrics,
    refetchInterval: 3000,
  });
}