import { useState, useEffect } from 'react';
import {
  dashboardService,
  DashboardOverview,
  PerformanceAnalytics,
  ErrorAnalysis,
  ProvinceData,
} from '../services/dashboard.service';
import { handleApiError } from '../services/api.config';

export interface DashboardData {
  overview: DashboardOverview | null;
  performance: PerformanceAnalytics | null;
  errors: ErrorAnalysis | null;
  provinces: ProvinceData | null;
}

export const useDashboard = (provinsi?: string) => {
  const [data, setData] = useState<DashboardData>({
    overview: null,
    performance: null,
    errors: null,
    provinces: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const dashboardData = await dashboardService.getAllDashboardData(provinsi);

      setData({
        overview: dashboardData.overview,
        performance: dashboardData.performance,
        errors: dashboardData.errors,
        provinces: dashboardData.provinces,
      });
    } catch (err) {
      const apiError = handleApiError(err);
      setError(apiError.message);
      console.error('Dashboard data fetch error:', apiError);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchDashboardData();
  };

  useEffect(() => {
    fetchDashboardData();
  }, [provinsi]); // Re-fetch when provinsi changes

  return {
    data,
    loading,
    error,
    refetch,
  };
};
