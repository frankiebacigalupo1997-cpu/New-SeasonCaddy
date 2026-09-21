import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frontend-data-BOEejV6T.js
var providers = [
	{
		id: "peacock",
		name: "Peacock",
		url: "https://www.peacocktv.com"
	},
	{
		id: "espn",
		name: "ESPN",
		url: "https://www.espn.com/watch"
	},
	{
		id: "usa",
		name: "USA Network",
		url: "https://www.usanetwork.com"
	},
	{
		id: "nbc",
		name: "NBC",
		url: "https://www.nbc.com"
	},
	{
		id: "paramount",
		name: "Paramount+",
		url: "https://www.paramountplus.com"
	},
	{
		id: "paramount-plus",
		name: "Paramount+",
		url: "https://www.paramountplus.com"
	},
	{
		id: "prime-video",
		name: "Prime Video",
		url: "https://www.amazon.com/gp/video/sports?&linkCode=ll2&tag=seasoncaddy-20&linkId=d02ea4d90ced4bafb0da769b759da82a&language=en_US&ref_=as_li_ss_tl"
	},
	{
		id: "espn-plus",
		name: "ESPN+",
		url: "https://plus.espn.com"
	},
	{
		id: "fox-one",
		name: "FOX One",
		url: "https://www.fox.com"
	},
	{
		id: "nfl-plus",
		name: "NFL+",
		url: "https://www.nfl.com/plus"
	},
	{
		id: "netflix",
		name: "Netflix",
		url: "https://www.netflix.com"
	},
	{
		id: "nba-tv",
		name: "NBA TV",
		url: "https://www.nba.com/watch/nba-tv"
	},
	{
		id: "nba-league-pass",
		name: "NBA League Pass",
		url: "https://www.nba.com/watch/league-pass-stream"
	},
	{
		id: "nbcsn",
		name: "NBC Sports Network",
		url: "https://www.nbc.com/sports"
	},
	{
		id: "sky-sports",
		name: "Sky Sports",
		url: "https://www.skysports.com"
	},
	{
		id: "now",
		name: "NOW",
		url: "https://www.nowtv.com/sports"
	},
	{
		id: "tnt-sports-uk",
		name: "TNT Sports",
		url: "https://www.tntsports.co.uk"
	},
	{
		id: "premier-sports",
		name: "Premier Sports",
		url: "https://www.premiersports.com"
	},
	{
		id: "disney-plus",
		name: "Disney+",
		url: "https://www.disneyplus.com"
	},
	{
		id: "dazn-uk",
		name: "DAZN",
		url: "https://www.dazn.com/en-GB"
	},
	{
		id: "channel-5",
		name: "5 / 5Action",
		url: "https://www.channel5.com"
	},
	{
		id: "bbc",
		name: "BBC",
		url: "https://www.bbc.co.uk/sport"
	},
	{
		id: "fubo-ca",
		name: "Fubo",
		url: "https://www.fubo.tv/ca"
	},
	{
		id: "dazn-ca",
		name: "DAZN",
		url: "https://www.dazn.com/en-CA"
	},
	{
		id: "cbs",
		name: "CBS",
		url: "https://www.cbs.com"
	},
	{
		id: "cbs-sports-golazo",
		name: "CBS Sports Golazo Network",
		url: "https://www.cbssports.com/watch/cbs-sports-golazo-network/"
	},
	{
		id: "cbs-sports-network",
		name: "CBS Sports Network",
		url: "https://www.cbssportsnetwork.com"
	},
	{
		id: "dazn-us",
		name: "DAZN",
		url: "https://www.dazn.com/en-US"
	},
	{
		id: "telemundo",
		name: "Telemundo",
		url: "https://www.telemundo.com/deportes"
	},
	{
		id: "universo",
		name: "Universo",
		url: "https://www.nbc.com/networks/universo"
	},
	{
		id: "telemundo-app",
		name: "Telemundo App",
		url: "https://www.telemundo.com/deportes"
	},
	{
		id: "telemundo-deportes-ahora",
		name: "Telemundo Deportes Ahora",
		url: "https://www.telemundo.com/deportes"
	},
	{
		id: "tln",
		name: "TLN",
		url: "https://www.tln.ca"
	},
	{
		id: "tnt-sports",
		name: "TNT Sports",
		url: "https://www.tntsports.co.uk"
	},
	{
		id: "fubo",
		name: "Fubo",
		url: "https://www.fubo.tv"
	},
	{
		id: "dazn-game-pass-ca",
		name: "DAZN NFL Game Pass",
		url: "https://www.dazn.com/en-CA"
	},
	{
		id: "dazn-game-pass-uk",
		name: "DAZN NFL Game Pass",
		url: "https://www.dazn.com/en-GB"
	},
	{
		id: "big-ten-plus",
		name: "Big Ten Plus",
		url: "https://www.bigtenplus.com"
	},
	{
		id: "apple-tv",
		name: "Apple TV",
		url: "https://tv.apple.com"
	},
	{
		id: "sportsnet",
		name: "Sportsnet",
		url: "https://www.sportsnet.ca"
	},
	{
		id: "sportsnet-ca",
		name: "Sportsnet",
		url: "https://watch.sportsnet.ca"
	},
	{
		id: "vix",
		name: "ViX",
		url: "https://vix.com"
	},
	{
		id: "flosports",
		name: "FloSports",
		url: "https://www.flosports.tv"
	},
	{
		id: "dazn",
		name: "DAZN",
		url: "https://www.dazn.com/en-US"
	},
	{
		id: "mlb-tv",
		name: "MLB.TV",
		url: "https://www.mlb.com/live-stream-games/subscribe"
	},
	{
		id: "wnba-league-pass",
		name: "WNBA League Pass",
		url: "https://www.wnba.com/leaguepass"
	},
	{
		id: "sling",
		name: "Sling TV",
		url: "https://www.sling.com"
	},
	{
		id: "tubi",
		name: "Tubi",
		url: "https://tubitv.com/live"
	},
	{
		id: "roku",
		name: "The Roku Channel",
		url: "https://therokuchannel.roku.com"
	},
	{
		id: "bbc-iplayer",
		name: "BBC iPlayer / BBC Sport",
		url: "https://www.bbc.co.uk/iplayer"
	},
	{
		id: "nba-league-pass-uk",
		name: "NBA League Pass",
		url: "https://www.nba.com/watch/league-pass-stream"
	},
	{
		id: "tsn",
		name: "TSN",
		url: "https://www.tsn.ca"
	},
	{
		id: "abc",
		name: "ABC",
		url: "https://abc.com"
	},
	{
		id: "hulu",
		name: "Hulu",
		url: "https://www.hulu.com"
	},
	{
		id: "trutv",
		name: "truTV",
		url: "https://www.trutv.com"
	},
	{
		id: "hbo-max",
		name: "HBO Max",
		url: "https://www.hbomax.com"
	},
	{
		id: "tva-sports",
		name: "TVA Sports",
		url: "https://www.tvasports.ca"
	},
	{
		id: "nhl-tv-dazn-uk",
		name: "NHL.TV on DAZN",
		url: "https://www.dazn.com/en-GB"
	},
	{
		id: "appletv",
		name: "Apple TV",
		url: "https://tv.apple.com"
	},
	{
		id: "tnt",
		name: "TNT",
		url: "https://www.tntdrama.com"
	},
	{
		id: "tbd",
		name: "Provider pending",
		url: ""
	},
	{
		id: "not-live-uk",
		name: "Not televised live",
		url: ""
	}
];
var EVENT_TITLE_ONLY_SPORTS = /* @__PURE__ */ new Set([
	"bull-riding",
	"cycling",
	"darts",
	"extreme-sports",
	"golf",
	"motorsport",
	"horse-racing",
	"pickleball",
	"softball",
	"surfing",
	"triathlon",
	"table-tennis",
	"athletics",
	"tennis",
	"wrestling",
	"fitness",
	"cheerleading",
	"skiing",
	"swimming-diving",
	"ultimate-frisbee"
]);
function normalizeSportDisplayId(value) {
	return value.trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");
}
function isEventTitleOnlySport(sport) {
	return EVENT_TITLE_ONLY_SPORTS.has(normalizeSportDisplayId(sport));
}
var UFC_EVENT_TITLE_ONLY_RE = /^Dana White[’']s Contender Series:/i;
/**
* Some combat listings are programme/card names rather than a named
* fighter-vs-fighter matchup. Keep those as one event title instead of
* manufacturing a "vs. UFC" opponent from the competition field.
*/
function isEventTitleOnlyGame(game) {
	if (isEventTitleOnlySport(game.sport)) return true;
	return normalizeSportDisplayId(game.sport) === "mma" && UFC_EVENT_TITLE_ONLY_RE.test(game.eventName?.trim() ?? "");
}
var HERO_FIGHT_EXTRACTOR_SPORTS = /* @__PURE__ */ new Set([
	"bare-knuckle-fighting",
	"boxing",
	"mma"
]);
var COMBAT_LANGUAGE_PREFIX_RE = /^(?:en\s+espa(?:ñ|n)ol|spanish|english)\s*[-:]\s*/i;
var COMBAT_CARD_SUFFIX_RE = /\s*(?:[-:]\s*)?(?:early\s+prelims?|prelims?|main\s+card|preliminary\s+card|early\s+preliminary\s+card|open\s+workouts?|ceremonial\s+weigh[-\s]?ins?|weigh[-\s]?ins?)\s*$/i;
function cleanHeroFighterName(value, side) {
	let cleaned = value.trim().replace(COMBAT_LANGUAGE_PREFIX_RE, "").trim();
	if (side === "home" && cleaned.includes(":")) cleaned = cleaned.replace(/^.*:\s*/, "").trim();
	cleaned = cleaned.replace(COMBAT_CARD_SUFFIX_RE, "").trim();
	cleaned = cleaned.replace(/\s+\d+\s*$/, "").trim();
	return cleaned;
}
/**
* Combat schedule titles often carry card/promoter text around the actual
* matchup, for example:
* - "UFC 331: Van vs. Pantoja 2 - Early Prelims"
* - "BKFC 94: Till vs. Romero"
* - "Zuffa Boxing: Garcia vs. Benn"
* - "MVPW-06: Mayer vs. Cameron"
* - "Liddard vs. Morello: Prelims"
*
* The cache parser deliberately preserves those complete source titles. For
* hero presentation only, recover the fighter names while leaving eventName
* untouched for tracker rows, provider evidence and card differentiation.
*/
function heroCompetitors(game) {
	const eventName = game.eventName?.trim() ?? "";
	const sport = normalizeSportDisplayId(game.sport);
	if (HERO_FIGHT_EXTRACTOR_SPORTS.has(sport)) {
		const fightMatch = eventName.match(/^(.+?)\s+vs\.?\s+(.+)$/i);
		if (fightMatch) {
			const home = cleanHeroFighterName(fightMatch[1], "home");
			const away = cleanHeroFighterName(fightMatch[2], "away");
			if (home && away) return {
				home,
				away
			};
		}
	}
	return {
		home: game.canonicalHome ?? game.home,
		away: game.canonicalAway ?? game.away
	};
}
function heroDisplayTitle(game) {
	if (isEventTitleOnlyGame(game)) return game.eventName?.trim() || game.home;
	const competitors = heroCompetitors(game);
	return `${competitors.home} vs. ${competitors.away}`;
}
var HERO_TEXT_ONLY_COMBAT_SPORTS = /* @__PURE__ */ new Set([
	"bare-knuckle-fighting",
	"boxing",
	"mma"
]);
/**
* Combat-sport heroes should show the competitors' names without fabricated
* initials/crest circles. Fighter photography can be added later only when
* SeasonCaddy has a licensed/authorized image source.
*/
function hideHeroCompetitorArtwork(sport) {
	return HERO_TEXT_ONLY_COMBAT_SPORTS.has(normalizeSportDisplayId(sport));
}
function gameDisplayTitle(game) {
	if (isEventTitleOnlyGame(game)) return game.eventName?.trim() || game.canonicalHome || game.home;
	return `${game.canonicalHome ?? game.home} vs. ${game.canonicalAway ?? game.away}`;
}
function providerById(id) {
	return providers.find((provider) => provider.id === id) ?? providers.find((provider) => provider.id === "tbd");
}
var regions = [
	"United States",
	"United Kingdom",
	"Canada"
];
/**
* Generic provider fallback.
*
* Automated competitions should resolve region-specific
* broadcast information through the Worker/broadcast API.
* This helper intentionally contains no fixture-specific
* or competition-specific broadcast assumptions.
*/
function getProviderIdsForGame(game, _region) {
	const providerIds = game.providerIds?.filter(Boolean);
	if (providerIds && providerIds.length > 0) return Array.from(new Set(providerIds));
	if (game.providerId) return [game.providerId];
	return ["tbd"];
}
function timeZoneForRegion(region) {
	if (region === "United States" || region.startsWith("United States ·")) return "America/New_York";
	if (region === "United Kingdom") return "Europe/London";
	if (region === "Canada") return "America/Toronto";
	return "America/New_York";
}
function formatRegionalTime(kickoff, region) {
	if (!kickoff) return "Time TBD";
	const date = new Date(kickoff);
	if (Number.isNaN(date.getTime())) return "Time TBD";
	if (region === "United States" || region.startsWith("United States ·") || region === "Canada") return `${new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: "America/New_York"
	}).format(date)} ET / ${new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: "America/Los_Angeles"
	}).format(date)} PT`;
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: timeZoneForRegion(region)
	}).format(date);
}
function formatKickoff(iso, scheduledDate, scheduleLabel, timeZone) {
	if (!iso) {
		if (scheduleLabel) return `${scheduleLabel} · Time TBD`;
		if (!scheduledDate) return "Date & time TBD";
		return `${(/* @__PURE__ */ new Date(`${scheduledDate}T12:00:00`)).toLocaleDateString(void 0, {
			weekday: "short",
			month: "short",
			day: "numeric",
			timeZone
		})} · Time TBD`;
	}
	return new Date(iso).toLocaleString(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		timeZone
	});
}
var DEFAULT_LIVE_DURATION_MS = 108e5;
var LIVE_DURATION_BY_SPORT_MS = {
	soccer: 108e5,
	"american-football": 162e5,
	football: 162e5,
	basketball: 126e5,
	"ice-hockey": 126e5,
	baseball: 18e6,
	softball: 144e5,
	volleyball: 126e5,
	"field-hockey": 9e6,
	"rugby-union": 9e6,
	"rugby-league": 9e6,
	afl: 108e5,
	lacrosse: 108e5,
	"water-polo": 9e6,
	handball: 9e6,
	tennis: 216e5,
	"table-tennis": 144e5,
	pickleball: 144e5,
	cricket: 432e5,
	motorsport: 216e5,
	golf: 432e5,
	boxing: 216e5,
	mma: 216e5,
	"bare-knuckle-fighting": 216e5,
	grappling: 216e5,
	wrestling: 144e5,
	darts: 216e5,
	"bull-riding": 144e5,
	cycling: 288e5,
	triathlon: 288e5,
	marathon: 288e5,
	"road-running": 288e5,
	surfing: 432e5,
	"track-and-field": 288e5,
	swimming: 288e5,
	"swimming-diving": 288e5
};
function fixtureTimestamp(value) {
	if (!value) return null;
	const timestamp = new Date(value).getTime();
	return Number.isNaN(timestamp) ? null : timestamp;
}
function expectedLiveDurationMs(sport) {
	return LIVE_DURATION_BY_SPORT_MS[sport.trim().toLowerCase()] ?? DEFAULT_LIVE_DURATION_MS;
}
function gameLiveEndTime(game) {
	const kickoff = fixtureTimestamp(game.kickoff);
	if (kickoff === null) return null;
	const fallbackEnd = kickoff + expectedLiveDurationMs(game.sport);
	const providerEnd = fixtureTimestamp(game.endTime);
	if (providerEnd !== null && providerEnd > kickoff) return providerEnd;
	return fallbackEnd;
}
function isGameLive(game, now = Date.now()) {
	if (game.status === "Final") return false;
	const kickoff = fixtureTimestamp(game.kickoff);
	if (kickoff === null) return game.status === "Live now";
	if (now < kickoff) return false;
	const liveEnd = gameLiveEndTime(game);
	return liveEnd !== null && now < liveEnd;
}
function isUpcomingOrLiveGame(game, now = Date.now()) {
	if (isGameLive(game, now)) return true;
	if (game.status === "Final") return false;
	const kickoff = fixtureTimestamp(game.kickoff);
	if (kickoff !== null) return kickoff >= now;
	if (game.scheduledDate) {
		const scheduledEnd = (/* @__PURE__ */ new Date(`${game.scheduledDate}T23:59:59`)).getTime();
		return !Number.isNaN(scheduledEnd) && scheduledEnd >= now;
	}
	return false;
}
function countdown(target) {
	if (!target) return "Time TBD";
	const diff = new Date(target).getTime() - Date.now();
	if (diff <= 0) return "Started";
	const d = Math.floor(diff / 864e5);
	const h = Math.floor(diff % 864e5 / 36e5);
	const m = Math.floor(diff % 36e5 / 6e4);
	const s = Math.floor(diff % 6e4 / 1e3);
	return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}
function isPlaceholderProviderId(providerId) {
	const normalized = providerId.trim().toLowerCase().replace(/[_\s]+/g, "-");
	return normalized === "tbd" || normalized === "pending" || normalized === "provider-pending" || normalized === "broadcast-pending" || normalized === "not-live-uk";
}
function providerToBroadcastProvider(provider) {
	return {
		id: provider.providerId,
		providerId: provider.providerId,
		name: provider.providerName,
		sourceUrl: provider.sourceUrl,
		url: provider.eventUrl,
		evidence: provider.evidence,
		matchMethod: provider.matchMethod,
		matchConfidence: provider.matchConfidence
	};
}
function providerTargets(provider) {
	return regions.includes(provider.region) ? [provider.region] : [];
}
/**
* Builds the existing BroadcastRecord interface from the providers JSON already
* aggregated by public.frontend_fixtures. Keeping this as a pure transformation
* lets pages fetch fixtures once and derive both games and broadcasts locally.
*/
function fixturesToBroadcasts(fixtures) {
	const grouped = /* @__PURE__ */ new Map();
	for (const fixture of fixtures) for (const provider of fixture.providers) {
		if (isPlaceholderProviderId(provider.providerId)) continue;
		for (const region of providerTargets(provider)) {
			const key = `${fixture.id}::${region}`;
			const existing = grouped.get(key);
			const broadcastProvider = providerToBroadcastProvider(provider);
			if (!existing) {
				grouped.set(key, {
					fixtureId: fixture.id,
					league: fixture.competitionName,
					competitionId: fixture.competitionId,
					region,
					home: fixture.home,
					away: fixture.away,
					providerId: provider.providerId,
					providerIds: [provider.providerId],
					providers: [broadcastProvider],
					source: "Supabase frontend_fixtures",
					sourceType: "official-broadcaster",
					providerProvenance: [{
						providerId: provider.providerId,
						sourceType: "official-broadcaster",
						sourceName: provider.providerName,
						sourceUrl: provider.sourceUrl
					}]
				});
				continue;
			}
			if (!existing.providerIds.includes(provider.providerId)) existing.providerIds.push(provider.providerId);
			if (!(existing.providers ?? []).some((item) => (item.providerId ?? item.id) === provider.providerId)) existing.providers = [...existing.providers ?? [], broadcastProvider];
			if (!(existing.providerProvenance ?? []).some((item) => item.providerId === provider.providerId)) existing.providerProvenance = [...existing.providerProvenance ?? [], {
				providerId: provider.providerId,
				sourceType: "official-broadcaster",
				sourceName: provider.providerName,
				sourceUrl: provider.sourceUrl
			}];
		}
	}
	return Array.from(grouped.values());
}
function displayNameFromCompetitionId(value) {
	return value.trim().split("-").filter(Boolean).map((part) => {
		if (/^[a-z]{2,4}$/i.test(part)) return part.toUpperCase();
		if (part.toLowerCase() === "motogp") return "MotoGP";
		return part.charAt(0).toUpperCase() + part.slice(1);
	}).join(" ");
}
function normalizeGameStatus(status) {
	const value = String(status ?? "").trim().toLowerCase();
	if ([
		"final",
		"fulltime",
		"full time",
		"finished",
		"complete",
		"completed"
	].includes(value)) return "Final";
	if ([
		"live",
		"live now",
		"in progress",
		"in-progress"
	].includes(value)) return "Live now";
	if ([
		"scheduled",
		"upcoming",
		"upcoming fixture",
		"not started",
		"pre"
	].includes(value)) return "Upcoming fixture";
	return "Time TBD";
}
function earliestProviderEndTime(fixture) {
	const kickoff = fixture.kickoff ? new Date(fixture.kickoff).getTime() : null;
	return fixture.providers.map((provider) => provider.endTime).filter((value) => Boolean(value)).map((value) => ({
		value,
		timestamp: new Date(value).getTime()
	})).filter(({ timestamp }) => !Number.isNaN(timestamp) && (kickoff === null || timestamp > kickoff)).sort((a, b) => a.timestamp - b.timestamp)[0]?.value ?? null;
}
function frontendFixtureToGame(fixture) {
	return {
		id: fixture.id,
		competitionId: fixture.competitionId,
		sport: fixture.sport,
		league: fixture.competitionName || displayNameFromCompetitionId(fixture.competitionId),
		home: fixture.home,
		away: fixture.away,
		canonicalHome: fixture.canonicalHome,
		canonicalAway: fixture.canonicalAway,
		homeTeamId: fixture.homeTeamId,
		awayTeamId: fixture.awayTeamId,
		homeCrestUrl: fixture.homeCrestUrl,
		awayCrestUrl: fixture.awayCrestUrl,
		eventName: fixture.eventName,
		eventKind: fixture.eventKind,
		kickoff: fixture.kickoff,
		scheduledDate: fixture.scheduledDate,
		scheduleLabel: fixture.stage ?? (fixture.round !== void 0 ? String(fixture.round) : void 0),
		providerId: "tbd",
		providerIds: ["tbd"],
		endTime: earliestProviderEndTime(fixture),
		status: normalizeGameStatus(fixture.status)
	};
}
var sportsDataSupabase = createClient(void 0, void 0, { auth: {
	storageKey: "seasoncaddy-public-data",
	persistSession: false,
	autoRefreshToken: false,
	detectSessionInUrl: false
} });
function stringValue(row, ...keys) {
	for (const key of keys) {
		const value = row[key];
		if (typeof value === "string" && value.trim()) return value.trim();
		if (typeof value === "number" && Number.isFinite(value)) return String(value);
	}
}
function numberValue(row, ...keys) {
	for (const key of keys) {
		const value = row[key];
		if (typeof value === "number" && Number.isFinite(value)) return value;
		if (typeof value === "string" && value.trim()) {
			const parsed = Number(value);
			if (Number.isFinite(parsed)) return parsed;
		}
	}
}
function arrayValue(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
	return [];
}
function stringArrayValue(value) {
	return arrayValue(value).filter((item) => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}
function normalizeCanonicalTeam(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const row = value;
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
		artworkConfidence: numberValue(row, "artwork_confidence", "artworkConfidence")
	};
}
function normalizeProviderRegion(region) {
	const value = region.trim().toLowerCase();
	if (value === "us" || value === "usa" || value === "united states") return "United States";
	if (value === "uk" || value === "gb" || value === "united kingdom") return "United Kingdom";
	if (value === "ca" || value === "canada") return "Canada";
	if (value === "global" || value === "worldwide") return "Global";
	return region.trim();
}
function normalizeProvider(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const row = value;
	const providerId = stringValue(row, "provider_id", "providerId", "id");
	if (!providerId) return null;
	const rawRegion = stringValue(row, "region", "territory") ?? "United States";
	return {
		providerId,
		providerName: stringValue(row, "provider_name", "providerName", "name") ?? providerId,
		region: normalizeProviderRegion(rawRegion),
		eventUrl: stringValue(row, "event_url", "eventUrl", "url"),
		sourceUrl: stringValue(row, "source_url", "sourceUrl"),
		matchMethod: stringValue(row, "match_method", "matchMethod"),
		matchConfidence: numberValue(row, "match_confidence", "matchConfidence", "confidence"),
		evidence: stringValue(row, "evidence", "match_evidence", "matchEvidence"),
		startTime: stringValue(row, "start_time", "startTime", "provider_start", "providerStart"),
		endTime: stringValue(row, "end_time", "endTime", "provider_end", "providerEnd")
	};
}
function normalizeFixture(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const row = value;
	const id = stringValue(row, "id", "fixture_id", "fixtureId");
	const competitionId = stringValue(row, "competition_id", "competitionId");
	const sport = stringValue(row, "sport");
	const home = stringValue(row, "home", "home_team", "homeTeam");
	const away = stringValue(row, "away", "away_team", "awayTeam");
	if (!id || !competitionId || !sport || !home || !away) return null;
	const providers = arrayValue(row.providers).map(normalizeProvider).filter((provider) => provider !== null);
	return {
		id,
		competitionId,
		competitionName: stringValue(row, "competition_name", "competitionName", "competition", "league") ?? competitionId,
		sport,
		locationName: stringValue(row, "location_name", "locationName"),
		countryName: stringValue(row, "country_name", "countryName"),
		countryCode: stringValue(row, "country_code", "countryCode"),
		regionName: stringValue(row, "region_name", "regionName"),
		confederation: stringValue(row, "confederation"),
		geoScope: stringValue(row, "geo_scope", "geoScope"),
		competitionGender: stringValue(row, "competition_gender", "competitionGender"),
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
		kickoff: stringValue(row, "frontend_kickoff", "frontendKickoff", "kickoff", "start_time", "startTime") ?? null,
		scheduledDate: stringValue(row, "scheduled_date", "scheduledDate"),
		status: stringValue(row, "status"),
		round: stringValue(row, "round") ?? numberValue(row, "round"),
		stage: stringValue(row, "stage"),
		venue: stringValue(row, "venue"),
		sourceUrl: stringValue(row, "source_url", "sourceUrl"),
		providers,
		providerCount: numberValue(row, "provider_count", "providerCount") ?? providers.length,
		sortAt: stringValue(row, "frontend_sort_at", "frontendSortAt", "sort_at", "sortAt"),
		refreshedAt: stringValue(row, "refreshed_at", "refreshedAt")
	};
}
function normalizeCatalogRow(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const row = value;
	const competitionId = stringValue(row, "competition_id", "competitionId");
	const sport = stringValue(row, "sport");
	if (!competitionId || !sport) return null;
	return {
		competitionId,
		competitionName: stringValue(row, "competition_name", "competitionName") ?? competitionId,
		sport,
		locationName: stringValue(row, "location_name", "locationName"),
		countryName: stringValue(row, "country_name", "countryName"),
		countryCode: stringValue(row, "country_code", "countryCode"),
		regionName: stringValue(row, "region_name", "regionName"),
		confederation: stringValue(row, "confederation"),
		geoScope: stringValue(row, "geo_scope", "geoScope"),
		competitionGender: stringValue(row, "competition_gender", "competitionGender"),
		competitionType: stringValue(row, "competition_type", "competitionType"),
		geoConfidence: numberValue(row, "geo_confidence", "geoConfidence"),
		geoReferenceId: stringValue(row, "geo_reference_id", "geoReferenceId"),
		geoMatchMethod: stringValue(row, "geo_match_method", "geoMatchMethod"),
		teamNames: stringArrayValue(row.team_names ?? row.teamNames),
		canonicalTeams: arrayValue(row.canonical_teams ?? row.canonicalTeams).map(normalizeCanonicalTeam).filter((team) => team !== null),
		providerIds: stringArrayValue(row.provider_ids ?? row.providerIds),
		fixtureCount: numberValue(row, "fixture_count", "fixtureCount") ?? 0,
		upcomingCount: numberValue(row, "upcoming_count", "upcomingCount") ?? 0,
		firstEventDate: stringValue(row, "first_event_date", "firstEventDate"),
		lastEventDate: stringValue(row, "last_event_date", "lastEventDate"),
		nextEventAt: stringValue(row, "next_event_at", "nextEventAt"),
		refreshedAt: stringValue(row, "refreshed_at", "refreshedAt")
	};
}
var SUPABASE_PAGE_SIZE = 1e3;
var IDENTITY_CATALOG_CACHE_TTL_MS = 9e5;
var FRONTEND_FIXTURE_SELECT = [
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
	"frontend_sort_at"
].join(",");
var FRONTEND_CATALOG_SUMMARY_SELECT = [
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
	"geo_match_method"
].join(",");
var FRONTEND_CATALOG_IDENTITY_SELECT = [
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
	"geo_match_method"
].join(",");
var identityCatalogCache = null;
var identityCatalogRequest = null;
var identityCompetitionCache = /* @__PURE__ */ new Map();
async function queryIdentityCatalog(competitionIds) {
	let query = sportsDataSupabase.from("frontend_catalog_identity").select(FRONTEND_CATALOG_IDENTITY_SELECT).order("sport", { ascending: true }).order("competition_name", { ascending: true }).order("competition_id", { ascending: true });
	if (competitionIds?.length === 1) query = query.eq("competition_id", competitionIds[0]);
	else if (competitionIds && competitionIds.length > 1) query = query.in("competition_id", competitionIds);
	const { data, error } = await query;
	if (error) throw new Error(`Supabase frontend_catalog_identity query failed: ${error.message}`);
	return (Array.isArray(data) ? data : []).map(normalizeCatalogRow).filter((row) => row !== null);
}
async function fetchFrontendIdentityCatalog() {
	const now = Date.now();
	if (identityCatalogCache && identityCatalogCache.expiresAt > now) return identityCatalogCache.data;
	identityCatalogRequest ??= queryIdentityCatalog().then((data) => {
		identityCatalogCache = {
			data,
			expiresAt: Date.now() + IDENTITY_CATALOG_CACHE_TTL_MS
		};
		return data;
	}).finally(() => {
		identityCatalogRequest = null;
	});
	return identityCatalogRequest;
}
async function fetchFrontendCompetitionIdentity(competitionIds) {
	const normalizedCompetitionIds = Array.from(new Set(competitionIds.filter(Boolean))).sort();
	if (normalizedCompetitionIds.length === 0) return [];
	const now = Date.now();
	if (identityCatalogCache && identityCatalogCache.expiresAt > now) {
		const requestedIds = new Set(normalizedCompetitionIds);
		return identityCatalogCache.data.filter((row) => requestedIds.has(row.competitionId));
	}
	const cachedRows = [];
	const missingIds = [];
	for (const competitionId of normalizedCompetitionIds) {
		const cached = identityCompetitionCache.get(competitionId);
		if (cached && cached.expiresAt > now) cachedRows.push(cached.data);
		else {
			if (cached) identityCompetitionCache.delete(competitionId);
			missingIds.push(competitionId);
		}
	}
	const fetchedRows = missingIds.length > 0 ? await queryIdentityCatalog(missingIds) : [];
	const expiresAt = Date.now() + IDENTITY_CATALOG_CACHE_TTL_MS;
	for (const row of fetchedRows) identityCompetitionCache.set(row.competitionId, {
		data: row,
		expiresAt
	});
	return [...cachedRows, ...fetchedRows].sort((a, b) => {
		const bySport = a.sport.localeCompare(b.sport);
		if (bySport !== 0) return bySport;
		const byName = a.competitionName.localeCompare(b.competitionName);
		if (byName !== 0) return byName;
		return a.competitionId.localeCompare(b.competitionId);
	});
}
async function fetchFrontendCatalog() {
	const { data, error } = await sportsDataSupabase.from("frontend_catalog_cache").select(FRONTEND_CATALOG_SUMMARY_SELECT).gt("upcoming_count", 0).order("sport", { ascending: true }).order("competition_name", { ascending: true }).order("competition_id", { ascending: true });
	if (error) throw new Error(`Supabase frontend_catalog_identity query failed: ${error.message}`);
	return (Array.isArray(data) ? data : []).map(normalizeCatalogRow).filter((row) => row !== null);
}
async function fetchFrontendHomeInitial(limit = 100) {
	const safeLimit = Math.max(1, Math.min(250, Math.floor(limit)));
	const now = /* @__PURE__ */ new Date();
	const liveFloor = /* @__PURE__ */ new Date(now.getTime() - 864e5);
	const [liveResult, upcomingResult] = await Promise.all([sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).eq("status", "live").gte("frontend_sort_at", liveFloor.toISOString()).order("frontend_sort_at", {
		ascending: true,
		nullsFirst: false
	}).order("id", { ascending: true }).limit(Math.min(25, safeLimit)), sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).gte("frontend_sort_at", now.toISOString()).order("frontend_sort_at", {
		ascending: true,
		nullsFirst: false
	}).order("id", { ascending: true }).limit(safeLimit)]);
	if (liveResult.error) throw new Error(`Supabase initial Home live fixture feed failed: ${liveResult.error.message}`);
	if (upcomingResult.error) throw new Error(`Supabase initial Home upcoming fixture feed failed: ${upcomingResult.error.message}`);
	const liveFixtures = (Array.isArray(liveResult.data) ? liveResult.data : []).map(normalizeFixture).filter((fixture) => fixture !== null);
	const upcomingFixtures = (Array.isArray(upcomingResult.data) ? upcomingResult.data : []).map(normalizeFixture).filter((fixture) => fixture !== null);
	const byId = /* @__PURE__ */ new Map();
	for (const fixture of [...liveFixtures, ...upcomingFixtures]) if (!byId.has(fixture.id)) byId.set(fixture.id, fixture);
	return Array.from(byId.values()).slice(0, safeLimit);
}
async function fetchFrontendFixtureById(fixtureId) {
	const { data, error } = await sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).eq("id", fixtureId).maybeSingle();
	if (error) throw new Error(`Supabase frontend fixture cache lookup failed: ${error.message}`);
	return data ? normalizeFixture(data) : null;
}
async function fetchFrontendFixtures(competitionIds, options) {
	const normalizedCompetitionIds = Array.isArray(competitionIds) ? Array.from(new Set(competitionIds.filter(Boolean))).sort() : competitionIds ? [competitionIds] : [];
	const requestedLimit = options?.limit;
	const rows = [];
	let offset = Math.max(0, options?.offset ?? 0);
	while (true) {
		const pageSize = requestedLimit ? Math.min(SUPABASE_PAGE_SIZE, Math.max(0, requestedLimit - rows.length)) : SUPABASE_PAGE_SIZE;
		if (pageSize <= 0) break;
		let query = sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).order("frontend_sort_at", {
			ascending: true,
			nullsFirst: false
		}).order("id", { ascending: true }).range(offset, offset + pageSize - 1);
		if (options?.sortAtOrAfter) query = query.gte("frontend_sort_at", options.sortAtOrAfter);
		if (options?.statusIn?.length) query = query.in("status", options.statusIn);
		if (options?.canonicalHomeIn?.length) query = query.in("canonical_home", options.canonicalHomeIn);
		if (options?.canonicalAwayIn?.length) query = query.in("canonical_away", options.canonicalAwayIn);
		if (normalizedCompetitionIds.length === 1) query = query.eq("competition_id", normalizedCompetitionIds[0]);
		else if (normalizedCompetitionIds.length > 1) query = query.in("competition_id", normalizedCompetitionIds);
		const { data, error } = await query;
		if (error) throw new Error(`Supabase frontend fixture cache query failed: ${error.message}`);
		const page = Array.isArray(data) ? data : [];
		rows.push(...page);
		if (page.length < pageSize) break;
		if (requestedLimit && rows.length >= requestedLimit) break;
		offset += pageSize;
	}
	return rows.map(normalizeFixture).filter((fixture) => fixture !== null);
}
function identityLookupKey(value) {
	return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function resolveSavedTeamLabels(competition, savedLabels) {
	if (!competition || competition.canonicalTeams.length === 0) return {
		canonicalNames: [],
		allResolved: false
	};
	const canonicalNames = [];
	for (const savedLabel of savedLabels) {
		const key = identityLookupKey(savedLabel);
		const match = competition.canonicalTeams.find((team) => [
			team.displayName,
			team.preferredName,
			...team.aliases
		].some((candidate) => candidate && identityLookupKey(candidate) === key));
		if (!match) return {
			canonicalNames: [],
			allResolved: false
		};
		canonicalNames.push(match.displayName);
	}
	return {
		canonicalNames: Array.from(new Set(canonicalNames)).sort(),
		allResolved: true
	};
}
function fixtureMatchesSavedTeamLabels(fixture, competitionId, savedLabels, competition) {
	if (savedLabels.includes(competitionId)) return true;
	const acceptedKeys = new Set(savedLabels.map(identityLookupKey).filter(Boolean));
	if (competition) for (const savedLabel of savedLabels) {
		const savedKey = identityLookupKey(savedLabel);
		const canonicalTeam = competition.canonicalTeams.find((team) => [
			team.displayName,
			team.preferredName,
			...team.aliases
		].some((candidate) => candidate && identityLookupKey(candidate) === savedKey));
		if (!canonicalTeam) continue;
		for (const candidate of [
			canonicalTeam.displayName,
			canonicalTeam.preferredName,
			...canonicalTeam.aliases
		]) {
			if (!candidate) continue;
			acceptedKeys.add(identityLookupKey(candidate));
		}
	}
	return [
		fixture.home,
		fixture.away,
		fixture.canonicalHome,
		fixture.canonicalAway
	].some((candidate) => Boolean(candidate && acceptedKeys.has(identityLookupKey(candidate))));
}
var MAX_TEAM_NAMES_PER_FILTERED_QUERY = 24;
async function fetchFrontendFixturesForSavedTeams(savedLeagues) {
	const entries = Object.entries(savedLeagues).map(([competitionId, teamNames]) => [competitionId, Array.from(new Set(teamNames.map((teamName) => teamName.trim()).filter(Boolean))).sort()]).filter(([, teamNames]) => teamNames.length > 0).sort(([a], [b]) => a.localeCompare(b));
	if (entries.length === 0) return [];
	const competitionIds = entries.map(([competitionId]) => competitionId);
	let identityByCompetition = /* @__PURE__ */ new Map();
	try {
		const identityRows = await fetchFrontendCompetitionIdentity(competitionIds);
		identityByCompetition = new Map(identityRows.map((competition) => [competition.competitionId, competition]));
	} catch (error) {
		console.warn("Could not resolve saved-team identity filters", error);
	}
	const resultSets = await Promise.all(entries.map(async ([competitionId, teamNames]) => {
		const identityCompetition = identityByCompetition.get(competitionId);
		if (teamNames.includes(competitionId)) return fetchFrontendFixtures(competitionId);
		const { canonicalNames, allResolved } = resolveSavedTeamLabels(identityCompetition, teamNames);
		if (allResolved && canonicalNames.length > 0 && teamNames.length <= MAX_TEAM_NAMES_PER_FILTERED_QUERY) {
			const [homeRows, awayRows] = await Promise.all([fetchFrontendFixtures(competitionId, { canonicalHomeIn: canonicalNames }), fetchFrontendFixtures(competitionId, { canonicalAwayIn: canonicalNames })]);
			const byId = /* @__PURE__ */ new Map();
			for (const fixture of [...homeRows, ...awayRows]) byId.set(fixture.id, fixture);
			return Array.from(byId.values());
		}
		return (await fetchFrontendFixtures(competitionId)).filter((fixture) => fixtureMatchesSavedTeamLabels(fixture, competitionId, teamNames, identityCompetition));
	}));
	const byId = /* @__PURE__ */ new Map();
	for (const fixture of resultSets.flat()) byId.set(fixture.id, fixture);
	return Array.from(byId.values()).sort((a, b) => {
		const aSort = a.sortAt ?? a.kickoff ?? "9999-12-31T23:59:59.999Z";
		const bSort = b.sortAt ?? b.kickoff ?? "9999-12-31T23:59:59.999Z";
		const byTime = aSort.localeCompare(bSort);
		return byTime !== 0 ? byTime : a.id.localeCompare(b.id);
	});
}
function catalogDisplayTeamNames(row) {
	const canonicalByKey = /* @__PURE__ */ new Map();
	const displayNames = /* @__PURE__ */ new Set();
	for (const team of row.canonicalTeams) {
		const displayName = team.displayName.trim();
		if (!displayName) continue;
		displayNames.add(displayName);
		for (const candidate of [
			team.displayName,
			team.preferredName,
			...team.aliases
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
async function fetchCatalog() {
	return fetchFrontendCatalog();
}
var HOME_LIVE_LOOKBACK_MS = 2592e6;
async function fetchUpcomingDatasetForCompetitions(competitionIds) {
	const normalizedIds = Array.from(new Set((competitionIds ?? []).filter(Boolean))).sort();
	if (normalizedIds.length === 0) return {
		fixtures: [],
		games: [],
		broadcasts: []
	};
	const fixtures = await fetchFrontendFixtures(normalizedIds, { sortAtOrAfter: (/* @__PURE__ */ new Date(Date.now() - HOME_LIVE_LOOKBACK_MS)).toISOString() });
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchDatasetForSavedTeams(savedLeagues) {
	const fixtures = await fetchFrontendFixturesForSavedTeams(savedLeagues ?? {});
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchGlobalInitialUpcomingDataset(limit = 100) {
	const fixtures = await fetchFrontendHomeInitial(limit);
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchGlobalUpcomingDataset(limit = 750, offset = 0) {
	const fixtures = await fetchFrontendFixtures(void 0, {
		limit,
		offset,
		sortAtOrAfter: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString()
	});
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchDatasetForGame(gameId) {
	const fixture = await fetchFrontendFixtureById(gameId);
	if (!fixture) return null;
	return {
		fixtures: [fixture],
		games: [frontendFixtureToGame(fixture)],
		broadcasts: fixturesToBroadcasts([fixture])
	};
}
//#endregion
export { timeZoneForRegion as C, providerById as S, heroDisplayTitle as _, fetchDatasetForSavedTeams as a, isGameLive as b, fetchGlobalInitialUpcomingDataset as c, formatKickoff as d, formatRegionalTime as f, heroCompetitors as g, getProviderIdsForGame as h, fetchDatasetForGame as i, fetchGlobalUpcomingDataset as l, gameLiveEndTime as m, countdown as n, fetchFrontendCompetitionIdentity as o, gameDisplayTitle as p, fetchCatalog as r, fetchFrontendIdentityCatalog as s, catalogDisplayTeamNames as t, fetchUpcomingDatasetForCompetitions as u, hideHeroCompetitorArtwork as v, isUpcomingOrLiveGame as x, isEventTitleOnlyGame as y };
