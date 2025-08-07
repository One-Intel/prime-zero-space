-- Enable required extensions
create extension if not exists pgcrypto with schema public;

-- 1) Organizations table
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text unique,
  status text not null check (status in ('active','inactive','suspended')) default 'active',
  subscription_tier text not null check (subscription_tier in ('basic','premium','enterprise')) default 'basic',
  max_users integer not null default 10,
  max_devices integer not null default 5,
  logo_url text,
  primary_color text default '#1a73e8',
  secondary_color text default '#4285f4',
  timezone text not null default 'UTC',
  contact_email text not null,
  contact_phone text,
  address jsonb,
  settings jsonb default '{}'::jsonb,
  subscription_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2) Users table mapped to auth.users id
create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null check (role in ('admin','teacher','staff')) default 'staff',
  status text not null check (status in ('active','inactive')) default 'active',
  last_login timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3) Audit logs
create table if not exists public.organization_audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  action text not null,
  actor_id uuid references public.users(id) on delete set null,
  changes jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz not null default now()
);

-- 4) Alerts
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  title text not null,
  description text not null,
  severity text not null check (severity in ('low','medium','high')),
  source text not null check (source in ('system','user','device')),
  status text not null check (status in ('active','acknowledged','resolved')) default 'active',
  created_at timestamptz not null default now(),
  resolved_at timestamptz,
  created_by uuid references public.users(id) on delete set null
);

-- 5) Timetable templates
create table if not exists public.timetable_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  description text,
  is_active boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.users(id) on delete set null
);

-- 6) Weekly schedules
create table if not exists public.weekly_schedules (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.timetable_templates(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 0 and 6),
  is_active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 7) Audio presets
create table if not exists public.audio_presets (
  id integer primary key,
  name text not null,
  file_path text not null,
  volume integer check (volume between 0 and 100) default 70,
  duration integer,
  fade_in boolean default false,
  fade_out boolean default false,
  repeat_count integer default 1,
  description text,
  tags text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 8) Schedule items and related
create table if not exists public.schedule_items (
  id uuid primary key default gen_random_uuid(),
  weekly_schedule_id uuid references public.weekly_schedules(id) on delete cascade,
  title text not null,
  time time not null,
  location text not null,
  type text not null check (type in ('announcement','bell','activity')),
  audio_preset integer references public.audio_presets(id),
  repeat_pattern text[] check (repeat_pattern <@ array['MON','TUE','WED','THU','FRI','SAT','SUN'])
    ,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.users(id) on delete set null
);

-- 9) One-off schedules
create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date date not null,
  time time not null,
  location text not null,
  type text not null check (type in ('announcement','bell','activity')),
  audio_preset integer references public.audio_presets(id),
  status text not null check (status in ('upcoming','current','completed')) default 'upcoming',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.users(id) on delete set null
);

-- 10) Announcements
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  message text not null,
  type text not null check (type in ('text','voice')),
  audience text not null,
  scheduled boolean not null default false,
  scheduled_time timestamptz,
  status text not null check (status in ('draft','sent','scheduled')) default 'draft',
  timestamp timestamptz not null default now(),
  created_by uuid references public.users(id) on delete set null
);

-- 11) Device status and logs
create table if not exists public.device_status (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  battery integer not null,
  connectivity text not null,
  temperature numeric not null,
  system_status text not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.diagnostic_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null check (status in ('normal','warning','critical')),
  value text not null,
  timestamp timestamptz not null default now(),
  device_id uuid references public.device_status(id) on delete cascade
);

create table if not exists public.system_logs (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('info','warning','error')),
  message text not null,
  timestamp timestamptz not null default now(),
  device_id uuid references public.device_status(id) on delete cascade
);

-- 12) Bell patterns, exceptions, conditions, zones
create table if not exists public.bell_patterns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  pattern_type text not null check (pattern_type in ('single','sequence','custom')),
  sequence integer[],
  interval_seconds integer[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.schedule_exceptions (
  id uuid primary key default gen_random_uuid(),
  template_id uuid references public.timetable_templates(id) on delete cascade,
  name text not null,
  description text,
  start_date date not null,
  end_date date not null,
  exception_type text not null check (exception_type in ('holiday','special_schedule','cancellation')),
  replacement_schedule_id uuid references public.weekly_schedules(id),
  created_at timestamptz not null default now(),
  created_by uuid references public.users(id) on delete set null
);

create table if not exists public.schedule_conditions (
  id uuid primary key default gen_random_uuid(),
  schedule_item_id uuid references public.schedule_items(id) on delete cascade,
  condition_type text not null check (condition_type in ('weather','temperature','attendance','custom')),
  operator text not null check (operator in ('equals','not_equals','greater_than','less_than','between')),
  value jsonb not null,
  action text not null check (action in ('skip','delay','alternate','notify')),
  action_params jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.bell_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  location_tags text[],
  volume_adjustment integer check (volume_adjustment between -50 and 50) default 0,
  delay_seconds integer default 0,
  active boolean default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 13) Settings
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- Indexes
create index if not exists idx_users_organization_id on public.users(organization_id);
create index if not exists idx_alerts_organization_id on public.alerts(organization_id);
create index if not exists idx_device_status_organization_id on public.device_status(organization_id);
create index if not exists idx_timetable_templates_organization_id on public.timetable_templates(organization_id);
create index if not exists idx_audit_logs_organization_id on public.organization_audit_logs(organization_id);
create index if not exists idx_organizations_domain on public.organizations(domain);
create index if not exists idx_organizations_subscription_tier on public.organizations(subscription_tier);
create index if not exists idx_organizations_status on public.organizations(status);

-- Realtime identity
alter table public.users replica identity full;
alter table public.alerts replica identity full;
alter table public.schedules replica identity full;
alter table public.announcements replica identity full;
alter table public.device_status replica identity full;
alter table public.diagnostic_items replica identity full;
alter table public.system_logs replica identity full;
alter table public.audio_presets replica identity full;
alter table public.settings replica identity full;

-- Seed audio presets
insert into public.audio_presets (id, name, file_path, description)
values 
  (1, 'Morning Bell', 'morning-bell.mp3', 'Standard morning bell sound'),
  (2, 'Class Change', 'class-change.mp3', 'Bell for class period changes'),
  (3, 'Lunch Bell', 'lunch-bell.mp3', 'Bell indicating lunch period'),
  (4, 'Dismissal Bell', 'dismissal.mp3', 'End of day dismissal bell'),
  (5, 'Emergency Tone', 'emergency.mp3', 'Emergency notification sound'),
  (6, 'Fire Drill', 'fire-drill.mp3', 'Fire drill announcement tone'),
  (7, 'Lockdown', 'lockdown.mp3', 'Lockdown procedure announcement'),
  (8, 'All Clear', 'all-clear.mp3', 'All clear notification sound')
on conflict (id) do nothing;

-- SAFE seed device status only if an organization exists
insert into public.device_status (id, organization_id, battery, connectivity, temperature, system_status)
select gen_random_uuid(), o.id, 85, 'Strong', 38, 'Active'
from public.organizations o
where not exists (select 1 from public.device_status)
limit 1;

-- Functions: org context (optional) and get current user's org
create or replace function public.set_organization_context(org_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  perform set_config('app.current_organization_id', org_id::text, false);
end;
$$;

create or replace function public.current_user_org_id()
returns uuid
language sql
stable
security definer
as $$
  select organization_id from public.users where id = auth.uid();
$$;

-- Optional admin check helper
create or replace function public.user_is_admin()
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.users where id = auth.uid() and role = 'admin'
  );
$$;

-- Limits trigger function
create or replace function public.check_organization_limits()
returns trigger
language plpgsql
as $$
declare
  org_record record;
  current_count integer;
begin
  select * into org_record from public.organizations where id = new.organization_id;
  if tg_table_name = 'users' then
    select count(*) into current_count from public.users where organization_id = new.organization_id;
    if current_count >= coalesce(org_record.max_users, 0) then
      raise exception 'Organization has reached maximum user limit';
    end if;
  end if;
  if tg_table_name = 'device_status' then
    select count(*) into current_count from public.device_status where organization_id = new.organization_id;
    if current_count >= coalesce(org_record.max_devices, 0) then
      raise exception 'Organization has reached maximum device limit';
    end if;
  end if;
  return new;
end;
$$;

-- Audit trigger
create or replace function public.log_organization_changes()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.organization_audit_logs (
    organization_id,
    action,
    actor_id,
    changes,
    ip_address,
    user_agent
  ) values (
    coalesce(new.id, old.id),
    tg_op,
    auth.uid(),
    jsonb_build_object(
      'old_data', to_jsonb(old),
      'new_data', to_jsonb(new),
      'changed_at', now()
    ),
    coalesce(current_setting('request.headers', true)::json->>'x-forwarded-for','unknown'),
    coalesce(current_setting('request.headers', true)::json->>'user-agent','unknown')
  );
  return coalesce(new, old);
end;
$$;

-- Registration RPC to create org and link current user as admin
create or replace function public.register_organization(
  org_name text,
  domain text default null,
  contact_email text,
  primary_color text default '#1a73e8',
  secondary_color text default '#4285f4'
) returns uuid
language plpgsql
security definer
as $$
declare
  new_org_id uuid;
begin
  -- Create organization
  insert into public.organizations (name, domain, contact_email, primary_color, secondary_color)
  values (org_name, domain, contact_email, primary_color, secondary_color)
  returning id into new_org_id;

  -- Create users row mapped to current auth user
  insert into public.users (id, organization_id, name, email, role, status)
  values (auth.uid(), new_org_id, coalesce((auth.jwt() ->> 'user_metadata')::json->>'name','Admin'), contact_email, 'admin', 'active')
  on conflict (id) do update set organization_id = excluded.organization_id;

  return new_org_id;
end;
$$;

-- Simple transaction placeholder RPCs used by frontend (no-ops)
create or replace function public.begin_transaction() returns void language plpgsql as $$ begin null; end; $$;
create or replace function public.commit_transaction() returns void language plpgsql as $$ begin null; end; $$;
create or replace function public.rollback_transaction() returns void language plpgsql as $$ begin null; end; $$;

-- Triggers
drop trigger if exists check_user_limits on public.users;
create trigger check_user_limits
  before insert on public.users
  for each row execute function public.check_organization_limits();

drop trigger if exists check_device_limits on public.device_status;
create trigger check_device_limits
  before insert on public.device_status
  for each row execute function public.check_organization_limits();

drop trigger if exists log_organization_changes on public.organizations;
create trigger log_organization_changes
  after insert or update or delete on public.organizations
  for each row execute function public.log_organization_changes();

-- RLS enable
alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.alerts enable row level security;
alter table public.schedules enable row level security;
alter table public.announcements enable row level security;
alter table public.device_status enable row level security;
alter table public.diagnostic_items enable row level security;
alter table public.system_logs enable row level security;
alter table public.audio_presets enable row level security;
alter table public.settings enable row level security;
alter table public.timetable_templates enable row level security;
alter table public.weekly_schedules enable row level security;
alter table public.schedule_items enable row level security;
alter table public.bell_patterns enable row level security;
alter table public.schedule_exceptions enable row level security;
alter table public.schedule_conditions enable row level security;

-- Drop existing generic policies if any
drop policy if exists "Organization based access" on public.users;
drop policy if exists "Organization based access" on public.alerts;
drop policy if exists "Organization based access" on public.schedules;
drop policy if exists "Organization based access" on public.announcements;
drop policy if exists "Organization based access" on public.device_status;
drop policy if exists "Organization based access" on public.diagnostic_items;
drop policy if exists "Organization based access" on public.system_logs;
drop policy if exists "Organization based access" on public.audio_presets;
drop policy if exists "Organization based access" on public.settings;
drop policy if exists "Organization based access" on public.timetable_templates;
drop policy if exists "Organization based access" on public.weekly_schedules;
drop policy if exists "Organization based access" on public.schedule_items;
drop policy if exists "Organization based access" on public.bell_patterns;
drop policy if exists "Organization based access" on public.schedule_exceptions;
drop policy if exists "Organization based access" on public.schedule_conditions;
drop policy if exists "Organization based access" on public.organizations;

-- Policies using current_user_org_id()
create policy "Select own organization" on public.organizations
for select to authenticated using (id = public.current_user_org_id());

create policy "Insert organization for onboarding" on public.organizations
for insert to authenticated with check (true);

create policy "Update own organization if admin" on public.organizations
for update to authenticated using (id = public.current_user_org_id() and public.user_is_admin());

create policy "Users select in org" on public.users
for select to authenticated using (organization_id = public.current_user_org_id());

create policy "Users insert self on onboarding" on public.users
for insert to authenticated with check (id = auth.uid());

create policy "Users update in org" on public.users
for update to authenticated using (organization_id = public.current_user_org_id());

create policy "Org access alerts" on public.alerts for all to authenticated using (organization_id = public.current_user_org_id());
create policy "Org access device_status" on public.device_status for all to authenticated using (organization_id = public.current_user_org_id());
create policy "Org access timetable_templates" on public.timetable_templates for all to authenticated using (organization_id = public.current_user_org_id());

create policy "Select audio presets" on public.audio_presets for select to authenticated using (true);
create policy "Select bell patterns" on public.bell_patterns for select to authenticated using (true);
create policy "Select schedules" on public.schedules for select to authenticated using (true);
create policy "Select settings" on public.settings for select to authenticated using (true);
