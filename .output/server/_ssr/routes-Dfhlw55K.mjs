import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./useAuth-CNmA0ie9.mjs";
import { _ as require_react_dom, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as ChevronDown, s as Sparkles, u as Radio } from "../_libs/lucide-react.mjs";
import { C as timeZoneForRegion, S as providerById, a as fetchDatasetForSavedTeams, b as isGameLive, f as formatRegionalTime, h as getProviderIdsForGame, p as gameDisplayTitle, t as catalogDisplayTeamNames, x as isUpcomingOrLiveGame } from "./frontend-data-BOEejV6T.mjs";
import { t as Shell } from "./Shell-C3AN-g_y.mjs";
import { a as upsertService, i as savePreferences, n as fetchPreferences, r as fetchServices, t as deleteService } from "./gamehub-cloud-DHEwKg8Z.mjs";
import { a as useFrontendCatalog, c as useSavedTeamsDataset, i as useCompetitionIdentityCatalog, l as useUpcomingCompetitionDataset, s as useGlobalUpcomingDataset } from "./useSeasonCaddyData-Dg0b4Q_0.mjs";
import { n as startGoogleCalendarOAuth, t as googleCalendarApiFetch } from "./google-calendar-api-DD50STyh.mjs";
import { t as NextFixtureHero } from "./NextFixtureHero-80YIpIdt.mjs";
import { t as SeasonCaddySelect } from "./SeasonCaddySelect-DH84SJS2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dfhlw55K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
function canonicalTrackerTeamName(primary, fallback) {
	return primary?.trim() || fallback?.trim() || "";
}
function gameMatchesTrackerTeam(game, team) {
	if (!team) return true;
	return [
		game.home,
		game.away,
		game.canonicalHome,
		game.canonicalAway
	].some((value) => value?.trim() === team);
}
function competitionSortRank(competition) {
	if (competition.id === "nfl" || competition.id === "mlb" || competition.id === "nba" || competition.id === "nhl" || competition.id === "ufc" || competition.id === "formula-1") return 0;
	if (competition.id === "ncaa-football" || competition.id === "wnba") return 1;
	return 2;
}
function catalogLocation(item) {
	const locationItem = item;
	const rawLocation = locationItem.locationName ?? locationItem.location_name ?? locationItem.countryName ?? locationItem.country_name ?? locationItem.regionName ?? locationItem.region_name ?? locationItem.location ?? locationItem.country ?? locationItem.geography;
	return typeof rawLocation === "string" ? rawLocation.trim() : "";
}
function ViewportSticky({ children, wrapperClassName = "", contentClassName = "", top = 48 }) {
	const placeholderRef = (0, import_react.useRef)(null);
	const contentRef = (0, import_react.useRef)(null);
	const [sticky, setSticky] = (0, import_react.useState)(false);
	const [geometry, setGeometry] = (0, import_react.useState)({
		left: 0,
		width: 0,
		height: 0,
		scale: 1
	});
	(0, import_react.useEffect)(() => {
		let frame = 0;
		const update = () => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => {
				const placeholder = placeholderRef.current;
				const content = contentRef.current;
				if (!placeholder || !content) return;
				if (!(window.innerWidth >= 1024)) {
					setSticky(false);
					setGeometry({
						left: 0,
						width: 0,
						height: 0,
						scale: 1
					});
					return;
				}
				const rect = placeholder.getBoundingClientRect();
				const layoutWidth = placeholder.offsetWidth;
				const measuredScale = layoutWidth > 0 ? rect.width / layoutWidth : 1;
				const scale = Number.isFinite(measuredScale) && measuredScale > 0 ? measuredScale : 1;
				const nextSticky = rect.top <= top;
				setSticky(nextSticky);
				setGeometry({
					left: rect.left / scale,
					width: rect.width / scale,
					height: content.scrollHeight,
					scale
				});
			});
		};
		update();
		document.addEventListener("scroll", update, true);
		window.addEventListener("resize", update);
		const resizeObserver = new ResizeObserver(update);
		if (placeholderRef.current) resizeObserver.observe(placeholderRef.current);
		if (contentRef.current) resizeObserver.observe(contentRef.current);
		return () => {
			window.cancelAnimationFrame(frame);
			document.removeEventListener("scroll", update, true);
			window.removeEventListener("resize", update);
			resizeObserver.disconnect();
		};
	}, [top]);
	const content = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: contentRef,
		className: contentClassName,
		style: sticky ? {
			position: "fixed",
			top: `${top / geometry.scale}px`,
			left: `${geometry.left}px`,
			width: `${geometry.width}px`,
			maxHeight: `${Math.max(0, (window.innerHeight - top - 16) / geometry.scale)}px`,
			overflowY: "auto",
			boxSizing: "border-box",
			zIndex: 35
		} : void 0,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: placeholderRef,
		className: wrapperClassName,
		style: sticky ? { height: `${geometry.height}px` } : void 0,
		children: sticky && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(content, document.body) : content
	});
}
function Index() {
	const { user } = useAuth();
	const [sport, setSport] = (0, import_react.useState)("");
	const [leagueId, setLeagueId] = (0, import_react.useState)("");
	const [teams, setTeams] = (0, import_react.useState)([]);
	const [trackerSport, setTrackerSport] = (0, import_react.useState)("");
	const [trackerLocation, setTrackerLocation] = (0, import_react.useState)("");
	const [trackerLeague, setTrackerLeague] = (0, import_react.useState)("");
	const [trackerTeam, setTrackerTeam] = (0, import_react.useState)("");
	const [onlySavedTeams, setOnlySavedTeams] = (0, import_react.useState)(false);
	const [selectedProviderIds, setSelectedProviderIds] = (0, import_react.useState)([]);
	const isSoccerTracker = trackerSport === "soccer";
	const [savedLeagues, setSavedLeagues] = (0, import_react.useState)({});
	const [savedServices, setSavedServices] = (0, import_react.useState)([]);
	const { data: globalDataset, isLoading: isGlobalDatasetLoading, initialBatchReady, secondaryDataReady } = useGlobalUpcomingDataset();
	const { data: frontendCatalog = [] } = useFrontendCatalog(secondaryDataReady);
	const trackerCompetitionIds = (0, import_react.useMemo)(() => {
		const matchingCatalog = frontendCatalog.filter((item) => {
			if (item.upcomingCount <= 0) return false;
			if (trackerSport && normalizeCloudflareOptionValue(item.sport) !== trackerSport) return false;
			if (trackerSport === "soccer" && trackerLocation && catalogLocation(item) !== trackerLocation) return false;
			return true;
		});
		if (trackerLeague) {
			const selectedCompetition = matchingCatalog.find((item) => item.competitionName === trackerLeague);
			return selectedCompetition ? [selectedCompetition.competitionId] : [];
		}
		if (trackerSport) return matchingCatalog.map((item) => item.competitionId).sort();
		return [];
	}, [
		frontendCatalog,
		trackerSport,
		trackerLocation,
		trackerLeague
	]);
	const savedCompetitionIds = (0, import_react.useMemo)(() => Object.entries(savedLeagues).filter(([, savedTeams]) => savedTeams.length > 0).map(([competitionId]) => competitionId).sort(), [savedLeagues]);
	const identityCompetitionIds = (0, import_react.useMemo)(() => Array.from(/* @__PURE__ */ new Set([...leagueId ? [leagueId] : [], ...savedCompetitionIds])).sort(), [leagueId, savedCompetitionIds]);
	const { data: competitionIdentityCatalog = [] } = useCompetitionIdentityCatalog(identityCompetitionIds, secondaryDataReady);
	const competitionIdentityById = (0, import_react.useMemo)(() => new Map(competitionIdentityCatalog.map((competition) => [competition.competitionId, competition])), [competitionIdentityCatalog]);
	const requestedCompetitionIds = (0, import_react.useMemo)(() => Array.from(/* @__PURE__ */ new Set([...trackerCompetitionIds])).sort(), [trackerCompetitionIds]);
	const { data: selectedLeagueDataset, isFetching: isSelectedLeagueDatasetFetching } = useUpcomingCompetitionDataset(requestedCompetitionIds);
	const { data: savedTeamsDataset, isFetching: isSavedTeamsDatasetFetching } = useSavedTeamsDataset(onlySavedTeams && trackerCompetitionIds.length === 0 ? savedLeagues : {});
	const appGames = (0, import_react.useMemo)(() => {
		const byId = /* @__PURE__ */ new Map();
		for (const game of [
			...globalDataset?.games ?? [],
			...selectedLeagueDataset?.games ?? [],
			...savedTeamsDataset?.games ?? []
		]) byId.set(game.id, game);
		return Array.from(byId.values());
	}, [
		globalDataset,
		selectedLeagueDataset,
		savedTeamsDataset
	]);
	const liveBroadcasts = (0, import_react.useMemo)(() => {
		const byKey = /* @__PURE__ */ new Map();
		for (const broadcast of [
			...globalDataset?.broadcasts ?? [],
			...selectedLeagueDataset?.broadcasts ?? [],
			...savedTeamsDataset?.broadcasts ?? []
		]) {
			const key = `${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`;
			byKey.set(key, broadcast);
		}
		return Array.from(byKey.values());
	}, [
		globalDataset,
		selectedLeagueDataset,
		savedTeamsDataset
	]);
	const liveSportOptions = (0, import_react.useMemo)(() => {
		const bySport = /* @__PURE__ */ new Map();
		frontendCatalog.filter((item) => item.upcomingCount > 0).forEach((item) => {
			const sportId = normalizeCloudflareOptionValue(item.sport);
			if (!sportId || sportId === "unknown" || sportId === "unclassified" || sportId === "other") return;
			if (!bySport.has(sportId)) bySport.set(sportId, formatCloudflareOptionLabel(sportId));
		});
		return Array.from(bySport, ([id, name]) => ({
			id,
			name
		})).sort((a, b) => a.name.localeCompare(b.name));
	}, [frontendCatalog]);
	const liveCompetitionOptions = (0, import_react.useMemo)(() => frontendCatalog.filter((item) => item.upcomingCount > 0).map((item) => ({
		id: item.competitionId,
		name: item.competitionName || formatCloudflareOptionLabel(item.competitionId),
		sport: normalizeCloudflareOptionValue(item.sport),
		location: catalogLocation(item)
	})).sort((a, b) => a.name.localeCompare(b.name)), [frontendCatalog]);
	const competitionDisplayNameById = (0, import_react.useMemo)(() => {
		const names = /* @__PURE__ */ new Map();
		frontendCatalog.forEach((item) => {
			names.set(item.competitionId, item.competitionName || formatCloudflareOptionLabel(item.competitionId));
		});
		return names;
	}, [frontendCatalog]);
	function competitionDisplayName(competitionId) {
		return competitionDisplayNameById.get(competitionId) ?? formatCloudflareOptionLabel(competitionId);
	}
	function savedItemDisplayName(competitionId, savedValue) {
		if (savedValue === competitionId) return competitionDisplayName(competitionId);
		return savedValue;
	}
	const trackerLocationOptions = (0, import_react.useMemo)(() => {
		if (!isSoccerTracker) return [];
		return Array.from(new Set(liveCompetitionOptions.filter((competition) => competition.sport === "soccer" && Boolean(competition.location)).map((competition) => competition.location))).sort((a, b) => a.localeCompare(b));
	}, [liveCompetitionOptions, isSoccerTracker]);
	const trackerLocationCompetitionIds = (0, import_react.useMemo)(() => new Set(liveCompetitionOptions.filter((competition) => competition.sport === "soccer" && (!trackerLocation || competition.location === trackerLocation)).map((competition) => competition.id)), [liveCompetitionOptions, trackerLocation]);
	const competitionIdByName = (0, import_react.useMemo)(() => new Map(liveCompetitionOptions.map((competition) => [competition.name, competition.id])), [liveCompetitionOptions]);
	const leagueOptions = (0, import_react.useMemo)(() => liveCompetitionOptions.filter((competition) => competition.sport === sport), [liveCompetitionOptions, sport]);
	const league = leagueOptions.find((item) => item.id === leagueId);
	const leagueTeamOptions = (0, import_react.useMemo)(() => {
		if (!league) return [];
		const competition = competitionIdentityById.get(league.id);
		return competition ? catalogDisplayTeamNames(competition) : [];
	}, [competitionIdentityById, league]);
	const region = "United States";
	const selectedTimeZone = timeZoneForRegion(region);
	const [googleCalendarSyncStatus, setGoogleCalendarSyncStatus] = (0, import_react.useState)("idle");
	const [addingCalendarGameId, setAddingCalendarGameId] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	const [fixtureNow, setFixtureNow] = (0, import_react.useState)(() => Date.now());
	const prevSport = (0, import_react.useRef)(sport);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			setFixtureNow(Date.now());
		}, 3e4);
		return () => {
			window.clearInterval(timer);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setSavedServices([]);
			return;
		}
		fetchServices().then((rows) => {
			setSavedServices(rows.map((service) => service.provider_id));
		}).catch(() => {
			setSavedServices([]);
		});
		fetchPreferences({ canonicalize: false }).then((prefs) => {
			if (!prefs) return;
			setSavedLeagues(prefs.saved_leagues ?? { [prefs.league_id]: prefs.teams });
		}).catch(() => {
			toast.error("Could not load your saved slate");
		});
	}, [user?.id]);
	(0, import_react.useEffect)(() => {
		if (prevSport.current === sport) return;
		prevSport.current = sport;
		setLeagueId("");
		setTeams([]);
	}, [sport]);
	(0, import_react.useEffect)(() => {
		if (isSoccerTracker || !trackerLocation) return;
		setTrackerLocation("");
	}, [isSoccerTracker, trackerLocation]);
	(0, import_react.useEffect)(() => {
		if (!isSoccerTracker || !trackerLocation || !trackerLeague) return;
		if (liveCompetitionOptions.find((competition) => competition.name === trackerLeague)?.location === trackerLocation) return;
		setTrackerLeague("");
		setTrackerTeam("");
		setSelectedProviderIds([]);
	}, [
		isSoccerTracker,
		trackerLocation,
		trackerLeague,
		liveCompetitionOptions
	]);
	async function syncWithGoogleCalendar(competitionsToSync, automatic = false) {
		const competitions = competitionsToSync ?? savedLeagues;
		const savedTeamCount = Object.values(competitions).reduce((total, competitionTeams) => total + competitionTeams.length, 0);
		if (savedTeamCount === 0 && !automatic) {
			toast.error("Save at least one team first");
			return;
		}
		if (googleCalendarSyncStatus === "syncing" && !automatic) return;
		setGoogleCalendarSyncStatus("syncing");
		try {
			const statusResponse = await googleCalendarApiFetch("/google/status");
			const status = await statusResponse.json();
			if (!statusResponse.ok || !status.success) throw new Error(status.error ?? "Could not check Google Calendar connection");
			if (!status.connected) {
				setGoogleCalendarSyncStatus("idle");
				if (automatic) return;
				await startGoogleCalendarOAuth(normalizeRegion(region), "/");
				return;
			}
			const syncEvents = (await fetchDatasetForSavedTeams(competitions)).games.filter((game) => {
				if (!game.kickoff) return false;
				const kickoffMs = new Date(game.kickoff).getTime();
				return Number.isFinite(kickoffMs) && kickoffMs >= Date.now() - 216e5;
			}).map((game) => ({
				id: game.id,
				sport: game.sport,
				competition: game.league,
				league: game.league,
				home: game.home,
				away: game.away,
				kickoff: game.kickoff,
				scheduledDate: game.scheduledDate,
				scheduleLabel: game.scheduleLabel
			}));
			const syncResponse = await googleCalendarApiFetch("/google/sync", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					events: syncEvents,
					region: normalizeRegion(region)
				})
			});
			const result = await syncResponse.json();
			if (!syncResponse.ok || !result.success) throw new Error(result.error ?? "Could not sync Google Calendar");
			setGoogleCalendarSyncStatus("synced");
			if (automatic) {
				console.log("SeasonCaddy automatic Calendar sync:", {
					competitions,
					created: result.created,
					updated: result.updated,
					deleted: result.deleted,
					failed: result.failed,
					total: result.total
				});
				if (savedTeamCount === 0) toast.success(`${result.deleted ?? 0} Google Calendar fixture(s) removed`, { duration: 6e3 });
				else toast.success("Saved teams synced with Google Calendar", { duration: 6e3 });
				return;
			}
			toast.success(`${result.total} fixtures synced to Google Calendar`, { duration: 6e3 });
		} catch (error) {
			console.error("Google Calendar sync failed", error);
			setGoogleCalendarSyncStatus("idle");
			toast.error(error instanceof Error ? error.message : "Could not sync Google Calendar");
		}
	}
	async function addSingleGameToGoogleCalendar(game) {
		if (!game.kickoff) {
			toast.error("This fixture does not have a confirmed kickoff time yet.");
			return;
		}
		if (addingCalendarGameId) return;
		setAddingCalendarGameId(game.id);
		try {
			const statusResponse = await googleCalendarApiFetch("/google/status");
			const status = await statusResponse.json();
			if (!statusResponse.ok || !status.success) throw new Error(status.error ?? "Could not check Google Calendar connection");
			if (!status.connected) {
				await startGoogleCalendarOAuth(normalizeRegion(region), "/");
				return;
			}
			const providerNames = regionalProviderIds(game).map((providerId) => providerById(providerId)).filter((provider) => provider.id !== "tbd" && provider.id !== "not-live-uk").map((provider) => provider.name);
			const response = await googleCalendarApiFetch("/google/add-event", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					game: {
						id: game.id,
						sport: game.sport,
						league: game.league,
						home: game.home,
						away: game.away,
						kickoff: game.kickoff,
						scheduledDate: game.scheduledDate,
						scheduleLabel: game.scheduleLabel
					},
					providerNames,
					region: normalizeRegion(region)
				})
			});
			const result = await response.json();
			if (!response.ok || !result.success) throw new Error(result.error ?? "Could not add game to Google Calendar");
			toast.success(result.alreadyExists ? "This game is already in Google Calendar" : "Game added to Google Calendar");
		} catch (error) {
			console.error("Could not add single Google Calendar event", error);
			toast.error(error instanceof Error ? error.message : "Could not add game to Google Calendar");
		} finally {
			setAddingCalendarGameId(null);
		}
	}
	function regionalProviderIds(game) {
		const broadcastRegion = normalizeRegion(region);
		const competitionId = game.competitionId ?? competitionIdByName.get(game.league);
		const liveBroadcast = liveBroadcasts.find((broadcast) => {
			const sameCompetition = competitionId ? broadcast.competitionId === competitionId : broadcast.league === game.league;
			const sameFixture = broadcast.fixtureId ? broadcast.fixtureId === game.id : broadcast.home === game.home && broadcast.away === game.away;
			return sameCompetition && broadcast.region === broadcastRegion && sameFixture;
		});
		const normalizeProviderIds = (providerIds) => {
			const uniqueProviderIds = Array.from(new Set(providerIds.map((providerId) => providerId.trim()).filter(Boolean)));
			const isPlaceholderProviderId = (providerId) => {
				const normalized = providerId.toLowerCase().replace(/[_\s]+/g, "-");
				return normalized === "tbd" || normalized === "pending" || normalized === "provider-pending" || normalized === "broadcast-pending" || normalized === "not-live-uk" || providerById(providerId).id === "tbd";
			};
			const confirmedProviderIds = uniqueProviderIds.filter((providerId) => !isPlaceholderProviderId(providerId));
			return confirmedProviderIds.length > 0 ? confirmedProviderIds : uniqueProviderIds;
		};
		if (liveBroadcast && liveBroadcast.providerIds.length > 0) return normalizeProviderIds(liveBroadcast.providerIds);
		return normalizeProviderIds(getProviderIdsForGame(game, broadcastRegion));
	}
	async function saveSlate() {
		if (!user) {
			toast.error("Sign in to save your teams");
			return;
		}
		if (!sport || !league) {
			toast.error("Select a sport and competition first");
			return;
		}
		try {
			const currentPrefs = await fetchPreferences();
			const updatedSavedLeagues = {
				...Object.keys(savedLeagues).length > 0 ? savedLeagues : currentPrefs?.saved_leagues ?? {},
				[league.id]: [...teams]
			};
			await savePreferences(user.id, {
				sport,
				league_id: league.id,
				teams: [...teams],
				region: normalizeRegion(region),
				saved_leagues: updatedSavedLeagues
			});
			setSavedLeagues(updatedSavedLeagues);
			toast.success(teams.length === 0 ? `Removed all saved teams from ${league.name}` : `Saved ${teams.length} team(s) to your slate`);
			await syncWithGoogleCalendar(updatedSavedLeagues, true);
		} catch (error) {
			console.error("Could not save slate", error);
			toast.error("Could not save your slate");
		}
	}
	async function removeSavedTeam(savedLeagueId, team) {
		if (!user) {
			toast.error("Sign in to manage your saved teams");
			return;
		}
		const currentLeagueTeams = savedLeagues[savedLeagueId] ?? [];
		if (!currentLeagueTeams.includes(team)) return;
		const updatedLeagueTeams = currentLeagueTeams.filter((savedTeam) => savedTeam !== team);
		const updatedSavedLeagues = {
			...savedLeagues,
			[savedLeagueId]: updatedLeagueTeams
		};
		try {
			const currentPrefs = await fetchPreferences();
			const legacyLeagueId = currentPrefs?.league_id ?? savedLeagueId;
			const legacyCompetition = liveCompetitionOptions.find((item) => item.id === legacyLeagueId);
			await savePreferences(user.id, {
				sport: currentPrefs?.sport ?? legacyCompetition?.sport ?? "soccer",
				league_id: legacyLeagueId,
				teams: [...updatedSavedLeagues[legacyLeagueId] ?? []],
				region: normalizeRegion(region),
				saved_leagues: updatedSavedLeagues
			});
			setSavedLeagues(updatedSavedLeagues);
			if (leagueId === savedLeagueId) setTeams(updatedLeagueTeams);
			toast.success(`${savedItemDisplayName(savedLeagueId, team)} removed from your saved teams`);
			await syncWithGoogleCalendar(updatedSavedLeagues, true);
		} catch (error) {
			console.error("Could not remove saved team", error);
			toast.error("Could not remove the saved team");
		}
	}
	async function removeSavedCompetition(savedLeagueId, competitionName) {
		if (!user) {
			toast.error("Sign in to manage your saved teams");
			return;
		}
		const updatedSavedLeagues = {
			...savedLeagues,
			[savedLeagueId]: []
		};
		try {
			const currentPrefs = await fetchPreferences();
			const legacyLeagueId = currentPrefs?.league_id ?? savedLeagueId;
			const legacyCompetition = liveCompetitionOptions.find((item) => item.id === legacyLeagueId);
			await savePreferences(user.id, {
				sport: currentPrefs?.sport ?? legacyCompetition?.sport ?? "soccer",
				league_id: legacyLeagueId,
				teams: [...updatedSavedLeagues[legacyLeagueId] ?? []],
				region: normalizeRegion(region),
				saved_leagues: updatedSavedLeagues
			});
			setSavedLeagues(updatedSavedLeagues);
			if (leagueId === savedLeagueId) setTeams([]);
			toast.success(`${competitionName} removed from your saved teams`);
			await syncWithGoogleCalendar(updatedSavedLeagues, true);
		} catch (error) {
			console.error("Could not remove saved competition", error);
			toast.error("Could not remove the saved competition");
		}
	}
	async function markSubscribed(providerId) {
		if (!user) {
			toast.error("Sign in to save your subscriptions");
			return;
		}
		try {
			await upsertService(user.id, {
				provider_id: providerId,
				service_email: "",
				service_password: ""
			});
			setSavedServices((currentServices) => currentServices.includes(providerId) ? currentServices : [...currentServices, providerId]);
			toast.success("Subscription saved");
		} catch {
			toast.error("Could not save subscription");
		}
	}
	async function markUnsubscribed(providerId) {
		try {
			await deleteService(providerId);
			setSavedServices((currentServices) => currentServices.filter((id) => id !== providerId));
			toast.success("Subscription removed");
		} catch {
			toast.error("Could not remove subscription");
		}
	}
	const upcomingGames = (0, import_react.useMemo)(() => {
		return appGames.filter((game) => isUpcomingOrLiveGame(game, fixtureNow)).sort(sortGamesByDate);
	}, [appGames, fixtureNow]);
	const trackerLeagueOptions = (0, import_react.useMemo)(() => {
		return liveCompetitionOptions.filter((item) => {
			if (trackerSport && item.sport !== trackerSport) return false;
			if (isSoccerTracker && trackerLocation && item.location !== trackerLocation) return false;
			return true;
		}).sort((a, b) => {
			const rankDifference = competitionSortRank(a) - competitionSortRank(b);
			if (rankDifference !== 0) return rankDifference;
			return a.name.localeCompare(b.name);
		});
	}, [
		liveCompetitionOptions,
		trackerSport,
		trackerLocation,
		isSoccerTracker
	]);
	const trackerTeamOptions = (0, import_react.useMemo)(() => {
		const selectedCompetition = liveCompetitionOptions.find((competition) => competition.name === trackerLeague);
		const teamNames = appGames.filter((game) => {
			const fixtureSport = normalizeCloudflareOptionValue(game.sport);
			if (trackerSport && fixtureSport !== trackerSport) return false;
			if (isSoccerTracker && trackerLocation) {
				const gameCompetitionId = game.competitionId ?? competitionIdByName.get(game.league);
				if (!gameCompetitionId || !trackerLocationCompetitionIds.has(gameCompetitionId)) return false;
			}
			if (selectedCompetition && game.competitionId !== selectedCompetition.id) return false;
			return true;
		}).flatMap((game) => [canonicalTrackerTeamName(game.canonicalHome, game.home), canonicalTrackerTeamName(game.canonicalAway, game.away)]).filter(Boolean);
		return [...new Set(teamNames)].sort((a, b) => a.localeCompare(b));
	}, [
		appGames,
		liveCompetitionOptions,
		trackerSport,
		trackerLocation,
		trackerLeague,
		isSoccerTracker,
		trackerLocationCompetitionIds,
		competitionIdByName
	]);
	const providerFilterOptions = (0, import_react.useMemo)(() => {
		const selectedCompetition = liveCompetitionOptions.find((competition) => competition.name === trackerLeague);
		const eligibleFixtureIds = new Set(appGames.filter((game) => {
			if (trackerSport && normalizeCloudflareOptionValue(game.sport) !== trackerSport) return false;
			if (isSoccerTracker && trackerLocation) {
				const gameCompetitionId = game.competitionId ?? competitionIdByName.get(game.league);
				if (!gameCompetitionId || !trackerLocationCompetitionIds.has(gameCompetitionId)) return false;
			}
			if (selectedCompetition && game.competitionId !== selectedCompetition.id) return false;
			if (trackerTeam && !gameMatchesTrackerTeam(game, trackerTeam)) return false;
			return true;
		}).map((game) => game.id));
		const providerIds = liveBroadcasts.filter((broadcast) => normalizeRegion(broadcast.region) === normalizeRegion(region) && Boolean(broadcast.fixtureId && eligibleFixtureIds.has(broadcast.fixtureId))).flatMap((broadcast) => broadcast.providerIds).filter((providerId) => !isPendingProviderId(providerId));
		return Array.from(new Set(providerIds)).map((providerId) => providerById(providerId)).sort((a, b) => a.name.localeCompare(b.name));
	}, [
		appGames,
		liveBroadcasts,
		liveCompetitionOptions,
		trackerSport,
		trackerLocation,
		trackerLeague,
		trackerTeam,
		isSoccerTracker,
		trackerLocationCompetitionIds,
		competitionIdByName,
		region
	]);
	const filteredTrackerGames = (0, import_react.useMemo)(() => {
		return upcomingGames.filter((game) => {
			if (trackerSport && game.sport !== trackerSport) return false;
			if (isSoccerTracker && trackerLocation) {
				const gameCompetitionId = game.competitionId ?? competitionIdByName.get(game.league);
				if (!gameCompetitionId || !trackerLocationCompetitionIds.has(gameCompetitionId)) return false;
			}
			if (trackerLeague && game.league !== trackerLeague) return false;
			if (trackerTeam && !gameMatchesTrackerTeam(game, trackerTeam)) return false;
			if (onlySavedTeams) {
				const gameCompetitionId = game.competitionId ?? competitionIdByName.get(game.league);
				if (!gameCompetitionId) return false;
				const savedTeamsForGameCompetition = savedLeagues[gameCompetitionId] ?? [];
				if (!(savedTeamsForGameCompetition.includes(gameCompetitionId) || [
					game.home,
					game.away,
					game.canonicalHome,
					game.canonicalAway
				].some((teamName) => Boolean(teamName && savedTeamsForGameCompetition.includes(teamName))))) return false;
			}
			if (selectedProviderIds.length > 0) {
				const gameProviders = regionalProviderIds(game);
				if (!selectedProviderIds.some((providerId) => gameProviders.includes(providerId))) return false;
			}
			return true;
		});
	}, [
		upcomingGames,
		trackerSport,
		trackerLocation,
		trackerLeague,
		trackerTeam,
		isSoccerTracker,
		trackerLocationCompetitionIds,
		competitionIdByName,
		onlySavedTeams,
		selectedProviderIds,
		savedLeagues,
		region,
		liveBroadcasts
	]);
	const hasActiveTrackerFilters = Boolean(trackerSport || trackerLocation || trackerLeague || trackerTeam || onlySavedTeams || selectedProviderIds.length > 0);
	const visibleTrackerGames = (0, import_react.useMemo)(() => {
		return (hasActiveTrackerFilters ? filteredTrackerGames : upcomingGames).slice(0, 100);
	}, [
		hasActiveTrackerFilters,
		filteredTrackerGames,
		upcomingGames
	]);
	const heroFilterSignature = (0, import_react.useMemo)(() => JSON.stringify({
		trackerSport,
		trackerLocation,
		trackerLeague,
		trackerTeam,
		onlySavedTeams,
		selectedProviderIds: [...selectedProviderIds].sort(),
		region,
		savedLeagues: onlySavedTeams ? savedLeagues : void 0
	}), [
		trackerSport,
		trackerLocation,
		trackerLeague,
		trackerTeam,
		onlySavedTeams,
		selectedProviderIds,
		region,
		savedLeagues
	]);
	const [stableHero, setStableHero] = (0, import_react.useState)(null);
	const candidateNext = visibleTrackerGames[0] ?? null;
	const next = (stableHero?.signature === heroFilterSignature ? visibleTrackerGames.find((game) => game.id === stableHero.id) ?? null : null) ?? candidateNext;
	(0, import_react.useEffect)(() => {
		if (!candidateNext) {
			setStableHero(null);
			return;
		}
		setStableHero((current) => {
			if (current?.signature === heroFilterSignature && visibleTrackerGames.some((game) => game.id === current.id)) return current;
			return {
				signature: heroFilterSignature,
				id: candidateNext.id
			};
		});
	}, [
		candidateNext?.id,
		heroFilterSignature,
		visibleTrackerGames
	]);
	const fixtureDataLoading = !next && (isGlobalDatasetLoading || hasActiveTrackerFilters && requestedCompetitionIds.length > 0 && isSelectedLeagueDatasetFetching || hasActiveTrackerFilters && onlySavedTeams && trackerCompetitionIds.length === 0 && Object.keys(savedLeagues).length > 0 && isSavedTeamsDatasetFetching);
	const neededProviders = (0, import_react.useMemo)(() => {
		const providerIds = visibleTrackerGames.flatMap((game) => regionalProviderIds(game));
		return [...new Set(providerIds)].filter((providerId) => !isPendingProviderId(providerId)).map((providerId) => providerById(providerId));
	}, [
		visibleTrackerGames,
		region,
		liveBroadcasts
	]);
	const subscribedProviders = neededProviders.filter((provider) => savedServices.includes(provider.id));
	const unsubscribedProviders = neededProviders.filter((provider) => !savedServices.includes(provider.id));
	const readyCount = subscribedProviders.length;
	function toggleTeam(team) {
		setTeams((previousTeams) => previousTeams.includes(team) ? previousTeams.filter((currentTeam) => currentTeam !== team) : [...previousTeams, team]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		region,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewportSticky, {
				top: 80,
				wrapperClassName: "w-full shrink-0 lg:w-72 lg:self-start",
				contentClassName: "sportstream-scrollbar w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "panel h-fit space-y-5 p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 text-2xl font-extrabold",
							children: "Follow your Teams"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Sport",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonCaddySelect, {
								value: sport,
								placeholder: "Select Sport",
								options: liveSportOptions.map((item) => ({
									value: item.id,
									label: item.name
								})),
								onChange: setSport
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Competition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonCaddySelect, {
								value: leagueId,
								placeholder: "Select Competition",
								disabled: !sport,
								options: leagueOptions.map((item) => ({
									value: item.id,
									label: item.name
								})),
								onChange: (newLeagueId) => {
									setLeagueId(newLeagueId);
									setTeams(savedLeagues[newLeagueId] ?? []);
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold tracking-wide text-muted-foreground",
								children: "Teams"
							}), league && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "cursor-pointer text-xs font-semibold text-brand hover:underline",
								onClick: () => setTeams((currentTeams) => currentTeams.length > 0 ? [] : [...leagueTeamOptions]),
								children: teams.length > 0 ? "Clear all" : "Select all"
							})]
						}), league ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sportstream-scrollbar flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-2",
							children: leagueTeamOptions.map((team) => {
								const active = teams.includes(team);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => toggleTeam(team),
									className: `cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors ${active ? "border-brand bg-brand text-brand-foreground" : "border-border bg-surface-2/60 text-foreground hover:border-brand/60"}`,
									children: team
								}, team);
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: leagueTeamOptions.length > 0 ? "Choose one or more teams to focus your slate." : "Teams will appear when live fixture data is available for this competition."
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-relaxed text-muted-foreground",
							children: "Select a sport and competition to choose your teams."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: saveSlate,
							className: "flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4" }), user ? "Save my teams" : "Sign in to save my teams"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 border-t border-border/60 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold tracking-wide text-muted-foreground",
									children: "My Saved Teams"
								}), Object.values(savedLeagues).some((savedLeagueTeams) => savedLeagueTeams.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										Object.values(savedLeagues).reduce((total, savedLeagueTeams) => total + savedLeagueTeams.length, 0),
										" ",
										"saved"
									]
								})]
							}), Object.values(savedLeagues).every((savedLeagueTeams) => savedLeagueTeams.length === 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs leading-relaxed text-muted-foreground",
								children: "No saved teams yet."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: Object.entries(savedLeagues).map(([savedLeagueId, savedLeagueTeams]) => {
									if (savedLeagueTeams.length === 0) return null;
									const savedCompetition = competitionIdentityById.get(savedLeagueId);
									const availableTeams = savedCompetition ? catalogDisplayTeamNames(savedCompetition) : [];
									const competitionSaved = availableTeams.length > 0 && availableTeams.every((team) => savedLeagueTeams.includes(team));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold text-foreground",
											children: competitionDisplayName(savedLeagueId)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: competitionSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => removeSavedCompetition(savedLeagueId, competitionDisplayName(savedLeagueId)),
												"aria-label": `Remove ${competitionDisplayName(savedLeagueId)} from saved competitions`,
												title: `Remove ${competitionDisplayName(savedLeagueId)}`,
												className: "group inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand/40 bg-brand/10 px-2.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/15",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: competitionDisplayName(savedLeagueId) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													className: "text-base font-bold leading-none text-brand/60 transition-colors group-hover:text-brand",
													children: "×"
												})]
											}) : savedLeagueTeams.map((team) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => removeSavedTeam(savedLeagueId, team),
												"aria-label": `Remove ${savedItemDisplayName(savedLeagueId, team)} from saved teams`,
												title: `Remove ${savedItemDisplayName(savedLeagueId, team)}`,
												className: "group inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand/40 bg-brand/10 px-2.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/15",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: savedItemDisplayName(savedLeagueId, team) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													"aria-hidden": "true",
													className: "text-base font-bold leading-none text-brand/60 transition-colors group-hover:text-brand",
													children: "×"
												})]
											}, `${savedLeagueId}-${team}`))
										})]
									}, savedLeagueId);
								})
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "home-main-content flex-1 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextFixtureHero, {
					game: next,
					region,
					getProviderIds: regionalProviderIds,
					addingToCalendar: Boolean(next && addingCalendarGameId === next.id),
					onAddToGoogleCalendar: addSingleGameToGoogleCalendar,
					loading: fixtureDataLoading,
					emptyTitle: "No upcoming fixtures",
					emptyText: "There are currently no upcoming fixtures on the slate."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "home-dashboard-grid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "home-fixture-tracker panel min-w-0 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: mounted ? (/* @__PURE__ */ new Date()).toLocaleDateString(void 0, {
										weekday: "long",
										month: "long",
										day: "numeric",
										timeZone: selectedTimeZone
									}) : "Today"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-2xl font-extrabold",
									children: "Fixture Tracker"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Browse every upcoming fixture and narrow the schedule with the filters below."
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 rounded-xl border border-border/60 bg-surface-2/30 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 sm:flex-row",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonCaddySelect, {
												value: trackerSport,
												placeholder: "All Sports",
												options: [{
													value: "",
													label: "All Sports"
												}, ...liveSportOptions.map((item) => ({
													value: item.id,
													label: item.name
												}))],
												onChange: (newSport) => {
													setTrackerSport(newSport);
													if (newSport !== "soccer") setTrackerLocation("");
													const defaultCompetition = liveCompetitionOptions.filter((competition) => competition.sport === newSport && competitionSortRank(competition) === 0).sort((a, b) => a.name.localeCompare(b.name))[0];
													setTrackerLeague(defaultCompetition?.name ?? "");
													setTrackerTeam("");
													setSelectedProviderIds([]);
												}
											})
										}),
										isSoccerTracker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonCaddySelect, {
												value: trackerLocation,
												placeholder: "All Locations",
												options: [{
													value: "",
													label: "All Locations"
												}, ...trackerLocationOptions.map((location) => ({
													value: location,
													label: location
												}))],
												onChange: (newLocation) => {
													setTrackerLocation(newLocation);
													setTrackerLeague("");
													setTrackerTeam("");
													setSelectedProviderIds([]);
												}
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonCaddySelect, {
												value: trackerLeague,
												placeholder: "All Competitions",
												options: [{
													value: "",
													label: "All Competitions"
												}, ...trackerLeagueOptions.map((item) => ({
													value: item.name,
													label: item.name
												}))],
												onChange: (newLeague) => {
													setTrackerLeague(newLeague);
													setTrackerTeam("");
													setSelectedProviderIds([]);
												}
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeasonCaddySelect, {
												value: trackerTeam,
												placeholder: "All Teams",
												options: [{
													value: "",
													label: "All Teams"
												}, ...trackerTeamOptions.map((team) => ({
													value: team,
													label: team
												}))],
												onChange: (newTeam) => {
													setTrackerTeam(newTeam);
													setSelectedProviderIds([]);
												}
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "home-tracker-secondary-filters mt-4 border-t border-border/50 pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
											className: "group relative min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
												className: "gh-select flex min-h-10 cursor-pointer list-none items-center justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-foreground",
													children: selectedProviderIds.length === 0 ? "All Providers" : selectedProviderIds.length === 1 ? providerById(selectedProviderIds[0]).name : `${selectedProviderIds.length} Providers`
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute left-0 top-[calc(100%+6px)] z-40 w-full min-w-[220px] overflow-hidden border shadow-xl",
												style: {
													border: "1px solid color-mix(in oklch, var(--brand) 22%, var(--border))",
													borderRadius: "12px",
													background: "color-mix(in oklch, var(--surface-2) 94%, var(--background))",
													boxShadow: "0 18px 42px oklch(0 0 0 / 0.38)",
													backdropFilter: "blur(18px)"
												},
												children: [providerFilterOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "px-4 py-3 text-sm text-muted-foreground",
													children: "No confirmed providers"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "sportstream-scrollbar max-h-64 overflow-y-auto p-1.5",
													children: providerFilterOptions.map((provider) => {
														const selected = selectedProviderIds.includes(provider.id);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setSelectedProviderIds((current) => current.includes(provider.id) ? current.filter((id) => id !== provider.id) : [...current, provider.id]),
															className: `w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${selected ? "bg-brand text-brand-foreground" : "text-foreground hover:bg-brand/10 hover:text-brand"}`,
															children: provider.name
														}, provider.id);
													})
												}), selectedProviderIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setSelectedProviderIds([]),
													className: "w-full cursor-pointer border-t border-border px-4 py-2.5 text-left text-xs font-bold text-brand transition-colors hover:bg-brand/10",
													children: "Clear provider filters"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: !user,
											onClick: () => setOnlySavedTeams((current) => !current),
											title: user ? void 0 : "Sign in to filter by your saved teams",
											className: `min-h-10 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition-colors ${!user ? "cursor-not-allowed border-border/60 bg-surface-2/30 text-muted-foreground/45 opacity-60" : onlySavedTeams ? "cursor-pointer border-brand bg-brand text-brand-foreground" : "cursor-pointer border-border bg-surface-2/60 text-muted-foreground hover:border-brand hover:text-foreground"}`,
											children: onlySavedTeams ? "✓ Only showing my saved teams" : "Only show my saved teams"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: !trackerSport && !trackerLocation && !trackerLeague && !trackerTeam && !onlySavedTeams && selectedProviderIds.length === 0,
											onClick: () => {
												setTrackerSport("");
												setTrackerLocation("");
												setTrackerLeague("");
												setTrackerTeam("");
												setOnlySavedTeams(false);
												setSelectedProviderIds([]);
											},
											className: "min-h-10 cursor-pointer whitespace-nowrap rounded-full border border-border px-4 py-2 text-xs font-bold text-muted-foreground transition-colors hover:border-brand hover:text-foreground disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground",
											children: "Reset filters"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 divide-y divide-border/60",
								children: [visibleTrackerGames.length === 0 && (fixtureDataLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 py-6",
									"aria-live": "polite",
									"aria-busy": "true",
									children: [[
										0,
										1,
										2
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-xl border border-border/60 bg-surface-2/70" }, item)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "pt-2 text-center text-sm font-medium text-muted-foreground",
										children: "Loading upcoming fixtures…"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "py-10 text-center text-sm text-muted-foreground",
									children: "No upcoming fixtures match your current filters."
								})), visibleTrackerGames.map((game) => {
									const regionalProviderIdsForGame = Array.from(new Set(regionalProviderIds(game)));
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "home-fixture-row",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "home-fixture-date min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-display text-lg font-bold",
													children: formatTrackerDate(game.kickoff, game.scheduledDate, game.scheduleLabel, selectedTimeZone)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `mt-1 text-xs ${isGameLive(game, fixtureNow) ? "font-extrabold text-brand" : "text-muted-foreground"}`,
													children: isGameLive(game, fixtureNow) ? "LIVE NOW" : formatRegionalTime(game.kickoff, region)
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "home-fixture-match min-w-[150px] flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-semibold",
													children: gameDisplayTitle(game)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 text-xs text-muted-foreground",
													children: game.league
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "home-fixture-providers flex min-w-[95px] max-w-[210px] flex-[0_1_170px] flex-col gap-1 text-sm text-muted-foreground",
												children: regionalProviderIdsForGame.map((providerId) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "break-words leading-snug",
													children: providerById(providerId).name
												}, providerId))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "home-fixture-actions flex min-w-[138px] max-w-[290px] flex-[0_1_290px] flex-wrap items-center justify-end gap-2",
												children: [game.kickoff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													disabled: addingCalendarGameId === game.id,
													onClick: () => addSingleGameToGoogleCalendar(game),
													className: "min-w-[138px] flex-1 cursor-pointer whitespace-nowrap rounded-md border border-brand/40 bg-brand/5 px-3 py-1.5 text-center text-xs font-bold text-brand transition-colors hover:bg-brand/10 disabled:cursor-wait disabled:opacity-60",
													children: addingCalendarGameId === game.id ? "Adding..." : "Add to Google Calendar"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/game/$gameId",
													params: { gameId: game.id },
													search: { region },
													className: "min-w-[138px] flex-1 cursor-pointer whitespace-nowrap rounded-md border border-border bg-surface-2 px-3 py-1.5 text-center text-xs font-bold transition-colors hover:border-brand",
													children: "View watch options"
												})]
											})
										]
									}, game.id);
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewportSticky, {
						top: 80,
						wrapperClassName: "home-coverage-sidebar min-w-0",
						contentClassName: "sportstream-scrollbar w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel h-fit space-y-4 p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-extrabold",
									children: "Services you need"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow mt-1",
									children: "Coverage planner"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										neededProviders.length,
										" ",
										"service",
										neededProviders.length === 1 ? "" : "s",
										" ",
										"cover these games."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 border-t border-border/60 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold tracking-wide text-muted-foreground",
										children: "Subscribed"
									}), subscribedProviders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "No matching subscriptions saved yet."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-2",
										children: subscribedProviders.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between rounded-md border border-emerald-500 bg-emerald-500 px-3 py-2 text-white",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold",
												children: provider.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-bold text-white",
													children: "Subscribed"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													"aria-label": `Remove ${provider.name} subscription`,
													title: "Remove subscription",
													onClick: () => markUnsubscribed(provider.id),
													className: "flex -translate-y-px cursor-pointer items-center justify-center text-2xl font-bold leading-none text-white/80 transition-colors hover:text-white",
													children: "×"
												})]
											})]
										}, provider.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 border-t border-border/60 pt-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold tracking-wide text-muted-foreground",
										children: "Services for these games"
									}), unsubscribedProviders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "You're subscribed to all services needed for these games."
									}) : unsubscribedProviders.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2 border-b border-border/40 pb-3 last:border-b-0 last:pb-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold",
											children: provider.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-4",
											children: [provider.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: provider.url,
												target: "_blank",
												rel: "noreferrer",
												className: "cursor-pointer text-xs font-bold text-brand hover:underline",
												children: "Subscribe"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Subscription link unavailable"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => markSubscribed(provider.id),
												className: "cursor-pointer text-xs font-bold text-muted-foreground transition-colors hover:text-brand hover:underline",
												children: "Already subscribed?"
											})]
										})]
									}, provider.id))]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors ${neededProviders.length > 0 && readyCount === neededProviders.length ? "border-emerald-500 bg-emerald-500 text-white" : "border-brand/40 bg-brand/10 text-brand"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }),
										readyCount,
										" ",
										"of",
										" ",
										neededProviders.length,
										" ",
										"subscribed"
									]
								})
							]
						})
					})]
				})]
			})]
		})
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "block space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-xs font-bold tracking-wide text-muted-foreground",
			children: label
		}), children]
	});
}
function formatTrackerDate(kickoff, scheduledDate, scheduleLabel, timeZone) {
	if (!kickoff && !scheduledDate) return scheduleLabel ?? "Date TBD";
	const date = kickoff ? new Date(kickoff) : /* @__PURE__ */ new Date(`${scheduledDate}T12:00:00`);
	const weekday = new Intl.DateTimeFormat("en-US", {
		weekday: "short",
		timeZone
	}).format(date);
	const month = new Intl.DateTimeFormat("en-US", {
		month: "short",
		timeZone
	}).format(date);
	const day = Number(new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		timeZone
	}).format(date));
	return `${weekday}, ${month} ${day}${ordinalSuffix(day)}`;
}
function ordinalSuffix(day) {
	if (day >= 11 && day <= 13) return "th";
	switch (day % 10) {
		case 1: return "st";
		case 2: return "nd";
		case 3: return "rd";
		default: return "th";
	}
}
function gameDate(game) {
	if (game.kickoff) {
		const date = new Date(game.kickoff);
		if (!Number.isNaN(date.getTime())) return date;
	}
	if (game.scheduledDate) {
		const date = /* @__PURE__ */ new Date(`${game.scheduledDate}T12:00:00`);
		if (!Number.isNaN(date.getTime())) return date;
	}
	return null;
}
function sortGamesByDate(a, b) {
	const aDate = gameDate(a);
	const bDate = gameDate(b);
	if (!aDate && !bDate) return 0;
	if (!aDate) return 1;
	if (!bDate) return -1;
	return aDate.getTime() - bDate.getTime();
}
function normalizeCloudflareOptionValue(value) {
	return value.trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");
}
function formatCloudflareOptionLabel(value) {
	const normalizedValue = value.trim().toLowerCase();
	if (normalizedValue === "mma") return "MMA";
	if (normalizedValue === "afl") return "AFL";
	return value.replace(/[-_]+/g, " ").replace(/\b\w/g, (character) => character.toUpperCase());
}
function isPendingProviderId(providerId) {
	const normalized = providerId.trim().toLowerCase().replace(/[_\s]+/g, "-");
	const resolvedProviderId = providerById(providerId).id.trim().toLowerCase().replace(/[_\s]+/g, "-");
	return normalized === "tbd" || normalized === "pending" || normalized === "provider-pending" || normalized === "broadcast-pending" || normalized === "not-live-uk" || resolvedProviderId === "tbd" || resolvedProviderId === "pending" || resolvedProviderId === "provider-pending" || resolvedProviderId === "broadcast-pending" || resolvedProviderId === "not-live-uk";
}
function normalizeRegion(region) {
	if (region.startsWith("United States")) return "United States";
	if (region === "United Kingdom") return "United Kingdom";
	if (region === "Canada") return "Canada";
	return "United States";
}
//#endregion
export { Index as component };
