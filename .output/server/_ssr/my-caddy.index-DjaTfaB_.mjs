import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./useAuth-CNmA0ie9.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as ChevronLeft, S as Clock3, T as ChevronRight, i as Tv } from "../_libs/lucide-react.mjs";
import { C as timeZoneForRegion, S as providerById, b as isGameLive, f as formatRegionalTime, h as getProviderIdsForGame, m as gameLiveEndTime, t as catalogDisplayTeamNames, x as isUpcomingOrLiveGame } from "./frontend-data-BOEejV6T.mjs";
import { a as upsertService, n as fetchPreferences, r as fetchServices, t as deleteService } from "./gamehub-cloud-DHEwKg8Z.mjs";
import { a as useFrontendCatalog, c as useSavedTeamsDataset, i as useCompetitionIdentityCatalog } from "./useSeasonCaddyData-Dg0b4Q_0.mjs";
import { t as NextFixtureHero } from "./NextFixtureHero-80YIpIdt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-caddy.index-DjaTfaB_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CompactCalendar({ games, region }) {
	const today = todayForRegion(region);
	const [currentDate, setCurrentDate] = (0, import_react.useState)(new Date(today.year, today.month - 1, today.day));
	const rangeLabel = (0, import_react.useMemo)(() => {
		const start = startOfWeek(currentDate);
		const end = new Date(start);
		end.setDate(start.getDate() + 27);
		if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) return start.toLocaleDateString("en-US", {
			month: "long",
			year: "numeric"
		});
		if (start.getFullYear() === end.getFullYear()) return `${start.toLocaleDateString("en-US", { month: "short" })} – ${end.toLocaleDateString("en-US", {
			month: "short",
			year: "numeric"
		})}`;
		return `${start.toLocaleDateString("en-US", {
			month: "short",
			year: "numeric"
		})} – ${end.toLocaleDateString("en-US", {
			month: "short",
			year: "numeric"
		})}`;
	}, [currentDate]);
	const calendarDays = (0, import_react.useMemo)(() => {
		const startDate = startOfWeek(currentDate);
		const days = [];
		for (let i = 0; i < 28; i++) {
			const date = new Date(startDate);
			date.setDate(startDate.getDate() + i);
			days.push({
				day: date.getDate(),
				dateKey: formatDateKey(date),
				date
			});
		}
		return days;
	}, [currentDate]);
	const gamesByDate = (0, import_react.useMemo)(() => {
		const grouped = {};
		for (const game of games) {
			const key = gameDateKeyForRegion(game, region);
			if (!key) continue;
			if (!grouped[key]) grouped[key] = [];
			grouped[key].push(game);
		}
		return grouped;
	}, [games, region]);
	function previousRange() {
		const previousDate = new Date(currentDate);
		previousDate.setDate(currentDate.getDate() - 28);
		setCurrentDate(previousDate);
	}
	function nextRange() {
		const nextDate = new Date(currentDate);
		nextDate.setDate(currentDate.getDate() + 28);
		setCurrentDate(nextDate);
	}
	function goToToday() {
		const today = todayForRegion(region);
		setCurrentDate(new Date(today.year, today.month - 1, today.day));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "compact-caddy-calendar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "compact-caddy-calendar-header",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "m-0 text-lg font-extrabold",
					children: "My Calendar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Your saved-team fixtures"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/my-caddy/calendar",
					className: "shrink-0 text-xs font-bold text-brand",
					children: "View full calendar"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "compact-caddy-calendar-controls",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Previous four weeks",
							onClick: previousRange,
							className: "compact-calendar-control",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: goToToday,
							className: "compact-calendar-today",
							children: "Today"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Next four weeks",
							onClick: nextRange,
							className: "compact-calendar-control",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-bold",
					children: rangeLabel
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "compact-calendar-weekdays",
				children: [
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat"
				].map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: day }, day))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "compact-calendar-grid",
				children: calendarDays.map((calendarDay) => {
					const dayGames = [...gamesByDate[calendarDay.dateKey] ?? []].sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime());
					const isToday = calendarDay.dateKey === todayForRegion(region).dateKey;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "compact-calendar-day",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "compact-calendar-day-header",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: isToday ? "compact-calendar-today-number" : "compact-calendar-day-number",
								children: calendarDay.day
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "compact-calendar-fixtures",
							children: [dayGames.slice(0, 1).map((game) => {
								const liveEndTime = gameLiveEndTime(game);
								const isFinished = game.status === "Final" || liveEndTime !== null && Date.now() >= liveEndTime;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/game/$gameId",
									params: { gameId: game.id },
									search: { region },
									title: `${game.home} vs ${game.away}`,
									className: ["compact-calendar-game", isFinished ? "compact-calendar-game--past" : ""].filter(Boolean).join(" "),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "compact-calendar-game-title",
										children: [
											game.home,
											" ",
											"vs",
											" ",
											game.away
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "compact-calendar-game-time",
										children: formatRegionalTime(game.kickoff, region)
									})]
								}, game.id);
							}), dayGames.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "compact-calendar-more-count",
								title: `${dayGames.length - 1} more fixtures`,
								children: [
									"+",
									dayGames.length - 1,
									" ",
									"more fixtures"
								]
							})]
						})]
					}, calendarDay.dateKey);
				})
			}),
			games.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 py-8 text-center text-sm text-muted-foreground",
				children: "Save teams and their upcoming fixtures will appear here."
			})
		]
	});
}
function normalizeRegion$1(region) {
	if (region.startsWith("United States")) return "United States";
	if (region === "United Kingdom") return "United Kingdom";
	if (region === "Canada") return "Canada";
	return "United States";
}
function timeZoneForCalendarRegion(region) {
	const normalizedRegion = normalizeRegion$1(region);
	if (normalizedRegion === "United States" || normalizedRegion === "Canada") return "America/New_York";
	return timeZoneForRegion(normalizedRegion);
}
function todayForRegion(region) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: timeZoneForCalendarRegion(region),
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).formatToParts(/* @__PURE__ */ new Date());
	const year = Number(parts.find((part) => part.type === "year")?.value);
	const month = Number(parts.find((part) => part.type === "month")?.value);
	const day = Number(parts.find((part) => part.type === "day")?.value);
	return {
		year,
		month,
		day,
		dateKey: `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`
	};
}
function startOfWeek(date) {
	const start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	start.setDate(start.getDate() - start.getDay());
	return start;
}
function gameDateKeyForRegion(game, region) {
	if (game.kickoff) {
		const date = new Date(game.kickoff);
		if (Number.isNaN(date.getTime())) return null;
		const parts = new Intl.DateTimeFormat("en-US", {
			timeZone: timeZoneForCalendarRegion(region),
			year: "numeric",
			month: "2-digit",
			day: "2-digit"
		}).formatToParts(date);
		const year = parts.find((part) => part.type === "year")?.value;
		const month = parts.find((part) => part.type === "month")?.value;
		const day = parts.find((part) => part.type === "day")?.value;
		if (!year || !month || !day) return null;
		return `${year}-${month}-${day}`;
	}
	if (game.scheduledDate) return game.scheduledDate;
	return null;
}
function formatDateKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
var SESSION_REGION_KEY = "sportstream-region";
function MyCaddyOverview() {
	const { user } = useAuth();
	const [savedLeagues, setSavedLeagues] = (0, import_react.useState)({});
	const [preferencesLoaded, setPreferencesLoaded] = (0, import_react.useState)(false);
	const [savedServices, setSavedServices] = (0, import_react.useState)([]);
	const [region, setRegion] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return normalizeRegion(sessionStorage.getItem(SESSION_REGION_KEY) ?? "United States");
		return "United States";
	});
	const [fixtureNow, setFixtureNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			setFixtureNow(Date.now());
		}, 3e4);
		return () => {
			window.clearInterval(timer);
		};
	}, []);
	const { data: savedDataset } = useSavedTeamsDataset(savedLeagues);
	const liveCompetitionGames = savedDataset?.games ?? [];
	const liveBroadcasts = savedDataset?.broadcasts ?? [];
	(0, import_react.useEffect)(() => {
		function syncRegion() {
			const sessionRegion = sessionStorage.getItem(SESSION_REGION_KEY);
			if (!sessionRegion) return;
			const normalizedRegion = normalizeRegion(sessionRegion);
			setRegion(normalizedRegion);
			sessionStorage.setItem(SESSION_REGION_KEY, normalizedRegion);
		}
		syncRegion();
		window.addEventListener("focus", syncRegion);
		return () => {
			window.removeEventListener("focus", syncRegion);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function loadUserData() {
			if (!user) {
				if (!cancelled) {
					setSavedLeagues({});
					setSavedServices([]);
					setPreferencesLoaded(true);
				}
				return;
			}
			try {
				const [prefs, services] = await Promise.all([fetchPreferences(), fetchServices()]);
				if (cancelled) return;
				if (prefs) setSavedLeagues(prefs.saved_leagues ?? { [prefs.league_id]: prefs.teams });
				else setSavedLeagues({});
				setSavedServices(services.map((service) => service.provider_id));
				setPreferencesLoaded(true);
			} catch (error) {
				console.error("Could not load My Caddy preferences", error);
				if (!cancelled) {
					setSavedLeagues({});
					setSavedServices([]);
					setPreferencesLoaded(true);
				}
			}
		}
		loadUserData();
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	const appGames = (0, import_react.useMemo)(() => liveCompetitionGames, [liveCompetitionGames]);
	const savedGames = (0, import_react.useMemo)(() => {
		return appGames.filter((game) => isUpcomingOrLiveGame(game, fixtureNow)).sort(sortGamesByDate);
	}, [appGames, fixtureNow]);
	const nextSavedGame = savedGames[0] ?? null;
	function regionalProviderIds(game) {
		const broadcastRegion = normalizeRegion(region);
		const competitionId = game.competitionId;
		const liveBroadcast = liveBroadcasts.find((broadcast) => {
			const sameCompetition = competitionId ? broadcast.competitionId === competitionId : broadcast.league === game.league;
			const sameFixture = broadcast.fixtureId ? broadcast.fixtureId === game.id : broadcast.home === game.home && broadcast.away === game.away;
			return sameCompetition && broadcast.region === broadcastRegion && sameFixture;
		});
		if (liveBroadcast && liveBroadcast.providerIds.length > 0) return Array.from(new Set(liveBroadcast.providerIds));
		return getProviderIdsForGame(game, broadcastRegion);
	}
	const savedTeamCount = Object.values(savedLeagues).reduce((total, leagueTeams) => total + leagueTeams.length, 0);
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
		} catch (error) {
			console.error("Could not save subscription", error);
			toast.error("Could not save subscription");
		}
	}
	async function markUnsubscribed(providerId) {
		try {
			await deleteService(providerId);
			setSavedServices((currentServices) => currentServices.filter((id) => id !== providerId));
			toast.success("Subscription removed");
		} catch (error) {
			console.error("Could not remove subscription", error);
			toast.error("Could not remove subscription");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { marginBottom: "26px" },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display font-extrabold tracking-tight",
				style: {
					fontSize: "32px",
					lineHeight: 1.1,
					margin: 0
				},
				children: "My Caddy"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				style: {
					marginTop: "7px",
					marginBottom: 0,
					fontSize: "14px"
				},
				children: "Your teams. Your calendar. Smarter streaming."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { marginBottom: "18px" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextFixtureHero, {
				game: nextSavedGame,
				region,
				getProviderIds: regionalProviderIds,
				emptyTitle: "No upcoming fixtures",
				emptyText: !user ? "Sign in and save your teams to see your next fixture here." : savedTeamCount === 0 ? "Save your teams to see your next fixture here." : "There are currently no upcoming fixtures for your saved teams."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "grid",
				gridTemplateColumns: "minmax(0, 1.7fr) minmax(300px, 0.9fr)",
				gap: "18px",
				alignItems: "start"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: "18px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextGamesPanel, {
					games: savedGames,
					region,
					getProviderIds: regionalProviderIds,
					preferencesLoaded,
					signedIn: Boolean(user),
					savedTeamCount
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompactCalendar, {
					games: savedGames,
					region
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexDirection: "column",
					gap: "18px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreamingCoveragePanel, {
					savedGames,
					regionalProviderIds,
					preferencesLoaded,
					signedIn: Boolean(user),
					savedTeamCount,
					savedServices,
					markSubscribed,
					markUnsubscribed
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyTeamsPanel, {
					savedLeagues,
					preferencesLoaded
				})]
			})]
		})
	] });
}
function StreamingCoveragePanel({ savedGames, regionalProviderIds, preferencesLoaded, signedIn, savedTeamCount, savedServices, markSubscribed, markUnsubscribed }) {
	const coverage = savedGames.reduce((result, game) => {
		const providerIds = regionalProviderIds(game).filter((providerId) => providerId !== "tbd" && providerId !== "not-live-uk");
		if (providerIds.length > 0) result.coveredGames += 1;
		for (const providerId of providerIds) result.providerCounts[providerId] = (result.providerCounts[providerId] ?? 0) + 1;
		return result;
	}, {
		coveredGames: 0,
		providerCounts: {}
	});
	const providerRows = Object.entries(coverage.providerCounts).map(([providerId, gameCount]) => ({
		provider: providerById(providerId),
		gameCount
	})).sort((a, b) => b.gameCount - a.gameCount);
	const coveragePercent = savedGames.length > 0 ? Math.round(coverage.coveredGames / savedGames.length * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			minHeight: "300px",
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)",
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "14px",
				padding: "18px",
				borderBottom: "1px solid var(--border)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					margin: 0,
					fontSize: "18px",
					fontWeight: 750
				},
				children: "Streaming Coverage"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				style: {
					marginTop: "4px",
					marginBottom: 0,
					fontSize: "13px"
				},
				children: "Where your upcoming games are available"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/my-caddy/streaming",
				style: {
					flexShrink: 0,
					fontSize: "12px",
					fontWeight: 700,
					color: "var(--brand)",
					textDecoration: "none"
				},
				children: "View details"
			})]
		}), !preferencesLoaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageMessage, { children: "Loading your coverage…" }) : !signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageMessage, { children: "Sign in to see streaming coverage for your teams." }) : savedTeamCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageMessage, { children: "Save teams to see which services carry your upcoming games." }) : savedGames.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoverageMessage, { children: "No upcoming fixtures are currently available for your saved teams." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { padding: "16px 18px 18px" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "18px",
						paddingBottom: "16px",
						marginBottom: "14px",
						borderBottom: "1px solid var(--border)"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							fontSize: "28px",
							lineHeight: 1,
							fontWeight: 850,
							color: "var(--brand)"
						},
						children: [coveragePercent, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted-foreground",
						style: {
							marginTop: "5px",
							fontSize: "11px",
							fontWeight: 650
						},
						children: "Coverage known"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-muted-foreground",
						style: {
							fontSize: "12px",
							lineHeight: 1.5,
							textAlign: "right"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: "var(--foreground)" },
								children: coverage.coveredGames
							}),
							" ",
							"of",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: "var(--foreground)" },
								children: savedGames.length
							}),
							" ",
							"upcoming games"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "have confirmed coverage" })]
					})]
				}),
				providerRows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "8px"
					},
					children: providerRows.slice(0, 5).map(({ provider, gameCount }) => {
						const providerPercent = savedGames.length > 0 ? Math.round(gameCount / savedGames.length * 100) : 0;
						const subscribed = savedServices.includes(provider.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: "11px",
								padding: "10px 11px",
								borderRadius: "9px",
								border: subscribed ? "1px solid #10b981" : "1px solid var(--border)",
								background: subscribed ? "#10b981" : "color-mix(in oklch, var(--background) 28%, transparent)",
								color: subscribed ? "white" : "var(--foreground)",
								transition: "background 160ms ease, border-color 160ms ease, color 160ms ease"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									width: "32px",
									height: "32px",
									flexShrink: 0,
									display: "grid",
									placeItems: "center",
									borderRadius: "8px",
									background: subscribed ? "rgba(255, 255, 255, 0.16)" : "color-mix(in oklch, var(--brand) 12%, transparent)",
									color: subscribed ? "white" : "var(--brand)",
									fontSize: "12px",
									fontWeight: 850
								},
								children: provider.name.charAt(0).toUpperCase()
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									minWidth: 0,
									flex: 1
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											gap: "10px"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												minWidth: 0,
												overflow: "hidden",
												whiteSpace: "nowrap",
												textOverflow: "ellipsis",
												fontSize: "12px",
												fontWeight: 750
											},
											children: provider.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												flexShrink: 0,
												color: subscribed ? "rgba(255, 255, 255, 0.9)" : "var(--muted-foreground)",
												fontSize: "10px",
												fontWeight: 650
											},
											children: gameCount === 1 ? "1 game" : `${gameCount} games`
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											height: "4px",
											marginTop: "7px",
											overflow: "hidden",
											borderRadius: "999px",
											background: subscribed ? "rgba(255, 255, 255, 0.22)" : "color-mix(in oklch, var(--foreground) 8%, transparent)"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
											width: `${Math.max(providerPercent, 4)}%`,
											maxWidth: "100%",
											height: "100%",
											borderRadius: "999px",
											background: subscribed ? "white" : "var(--brand)"
										} })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											justifyContent: "space-between",
											gap: "12px",
											marginTop: "9px"
										},
										children: subscribed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "11px",
												fontWeight: 750,
												color: "white"
											},
											children: "Subscribed"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Remove ${provider.name} subscription`,
											title: "Remove subscription",
											onClick: () => markUnsubscribed(provider.id),
											style: {
												padding: 0,
												border: "none",
												background: "transparent",
												color: "rgba(255, 255, 255, 0.82)",
												fontSize: "19px",
												fontWeight: 800,
												lineHeight: 1,
												cursor: "pointer"
											},
											children: "×"
										})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [provider.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: provider.url,
											target: "_blank",
											rel: "noreferrer",
											style: {
												color: "var(--brand)",
												fontSize: "11px",
												fontWeight: 750,
												textDecoration: "none"
											},
											children: "Subscribe"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											style: { fontSize: "11px" },
											children: "Subscription link unavailable"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => markSubscribed(provider.id),
											className: "text-muted-foreground",
											style: {
												padding: 0,
												border: "none",
												background: "transparent",
												fontSize: "11px",
												fontWeight: 750,
												cursor: "pointer"
											},
											children: "Already subscribed?"
										})] })
									})
								]
							})]
						}, provider.id);
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					style: {
						padding: "22px 8px",
						textAlign: "center",
						fontSize: "12px",
						lineHeight: 1.5
					},
					children: "Broadcast information is pending for these games."
				}),
				providerRows.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-muted-foreground",
					style: {
						marginTop: "10px",
						textAlign: "center",
						fontSize: "10px"
					},
					children: [
						"+",
						providerRows.length - 5,
						" ",
						"more services"
					]
				})
			]
		})]
	});
}
function CoverageMessage({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-muted-foreground",
		style: {
			minHeight: "220px",
			display: "grid",
			placeItems: "center",
			padding: "24px",
			textAlign: "center",
			fontSize: "13px",
			lineHeight: 1.5
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { maxWidth: "270px" },
			children
		})
	});
}
function NextGamesPanel({ games, region, getProviderIds, preferencesLoaded, signedIn, savedTeamCount }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)",
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "14px",
				padding: "18px",
				borderBottom: "1px solid var(--border)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					margin: 0,
					fontSize: "18px",
					fontWeight: 750
				},
				children: "Next Games"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				style: {
					marginTop: "4px",
					marginBottom: 0,
					fontSize: "13px"
				},
				children: "Your live and upcoming fixtures"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/my-caddy/calendar",
				style: {
					fontSize: "12px",
					fontWeight: 700,
					color: "var(--brand)",
					textDecoration: "none"
				},
				children: "View calendar"
			})]
		}), !preferencesLoaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextGamesMessage, { children: "Loading your fixtures…" }) : !signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextGamesMessage, { children: "Sign in to build your personal SeasonCaddy schedule." }) : savedTeamCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextGamesMessage, { children: "Save a team from the Home page and its upcoming games will appear here." }) : games.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextGamesMessage, { children: "No upcoming fixtures are currently available for your saved teams." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: games.slice(0, 5).map((game, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextGameRow, {
			game,
			region,
			getProviderIds,
			last: index === Math.min(games.length, 5) - 1
		}, game.id)) })]
	});
}
function NextGameRow({ game, region, getProviderIds, last }) {
	const providerIds = getProviderIds(game);
	const providers = providerIds.filter((providerId) => providerId !== "tbd" && providerId !== "not-live-uk").map((providerId) => providerById(providerId)).filter(Boolean);
	const broadcastPending = providerIds.includes("tbd");
	const dateText = formatGameDateForRegion(game, region);
	const liveNow = isGameLive(game);
	const timeText = liveNow ? "LIVE NOW" : formatRegionalTime(game.kickoff, region);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "grid",
			gridTemplateColumns: "130px minmax(0, 1fr) minmax(115px, auto) auto",
			gap: "14px",
			alignItems: "center",
			padding: "15px 18px",
			borderBottom: last ? "none" : "1px solid var(--border)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: "12px",
					fontWeight: 750
				},
				children: dateText
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-muted-foreground",
				style: {
					display: "flex",
					alignItems: "center",
					gap: "4px",
					marginTop: "4px",
					fontSize: "11px",
					whiteSpace: "nowrap"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
					size: 11,
					style: {
						flexShrink: 0,
						color: liveNow ? "var(--brand)" : void 0
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						color: liveNow ? "var(--brand)" : void 0,
						fontWeight: liveNow ? 800 : void 0
					},
					children: timeText
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { minWidth: 0 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						fontSize: "14px",
						fontWeight: 750,
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: [
						game.home,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							style: {
								margin: "0 6px",
								fontWeight: 500
							},
							children: "vs"
						}),
						game.away
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					style: {
						marginTop: "4px",
						fontSize: "11px"
					},
					children: game.league
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					minWidth: 0,
					display: "flex",
					alignItems: "center",
					gap: "6px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, {
					size: 13,
					style: {
						color: "var(--brand)",
						flexShrink: 0
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						color: providers.length > 0 ? "var(--foreground)" : "var(--muted-foreground)",
						fontSize: "11px",
						fontWeight: 650,
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis"
					},
					children: providers.length > 0 ? providers.map((provider) => provider?.name).filter(Boolean).join(", ") : broadcastPending ? "Provider pending" : "TBD"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/game/$gameId",
				params: { gameId: game.id },
				search: { region },
				style: {
					minHeight: "31px",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					padding: "0 12px",
					borderRadius: "8px",
					border: "1px solid var(--border)",
					background: "color-mix(in oklch, var(--surface-2) 75%, transparent)",
					color: "var(--foreground)",
					fontSize: "11px",
					fontWeight: 750,
					textDecoration: "none",
					whiteSpace: "nowrap",
					transition: "border-color 160ms ease, background 160ms ease, color 160ms ease"
				},
				children: "View watch options"
			})
		]
	});
}
function NextGamesMessage({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-muted-foreground",
		style: {
			minHeight: "160px",
			display: "grid",
			placeItems: "center",
			padding: "28px",
			textAlign: "center",
			fontSize: "13px",
			lineHeight: 1.55
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { maxWidth: "360px" },
			children
		})
	});
}
function MyTeamsPanel({ savedLeagues, preferencesLoaded }) {
	const { data: frontendCatalog = [] } = useFrontendCatalog();
	const followedCompetitionIds = (0, import_react.useMemo)(() => Object.entries(savedLeagues).filter(([, teams]) => teams.length > 0).map(([competitionId]) => competitionId).sort(), [savedLeagues]);
	const { data: competitionIdentityCatalog = [] } = useCompetitionIdentityCatalog(followedCompetitionIds);
	const competitionIdentityById = (0, import_react.useMemo)(() => new Map(competitionIdentityCatalog.map((competition) => [competition.competitionId, competition])), [competitionIdentityCatalog]);
	const followedLeagues = (0, import_react.useMemo)(() => {
		const competitionById = new Map(frontendCatalog.map((competition) => [competition.competitionId, competition]));
		return Object.entries(savedLeagues).filter(([, teams]) => teams.length > 0).map(([competitionId, teams]) => {
			const competition = competitionById.get(competitionId);
			const identityCompetition = competitionIdentityById.get(competitionId);
			const availableTeams = identityCompetition ? catalogDisplayTeamNames(identityCompetition) : [];
			const competitionSaved = availableTeams.length > 0 && availableTeams.every((team) => teams.includes(team));
			return {
				league: {
					id: competitionId,
					name: competition?.competitionName ?? competitionId.split("-").map((part) => part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part).join(" ")
				},
				teams,
				competitionSaved
			};
		}).sort((a, b) => a.league.name.localeCompare(b.league.name));
	}, [
		frontendCatalog,
		competitionIdentityById,
		savedLeagues
	]);
	const totalTeams = followedLeagues.reduce((total, item) => total + item.teams.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			minHeight: "300px",
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)",
			overflow: "hidden"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				gap: "14px",
				padding: "18px",
				borderBottom: "1px solid var(--border)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				style: {
					margin: 0,
					fontSize: "18px",
					fontWeight: 750
				},
				children: "My Teams & Leagues"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				style: {
					marginTop: "4px",
					marginBottom: 0,
					fontSize: "13px"
				},
				children: "Your followed teams and competitions"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/my-caddy/teams",
				style: {
					fontSize: "12px",
					fontWeight: 700,
					color: "var(--brand)",
					textDecoration: "none"
				},
				children: "Manage"
			})]
		}), !preferencesLoaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			style: {
				minHeight: "220px",
				display: "grid",
				placeItems: "center",
				padding: "24px",
				fontSize: "13px"
			},
			children: "Loading your teams…"
		}) : totalTeams === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			style: {
				minHeight: "220px",
				display: "grid",
				placeItems: "center",
				padding: "24px",
				textAlign: "center",
				fontSize: "13px",
				lineHeight: 1.5
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { maxWidth: "260px" },
				children: "You haven't saved any teams yet. Add teams from the Home page and they'll appear here."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: { padding: "14px 18px 18px" },
			children: followedLeagues.map(({ league, teams, competitionSaved }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginBottom: "16px" },
				children: competitionSaved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexWrap: "wrap",
						gap: "7px"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							padding: "7px 10px",
							borderRadius: "8px",
							border: "1px solid color-mix(in oklch, var(--brand) 22%, var(--border))",
							background: "color-mix(in oklch, var(--brand) 10%, transparent)",
							color: "var(--foreground)",
							fontSize: "12px",
							fontWeight: 700
						},
						children: league.name
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					style: {
						marginBottom: "8px",
						fontSize: "11px",
						fontWeight: 750,
						textTransform: "uppercase",
						letterSpacing: "0.05em"
					},
					children: league.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						flexWrap: "wrap",
						gap: "7px"
					},
					children: teams.map((team) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							padding: "7px 10px",
							borderRadius: "8px",
							border: "1px solid color-mix(in oklch, var(--brand) 22%, var(--border))",
							background: "color-mix(in oklch, var(--brand) 10%, transparent)",
							color: "var(--foreground)",
							fontSize: "12px",
							fontWeight: 700
						},
						children: team
					}, team))
				})] })
			}, league.id))
		})]
	});
}
function normalizeRegion(region) {
	if (region.startsWith("United States")) return "United States";
	if (region === "United Kingdom") return "United Kingdom";
	if (region === "Canada") return "Canada";
	return "United States";
}
function timeZoneForOverviewRegion(region) {
	const normalizedRegion = normalizeRegion(region);
	if (normalizedRegion === "United States" || normalizedRegion === "Canada") return "America/New_York";
	return timeZoneForRegion(normalizedRegion);
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
function formatGameDateForRegion(game, region) {
	if (!game.kickoff && game.scheduledDate) {
		const [year, month, day] = game.scheduledDate.split("-").map(Number);
		if (year && month && day) return new Date(year, month - 1, day).toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric"
		});
	}
	if (game.kickoff) {
		const date = new Date(game.kickoff);
		if (!Number.isNaN(date.getTime())) return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
			timeZone: timeZoneForOverviewRegion(region)
		});
	}
	return game.scheduleLabel ?? "Date TBD";
}
function sortGamesByDate(a, b) {
	const aDate = gameDate(a);
	const bDate = gameDate(b);
	if (!aDate && !bDate) return 0;
	if (!aDate) return 1;
	if (!bDate) return -1;
	return aDate.getTime() - bDate.getTime();
}
//#endregion
export { MyCaddyOverview as component };
