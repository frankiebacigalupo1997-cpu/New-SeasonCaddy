import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Save,
  Users,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  toast,
} from "sonner";

import {
  fetchPreferences,
  savePreferences,
} from "@/lib/gamehub-cloud";

import {
  frontendCatalogQueryOptions,
  frontendIdentityCatalogQueryOptions,
  useFrontendCatalog,
  useFrontendIdentityCatalog,
} from "@/hooks/useSeasonCaddyData";

import {
  catalogDisplayTeamNames,
} from "@/lib/supabase-fixtures";

import {
  useAuth,
} from "@/hooks/useAuth";

import {
  SeasonCaddySelect,
} from "@/components/gamehub/SeasonCaddySelect";

const SESSION_REGION_KEY =
  "sportstream-region";

export const Route =
  createFileRoute(
    "/my-caddy/teams",
  )({
    loader: ({ context }) => {
      // Start the lightweight sport/competition catalog and the team identity
      // catalog together. My Teams needs both immediately because every
      // competition row displays a team count and the sport/competition save
      // controls must work before an individual league is expanded.
      void context.queryClient.prefetchQuery(frontendCatalogQueryOptions);
      void context.queryClient.prefetchQuery(frontendIdentityCatalogQueryOptions);
    },

    component:
      TeamsPage,
  });

function TeamsPage() {
  const { user } =
    useAuth();

  /* ==================================================== */
  /* LIVE SPORT / COMPETITION / TEAM CATALOG              */
  /* ==================================================== */

  const {
    data: frontendCatalog = [],
  } = useFrontendCatalog();

  const leagues = useMemo(
    () =>
      frontendCatalog.map((competition) => ({
        id: competition.competitionId,
        name: competition.competitionName,
        sport: competition.sport,
        location:
          competition.locationName ??
          competition.countryName ??
          competition.regionName ??
          "",
        teams: catalogDisplayTeamNames(competition),
      })),
    [frontendCatalog],
  );

  const soccerLocationOptions = useMemo(
    () =>
      Array.from(
        new Set(
          leagues
            .filter(
              (league) =>
                league.sport === "soccer" &&
                Boolean(league.location),
            )
            .map((league) => league.location),
        ),
      ).sort((a, b) => a.localeCompare(b)),
    [leagues],
  );

  const sports = useMemo(() => {
    const ids = Array.from(
      new Set(
        frontendCatalog
          .map((competition) => competition.sport)
          .filter((value) => value && value !== "other"),
      ),
    );

    return ids
      .map((id) => ({
        id,
        name: formatCatalogLabel(id),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [frontendCatalog]);

  /* ==================================================== */
  /* SAVED TEAMS                                          */
  /* ==================================================== */

  const [
    savedLeagues,
    setSavedLeagues,
  ] = useState<
    Record<
      string,
      string[]
    >
  >({});

  const [
    originalSavedLeagues,
    setOriginalSavedLeagues,
  ] = useState<
    Record<
      string,
      string[]
    >
  >({});

  /* ==================================================== */
  /* COLLAPSE STATE                                       */
  /* ==================================================== */

  /*
   * Empty objects = everything collapsed by default.
   */

  const [
    openSports,
    setOpenSports,
  ] = useState<
    Record<
      string,
      boolean
    >
  >({});

  const [
    openLeagues,
    setOpenLeagues,
  ] = useState<
    Record<
      string,
      boolean
    >
  >({});

  /*
   * My Teams is the one Caddy screen that needs team availability for every
   * visible competition at once: the competition row shows a team count, and
   * Save this Sport / Save competition must work before the user opens each
   * individual competition. The lightweight frontend catalog intentionally
   * omits team_names/canonical_teams, so hydrate the identity catalog on this
   * route instead of waiting for each league accordion to open.
   */
  const {
    data: focusedIdentityCatalog = [],
  } = useFrontendIdentityCatalog();

  const focusedIdentityById = useMemo(
    () =>
      new Map(
        focusedIdentityCatalog.map((competition) => [
          competition.competitionId,
          competition,
        ]),
      ),
    [focusedIdentityCatalog],
  );

  const liveTeamsByLeague = useMemo(() => {
    const teamsByLeague: Record<string, string[]> = {};

    for (const competition of frontendCatalog) {
      const identityCompetition = focusedIdentityById.get(
        competition.competitionId,
      );

      teamsByLeague[competition.competitionId] = catalogDisplayTeamNames(
        identityCompetition ?? competition,
      );
    }

    return teamsByLeague;
  }, [frontendCatalog, focusedIdentityById]);

  /* ==================================================== */
  /* PAGE STATE                                           */
  /* ==================================================== */

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    saving,
    setSaving,
  ] = useState(false);

  /*
   * These keep compatibility with
   * SeasonCaddy's existing preference record.
   */

  const [
    legacySport,
    setLegacySport,
  ] = useState(
    "soccer",
  );

  const [
    legacyLeagueId,
    setLegacyLeagueId,
  ] = useState(
    "premier-league",
  );

  const [
    legacyRegion,
    setLegacyRegion,
  ] = useState(
    "United States · Eastern",
  );

  const [
    soccerLocation,
    setSoccerLocation,
  ] = useState("");

  /* ==================================================== */
  /* LOAD USER PREFERENCES                                */
  /* ==================================================== */

  useEffect(() => {
    let cancelled =
      false;

    async function loadTeams() {
      if (!user) {
        if (
          !cancelled
        ) {
          setLoading(
            false,
          );
        }

        return;
      }

      try {
        const prefs =
          await fetchPreferences();

        if (
          cancelled
        ) {
          return;
        }

        if (!prefs) {
          setSavedLeagues(
            {},
          );

          setOriginalSavedLeagues(
            {},
          );

          setLoading(
            false,
          );

          return;
        }

        const loaded =
          prefs.saved_leagues ??
          {
            [prefs.league_id]:
              prefs.teams,
          };

        const cloned =
          cloneSavedLeagues(
            loaded,
          );

        setSavedLeagues(
          cloned,
        );

        setOriginalSavedLeagues(
          cloneSavedLeagues(
            loaded,
          ),
        );

        setLegacySport(
          prefs.sport ??
            "soccer",
        );

        setLegacyLeagueId(
          prefs.league_id ??
            "premier-league",
        );

        setLegacyRegion(
          prefs.region ??
            "United States · Eastern",
        );

        setLoading(
          false,
        );
      } catch (
        error
      ) {
        console.error(
          "Could not load saved teams",
          error,
        );

        toast.error(
          "Could not load your saved teams",
        );

        if (
          !cancelled
        ) {
          setLoading(
            false,
          );
        }
      }
    }

    loadTeams();

    return () => {
      cancelled =
        true;
    };
  }, [
    user?.id,
  ]);

  /* ==================================================== */
  /* COUNTS                                               */
  /* ==================================================== */

  const totalSavedTeams =
    useMemo(() => {
      return Object.values(
        savedLeagues,
      ).reduce(
        (
          total,
          teams,
        ) =>
          total +
          teams.length,
        0,
      );
    }, [
      savedLeagues,
    ]);

  const followedLeagueCount =
    useMemo(() => {
      return Object.values(
        savedLeagues,
      ).filter(
        (teams) =>
          teams.length >
          0,
      ).length;
    }, [
      savedLeagues,
    ]);

  /* ==================================================== */
  /* UNSAVED CHANGES                                      */
  /* ==================================================== */

  const hasChanges =
    useMemo(() => {
      return (
        normaliseSavedLeagues(
          savedLeagues,
        ) !==
        normaliseSavedLeagues(
          originalSavedLeagues,
        )
      );
    }, [
      savedLeagues,
      originalSavedLeagues,
    ]);

  /* ==================================================== */
  /* COLLAPSE HANDLERS                                    */
  /* ==================================================== */

  function toggleSport(
    sportId: string,
  ) {
    setOpenSports(
      (
        current,
      ) => ({
        ...current,

        [sportId]:
          !current[
            sportId
          ],
      }),
    );
  }

  function toggleLeague(
    leagueId: string,
  ) {
    setOpenLeagues(
      (
        current,
      ) => ({
        ...current,

        [leagueId]:
          !current[
            leagueId
          ],
      }),
    );
  }

  /* ==================================================== */
  /* TEAM TOGGLE                                          */
  /* ==================================================== */

  function toggleTeam(
    leagueId: string,
    team: string,
  ) {
    setSavedLeagues(
      (
        current,
      ) => {
        const currentTeams =
          current[
            leagueId
          ] ?? [];

        const alreadySaved =
          currentTeams.includes(
            team,
          );

        const updatedTeams =
          alreadySaved
            ? currentTeams.filter(
                (
                  currentTeam,
                ) =>
                  currentTeam !==
                  team,
              )
            : [
                ...currentTeams,
                team,
              ];

        return {
          ...current,

          /*
           * Keep empty arrays.
           * This allows SeasonCaddy to
           * know the user explicitly
           * removed every team from a league.
           */

          [leagueId]:
            updatedTeams,
        };
      },
    );
  }

  /* ==================================================== */
  /* SPORT / COMPETITION BULK SAVE                       */
  /* ==================================================== */

  function toggleSavedCompetition(
    leagueId: string,
  ) {
    const availableTeams =
      liveTeamsByLeague[
        leagueId
      ] ?? [];

    if (
      availableTeams.length ===
      0
    ) {
      toast.error(
        "No teams are available for this competition yet",
      );

      return;
    }

    setSavedLeagues(
      (
        current,
      ) => {
        const currentTeams =
          current[
            leagueId
          ] ?? [];

        const competitionIsSaved =
          availableTeams.every(
            (
              team,
            ) =>
              currentTeams.includes(
                team,
              ),
          );

        return {
          ...current,

          [leagueId]:
            competitionIsSaved
              ? []
              : [
                  ...availableTeams,
                ],
        };
      },
    );
  }

  function toggleSavedSport(
    sportId: string,
  ) {
    const sportLeagues =
      leagues.filter(
        (
          league,
        ) =>
          league.sport ===
          sportId,
      );

    const saveableLeagues =
      sportLeagues.filter(
        (
          league,
        ) =>
          (
            liveTeamsByLeague[
              league.id
            ] ?? []
          ).length >
          0,
      );

    if (
      saveableLeagues.length ===
      0
    ) {
      toast.error(
        "No teams are available for this sport yet",
      );

      return;
    }

    setSavedLeagues(
      (
        current,
      ) => {
        const sportIsSaved =
          saveableLeagues.every(
            (
              league,
            ) => {
              const availableTeams =
                liveTeamsByLeague[
                  league.id
                ] ?? [];

              const currentTeams =
                current[
                  league.id
                ] ?? [];

              return availableTeams.every(
                (
                  team,
                ) =>
                  currentTeams.includes(
                    team,
                  ),
              );
            },
          );

        const updated = {
          ...current,
        };

        for (
          const league of
          saveableLeagues
        ) {
          const availableTeams =
            liveTeamsByLeague[
              league.id
            ] ?? [];

          updated[
            league.id
          ] =
            sportIsSaved
              ? []
              : [
                  ...availableTeams,
                ];
        }

        return updated;
      },
    );
  }

  /* ==================================================== */
  /* SAVE                                                 */
  /* ==================================================== */

  async function saveTeams() {
    if (!user) {
      toast.error(
        "Sign in to save your teams",
      );

      return;
    }

    if (
      !hasChanges
    ) {
      return;
    }

    setSaving(
      true,
    );

    try {
      const activeRegion =
        typeof window !==
        "undefined"
          ? sessionStorage.getItem(
              SESSION_REGION_KEY,
            ) ??
            legacyRegion
          : legacyRegion;

      const currentLegacyTeams =
        savedLeagues[
          legacyLeagueId
        ] ?? [];

      await savePreferences(
        user.id,
        {
          sport:
            legacySport,

          league_id:
            legacyLeagueId,

          teams: [
            ...currentLegacyTeams,
          ],

          region:
            activeRegion,

          saved_leagues:
            savedLeagues,
        },
      );

      setOriginalSavedLeagues(
        cloneSavedLeagues(
          savedLeagues,
        ),
      );

      toast.success(
        "Your teams have been updated",
      );
    } catch (
      error
    ) {
      console.error(
        "Could not save teams",
        error,
      );

      toast.error(
        "Could not save your teams",
      );
    } finally {
      setSaving(
        false,
      );
    }
  }

  /* ==================================================== */
  /* DISCARD                                              */
  /* ==================================================== */

  function discardChanges() {
    setSavedLeagues(
      cloneSavedLeagues(
        originalSavedLeagues,
      ),
    );
  }

  /* ==================================================== */
  /* NOT SIGNED IN                                        */
  /* ==================================================== */

  if (!user) {
    return (
      <div>
        <PageHeading />

        <div
          style={{
            marginTop:
              "24px",

            minHeight:
              "300px",

            display:
              "grid",

            placeItems:
              "center",

            padding:
              "32px",

            borderRadius:
              "12px",

            border:
              "1px solid var(--border)",

            background:
              "color-mix(in oklch, var(--surface-2) 60%, transparent)",

            textAlign:
              "center",
          }}
        >
          <div
            style={{
              maxWidth:
                "360px",
            }}
          >
            <Users
              size={32}
              style={{
                margin:
                  "0 auto 14px",

                color:
                  "var(--brand)",
              }}
            />

            <div
              style={{
                fontSize:
                  "17px",

                fontWeight:
                  750,
              }}
            >
              Sign in to manage your teams
            </div>

            <p
              className="text-muted-foreground"
              style={{
                margin:
                  "7px 0 18px",

                fontSize:
                  "13px",

                lineHeight:
                  1.55,
              }}
            >
              Your followed teams are saved to your
              SeasonCaddy account.
            </p>

            <Link
              to="/auth"
              style={{
                display:
                  "inline-flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                minHeight:
                  "38px",

                padding:
                  "0 16px",

                borderRadius:
                  "8px",

                background:
                  "var(--brand)",

                color:
                  "var(--brand-foreground)",

                fontSize:
                  "13px",

                fontWeight:
                  750,

                textDecoration:
                  "none",
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ==================================================== */
  /* LOADING                                              */
  /* ==================================================== */

  if (
    loading
  ) {
    return (
      <div>
        <PageHeading />

        <div
          className="text-muted-foreground"
          style={{
            marginTop:
              "24px",

            minHeight:
              "300px",

            display:
              "grid",

            placeItems:
              "center",

            borderRadius:
              "12px",

            border:
              "1px solid var(--border)",

            background:
              "color-mix(in oklch, var(--surface-2) 60%, transparent)",
          }}
        >
          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              gap:
                "8px",

              fontSize:
                "13px",
            }}
          >
            <Loader2
              size={17}
              className="animate-spin"
            />

            Loading your teams…
          </div>
        </div>
      </div>
    );
  }

  /* ==================================================== */
  /* PAGE                                                 */
  /* ==================================================== */

  return (
    <div className="my-teams-page">
      <PageHeading />

      {/* SUMMARY */}

      <div className="my-teams-summary">

        <MiniStat
          value={
            totalSavedTeams
          }
          label="Followed teams"
        />

        <MiniStat
          value={
            followedLeagueCount
          }
          label="Active leagues"
        />
      </div>

      {/* ================================================= */}
      {/* SPORTS                                             */}
      {/* ================================================= */}

      <div
        className="my-teams-sports-grid"
        style={{
          paddingBottom:
            hasChanges
              ? "92px"
              : "0",
        }}
      >
        {(() => {
          const sportCards = sports.map(
          (
            sport,
            sportIndex,
          ) => {
            const sportIsOpen =
              Boolean(
                openSports[
                  sport.id
                ],
              );

            const sportLeagues =
              leagues.filter(
                (
                  league,
                ) =>
                  league.sport ===
                  sport.id,
              );

            const visibleSportLeagues =
              sport.id === "soccer" && soccerLocation
                ? sportLeagues.filter(
                    (league) => league.location === soccerLocation,
                  )
                : sportLeagues;

            const sportSavedTeams =
              sportLeagues.reduce(
                (
                  total,
                  league,
                ) =>
                  total +
                  (
                    savedLeagues[
                      league.id
                    ] ?? []
                  ).length,
                0,
              );

            const sportActiveLeagues =
              sportLeagues.filter(
                (
                  league,
                ) =>
                  (
                    savedLeagues[
                      league.id
                    ] ?? []
                  ).length >
                  0,
              ).length;

            const saveableSportLeagues =
              sportLeagues.filter(
                (
                  league,
                ) =>
                  (
                    liveTeamsByLeague[
                      league.id
                    ] ?? []
                  ).length >
                  0,
              );

            const sportIsSaved =
              saveableSportLeagues.length >
                0 &&
              saveableSportLeagues.every(
                (
                  league,
                ) => {
                  const availableTeams =
                    liveTeamsByLeague[
                      league.id
                    ] ?? [];

                  const selectedTeams =
                    savedLeagues[
                      league.id
                    ] ?? [];

                  return availableTeams.every(
                    (
                      team,
                    ) =>
                      selectedTeams.includes(
                        team,
                      ),
                  );
                },
              );

            return (
              <div
                key={
                  sport.id
                }
                style={{
                  order:
                    sportIndex,

                  borderRadius:
                    "12px",

                  border:
                    sportSavedTeams > 0
                      ? "1px solid color-mix(in oklch, var(--brand) 48%, var(--border))"
                      : "1px solid var(--border)",

                  background:
                    sportSavedTeams > 0
                      ? "color-mix(in oklch, var(--brand) 9%, var(--surface-2))"
                      : "color-mix(in oklch, var(--surface-2) 60%, transparent)",

                  boxShadow:
                    sportSavedTeams > 0
                      ? "inset 3px 0 0 color-mix(in oklch, var(--brand) 82%, transparent)"
                      : "none",

                  overflow:
                    "hidden",

                  transition:
                    "background 160ms ease, border-color 160ms ease, box-shadow 160ms ease",
                }}
              >
                {/* ======================================= */}
                {/* SPORT HEADER                            */}
                {/* ======================================= */}

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() =>
                    toggleSport(
                      sport.id,
                    )
                  }
                  onKeyDown={(event) => {
                    if (
                      event.target !==
                      event.currentTarget
                    ) {
                      return;
                    }

                    if (
                      event.key ===
                        "Enter" ||
                      event.key ===
                        " "
                    ) {
                      event.preventDefault();

                      toggleSport(
                        sport.id,
                      );
                    }
                  }}
                  className="my-teams-sport-header"
                  style={{
                    width:
                      "100%",

                    minHeight:
                      "72px",

                    display:
                      "flex",

                    alignItems:
                      "center",

                    justifyContent:
                      "space-between",

                    gap:
                      "16px",

                    padding:
                      "16px 18px",

                    background:
                      "transparent",

                    color:
                      "var(--foreground)",

                    cursor:
                      "pointer",

                    textAlign:
                      "left",
                  }}
                >
                  <div className="my-teams-sport-main">

                    {/* SPORT TITLE */}

                    <div
                      style={{
                        minWidth:
                          0,
                      }}
                    >
                      <div
                        style={{
                          fontSize:
                            "17px",

                          fontWeight:
                            800,
                        }}
                      >
                        {
                          sport.name
                        }
                      </div>

                      <div
                        className="text-muted-foreground"
                        style={{
                          marginTop:
                            "3px",

                          fontSize:
                            "11px",
                        }}
                      >
                        {sportLeagues.length ===
                        1
                          ? "1 competition"
                          : `${sportLeagues.length} competitions`}

                        {sportSavedTeams >
                          0 &&
                          ` · ${sportSavedTeams} followed`}
                      </div>
                    </div>
                  </div>

                  {/* SPORT RIGHT */}

                  <div className="my-teams-sport-right">

                    <SaveScopeButton
                      saved={
                        sportIsSaved
                      }
                      unsavedLabel="Save this Sport"
                      savedLabel="Sport Saved"
                      onToggle={() =>
                        toggleSavedSport(
                          sport.id,
                        )
                      }
                      disabled={
                        saveableSportLeagues.length ===
                        0
                      }
                    />

                    {sportActiveLeagues >
                      0 && (
                      <span
                        style={{
                          display:
                            "inline-flex",

                          alignItems:
                            "center",

                          minHeight:
                            "25px",

                          padding:
                            "0 8px",

                          borderRadius:
                            "999px",

                          background:
                            "color-mix(in oklch, var(--brand) 12%, transparent)",

                          border:
                            "1px solid color-mix(in oklch, var(--brand) 25%, transparent)",

                          color:
                            "var(--brand)",

                          fontSize:
                            "10px",

                          fontWeight:
                            800,
                        }}
                      >
                        {
                          sportSavedTeams
                        }{" "}
                        followed
                      </span>
                    )}

                    {sportIsOpen ? (
                      <ChevronDown
                        size={
                          19
                        }
                        className="text-muted-foreground"
                      />
                    ) : (
                      <ChevronRight
                        size={
                          19
                        }
                        className="text-muted-foreground"
                      />
                    )}
                  </div>
                </div>

                {/* ======================================= */}
                {/* SPORT CONTENT                           */}
                {/* ======================================= */}

                {sportIsOpen && (
                  <div
                    style={{
                      padding:
                        "0 12px 12px",
                    }}
                  >
                    <div
                      style={{
                        display:
                          "flex",

                        flexDirection:
                          "column",

                        gap:
                          "8px",
                      }}
                    >
                      {sport.id === "soccer" &&
                        soccerLocationOptions.length > 0 && (
                          <div
                            style={{
                              padding: "4px 0 2px",
                            }}
                          >
                            <SeasonCaddySelect
                              value={soccerLocation}
                              placeholder="All Locations"
                              options={[
                                {
                                  value: "",
                                  label: "All Locations",
                                },
                                ...soccerLocationOptions.map((location) => ({
                                  value: location,
                                  label: location,
                                })),
                              ]}
                              onChange={setSoccerLocation}
                            />
                          </div>
                        )}

                      {visibleSportLeagues.map(
                        (
                          league,
                        ) => {
                          const leagueIsOpen =
                            Boolean(
                              openLeagues[
                                league.id
                              ],
                            );

                          const selectedTeams =
                            savedLeagues[
                              league.id
                            ] ?? [];

                          const availableTeams =
                            liveTeamsByLeague[
                              league.id
                            ] ?? [];

                          const competitionIsSaved =
                            availableTeams.length >
                              0 &&
                            availableTeams.every(
                              (
                                team,
                              ) =>
                                selectedTeams.includes(
                                  team,
                                ),
                            );

                          return (
                            <div
                              key={
                                league.id
                              }
                              style={{
                                borderRadius:
                                  "10px",

                                border:
                                  "1px solid var(--border)",

                                background:
                                  "color-mix(in oklch, var(--background) 32%, transparent)",

                                overflow:
                                  "hidden",
                              }}
                            >
                              {/* ========================= */}
                              {/* LEAGUE HEADER             */}
                              {/* ========================= */}

                              <div
                                role="button"
                                tabIndex={0}
                                onClick={() =>
                                  toggleLeague(
                                    league.id,
                                  )
                                }
                                onKeyDown={(event) => {
                                  if (
                                    event.target !==
                                    event.currentTarget
                                  ) {
                                    return;
                                  }

                                  if (
                                    event.key ===
                                      "Enter" ||
                                    event.key ===
                                      " "
                                  ) {
                                    event.preventDefault();

                                    toggleLeague(
                                      league.id,
                                    );
                                  }
                                }}
                                style={{
                                  width:
                                    "100%",

                                  minHeight:
                                    "58px",

                                  display:
                                    "flex",

                                  alignItems:
                                    "center",

                                  justifyContent:
                                    "space-between",

                                  gap:
                                    "14px",

                                  padding:
                                    "12px 14px",

                                  background:
                                    "transparent",

                                  color:
                                    "var(--foreground)",

                                  cursor:
                                    "pointer",

                                  textAlign:
                                    "left",
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      fontSize:
                                        "14px",

                                      fontWeight:
                                        750,
                                    }}
                                  >
                                    {
                                      league.name
                                    }
                                  </div>

                                  <div
                                    className="text-muted-foreground"
                                    style={{
                                      marginTop:
                                        "3px",

                                      fontSize:
                                        "10px",
                                    }}
                                  >
                                    {selectedTeams.length ===
                                    0
                                      ? `${availableTeams.length} teams`
                                      : selectedTeams.length ===
                                          1
                                        ? `1 followed · ${availableTeams.length} teams`
                                        : `${selectedTeams.length} followed · ${availableTeams.length} teams`}
                                  </div>
                                </div>

                                <div
                                  style={{
                                    display:
                                      "flex",

                                    alignItems:
                                      "center",

                                    gap:
                                      "9px",
                                  }}
                                >
                                  <SaveScopeButton
                                    saved={
                                      competitionIsSaved
                                    }
                                    unsavedLabel="Save competition"
                                    savedLabel="Competition Saved"
                                    onToggle={() =>
                                      toggleSavedCompetition(
                                        league.id,
                                      )
                                    }
                                    disabled={
                                      availableTeams.length ===
                                      0
                                    }
                                  />

                                  {selectedTeams.length >
                                    0 && (
                                    <span
                                      style={{
                                        minWidth:
                                          "27px",

                                        height:
                                          "24px",

                                        display:
                                          "grid",

                                        placeItems:
                                          "center",

                                        padding:
                                          "0 7px",

                                        borderRadius:
                                          "999px",

                                        background:
                                          "color-mix(in oklch, var(--brand) 14%, transparent)",

                                        border:
                                          "1px solid color-mix(in oklch, var(--brand) 26%, transparent)",

                                        color:
                                          "var(--brand)",

                                        fontSize:
                                          "10px",

                                        fontWeight:
                                          800,
                                      }}
                                    >
                                      {
                                        selectedTeams.length
                                      }
                                    </span>
                                  )}

                                  {leagueIsOpen ? (
                                    <ChevronDown
                                      size={
                                        17
                                      }
                                      className="text-muted-foreground"
                                    />
                                  ) : (
                                    <ChevronRight
                                      size={
                                        17
                                      }
                                      className="text-muted-foreground"
                                    />
                                  )}
                                </div>
                              </div>

                              {/* ========================= */}
                              {/* TEAMS                     */}
                              {/* ========================= */}

                              {leagueIsOpen && (
                                <div
                                  style={{
                                    borderTop:
                                      "1px solid var(--border)",

                                    padding:
                                      "14px",
                                  }}
                                >
                                  <div className="my-teams-team-grid">

                                    {availableTeams.length ===
                                      0 && (
                                      <p className="text-xs text-muted-foreground">
                                        Teams will appear when live fixture data is available for this competition.
                                      </p>
                                    )}

                                    {availableTeams.map(
                                      (
                                        team,
                                      ) => {
                                        const selected =
                                          selectedTeams.includes(
                                            team,
                                          );

                                        return (
                                          <button
                                            key={
                                              team
                                            }
                                            type="button"
                                            onClick={() =>
                                              toggleTeam(
                                                league.id,
                                                team,
                                              )
                                            }
                                            style={{
                                              minHeight:
                                                "44px",

                                              display:
                                                "flex",

                                              alignItems:
                                                "center",

                                              justifyContent:
                                                "space-between",

                                              gap:
                                                "8px",

                                              padding:
                                                "9px 11px",

                                              borderRadius:
                                                "9px",

                                              border:
                                                selected
                                                  ? "1px solid color-mix(in oklch, var(--brand) 50%, var(--border))"
                                                  : "1px solid var(--border)",

                                              background:
                                                selected
                                                  ? "color-mix(in oklch, var(--brand) 13%, transparent)"
                                                  : "color-mix(in oklch, var(--surface-2) 40%, transparent)",

                                              color:
                                                selected
                                                  ? "var(--foreground)"
                                                  : "var(--muted-foreground)",

                                              cursor:
                                                "pointer",

                                              textAlign:
                                                "left",
                                            }}
                                          >
                                            <span
                                              style={{
                                                minWidth:
                                                  0,

                                                overflow:
                                                  "hidden",

                                                whiteSpace:
                                                  "nowrap",

                                                textOverflow:
                                                  "ellipsis",

                                                fontSize:
                                                  "12px",

                                                fontWeight:
                                                  selected
                                                    ? 750
                                                    : 600,
                                              }}
                                            >
                                              {
                                                team
                                              }
                                            </span>

                                            <span
                                              style={{
                                                width:
                                                  "20px",

                                                height:
                                                  "20px",

                                                flexShrink:
                                                  0,

                                                display:
                                                  "grid",

                                                placeItems:
                                                  "center",

                                                borderRadius:
                                                  "50%",

                                                border:
                                                  selected
                                                    ? "1px solid var(--brand)"
                                                    : "1px solid var(--border)",

                                                background:
                                                  selected
                                                    ? "var(--brand)"
                                                    : "transparent",

                                                color:
                                                  selected
                                                    ? "var(--brand-foreground)"
                                                    : "transparent",
                                              }}
                                            >
                                              <Check
                                                size={
                                                  12
                                                }
                                                strokeWidth={
                                                  3
                                                }
                                              />
                                            </span>
                                          </button>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        },
                      )}

                      {visibleSportLeagues.length ===
                        0 && (
                        <div
                          className="text-muted-foreground"
                          style={{
                            padding:
                              "18px",

                            textAlign:
                              "center",

                            fontSize:
                              "12px",
                          }}
                        >
                          {sport.id === "soccer" && soccerLocation
                            ? `No soccer competitions are currently listed for ${soccerLocation}.`
                            : "No competitions have been added for this sport yet."}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          },
        );

          return (
            <div className="my-teams-sports-columns">
              <div className="my-teams-sports-column">
                {sportCards.filter((_, index) => index % 2 === 0)}
              </div>

              <div className="my-teams-sports-column">
                {sportCards.filter((_, index) => index % 2 === 1)}
              </div>
            </div>
          );
        })()}
      </div>

      {/* ================================================= */}
      {/* UNSAVED CHANGES                                   */}
      {/* ================================================= */}

      {hasChanges && (
        <div className="my-teams-save-bar">

          <div>
            <div
              style={{
                fontSize:
                  "13px",

                fontWeight:
                  750,
              }}
            >
              You have unsaved changes
            </div>

            <div
              className="text-muted-foreground"
              style={{
                marginTop:
                  "2px",

                fontSize:
                  "11px",
              }}
            >
              Save to update your SeasonCaddy schedule.
            </div>
          </div>

          <div className="my-teams-save-actions">

            <button
              type="button"
              className="my-teams-save-button"
              disabled={
                saving
              }
              onClick={
                discardChanges
              }
              style={{
                minHeight:
                  "38px",

                padding:
                  "0 13px",

                borderRadius:
                  "8px",

                border:
                  "1px solid var(--border)",

                background:
                  "transparent",

                color:
                  "var(--foreground)",

                fontSize:
                  "12px",

                fontWeight:
                  700,

                cursor:
                  saving
                    ? "default"
                    : "pointer",

                opacity:
                  saving
                    ? 0.55
                    : 1,
              }}
            >
              Discard
            </button>

            <button
              type="button"
              className="my-teams-save-button"
              disabled={
                saving
              }
              onClick={
                saveTeams
              }
              style={{
                minHeight:
                  "38px",

                display:
                  "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                gap:
                  "7px",

                padding:
                  "0 14px",

                borderRadius:
                  "8px",

                border:
                  "1px solid var(--brand)",

                background:
                  "var(--brand)",

                color:
                  "var(--brand-foreground)",

                fontSize:
                  "12px",

                fontWeight:
                  800,

                cursor:
                  saving
                    ? "default"
                    : "pointer",

                opacity:
                  saving
                    ? 0.7
                    : 1,
              }}
            >
              {saving ? (
                <Loader2
                  size={
                    14
                  }
                  className="animate-spin"
                />
              ) : (
                <Save
                  size={
                    14
                  }
                />
              )}

              {saving
                ? "Saving…"
                : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ====================================================== */
/* PAGE HEADING                                           */
/* ====================================================== */

function PageHeading() {
  return (
    <div>
      <Link
        to="/my-caddy"
        style={{
          display:
            "inline-flex",

          alignItems:
            "center",

          gap:
            "5px",

          marginBottom:
            "14px",

          color:
            "var(--muted-foreground)",

          fontSize:
            "12px",

          fontWeight:
            650,

          textDecoration:
            "none",
        }}
      >
        <ChevronLeft
          size={
            14
          }
        />

        Overview
      </Link>

      <h1
        className="font-display font-extrabold tracking-tight"
        style={{
          margin:
            0,

          fontSize:
            "32px",

          lineHeight:
            1.1,
        }}
      >
        My Teams
      </h1>

      <p
        className="text-muted-foreground"
        style={{
          marginTop:
            "7px",

          marginBottom:
            0,

          fontSize:
            "14px",
        }}
      >
        Choose teams, competitions, or whole sports for SeasonCaddy to follow.
      </p>
    </div>
  );
}

/* ====================================================== */
/* BULK SAVE BUTTON                                      */
/* ====================================================== */

function SaveScopeButton({
  saved,
  unsavedLabel,
  savedLabel,
  onToggle,
  disabled = false,
}: {
  saved: boolean;
  unsavedLabel: string;
  savedLabel: string;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={
        disabled
      }
      onClick={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      aria-label={
        saved
          ? `Remove ${savedLabel}`
          : unsavedLabel
      }
      style={{
        minHeight:
          "28px",

        display:
          "inline-flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        gap:
          saved
            ? "7px"
            : "0",

        padding:
          "0 9px",

        borderRadius:
          "999px",

        border:
          saved
            ? "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))"
            : "1px solid var(--border)",

        background:
          saved
            ? "color-mix(in oklch, var(--brand) 14%, transparent)"
            : "color-mix(in oklch, var(--background) 42%, transparent)",

        color:
          saved
            ? "var(--brand)"
            : "var(--foreground)",

        fontSize:
          "10px",

        fontWeight:
          800,

        whiteSpace:
          "nowrap",

        cursor:
          disabled
            ? "default"
            : "pointer",

        opacity:
          disabled
            ? 0.45
            : 1,
      }}
    >
      <span>
        {saved
          ? savedLabel
          : unsavedLabel}
      </span>

      {saved && (
        <span
          aria-hidden="true"
          style={{
            fontSize:
              "15px",

            lineHeight:
              1,

            fontWeight:
              900,
          }}
        >
          ×
        </span>
      )}
    </button>
  );
}

/* ====================================================== */
/* MINI STAT                                              */
/* ====================================================== */

function MiniStat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div
      style={{
        padding:
          "14px 16px",

        borderRadius:
          "10px",

        border:
          "1px solid var(--border)",

        background:
          "color-mix(in oklch, var(--surface-2) 65%, transparent)",
      }}
    >
      <div
        style={{
          fontSize:
            "22px",

          lineHeight:
            1,

          fontWeight:
            800,

          color:
            "var(--brand)",
        }}
      >
        {
          value
        }
      </div>

      <div
        className="text-muted-foreground"
        style={{
          marginTop:
            "5px",

          fontSize:
            "11px",

          fontWeight:
            650,
        }}
      >
        {
          label
        }
      </div>
    </div>
  );
}

/* ====================================================== */
/* HELPERS                                                */
/* ====================================================== */

function cloneSavedLeagues(
  savedLeagues: Record<
    string,
    string[]
  >,
) {
  return Object.fromEntries(
    Object.entries(
      savedLeagues,
    ).map(
      ([
        leagueId,
        teams,
      ]) => [
        leagueId,
        [
          ...teams,
        ],
      ],
    ),
  );
}

function normaliseSavedLeagues(
  savedLeagues: Record<
    string,
    string[]
  >,
) {
  const normalised =
    Object.entries(
      savedLeagues,
    )
      .map(
        ([
          leagueId,
          teams,
        ]) => [
          leagueId,
          [
            ...teams,
          ].sort(),
        ] as const,
      )
      .sort(
        (
          [a],
          [b],
        ) =>
          a.localeCompare(
            b,
          ),
      );

  return JSON.stringify(
    normalised,
  );
}

function formatCatalogLabel(value: string) {
  return value
    .split("-")
    .filter(Boolean)
    .map((part) => {
      const lower = part.toLowerCase();
      if (lower === "afl") return "AFL";
      if (lower === "mma") return "MMA";
      if (lower === "mlb") return "MLB";
      if (lower === "nba") return "NBA";
      if (lower === "nfl") return "NFL";
      if (lower === "nhl") return "NHL";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}
