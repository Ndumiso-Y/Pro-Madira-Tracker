-- Create enums
CREATE TYPE asset_type AS ENUM ('cylinder', 'pump', 'valve', 'motor', 'gearbox', 'actuator', 'hose_assembly', 'other');
CREATE TYPE job_status AS ENUM ('requested', 'mine_waybill_issued', 'collected', 'workshop_intake', 'dispatched_to_oem', 'oem_assessment', 'awaiting_quote_approval', 'po_received', 'repair_in_progress', 'oem_return', 'ready_for_delivery', 'delivered', 'closed', 'on_hold', 'quote_rejected', 'beyond_repair', 'returned_unrepaired', 'delivery_rejected', 'disputed', 'cancelled');

CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text,
  phone text,
  site_name text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset_type asset_type NOT NULL,
  serial_number text,
  serial_number_status text DEFAULT 'confirmed',
  manufacturer text,
  model text,
  client_id uuid REFERENCES clients(id),
  current_location text DEFAULT 'at_client',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_number text UNIQUE NOT NULL,
  client_id uuid REFERENCES clients(id),
  status job_status NOT NULL DEFAULT 'requested',
  priority text NOT NULL DEFAULT 'standard',
  mine_waybill_ref text,
  mine_waybill_date date,
  notes text,
  assigned_to uuid,
  created_by uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE oems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text,
  phone text,
  specialisations text[],
  default_turnaround_days integer DEFAULT 14,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE job_line_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  asset_id uuid REFERENCES assets(id),
  description text NOT NULL,
  quantity integer DEFAULT 1,
  status text NOT NULL DEFAULT 'received',
  assigned_oem_id uuid REFERENCES oems(id),
  recommended_action text,
  oem_turnaround_days integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE waybills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  waybill_type text NOT NULL,
  job_id uuid REFERENCES jobs(id),
  waybill_number text,
  issuing_entity text,
  issued_by_user_id uuid,
  dispatch_date date,
  expected_return_date date,
  actual_return_date date,
  oem_id uuid REFERENCES oems(id),
  document_path text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE damage_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  line_item_id uuid REFERENCES job_line_items(id),
  reported_by_oem_id uuid REFERENCES oems(id),
  report_type text,
  failure_mode text,
  root_cause text,
  recommended_action text,
  estimated_repair_cost numeric(12,2),
  estimated_turnaround_days integer,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE quotes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  version integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'draft',
  oem_cost numeric(12,2),
  markup_amount numeric(12,2),
  client_total numeric(12,2),
  valid_until date,
  approved_by_name text,
  approved_at timestamptz,
  po_reference text,
  notes text,
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE deliveries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  delivery_type text,
  dispatched_date date,
  received_date date,
  received_by text,
  condition_notes text,
  rejected boolean DEFAULT false,
  rejection_reason text,
  document_path text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  entity_type text,
  entity_id uuid,
  document_type text,
  file_name text,
  storage_path text,
  storage_provider text DEFAULT 'supabase',
  visible_to_client boolean DEFAULT false,
  uploaded_by uuid,
  uploaded_at timestamptz DEFAULT now()
);

CREATE TABLE job_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id),
  event_type text,
  actor_id uuid,
  occurred_at timestamptz DEFAULT now(),
  previous_state text,
  new_state text,
  notes text,
  payload jsonb
);
