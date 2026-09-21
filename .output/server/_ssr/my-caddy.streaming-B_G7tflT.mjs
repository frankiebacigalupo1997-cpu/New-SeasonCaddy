import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as useAuth } from "./useAuth-CNmA0ie9.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as CircleCheck, E as ChevronLeft, _ as Layers, g as LoaderCircle, s as Sparkles } from "../_libs/lucide-react.mjs";
import { S as providerById } from "./frontend-data-BOEejV6T.mjs";
import { a as upsertService, n as fetchPreferences, r as fetchServices, t as deleteService } from "./gamehub-cloud-DHEwKg8Z.mjs";
import { c as useSavedTeamsDataset } from "./useSeasonCaddyData-Dg0b4Q_0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-caddy.streaming-B_G7tflT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SESSION_REGION_KEY = "sportstream-region";
function StreamingPage() {
	const { user } = useAuth();
	const [savedLeagues, setSavedLeagues] = (0, import_react.useState)({});
	const [preferencesLoaded, setPreferencesLoaded] = (0, import_react.useState)(false);
	const [savedServices, setSavedServices] = (0, import_react.useState)([]);
	const [region, setRegion] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return normalizeRegion(sessionStorage.getItem(SESSION_REGION_KEY) ?? "United States");
		return "United States";
	});
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
				console.error("Could not load streaming preferences", error);
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
		return appGames.filter(isUpcomingGame).sort(sortGamesByDate);
	}, [appGames]);
	function regionalProviderIds(game) {
		const broadcastRegion = normalizeRegion(region);
		const liveBroadcast = liveBroadcasts.find((broadcast) => {
			const sameCompetition = game.competitionId ? broadcast.competitionId === game.competitionId : broadcast.league === game.league;
			const sameFixture = broadcast.fixtureId ? broadcast.fixtureId === game.id : broadcast.home === game.home && broadcast.away === game.away;
			return sameCompetition && sameFixture && broadcast.region === broadcastRegion;
		});
		return liveBroadcast?.providerIds?.length ? Array.from(new Set(liveBroadcast.providerIds)) : ["tbd"];
	}
	const savedTeamCount = Object.values(savedLeagues).reduce((total, teams) => total + teams.length, 0);
	const fixtureCoverage = (0, import_react.useMemo)(() => {
		return savedGames.map((game) => {
			const allProviderIds = regionalProviderIds(game);
			return {
				game,
				confirmedProviderIds: Array.from(new Set(allProviderIds.filter((providerId) => providerId !== "tbd" && providerId !== "not-live-uk"))),
				notLive: allProviderIds.includes("not-live-uk")
			};
		});
	}, [
		savedGames,
		region,
		liveBroadcasts
	]);
	const knownCoverageGames = fixtureCoverage.filter((item) => item.confirmedProviderIds.length > 0);
	const providerRows = (0, import_react.useMemo)(() => {
		const counts = {};
		for (const item of fixtureCoverage) for (const providerId of item.confirmedProviderIds) counts[providerId] = (counts[providerId] ?? 0) + 1;
		return Object.entries(counts).map(([providerId, gameCount]) => ({
			providerId,
			provider: providerById(providerId),
			gameCount
		})).sort((a, b) => b.gameCount - a.gameCount);
	}, [fixtureCoverage]);
	const bestCombination = (0, import_react.useMemo)(() => {
		const providerIds = providerRows.map((item) => item.providerId);
		if (providerIds.length === 0) return null;
		const maxCombinationSize = Math.min(4, providerIds.length);
		let best = null;
		for (let size = 1; size <= maxCombinationSize; size++) {
			const combinations = getCombinations(providerIds, size);
			for (const combination of combinations) {
				const selected = new Set(combination);
				const coveredGames = fixtureCoverage.filter((item) => item.confirmedProviderIds.some((providerId) => selected.has(providerId))).length;
				if (!best || coveredGames > best.coveredGames || coveredGames === best.coveredGames && combination.length < best.providerIds.length) best = {
					providerIds: combination,
					coveredGames
				};
			}
			if (best && best.coveredGames === knownCoverageGames.length) break;
		}
		return best;
	}, [
		providerRows,
		fixtureCoverage,
		knownCoverageGames.length
	]);
	const bestCombinationPercent = knownCoverageGames.length > 0 && bestCombination ? Math.round(bestCombination.coveredGames / knownCoverageGames.length * 100) : 0;
	const neededProviders = (0, import_react.useMemo)(() => {
		const providerIds = fixtureCoverage.flatMap((item) => item.confirmedProviderIds);
		return [...new Set(providerIds)].map((providerId) => providerById(providerId));
	}, [fixtureCoverage]);
	const subscribedProviders = neededProviders.filter((provider) => savedServices.includes(provider.id));
	const unsubscribedProviders = neededProviders.filter((provider) => !savedServices.includes(provider.id));
	const readyCount = subscribedProviders.length;
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
	if (!preferencesLoaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LargeMessage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
		size: 18,
		className: "animate-spin"
	}), "Loading your streaming coverage…"] })] });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LargeMessage, { children: "Sign in to analyze streaming coverage for your teams." })] });
	if (savedTeamCount === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LargeMessage, { children: "Save some teams first, then SeasonCaddy can analyze which services cover their games." })] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "streaming-page-content",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "streaming-page-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "streaming-page-services-column",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesYouNeedPanel, {
						neededProviders,
						subscribedProviders,
						unsubscribedProviders,
						readyCount,
						markSubscribed,
						markUnsubscribed
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "streaming-service-breakdown",
					style: panelStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { size: 18 }),
						title: "Service Breakdown",
						subtitle: "What percentage of your saved team's announced games each service can cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { padding: "8px 18px 18px" },
						children: providerRows.length > 0 ? providerRows.map((item, index) => {
							const percent = knownCoverageGames.length > 0 ? Math.round(item.gameCount / knownCoverageGames.length * 100) : 0;
							const subscribed = savedServices.includes(item.providerId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "grid",
									gridTemplateColumns: "42px minmax(0, 1fr) auto",
									gap: "12px",
									alignItems: "center",
									margin: "6px 0",
									padding: "12px 10px",
									borderRadius: "10px",
									border: subscribed ? "1px solid #10b981" : "1px solid transparent",
									background: subscribed ? "#10b981" : "transparent",
									color: subscribed ? "white" : "var(--foreground)",
									transition: "background 160ms ease, border-color 160ms ease, color 160ms ease"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											width: "38px",
											height: "38px",
											display: "grid",
											placeItems: "center",
											borderRadius: "9px",
											background: subscribed ? "rgba(255, 255, 255, 0.16)" : "color-mix(in oklch, var(--brand) 12%, transparent)",
											color: subscribed ? "white" : "var(--brand)",
											fontSize: "12px",
											fontWeight: 850
										},
										children: item.provider.name.charAt(0).toUpperCase()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												gap: "12px"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												style: {
													fontSize: "13px",
													fontWeight: 750
												},
												children: item.provider.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												style: {
													color: subscribed ? "rgba(255, 255, 255, 0.9)" : "var(--muted-foreground)",
													fontSize: "10px"
												},
												children: [percent, "%"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												height: "5px",
												marginTop: "7px",
												overflow: "hidden",
												borderRadius: "999px",
												background: subscribed ? "rgba(255, 255, 255, 0.22)" : "color-mix(in oklch, var(--foreground) 8%, transparent)"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
												width: `${Math.max(percent, 3)}%`,
												maxWidth: "100%",
												height: "100%",
												borderRadius: "999px",
												background: subscribed ? "white" : "var(--brand)"
											} })
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { textAlign: "right" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: "13px",
												fontWeight: 800
											},
											children: item.gameCount
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												marginTop: "2px",
												color: subscribed ? "rgba(255, 255, 255, 0.9)" : "var(--muted-foreground)",
												fontSize: "9px"
											},
											children: item.gameCount === 1 ? "game" : "games"
										})]
									})
								]
							}, item.providerId);
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineMessage, { children: "No confirmed service data is available yet." })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "streaming-best-coverage",
					style: panelStyle,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 }),
						title: "Best Coverage Combination",
						subtitle: "The smallest service combination that maximizes your confirmed coverage"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: { padding: "18px" },
						children: bestCombination ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "streaming-best-coverage-summary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "32px",
										lineHeight: 1,
										fontWeight: 850,
										color: "var(--brand)"
									},
									children: [bestCombinationPercent, "%"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-muted-foreground",
									style: {
										marginTop: "6px",
										fontSize: "12px"
									},
									children: "of games with announced coverage"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "streaming-best-coverage-meta",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											fontSize: "14px",
											fontWeight: 800
										},
										children: [
											bestCombination.coveredGames,
											" ",
											bestCombination.coveredGames === 1 ? "game" : "games"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-muted-foreground",
										style: {
											marginTop: "4px",
											fontSize: "11px"
										},
										children: [
											"using",
											" ",
											bestCombination.providerIds.length,
											" ",
											bestCombination.providerIds.length === 1 ? "provider" : "providers"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexWrap: "wrap",
									gap: "9px"
								},
								children: bestCombination.providerIds.map((providerId) => {
									const provider = providerById(providerId);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											alignItems: "center",
											gap: "8px",
											padding: "10px 12px",
											borderRadius: "9px",
											border: "1px solid color-mix(in oklch, var(--brand) 30%, var(--border))",
											background: "color-mix(in oklch, var(--brand) 10%, transparent)",
											fontSize: "12px",
											fontWeight: 750
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
											size: 15,
											style: { color: "var(--brand)" }
										}), provider.name]
									}, providerId);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-muted-foreground",
								style: {
									marginTop: "16px",
									fontSize: "11px",
									lineHeight: 1.55
								},
								children: "Each fixture is counted once even when multiple services carry the same game."
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineMessage, { children: "No confirmed providers are currently available for your upcoming games." })
					})]
				})
			]
		})]
	});
}
function ServicesYouNeedPanel({ neededProviders, subscribedProviders, unsubscribedProviders, readyCount, markSubscribed, markUnsubscribed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel h-fit space-y-4 p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Your streaming setup"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 text-xl font-extrabold",
				children: "Services for your teams"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					neededProviders.length,
					" ",
					"service",
					neededProviders.length === 1 ? "" : "s",
					" ",
					"cover your saved teams."
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
					children: "Services for your games"
				}), neededProviders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No confirmed services are currently required for your upcoming games."
				}) : unsubscribedProviders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "You're subscribed to all services needed for your saved teams."
				}) : unsubscribedProviders.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 border-b border-border/40 pb-3 last:border-b-0 last:pb-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: provider.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "streaming-subscription-actions",
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
	});
}
function PageHeading() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/my-caddy",
			style: {
				display: "inline-flex",
				alignItems: "center",
				gap: "5px",
				marginBottom: "14px",
				color: "var(--muted-foreground)",
				fontSize: "12px",
				fontWeight: 650,
				textDecoration: "none"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 14 }), "Overview"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display font-extrabold tracking-tight",
			style: {
				margin: 0,
				fontSize: "32px",
				lineHeight: 1.1
			},
			children: "Streaming & Coverage"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			style: {
				marginTop: "7px",
				marginBottom: 0,
				fontSize: "14px"
			},
			children: "See which services carry your games and what you need to watch them."
		})
	] });
}
function PanelHeader({ icon, title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "flex-start",
			gap: "10px",
			padding: "16px 18px",
			borderBottom: "1px solid var(--border)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: "34px",
				height: "34px",
				flexShrink: 0,
				display: "grid",
				placeItems: "center",
				borderRadius: "8px",
				background: "color-mix(in oklch, var(--brand) 12%, transparent)",
				color: "var(--brand)"
			},
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			style: {
				margin: 0,
				fontSize: "16px",
				fontWeight: 800
			},
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			style: {
				margin: "4px 0 0",
				fontSize: "11px",
				lineHeight: 1.4
			},
			children: subtitle
		})] })]
	});
}
function LargeMessage({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-muted-foreground",
		style: {
			minHeight: "320px",
			marginTop: "24px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "8px",
			padding: "30px",
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)",
			textAlign: "center",
			fontSize: "13px"
		},
		children
	});
}
function InlineMessage({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-muted-foreground",
		style: {
			padding: "18px 0",
			fontSize: "12px",
			lineHeight: 1.55
		},
		children
	});
}
var panelStyle = {
	borderRadius: "12px",
	border: "1px solid var(--border)",
	background: "color-mix(in oklch, var(--surface-2) 60%, transparent)",
	overflow: "hidden"
};
function normalizeRegion(region) {
	if (region.startsWith("United States")) return "United States";
	if (region === "United Kingdom") return "United Kingdom";
	if (region === "Canada") return "Canada";
	return "United States";
}
function getCombinations(items, size) {
	if (size === 0) return [[]];
	if (items.length < size) return [];
	if (size === 1) return items.map((item) => [item]);
	const results = [];
	for (let i = 0; i <= items.length - size; i++) {
		const first = items[i];
		const rest = getCombinations(items.slice(i + 1), size - 1);
		for (const combination of rest) results.push([first, ...combination]);
	}
	return results;
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
function isUpcomingGame(game) {
	if (game.kickoff) return new Date(game.kickoff).getTime() >= Date.now();
	if (game.scheduledDate) return (/* @__PURE__ */ new Date(`${game.scheduledDate}T23:59:59`)).getTime() >= Date.now();
	return false;
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
export { StreamingPage as component };
