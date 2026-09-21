import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Play } from "../_libs/lucide-react.mjs";
import { C as timeZoneForRegion, S as providerById, _ as heroDisplayTitle, b as isGameLive, d as formatKickoff, f as formatRegionalTime, g as heroCompetitors, v as hideHeroCompetitorArtwork, y as isEventTitleOnlyGame } from "./frontend-data-BOEejV6T.mjs";
import { i as useGameTimingBoundary, n as getSportHeroStyle, r as getTeamArtwork, t as LiveCountdown } from "./GameTiming-DxbI_dGr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/NextFixtureHero-80YIpIdt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NextFixtureHero({ game, region, getProviderIds, addingToCalendar = false, onAddToGoogleCalendar, loading = false, emptyTitle = "No upcoming fixtures", emptyText = "There are no upcoming fixtures to show.", emptyAction }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	useGameTimingBoundary(game);
	const selectedTimeZone = timeZoneForRegion(region);
	const liveNow = Boolean(game && isGameLive(game));
	const eventTitleOnly = Boolean(game && isEventTitleOnlyGame(game));
	const displayTitle = game ? heroDisplayTitle(game) : "";
	const competitors = game ? heroCompetitors(game) : null;
	const textOnlyCombatHero = Boolean(game && hideHeroCompetitorArtwork(game.sport));
	const heroBackground = getSportHeroStyle(game?.sport, game?.competitionId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "panel relative overflow-hidden bg-pitch px-6 py-6 sm:px-8 sm:py-8",
		style: heroBackground,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-bold text-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-brand" }), liveNow ? "LIVE NOW" : eventTitleOnly ? "Next event" : "Next fixture"]
				}), game && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold text-muted-foreground",
					children: game.league
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixtureHeroLoading, {}) : game ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				!eventTitleOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex w-full max-w-2xl items-center justify-center gap-6 sm:gap-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`,
							children: [!textOnlyCombatHero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCrest, {
								team: competitors?.home ?? game.home,
								crestUrl: game.homeCrestUrl
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-sm font-extrabold sm:text-base",
								children: competitors?.home ?? game.home
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-black tracking-[0.25em] text-muted-foreground",
								children: "VS"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`,
							children: [!textOnlyCombatHero && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamCrest, {
								team: competitors?.away ?? game.away,
								crestUrl: game.awayCrestUrl
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-center text-sm font-extrabold sm:text-base",
								children: competitors?.away ?? game.away
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `eyebrow ${eventTitleOnly ? "mt-8" : "mt-5"}`,
					children: liveNow ? eventTitleOnly ? "Live event" : "Live fixture" : eventTitleOnly ? "Countdown to event" : "Countdown to kickoff"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 text-3xl leading-[1.05] font-extrabold sm:text-4xl xl:text-5xl",
					children: displayTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: game.kickoff ? liveNow ? `${formatRegionalTime(game.kickoff, region)} · LIVE NOW` : mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						formatRegionalTime(game.kickoff, region),
						" · Starts in ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCountdown, { target: game.kickoff })
					] }) : `${formatRegionalTime(game.kickoff, region)} · ${eventTitleOnly ? "Upcoming event" : "Upcoming fixture"}` : formatKickoff(game.kickoff, game.scheduledDate, game.scheduleLabel, selectedTimeZone)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm font-medium text-muted-foreground",
					children: [
						getProviderIds(game).map((providerId) => providerById(providerId).name).join(" · "),
						" · ",
						game.league
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center justify-center gap-3",
					children: [game.kickoff && onAddToGoogleCalendar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: addingToCalendar,
						onClick: () => onAddToGoogleCalendar(game),
						className: "flex min-w-56 cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand/40 px-6 py-3 text-sm font-bold text-brand transition hover:bg-brand/10 disabled:cursor-wait disabled:opacity-60",
						children: addingToCalendar ? "Adding..." : "Add to Google Calendar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/game/$gameId",
						params: { gameId: game.id },
						search: { region },
						className: "flex min-w-56 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }), "View watch options"]
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-8 text-4xl font-extrabold sm:text-5xl",
					children: emptyTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: emptyText
				}),
				emptyAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: emptyAction
				})
			] })]
		})
	});
}
function FixtureHeroLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-8 flex w-full max-w-2xl flex-col items-center",
		"aria-live": "polite",
		"aria-busy": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-4/5 max-w-lg animate-pulse rounded-lg bg-surface-2/80" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-5 h-4 w-52 animate-pulse rounded-full bg-surface-2/70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid w-full grid-cols-3 items-center gap-6 sm:gap-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-20 animate-pulse rounded-full border border-border/60 bg-surface-2/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-24 animate-pulse rounded-full bg-surface-2/70" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-4 w-8 animate-pulse rounded-full bg-surface-2/60" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-20 animate-pulse rounded-full border border-border/60 bg-surface-2/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-24 animate-pulse rounded-full bg-surface-2/70" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm font-semibold text-muted-foreground",
				children: "Loading upcoming fixtures…"
			})
		]
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
//#endregion
export { NextFixtureHero as t };
