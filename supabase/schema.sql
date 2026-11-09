create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('admin', 'staff', 'client');
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'application_status') then
    create type application_status as enum ('submitted', 'document_check', 'in_process', 'approved', 'rejected');
  end if;
end $$;

create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone_number text,
  passport_number text,
  role user_role not null default 'client',
  created_at timestamptz not null default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  translations jsonb not null default '{}'::jsonb,
  requirements text[] not null default '{}',
  price numeric not null default 0,
  processing_time_days int not null default 1,
  icon_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone_number text not null,
  passport_number text,
  status application_status not null default 'submitted',
  is_published boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references users(id),
  client_record_id uuid references clients(id) on delete set null,
  service_id uuid not null references services(id),
  tracking_code text not null unique,
  status application_status not null default 'submitted',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists tracking_logs (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  status application_status not null,
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  translations jsonb not null default '{}'::jsonb,
  photo_url text,
  company text,
  testimonial_text text not null,
  rating int not null default 5 check (rating between 1 and 5),
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists site_content (
  section_key text primary key,
  title text,
  description text,
  translations jsonb not null default '{}'::jsonb,
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists company_values (
  id uuid primary key default gen_random_uuid(),
  icon_name text not null default 'ShieldCheck',
  title text not null,
  description text not null,
  translations jsonb not null default '{}'::jsonb,
  display_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists client_logos (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text not null,
  display_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor text not null default 'system',
  action text not null,
  entity_type text not null,
  entity_id text,
  detail text,
  created_at timestamptz not null default now()
);

alter table users add column if not exists email text;
alter table users add column if not exists phone_number text;
alter table users add column if not exists passport_number text;

alter table services add column if not exists requirements text[] not null default '{}';
alter table services add column if not exists processing_time_days int not null default 1;
alter table services add column if not exists icon_url text;
alter table services add column if not exists translations jsonb not null default '{}'::jsonb;

alter table clients add column if not exists is_published boolean not null default false;

alter table testimonials add column if not exists translations jsonb not null default '{}'::jsonb;
alter table site_content add column if not exists translations jsonb not null default '{}'::jsonb;
alter table company_values add column if not exists translations jsonb not null default '{}'::jsonb;

alter table orders add column if not exists client_record_id uuid references clients(id) on delete set null;

alter table users enable row level security;
alter table services enable row level security;
alter table clients enable row level security;
alter table orders enable row level security;
alter table tracking_logs enable row level security;
alter table testimonials enable row level security;
alter table site_content enable row level security;
alter table company_values enable row level security;
alter table client_logos enable row level security;
alter table activity_logs enable row level security;

create or replace function public.is_admin_or_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid() and role in ('admin', 'staff')
  );
$$;

drop policy if exists "users_select_self" on users;
create policy "users_select_self"
on users for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users_admin_all" on users;
create policy "users_admin_all"
on users for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "services_public_read" on services;
create policy "services_public_read"
on services for select
to anon, authenticated
using (is_active = true or public.is_admin_or_staff());

drop policy if exists "services_admin_write" on services;
create policy "services_admin_write"
on services for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "clients_admin_all" on clients;
create policy "clients_admin_all"
on clients for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "orders_admin_all" on orders;
create policy "orders_admin_all"
on orders for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "tracking_logs_admin_all" on tracking_logs;
create policy "tracking_logs_admin_all"
on tracking_logs for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "testimonials_admin_all" on testimonials;
create policy "testimonials_admin_all"
on testimonials for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "testimonials_public_read_visible" on testimonials;
create policy "testimonials_public_read_visible"
on testimonials for select
to anon, authenticated
using (is_visible = true or public.is_admin_or_staff());

drop policy if exists "site_content_admin_all" on site_content;
create policy "site_content_admin_all"
on site_content for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "site_content_public_read" on site_content;
create policy "site_content_public_read"
on site_content for select
to anon, authenticated
using (true);

drop policy if exists "company_values_admin_all" on company_values;
create policy "company_values_admin_all"
on company_values for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "company_values_public_read_visible" on company_values;
create policy "company_values_public_read_visible"
on company_values for select
to anon, authenticated
using (is_visible = true or public.is_admin_or_staff());

drop policy if exists "client_logos_admin_all" on client_logos;
create policy "client_logos_admin_all"
on client_logos for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());

drop policy if exists "client_logos_public_read_visible" on client_logos;
create policy "client_logos_public_read_visible"
on client_logos for select
to anon, authenticated
using (is_visible = true or public.is_admin_or_staff());

drop policy if exists "activity_logs_admin_all" on activity_logs;
create policy "activity_logs_admin_all"
on activity_logs for all
to authenticated
using (public.is_admin_or_staff())
with check (public.is_admin_or_staff());
