import {
  createClient,
  type SupabaseClient,
} from "@supabase/supabase-js";

export type FrontendProviderRow = {
  providerId: string;
  providerName: string;
  region: string;
  eventUrl?: string;
  sourceUrl?: string;
  matchMethod?: string;
  matchConfidence?: number;
  evidence?: string;
  startTime?: string;
  endTime?: string;
};

export type FrontendFixtureRow = {
  id: string;
  competitionId: string;
  competitionName: string;
  sport: string;
  locationName?: string;
  countryName?: string;
  countryCode?: string;
  regionName?: string;
  confederation?: string;
  geoScope?: string;
  competitionGender?: string;
  competitionType?: string;
  geoConfidence?: number;
  geoReferenceId?: string;
  geoMatchMethod?: string;
  season?: string;
  eventKind?: string;
  eventName?: string;
  participants: unknown[];
  home: string;
  away: string;
  homeTeamId?: string;
  awayTeamId?: string;
  canonicalHome?: string;
  canonicalAway?: string;
  homeCrestUrl?: string;
  awayCrestUrl?: string;
  homeCrestSourceKind?: string;
  awayCrestSourceKind?: string;
  kickoff: string | null;
  scheduledDate?: string;
  status?: string;
  round?: string | number;
  stage?: string;
  venue?: string;
  sourceUrl?: string;
  providers: FrontendProviderRow[];
  providerCount: number;
  sortAt?: string;
  refreshedAt?: string;
};

export type FrontendCanonicalTeamRow = {
  teamId: string;
  displayName: string;
  preferredName?: string;
  gender?: string;
  aliases: string[];
  crestUrl?: string;
  crestSourceKind?: string;
  crestSourceUrl?: string;
  artworkStatus?: string;
  artworkConfidence?: number;
};

export type FrontendCatalogRow = {
  competitionId: string;
  competitionName: string;
  sport: string;
  locationName?: string;
  countryName?: string;
  countryCode?: string;
  regionName?: string;
  confederation?: string;
  geoScope?: string;
  competitionGender?: string;
  competitionType?: string;
  geoConfidence?: number;
  geoReferenceId?: string;
  geoMatchMethod?: string;
  teamNames: string[];
  canonicalTeams: FrontendCanonicalTeamRow[];
  providerIds: string[];
  fixtureCount: number;
  upcomingCount: number;
  firstEventDate?: string;
  lastEventDate?: string;
  nextEventAt?: string;
  refreshedAt?: string;
};

/*
 * Public sports data is intentionally read through a session-independent
 * Supabase client. The frontend fixture/catalog serving tables are public
 * read models with anon SELECT access, so these requests must not wait for
 * auth session recovery, token refresh, or the authenticated client's lock.
 *
 * Login/preferences continue to use the normal authenticated client elsewhere.
 */
const sportsDataSupabase = createClient<any>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storageKey: "seasoncaddy-public-data",
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
) as SupabaseClient<any>;

function stringValue(
  row: Record<string, unknown>,
  ...keys: string[]
): string | undefined {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return undefined;
}

function numberValue(
  row: Record<string, unknown>,
  ...keys: string[]
): number | undefined {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
  }
  return undefined;
}

function arrayValue(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

function stringArrayValue(value: unknown): string[] {
  return arrayValue(value)
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}


function normalizeCanonicalTeam(value: unknown): FrontendCanonicalTeamRow | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const teamId = stringValue(row, "team_id", "teamId");
  const displayName = stringValue(row, "display_name", "displayName");

  if (!teamId || !displayName) return null;

  return {
    teamId,
    displayName,
    preferredName: stringValue(row, "preferred_name", "preferredName"),
    gender: stringValue(row, "gender"),
    aliases: stringArrayValue(row.aliases),
    crestUrl: stringValue(row, "crest_url", "crestUrl"),
    crestSourceKind: stringValue(row, "crest_source_kind", "crestSourceKind"),
    crestSourceUrl: stringValue(row, "crest_source_url", "crestSourceUrl"),
    artworkStatus: stringValue(row, "artwork_status", "artworkStatus"),
    artworkConfidence: numberValue(row, "artwork_confidence", "artworkConfidence"),
  };
}

export function normalizeProviderRegion(region: string): string {
  const value = region.trim().toLowerCase();

  if (value === "us" || value === "usa" || value === "united states") {
    return "United States";
  }

  if (value === "uk" || value === "gb" || value === "united kingdom") {
    return "United Kingdom";
  }

  if (value === "ca" || value === "canada") {
    return "Canada";
  }

  if (value === "global" || value === "worldwide") {
    return "Global";
  }

  return region.trim();
}

function normalizeProvider(value: unknown): FrontendProviderRow | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const providerId = stringValue(row, "provider_id", "providerId", "id");

  if (!providerId) return null;

  // SeasonCaddy v1 serves U.S. availability only. The lean provider payload
  // intentionally omits region when the provider applies to the current U.S.
  // serving layer, so treat a missing region as United States rather than
  // Global. broadcast-api only emits explicitly supported regions, and using
  // Global here would silently drop otherwise valid provider_id/name links.
  const rawRegion = stringValue(row, "region", "territory") ?? "United States";

  return {
    providerId,
    providerName:
      stringValue(row, "provider_name", "providerName", "name") ?? providerId,
    region: normalizeProviderRegion(rawRegion),
    eventUrl: stringValue(row, "event_url", "eventUrl", "url"),
    sourceUrl: stringValue(row, "source_url", "sourceUrl"),
    matchMethod: stringValue(row, "match_method", "matchMethod"),
    matchConfidence: numberValue(row, "match_confidence", "matchConfidence", "confidence"),
    evidence: stringValue(row, "evidence", "match_evidence", "matchEvidence"),
    startTime: stringValue(row, "start_time", "startTime", "provider_start", "providerStart"),
    endTime: stringValue(row, "end_time", "endTime", "provider_end", "providerEnd"),
  };
}

export function normalizeFixture(value: unknown): FrontendFixtureRow | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;

  const id = stringValue(row, "id", "fixture_id", "fixtureId");
  const competitionId = stringValue(row, "competition_id", "competitionId");
  const sport = stringValue(row, "sport");
  const home = stringValue(row, "home", "home_team", "homeTeam");
  const away = stringValue(row, "away", "away_team", "awayTeam");

  if (!id || !competitionId || !sport || !home || !away) return null;

  const rawProviders = arrayValue(row.providers);
  const providers = rawProviders
    .map(normalizeProvider)
    .filter((provider): provider is FrontendProviderRow => provider !== null);

  return {
    id,
    competitionId,
    competitionName:
      stringValue(row, "competition_name", "competitionName", "competition", "league") ??
      competitionId,
    sport,
    locationName: stringValue(row, "location_name", "locationName"),
    countryName: stringValue(row, "country_name", "countryName"),
    countryCode: stringValue(row, "country_code", "countryCode"),
    regionName: stringValue(row, "region_name", "regionName"),
    confederation: stringValue(row, "confederation"),
    geoScope: stringValue(row, "geo_scope", "geoScope"),
    competitionGender: stringValue(
      row,
      "competition_gender",
      "competitionGender",
    ),
    competitionType: stringValue(row, "competition_type", "competitionType"),
    geoConfidence: numberValue(row, "geo_confidence", "geoConfidence"),
    geoReferenceId: stringValue(row, "geo_reference_id", "geoReferenceId"),
    geoMatchMethod: stringValue(row, "geo_match_method", "geoMatchMethod"),
    season: stringValue(row, "season"),
    eventKind: stringValue(row, "event_kind", "eventKind"),
    eventName: stringValue(row, "event_name", "eventName"),
    participants: arrayValue(row.participants),
    home,
    away,
    homeTeamId: stringValue(row, "home_team_id", "homeTeamId"),
    awayTeamId: stringValue(row, "away_team_id", "awayTeamId"),
    canonicalHome: stringValue(row, "canonical_home", "canonicalHome"),
    canonicalAway: stringValue(row, "canonical_away", "canonicalAway"),
    homeCrestUrl: stringValue(row, "home_crest_url", "homeCrestUrl"),
    awayCrestUrl: stringValue(row, "away_crest_url", "awayCrestUrl"),
    homeCrestSourceKind: stringValue(row, "home_crest_source_kind", "homeCrestSourceKind"),
    awayCrestSourceKind: stringValue(row, "away_crest_source_kind", "awayCrestSourceKind"),
    kickoff:
      stringValue(row, "frontend_kickoff", "frontendKickoff", "kickoff", "start_time", "startTime") ?? null,
    scheduledDate: stringValue(row, "scheduled_date", "scheduledDate"),
    status: stringValue(row, "status"),
    round: stringValue(row, "round") ?? numberValue(row, "round"),
    stage: stringValue(row, "stage"),
    venue: stringValue(row, "venue"),
    sourceUrl: stringValue(row, "source_url", "sourceUrl"),
    providers,
    providerCount: numberValue(row, "provider_count", "providerCount") ?? providers.length,
    sortAt: stringValue(row, "frontend_sort_at", "frontendSortAt", "sort_at", "sortAt"),
    refreshedAt: stringValue(row, "refreshed_at", "refreshedAt"),
  };
}

function normalizeCatalogRow(value: unknown): FrontendCatalogRow | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const row = value as Record<string, unknown>;
  const competitionId = stringValue(row, "competition_id", "competitionId");
  const sport = stringValue(row, "sport");

  if (!competitionId || !sport) return null;

  return {
    competitionId,
    competitionName:
      stringValue(row, "competition_name", "competitionName") ?? competitionId,
    sport,
    locationName: stringValue(row, "location_name", "locationName"),
    countryName: stringValue(row, "country_name", "countryName"),
    countryCode: stringValue(row, "country_code", "countryCode"),
    regionName: stringValue(row, "region_name", "regionName"),
    confederation: stringValue(row, "confederation"),
    geoScope: stringValue(row, "geo_scope", "geoScope"),
    competitionGender: stringValue(
      row,
      "competition_gender",
      "competitionGender",
    ),
    competitionType: stringValue(row, "competition_type", "competitionType"),
    geoConfidence: numberValue(row, "geo_confidence", "geoConfidence"),
    geoReferenceId: stringValue(row, "geo_reference_id", "geoReferenceId"),
    geoMatchMethod: stringValue(row, "geo_match_method", "geoMatchMethod"),
    teamNames: stringArrayValue(row.team_names ?? row.teamNames),
    canonicalTeams: arrayValue(row.canonical_teams ?? row.canonicalTeams)
      .map(normalizeCanonicalTeam)
      .filter((team): team is FrontendCanonicalTeamRow => team !== null),
    providerIds: stringArrayValue(row.provider_ids ?? row.providerIds),
    fixtureCount: numberValue(row, "fixture_count", "fixtureCount") ?? 0,
    upcomingCount: numberValue(row, "upcoming_count", "upcomingCount") ?? 0,
    firstEventDate: stringValue(row, "first_event_date", "firstEventDate"),
    lastEventDate: stringValue(row, "last_event_date", "lastEventDate"),
    nextEventAt: stringValue(row, "next_event_at", "nextEventAt"),
    refreshedAt: stringValue(row, "refreshed_at", "refreshedAt"),
  };
}

const SUPABASE_PAGE_SIZE = 1000;
const IDENTITY_CATALOG_CACHE_TTL_MS = 15 * 60 * 1000;

const FRONTEND_FIXTURE_SELECT = [
  "id",
  "competition_id",
  "competition_name",
  "sport",
  "event_kind",
  "event_name",
  "home",
  "away",
  "home_team_id",
  "away_team_id",
  "canonical_home",
  "canonical_away",
  "home_crest_url",
  "away_crest_url",
  "frontend_kickoff",
  "scheduled_date",
  "status",
  "round",
  "stage",
  "providers",
  "provider_count",
  "frontend_sort_at",
].join(",");

const FRONTEND_CATALOG_SUMMARY_SELECT = [
  "competition_id",
  "competition_name",
  "sport",
  "upcoming_count",
  "location_name",
  "country_name",
  "country_code",
  "region_name",
  "confederation",
  "geo_scope",
  "competition_gender",
  "competition_type",
  "geo_confidence",
  "geo_reference_id",
  "geo_match_method",
].join(",");

const FRONTEND_CATALOG_IDENTITY_SELECT = [
  "competition_id",
  "competition_name",
  "sport",
  "team_names",
  "canonical_teams",
  "provider_ids",
  "fixture_count",
  "upcoming_count",
  "first_event_date",
  "last_event_date",
  "next_event_at",
  "refreshed_at",
  "location_name",
  "country_name",
  "country_code",
  "region_name",
  "confederation",
  "geo_scope",
  "competition_gender",
  "competition_type",
  "geo_confidence",
  "geo_reference_id",
  "geo_match_method",
].join(",");

let identityCatalogCache: {
  data: FrontendCatalogRow[];
  expiresAt: number;
} | null = null;
let identityCatalogRequest: Promise<FrontendCatalogRow[]> | null = null;

const identityCompetitionCache = new Map<
  string,
  { data: FrontendCatalogRow; expiresAt: number }
>();

async function queryIdentityCatalog(competitionIds?: string[]) {
  let query = sportsDataSupabase
    .from("frontend_catalog_identity")
    .select(FRONTEND_CATALOG_IDENTITY_SELECT)
    .order("sport", { ascending: true })
    .order("competition_name", { ascending: true })
    .order("competition_id", { ascending: true });

  if (competitionIds?.length === 1) {
    query = query.eq("competition_id", competitionIds[0]);
  } else if (competitionIds && competitionIds.length > 1) {
    query = query.in("competition_id", competitionIds);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Supabase frontend_catalog_identity query failed: ${error.message}`);
  }

  return (Array.isArray(data) ? data : [])
    .map(normalizeCatalogRow)
    .filter((row): row is FrontendCatalogRow => row !== null);
}

export async function fetchFrontendIdentityCatalog(): Promise<FrontendCatalogRow[]> {
  const now = Date.now();

  if (identityCatalogCache && identityCatalogCache.expiresAt > now) {
    return identityCatalogCache.data;
  }

  identityCatalogRequest ??= queryIdentityCatalog()
    .then((data) => {
      identityCatalogCache = {
        data,
        expiresAt: Date.now() + IDENTITY_CATALOG_CACHE_TTL_MS,
      };

      return data;
    })
    .finally(() => {
      identityCatalogRequest = null;
    });

  return identityCatalogRequest;
}

export async function fetchFrontendCompetitionIdentity(
  competitionIds: string[],
): Promise<FrontendCatalogRow[]> {
  const normalizedCompetitionIds = Array.from(
    new Set(competitionIds.filter(Boolean)),
  ).sort();

  if (normalizedCompetitionIds.length === 0) {
    return [];
  }

  const now = Date.now();
  if (identityCatalogCache && identityCatalogCache.expiresAt > now) {
    const requestedIds = new Set(normalizedCompetitionIds);
    return identityCatalogCache.data.filter((row) => requestedIds.has(row.competitionId));
  }

  const cachedRows: FrontendCatalogRow[] = [];
  const missingIds: string[] = [];

  for (const competitionId of normalizedCompetitionIds) {
    const cached = identityCompetitionCache.get(competitionId);

    if (cached && cached.expiresAt > now) {
      cachedRows.push(cached.data);
    } else {
      if (cached) {
        identityCompetitionCache.delete(competitionId);
      }
      missingIds.push(competitionId);
    }
  }

  const fetchedRows = missingIds.length > 0
    ? await queryIdentityCatalog(missingIds)
    : [];

  const expiresAt = Date.now() + IDENTITY_CATALOG_CACHE_TTL_MS;
  for (const row of fetchedRows) {
    identityCompetitionCache.set(row.competitionId, {
      data: row,
      expiresAt,
    });
  }

  return [...cachedRows, ...fetchedRows].sort((a, b) => {
    const bySport = a.sport.localeCompare(b.sport);
    if (bySport !== 0) return bySport;

    const byName = a.competitionName.localeCompare(b.competitionName);
    if (byName !== 0) return byName;

    return a.competitionId.localeCompare(b.competitionId);
  });
}

export async function fetchFrontendCatalog(): Promise<FrontendCatalogRow[]> {
  const { data, error } = await sportsDataSupabase
    // Sports/competition navigation must not depend on the heavier identity
    // aggregation view. The serving cache already owns every summary field
    // needed by these dropdowns. Canonical teams are requested separately and
    // only for competitions that actually need them.
    .from("frontend_catalog_cache")
    .select(FRONTEND_CATALOG_SUMMARY_SELECT)
    .gt("upcoming_count", 0)
    .order("sport", { ascending: true })
    .order("competition_name", { ascending: true })
    .order("competition_id", { ascending: true });

  if (error) {
    throw new Error(`Supabase frontend_catalog_identity query failed: ${error.message}`);
  }

  return (Array.isArray(data) ? data : [])
    .map(normalizeCatalogRow)
    .filter((row): row is FrontendCatalogRow => row !== null);
}

export async function fetchFrontendHomeInitial(
  limit = 100,
): Promise<FrontendFixtureRow[]> {
  const safeLimit = Math.max(1, Math.min(250, Math.floor(limit)));
  const now = new Date();
  const liveFloor = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  /*
   * Read the public serving table directly for the first Home batch.
   *
   * This removes the Home page's dependency on one RPC call. If PostgREST's
   * RPC path is temporarily stale/unavailable after backend maintenance, the
   * public fixture read model can still populate Home immediately.
   *
   * Preserve the existing serving behavior: live fixtures first, followed by
   * the next upcoming fixtures.
   */
  const [liveResult, upcomingResult] = await Promise.all([
    sportsDataSupabase
      .from("frontend_fixture_cache")
      .select(FRONTEND_FIXTURE_SELECT)
      .eq("frontend_visible", true)
      .eq("status", "live")
      .gte("frontend_sort_at", liveFloor.toISOString())
      .order("frontend_sort_at", { ascending: true, nullsFirst: false })
      .order("id", { ascending: true })
      .limit(Math.min(25, safeLimit)),
    sportsDataSupabase
      .from("frontend_fixture_cache")
      .select(FRONTEND_FIXTURE_SELECT)
      .eq("frontend_visible", true)
      .gte("frontend_sort_at", now.toISOString())
      .order("frontend_sort_at", { ascending: true, nullsFirst: false })
      .order("id", { ascending: true })
      .limit(safeLimit),
  ]);

  if (liveResult.error) {
    throw new Error(
      `Supabase initial Home live fixture feed failed: ${liveResult.error.message}`,
    );
  }

  if (upcomingResult.error) {
    throw new Error(
      `Supabase initial Home upcoming fixture feed failed: ${upcomingResult.error.message}`,
    );
  }

  const liveFixtures = (Array.isArray(liveResult.data) ? liveResult.data : [])
    .map(normalizeFixture)
    .filter((fixture): fixture is FrontendFixtureRow => fixture !== null);

  const upcomingFixtures = (
    Array.isArray(upcomingResult.data) ? upcomingResult.data : []
  )
    .map(normalizeFixture)
    .filter((fixture): fixture is FrontendFixtureRow => fixture !== null);

  const byId = new Map<string, FrontendFixtureRow>();

  for (const fixture of [...liveFixtures, ...upcomingFixtures]) {
    if (!byId.has(fixture.id)) {
      byId.set(fixture.id, fixture);
    }
  }

  return Array.from(byId.values()).slice(0, safeLimit);
}

export async function fetchFrontendFixtureById(
  fixtureId: string,
): Promise<FrontendFixtureRow | null> {
  const { data, error } = await sportsDataSupabase
    .from("frontend_fixture_cache")
    .select(FRONTEND_FIXTURE_SELECT)
    .eq("frontend_visible", true)
    .eq("id", fixtureId)
    .maybeSingle();

  if (error) {
    throw new Error(`Supabase frontend fixture cache lookup failed: ${error.message}`);
  }

  return data ? normalizeFixture(data) : null;
}

export async function fetchFrontendFixtures(
  competitionIds?: string | string[],
  options?: {
    limit?: number;
    offset?: number;
    sortAtOrAfter?: string;
    statusIn?: string[];
    canonicalHomeIn?: string[];
    canonicalAwayIn?: string[];
  },
): Promise<FrontendFixtureRow[]> {
  const normalizedCompetitionIds = Array.isArray(competitionIds)
    ? Array.from(new Set(competitionIds.filter(Boolean))).sort()
    : competitionIds
      ? [competitionIds]
      : [];

  const requestedLimit = options?.limit;
  const rows: unknown[] = [];
  let offset = Math.max(0, options?.offset ?? 0);

  while (true) {
    const pageSize = requestedLimit
      ? Math.min(SUPABASE_PAGE_SIZE, Math.max(0, requestedLimit - rows.length))
      : SUPABASE_PAGE_SIZE;

    if (pageSize <= 0) break;

    let query = sportsDataSupabase
      .from("frontend_fixture_cache")
      .select(FRONTEND_FIXTURE_SELECT)
      .eq("frontend_visible", true)
      .order("frontend_sort_at", { ascending: true, nullsFirst: false })
      .order("id", { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (options?.sortAtOrAfter) {
      query = query.gte(
        "frontend_sort_at",
        options.sortAtOrAfter,
      );
    }

    if (options?.statusIn?.length) {
      query = query.in(
        "status",
        options.statusIn,
      );
    }

    if (options?.canonicalHomeIn?.length) {
      query = query.in(
        "canonical_home",
        options.canonicalHomeIn,
      );
    }

    if (options?.canonicalAwayIn?.length) {
      query = query.in(
        "canonical_away",
        options.canonicalAwayIn,
      );
    }

    if (normalizedCompetitionIds.length === 1) {
      query = query.eq("competition_id", normalizedCompetitionIds[0]);
    } else if (normalizedCompetitionIds.length > 1) {
      query = query.in("competition_id", normalizedCompetitionIds);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Supabase frontend fixture cache query failed: ${error.message}`);
    }

    const page = Array.isArray(data) ? data : [];
    rows.push(...page);

    if (page.length < pageSize) break;
    if (requestedLimit && rows.length >= requestedLimit) break;
    offset += pageSize;
  }

  return rows
    .map(normalizeFixture)
    .filter((fixture): fixture is FrontendFixtureRow => fixture !== null);
}


function identityLookupKey(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function resolveSavedTeamLabels(
  competition: FrontendCatalogRow | undefined,
  savedLabels: string[],
): { canonicalNames: string[]; allResolved: boolean } {
  if (!competition || competition.canonicalTeams.length === 0) {
    return { canonicalNames: [], allResolved: false };
  }

  const canonicalNames: string[] = [];

  for (const savedLabel of savedLabels) {
    const key = identityLookupKey(savedLabel);
    const match = competition.canonicalTeams.find((team) =>
      [team.displayName, team.preferredName, ...team.aliases].some(
        (candidate) => candidate && identityLookupKey(candidate) === key,
      ),
    );

    if (!match) {
      return { canonicalNames: [], allResolved: false };
    }

    canonicalNames.push(match.displayName);
  }

  return {
    canonicalNames: Array.from(new Set(canonicalNames)).sort(),
    allResolved: true,
  };
}

const MAX_TEAM_NAMES_PER_FILTERED_QUERY = 24;

export async function fetchFrontendFixturesForSavedTeams(
  savedLeagues: Record<string, string[]>,
): Promise<FrontendFixtureRow[]> {
  const entries = Object.entries(savedLeagues)
    .map(([competitionId, teamNames]) => [
      competitionId,
      Array.from(
        new Set(
          teamNames
            .map((teamName) => teamName.trim())
            .filter(Boolean),
        ),
      ).sort(),
    ] as const)
    .filter(([, teamNames]) => teamNames.length > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  if (entries.length === 0) {
    return [];
  }

  const competitionIds = entries.map(([competitionId]) => competitionId);
  let identityByCompetition = new Map<string, FrontendCatalogRow>();

  try {
    const identityRows = await fetchFrontendCompetitionIdentity(competitionIds);
    identityByCompetition = new Map(
      identityRows.map((competition) => [competition.competitionId, competition]),
    );
  } catch (error) {
    // Identity is an optimization here, not a correctness dependency. If it
    // cannot be loaded, fall back to the established full-competition reads.
    console.warn("Could not resolve saved-team identity filters", error);
  }

  const resultSets = await Promise.all(
    entries.map(async ([competitionId, teamNames]) => {
      /*
       * A very large saved-team set is usually equivalent to following most
       * or all of a competition. Falling back to the established competition
       * query avoids oversized PostgREST URLs while preserving exact output.
       */
      if (
        teamNames.includes(competitionId) ||
        teamNames.length > MAX_TEAM_NAMES_PER_FILTERED_QUERY
      ) {
        return fetchFrontendFixtures(competitionId);
      }

      const { canonicalNames, allResolved } = resolveSavedTeamLabels(
        identityByCompetition.get(competitionId),
        teamNames,
      );

      /*
       * Never let identity migration become a correctness requirement. If any
       * saved legacy label/alias cannot be mapped confidently, use the original
       * full competition query and let the existing client-side matching logic
       * decide what belongs to the user's caddy.
       */
      if (!allResolved || canonicalNames.length === 0) {
        return fetchFrontendFixtures(competitionId);
      }

      const [homeRows, awayRows] = await Promise.all([
        fetchFrontendFixtures(competitionId, {
          canonicalHomeIn: canonicalNames,
        }),
        fetchFrontendFixtures(competitionId, {
          canonicalAwayIn: canonicalNames,
        }),
      ]);

      const byId = new Map<string, FrontendFixtureRow>();

      for (const fixture of [...homeRows, ...awayRows]) {
        byId.set(fixture.id, fixture);
      }

      return Array.from(byId.values());
    }),
  );

  const byId = new Map<string, FrontendFixtureRow>();

  for (const fixture of resultSets.flat()) {
    byId.set(fixture.id, fixture);
  }

  return Array.from(byId.values()).sort((a, b) => {
    const aSort = a.sortAt ?? a.kickoff ?? "9999-12-31T23:59:59.999Z";
    const bSort = b.sortAt ?? b.kickoff ?? "9999-12-31T23:59:59.999Z";
    const byTime = aSort.localeCompare(bSort);
    return byTime !== 0 ? byTime : a.id.localeCompare(b.id);
  });
}

export function catalogDisplayTeamNames(row: FrontendCatalogRow): string[] {
  /*
   * Identity coverage is intentionally allowed to be partial while the
   * canonical scan works through the catalog. Do not replace the established
   * fixture-derived team list just because at least one canonical identity
   * exists: doing that made unresolved teams disappear from My Teams.
   *
   * Prefer the canonical display name for any raw/legacy name that can be
   * matched to a canonical team's display name, preferred name, or alias, and
   * preserve unmatched legacy names as a fallback.
   */
  const canonicalByKey = new Map<string, string>();
  const displayNames = new Set<string>();

  for (const team of row.canonicalTeams) {
    const displayName = team.displayName.trim();
    if (!displayName) continue;

    displayNames.add(displayName);

    for (const candidate of [
      team.displayName,
      team.preferredName,
      ...team.aliases,
    ]) {
      if (!candidate) continue;
      canonicalByKey.set(identityLookupKey(candidate), displayName);
    }
  }

  for (const rawName of row.teamNames) {
    const trimmed = rawName.trim();
    if (!trimmed) continue;

    const canonicalName = canonicalByKey.get(identityLookupKey(trimmed));
    displayNames.add(canonicalName ?? trimmed);
  }

  return Array.from(displayNames).sort((a, b) => a.localeCompare(b));
}
