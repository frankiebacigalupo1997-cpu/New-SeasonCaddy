import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./useAuth-CNmA0ie9.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as ChevronDown, E as ChevronLeft, S as Clock3, T as ChevronRight, i as Tv, k as CalendarDays, w as ChevronUp } from "../_libs/lucide-react.mjs";
import { C as timeZoneForRegion, S as providerById, f as formatRegionalTime, m as gameLiveEndTime } from "./frontend-data-BOEejV6T.mjs";
import { n as fetchPreferences } from "./gamehub-cloud-DHEwKg8Z.mjs";
import { c as useSavedTeamsDataset } from "./useSeasonCaddyData-Dg0b4Q_0.mjs";
import { n as startGoogleCalendarOAuth, t as googleCalendarApiFetch } from "./google-calendar-api-DD50STyh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-caddy.calendar-BvXXWR0R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SESSION_REGION_KEY = "sportstream-region";
function CalendarPage() {
	const { user } = useAuth();
	const [savedLeagues, setSavedLeagues] = (0, import_react.useState)({});
	const [preferencesLoaded, setPreferencesLoaded] = (0, import_react.useState)(false);
	const [googleCalendarSyncStatus, setGoogleCalendarSyncStatus] = (0, import_react.useState)("idle");
	const [region, setRegion] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return normalizeRegion(sessionStorage.getItem(SESSION_REGION_KEY) ?? "United States");
		return "United States";
	});
	const { data: savedDataset } = useSavedTeamsDataset(savedLeagues);
	const liveCompetitionGames = savedDataset?.games ?? [];
	const liveBroadcasts = savedDataset?.broadcasts ?? [];
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function loadGoogleCalendarStatus() {
			try {
				const response = await googleCalendarApiFetch("/google/status");
				const status = await response.json();
				if (cancelled || !response.ok || !status.success) return;
				if (status.connected && status.lastSyncedAt) setGoogleCalendarSyncStatus("synced");
				else setGoogleCalendarSyncStatus("idle");
			} catch (error) {
				console.error("Could not load Google Calendar status", error);
				if (!cancelled) setGoogleCalendarSyncStatus("idle");
			}
		}
		loadGoogleCalendarStatus();
		return () => {
			cancelled = true;
		};
	}, []);
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
		async function loadPreferences() {
			if (!user) {
				if (!cancelled) {
					setSavedLeagues({});
					setPreferencesLoaded(true);
				}
				return;
			}
			try {
				const prefs = await fetchPreferences();
				if (cancelled) return;
				if (!prefs) {
					setSavedLeagues({});
					setPreferencesLoaded(true);
					return;
				}
				setSavedLeagues(prefs.saved_leagues ?? { [prefs.league_id]: prefs.teams });
				setPreferencesLoaded(true);
			} catch (error) {
				console.error("Could not load My Caddy preferences", error);
				if (!cancelled) {
					setSavedLeagues({});
					setPreferencesLoaded(true);
				}
			}
		}
		loadPreferences();
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	const appGames = (0, import_react.useMemo)(() => liveCompetitionGames, [liveCompetitionGames]);
	const savedGames = (0, import_react.useMemo)(() => {
		return appGames.sort(sortGamesByDate);
	}, [appGames]);
	async function syncWithGoogleCalendar() {
		if (Object.values(savedLeagues).reduce((total, competitionTeams) => total + competitionTeams.length, 0) === 0) {
			toast.error("Save at least one team first");
			return;
		}
		if (googleCalendarSyncStatus === "syncing") return;
		setGoogleCalendarSyncStatus("syncing");
		try {
			const statusResponse = await googleCalendarApiFetch("/google/status");
			const status = await statusResponse.json();
			if (!statusResponse.ok || !status.success) throw new Error(status.error ?? "Could not check Google Calendar connection");
			if (!status.connected) {
				setGoogleCalendarSyncStatus("idle");
				await startGoogleCalendarOAuth(normalizeRegion(region), "/my-caddy/calendar");
				return;
			}
			const syncEvents = savedGames.filter((game) => {
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
			toast.success(`${result.total} fixtures synced to Google Calendar`, { duration: 6e3 });
		} catch (error) {
			console.error("Google Calendar sync failed", error);
			setGoogleCalendarSyncStatus("idle");
			toast.error(error instanceof Error ? error.message : "Could not sync Google Calendar");
		}
	}
	function regionalProviderIds(game) {
		const broadcastRegion = region === "United Kingdom" || region === "United States" || region === "Canada" ? region : null;
		if (!broadcastRegion) return ["tbd"];
		const liveBroadcast = liveBroadcasts.find((broadcast) => {
			const sameCompetition = game.competitionId ? broadcast.competitionId === game.competitionId : broadcast.league === game.league;
			const sameFixture = broadcast.fixtureId ? broadcast.fixtureId === game.id : broadcast.home === game.home && broadcast.away === game.away;
			return sameCompetition && sameFixture && broadcast.region === broadcastRegion;
		});
		return liveBroadcast?.providerIds?.length ? Array.from(new Set(liveBroadcast.providerIds)) : ["tbd"];
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-calendar-page-header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { minWidth: 0 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display font-extrabold tracking-tight",
				style: {
					margin: 0,
					fontSize: "32px",
					lineHeight: 1.1
				},
				children: "My Calendar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				style: {
					marginTop: "7px",
					marginBottom: 0,
					fontSize: "14px"
				},
				children: "All your saved teams and fixtures in one place."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "my-calendar-sync-card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "15px",
						fontWeight: 800
					},
					children: "Calendar Sync"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					style: {
						margin: "5px 0 11px",
						fontSize: "11px",
						lineHeight: 1.45
					},
					children: "Keep your saved teams synced with Google Calendar."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: syncWithGoogleCalendar,
					disabled: googleCalendarSyncStatus === "syncing",
					style: {
						width: "100%",
						minHeight: "38px",
						borderRadius: "8px",
						border: "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))",
						background: "color-mix(in oklch, var(--brand) 7%, transparent)",
						color: "var(--brand)",
						fontSize: "12px",
						fontWeight: 750,
						cursor: googleCalendarSyncStatus === "syncing" ? "wait" : "pointer",
						opacity: googleCalendarSyncStatus === "syncing" ? .72 : 1
					},
					children: googleCalendarSyncStatus === "syncing" ? "Syncing with your Google Calendar" : googleCalendarSyncStatus === "synced" ? "Synced with your Google Calendar" : "Sync with Google Calendar"
				})
			]
		})]
	}), !preferencesLoaded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarLoading, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPanel, {
		games: savedGames,
		region,
		getProviderIds: regionalProviderIds
	})] });
}
function CalendarPanel({ games, region, getProviderIds }) {
	const today = todayForRegion(region);
	const [currentDate, setCurrentDate] = (0, import_react.useState)(new Date(today.year, today.month - 1, 1));
	const [view, setView] = (0, import_react.useState)("month");
	const [expandedDays, setExpandedDays] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const monthLabel = currentDate.toLocaleDateString("en-US", {
		month: "long",
		year: "numeric"
	});
	const calendarDays = (0, import_react.useMemo)(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1).getDay();
		const daysInMonth = new Date(year, month + 1, 0).getDate();
		const daysInPreviousMonth = new Date(year, month, 0).getDate();
		const days = [];
		for (let i = firstDay - 1; i >= 0; i--) {
			const day = daysInPreviousMonth - i;
			const date = new Date(year, month - 1, day);
			days.push({
				day,
				currentMonth: false,
				dateKey: formatDateKey(date)
			});
		}
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month, day);
			days.push({
				day,
				currentMonth: true,
				dateKey: formatDateKey(date)
			});
		}
		let nextDay = 1;
		while (days.length < 42) {
			const date = new Date(year, month + 1, nextDay);
			days.push({
				day: nextDay,
				currentMonth: false,
				dateKey: formatDateKey(date)
			});
			nextDay++;
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
		Object.values(grouped).forEach((dayGames) => {
			dayGames.sort(sortGamesByDate);
		});
		return grouped;
	}, [games, region]);
	function toggleDayExpansion(dateKey) {
		setExpandedDays((current) => {
			const next = new Set(current);
			if (next.has(dateKey)) next.delete(dateKey);
			else next.add(dateKey);
			return next;
		});
	}
	function previousMonth() {
		setExpandedDays(/* @__PURE__ */ new Set());
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
	}
	function nextMonth() {
		setExpandedDays(/* @__PURE__ */ new Set());
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
	}
	function goToToday() {
		setExpandedDays(/* @__PURE__ */ new Set());
		const today = todayForRegion(region);
		setCurrentDate(new Date(today.year, today.month - 1, 1));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)",
			overflow: "hidden"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-calendar-panel-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: "8px"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Previous month",
								onClick: previousMonth,
								style: calendarControlStyle,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 17 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: goToToday,
								style: {
									...calendarControlStyle,
									width: "auto",
									padding: "0 12px",
									fontSize: "12px",
									fontWeight: 700
								},
								children: "Today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Next month",
								onClick: nextMonth,
								style: calendarControlStyle,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 17 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: "16px",
							fontWeight: 750
						},
						children: monthLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							padding: "3px",
							borderRadius: "9px",
							border: "1px solid var(--border)",
							background: "color-mix(in oklch, var(--surface-2) 75%, transparent)"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarViewButton, {
							label: "Month",
							active: view === "month",
							onClick: () => setView("month")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarViewButton, {
							label: "List",
							active: view === "list",
							onClick: () => setView("list")
						})]
					})
				]
			}),
			view === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-calendar-month-view",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "my-calendar-weekdays",
						children: [
							"Sun",
							"Mon",
							"Tue",
							"Wed",
							"Thu",
							"Fri",
							"Sat"
						].map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "my-calendar-weekday text-muted-foreground",
							children: day
						}, day))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "my-calendar-grid",
						children: calendarDays.map((calendarDay, index) => {
							const dayGames = gamesByDate[calendarDay.dateKey] ?? [];
							const isExpanded = expandedDays.has(calendarDay.dateKey);
							const hiddenCount = Math.max(0, dayGames.length - 2);
							const visibleGames = isExpanded ? dayGames : dayGames.slice(0, 2);
							const isToday = calendarDay.dateKey === today.dateKey;
							const weekStart = Math.floor(index / 7) * 7;
							const isWeekExpanded = calendarDays.slice(weekStart, weekStart + 7).some((day) => expandedDays.has(day.dateKey));
							const dayClassName = [
								"my-calendar-day",
								!calendarDay.currentMonth ? "my-calendar-day--outside" : "",
								isToday ? "my-calendar-day--today" : "",
								isWeekExpanded ? "my-calendar-day--week-expanded" : ""
							].filter(Boolean).join(" ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: dayClassName,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "my-calendar-day-header",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: [
											"my-calendar-day-number",
											!calendarDay.currentMonth ? "text-muted-foreground" : "",
											isToday ? "my-calendar-day-number--today" : ""
										].filter(Boolean).join(" "),
										children: calendarDay.day
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-calendar-fixtures",
									children: [visibleGames.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarGameChip, {
										game,
										region,
										getProviderIds
									}, game.id)), hiddenCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-expanded": isExpanded,
										onClick: () => toggleDayExpansion(calendarDay.dateKey),
										className: ["my-calendar-more-button", isExpanded ? "my-calendar-more-button--expanded" : ""].filter(Boolean).join(" "),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isExpanded ? "Show less" : `+${hiddenCount} more ${hiddenCount === 1 ? "fixture" : "fixtures"}` }), isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 12 })]
									})]
								})]
							}, `${calendarDay.dateKey}-${index}`);
						})
					}),
					games.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarEmptyView, {
						title: "No saved-team fixtures",
						text: "Save teams in My Teams & Leagues and their stored fixtures will appear here."
					})
				]
			}),
			view === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarListView, {
				games,
				region,
				getProviderIds
			})
		]
	});
}
function CalendarGameChip({ game, region, getProviderIds }) {
	const providers = getProviderIds(game).map((providerId) => providerById(providerId)).filter(Boolean);
	const kickoffTime = formatRegionalTime(game.kickoff, region);
	const liveEndTime = gameLiveEndTime(game);
	const isFinished = game.status === "Final" || liveEndTime !== null && Date.now() >= liveEndTime;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/game/$gameId",
		params: { gameId: game.id },
		search: { region },
		title: `${game.home} vs ${game.away}`,
		className: ["my-calendar-game-chip", isFinished ? "my-calendar-game-chip--past" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-calendar-game-title",
				children: [
					game.home,
					" vs",
					" ",
					game.away
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-calendar-game-time",
				children: kickoffTime
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-calendar-game-provider",
				children: providers.length > 0 ? providers.map((provider) => provider?.name).filter(Boolean).join(" · ") : "Broadcast TBD"
			})
		]
	});
}
function CalendarListView({ games, region, getProviderIds }) {
	if (games.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarEmptyView, {
		title: "No saved-team fixtures",
		text: "Save teams in My Teams & Leagues and their stored fixtures will appear here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { padding: "0 18px 18px" },
		children: games.map((game, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarListRow, {
			game,
			region,
			getProviderIds,
			last: index === games.length - 1
		}, game.id))
	});
}
function CalendarListRow({ game, region, getProviderIds, last }) {
	const providers = getProviderIds(game).map((providerId) => providerById(providerId)).filter(Boolean);
	const dateText = formatGameDateForRegion(game, region);
	const timeText = formatRegionalTime(game.kickoff, region);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/game/$gameId",
		params: { gameId: game.id },
		search: { region },
		className: "my-calendar-list-row",
		style: {
			borderBottom: last ? "none" : "1px solid var(--border)",
			color: "inherit",
			textDecoration: "none"
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
					style: { flexShrink: 0 }
				}), timeText]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { minWidth: 0 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						fontSize: "14px",
						fontWeight: 750,
						whiteSpace: "nowrap",
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
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					gap: "6px",
					minWidth: 0
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
					children: providers.length > 0 ? providers.map((provider) => provider?.name).filter(Boolean).join(", ") : "TBD"
				})]
			})
		]
	});
}
function CalendarViewButton({ label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		style: {
			border: 0,
			padding: "6px 10px",
			borderRadius: "6px",
			background: active ? "var(--brand)" : "transparent",
			color: active ? "var(--brand-foreground)" : "var(--muted-foreground)",
			fontSize: "11px",
			fontWeight: 700,
			cursor: "pointer"
		},
		children: label
	});
}
function CalendarEmptyView({ title, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			minHeight: "360px",
			display: "grid",
			placeItems: "center",
			padding: "30px"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				maxWidth: "340px",
				textAlign: "center"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
					size: 30,
					style: {
						margin: "0 auto 12px",
						color: "var(--brand)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "15px",
						fontWeight: 750
					},
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					style: {
						margin: "6px 0 0",
						fontSize: "12px",
						lineHeight: 1.5
					},
					children: text
				})
			]
		})
	});
}
function CalendarLoading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			minHeight: "460px",
			display: "grid",
			placeItems: "center",
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-muted-foreground",
			style: {
				display: "flex",
				alignItems: "center",
				gap: "9px",
				fontSize: "13px",
				fontWeight: 650
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 18 }), "Loading your calendar…"]
		})
	});
}
function normalizeRegion(region) {
	if (region.startsWith("United States")) return "United States";
	if (region === "United Kingdom") return "United Kingdom";
	if (region === "Canada") return "Canada";
	return "United States";
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
function todayForRegion(region) {
	const normalizedRegion = normalizeRegion(region);
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: timeZoneForCalendarRegion(normalizedRegion),
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
			timeZone: timeZoneForCalendarRegion(region)
		});
	}
	return game.scheduleLabel ?? "Date TBD";
}
function timeZoneForCalendarRegion(region) {
	const normalizedRegion = normalizeRegion(region);
	if (normalizedRegion === "United States" || normalizedRegion === "Canada") return "America/New_York";
	return timeZoneForRegion(normalizedRegion);
}
function formatDateKey(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
var calendarControlStyle = {
	width: "34px",
	height: "34px",
	display: "grid",
	placeItems: "center",
	borderRadius: "8px",
	border: "1px solid var(--border)",
	background: "color-mix(in oklch, var(--surface-2) 75%, transparent)",
	color: "var(--foreground)",
	cursor: "pointer"
};
//#endregion
export { CalendarPage as component };
