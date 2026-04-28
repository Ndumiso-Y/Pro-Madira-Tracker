import type { Job, JobStatus } from '../types';

// ─── Mock data kept for dormant-module previews ───────────────────────────────

const now = new Date();
const daysAgo = (d: number) => new Date(now.getTime() - d * 86_400_000).toISOString();

export const mockJobs: Job[] = [
  { id: 'mock-1', job_number: 'PRO-2026-001', client_id: null, urgency: 'urgent',   status: 'Awaiting Approval',  asset_type: 'Hydraulic Cylinder', asset_description: '200mm bore double-acting', problem_description: 'Leaking from rod seal', pickup_address: null, mine_waybill_ref: 'WB-001', request_date: daysAgo(4),  assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(4),  updated_at: daysAgo(1),  client: { id: 'c1', name: 'Rustenburg Platinum Mine', site_name: 'Process Plant A', contact_person: 'Mark Evans',    contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-2', job_number: 'PRO-2026-002', client_id: null, urgency: 'standard', status: 'In Repair',           asset_type: 'Pump',               asset_description: 'Gear pump 50cc/rev',       problem_description: 'Loss of pressure at full speed', pickup_address: null, mine_waybill_ref: 'WB-002', request_date: daysAgo(12), assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(12), updated_at: daysAgo(2),  client: { id: 'c2', name: 'Sibanye Stillwater',        site_name: 'Shaft 2 East',    contact_person: 'Sarah Jenkins', contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-3', job_number: 'PRO-2026-003', client_id: null, urgency: 'standard', status: 'At Workshop',         asset_type: 'Gearbox',            asset_description: 'Helical 3-stage gearbox',  problem_description: 'Gear tooth fracture', pickup_address: null, mine_waybill_ref: 'WB-003', request_date: daysAgo(1),  assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(1),  updated_at: daysAgo(0),  client: { id: 'c3', name: 'Anglo American Platinum',   site_name: 'Main Processing', contact_person: 'David Smith',   contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-4', job_number: 'PRO-2026-004', client_id: null, urgency: 'standard', status: 'Ready for Delivery',  asset_type: 'Motor',              asset_description: 'Hydraulic orbit motor',    problem_description: 'Seized — internal scoring', pickup_address: null, mine_waybill_ref: 'WB-004', request_date: daysAgo(18), assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(18), updated_at: daysAgo(3),  client: { id: 'c1', name: 'Rustenburg Platinum Mine', site_name: 'Process Plant A', contact_person: 'Mark Evans',    contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-5', job_number: 'PRO-2026-005', client_id: null, urgency: 'urgent',   status: 'PO Received',         asset_type: 'Actuator',           asset_description: 'Pneumatic rack & pinion',  problem_description: 'Rod bent, seal failure', pickup_address: null, mine_waybill_ref: 'WB-005', request_date: daysAgo(6),  assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(6),  updated_at: daysAgo(1),  client: { id: 'c2', name: 'Sibanye Stillwater',        site_name: 'Shaft 2 East',    contact_person: 'Sarah Jenkins', contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-6', job_number: 'PRO-2026-006', client_id: null, urgency: 'standard', status: 'Quoting',             asset_type: 'Valve',              asset_description: 'Solenoid directional valve', problem_description: 'Coil burnt out, no actuation', pickup_address: null, mine_waybill_ref: 'WB-006', request_date: daysAgo(8),  assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(8),  updated_at: daysAgo(2),  client: { id: 'c4', name: 'Impala Platinum',           site_name: 'North Shaft',     contact_person: 'Thabo Mokoena', contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-7', job_number: 'PRO-2026-007', client_id: null, urgency: 'standard', status: 'Collected',           asset_type: 'Hose Assembly',      asset_description: '2-inch braided pressure',  problem_description: 'Hose burst at fitting', pickup_address: null, mine_waybill_ref: 'WB-007', request_date: daysAgo(3),  assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(3),  updated_at: daysAgo(1),  client: { id: 'c3', name: 'Anglo American Platinum',   site_name: 'Main Processing', contact_person: 'David Smith',   contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-8', job_number: 'PRO-2026-008', client_id: null, urgency: 'standard', status: 'Delayed',             asset_type: 'Motor',              asset_description: 'Wheel drive hydraulic',    problem_description: 'OEM parts backordered', pickup_address: null, mine_waybill_ref: 'WB-008', request_date: daysAgo(19), assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(19), updated_at: daysAgo(4),  client: { id: 'c1', name: 'Rustenburg Platinum Mine', site_name: 'Process Plant A', contact_person: 'Mark Evans',    contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-9', job_number: 'PRO-2026-009', client_id: null, urgency: 'standard', status: 'On Hold',             asset_type: 'Bearing',            asset_description: 'Spherical roller bearing', problem_description: 'Awaiting client approval', pickup_address: null, mine_waybill_ref: 'WB-009', request_date: daysAgo(9),  assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(9),  updated_at: daysAgo(5),  client: { id: 'c4', name: 'Impala Platinum',           site_name: 'North Shaft',     contact_person: 'Thabo Mokoena', contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
  { id: 'mock-A', job_number: 'PRO-2026-010', client_id: null, urgency: 'urgent',   status: 'At Workshop',         asset_type: 'Hydraulic Cylinder', asset_description: '80mm bore steering ram',   problem_description: 'Ram collapsed — production stop', pickup_address: null, mine_waybill_ref: 'WB-010', request_date: daysAgo(0),  assigned_to: null, created_by: null, cancelled: false, created_at: daysAgo(0),  updated_at: daysAgo(0),  client: { id: 'c2', name: 'Sibanye Stillwater',        site_name: 'Shaft 2 East',    contact_person: 'Sarah Jenkins', contact_phone: null, contact_email: null, created_at: daysAgo(90) } },
];

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
