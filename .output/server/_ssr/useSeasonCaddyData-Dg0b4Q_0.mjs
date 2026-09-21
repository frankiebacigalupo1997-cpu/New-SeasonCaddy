import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, n as useQuery, t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { a as fetchDatasetForSavedTeams, c as fetchGlobalInitialUpcomingDataset, l as fetchGlobalUpcomingDataset, o as fetchFrontendCompetitionIdentity, r as fetchCatalog, s as fetchFrontendIdentityCatalog, u as fetchUpcomingDatasetForCompetitions } from "./frontend-data-BOEejV6T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSeasonCaddyData-Dg0b4Q_0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var SPORTS_DATA_STALE_TIME = 9e5;
var SPORTS_DATA_GC_TIME = 18e5;
var frontendCatalogQueryOptions = queryOptions({
	queryKey: ["frontend-catalog"],
	queryFn: fetchCatalog,
	staleTime: SPORTS_DATA_STALE_TIME,
	gcTime: SPORTS_DATA_GC_TIME,
	retry: 1,
	refetchOnWindowFocus: false
});
var frontendIdentityCatalogQueryOptions = queryOptions({
	queryKey: ["frontend-catalog-identity"],
	queryFn: fetchFrontendIdentityCatalog,
	staleTime: SPORTS_DATA_STALE_TIME,
	gcTime: SPORTS_DATA_GC_TIME,
	retry: 1,
	refetchOnWindowFocus: false
});
function competitionIdentityCatalogQueryOptions(competitionIds) {
	const normalizedIds = Array.from(new Set(competitionIds.filter(Boolean))).sort();
	return queryOptions({
		queryKey: [
			"frontend-catalog-identity",
			"competitions",
			...normalizedIds
		],
		queryFn: () => fetchFrontendCompetitionIdentity(normalizedIds),
		enabled: normalizedIds.length > 0,
		staleTime: SPORTS_DATA_STALE_TIME,
		gcTime: SPORTS_DATA_GC_TIME,
		retry: 1,
		refetchOnWindowFocus: false
	});
}
function upcomingCompetitionDatasetQueryOptions(competitionIds) {
	const normalizedIds = Array.from(new Set(competitionIds.filter(Boolean))).sort();
	return queryOptions({
		queryKey: [
			"frontend-dataset",
			"upcoming",
			...normalizedIds
		],
		queryFn: () => fetchUpcomingDatasetForCompetitions(normalizedIds),
		enabled: normalizedIds.length > 0,
		staleTime: SPORTS_DATA_STALE_TIME,
		gcTime: SPORTS_DATA_GC_TIME,
		retry: 1,
		refetchOnWindowFocus: false
	});
}
function savedTeamsDatasetQueryOptions(savedLeagues) {
	const normalizedEntries = Object.entries(savedLeagues).map(([competitionId, teamNames]) => [competitionId, Array.from(new Set(teamNames.map((teamName) => teamName.trim()).filter(Boolean))).sort()]).filter(([, teamNames]) => teamNames.length > 0).sort(([a], [b]) => a.localeCompare(b));
	const normalizedSavedLeagues = Object.fromEntries(normalizedEntries);
	return queryOptions({
		queryKey: [
			"frontend-dataset",
			"saved-teams",
			normalizedEntries
		],
		queryFn: () => fetchDatasetForSavedTeams(normalizedSavedLeagues),
		enabled: normalizedEntries.length > 0,
		staleTime: SPORTS_DATA_STALE_TIME,
		gcTime: SPORTS_DATA_GC_TIME,
		retry: 1,
		refetchOnWindowFocus: false
	});
}
var GLOBAL_UPCOMING_INITIAL_LIMIT = 100;
var GLOBAL_UPCOMING_FULL_LIMIT = 750;
var globalUpcomingDatasetQueryOptions = queryOptions({
	queryKey: [
		"frontend-dataset",
		"global-upcoming",
		"initial"
	],
	queryFn: () => fetchGlobalInitialUpcomingDataset(GLOBAL_UPCOMING_INITIAL_LIMIT),
	staleTime: SPORTS_DATA_STALE_TIME,
	gcTime: SPORTS_DATA_GC_TIME,
	retry: 1,
	refetchOnWindowFocus: false
});
var globalUpcomingFullDatasetQueryOptions = {
	queryKey: [
		"frontend-dataset",
		"global-upcoming",
		"full"
	],
	queryFn: () => fetchGlobalUpcomingDataset(GLOBAL_UPCOMING_FULL_LIMIT),
	staleTime: SPORTS_DATA_STALE_TIME,
	gcTime: SPORTS_DATA_GC_TIME,
	retry: 1,
	refetchOnWindowFocus: false
};
function useFrontendCatalog(enabled = true) {
	return useQuery({
		...frontendCatalogQueryOptions,
		enabled
	});
}
function useFrontendIdentityCatalog() {
	return useQuery(frontendIdentityCatalogQueryOptions);
}
function useCompetitionIdentityCatalog(competitionIds, enabled = true) {
	return useQuery({
		...competitionIdentityCatalogQueryOptions(competitionIds),
		enabled: enabled && competitionIds.length > 0
	});
}
function useUpcomingCompetitionDataset(competitionIds) {
	return useQuery(upcomingCompetitionDatasetQueryOptions(competitionIds));
}
function useSavedTeamsDataset(savedLeagues) {
	return useQuery(savedTeamsDatasetQueryOptions(savedLeagues));
}
function useGlobalUpcomingDataset() {
	const initialQuery = useQuery(globalUpcomingDatasetQueryOptions);
	const [secondaryDataReady, setSecondaryDataReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (initialQuery.isPending) {
			setSecondaryDataReady(false);
			return;
		}
		const frame = window.requestAnimationFrame(() => {
			setSecondaryDataReady(true);
		});
		return () => window.cancelAnimationFrame(frame);
	}, [initialQuery.isPending]);
	const fullQuery = useQuery({
		...globalUpcomingFullDatasetQueryOptions,
		enabled: secondaryDataReady
	});
	const mergedData = (0, import_react.useMemo)(() => {
		if (!initialQuery.data) return fullQuery.data;
		if (!fullQuery.data) return initialQuery.data;
		const fixturesById = new Map(initialQuery.data.fixtures.map((fixture) => [fixture.id, fixture]));
		for (const fixture of fullQuery.data.fixtures) fixturesById.set(fixture.id, fixture);
		const gamesById = new Map(initialQuery.data.games.map((game) => [game.id, game]));
		for (const game of fullQuery.data.games) gamesById.set(game.id, game);
		const broadcastsByKey = new Map(initialQuery.data.broadcasts.map((broadcast) => [`${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`, broadcast]));
		for (const broadcast of fullQuery.data.broadcasts) broadcastsByKey.set(`${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`, broadcast);
		return {
			fixtures: Array.from(fixturesById.values()),
			games: Array.from(gamesById.values()),
			broadcasts: Array.from(broadcastsByKey.values())
		};
	}, [initialQuery.data, fullQuery.data]);
	return {
		...initialQuery,
		data: mergedData,
		initialBatchReady: initialQuery.isSuccess,
		secondaryDataReady,
		isFetching: initialQuery.isFetching || fullQuery.isFetching
	};
}
//#endregion
export { useFrontendCatalog as a, useSavedTeamsDataset as c, useCompetitionIdentityCatalog as i, useUpcomingCompetitionDataset as l, frontendIdentityCatalogQueryOptions as n, useFrontendIdentityCatalog as o, globalUpcomingDatasetQueryOptions as r, useGlobalUpcomingDataset as s, frontendCatalogQueryOptions as t };
