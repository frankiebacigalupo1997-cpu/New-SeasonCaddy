import { n as __toESM } from "../_runtime.mjs";
import { i as require_react, r as usePostHog } from "../_libs/@posthog/react+[...].mjs";
import { r as useAuth } from "./useAuth-DlnhgW14.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { F as ChevronDown, I as Check, N as ChevronRight, P as ChevronLeft, b as LoaderCircle, d as Save, n as Users } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as catalogDisplayTeamNames } from "./frontend-data-DJPCkXA4.mjs";
import { i as savePreferences, n as fetchPreferences } from "./gamehub-cloud-BrDIH9pz.mjs";
import { a as useFrontendCatalog, o as useFrontendIdentityCatalog } from "./useSeasonCaddyData-eoAkFgOh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/my-caddy.teams-BAdr75Sc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function competitionSortRank(competition) {
	if (competition.id === "NFL" || competition.id === "MLB" || competition.id === "NBA" || competition.id === "NHL" || competition.id === "UFC" || competition.id === "Formula 1" || competition.id === "UEFA Champions League" || competition.id === "UEFA Europa League" || competition.id === "Athletics" || competition.id === "Boxing") return 0;
	if (competition.id === "College Football" || competition.id === "WNBA" || competition.id === "Premier League" || competition.id === "Serie A" || competition.id === "MMA") return 1;
	if (competition.id === "La Liga" || competition.id === "College Basketball") return 2;
	if (competition.id === "Bundesliga" || competition.id === "French Ligue 1" || competition.id === "MLS") return 3;
	return 4;
}
function sortCompetitions(competitions) {
	return [...competitions].sort((a, b) => {
		const rankDifference = competitionSortRank(a) - competitionSortRank(b);
		if (rankDifference !== 0) return rankDifference;
		return a.name.localeCompare(b.name);
	});
}
var SESSION_REGION_KEY = "sportstream-region";
function TeamsPage() {
	const { user } = useAuth();
	const posthog = usePostHog();
	const { data: frontendCatalog = [] } = useFrontendCatalog();
	const leagues = (0, import_react.useMemo)(() => frontendCatalog.map((competition) => ({
		id: competition.competitionId,
		name: competition.competitionName,
		sport: competition.sport,
		teams: catalogDisplayTeamNames(competition)
	})), [frontendCatalog]);
	const sports = (0, import_react.useMemo)(() => {
		return Array.from(new Set(frontendCatalog.map((competition) => competition.sport).filter((value) => value && value !== "other"))).map((id) => ({
			id,
			name: formatCatalogLabel(id)
		})).sort((a, b) => a.name.localeCompare(b.name));
	}, [frontendCatalog]);
	const [savedLeagues, setSavedLeagues] = (0, import_react.useState)({});
	const [originalSavedLeagues, setOriginalSavedLeagues] = (0, import_react.useState)({});
	const [savedSports, setSavedSports] = (0, import_react.useState)([]);
	const [originalSavedSports, setOriginalSavedSports] = (0, import_react.useState)([]);
	const [openSports, setOpenSports] = (0, import_react.useState)({});
	const [openLeagues, setOpenLeagues] = (0, import_react.useState)({});
	const { data: focusedIdentityCatalog = [] } = useFrontendIdentityCatalog();
	const focusedIdentityById = (0, import_react.useMemo)(() => new Map(focusedIdentityCatalog.map((competition) => [competition.competitionId, competition])), [focusedIdentityCatalog]);
	const liveTeamsByLeague = (0, import_react.useMemo)(() => {
		const teamsByLeague = {};
		for (const competition of frontendCatalog) {
			const identityCompetition = focusedIdentityById.get(competition.competitionId);
			teamsByLeague[competition.competitionId] = catalogDisplayTeamNames(identityCompetition ?? competition);
		}
		return teamsByLeague;
	}, [frontendCatalog, focusedIdentityById]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [legacySport, setLegacySport] = (0, import_react.useState)("soccer");
	const [legacyLeagueId, setLegacyLeagueId] = (0, import_react.useState)("premier-league");
	const [legacyRegion, setLegacyRegion] = (0, import_react.useState)("United States · Eastern");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function loadTeams() {
			if (!user) {
				if (!cancelled) setLoading(false);
				return;
			}
			try {
				const prefs = await fetchPreferences();
				if (cancelled) return;
				if (!prefs) {
					setSavedLeagues({});
					setOriginalSavedLeagues({});
					setLoading(false);
					return;
				}
				const loaded = prefs.saved_leagues ?? { [prefs.league_id]: prefs.teams };
				const loadedSports = normalizeSports(prefs.saved_sports ?? []);
				setSavedSports(loadedSports);
				setOriginalSavedSports(loadedSports);
				const cloned = cloneSavedLeagues(loaded);
				setSavedLeagues(cloned);
				setOriginalSavedLeagues(cloneSavedLeagues(loaded));
				setLegacySport(prefs.sport ?? "soccer");
				setLegacyLeagueId(prefs.league_id ?? "premier-league");
				setLegacyRegion(prefs.region ?? "United States · Eastern");
				setLoading(false);
			} catch (error) {
				console.error("Could not load saved teams", error);
				toast.error("Could not load your saved teams");
				if (!cancelled) setLoading(false);
			}
		}
		loadTeams();
		return () => {
			cancelled = true;
		};
	}, [user?.id]);
	const totalSavedTeams = (0, import_react.useMemo)(() => Object.entries(savedLeagues).reduce((total, [competitionId, teams]) => total + teams.filter((team) => team !== competitionId).length, 0), [savedLeagues]);
	const followedLeagueCount = (0, import_react.useMemo)(() => Object.values(savedLeagues).filter((teams) => teams.length > 0).length, [savedLeagues]);
	const hasChanges = (0, import_react.useMemo)(() => {
		return normaliseSavedLeagues(savedLeagues) !== normaliseSavedLeagues(originalSavedLeagues) || JSON.stringify(normalizeSports(savedSports)) !== JSON.stringify(normalizeSports(originalSavedSports));
	}, [
		savedLeagues,
		originalSavedLeagues,
		savedSports,
		originalSavedSports
	]);
	function toggleSport(sportId) {
		setOpenSports((current) => ({
			...current,
			[sportId]: !current[sportId]
		}));
	}
	function toggleLeague(leagueId) {
		setOpenLeagues((current) => ({
			...current,
			[leagueId]: !current[leagueId]
		}));
	}
	function toggleTeam(leagueId, team) {
		setSavedLeagues((current) => {
			const currentTeams = current[leagueId] ?? [];
			const alreadySaved = currentTeams.includes(team);
			const hasWholeCompetitionMarker = currentTeams.includes(leagueId);
			const existingTeams = currentTeams.filter((currentTeam) => currentTeam !== leagueId);
			const updatedTeams = [...hasWholeCompetitionMarker ? [leagueId] : [], ...alreadySaved ? existingTeams.filter((currentTeam) => currentTeam !== team) : [...existingTeams, team]];
			return {
				...current,
				[leagueId]: updatedTeams
			};
		});
	}
	function toggleSavedCompetition(leagueId) {
		setSavedLeagues((current) => {
			const currentTeams = current[leagueId] ?? [];
			const wholeCompetitionIsSaved = currentTeams.includes(leagueId);
			return {
				...current,
				[leagueId]: wholeCompetitionIsSaved ? currentTeams.filter((team) => team !== leagueId) : [leagueId, ...currentTeams.filter((team) => team !== leagueId)]
			};
		});
	}
	function toggleSavedSport(sportId) {
		setSavedSports((current) => current.includes(sportId) ? current.filter((sport) => sport !== sportId) : normalizeSports([...current, sportId]));
	}
	async function saveTeams() {
		if (!user) {
			toast.error("Sign in to save your teams");
			return;
		}
		if (!hasChanges) return;
		setSaving(true);
		try {
			const activeRegion = typeof window !== "undefined" ? sessionStorage.getItem(SESSION_REGION_KEY) ?? legacyRegion : legacyRegion;
			const currentLegacyTeams = savedLeagues[legacyLeagueId] ?? [];
			await savePreferences(user.id, {
				sport: legacySport,
				league_id: legacyLeagueId,
				teams: [...currentLegacyTeams],
				region: activeRegion,
				saved_leagues: savedLeagues,
				saved_sports: savedSports
			});
			setOriginalSavedLeagues(cloneSavedLeagues(savedLeagues));
			setOriginalSavedSports(normalizeSports(savedSports));
			posthog?.capture("team_preferences_saved", {
				team_count: totalSavedTeams,
				competition_count: followedLeagueCount,
				sport_count: savedSports.length
			});
			toast.success("Your teams have been updated");
		} catch (error) {
			console.error("Could not save teams", error);
			toast.error("Could not save your teams");
		} finally {
			setSaving(false);
		}
	}
	function discardChanges() {
		setSavedLeagues(cloneSavedLeagues(originalSavedLeagues));
		setSavedSports(normalizeSports(originalSavedSports));
	}
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			marginTop: "24px",
			minHeight: "300px",
			display: "grid",
			placeItems: "center",
			padding: "32px",
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)",
			textAlign: "center"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: { maxWidth: "360px" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
					size: 32,
					style: {
						margin: "0 auto 14px",
						color: "var(--brand)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "17px",
						fontWeight: 750
					},
					children: "Sign in to manage your teams"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					style: {
						margin: "7px 0 18px",
						fontSize: "13px",
						lineHeight: 1.55
					},
					children: "Your followed teams are saved to your SeasonCaddy account."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/auth",
					style: {
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "38px",
						padding: "0 16px",
						borderRadius: "8px",
						background: "var(--brand)",
						color: "var(--brand-foreground)",
						fontSize: "13px",
						fontWeight: 750,
						textDecoration: "none"
					},
					children: "Sign in"
				})
			]
		})
	})] });
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-muted-foreground",
		style: {
			marginTop: "24px",
			minHeight: "300px",
			display: "grid",
			placeItems: "center",
			borderRadius: "12px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 60%, transparent)"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "center",
				gap: "8px",
				fontSize: "13px"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
				size: 17,
				className: "animate-spin"
			}), "Loading your teams…"]
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-teams-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeading, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-teams-summary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					value: totalSavedTeams,
					label: "Followed teams"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
					value: followedLeagueCount,
					label: "Active leagues"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-teams-sports-grid",
				style: { paddingBottom: hasChanges ? "92px" : "0" },
				children: (() => {
					const sportCards = sports.map((sport, sportIndex) => {
						const sportIsOpen = Boolean(openSports[sport.id]);
						const sportLeagues = sortCompetitions(leagues.filter((league) => league.sport === sport.id));
						const sportSavedTeams = sportLeagues.reduce((total, league) => total + (savedLeagues[league.id] ?? []).filter((team) => team !== league.id).length, 0);
						const sportActiveLeagues = sportLeagues.filter((league) => (savedLeagues[league.id] ?? []).length > 0).length;
						sportLeagues.filter((league) => (liveTeamsByLeague[league.id] ?? []).length > 0);
						const sportIsSaved = savedSports.includes(sport.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								order: sportIndex,
								borderRadius: "12px",
								border: sportSavedTeams > 0 ? "1px solid color-mix(in oklch, var(--brand) 48%, var(--border))" : "1px solid var(--border)",
								background: sportSavedTeams > 0 ? "color-mix(in oklch, var(--brand) 9%, var(--surface-2))" : "color-mix(in oklch, var(--surface-2) 60%, transparent)",
								boxShadow: sportSavedTeams > 0 ? "inset 3px 0 0 color-mix(in oklch, var(--brand) 82%, transparent)" : "none",
								overflow: "hidden",
								transition: "background 160ms ease, border-color 160ms ease, box-shadow 160ms ease"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								role: "button",
								tabIndex: 0,
								onClick: () => toggleSport(sport.id),
								onKeyDown: (event) => {
									if (event.target !== event.currentTarget) return;
									if (event.key === "Enter" || event.key === " ") {
										event.preventDefault();
										toggleSport(sport.id);
									}
								},
								className: "my-teams-sport-header",
								style: {
									width: "100%",
									minHeight: "72px",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: "16px",
									padding: "16px 18px",
									background: "transparent",
									color: "var(--foreground)",
									cursor: "pointer",
									textAlign: "left"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "my-teams-sport-main",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { minWidth: 0 },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: "17px",
												fontWeight: 800
											},
											children: sport.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-muted-foreground",
											style: {
												marginTop: "3px",
												fontSize: "11px"
											},
											children: [sportLeagues.length === 1 ? "1 competition" : `${sportLeagues.length} competitions`, sportSavedTeams > 0 && ` · ${sportSavedTeams} followed`]
										})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "my-teams-sport-right",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveScopeButton, {
											saved: sportIsSaved,
											unsavedLabel: "Save this Sport",
											savedLabel: "Sport Saved",
											onToggle: () => toggleSavedSport(sport.id),
											disabled: false
										}),
										sportActiveLeagues > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												display: "inline-flex",
												alignItems: "center",
												minHeight: "25px",
												padding: "0 8px",
												borderRadius: "999px",
												background: "color-mix(in oklch, var(--brand) 12%, transparent)",
												border: "1px solid color-mix(in oklch, var(--brand) 25%, transparent)",
												color: "var(--brand)",
												fontSize: "10px",
												fontWeight: 800
											},
											children: [
												sportSavedTeams,
												" ",
												"followed"
											]
										}),
										sportIsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
											size: 19,
											className: "text-muted-foreground"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											size: 19,
											className: "text-muted-foreground"
										})
									]
								})]
							}), sportIsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: { padding: "0 12px 12px" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										gap: "8px"
									},
									children: [sportLeagues.map((league) => {
										const leagueIsOpen = Boolean(openLeagues[league.id]);
										const selectedTeams = (savedLeagues[league.id] ?? []).filter((team) => team !== league.id);
										const availableTeams = liveTeamsByLeague[league.id] ?? [];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												borderRadius: "10px",
												border: "1px solid var(--border)",
												background: "color-mix(in oklch, var(--background) 32%, transparent)",
												overflow: "hidden"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												role: "button",
												tabIndex: 0,
												onClick: () => toggleLeague(league.id),
												onKeyDown: (event) => {
													if (event.target !== event.currentTarget) return;
													if (event.key === "Enter" || event.key === " ") {
														event.preventDefault();
														toggleLeague(league.id);
													}
												},
												style: {
													width: "100%",
													minHeight: "58px",
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													gap: "14px",
													padding: "12px 14px",
													background: "transparent",
													color: "var(--foreground)",
													cursor: "pointer",
													textAlign: "left"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: "14px",
														fontWeight: 750
													},
													children: league.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-muted-foreground",
													style: {
														marginTop: "3px",
														fontSize: "10px"
													},
													children: selectedTeams.length === 0 ? `${availableTeams.length} teams` : selectedTeams.length === 1 ? `1 followed · ${availableTeams.length} teams` : `${selectedTeams.length} followed · ${availableTeams.length} teams`
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														display: "flex",
														alignItems: "center",
														gap: "9px"
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveScopeButton, {
															saved: (savedLeagues[league.id] ?? []).includes(league.id),
															unsavedLabel: "Save competition",
															savedLabel: "Competition Saved",
															onToggle: () => toggleSavedCompetition(league.id),
															disabled: false
														}),
														selectedTeams.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: {
																minWidth: "27px",
																height: "24px",
																display: "grid",
																placeItems: "center",
																padding: "0 7px",
																borderRadius: "999px",
																background: "color-mix(in oklch, var(--brand) 14%, transparent)",
																border: "1px solid color-mix(in oklch, var(--brand) 26%, transparent)",
																color: "var(--brand)",
																fontSize: "10px",
																fontWeight: 800
															},
															children: selectedTeams.length
														}),
														leagueIsOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
															size: 17,
															className: "text-muted-foreground"
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
															size: 17,
															className: "text-muted-foreground"
														})
													]
												})]
											}), leagueIsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													borderTop: "1px solid var(--border)",
													padding: "14px"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "my-teams-team-grid",
													children: [availableTeams.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: "Teams will appear when live fixture data is available for this competition."
													}), availableTeams.map((team) => {
														const selected = selectedTeams.includes(team);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => toggleTeam(league.id, team),
															style: {
																minHeight: "44px",
																display: "flex",
																alignItems: "center",
																justifyContent: "space-between",
																gap: "8px",
																padding: "9px 11px",
																borderRadius: "9px",
																border: selected ? "1px solid color-mix(in oklch, var(--brand) 50%, var(--border))" : "1px solid var(--border)",
																background: selected ? "color-mix(in oklch, var(--brand) 13%, transparent)" : "color-mix(in oklch, var(--surface-2) 40%, transparent)",
																color: selected ? "var(--foreground)" : "var(--muted-foreground)",
																cursor: "pointer",
																textAlign: "left"
															},
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																style: {
																	minWidth: 0,
																	overflow: "hidden",
																	whiteSpace: "nowrap",
																	textOverflow: "ellipsis",
																	fontSize: "12px",
																	fontWeight: selected ? 750 : 600
																},
																children: team
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																style: {
																	width: "20px",
																	height: "20px",
																	flexShrink: 0,
																	display: "grid",
																	placeItems: "center",
																	borderRadius: "50%",
																	border: selected ? "1px solid var(--brand)" : "1px solid var(--border)",
																	background: selected ? "var(--brand)" : "transparent",
																	color: selected ? "var(--brand-foreground)" : "transparent"
																},
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
																	size: 12,
																	strokeWidth: 3
																})
															})]
														}, team);
													})]
												})
											})]
										}, league.id);
									}), sportLeagues.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted-foreground",
										style: {
											padding: "18px",
											textAlign: "center",
											fontSize: "12px"
										},
										children: "No competitions have been added for this sport yet."
									})]
								})
							})]
						}, sport.id);
					});
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-teams-sports-columns",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "my-teams-sports-column",
							children: sportCards.filter((_, index) => index % 2 === 0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "my-teams-sports-column",
							children: sportCards.filter((_, index) => index % 2 === 1)
						})]
					});
				})()
			}),
			hasChanges && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-teams-save-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: "13px",
						fontWeight: 750
					},
					children: "You have unsaved changes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-muted-foreground",
					style: {
						marginTop: "2px",
						fontSize: "11px"
					},
					children: "Save to update your SeasonCaddy schedule."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "my-teams-save-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "my-teams-save-button",
						disabled: saving,
						onClick: discardChanges,
						style: {
							minHeight: "38px",
							padding: "0 13px",
							borderRadius: "8px",
							border: "1px solid var(--border)",
							background: "transparent",
							color: "var(--foreground)",
							fontSize: "12px",
							fontWeight: 700,
							cursor: saving ? "default" : "pointer",
							opacity: saving ? .55 : 1
						},
						children: "Discard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "my-teams-save-button",
						disabled: saving,
						onClick: saveTeams,
						style: {
							minHeight: "38px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "7px",
							padding: "0 14px",
							borderRadius: "8px",
							border: "1px solid var(--brand)",
							background: "var(--brand)",
							color: "var(--brand-foreground)",
							fontSize: "12px",
							fontWeight: 800,
							cursor: saving ? "default" : "pointer",
							opacity: saving ? .7 : 1
						},
						children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							size: 14,
							className: "animate-spin"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), saving ? "Saving…" : "Save changes"]
					})]
				})]
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
			children: "My Teams"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			style: {
				marginTop: "7px",
				marginBottom: 0,
				fontSize: "14px"
			},
			children: "Choose teams, competitions, or whole sports for SeasonCaddy to follow."
		})
	] });
}
function SaveScopeButton({ saved, unsavedLabel, savedLabel, onToggle, disabled = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled,
		onClick: (event) => {
			event.stopPropagation();
			onToggle();
		},
		"aria-label": saved ? `Remove ${savedLabel}` : unsavedLabel,
		style: {
			minHeight: "28px",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			gap: saved ? "7px" : "0",
			padding: "0 9px",
			borderRadius: "999px",
			border: saved ? "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))" : "1px solid var(--border)",
			background: saved ? "color-mix(in oklch, var(--brand) 14%, transparent)" : "color-mix(in oklch, var(--background) 42%, transparent)",
			color: saved ? "var(--brand)" : "var(--foreground)",
			fontSize: "10px",
			fontWeight: 800,
			whiteSpace: "nowrap",
			cursor: disabled ? "default" : "pointer",
			opacity: disabled ? .45 : 1
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: saved ? savedLabel : unsavedLabel }), saved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": "true",
			style: {
				fontSize: "15px",
				lineHeight: 1,
				fontWeight: 900
			},
			children: "×"
		})]
	});
}
function MiniStat({ value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: "14px 16px",
			borderRadius: "10px",
			border: "1px solid var(--border)",
			background: "color-mix(in oklch, var(--surface-2) 65%, transparent)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				fontSize: "22px",
				lineHeight: 1,
				fontWeight: 800,
				color: "var(--brand)"
			},
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-muted-foreground",
			style: {
				marginTop: "5px",
				fontSize: "11px",
				fontWeight: 650
			},
			children: label
		})]
	});
}
function normalizeSports(value) {
	if (!Array.isArray(value)) return [];
	return Array.from(new Set(value.filter((sport) => typeof sport === "string").map((sport) => sport.trim().toLowerCase()).filter(Boolean))).sort();
}
function cloneSavedLeagues(savedLeagues) {
	return Object.fromEntries(Object.entries(savedLeagues).map(([leagueId, teams]) => [leagueId, [...teams]]));
}
function normaliseSavedLeagues(savedLeagues) {
	const normalised = Object.entries(savedLeagues).map(([leagueId, teams]) => [leagueId, [...teams].sort()]).sort(([a], [b]) => a.localeCompare(b));
	return JSON.stringify(normalised);
}
function formatCatalogLabel(value) {
	return value.split("-").filter(Boolean).map((part) => {
		const lower = part.toLowerCase();
		if (lower === "afl") return "AFL";
		if (lower === "mma") return "MMA";
		if (lower === "mlb") return "MLB";
		if (lower === "nba") return "NBA";
		if (lower === "nfl") return "NFL";
		if (lower === "nhl") return "NHL";
		return part.charAt(0).toUpperCase() + part.slice(1);
	}).join(" ");
}
//#endregion
export { TeamsPage as component };
