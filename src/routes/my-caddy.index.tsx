import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  Clock3,
  Tv,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import { toast } from "sonner";

import {
  deleteService,
  fetchPreferences,
  fetchServices,
  upsertService,
} from "@/lib/gamehub-cloud";

import {
  NextFixtureHero,
} from "@/components/gamehub/NextFixtureHero";

import {
  CompactCalendar,
} from "@/components/gamehub/CompactCalendar";

import {
  formatRegionalTime,
  getProviderIdsForGame,
  isGameLive,
  isUpcomingOrLiveGame,
  providerById,
  timeZoneForRegion,
  type Game,
} from "@/lib/gamehub-data";

import {
  catalogDisplayTeamNames,
} from "@/lib/supabase-fixtures";

import {
  useSavedTeamsDataset,
  useCompetitionIdentityCatalog,
  useFrontendCatalog,
} from "@/hooks/useSeasonCaddyData";

import {
  useAuth,
} from "@/hooks/useAuth";

const SESSION_REGION_KEY =
  "sportstream-region";

export const Route =
  createFileRoute(
    "/my-caddy/",
  )({
    component:
      MyCaddyOverview,
  });

function MyCaddyOverview() {
  const { user } =
    useAuth();

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
    preferencesLoaded,
    setPreferencesLoaded,
  ] = useState(false);

  const [
    savedServices,
    setSavedServices,
  ] = useState<
    string[]
  >([]);

  const [
    region,
    setRegion,
  ] = useState<string>(
    () => {
      if (
        typeof window !==
        "undefined"
      ) {
        return normalizeRegion(
          sessionStorage.getItem(
            SESSION_REGION_KEY,
          ) ??
            "United States",
        );
      }

      return "United States";
    },
  );

  const [
    fixtureNow,
    setFixtureNow,
  ] = useState(
    () => Date.now(),
  );

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setFixtureNow(
            Date.now(),
          );
        },
        30 * 1000,
      );

    return () => {
      window.clearInterval(
        timer,
      );
    };
  }, []);

  const {
    data: savedDataset,
  } = useSavedTeamsDataset(savedLeagues);

  const liveCompetitionGames =
    savedDataset?.games ?? [];

  const liveBroadcasts =
    savedDataset?.broadcasts ?? [];

  useEffect(() => {
    function syncRegion() {
      const sessionRegion =
        sessionStorage.getItem(
          SESSION_REGION_KEY,
        );

      if (
        !sessionRegion
      ) {
        return;
      }

      const normalizedRegion =
        normalizeRegion(
          sessionRegion,
        );

      setRegion(
        normalizedRegion,
      );

      sessionStorage.setItem(
        SESSION_REGION_KEY,
        normalizedRegion,
      );
    }

    syncRegion();

    window.addEventListener(
      "focus",
      syncRegion,
    );

    return () => {
      window.removeEventListener(
        "focus",
        syncRegion,
      );
    };
  }, []);

  useEffect(() => {
    let cancelled =
      false;

    async function loadUserData() {
      if (
        !user
      ) {
        if (
          !cancelled
        ) {
          setSavedLeagues(
            {},
          );

          setSavedServices(
            [],
          );

          setPreferencesLoaded(
            true,
          );
        }

        return;
      }

      try {
        const [
          prefs,
          services,
        ] =
          await Promise.all([
            fetchPreferences(),
            fetchServices(),
          ]);

        if (
          cancelled
        ) {
          return;
        }

        if (
          prefs
        ) {
          setSavedLeagues(
            prefs.saved_leagues ??
              {
                [prefs.league_id]:
                  prefs.teams,
              },
          );
        } else {
          setSavedLeagues(
            {},
          );
        }

        setSavedServices(
          services.map(
            (
              service,
            ) =>
              service.provider_id,
          ),
        );

        setPreferencesLoaded(
          true,
        );
      } catch (
        error
      ) {
        console.error(
          "Could not load My Caddy preferences",
          error,
        );

        if (
          !cancelled
        ) {
          setSavedLeagues(
            {},
          );

          setSavedServices(
            [],
          );

          setPreferencesLoaded(
            true,
          );
        }
      }
    }

    loadUserData();

    return () => {
      cancelled =
        true;
    };
  }, [
    user?.id,
  ]);

  const appGames =
    useMemo(
      () => liveCompetitionGames,
      [liveCompetitionGames],
    );

  const savedGames =
    useMemo(() => {
      /*
       * useSavedTeamsDataset is already scoped to the user's saved teams (or
       * an explicitly saved whole competition). Do not exact-match the saved
       * labels a second time here: that used to discard canonical/alias matches
       * that the shared frontend-data layer had already resolved correctly.
       */
      return appGames
        .filter(
          (game) =>
            isUpcomingOrLiveGame(
              game,
              fixtureNow,
            ),
        )
        .sort(
          sortGamesByDate,
        );
    }, [
      appGames,
      fixtureNow,
    ]);

  const nextSavedGame =
    savedGames[0] ??
    null;

    function regionalProviderIds(
      game: Game,
    ) {
      const broadcastRegion =
        normalizeRegion(
          region,
        );

      const competitionId = game.competitionId;

      const liveBroadcast =
        liveBroadcasts.find(
          (broadcast) => {
            const sameCompetition =
              competitionId
                ? broadcast.competitionId === competitionId
                : broadcast.league === game.league;

            const sameFixture =
              broadcast.fixtureId
                ? broadcast.fixtureId === game.id
                : broadcast.home === game.home &&
                  broadcast.away === game.away;

            return (
              sameCompetition &&
              broadcast.region === broadcastRegion &&
              sameFixture
            );
          },
        );

      if (
        liveBroadcast &&
        liveBroadcast.providerIds.length > 0
      ) {
        return Array.from(
          new Set(
            liveBroadcast.providerIds,
          ),
        );
      }

      return getProviderIdsForGame(
        game,
        broadcastRegion,
      );
    }

  const savedTeamCount =
    Object.values(
      savedLeagues,
    ).reduce(
      (
        total,
        leagueTeams,
      ) =>
        total +
        leagueTeams.length,
      0,
    );

  async function markSubscribed(
    providerId: string,
  ) {
    if (
      !user
    ) {
      toast.error(
        "Sign in to save your subscriptions",
      );

      return;
    }

    try {
      await upsertService(
        user.id,
        {
          provider_id:
            providerId,

          service_email:
            "",

          service_password:
            "",
        },
      );

      setSavedServices(
        (
          currentServices,
        ) =>
          currentServices.includes(
            providerId,
          )
            ? currentServices
            : [
                ...currentServices,
                providerId,
              ],
      );

      toast.success(
        "Subscription saved",
      );
    } catch (
      error
    ) {
      console.error(
        "Could not save subscription",
        error,
      );

      toast.error(
        "Could not save subscription",
      );
    }
  }

  async function markUnsubscribed(
    providerId: string,
  ) {
    try {
      await deleteService(
        providerId,
      );

      setSavedServices(
        (
          currentServices,
        ) =>
          currentServices.filter(
            (
              id,
            ) =>
              id !==
              providerId,
          ),
      );

      toast.success(
        "Subscription removed",
      );
    } catch (
      error
    ) {
      console.error(
        "Could not remove subscription",
        error,
      );

      toast.error(
        "Could not remove subscription",
      );
    }
  }

  return (
    <>
      <div
        style={{
          marginBottom:
            "26px",
        }}
      >
        <h1
          className="font-display font-extrabold tracking-tight"
          style={{
            fontSize:
              "32px",

            lineHeight:
              1.1,

            margin:
              0,
          }}
        >
          My Caddy
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
          Your teams. Your calendar. Smarter streaming.
        </p>
      </div>

      <div
        style={{
          marginBottom:
            "18px",
        }}
      >
        <NextFixtureHero
          game={
            nextSavedGame
          }
          region={
            region
          }
          getProviderIds={
            regionalProviderIds
          }
          emptyTitle="No upcoming fixtures"
          emptyText={
            !user
              ? "Sign in and save your teams to see your next fixture here."
              : savedTeamCount ===
                  0
                ? "Save your teams to see your next fixture here."
                : "There are currently no upcoming fixtures for your saved teams."
          }
        />
      </div>

      <div
        style={{
          display:
            "grid",

          gridTemplateColumns:
            "minmax(0, 1.7fr) minmax(300px, 0.9fr)",

          gap:
            "18px",

          alignItems:
            "start",
        }}
      >
        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap:
              "18px",
          }}
        >
          <NextGamesPanel
            games={
              savedGames
            }
            region={
              region
            }
            getProviderIds={
              regionalProviderIds
            }
            preferencesLoaded={
              preferencesLoaded
            }
            signedIn={
              Boolean(
                user,
              )
            }
            savedTeamCount={
              savedTeamCount
            }
          />
          <CompactCalendar
  games={savedGames}
  region={region}
/>
        </div>

        <div
          style={{
            display:
              "flex",

            flexDirection:
              "column",

            gap:
              "18px",
          }}
        >
          <StreamingCoveragePanel
            savedGames={
              savedGames
            }
            regionalProviderIds={
              regionalProviderIds
            }
            preferencesLoaded={
              preferencesLoaded
            }
            signedIn={
              Boolean(
                user,
              )
            }
            savedTeamCount={
              savedTeamCount
            }
            savedServices={
              savedServices
            }
            markSubscribed={
              markSubscribed
            }
            markUnsubscribed={
              markUnsubscribed
            }
          />

          <MyTeamsPanel
            savedLeagues={
              savedLeagues
            }
            preferencesLoaded={
              preferencesLoaded
            }
          />
        </div>
      </div>
    </>
  );
}

function StreamingCoveragePanel({
  savedGames,
  regionalProviderIds,
  preferencesLoaded,
  signedIn,
  savedTeamCount,
  savedServices,
  markSubscribed,
  markUnsubscribed,
}: {
  savedGames: Game[];

  regionalProviderIds: (
    game: Game,
  ) => string[];

  preferencesLoaded: boolean;
  signedIn: boolean;
  savedTeamCount: number;

  savedServices:
    string[];

  markSubscribed: (
    providerId: string,
  ) => Promise<void>;

  markUnsubscribed: (
    providerId: string,
  ) => Promise<void>;
}) {
  const coverage =
    savedGames.reduce(
      (
        result,
        game,
      ) => {
        const providerIds =
          regionalProviderIds(
            game,
          ).filter(
            (
              providerId,
            ) =>
              providerId !==
                "tbd" &&
              providerId !==
                "not-live-uk",
          );

        if (
          providerIds.length >
          0
        ) {
          result.coveredGames +=
            1;
        }

        for (
          const providerId of
          providerIds
        ) {
          result.providerCounts[
            providerId
          ] =
            (
              result
                .providerCounts[
                providerId
              ] ??
              0
            ) +
            1;
        }

        return result;
      },
      {
        coveredGames:
          0,

        providerCounts:
          {} as Record<
            string,
            number
          >,
      },
    );

  const providerRows =
    Object.entries(
      coverage.providerCounts,
    )
      .map(
        ([
          providerId,
          gameCount,
        ]) => ({
          provider:
            providerById(
              providerId,
            ),

          gameCount,
        }),
      )
      .sort(
        (
          a,
          b,
        ) =>
          b.gameCount -
          a.gameCount,
      );

  const coveragePercent =
    savedGames.length >
    0
      ? Math.round(
          (
            coverage.coveredGames /
            savedGames.length
          ) *
            100,
        )
      : 0;

  return (
    <div
      style={{
        minHeight:
          "300px",

        borderRadius:
          "12px",

        border:
          "1px solid var(--border)",

        background:
          "color-mix(in oklch, var(--surface-2) 60%, transparent)",

        overflow:
          "hidden",
      }}
    >
      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            "14px",

          padding:
            "18px",

          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <div>
          <h2
            style={{
              margin:
                0,

              fontSize:
                "18px",

              fontWeight:
                750,
            }}
          >
            Streaming Coverage
          </h2>

          <p
            className="text-muted-foreground"
            style={{
              marginTop:
                "4px",

              marginBottom:
                0,

              fontSize:
                "13px",
            }}
          >
            Where your upcoming games are available
          </p>
        </div>

        <Link
          to="/my-caddy/streaming"
          style={{
            flexShrink:
              0,

            fontSize:
              "12px",

            fontWeight:
              700,

            color:
              "var(--brand)",

            textDecoration:
              "none",
          }}
        >
          View details
        </Link>
      </div>

      {!preferencesLoaded ? (
        <CoverageMessage>
          Loading your coverage…
        </CoverageMessage>
      ) : !signedIn ? (
        <CoverageMessage>
          Sign in to see streaming coverage for your teams.
        </CoverageMessage>
      ) : savedTeamCount ===
        0 ? (
        <CoverageMessage>
          Save teams to see which services carry your upcoming games.
        </CoverageMessage>
      ) : savedGames.length ===
        0 ? (
        <CoverageMessage>
          No upcoming fixtures are currently available for your saved teams.
        </CoverageMessage>
      ) : (
        <div
          style={{
            padding:
              "16px 18px 18px",
          }}
        >
          <div
            style={{
              display:
                "flex",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              gap:
                "18px",

              paddingBottom:
                "16px",

              marginBottom:
                "14px",

              borderBottom:
                "1px solid var(--border)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize:
                    "28px",

                  lineHeight:
                    1,

                  fontWeight:
                    850,

                  color:
                    "var(--brand)",
                }}
              >
                {
                  coveragePercent
                }
                %
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
                Coverage known
              </div>
            </div>

            <div
              className="text-muted-foreground"
              style={{
                fontSize:
                  "12px",

                lineHeight:
                  1.5,

                textAlign:
                  "right",
              }}
            >
              <div>
                <strong
                  style={{
                    color:
                      "var(--foreground)",
                  }}
                >
                  {
                    coverage.coveredGames
                  }
                </strong>{" "}
                of{" "}
                <strong
                  style={{
                    color:
                      "var(--foreground)",
                  }}
                >
                  {
                    savedGames.length
                  }
                </strong>{" "}
                upcoming games
              </div>

              <div>
                have confirmed coverage
              </div>
            </div>
          </div>

          {providerRows.length >
          0 ? (
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
              {providerRows
                .slice(
                  0,
                  5,
                )
                .map(
                  ({
                    provider,
                    gameCount,
                  }) => {
                    const providerPercent =
                      savedGames.length >
                      0
                        ? Math.round(
                            (
                              gameCount /
                              savedGames.length
                            ) *
                              100,
                          )
                        : 0;

                    const subscribed =
                      savedServices.includes(
                        provider.id,
                      );

                    return (
                      <div
                        key={
                          provider.id
                        }
                        style={{
                          display:
                            "flex",

                          alignItems:
                            "center",

                          gap:
                            "11px",

                          padding:
                            "10px 11px",

                          borderRadius:
                            "9px",

                          border:
                            subscribed
                              ? "1px solid #10b981"
                              : "1px solid var(--border)",

                          background:
                            subscribed
                              ? "#10b981"
                              : "color-mix(in oklch, var(--background) 28%, transparent)",

                          color:
                            subscribed
                              ? "white"
                              : "var(--foreground)",

                          transition:
                            "background 160ms ease, border-color 160ms ease, color 160ms ease",
                        }}
                      >
                        <div
                          style={{
                            width:
                              "32px",

                            height:
                              "32px",

                            flexShrink:
                              0,

                            display:
                              "grid",

                            placeItems:
                              "center",

                            borderRadius:
                              "8px",

                            background:
                              subscribed
                                ? "rgba(255, 255, 255, 0.16)"
                                : "color-mix(in oklch, var(--brand) 12%, transparent)",

                            color:
                              subscribed
                                ? "white"
                                : "var(--brand)",

                            fontSize:
                              "12px",

                            fontWeight:
                              850,
                          }}
                        >
                          {provider.name
                            .charAt(
                              0,
                            )
                            .toUpperCase()}
                        </div>

                        <div
                          style={{
                            minWidth:
                              0,

                            flex:
                              1,
                          }}
                        >
                          <div
                            style={{
                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "space-between",

                              gap:
                                "10px",
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
                                  750,
                              }}
                            >
                              {
                                provider.name
                              }
                            </span>

                            <span
                              style={{
                                flexShrink:
                                  0,

                                color:
                                  subscribed
                                    ? "rgba(255, 255, 255, 0.9)"
                                    : "var(--muted-foreground)",

                                fontSize:
                                  "10px",

                                fontWeight:
                                  650,
                              }}
                            >
                              {gameCount ===
                              1
                                ? "1 game"
                                : `${gameCount} games`}
                            </span>
                          </div>

                          <div
                            style={{
                              height:
                                "4px",

                              marginTop:
                                "7px",

                              overflow:
                                "hidden",

                              borderRadius:
                                "999px",

                              background:
                                subscribed
                                  ? "rgba(255, 255, 255, 0.22)"
                                  : "color-mix(in oklch, var(--foreground) 8%, transparent)",
                            }}
                          >
                            <div
                              style={{
                                width:
                                  `${Math.max(
                                    providerPercent,
                                    4,
                                  )}%`,

                                maxWidth:
                                  "100%",

                                height:
                                  "100%",

                                borderRadius:
                                  "999px",

                                background:
                                  subscribed
                                    ? "white"
                                    : "var(--brand)",
                              }}
                            />
                          </div>

                          <div
                            style={{
                              display:
                                "flex",

                              alignItems:
                                "center",

                              justifyContent:
                                "space-between",

                              gap:
                                "12px",

                              marginTop:
                                "9px",
                            }}
                          >
                            {subscribed ? (
                              <>
                                <span
                                  style={{
                                    fontSize:
                                      "11px",

                                    fontWeight:
                                      750,

                                    color:
                                      "white",
                                  }}
                                >
                                  Subscribed
                                </span>

                                <button
                                  type="button"
                                  aria-label={`Remove ${provider.name} subscription`}
                                  title="Remove subscription"
                                  onClick={() =>
                                    markUnsubscribed(
                                      provider.id,
                                    )
                                  }
                                  style={{
                                    padding:
                                      0,

                                    border:
                                      "none",

                                    background:
                                      "transparent",

                                    color:
                                      "rgba(255, 255, 255, 0.82)",

                                    fontSize:
                                      "19px",

                                    fontWeight:
                                      800,

                                    lineHeight:
                                      1,

                                    cursor:
                                      "pointer",
                                  }}
                                >
                                  ×
                                </button>
                              </>
                            ) : (
                              <>
                                {provider.url ? (
                                  <a
                                    href={
                                      provider.url
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                      color:
                                        "var(--brand)",

                                      fontSize:
                                        "11px",

                                      fontWeight:
                                        750,

                                      textDecoration:
                                        "none",
                                    }}
                                  >
                                    Subscribe
                                  </a>
                                ) : (
                                  <span
                                    className="text-muted-foreground"
                                    style={{
                                      fontSize:
                                        "11px",
                                    }}
                                  >
                                    Subscription link unavailable
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() =>
                                    markSubscribed(
                                      provider.id,
                                    )
                                  }
                                  className="text-muted-foreground"
                                  style={{
                                    padding:
                                      0,

                                    border:
                                      "none",

                                    background:
                                      "transparent",

                                    fontSize:
                                      "11px",

                                    fontWeight:
                                      750,

                                    cursor:
                                      "pointer",
                                  }}
                                >
                                  Already subscribed?
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
            </div>
          ) : (
            <div
              className="text-muted-foreground"
              style={{
                padding:
                  "22px 8px",

                textAlign:
                  "center",

                fontSize:
                  "12px",

                lineHeight:
                  1.5,
              }}
            >
              Broadcast information is pending for these games.
            </div>
          )}

          {providerRows.length >
            5 && (
            <div
              className="text-muted-foreground"
              style={{
                marginTop:
                  "10px",

                textAlign:
                  "center",

                fontSize:
                  "10px",
              }}
            >
              +
              {providerRows.length -
                5}{" "}
              more services
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function CoverageMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="text-muted-foreground"
      style={{
        minHeight:
          "220px",

        display:
          "grid",

        placeItems:
          "center",

        padding:
          "24px",

        textAlign:
          "center",

        fontSize:
          "13px",

        lineHeight:
          1.5,
      }}
    >
      <div
        style={{
          maxWidth:
            "270px",
        }}
      >
        {
          children
        }
      </div>
    </div>
  );
}

function NextGamesPanel({
  games,
  region,
  getProviderIds,
  preferencesLoaded,
  signedIn,
  savedTeamCount,
}: {
  games: Game[];

  region: string;

  getProviderIds: (
    game: Game,
  ) => string[];

  preferencesLoaded: boolean;
  signedIn: boolean;
  savedTeamCount: number;
}) {
  return (
    <div
      style={{
        borderRadius:
          "12px",

        border:
          "1px solid var(--border)",

        background:
          "color-mix(in oklch, var(--surface-2) 60%, transparent)",

        overflow:
          "hidden",
      }}
    >
      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            "14px",

          padding:
            "18px",

          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <div>
          <h2
            style={{
              margin:
                0,

              fontSize:
                "18px",

              fontWeight:
                750,
            }}
          >
            Next Games
          </h2>

          <p
            className="text-muted-foreground"
            style={{
              marginTop:
                "4px",

              marginBottom:
                0,

              fontSize:
                "13px",
            }}
          >
            Your live and upcoming fixtures
          </p>
        </div>

        <Link
          to="/my-caddy/calendar"
          style={{
            fontSize:
              "12px",

            fontWeight:
              700,

            color:
              "var(--brand)",

            textDecoration:
              "none",
          }}
        >
          View calendar
        </Link>
      </div>

      {!preferencesLoaded ? (
        <NextGamesMessage>
          Loading your fixtures…
        </NextGamesMessage>
      ) : !signedIn ? (
        <NextGamesMessage>
          Sign in to build your personal SeasonCaddy schedule.
        </NextGamesMessage>
      ) : savedTeamCount ===
        0 ? (
        <NextGamesMessage>
          Save a team from the Home page and its upcoming games will appear here.
        </NextGamesMessage>
      ) : games.length ===
        0 ? (
        <NextGamesMessage>
          No upcoming fixtures are currently available for your saved teams.
        </NextGamesMessage>
      ) : (
        <div>
          {games
            .slice(
              0,
              5,
            )
            .map(
              (
                game,
                index,
              ) => (
                <NextGameRow
                  key={
                    game.id
                  }
                  game={
                    game
                  }
                  region={
                    region
                  }
                  getProviderIds={
                    getProviderIds
                  }
                  last={
                    index ===
                    Math.min(
                      games.length,
                      5,
                    ) -
                      1
                  }
                />
              ),
            )}
        </div>
      )}
    </div>
  );
}

function NextGameRow({
  game,
  region,
  getProviderIds,
  last,
}: {
  game: Game;

  region: string;

  getProviderIds: (
    game: Game,
  ) => string[];

  last: boolean;
}) {
  const providerIds =
    getProviderIds(
      game,
    );

  const realProviderIds =
    providerIds.filter(
      (
        providerId,
      ) =>
        providerId !==
          "tbd" &&
        providerId !==
          "not-live-uk",
    );

  const providers =
    realProviderIds
      .map(
        (
          providerId,
        ) =>
          providerById(
            providerId,
          ),
      )
      .filter(
        Boolean,
      );

  const broadcastPending =
    providerIds.includes(
      "tbd",
    );

  const dateText =
    formatGameDateForRegion(
      game,
      region,
    );

  const liveNow =
    isGameLive(
      game,
    );

  const timeText =
    liveNow
      ? "LIVE NOW"
      : formatRegionalTime(
          game.kickoff,
          region,
        );

  return (
    <div
      style={{
        display:
          "grid",

        gridTemplateColumns:
          "130px minmax(0, 1fr) minmax(115px, auto) auto",

        gap:
          "14px",

        alignItems:
          "center",

        padding:
          "15px 18px",

        borderBottom:
          last
            ? "none"
            : "1px solid var(--border)",
      }}
    >
      <div>
        <div
          style={{
            fontSize:
              "12px",

            fontWeight:
              750,
          }}
        >
          {
            dateText
          }
        </div>

        <div
          className="text-muted-foreground"
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "4px",

            marginTop:
              "4px",

            fontSize:
              "11px",

            whiteSpace:
              "nowrap",
          }}
        >
          <Clock3
            size={
              11
            }
            style={{
              flexShrink:
                0,

              color:
                liveNow
                  ? "var(--brand)"
                  : undefined,
            }}
          />

          <span
            style={{
              color:
                liveNow
                  ? "var(--brand)"
                  : undefined,

              fontWeight:
                liveNow
                  ? 800
                  : undefined,
            }}
          >
            {
              timeText
            }
          </span>
        </div>
      </div>

      <div
        style={{
          minWidth:
            0,
        }}
      >
        <div
          style={{
            fontSize:
              "14px",

            fontWeight:
              750,

            overflow:
              "hidden",

            textOverflow:
              "ellipsis",
          }}
        >
          {
            game.home
          }

          <span
            className="text-muted-foreground"
            style={{
              margin:
                "0 6px",

              fontWeight:
                500,
            }}
          >
            vs
          </span>

          {
            game.away
          }
        </div>

        <div
          className="text-muted-foreground"
          style={{
            marginTop:
              "4px",

            fontSize:
              "11px",
          }}
        >
          {
            game.league
          }
        </div>
      </div>

      <div
        style={{
          minWidth:
            0,

          display:
            "flex",

          alignItems:
            "center",

          gap:
            "6px",
        }}
      >
        <Tv
          size={
            13
          }
          style={{
            color:
              "var(--brand)",

            flexShrink:
              0,
          }}
        />

        <span
          style={{
            color:
              providers.length >
              0
                ? "var(--foreground)"
                : "var(--muted-foreground)",

            fontSize:
              "11px",

            fontWeight:
              650,

            whiteSpace:
              "nowrap",

            overflow:
              "hidden",

            textOverflow:
              "ellipsis",
          }}
        >
          {providers.length >
          0
            ? providers
                .map(
                  (
                    provider,
                  ) =>
                    provider?.name,
                )
                .filter(
                  Boolean,
                )
                .join(
                  ", ",
                )
            : broadcastPending
              ? "Provider pending"
              : "TBD"}
        </span>
      </div>

      <Link
        to="/game/$gameId"
        params={{
          gameId:
            game.id,
        }}
        search={{
          region,
        }}
        style={{
          minHeight:
            "31px",

          display:
            "inline-flex",

          alignItems:
            "center",

          justifyContent:
            "center",

          padding:
            "0 12px",

          borderRadius:
            "8px",

          border:
            "1px solid var(--border)",

          background:
            "color-mix(in oklch, var(--surface-2) 75%, transparent)",

          color:
            "var(--foreground)",

          fontSize:
            "11px",

          fontWeight:
            750,

          textDecoration:
            "none",

          whiteSpace:
            "nowrap",

          transition:
            "border-color 160ms ease, background 160ms ease, color 160ms ease",
        }}
      >
        View watch options
      </Link>
    </div>
  );
}

function NextGamesMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="text-muted-foreground"
      style={{
        minHeight:
          "160px",

        display:
          "grid",

        placeItems:
          "center",

        padding:
          "28px",

        textAlign:
          "center",

        fontSize:
          "13px",

        lineHeight:
          1.55,
      }}
    >
      <div
        style={{
          maxWidth:
            "360px",
        }}
      >
        {
          children
        }
      </div>
    </div>
  );
}

function MyTeamsPanel({
  savedLeagues,
  preferencesLoaded,
}: {
  savedLeagues: Record<
    string,
    string[]
  >;

  preferencesLoaded: boolean;
}) {
  const {
    data: frontendCatalog = [],
  } = useFrontendCatalog();

  const followedCompetitionIds =
    useMemo(
      () =>
        Object.entries(savedLeagues)
          .filter(([, teams]) => teams.length > 0)
          .map(([competitionId]) => competitionId)
          .sort(),
      [savedLeagues],
    );

  const {
    data: competitionIdentityCatalog = [],
  } = useCompetitionIdentityCatalog(followedCompetitionIds);

  const competitionIdentityById =
    useMemo(
      () =>
        new Map(
          competitionIdentityCatalog.map((competition) => [
            competition.competitionId,
            competition,
          ]),
        ),
      [competitionIdentityCatalog],
    );

  const followedLeagues =
    useMemo(() => {
      const competitionById =
        new Map(
          frontendCatalog.map(
            (competition) => [
              competition.competitionId,
              competition,
            ],
          ),
        );

      return Object.entries(
        savedLeagues,
      )
        .filter(
          ([, teams]) =>
            teams.length > 0,
        )
        .map(
          ([competitionId, teams]) => {
            const competition =
              competitionById.get(
                competitionId,
              );

            const identityCompetition =
              competitionIdentityById.get(competitionId);

            const availableTeams =
              identityCompetition
                ? catalogDisplayTeamNames(identityCompetition)
                : [];

            const competitionSaved =
              availableTeams.length >
                0 &&
              availableTeams.every(
                (team) =>
                  teams.includes(
                    team,
                  ),
              );

            return {
              league: {
                id: competitionId,
                name:
                  competition?.competitionName ??
                  competitionId
                    .split("-")
                    .map(
                      (part) =>
                        part.length > 0
                          ? part[0].toUpperCase() +
                            part.slice(1)
                          : part,
                    )
                    .join(" "),
              },
              teams,
              competitionSaved,
            };
          },
        )
        .sort((a, b) =>
          a.league.name.localeCompare(
            b.league.name,
          ),
        );
    }, [
      frontendCatalog,
      competitionIdentityById,
      savedLeagues,
    ]);

  const totalTeams =
    followedLeagues.reduce(
      (
        total,
        item,
      ) =>
        total +
        item.teams.length,
      0,
    );

  return (
    <div
      style={{
        minHeight:
          "300px",

        borderRadius:
          "12px",

        border:
          "1px solid var(--border)",

        background:
          "color-mix(in oklch, var(--surface-2) 60%, transparent)",

        overflow:
          "hidden",
      }}
    >
      <div
        style={{
          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          gap:
            "14px",

          padding:
            "18px",

          borderBottom:
            "1px solid var(--border)",
        }}
      >
        <div>
          <h2
            style={{
              margin:
                0,

              fontSize:
                "18px",

              fontWeight:
                750,
            }}
          >
            My Teams & Leagues
          </h2>

          <p
            className="text-muted-foreground"
            style={{
              marginTop:
                "4px",

              marginBottom:
                0,

              fontSize:
                "13px",
            }}
          >
            Your followed teams and competitions
          </p>
        </div>

        <Link
          to="/my-caddy/teams"
          style={{
            fontSize:
              "12px",

            fontWeight:
              700,

            color:
              "var(--brand)",

            textDecoration:
              "none",
          }}
        >
          Manage
        </Link>
      </div>

      {!preferencesLoaded ? (
        <div
          className="text-muted-foreground"
          style={{
            minHeight:
              "220px",

            display:
              "grid",

            placeItems:
              "center",

            padding:
              "24px",

            fontSize:
              "13px",
          }}
        >
          Loading your teams…
        </div>
      ) : totalTeams ===
        0 ? (
        <div
          className="text-muted-foreground"
          style={{
            minHeight:
              "220px",

            display:
              "grid",

            placeItems:
              "center",

            padding:
              "24px",

            textAlign:
              "center",

            fontSize:
              "13px",

            lineHeight:
              1.5,
          }}
        >
          <div
            style={{
              maxWidth:
                "260px",
            }}
          >
            You haven't saved any teams yet. Add teams from the Home page and they'll appear here.
          </div>
        </div>
      ) : (
        <div
          style={{
            padding:
              "14px 18px 18px",
          }}
        >
          {followedLeagues.map(
            ({
              league,
              teams,
              competitionSaved,
            }) => (
              <div
                key={
                  league.id
                }
                style={{
                  marginBottom:
                    "16px",
                }}
              >
                {competitionSaved ? (
                  <div
                    style={{
                      display:
                        "flex",

                      flexWrap:
                        "wrap",

                      gap:
                        "7px",
                    }}
                  >
                    <div
                      style={{
                        padding:
                          "7px 10px",

                        borderRadius:
                          "8px",

                        border:
                          "1px solid color-mix(in oklch, var(--brand) 22%, var(--border))",

                        background:
                          "color-mix(in oklch, var(--brand) 10%, transparent)",

                        color:
                          "var(--foreground)",

                        fontSize:
                          "12px",

                        fontWeight:
                          700,
                      }}
                    >
                      {
                        league.name
                      }
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="text-muted-foreground"
                      style={{
                        marginBottom:
                          "8px",

                        fontSize:
                          "11px",

                        fontWeight:
                          750,

                        textTransform:
                          "uppercase",

                        letterSpacing:
                          "0.05em",
                      }}
                    >
                      {
                        league.name
                      }
                    </div>

                    <div
                      style={{
                        display:
                          "flex",

                        flexWrap:
                          "wrap",

                        gap:
                          "7px",
                      }}
                    >
                      {teams.map(
                        (
                          team,
                        ) => (
                          <div
                            key={
                              team
                            }
                            style={{
                              padding:
                                "7px 10px",

                              borderRadius:
                                "8px",

                              border:
                                "1px solid color-mix(in oklch, var(--brand) 22%, var(--border))",

                              background:
                                "color-mix(in oklch, var(--brand) 10%, transparent)",

                              color:
                                "var(--foreground)",

                              fontSize:
                                "12px",

                              fontWeight:
                                700,
                            }}
                          >
                            {
                              team
                            }
                          </div>
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function normalizeRegion(
  region: string,
) {
  if (
    region.startsWith(
      "United States",
    )
  ) {
    return "United States";
  }

  if (
    region ===
    "United Kingdom"
  ) {
    return "United Kingdom";
  }

  if (
    region ===
    "Canada"
  ) {
    return "Canada";
  }

  return "United States";
}

function timeZoneForOverviewRegion(
  region: string,
) {
  const normalizedRegion =
    normalizeRegion(
      region,
    );

  if (
    normalizedRegion ===
      "United States" ||
    normalizedRegion ===
      "Canada"
  ) {
    return "America/New_York";
  }

  return timeZoneForRegion(
    normalizedRegion,
  );
}

function gameDate(
  game: Game,
) {
  if (
    game.kickoff
  ) {
    const date =
      new Date(
        game.kickoff,
      );

    if (
      !Number.isNaN(
        date.getTime(),
      )
    ) {
      return date;
    }
  }

  if (
    game.scheduledDate
  ) {
    const date =
      new Date(
        `${game.scheduledDate}T12:00:00`,
      );

    if (
      !Number.isNaN(
        date.getTime(),
      )
    ) {
      return date;
    }
  }

  return null;
}

function formatGameDateForRegion(
  game: Game,
  region: string,
) {
  if (
    !game.kickoff &&
    game.scheduledDate
  ) {
    const [
      year,
      month,
      day,
    ] =
      game.scheduledDate
        .split("-")
        .map(Number);

    if (
      year &&
      month &&
      day
    ) {
      return new Date(
        year,
        month -
          1,
        day,
      ).toLocaleDateString(
        "en-US",
        {
          weekday:
            "short",

          month:
            "short",

          day:
            "numeric",
        },
      );
    }
  }

  if (
    game.kickoff
  ) {
    const date =
      new Date(
        game.kickoff,
      );

    if (
      !Number.isNaN(
        date.getTime(),
      )
    ) {
      return date.toLocaleDateString(
        "en-US",
        {
          weekday:
            "short",

          month:
            "short",

          day:
            "numeric",

          timeZone:
            timeZoneForOverviewRegion(
              region,
            ),
        },
      );
    }
  }

  return (
    game.scheduleLabel ??
    "Date TBD"
  );
}

function sortGamesByDate(
  a: Game,
  b: Game,
) {
  const aDate =
    gameDate(
      a,
    );

  const bDate =
    gameDate(
      b,
    );

  if (
    !aDate &&
    !bDate
  ) {
    return 0;
  }

  if (
    !aDate
  ) {
    return 1;
  }

  if (
    !bDate
  ) {
    return -1;
  }

  return (
    aDate.getTime() -
    bDate.getTime()
  );
}
