-- Insert dummy clients
INSERT INTO clients (id, name, site_name) VALUES 
  ('c1000000-0000-0000-0000-000000000001', 'Rustenburg Platinum Mine', 'Process Plant A'),
  ('c2000000-0000-0000-0000-000000000002', 'Sibanye Stillwater', 'Shaft 2'),
  ('c3000000-0000-0000-0000-000000000003', 'Anglo American Platinum', 'Main Plant');

-- Insert dummy OEMs
INSERT INTO oems (id, name, contact_person) VALUES 
  ('o1000000-0000-0000-0000-000000000001', 'Hydratech Repairs', 'John Doe'),
  ('o2000000-0000-0000-0000-000000000002', 'PneumaPro Services', 'Jane Smith'),
  ('o3000000-0000-0000-0000-000000000003', 'ValveMaster SA', 'Mike Johnson'),
  ('o4000000-0000-0000-0000-000000000004', 'CylTech Workshop', 'Sarah Williams');

-- Insert dummy jobs
INSERT INTO jobs (id, job_number, client_id, status, priority) VALUES 
  ('j1000000-0000-0000-0000-000000000001', 'PRO-2024-001', 'c1000000-0000-0000-0000-000000000001', 'awaiting_quote_approval', 'urgent'),
  ('j2000000-0000-0000-0000-000000000002', 'PRO-2024-002', 'c2000000-0000-0000-0000-000000000002', 'repair_in_progress', 'standard'),
  ('j3000000-0000-0000-0000-000000000003', 'PRO-2024-003', 'c3000000-0000-0000-0000-000000000003', 'workshop_intake', 'standard');
