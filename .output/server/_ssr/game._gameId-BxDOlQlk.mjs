import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowLeft, x as ExternalLink } from "../_libs/lucide-react.mjs";
import { C as timeZoneForRegion, S as providerById, _ as heroDisplayTitle, b as isGameLive, d as formatKickoff, f as formatRegionalTime, g as heroCompetitors, h as getProviderIdsForGame, v as hideHeroCompetitorArtwork, y as isEventTitleOnlyGame } from "./frontend-data-BOEejV6T.mjs";
import { t as Route } from "./game._gameId-DI1GaJwj.mjs";
import { t as Shell } from "./Shell-C3AN-g_y.mjs";
import { n as fetchPreferences } from "./gamehub-cloud-DHEwKg8Z.mjs";
import { i as useGameTimingBoundary, n as getSportHeroStyle, r as getTeamArtwork, t as LiveCountdown } from "./GameTiming-DxbI_dGr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/game._gameId-BxDOlQlk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function googleDate(date) {
	return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}
function googleCalendarUrl({ game, providerNames = [] }) {
	if (!game.kickoff) return null;
	const start = new Date(game.kickoff);
	if (Number.isNaN(start.getTime())) return null;
	const end = new Date(start.getTime() + 72e5);
	const title = `${game.home} vs ${game.away}`;
	const details = [
		game.league,
		"",
		providerNames.length > 0 ? `Watch on: ${providerNames.join(", ")}` : "Provider pending",
		"",
		"Added from SeasonCaddy"
	].join("\n");
	return "https://calendar.google.com/calendar/render?" + new URLSearchParams({
		action: "TEMPLATE",
		text: title,
		dates: `${googleDate(start)}/${googleDate(end)}`,
		details
	}).toString();
}
function GamePage() {
	const { game, broadcasts: liveBroadcasts } = Route.useLoaderData();
	const search = Route.useSearch();
	const [region, setRegion] = (0, import_react.useState)(normalizeRegion(search.region ?? "United States"));
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
	const calendarUrl = googleCalendarUrl({
		game,
		providerNames: realProviders.map((provider) => provider.name)
	});
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
							calendarUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: calendarUrl,
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex min-w-60 items-center justify-center whitespace-nowrap rounded-lg border border-brand/40 px-6 py-3 text-sm font-bold text-brand transition hover:bg-brand/10",
									children: "Add to Google Calendar"
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
function TeamCrest({ team, crestUrl }) {
	const artwork = getTeamArtwork(team);
	const resolvedCrest = crestUrl || artwork?.crest;
	const [imageFailed, setImageFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setImageFailed(false);
	}, [team, crestUrl]);
	const initials = team.split(" ").map((word) => word[0]).join("").slice(0, 3).toUpperCase();
	if (!resolvedCrest || imageFailed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
			onError: () => setImageFailed(true)
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
