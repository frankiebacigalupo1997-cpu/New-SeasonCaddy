import {
  fetchFrontendCompetitionIdentity,
} from "@/lib/supabase-fixtures";

import type {
  FrontendCanonicalTeamRow,
  FrontendCatalogRow,
} from "@/lib/supabase-fixtures";

export type Preferences = {
  sport: string;
  league_id: string;
  teams: string[];
  region: string;

  saved_leagues?: Record<string, string[]>;
};

export type CloudService = {
  provider_id: string;
  service_email: string;
  service_password: string;
};

const PREFERENCES_KEY = "sportstream_preferences";
const SERVICES_KEY = "sportstream_services";
const PREFERENCES_CANONICALIZED_AT_KEY =
  "sportstream_preferences_canonicalized_at";
const PREFERENCES_CANONICAL_TTL_MS = 15 * 60 * 1000;

function identityKey(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function canonicalTeamForSavedLabel(
  competition: FrontendCatalogRow | undefined,
  label: string,
): FrontendCanonicalTeamRow | undefined {
  if (!competition || competition.canonicalTeams.length === 0) return undefined;

  const key = identityKey(label);

  return competition.canonicalTeams.find((team) =>
    [
      team.displayName,
      team.preferredName,
      ...team.aliases,
    ].some((candidate) => candidate && identityKey(candidate) === key),
  );
}

async function canonicalizePreferences(prefs: Preferences): Promise<Preferences> {
  if (!prefs.saved_leagues && (!prefs.league_id || prefs.teams.length === 0)) {
    return prefs;
  }

  try {
    const sourceSavedLeagues = prefs.saved_leagues ?? {
      [prefs.league_id]: prefs.teams,
    };

    const competitionIds = Array.from(
      new Set(Object.keys(sourceSavedLeagues).filter(Boolean)),
    ).sort();

    const catalog = await fetchFrontendCompetitionIdentity(competitionIds);
    const byCompetition = new Map(
      catalog.map((competition) => [competition.competitionId, competition]),
    );

    const saved_leagues: Record<string, string[]> = {};

    for (const [competitionId, savedValues] of Object.entries(sourceSavedLeagues)) {
      const competition = byCompetition.get(competitionId);
      const seen = new Set<string>();
      const canonicalValues: string[] = [];

      for (const savedValue of savedValues) {
        const trimmed = savedValue.trim();
        if (!trimmed) continue;

        // Legacy whole-competition sentinel. Keep it intact.
        const displayValue = trimmed === competitionId
          ? trimmed
          : canonicalTeamForSavedLabel(competition, trimmed)?.displayName ?? trimmed;

        const key = identityKey(displayValue);
        if (seen.has(key)) continue;

        seen.add(key);
        canonicalValues.push(displayValue);
      }

      saved_leagues[competitionId] = canonicalValues;
    }

    const legacyTeams = saved_leagues[prefs.league_id] ?? prefs.teams;

    return {
      ...prefs,
      teams: [...legacyTeams],
      saved_leagues,
    };
  } catch (error) {
    console.warn("Could not canonicalize saved-team preferences", error);
    return prefs;
  }
}

function canonicalizePreferencesInBackground(
  prefs: Preferences,
  sourceSnapshot: string,
) {
  void canonicalizePreferences(prefs)
    .then((canonical) => {
      /*
       * Never let a slower identity lookup overwrite a newer user edit. Only
       * apply the canonicalized result if the preference record is still the
       * same record that started this background normalization.
       */
      if (localStorage.getItem(PREFERENCES_KEY) !== sourceSnapshot) return;

      const canonicalSnapshot = JSON.stringify(canonical);

      if (canonicalSnapshot !== sourceSnapshot) {
        localStorage.setItem(PREFERENCES_KEY, canonicalSnapshot);
      }

      localStorage.setItem(
        PREFERENCES_CANONICALIZED_AT_KEY,
        String(Date.now()),
      );
    })
    .catch((error) => {
      console.warn("Could not canonicalize saved-team preferences", error);
    });
}

export async function fetchPreferences(options?: { canonicalize?: boolean }): Promise<Preferences | null> {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem(PREFERENCES_KEY);

  if (!saved) return null;

  try {
    const parsed = JSON.parse(saved) as Preferences;
    if (options?.canonicalize === false) {
      return parsed;
    }

    const canonicalizedAt = Number(
      localStorage.getItem(PREFERENCES_CANONICALIZED_AT_KEY),
    );

    if (
      !Number.isFinite(canonicalizedAt) ||
      Date.now() - canonicalizedAt >= PREFERENCES_CANONICAL_TTL_MS
    ) {
      /*
       * Identity normalization is an enhancement, not a page-load dependency.
       * Return the saved preferences immediately and canonicalize in the
       * background so a slow/failed identity request cannot block My Caddy.
       */
      canonicalizePreferencesInBackground(parsed, saved);
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function savePreferences(
  _userId: string,
  prefs: Preferences,
): Promise<void> {
  if (typeof window === "undefined") return;

  /* Persist the user's action immediately. Canonical identity normalization
   * follows asynchronously and is guarded against overwriting newer edits. */
  const snapshot = JSON.stringify(prefs);
  localStorage.setItem(PREFERENCES_KEY, snapshot);
  localStorage.removeItem(PREFERENCES_CANONICALIZED_AT_KEY);
  canonicalizePreferencesInBackground(prefs, snapshot);
}

export async function fetchServices(): Promise<CloudService[]> {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(SERVICES_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved) as CloudService[];
  } catch {
    return [];
  }
}

export async function upsertService(
  _userId: string,
  service: CloudService,
): Promise<void> {
  if (typeof window === "undefined") return;

  const services = await fetchServices();

  const existingIndex = services.findIndex(
    (item) => item.provider_id === service.provider_id,
  );

  if (existingIndex >= 0) {
    services[existingIndex] = service;
  } else {
    services.push(service);
  }

  localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}

export async function deleteService(providerId: string): Promise<void> {
  if (typeof window === "undefined") return;

  const services = await fetchServices();

  const updatedServices = services.filter(
    (service) => service.provider_id !== providerId,
  );

  localStorage.setItem(SERVICES_KEY, JSON.stringify(updatedServices));
}