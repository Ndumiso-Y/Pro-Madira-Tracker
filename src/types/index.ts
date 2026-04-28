export type JobStatus =
  | 'Requested'
  | 'Collected'
  | 'At Workshop'
  | 'At OEM'
  | 'Quoting'
  | 'Awaiting Approval'
  | 'PO Received'
  | 'In Repair'
  | 'Ready for Delivery'
  | 'Delivered'
  | 'Closed'
  | 'On Hold'
  | 'Urgent'
  | 'Delayed'
  | 'Cancelled';

export type JobUrgency = 'standard' | 'urgent';
export type UserRole = 'admin' | 'operations';

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
  active: boolean;
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  site_name: string | null;
  contact_person: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  created_at: string;
}

export interface Job {
  id: string;
  job_number: string;
  client_id: string | null;
  asset_type: string | null;
  asset_description: string | null;
  problem_description: string | null;
  pickup_address: string | null;
  mine_waybill_ref: string | null;
  urgency: JobUrgency;
  status: JobStatus;
  assigned_to: string | null;
  created_by: string | null;
  request_date: string | null;
  cancelled: boolean;
  created_at: string;
  updated_at: string;
  client?: Client;
}

export interface JobDocument {
  id: string;
  job_id: string;
  file_name: string;
  storage_path: string;
  mime_type: string | null;
  uploaded_by: string | null;
  uploaded_at: string;
  uploader?: Profile;
}

export interface StatusLog {
  id: string;
  job_id: string;
  previous_status: string | null;
  new_status: string;
  changed_by: string | null;
  note: string | null;
  changed_at: string;
  changer?: Profile;
}

export const JOB_STATUSES: JobStatus[] = [
  'Requested',
  'Collected',
  'At Workshop',
  'At OEM',
  'Quoting',
  'Awaiting Approval',
  'PO Received',
  'In Repair',
  'Ready for Delivery',
  'Delivered',
  'Closed',
  'On Hold',
  'Urgent',
  'Delayed',
  'Cancelled',
];

export const ASSET_TYPES = [
  'Hydraulic Cylinder',
  'Pump',
  'Valve',
  'Motor',
  'Gearbox',
  'Actuator',
  'Hose Assembly',
  'Bearing',
  'Seal Kit',
  'Other',
] as const;
