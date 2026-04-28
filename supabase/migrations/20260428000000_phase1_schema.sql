-- Phase 1 Foundation Schema
-- Supersedes 20240420000000_initial_schema.sql (never applied to production).
-- Apply this migration to a fresh Supabase project.

-- ─── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────────────────────────────────────
-- Mirrors auth.users; populated by a trigger on user creation.
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  role        text not null default 'operations' check (role in ('admin', 'operations')),
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile row when a new auth user is created
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    coalesce(new.raw_user_meta_data->>'role', 'operations')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Clients ─────────────────────────────────────────────────────────────────
create table if not exists public.clients (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  site_name       text,
  contact_person  text,
  contact_phone   text,
  contact_email   text,
  created_at      timestamptz not null default now()
);

alter table public.clients enable row level security;

create policy "Authenticated users can read clients"
  on public.clients for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert clients"
  on public.clients for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update clients"
  on public.clients for update
  using (auth.role() = 'authenticated');

-- ─── Jobs ────────────────────────────────────────────────────────────────────
create table if not exists public.jobs (
  id                  uuid primary key default uuid_generate_v4(),
  job_number          text not null default '',
  client_id           uuid references public.clients(id) on delete set null,
  asset_type          text,
  asset_description   text,
  problem_description text,
  pickup_address      text,
  mine_waybill_ref    text,
  urgency             text not null default 'standard' check (urgency in ('standard', 'urgent')),
  status              text not null default 'Requested' check (status in (
                        'Requested', 'Collected', 'At Workshop', 'At OEM',
                        'Quoting', 'Awaiting Approval', 'PO Received', 'In Repair',
                        'Ready for Delivery', 'Delivered', 'Closed',
                        'On Hold', 'Urgent', 'Delayed', 'Cancelled'
                      )),
  assigned_to         uuid references public.profiles(id) on delete set null,
  created_by          uuid references public.profiles(id) on delete set null,
  request_date        date,
  cancelled           boolean not null default false,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists jobs_status_idx      on public.jobs(status);
create index if not exists jobs_client_idx      on public.jobs(client_id);
create index if not exists jobs_created_at_idx  on public.jobs(created_at desc);
create index if not exists jobs_cancelled_idx   on public.jobs(cancelled);

alter table public.jobs enable row level security;

create policy "Authenticated users can read jobs"
  on public.jobs for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert jobs"
  on public.jobs for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update jobs"
  on public.jobs for update
  using (auth.role() = 'authenticated');

-- Auto-update updated_at on every row change
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger jobs_set_updated_at
  before update on public.jobs
  for each row execute procedure public.set_updated_at();

-- Auto-generate job_number in format PRO-YYYY-NNN when empty
create or replace function public.generate_job_number()
returns trigger language plpgsql as $$
declare
  yr    text := to_char(now(), 'YYYY');
  seq   int;
begin
  if new.job_number = '' or new.job_number is null then
    select count(*) + 1
      into seq
      from public.jobs
      where job_number like 'PRO-' || yr || '-%';
    new.job_number := 'PRO-' || yr || '-' || lpad(seq::text, 3, '0');
  end if;
  return new;
end;
$$;

create trigger jobs_generate_number
  before insert on public.jobs
  for each row execute procedure public.generate_job_number();

-- ─── Status Logs ─────────────────────────────────────────────────────────────
-- Append-only audit log; UPDATE and DELETE blocked by policy.
create table if not exists public.status_logs (
  id               uuid primary key default uuid_generate_v4(),
  job_id           uuid not null references public.jobs(id) on delete cascade,
  previous_status  text,
  new_status       text not null,
  changed_by       uuid references public.profiles(id) on delete set null,
  note             text,
  changed_at       timestamptz not null default now()
);

create index if not exists status_logs_job_idx on public.status_logs(job_id, changed_at desc);

alter table public.status_logs enable row level security;

create policy "Authenticated users can read status logs"
  on public.status_logs for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert status logs"
  on public.status_logs for insert
  with check (auth.role() = 'authenticated');

-- No UPDATE or DELETE policies — the table is intentionally append-only.

-- ─── Job Documents ───────────────────────────────────────────────────────────
create table if not exists public.job_documents (
  id            uuid primary key default uuid_generate_v4(),
  job_id        uuid not null references public.jobs(id) on delete cascade,
  file_name     text not null,
  storage_path  text not null,
  mime_type     text,
  uploaded_by   uuid references public.profiles(id) on delete set null,
  uploaded_at   timestamptz not null default now()
);

create index if not exists job_documents_job_idx on public.job_documents(job_id);

alter table public.job_documents enable row level security;

create policy "Authenticated users can read documents"
  on public.job_documents for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can insert documents"
  on public.job_documents for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can delete their own documents"
  on public.job_documents for delete
  using (auth.uid() = uploaded_by);

-- ─── Phase 2 Placeholder Tables ──────────────────────────────────────────────
-- Created empty now so Phase 2 can add columns without a drop/recreate.

create table if not exists public.oems (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.quotes (
  id          uuid primary key default uuid_generate_v4(),
  job_id      uuid references public.jobs(id) on delete cascade,
  version     int not null default 1,
  created_at  timestamptz not null default now(),
  unique (job_id, version)
);

create table if not exists public.waybills (
  id             uuid primary key default uuid_generate_v4(),
  job_id         uuid references public.jobs(id) on delete cascade,
  waybill_type   text check (waybill_type in ('mine', 'internal')),
  created_at     timestamptz not null default now()
);
