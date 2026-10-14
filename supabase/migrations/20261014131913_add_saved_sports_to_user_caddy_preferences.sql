-- Persist sport-wide follows separately from team/competition selections.
-- Keep this column additive so existing preference rows remain valid.
alter table public.user_caddy_preferences
  add column if not exists saved_sports jsonb not null default '[]'::jsonb;

alter table public.user_caddy_preferences
  drop constraint if exists user_caddy_preferences_saved_sports_array_check;

alter table public.user_caddy_preferences
  add constraint user_caddy_preferences_saved_sports_array_check
  check (jsonb_typeof(saved_sports) = 'array');
