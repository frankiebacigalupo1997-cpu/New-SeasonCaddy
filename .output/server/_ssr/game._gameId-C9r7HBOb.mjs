import { n as __toESM } from "../_runtime.mjs";
import { i as require_react, r as usePostHog } from "../_libs/@posthog/react+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { D as ExternalLink, z as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Shell } from "./Shell-B-UeI_De.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as timeZoneForRegion, S as providerById, _ as heroDisplayTitle, b as isGameLive, d as formatKickoff, f as formatRegionalTime, g as heroCompetitors, h as getProviderIdsForGame, s as fetchFrontendIdentityCatalog, v as hideHeroCompetitorArtwork, y as isEventTitleOnlyGame } from "./frontend-data-DJPCkXA4.mjs";
import { t as Route } from "./game._gameId-BuiUV0zv.mjs";
import { n as startGoogleCalendarOAuth, t as googleCalendarApiFetch } from "./google-calendar-api-Bq6X0jli.mjs";
import { n as fetchPreferences } from "./gamehub-cloud-BrDIH9pz.mjs";
import { n as getSportHeroStyle, r as useGameTimingBoundary, t as LiveCountdown } from "./GameTiming-BbAEZaon.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/game._gameId-C9r7HBOb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GamePage() {
	const posthog = usePostHog();
	const { game, broadcasts: liveBroadcasts } = Route.useLoaderData();
	const search = Route.useSearch();
	const [region, setRegion] = (0, import_react.useState)(normalizeRegion(search.region ?? "United States"));
	const [addingToCalendar, setAddingToCalendar] = (0, import_react.useState)(false);
	async function addGameToGoogleCalendar() {
		if (!game.kickoff) {
			toast.error("This fixture does not have a confirmed kickoff time yet.");
			return;
		}
		if (addingToCalendar) return;
		setAddingToCalendar(true);
		try {
			const statusResponse = await googleCalendarApiFetch("/google/status");
			const status = await statusResponse.json();
			if (!statusResponse.ok || !status.success) throw new Error(status.error ?? "Could not check Google Calendar connection");
			if (!status.connected) {
				await startGoogleCalendarOAuth(regionLabel, `${window.location.pathname}${window.location.search}`);
				return;
			}
			const response = await googleCalendarApiFetch("/google/add-event", {
				method: "POST",
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
					providerNames: realProviders.map((provider) => provider.name),
					region: regionLabel
				})
			});
			const result = await response.json();
			if (!response.ok || !result.success) throw new Error(result.error ?? "Could not add game to Google Calendar");
			posthog?.capture("fixture_added_to_calendar", {
				sport: game.sport,
				competition_id: game.competitionId,
				provider_count: realProviders.length,
				already_exists: Boolean(result.alreadyExists)
			});
			toast.success(result.alreadyExists ? "This game is already in Google Calendar" : "Game added to Google Calendar");
		} catch (error) {
			console.error("Could not add Google Calendar event from watch options", error);
			toast.error(error instanceof Error ? error.message : "Could not add game to Google Calendar");
		} finally {
			setAddingToCalendar(false);
		}
	}
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function loadPreferences() {
			try {
				const preferences = await fetchPreferences();
				if (!cancelled && !search.region && preferences?.region) setRegion(normalizeRegion(preferences.region));
			} catch (error) {
				console.error("Could not load saved region. Using United States fallback.", error);
			}
		}
		loadPreferences();
		return () => {
			cancelled = true;
		};
	}, [search.region]);
	useGameTimingBoundary(game);
	const selectedTimeZone = timeZoneForRegion(region);
	function regionalProviderIds() {
		const broadcastRegion = normalizeRegion(region);
		const competitionId = game.competitionId ?? void 0;
		const liveBroadcast = liveBroadcasts.find((broadcast) => {
			const sameCompetition = competitionId ? broadcast.competitionId === competitionId : broadcast.league === game.league;
			const sameFixture = broadcast.fixtureId ? broadcast.fixtureId === game.id : broadcast.home === game.home && broadcast.away === game.away;
			return sameCompetition && broadcast.region === broadcastRegion && sameFixture;
		});
		if (liveBroadcast && liveBroadcast.providerIds.length > 0) return Array.from(new Set(liveBroadcast.providerIds));
		return getProviderIdsForGame(game, broadcastRegion);
	}
	const providers = (0, import_react.useMemo)(() => regionalProviderIds().map((providerId) => providerById(providerId)), [
		game,
		region,
		liveBroadcasts
	]);
	const realProviders = providers.filter((provider) => provider.id !== "tbd" && provider.id !== "not-live-uk");
	const broadcastPending = providers.some((provider) => provider.id === "tbd");
	const notLiveInUk = providers.some((provider) => provider.id === "not-live-uk");
	const eventTitleOnly = isEventTitleOnlyGame(game);
	const displayTitle = heroDisplayTitle(game);
	const competitors = heroCompetitors(game);
	const textOnlyCombatHero = hideHeroCompetitorArtwork(game.sport);
	const heroBackground = getSportHeroStyle(game.sport, game.competitionId);
	const regionLabel = normalizeRegion(region);
	const liveNow = isGameLive(game);
	const kickoffDisplay = game.kickoff ? formatRegionalTime(game.kickoff, region) : formatKickoff(game.kickoff, game.scheduledDate, game.scheduleLabel, selectedTimeZone);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, {
		region: regionLabel,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-[1200px] space-y-6 px-4 py-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					search: { region: regionLabel },
					className: "inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Back"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "panel relative overflow-hidden bg-pitch p-8",
					style: heroBackground,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: eventTitleOnly ? "relative z-10 grid gap-8" : "relative z-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-bold text-brand",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-brand" }), liveNow ? "LIVE NOW" : eventTitleOnly ? "Event" : "Fixture"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold text-muted-foreground",
									children: game.league
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow mt-6",
								children: liveNow ? eventTitleOnly ? "Live event" : "Live fixture" : eventTitleOnly ? "Countdown to event" : "Countdown to kickoff"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-4xl leading-none font-extrabold sm:text-5xl",
								children: displayTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-sm text-muted-foreground",
								children: [kickoffDisplay, liveNow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" ", "· LIVE NOW"] }) : game.kickoff ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									" ",
									"· Starts in",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCountdown, { target: game.kickoff })
								] }) : null]
							}),
							game.kickoff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: addGameToGoogleCalendar,
									disabled: addingToCalendar,
									className: "inline-flex min-w-60 items-center justify-center whitespace-nowrap rounded-lg border border-brand/40 px-6 py-3 text-sm font-bold text-brand transition hover:bg-brand/10 disabled:cursor-wait disabled:opacity-60",
									children: addingToCalendar ? "Adding..." : "Add to Google Calendar"
								})
							})
						] }), !eventTitleOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-6 py-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`,
											children: [!textOnlyCombatHero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCrest, {
												team: competitors.home,
												canonicalTeam: game.canonicalHome ?? game.home,
												sport: game.sport,
												competitionId: game.competitionId,
												crestUrl: game.homeCrestUrl
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-center text-sm font-extrabold",
												children: competitors.home
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "shrink-0 text-sm font-black tracking-widest text-muted-foreground",
											children: "VS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`,
											children: [!textOnlyCombatHero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCrest, {
												team: competitors.away,
												canonicalTeam: game.canonicalAway ?? game.away,
												sport: game.sport,
												competitionId: game.competitionId,
												crestUrl: game.awayCrestUrl
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-center text-sm font-extrabold",
												children: competitors.away
											})]
										})
									]
								})
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-3xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "panel overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "eyebrow",
										children: "Where to watch"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 text-2xl font-extrabold",
										children: eventTitleOnly ? "Watch this event" : "Watch this match"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mx-auto mt-2 max-w-xl text-sm text-muted-foreground",
										children: notLiveInUk ? `This ${eventTitleOnly ? "event" : "fixture"} is not scheduled for live domestic television coverage in the United Kingdom.` : broadcastPending ? `Broadcast information is pending for this ${eventTitleOnly ? "event" : "fixture"}.` : `Select one of the confirmed viewing options available for this ${eventTitleOnly ? "event" : "fixture"} in your region.`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm font-semibold text-foreground",
										children: regionLabel
									})
								]
							}), notLiveInUk ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-surface-2/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: "Not televised live in UK"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										"No live domestic broadcaster is currently listed for this ",
										eventTitleOnly ? "event" : "fixture",
										"."
									]
								})]
							}) : broadcastPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-surface-2/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: "Provider pending"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "Official broadcast information has not yet been confirmed for this fixture in your selected region."
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-3",
								children: realProviders.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/60 p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: provider.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: ["Confirmed viewing option for ", regionLabel]
									})] }), provider.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: provider.url,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-brand-foreground shadow-glow",
										children: [
											"Watch on",
											" ",
											provider.name,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" })
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold text-muted-foreground",
										children: "Link unavailable"
									})]
								}, provider.id))
							})]
						})
					})
				})
			]
		})
	});
}
async function lookupSupabaseCrest({ canonicalTeam, sport, competitionId }) {
	if (!competitionId) return;
	try {
		const competition = (await fetchFrontendIdentityCatalog()).find((item) => item.competitionId === competitionId && item.sport.toLowerCase() === sport.toLowerCase());
		if (!competition) return;
		const normalize = (value) => value.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
		const target = normalize(canonicalTeam);
		return competition.canonicalTeams.find((item) => normalize(item.displayName) === target || item.aliases.some((alias) => normalize(alias) === target))?.crestUrl || void 0;
	} catch (error) {
		console.error("Supabase crest lookup failed:", error);
		return;
	}
}
function TeamCrest({ team, canonicalTeam, sport, competitionId, crestUrl }) {
	const [fallbackUrl, setFallbackUrl] = (0, import_react.useState)();
	const [imageFailed, setImageFailed] = (0, import_react.useState)(false);
	const [fallbackChecked, setFallbackChecked] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setFallbackUrl(void 0);
		setImageFailed(false);
		setFallbackChecked(false);
		if (!crestUrl) lookupSupabaseCrest({
			canonicalTeam,
			sport,
			competitionId
		}).then((url) => {
			if (cancelled) return;
			setFallbackUrl(url);
			setFallbackChecked(true);
			if (!url) setImageFailed(true);
		});
		return () => {
			cancelled = true;
		};
	}, [
		team,
		canonicalTeam,
		sport,
		competitionId,
		crestUrl
	]);
	const handleImageError = async () => {
		if (fallbackChecked) {
			setImageFailed(true);
			return;
		}
		setFallbackChecked(true);
		const url = await lookupSupabaseCrest({
			canonicalTeam,
			sport,
			competitionId
		});
		if (url && url !== crestUrl) {
			setFallbackUrl(url);
			return;
		}
		setImageFailed(true);
	};
	const initials = team.split(" ").map((word) => word[0]).join("").slice(0, 3).toUpperCase();
	const resolvedCrest = fallbackUrl || crestUrl;
	if (imageFailed || !resolvedCrest) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-24 w-full items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-20 place-items-center rounded-full border border-border bg-surface-2 text-sm font-black shadow-lg",
			children: initials
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-24 w-full items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: resolvedCrest,
			alt: `${team} crest`,
			className: "h-24 w-24 object-contain drop-shadow-xl",
			onError: handleImageError
		})
	});
}
function normalizeRegion(region) {
	if (region.startsWith("United States")) return "United States";
	if (region === "United Kingdom") return "United Kingdom";
	if (region === "Canada") return "Canada";
	return "United States";
}
//#endregion
export { GamePage as component };
