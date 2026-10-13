import {
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
const GLOBAL_UPCOMING_BATCH_SIZE = 500;
const GLOBAL_UPCOMING_BATCH_DELAY_MS = 3000;


export const globalUpcomingDatasetQueryOptions = queryOptions({
  queryKey: ["frontend-dataset", "global-upcoming", "initial"],
  queryFn: () =>
    fetchGlobalInitialUpcomingDataset(GLOBAL_UPCOMING_INITIAL_LIMIT),
  staleTime: SPORTS_DATA_STALE_TIME,
  gcTime: SPORTS_DATA_GC_TIME,
  retry: 1,
  refetchOnWindowFocus: false,
});


type GlobalUpcomingDataset = Awaited<
  ReturnType<typeof fetchGlobalUpcomingDataset>
>;

export function useGlobalUpcomingDataset() {
  const initialQuery = useQuery(globalUpcomingDatasetQueryOptions);
  const [secondaryDataReady, setSecondaryDataReady] = useState(false);
  const [progressiveData, setProgressiveData] =
    useState<GlobalUpcomingDataset>();
  const [isProgressiveFetching, setIsProgressiveFetching] = useState(false);

  useEffect(() => {
    if (initialQuery.isPending) {
      setSecondaryDataReady(false);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setSecondaryDataReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [initialQuery.isPending]);

  useEffect(() => {
    if (!secondaryDataReady) return;

    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const initialData = initialQuery.data;
    const fixturesById = new Map(
      (initialData?.fixtures ?? []).map((item) => [item.id, item] as const),
    );
    const gamesById = new Map(
      (initialData?.games ?? []).map((item) => [item.id, item] as const),
    );
    const broadcastsByKey = new Map(
      (initialData?.broadcasts ?? []).map((item) => [
        `${item.fixtureId ?? ""}|${item.region}|${item.competitionId ?? ""}`,
        item,
      ] as const),
    );

    const publish = () => {
      
const isLiveStatus = (status?: string) =>
  ["live", "live now", "in progress", "in-progress"].includes(
    status?.trim().toLowerCase() ?? "",
  );

const fixtures = Array.from(fixturesById.values()).sort((a, b) => {
  const aLive = isLiveStatus(a.status);
  const bLive = isLiveStatus(b.status);

  if (aLive !== bLive) return aLive ? -1 : 1;

  const aTime = a.sortAt ?? a.kickoff ?? a.scheduledDate ?? "9999-12-31";
  const bTime = b.sortAt ?? b.kickoff ?? b.scheduledDate ?? "9999-12-31";

  return aTime.localeCompare(bTime) || a.id.localeCompare(b.id);
});


      const position = new Map(
        fixtures.map((fixture, index) => [fixture.id, index]),
      );
      const last = Number.MAX_SAFE_INTEGER;

      const games = Array.from(gamesById.values()).sort(
        (a, b) =>
          (position.get(a.id) ?? last) - (position.get(b.id) ?? last),
      );

      const broadcasts = Array.from(broadcastsByKey.values()).sort(
        (a, b) =>
          (position.get(a.fixtureId ?? "") ?? last) -
          (position.get(b.fixtureId ?? "") ?? last),
      );

      setProgressiveData({ fixtures, games, broadcasts });
    };

    // Display the initial batch immediately while background batches load.
    publish();

    const loadBatches = async () => {
      let offset = 0;
      setIsProgressiveFetching(true);

      try {
        while (!cancelled) {
          const batch = await fetchGlobalUpcomingDataset(
            GLOBAL_UPCOMING_BATCH_SIZE,
            offset,
          );

          if (cancelled) return;

          for (const fixture of batch.fixtures) {
            fixturesById.set(fixture.id, fixture);
          }

          for (const game of batch.games) {
            gamesById.set(game.id, game);
          }

          for (const broadcast of batch.broadcasts) {
            broadcastsByKey.set(
              `${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`,
              broadcast,
            );
          }

          publish();

          if (batch.fixtures.length < GLOBAL_UPCOMING_BATCH_SIZE) break;

          offset += batch.fixtures.length;

          // Pause after each completed full batch; never overlap requests.
          await new Promise<void>((resolve) => {
            timeout = setTimeout(resolve, GLOBAL_UPCOMING_BATCH_DELAY_MS);
          });
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Progressive fixture loading failed:", error);
        }
      } finally {
        if (!cancelled) setIsProgressiveFetching(false);
      }
    };

    void loadBatches();

    return () => {
      cancelled = true;
      if (timeout !== undefined) clearTimeout(timeout);
    };
  }, [secondaryDataReady, initialQuery.data]);

  return {
    ...initialQuery,
    data: progressiveData ?? initialQuery.data,
    initialBatchReady: initialQuery.isSuccess,
    secondaryDataReady,
    isFetching: initialQuery.isFetching || isProgressiveFetching,
  };
}


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
