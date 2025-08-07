-- Fix safe seeding for device_status: only if an organization exists
insert into public.device_status (id, organization_id, battery, connectivity, temperature, system_status)
select gen_random_uuid(), o.id, 85, 'Strong', 38, 'Active'
from public.organizations o
where exists (select 1 from public.organizations)
  and not exists (select 1 from public.device_status)
limit 1;