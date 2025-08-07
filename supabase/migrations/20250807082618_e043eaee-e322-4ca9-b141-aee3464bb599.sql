-- Fix register_organization parameter order to satisfy defaults rule
create or replace function public.register_organization(
  org_name text,
  contact_email text,
  domain text default null,
  primary_color text default '#1a73e8',
  secondary_color text default '#4285f4'
) returns uuid
language plpgsql
security definer
as $$
declare
  new_org_id uuid;
begin
  insert into public.organizations (name, domain, contact_email, primary_color, secondary_color)
  values (org_name, domain, contact_email, primary_color, secondary_color)
  returning id into new_org_id;

  insert into public.users (id, organization_id, name, email, role, status)
  values (auth.uid(), new_org_id, coalesce((auth.jwt() ->> 'user_metadata')::json->>'name','Admin'), contact_email, 'admin', 'active')
  on conflict (id) do update set organization_id = excluded.organization_id;

  return new_org_id;
end;
$$;