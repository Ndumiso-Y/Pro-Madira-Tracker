import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mockData, mockJobs } from '../lib/utils';
import type { Job } from '../types';

const SUPABASE_CONFIGURED = !!(
  import.meta.env.VITE_SUPABASE_URL &&
  !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
);

const CLOSED_STATUSES = ['Closed', 'Cancelled', 'Delivered'];

export interface DashboardMetrics {
  totalActive: number;
  awaitingAction: number;
  overdue: number;
  closedThisMonth: number;
  recentJobs: Job[];
  chartData: { name: string; count: number }[];
  loading: boolean;
  error: string | null;
}

export function useDashboard(): DashboardMetrics {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalActive: 0,
    awaitingAction: 0,
    overdue: 0,
    closedThisMonth: 0,
    recentJobs: [],
    chartData: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      const activeJobs = mockJobs.filter(j => !CLOSED_STATUSES.includes(j.status));
      const statusCounts: Record<string, number> = {};
      activeJobs.forEach(j => {
        statusCounts[j.status] = (statusCounts[j.status] ?? 0) + 1;
      });
      setMetrics({
        totalActive: mockData.kpis.totalActive,
        awaitingAction: mockData.kpis.awaitingAction,
        overdue: mockData.kpis.overdue,
        closedThisMonth: mockData.kpis.closedThisMonth,
        recentJobs: mockJobs,
        chartData: mockData.chartData,
        loading: false,
        error: null,
      });
      return;
    }

    async function load() {
      const { data: jobs, error } = await supabase
        .from('jobs')
        .select('*, client:clients(id, name, site_name, contact_person, contact_phone, contact_email, created_at)')
        .eq('cancelled', false)
        .order('created_at', { ascending: false });

      if (error || !jobs) {
        setMetrics(m => ({ ...m, loading: false, error: error?.message ?? 'Failed to load' }));
        return;
      }

      const allJobs = jobs as Job[];
      const activeJobs = allJobs.filter(j => !CLOSED_STATUSES.includes(j.status));

      const overdueDate = new Date();
      overdueDate.setDate(overdueDate.getDate() - 14);

      const overdueJobs = activeJobs.filter(j => new Date(j.updated_at) < overdueDate);

      const awaitingStatuses = ['Awaiting Approval', 'Quoting', 'PO Received'];
      const awaitingAction = activeJobs.filter(j => awaitingStatuses.includes(j.status)).length;

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);
      const closedThisMonth = allJobs.filter(
        j => CLOSED_STATUSES.includes(j.status) && new Date(j.updated_at) >= monthStart
      ).length;

      const statusCounts: Record<string, number> = {};
      activeJobs.forEach(j => {
        statusCounts[j.status] = (statusCounts[j.status] ?? 0) + 1;
      });
      const chartData = Object.entries(statusCounts).map(([name, count]) => ({ name, count }));

      setMetrics({
        totalActive: activeJobs.length,
        awaitingAction,
        overdue: overdueJobs.length,
        closedThisMonth,
        recentJobs: allJobs.slice(0, 10),
        chartData,
        loading: false,
        error: null,
      });
    }

    load();
  }, []);

  return metrics;
}
