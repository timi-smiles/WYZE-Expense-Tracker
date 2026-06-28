"use client";

import { useCallback, useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { useSession } from "next-auth/react";
import { fetchDashboard } from "@/lib/utils/api-client";
import type { DashboardData } from "@/types/expense";

/**
 * Loads and refreshes dashboard data with category and search filters.
 */
export function useDashboard(
  selectedCategory: Category | "All",
  searchQuery: string
) {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dashboardData = await fetchDashboard(
        selectedCategory,
        searchQuery
      );
      setData(dashboardData);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load dashboard."
      );
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (session) {
      void loadDashboard();
    }
  }, [loadDashboard, session]);

  return {
    data,
    isLoading,
    error,
    refresh: loadDashboard,
    userName: session?.user?.name ?? "there",
  };
}
