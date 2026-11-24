create or replace function public.seasoncaddy_google_calendar_daily_sync_data(p_secret text,p_user_id uuid) returns jsonb language plpgsql security definer set search_path=pg_catalog,public,extensions as $function$
declare v_saved_leagues jsonb; v_saved_sports jsonb; v_region text; v_competition_ids text[]:=array[]::text[]; v_sports text[]:=array[]::text[];
begin
if p_secret is null or encode(extensions.digest(convert_to(p_secret,'UTF8'),'sha256'),'hex') <> '2b782de39b85050247eedbed84b3ace42742180cefe03feac03c50f137232c71' then raise exception 'forbidden' using errcode='42501'; end if;
select coalesce(saved_leagues,'{}'::jsonb),coalesce(saved_sports,'[]'::jsonb),coalesce(region,'United States') into v_saved_leagues,v_saved_sports,v_region from public.user_caddy_preferences where user_id=p_user_id;
if not found then return jsonb_build_object('configured',false); end if;
select coalesce(array_agg(e.key),array[]::text[]) into v_competition_ids from jsonb_each(v_saved_leagues) e where jsonb_typeof(e.value)='array' and jsonb_array_length(e.value)>0;
if jsonb_typeof(v_saved_sports)='array' then select coalesce(array_agg(distinct lower(trim(s.value))),array[]::text[]) into v_sports from jsonb_array_elements_text(v_saved_sports) s(value) where trim(s.value)<>''; end if;
return jsonb_build_object(
'configured',true,'saved_leagues',v_saved_leagues,'saved_sports',v_saved_sports,'region',v_region,
'exclusions',(select coalesce(jsonb_agg(x.fixture_id),'[]'::jsonb) from public.user_google_calendar_fixture_exclusions x where x.user_id=p_user_id),
'catalog',(select coalesce(jsonb_agg(jsonb_build_object('sport',g.sport,'competition_id',g.competition_id,'Canonical name',g."Canonical name",'Aliases',to_jsonb(g."Aliases"))),'[]'::jsonb) from public."New Gate Name Table" g where g.active is true and g.competition_id=any(v_competition_ids)),
'fixtures',(select coalesce(jsonb_agg(jsonb_build_object('id',f.id,'competition_id',f.competition_id,'competition_name',f.competition_name,'sport',f.sport,'event_kind',f.event_kind,'event_name',f.event_name,'home',f.home,'away',f.away,'canonical_home',f.canonical_home,'canonical_away',f.canonical_away,'frontend_kickoff',f.frontend_kickoff,'scheduled_date',f.scheduled_date,'status',f.status,'round',f.round,'stage',f.stage,'providers',f.providers,'frontend_sort_at',f.frontend_sort_at)),'[]'::jsonb) from public.frontend_fixture_cache f where f.frontend_visible is true and f.frontend_sort_at>=now()-interval '6 hours' and (f.competition_id=any(v_competition_ids) or lower(f.sport)=any(v_sports)))
);
end; $function$;
revoke all on function public.seasoncaddy_google_calendar_daily_sync_data(text,uuid) from public;
grant execute on function public.seasoncaddy_google_calendar_daily_sync_data(text,uuid) to anon;