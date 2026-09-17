import {
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";

import {
  fetchCatalog,
  fetchDatasetForSavedTeams,
  fetchGlobalInitialUpcomingDataset,
  fetchGlobalUpcomingDataset,
  fetchUpcomingDatasetForCompetitions,
} from "@/lib/frontend-data";

import {
  fetchFrontendCompetitionIdentity,
  fetchFrontendIdentityCatalog,
} from "@/lib/supabase-fixtures";

const SPORTS_DATA_STALE_TIME = 15 * 60 * 1000;
const SPORTS_DATA_GC_TIME = 30 * 60 * 1000;

export const frontendCatalogQueryOptions = queryOptions({
  queryKey: ["frontend-catalog"],
  queryFn: fetchCatalog,
  staleTime: SPORTS_DATA_STALE_TIME,
  gcTime: SPORTS_DATA_GC_TIME,
  retry: 1,
  refetchOnWindowFocus: false,
});

export const frontendIdentityCatalogQueryOptions = queryOptions({
  queryKey: ["frontend-catalog-identity"],
  queryFn: fetchFrontendIdentityCatalog,
  staleTime: SPORTS_DATA_STALE_TIME,
  gcTime: SPORTS_DATA_GC_TIME,
  retry: 1,
  refetchOnWindowFocus: false,
});

export function competitionIdentityCatalogQueryOptions(competitionIds: string[]) {
  const normalizedIds = Array.from(new Set(competitionIds.filter(Boolean))).sort();

  return queryOptions({
    queryKey: ["frontend-catalog-identity", "competitions", ...normalizedIds],
    queryFn: () => fetchFrontendCompetitionIdentity(normalizedIds),
    enabled: normalizedIds.length > 0,
    staleTime: SPORTS_DATA_STALE_TIME,
    gcTime: SPORTS_DATA_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function upcomingCompetitionDatasetQueryOptions(competitionIds: string[]) {
  const normalizedIds = Array.from(new Set(competitionIds.filter(Boolean))).sort();

  return queryOptions({
    queryKey: ["frontend-dataset", "upcoming", ...normalizedIds],
    queryFn: () => fetchUpcomingDatasetForCompetitions(normalizedIds),
    enabled: normalizedIds.length > 0,
    staleTime: SPORTS_DATA_STALE_TIME,
    gcTime: SPORTS_DATA_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function savedTeamsDatasetQueryOptions(
  savedLeagues: Record<string, string[]>,
) {
  const normalizedEntries = Object.entries(savedLeagues)
    .map(([competitionId, teamNames]) => [
      competitionId,
      Array.from(
        new Set(teamNames.map((teamName) => teamName.trim()).filter(Boolean)),
      ).sort(),
    ] as const)
    .filter(([, teamNames]) => teamNames.length > 0)
    .sort(([a], [b]) => a.localeCompare(b));

  const normalizedSavedLeagues = Object.fromEntries(normalizedEntries);

  return queryOptions({
    queryKey: ["frontend-dataset", "saved-teams", normalizedEntries],
    queryFn: () => fetchDatasetForSavedTeams(normalizedSavedLeagues),
    enabled: normalizedEntries.length > 0,
    staleTime: SPORTS_DATA_STALE_TIME,
    gcTime: SPORTS_DATA_GC_TIME,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

const GLOBAL_UPCOMING_INITIAL_LIMIT = 100;
const GLOBAL_UPCOMING_FULL_LIMIT = 750;

/*
 * Stage 12 progressive home loading:
 * - the route prefetch asks for live fixtures plus the next 100 from "now",
 *   rather than the oldest rows from a 24-hour lookback window;
 * - once that succeeds, the established 750-fixture preview is fetched in the
 *   background and replaces the initial slice. No artificial delay is added.
 */
export const globalUpcomingDatasetQueryOptions = queryOptions({
  queryKey: ["frontend-dataset", "global-upcoming", "initial"],
  queryFn: () => fetchGlobalInitialUpcomingDataset(GLOBAL_UPCOMING_INITIAL_LIMIT),
  staleTime: SPORTS_DATA_STALE_TIME,
  gcTime: SPORTS_DATA_GC_TIME,
  retry: 1,
  refetchOnWindowFocus: false,
});

const globalUpcomingFullDatasetQueryOptions = {
  queryKey: ["frontend-dataset", "global-upcoming", "full"] as const,
  queryFn: () => fetchGlobalUpcomingDataset(GLOBAL_UPCOMING_FULL_LIMIT),
  staleTime: SPORTS_DATA_STALE_TIME,
  gcTime: SPORTS_DATA_GC_TIME,
  retry: 1,
  refetchOnWindowFocus: false,
};

export function useFrontendCatalog(enabled = true) {
  return useQuery({
    ...frontendCatalogQueryOptions,
    enabled,
  });
}

export function useFrontendIdentityCatalog() {
  return useQuery(frontendIdentityCatalogQueryOptions);
}

export function useCompetitionIdentityCatalog(
  competitionIds: string[],
  enabled = true,
) {
  return useQuery({
    ...competitionIdentityCatalogQueryOptions(competitionIds),
    enabled: enabled && competitionIds.length > 0,
  });
}

export function useUpcomingCompetitionDataset(competitionIds: string[]) {
  return useQuery(upcomingCompetitionDatasetQueryOptions(competitionIds));
}

export function useSavedTeamsDataset(savedLeagues: Record<string, string[]>) {
  return useQuery(savedTeamsDatasetQueryOptions(savedLeagues));
}

export function useGlobalUpcomingDataset() {
  const initialQuery = useQuery(globalUpcomingDatasetQueryOptions);
  const [secondaryDataReady, setSecondaryDataReady] = useState(false);

  useEffect(() => {
    if (initialQuery.isPending) {
      setSecondaryDataReady(false);
      return;
    }

    /*
     * Once the initial request settles, start the secondary/background reads
     * whether the first request succeeded or failed. A transient failure in
     * the first Home request must not prevent the established direct fixture
     * query and catalog query from recovering the page.
     */
    const frame = window.requestAnimationFrame(() => {
      setSecondaryDataReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialQuery.isPending]);

  const fullQuery = useQuery({
    ...globalUpcomingFullDatasetQueryOptions,
    enabled: secondaryDataReady,
  });

  const mergedData = useMemo(() => {
    if (!initialQuery.data) return fullQuery.data;
    if (!fullQuery.data) return initialQuery.data;

    const fixturesById = new Map(
      initialQuery.data.fixtures.map((fixture) => [fixture.id, fixture]),
    );
    for (const fixture of fullQuery.data.fixtures) {
      fixturesById.set(fixture.id, fixture);
    }

    const gamesById = new Map(
      initialQuery.data.games.map((game) => [game.id, game]),
    );
    for (const game of fullQuery.data.games) {
      gamesById.set(game.id, game);
    }

    const broadcastsByKey = new Map(
      initialQuery.data.broadcasts.map((broadcast) => [
        `${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`,
        broadcast,
      ]),
    );
    for (const broadcast of fullQuery.data.broadcasts) {
      broadcastsByKey.set(
        `${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`,
        broadcast,
      );
    }

    return {
      fixtures: Array.from(fixturesById.values()),
      games: Array.from(gamesById.values()),
      broadcasts: Array.from(broadcastsByKey.values()),
    };
  }, [initialQuery.data, fullQuery.data]);

  return {
    ...initialQuery,
    data: mergedData,
    initialBatchReady: initialQuery.isSuccess,
    secondaryDataReady,
    isFetching: initialQuery.isFetching || fullQuery.isFetching,
  };
}
