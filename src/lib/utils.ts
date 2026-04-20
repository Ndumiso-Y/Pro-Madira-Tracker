export const mockData = {
  kpis: {
    totalActive: 42,
    awaitingAction: 15,
    overdue: 8,
    closedThisMonth: 124
  },
  recentJobs: [
    { id: 'PRO-2024-001', client: 'Rustenburg Platinum', asset: 'Hydraulic Cylinder', status: 'awaiting_quote_approval', priority: 'urgent', age: 4, assignedTo: 'Ops Team' },
    { id: 'PRO-2024-002', client: 'Sibanye Stillwater', asset: 'Pump', status: 'repair_in_progress', priority: 'standard', age: 12, assignedTo: 'OEM - ValveMaster' },
    { id: 'PRO-2024-003', client: 'Anglo American', asset: 'Gearbox', status: 'workshop_intake', priority: 'standard', age: 1, assignedTo: 'Receiving' },
    { id: 'PRO-2024-004', client: 'Rustenburg Platinum', asset: 'Motor', status: 'ready_for_delivery', priority: 'standard', age: 18, assignedTo: 'Dispatch' },
    { id: 'PRO-2024-005', client: 'Sibanye Stillwater', asset: 'Actuator', status: 'po_received', priority: 'urgent', age: 6, assignedTo: 'Finance' },
  ],
  chartData: [
    { name: 'Requested', count: 4 },
    { name: 'Intake', count: 8 },
    { name: 'At OEM', count: 12 },
    { name: 'Quoting', count: 6 },
    { name: 'Repairing', count: 14 },
    { name: 'Delivery', count: 3 }
  ]
};

export const statusColors: Record<string, string> = {
  requested: 'bg-slate-100 text-slate-700',
  workshop_intake: 'bg-slate-100 text-slate-700',
  collected: 'bg-slate-100 text-slate-700',
  dispatched_to_oem: 'bg-blue-100 text-blue-700',
  oem_assessment: 'bg-blue-100 text-blue-700',
  repair_in_progress: 'bg-blue-100 text-blue-700',
  awaiting_quote_approval: 'bg-amber-100 text-amber-700',
  po_received: 'bg-amber-100 text-amber-700',
  ready_for_delivery: 'bg-green-100 text-green-700',
  delivered: 'bg-green-100 text-green-700',
  closed: 'bg-green-100 text-green-700',
  on_hold: 'bg-amber-100 text-amber-700',
  quote_rejected: 'bg-amber-100 text-amber-700',
  beyond_repair: 'bg-red-100 text-red-700',
  returned_unrepaired: 'bg-red-100 text-red-700',
  delivery_rejected: 'bg-red-100 text-red-700',
};

export const priorityColors: Record<string, string> = {
  standard: 'bg-slate-100 text-slate-700',
  urgent: 'bg-red-100 text-red-700',
};
