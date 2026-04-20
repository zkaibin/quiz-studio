-- Quiz Records table for Quiz Studio
-- Run this in Supabase SQL Editor after supabase-auth-setup.sql

-- 1) Quiz records table linked to auth.users
create table if not exists public.quiz_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  student_name text,
  subject text,
  category text,
  difficulty text,
  theme text,
  score integer not null,
  total_questions integer not null,
  percentage integer not null,
  questions jsonb not null,
  answers jsonb not null,
  completed_at timestamptz not null default now()
);

-- 1a) Add subject column to existing installations (safe to run on new installs too)
alter table public.quiz_records add column if not exists subject text;

-- 2) Index for fast per-user lookup
create index if not exists quiz_records_user_id_idx
  on public.quiz_records (user_id, completed_at desc);

-- 3) Enable Row Level Security
alter table public.quiz_records enable row level security;

-- 4) Policies: users can only access their own records
drop policy if exists "quiz_records_select_own" on public.quiz_records;
create policy "quiz_records_select_own"
on public.quiz_records
for select
using (auth.uid() = user_id);

drop policy if exists "quiz_records_insert_own" on public.quiz_records;
create policy "quiz_records_insert_own"
on public.quiz_records
for insert
with check (auth.uid() = user_id);

drop policy if exists "quiz_records_delete_own" on public.quiz_records;
create policy "quiz_records_delete_own"
on public.quiz_records
for delete
using (auth.uid() = user_id);
