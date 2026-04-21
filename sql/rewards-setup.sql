-- Reward System setup for Quiz Studio
-- Run this in Supabase SQL Editor AFTER supabase-auth-setup.sql and quiz-records-setup.sql

-- 1) Add points_earned column to quiz_records
alter table public.quiz_records
  add column if not exists points_earned integer not null default 0;

-- 2) Add totals columns to profiles
alter table public.profiles
  add column if not exists total_points integer not null default 0;

alter table public.profiles
  add column if not exists total_quizzes integer not null default 0;

-- 3) RPC: atomically increment a user's total_points and total_quizzes
create or replace function public.add_quiz_points(p_user_id uuid, p_pts integer)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set
    total_points  = total_points  + p_pts,
    total_quizzes = total_quizzes + 1
  where id = p_user_id;
end;
$$;

-- 4) Create a public leaderboard view (top 50 by total_points)
create or replace view public.leaderboard as
select
  id,
  display_name,
  avatar_url,
  total_points,
  total_quizzes
from public.profiles
where total_quizzes > 0
order by total_points desc
limit 50;

-- 5) Allow anyone (including anonymous) to read profiles for leaderboard display
drop policy if exists "profiles_select_public" on public.profiles;
create policy "profiles_select_public"
on public.profiles
for select
to anon, authenticated
using (true);

-- Note: the existing "profiles_select_own" policy is superseded by the broader
-- "profiles_select_public" policy above, so both can coexist safely.
-- The write policies (insert/update) still restrict to own row only.
