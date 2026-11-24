import { n as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/@posthog/react+[...].mjs";
import { n as useQuery, t as queryOptions } from "../_libs/react+tanstack__react-query.mjs";
import { a as fetchDatasetForSavedTeams, c as fetchGlobalInitialUpcomingDataset, l as fetchGlobalUpcomingDataset, o as fetchFrontendCompetitionIdentity, r as fetchCatalog, s as fetchFrontendIdentityCatalog, u as fetchUpcomingDatasetForCompetitions } from "./frontend-data-DJPCkXA4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/useSeasonCaddyData-eoAkFgOh.js
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
function savedTeamsDatasetQueryOptions(savedLeagues, savedSports = []) {
	const normalizedEntries = Object.entries(savedLeagues).map(([competitionId, teamNames]) => [competitionId, Array.from(new Set(teamNames.map((teamName) => teamName.trim()).filter(Boolean))).sort()]).filter(([, teamNames]) => teamNames.length > 0).sort(([a], [b]) => a.localeCompare(b));
	const normalizedSavedLeagues = Object.fromEntries(normalizedEntries);
	const normalizedSavedSports = Array.from(new Set(savedSports.map((sport) => sport.trim().toLowerCase()).filter(Boolean))).sort();
	return queryOptions({
		queryKey: [
			"frontend-dataset",
			"saved-events",
			normalizedEntries,
			normalizedSavedSports
		],
		queryFn: () => fetchDatasetForSavedTeams(normalizedSavedLeagues, normalizedSavedSports),
		enabled: normalizedEntries.length > 0 || normalizedSavedSports.length > 0,
		staleTime: SPORTS_DATA_STALE_TIME,
		gcTime: SPORTS_DATA_GC_TIME,
		retry: 1,
		refetchOnWindowFocus: false
	});
}
var GLOBAL_UPCOMING_INITIAL_LIMIT = 100;
var GLOBAL_UPCOMING_BATCH_SIZE = 500;
var GLOBAL_UPCOMING_BATCH_DELAY_MS = 3e3;
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
function useGlobalUpcomingDataset() {
	const initialQuery = useQuery(globalUpcomingDatasetQueryOptions);
	const [secondaryDataReady, setSecondaryDataReady] = (0, import_react.useState)(false);
	const [progressiveData, setProgressiveData] = (0, import_react.useState)();
	const [isProgressiveFetching, setIsProgressiveFetching] = (0, import_react.useState)(false);
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
	(0, import_react.useEffect)(() => {
		if (!secondaryDataReady) return;
		let cancelled = false;
		let timeout;
		const initialData = initialQuery.data;
		const fixturesById = new Map((initialData?.fixtures ?? []).map((item) => [item.id, item]));
		const gamesById = new Map((initialData?.games ?? []).map((item) => [item.id, item]));
		const broadcastsByKey = new Map((initialData?.broadcasts ?? []).map((item) => [`${item.fixtureId ?? ""}|${item.region}|${item.competitionId ?? ""}`, item]));
		const publish = () => {
			const isLiveStatus = (status) => [
				"live",
				"live now",
				"in progress",
				"in-progress"
			].includes(status?.trim().toLowerCase() ?? "");
			const fixtures = Array.from(fixturesById.values()).sort((a, b) => {
				const aLive = isLiveStatus(a.status);
				if (aLive !== isLiveStatus(b.status)) return aLive ? -1 : 1;
				const aTime = a.sortAt ?? a.kickoff ?? a.scheduledDate ?? "9999-12-31";
				const bTime = b.sortAt ?? b.kickoff ?? b.scheduledDate ?? "9999-12-31";
				return aTime.localeCompare(bTime) || a.id.localeCompare(b.id);
			});
			const position = new Map(fixtures.map((fixture, index) => [fixture.id, index]));
			const last = Number.MAX_SAFE_INTEGER;
			const games = Array.from(gamesById.values()).sort((a, b) => (position.get(a.id) ?? last) - (position.get(b.id) ?? last));
			const broadcasts = Array.from(broadcastsByKey.values()).sort((a, b) => (position.get(a.fixtureId ?? "") ?? last) - (position.get(b.fixtureId ?? "") ?? last));
			setProgressiveData({
				fixtures,
				games,
				broadcasts
			});
		};
		publish();
		const loadBatches = async () => {
			let offset = 0;
			setIsProgressiveFetching(true);
			try {
				while (!cancelled) {
					const batch = await fetchGlobalUpcomingDataset(GLOBAL_UPCOMING_BATCH_SIZE, offset);
					if (cancelled) return;
					for (const fixture of batch.fixtures) fixturesById.set(fixture.id, fixture);
					for (const game of batch.games) gamesById.set(game.id, game);
					for (const broadcast of batch.broadcasts) broadcastsByKey.set(`${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`, broadcast);
					publish();
					if (batch.fixtures.length < GLOBAL_UPCOMING_BATCH_SIZE) break;
					offset += batch.fixtures.length;
					await new Promise((resolve) => {
						timeout = setTimeout(resolve, GLOBAL_UPCOMING_BATCH_DELAY_MS);
					});
				}
			} catch (error) {
				if (!cancelled) console.error("Progressive fixture loading failed:", error);
			} finally {
				if (!cancelled) setIsProgressiveFetching(false);
			}
		};
		loadBatches();
		return () => {
			cancelled = true;
			if (timeout !== void 0) clearTimeout(timeout);
		};
	}, [secondaryDataReady, initialQuery.data]);
	return {
		...initialQuery,
		data: progressiveData ?? initialQuery.data,
		initialBatchReady: initialQuery.isSuccess,
		secondaryDataReady,
		isFetching: initialQuery.isFetching || isProgressiveFetching
	};
}
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
function useSavedTeamsDataset(savedLeagues, savedSports = []) {
	return useQuery(savedTeamsDatasetQueryOptions(savedLeagues, savedSports));
}
//#endregion
export { useFrontendCatalog as a, useSavedTeamsDataset as c, useCompetitionIdentityCatalog as i, useUpcomingCompetitionDataset as l, frontendIdentityCatalogQueryOptions as n, useFrontendIdentityCatalog as o, globalUpcomingDatasetQueryOptions as r, useGlobalUpcomingDataset as s, frontendCatalogQueryOptions as t };
