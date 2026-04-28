import type { JobStatus } from '../types';

// ─── Mock data kept for dormant-module previews ───────────────────────────────

export const mockData = {
  kpis: {
    totalActive: 42,
    awaitingAction: 15,
    overdue: 8,
    closedThisMonth: 124,
  },
  recentJobs: [
    { id: 'PRO-2026-001', client: 'Rustenburg Platinum', asset: 'Hydraulic Cylinder', status: 'Awaiting Approval' as JobStatus, priority: 'urgent', age: 4, assignedTo: 'Ops Team' },
    { id: 'PRO-2026-002', client: 'Sibanye Stillwater', asset: 'Pump', status: 'In Repair' as JobStatus, priority: 'standard', age: 12, assignedTo: 'OEM - ValveMaster' },
    { id: 'PRO-2026-003', client: 'Anglo American', asset: 'Gearbox', status: 'At Workshop' as JobStatus, priority: 'standard', age: 1, assignedTo: 'Receiving' },
    { id: 'PRO-2026-004', client: 'Rustenburg Platinum', asset: 'Motor', status: 'Ready for Delivery' as JobStatus, priority: 'standard', age: 18, assignedTo: 'Dispatch' },
    { id: 'PRO-2026-005', client: 'Sibanye Stillwater', asset: 'Actuator', status: 'PO Received' as JobStatus, priority: 'urgent', age: 6, assignedTo: 'Finance' },
  ],
  chartData: [
    { name: 'Requested', count: 4 },
    { name: 'At Workshop', count: 8 },
    { name: 'At OEM', count: 12 },
    { name: 'Quoting', count: 6 },
    { name: 'In Repair', count: 14 },
    { name: 'Delivery', count: 3 },
  ],
};

// ─── Phase 1 status colour map ────────────────────────────────────────────────

export const statusColors: Record<string, string> = {
  // Green — completed/delivered
  Closed: 'bg-green-100 text-green-700 border-green-200',
  Delivered: 'bg-green-100 text-green-700 border-green-200',
  // Yellow — awaiting decision
  'Awaiting Approval': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  // Red — urgent exception
  Urgent: 'bg-red-100 text-red-700 border-red-200',
  // Black — delayed exception
  Delayed: 'bg-slate-900 text-white border-slate-900',
  // Grey — paused
  'On Hold': 'bg-slate-100 text-slate-500 border-slate-200',
  Cancelled: 'bg-slate-100 text-slate-400 border-slate-200',
  // Blue — active workflow
  'At Workshop': 'bg-blue-100 text-blue-700 border-blue-200',
  'At OEM': 'bg-blue-100 text-blue-700 border-blue-200',
  'In Repair': 'bg-blue-100 text-blue-700 border-blue-200',
  Quoting: 'bg-blue-100 text-blue-700 border-blue-200',
  Collected: 'bg-blue-100 text-blue-700 border-blue-200',
  'PO Received': 'bg-blue-100 text-blue-700 border-blue-200',
  'Ready for Delivery': 'bg-blue-100 text-blue-700 border-blue-200',
  // Neutral — entry point
  Requested: 'bg-slate-100 text-slate-600 border-slate-200',
};

export const priorityColors: Record<string, string> = {
  standard: 'bg-slate-100 text-slate-700',
  urgent: 'bg-red-100 text-red-700',
};

export function getStatusColor(status: string): string {
  return statusColors[status] ?? 'bg-slate-100 text-slate-600 border-slate-200';
}
