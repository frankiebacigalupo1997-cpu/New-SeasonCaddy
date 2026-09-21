import { n as supabase } from "./useAuth-CNmA0ie9.mjs";
import { o as fetchFrontendCompetitionIdentity } from "./frontend-data-BOEejV6T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/gamehub-cloud-DHEwKg8Z.js
var PREFERENCES_KEY = "sportstream_preferences";
var PREFERENCES_USER_CACHE_PREFIX = "seasoncaddy_preferences:";
var PREFERENCES_LEGACY_OWNER_KEY = "seasoncaddy_legacy_preferences_owner";
var SERVICES_KEY = "sportstream_services";
var PREFERENCES_CANONICALIZED_AT_KEY = "sportstream_preferences_canonicalized_at";
var PREFERENCES_CANONICAL_TTL_MS = 9e5;
var accountDataSupabase = supabase;
function userPreferencesKey(userId) {
	return `${PREFERENCES_USER_CACHE_PREFIX}${userId}`;
}
function userCanonicalizedAtKey(userId) {
	return `${PREFERENCES_CANONICALIZED_AT_KEY}:${userId}`;
}
function identityKey(value) {
	return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function canonicalTeamForSavedLabel(competition, label) {
	if (!competition || competition.canonicalTeams.length === 0) return void 0;
	const key = identityKey(label);
	return competition.canonicalTeams.find((team) => [
		team.displayName,
		team.preferredName,
		...team.aliases
	].some((candidate) => candidate && identityKey(candidate) === key));
}
function normalizeSavedLeagues(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return {};
	const normalized = {};
	for (const [competitionId, rawTeams] of Object.entries(value)) {
		if (!competitionId || !Array.isArray(rawTeams)) continue;
		const seen = /* @__PURE__ */ new Set();
		const teams = [];
		for (const rawTeam of rawTeams) {
			if (typeof rawTeam !== "string") continue;
			const team = rawTeam.trim();
			if (!team) continue;
			const key = identityKey(team);
			if (seen.has(key)) continue;
			seen.add(key);
			teams.push(team);
		}
		normalized[competitionId] = teams;
	}
	return normalized;
}
function normalizePreferences(prefs) {
	const leagueId = prefs.league_id?.trim() ?? "";
	const savedLeagues = normalizeSavedLeagues(prefs.saved_leagues ?? (leagueId ? { [leagueId]: prefs.teams ?? [] } : {}));
	const legacyTeams = savedLeagues[leagueId] ?? prefs.teams ?? [];
	return {
		sport: prefs.sport?.trim() ?? "",
		league_id: leagueId,
		teams: Array.from(new Set(legacyTeams.map((team) => team.trim()).filter(Boolean))),
		region: prefs.region?.trim() || "United States",
		saved_leagues: savedLeagues
	};
}
function preferencesFromCloudRow(row) {
	const savedLeagues = normalizeSavedLeagues(row.saved_leagues);
	return {
		sport: row.sport ?? "",
		league_id: row.league_id ?? "",
		teams: savedLeagues[row.league_id] ?? [],
		region: row.region || "United States",
		saved_leagues: savedLeagues
	};
}
function readLocalPreferences(key) {
	if (typeof window === "undefined") return null;
	const saved = localStorage.getItem(key);
	if (!saved) return null;
	try {
		return normalizePreferences(JSON.parse(saved));
	} catch {
		return null;
	}
}
function writeLocalPreferences(userId, prefs) {
	if (typeof window === "undefined") return;
	localStorage.setItem(userPreferencesKey(userId), JSON.stringify(normalizePreferences(prefs)));
}
async function canonicalizePreferences(prefs) {
	if (!prefs.saved_leagues && (!prefs.league_id || prefs.teams.length === 0)) return prefs;
	try {
		const sourceSavedLeagues = prefs.saved_leagues ?? { [prefs.league_id]: prefs.teams };
		const competitionIds = Array.from(new Set(Object.keys(sourceSavedLeagues).filter(Boolean))).sort();
		const catalog = await fetchFrontendCompetitionIdentity(competitionIds);
		const byCompetition = new Map(catalog.map((competition) => [competition.competitionId, competition]));
		const saved_leagues = {};
		for (const [competitionId, savedValues] of Object.entries(sourceSavedLeagues)) {
			const competition = byCompetition.get(competitionId);
			const seen = /* @__PURE__ */ new Set();
			const canonicalValues = [];
			for (const savedValue of savedValues) {
				const trimmed = savedValue.trim();
				if (!trimmed) continue;
				const displayValue = trimmed === competitionId ? trimmed : canonicalTeamForSavedLabel(competition, trimmed)?.displayName ?? trimmed;
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
			saved_leagues
		};
	} catch (error) {
		console.warn("Could not canonicalize saved-team preferences", error);
		return prefs;
	}
}
function canonicalizePreferencesInBackground(userId, prefs, sourceSnapshot) {
	const storageKey = userPreferencesKey(userId);
	canonicalizePreferences(prefs).then((canonical) => {
		if (localStorage.getItem(storageKey) !== sourceSnapshot) return;
		const canonicalSnapshot = JSON.stringify(canonical);
		if (canonicalSnapshot !== sourceSnapshot) localStorage.setItem(storageKey, canonicalSnapshot);
		localStorage.setItem(userCanonicalizedAtKey(userId), String(Date.now()));
	}).catch((error) => {
		console.warn("Could not canonicalize saved-team preferences", error);
	});
}
async function loadCurrentUserId() {
	const { data: { session }, error } = await supabase.auth.getSession();
	if (error) {
		console.warn("Could not load SeasonCaddy session", error);
		return null;
	}
	return session?.user.id ?? null;
}
async function persistCloudPreferences(userId, prefs) {
	const normalized = normalizePreferences(prefs);
	const { error } = await accountDataSupabase.from("user_caddy_preferences").upsert({
		user_id: userId,
		sport: normalized.sport,
		league_id: normalized.league_id,
		region: normalized.region,
		saved_leagues: normalized.saved_leagues ?? {},
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}, { onConflict: "user_id" });
	if (error) throw new Error(`Could not save SeasonCaddy preferences: ${error.message}`);
}
async function syncCanonicalSavedEntities(userId, prefs) {
	const savedLeagues = normalizeSavedLeagues(prefs.saved_leagues ?? {});
	const allEntries = Object.entries(savedLeagues);
	const activeEntries = allEntries.filter(([, teams]) => teams.length > 0);
	const competitionIds = allEntries.map(([competitionId]) => competitionId);
	const catalog = competitionIds.length > 0 ? await fetchFrontendCompetitionIdentity(competitionIds) : [];
	const byCompetition = new Map(catalog.map((competition) => [competition.competitionId, competition]));
	const desiredCompetitionByEntity = /* @__PURE__ */ new Map();
	const knownEntityIds = /* @__PURE__ */ new Set();
	for (const competition of catalog) for (const team of competition.canonicalTeams) knownEntityIds.add(team.teamId);
	for (const [competitionId, savedTeams] of activeEntries) {
		const competition = byCompetition.get(competitionId);
		if (!competition) continue;
		for (const savedTeam of savedTeams) {
			const team = canonicalTeamForSavedLabel(competition, savedTeam);
			if (!team) continue;
			if (!desiredCompetitionByEntity.has(team.teamId)) desiredCompetitionByEntity.set(team.teamId, competitionId);
		}
	}
	const { data, error: readError } = await accountDataSupabase.from("user_saved_entities").select("entity_id,saved_from_competition_id").eq("user_id", userId);
	if (readError) throw new Error(`Could not read canonical SeasonCaddy saves: ${readError.message}`);
	const existingRows = Array.isArray(data) ? data : [];
	const existingIds = new Set(existingRows.map((row) => row.entity_id));
	const desiredIds = new Set(desiredCompetitionByEntity.keys());
	const toDelete = existingRows.map((row) => row.entity_id).filter((entityId) => knownEntityIds.has(entityId) && !desiredIds.has(entityId));
	if (toDelete.length > 0) {
		const { error: deleteError } = await accountDataSupabase.from("user_saved_entities").delete().eq("user_id", userId).in("entity_id", toDelete);
		if (deleteError) throw new Error(`Could not remove canonical SeasonCaddy saves: ${deleteError.message}`);
	}
	const toInsert = Array.from(desiredCompetitionByEntity.entries()).filter(([entityId]) => !existingIds.has(entityId)).map(([entityId, competitionId]) => ({
		user_id: userId,
		entity_id: entityId,
		saved_from_competition_id: competitionId,
		metadata: { source: "user_caddy_preferences" }
	}));
	if (toInsert.length > 0) {
		const { error: insertError } = await accountDataSupabase.from("user_saved_entities").insert(toInsert);
		if (insertError) throw new Error(`Could not add canonical SeasonCaddy saves: ${insertError.message}`);
	}
}
async function migrateLegacyPreferencesIfAvailable(userId) {
	if (typeof window === "undefined") return null;
	const legacy = readLocalPreferences(PREFERENCES_KEY);
	if (!legacy) return null;
	const claimedBy = localStorage.getItem(PREFERENCES_LEGACY_OWNER_KEY);
	if (claimedBy && claimedBy !== userId) return null;
	localStorage.setItem(PREFERENCES_LEGACY_OWNER_KEY, userId);
	await persistCloudPreferences(userId, legacy);
	writeLocalPreferences(userId, legacy);
	try {
		await syncCanonicalSavedEntities(userId, legacy);
	} catch (error) {
		console.warn("Could not mirror migrated preferences into canonical saves", error);
	}
	localStorage.removeItem(PREFERENCES_KEY);
	localStorage.removeItem(PREFERENCES_CANONICALIZED_AT_KEY);
	return legacy;
}
async function fetchPreferences(options) {
	if (typeof window === "undefined") return null;
	const userId = await loadCurrentUserId();
	if (!userId) return null;
	const { data, error } = await accountDataSupabase.from("user_caddy_preferences").select("user_id,sport,league_id,region,saved_leagues,updated_at").eq("user_id", userId).maybeSingle();
	if (error) {
		console.warn("Could not load SeasonCaddy cloud preferences", error);
		return readLocalPreferences(userPreferencesKey(userId));
	}
	let prefs = data ? preferencesFromCloudRow(data) : null;
	if (!prefs) try {
		prefs = await migrateLegacyPreferencesIfAvailable(userId);
	} catch (migrationError) {
		console.warn("Could not migrate legacy SeasonCaddy preferences", migrationError);
	}
	if (!prefs) return readLocalPreferences(userPreferencesKey(userId));
	const normalized = normalizePreferences(prefs);
	const snapshot = JSON.stringify(normalized);
	localStorage.setItem(userPreferencesKey(userId), snapshot);
	if (options?.canonicalize === false) return normalized;
	const canonicalizedAt = Number(localStorage.getItem(userCanonicalizedAtKey(userId)));
	if (!Number.isFinite(canonicalizedAt) || Date.now() - canonicalizedAt >= PREFERENCES_CANONICAL_TTL_MS) canonicalizePreferencesInBackground(userId, normalized, snapshot);
	return normalized;
}
async function savePreferences(userId, prefs) {
	if (typeof window === "undefined") return;
	const normalized = normalizePreferences(prefs);
	await persistCloudPreferences(userId, normalized);
	const snapshot = JSON.stringify(normalized);
	localStorage.setItem(userPreferencesKey(userId), snapshot);
	localStorage.removeItem(userCanonicalizedAtKey(userId));
	try {
		await syncCanonicalSavedEntities(userId, normalized);
	} catch (error) {
		console.warn("Could not mirror preferences into canonical saved entities", error);
	}
	canonicalizePreferencesInBackground(userId, normalized, snapshot);
}
async function fetchServices() {
	if (typeof window === "undefined") return [];
	const saved = localStorage.getItem(SERVICES_KEY);
	if (!saved) return [];
	try {
		return JSON.parse(saved);
	} catch {
		return [];
	}
}
async function upsertService(_userId, service) {
	if (typeof window === "undefined") return;
	const services = await fetchServices();
	const existingIndex = services.findIndex((item) => item.provider_id === service.provider_id);
	if (existingIndex >= 0) services[existingIndex] = service;
	else services.push(service);
	localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
}
async function deleteService(providerId) {
	if (typeof window === "undefined") return;
	const updatedServices = (await fetchServices()).filter((service) => service.provider_id !== providerId);
	localStorage.setItem(SERVICES_KEY, JSON.stringify(updatedServices));
}
//#endregion
export { upsertService as a, savePreferences as i, fetchPreferences as n, fetchServices as r, deleteService as t };
