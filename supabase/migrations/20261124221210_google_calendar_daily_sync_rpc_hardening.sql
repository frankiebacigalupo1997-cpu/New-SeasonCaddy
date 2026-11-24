alter function public.seasoncaddy_google_calendar_daily_sync_data(text, uuid) set schema private;
create or replace function public.seasoncaddy_google_calendar_daily_sync_data(p_secret text, p_user_id uuid)
returns jsonb
language sql
security invoker
set search_path = pg_catalog, public, private
as $function$
  select private.seasoncaddy_google_calendar_daily_sync_data(p_secret, p_user_id);
$function$;
revoke all on function public.seasoncaddy_google_calendar_daily_sync_data(text, uuid) from public;
grant execute on function public.seasoncaddy_google_calendar_daily_sync_data(text, uuid) to anon;
grant usage on schema private to anon;
grant execute on function private.seasoncaddy_google_calendar_daily_sync_data(text, uuid) to anon;