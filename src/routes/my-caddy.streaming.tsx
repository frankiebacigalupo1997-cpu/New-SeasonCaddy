import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import type {
  ReactNode,
} from "react";

import {
  CheckCircle2,
  ChevronLeft,
  Layers3,
  Loader2,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import {
  deleteService,
  fetchPreferences,
  fetchServices,
  upsertService,
} from "@/lib/gamehub-cloud";

import {
  providerById,
  type Game,
} from "@/lib/gamehub-data";

import {
  useSavedTeamsDataset,
} from "@/hooks/useSeasonCaddyData";

import {
  useAuth,
} from "@/hooks/useAuth";

const SESSION_REGION_KEY =
  "sportstream-region";

export const Route =
  createFileRoute(
    "/my-caddy/streaming",
  )({
    component:
      StreamingPage,
  });

function StreamingPage() {
  const { user } =
    useAuth();

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
    preferencesLoaded,
    setPreferencesLoaded,
  ] = useState(false);

  /* ==================================================== */
  /* SAVED STREAMING SERVICES                             */
  /* ==================================================== */

  const [
    savedServices,
    setSavedServices,
  ] = useState<
    string[]
  >([]);

  /* ==================================================== */
  /* REGION                                               */
  /* ==================================================== */

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

  /* ==================================================== */
  /* SHARED LIVE DATA                                     */
  /* ==================================================== */

  const {
    data: savedDataset,
  } = useSavedTeamsDataset(savedLeagues);

  const liveCompetitionGames = savedDataset?.games ?? [];
  const liveBroadcasts = savedDataset?.broadcasts ?? [];

  /* ==================================================== */
  /* KEEP REGION SYNCED                                   */
  /* ==================================================== */

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

  /* ==================================================== */
  /* LOAD PREFERENCES + SUBSCRIPTIONS                     */
  /* ==================================================== */

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
          "Could not load streaming preferences",
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

  /* ==================================================== */
  /* FIXTURE DATASET                                      */
  /* ==================================================== */

  const appGames =
    useMemo(
      () => liveCompetitionGames,
      [liveCompetitionGames],
    );

  /* ==================================================== */
  /* SAVED FIXTURES                                       */
  /* ==================================================== */

  const savedGames =
    useMemo(() => {
      return appGames
        .filter(
          (
            game,
          ) => {
            const competitionId = game.competitionId;

            if (!competitionId) {
              return false;
            }

            const savedTeams = savedLeagues[competitionId] ?? [];

            return [
              game.home,
              game.away,
              game.canonicalHome,
              game.canonicalAway,
            ].some((teamName) =>
              Boolean(teamName && savedTeams.includes(teamName)),
            );
          },
        )
        .filter(
          isUpcomingGame,
        )
        .sort(
          sortGamesByDate,
        );
    }, [
      appGames,
      savedLeagues,
    ]);

  /* ==================================================== */
  /* REGIONAL PROVIDERS                                   */
  /* ==================================================== */

  function regionalProviderIds(
    game: Game,
  ) {
    const broadcastRegion = normalizeRegion(region);

    const liveBroadcast =
      liveBroadcasts.find(
        (broadcast) => {
          const sameCompetition =
            game.competitionId
              ? broadcast.competitionId === game.competitionId
              : broadcast.league === game.league;

          const sameFixture =
            broadcast.fixtureId
              ? broadcast.fixtureId === game.id
              : broadcast.home === game.home &&
                broadcast.away === game.away;

          return (
            sameCompetition &&
            sameFixture &&
            broadcast.region === broadcastRegion
          );
        },
      );

    return liveBroadcast?.providerIds?.length
      ? Array.from(new Set(liveBroadcast.providerIds))
      : ["tbd"];
  }

  /* ==================================================== */
  /* SAVED TEAM COUNT                                     */
  /* ==================================================== */

  const savedTeamCount =
    Object.values(
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

  /* ==================================================== */
  /* FIXTURE COVERAGE MAP                                 */
  /* ==================================================== */

  const fixtureCoverage =
    useMemo(() => {
      return savedGames.map(
        (
          game,
        ) => {
          const allProviderIds =
            regionalProviderIds(
              game,
            );

          const confirmedProviderIds =
            Array.from(
              new Set(
                allProviderIds.filter(
                  (
                    providerId,
                  ) =>
                    providerId !==
                      "tbd" &&
                    providerId !==
                      "not-live-uk",
                ),
              ),
            );

          const notLive =
            allProviderIds.includes(
              "not-live-uk",
            );

          return {
            game,
            confirmedProviderIds,
            notLive,
          };
        },
      );
    }, [
      savedGames,
      region,
      liveBroadcasts,
    ]);

  /* ==================================================== */
  /* COVERAGE GROUPS                                      */
  /* ==================================================== */

  const knownCoverageGames =
    fixtureCoverage.filter(
      (
        item,
      ) =>
        item
          .confirmedProviderIds
          .length >
        0,
    );

  /* ==================================================== */
  /* PROVIDER BREAKDOWN                                   */
  /* ==================================================== */

  const providerRows =
    useMemo(() => {
      const counts: Record<
        string,
        number
      > = {};

      for (
        const item of
        fixtureCoverage
      ) {
        for (
          const providerId of
          item.confirmedProviderIds
        ) {
          counts[
            providerId
          ] =
            (
              counts[
                providerId
              ] ??
              0
            ) +
            1;
        }
      }

      return Object.entries(
        counts,
      )
        .map(
          ([
            providerId,
            gameCount,
          ]) => ({
            providerId,

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
    }, [
      fixtureCoverage,
    ]);

  /* ==================================================== */
  /* BEST PROVIDER COMBINATION                            */
  /* ==================================================== */

  const bestCombination =
    useMemo(() => {
      const providerIds =
        providerRows.map(
          (
            item,
          ) =>
            item.providerId,
        );

      if (
        providerIds.length ===
        0
      ) {
        return null;
      }

      const maxCombinationSize =
        Math.min(
          4,
          providerIds.length,
        );

      let best:
        | {
            providerIds: string[];
            coveredGames: number;
          }
        | null = null;

      for (
        let size =
          1;
        size <=
        maxCombinationSize;
        size++
      ) {
        const combinations =
          getCombinations(
            providerIds,
            size,
          );

        for (
          const combination of
          combinations
        ) {
          const selected =
            new Set(
              combination,
            );

          const coveredGames =
            fixtureCoverage.filter(
              (
                item,
              ) =>
                item.confirmedProviderIds.some(
                  (
                    providerId,
                  ) =>
                    selected.has(
                      providerId,
                    ),
                ),
            ).length;

          if (
            !best ||
            coveredGames >
              best.coveredGames ||
            (
              coveredGames ===
                best.coveredGames &&
              combination.length <
                best.providerIds
                  .length
            )
          ) {
            best = {
              providerIds:
                combination,

              coveredGames,
            };
          }
        }

        /*
         * Once every fixture with known coverage
         * can be watched using the current size,
         * larger combinations cannot improve it.
         */
        if (
          best &&
          best.coveredGames ===
            knownCoverageGames.length
        ) {
          break;
        }
      }

      return best;
    }, [
      providerRows,
      fixtureCoverage,
      knownCoverageGames.length,
    ]);

  const bestCombinationPercent =
    knownCoverageGames.length >
      0 &&
    bestCombination
      ? Math.round(
          (
            bestCombination.coveredGames /
            knownCoverageGames.length
          ) *
            100,
        )
      : 0;

  /* ==================================================== */
  /* SERVICES YOU NEED                                    */
  /* ==================================================== */

  const neededProviders =
    useMemo(() => {
      const providerIds =
        fixtureCoverage.flatMap(
          (
            item,
          ) =>
            item.confirmedProviderIds,
        );

      return [
        ...new Set(
          providerIds,
        ),
      ].map(
        (
          providerId,
        ) =>
          providerById(
            providerId,
          ),
      );
    }, [
      fixtureCoverage,
    ]);

  const subscribedProviders =
    neededProviders.filter(
      (
        provider,
      ) =>
        savedServices.includes(
          provider.id,
        ),
    );

  const unsubscribedProviders =
    neededProviders.filter(
      (
        provider,
      ) =>
        !savedServices.includes(
          provider.id,
        ),
    );

  const readyCount =
    subscribedProviders.length;

  /* ==================================================== */
  /* SUBSCRIPTION ACTIONS                                 */
  /* ==================================================== */

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

  /* ==================================================== */
  /* PAGE STATES                                          */
  /* ==================================================== */

  if (
    !preferencesLoaded
  ) {
    return (
      <div>
        <PageHeading />

        <LargeMessage>
          <Loader2
            size={
              18
            }
            className="animate-spin"
          />

          Loading your streaming coverage…
        </LargeMessage>
      </div>
    );
  }

  if (
    !user
  ) {
    return (
      <div>
        <PageHeading />

        <LargeMessage>
          Sign in to analyze streaming coverage for your teams.
        </LargeMessage>
      </div>
    );
  }

  if (
    savedTeamCount ===
    0
  ) {
    return (
      <div>
        <PageHeading />

        <LargeMessage>
          Save some teams first, then SeasonCaddy can analyze which services cover their games.
        </LargeMessage>
      </div>
    );
  }

  return (
    <div className="streaming-page-content">
      <PageHeading />

      {/* ================================================= */}
      {/* RESPONSIVE GRID                                   */}
      {/* ================================================= */}

      <div className="streaming-page-grid">

        {/* ================================================= */}
        {/* SERVICES FOR YOUR TEAMS                           */}
        {/* ================================================= */}

        <div className="streaming-page-services-column">
          <ServicesYouNeedPanel
            neededProviders={
              neededProviders
            }
            subscribedProviders={
              subscribedProviders
            }
            unsubscribedProviders={
              unsubscribedProviders
            }
            readyCount={
              readyCount
            }
            markSubscribed={
              markSubscribed
            }
            markUnsubscribed={
              markUnsubscribed
            }
          />
        </div>

        {/* ================================================= */}
        {/* SERVICE BREAKDOWN                                 */}
        {/* ================================================= */}

        <section
          className="streaming-service-breakdown"
          style={
            panelStyle
          }
        >
          <PanelHeader
            icon={
              <Layers3
                size={
                  18
                }
              />
            }
            title="Service Breakdown"
            subtitle="What percentage of your saved team's announced games each service can cover"
          />

          <div
            style={{
              padding:
                "8px 18px 18px",
            }}
          >
            {providerRows.length >
            0 ? (
              providerRows.map(
                (
                  item,
                  index,
                ) => {
                  const percent =
                    knownCoverageGames.length >
                    0
                      ? Math.round(
                          (
                            item.gameCount /
                            knownCoverageGames.length
                          ) *
                            100,
                        )
                      : 0;
                      const subscribed =
  savedServices.includes(
    item.providerId,
  );

                  return (
                    <div
  key={
    item.providerId
  }
  style={{
    display:
      "grid",

    gridTemplateColumns:
      "42px minmax(0, 1fr) auto",

    gap:
      "12px",

    alignItems:
      "center",

    margin:
      "6px 0",

    padding:
      "12px 10px",

    borderRadius:
      "10px",

    border:
      subscribed
        ? "1px solid #10b981"
        : "1px solid transparent",

    background:
      subscribed
        ? "#10b981"
        : "transparent",

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
                            "38px",

                          height:
                            "38px",

                          display:
                            "grid",

                          placeItems:
                            "center",

                          borderRadius:
                            "9px",

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
                        {item.provider.name
                          .charAt(
                            0,
                          )
                          .toUpperCase()}
                      </div>

                      <div
                        style={{
                          minWidth:
                            0,
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
                              "12px",
                          }}
                        >
                          <span
                            style={{
                              fontSize:
                                "13px",

                              fontWeight:
                                750,
                            }}
                          >
                            {
                              item.provider.name
                            }
                          </span>

                          <span
                            style={{
                              color:
                                subscribed
                                  ? "rgba(255, 255, 255, 0.9)"
                                  : "var(--muted-foreground)",
                            
                              fontSize:
                                "10px",
                            }}
                          >
                            {
                              percent
                            }
                            %
                          </span>
                        </div>

                        <div
                          style={{
                            height:
                              "5px",

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
                                  percent,
                                  3,
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
                      </div>

                      <div
                        style={{
                          textAlign:
                            "right",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "13px",

                            fontWeight:
                              800,
                          }}
                        >
                          {
                            item.gameCount
                          }
                        </div>

                        <div
  style={{
    marginTop:
      "2px",

    color:
      subscribed
        ? "rgba(255, 255, 255, 0.9)"
        : "var(--muted-foreground)",

    fontSize:
      "9px",
  }}
>
                          {item.gameCount ===
                          1
                            ? "game"
                            : "games"}
                        </div>
                      </div>
                    </div>
                  );
                },
              )
            ) : (
              <InlineMessage>
                No confirmed service data is available yet.
              </InlineMessage>
            )}
          </div>
        </section>

        {/* ================================================= */}
        {/* BEST COVERAGE COMBINATION                         */}
        {/* ================================================= */}

        <section
          className="streaming-best-coverage"
          style={
            panelStyle
          }
        >
          <PanelHeader
            icon={
              <Sparkles
                size={
                  18
                }
              />
            }
            title="Best Coverage Combination"
            subtitle="The smallest service combination that maximizes your confirmed coverage"
          />

          <div
            style={{
              padding:
                "18px",
            }}
          >
            {bestCombination ? (
              <>
                <div
                  className="streaming-best-coverage-summary"
                >
                  <div>
                    <div
                      style={{
                        fontSize:
                          "32px",

                        lineHeight:
                          1,

                        fontWeight:
                          850,

                        color:
                          "var(--brand)",
                      }}
                    >
                      {
                        bestCombinationPercent
                      }
                      %
                    </div>

                    <div
                      className="text-muted-foreground"
                      style={{
                        marginTop:
                          "6px",

                        fontSize:
                          "12px",
                      }}
                    >
                      of games with announced coverage
                    </div>
                  </div>

                  <div className="streaming-best-coverage-meta">
                    <div
                      style={{
                        fontSize:
                          "14px",

                        fontWeight:
                          800,
                      }}
                    >
                      {
                        bestCombination.coveredGames
                      }{" "}
                      {bestCombination.coveredGames ===
                      1
                        ? "game"
                        : "games"}
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
                      using{" "}
                      {
                        bestCombination
                          .providerIds
                          .length
                      }{" "}
                      {bestCombination
                        .providerIds
                        .length ===
                      1
                        ? "provider"
                        : "providers"}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    display:
                      "flex",

                    flexWrap:
                      "wrap",

                    gap:
                      "9px",
                  }}
                >
                  {bestCombination
                    .providerIds
                    .map(
                      (
                        providerId,
                      ) => {
                        const provider =
                          providerById(
                            providerId,
                          );

                        return (
                          <div
                            key={
                              providerId
                            }
                            style={{
                              display:
                                "flex",

                              alignItems:
                                "center",

                              gap:
                                "8px",

                              padding:
                                "10px 12px",

                              borderRadius:
                                "9px",

                              border:
                                "1px solid color-mix(in oklch, var(--brand) 30%, var(--border))",

                              background:
                                "color-mix(in oklch, var(--brand) 10%, transparent)",

                              fontSize:
                                "12px",

                              fontWeight:
                                750,
                            }}
                          >
                            <CheckCircle2
                              size={
                                15
                              }
                              style={{
                                color:
                                  "var(--brand)",
                              }}
                            />

                            {
                              provider.name
                            }
                          </div>
                        );
                      },
                    )}
                </div>

                <div
                  className="text-muted-foreground"
                  style={{
                    marginTop:
                      "16px",

                    fontSize:
                      "11px",

                    lineHeight:
                      1.55,
                  }}
                >
                  Each fixture is counted once even when multiple services carry the same game.
                </div>
              </>
            ) : (
              <InlineMessage>
                No confirmed providers are currently available for your upcoming games.
              </InlineMessage>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}

/* ====================================================== */
/* SERVICES YOU NEED                                      */
/* ====================================================== */

function ServicesYouNeedPanel({
  neededProviders,
  subscribedProviders,
  unsubscribedProviders,
  readyCount,
  markSubscribed,
  markUnsubscribed,
}: {
  neededProviders: ReturnType<
    typeof providerById
  >[];

  subscribedProviders: ReturnType<
    typeof providerById
  >[];

  unsubscribedProviders: ReturnType<
    typeof providerById
  >[];

  readyCount: number;

  markSubscribed: (
    providerId: string,
  ) => Promise<void>;

  markUnsubscribed: (
    providerId: string,
  ) => Promise<void>;
}) {
  return (
    <div
      className="panel h-fit space-y-4 p-6"
    >
      <div>
        <p className="eyebrow">
          Your streaming setup
        </p>

        <h3 className="mt-1 text-xl font-extrabold">
          Services for your teams
        </h3>
      </div>

      <p className="text-sm text-muted-foreground">
        {neededProviders.length}{" "}
        service
        {neededProviders.length ===
        1
          ? ""
          : "s"}{" "}
        cover your saved teams.
      </p>

      {/* SUBSCRIBED */}

      <div className="space-y-3 border-t border-border/60 pt-4">
        <p className="text-xs font-bold tracking-wide text-muted-foreground">
          Subscribed
        </p>

        {subscribedProviders.length ===
        0 ? (
          <p className="text-sm text-muted-foreground">
            No matching subscriptions saved yet.
          </p>
        ) : (
          <div className="space-y-2">
            {subscribedProviders.map(
              (
                provider,
              ) => (
                <div
                  key={
                    provider.id
                  }
                  className="flex items-center justify-between rounded-md border border-emerald-500 bg-emerald-500 px-3 py-2 text-white"
                >
                  <span className="text-sm font-semibold">
                    {
                      provider.name
                    }
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
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
                      className="flex -translate-y-px cursor-pointer items-center justify-center text-2xl font-bold leading-none text-white/80 transition-colors hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {/* SERVICES REQUIRED */}

      <div className="space-y-3 border-t border-border/60 pt-4">
        <p className="text-xs font-bold tracking-wide text-muted-foreground">
          Services for your games
        </p>

        {neededProviders.length ===
        0 ? (
          <p className="text-sm text-muted-foreground">
            No confirmed services are currently required for your upcoming games.
          </p>
        ) : unsubscribedProviders.length ===
        0 ? (
          <p className="text-sm text-muted-foreground">
            You're subscribed to all services needed for your saved teams.
          </p>
        ) : (
          unsubscribedProviders.map(
            (
              provider,
            ) => (
              <div
                key={
                  provider.id
                }
                className="space-y-2 border-b border-border/40 pb-3 last:border-b-0 last:pb-0"
              >
                <p className="text-sm font-semibold">
                  {
                    provider.name
                  }
                </p>

                <div className="streaming-subscription-actions">
                  {provider.url ? (
                    <a
                      href={
                        provider.url
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="cursor-pointer text-xs font-bold text-brand hover:underline"
                    >
                      Subscribe
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">
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
                    className="cursor-pointer text-xs font-bold text-muted-foreground transition-colors hover:text-brand hover:underline"
                  >
                    Already subscribed?
                  </button>
                </div>
              </div>
            ),
          )
        )}
      </div>

      {/* READY STATUS */}

      <div
        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-bold transition-colors ${
          neededProviders.length >
            0 &&
          readyCount ===
            neededProviders.length
            ? "border-emerald-500 bg-emerald-500 text-white"
            : "border-brand/40 bg-brand/10 text-brand"
        }`}
      >
        <Sparkles className="size-4" />

        {readyCount}{" "}
        of{" "}
        {
          neededProviders.length
        }{" "}
        subscribed
      </div>
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
        Streaming & Coverage
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
        See which services carry your games and what you need to watch them.
      </p>
    </div>
  );
}

/* ====================================================== */
/* PANEL HEADER                                           */
/* ====================================================== */

function PanelHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      style={{
        display:
          "flex",

        alignItems:
          "flex-start",

        gap:
          "10px",

        padding:
          "16px 18px",

        borderBottom:
          "1px solid var(--border)",
      }}
    >
      <div
        style={{
          width:
            "34px",

          height:
            "34px",

          flexShrink:
            0,

          display:
            "grid",

          placeItems:
            "center",

          borderRadius:
            "8px",

          background:
            "color-mix(in oklch, var(--brand) 12%, transparent)",

          color:
            "var(--brand)",
        }}
      >
        {
          icon
        }
      </div>

      <div>
        <h2
          style={{
            margin:
              0,

            fontSize:
              "16px",

            fontWeight:
              800,
          }}
        >
          {
            title
          }
        </h2>

        <p
          className="text-muted-foreground"
          style={{
            margin:
              "4px 0 0",

            fontSize:
              "11px",

            lineHeight:
              1.4,
          }}
        >
          {
            subtitle
          }
        </p>
      </div>
    </div>
  );
}

/* ====================================================== */
/* MESSAGE COMPONENTS                                     */
/* ====================================================== */

function LargeMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="text-muted-foreground"
      style={{
        minHeight:
          "320px",

        marginTop:
          "24px",

        display:
          "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        gap:
          "8px",

        padding:
          "30px",

        borderRadius:
          "12px",

        border:
          "1px solid var(--border)",

        background:
          "color-mix(in oklch, var(--surface-2) 60%, transparent)",

        textAlign:
          "center",

        fontSize:
          "13px",
      }}
    >
      {
        children
      }
    </div>
  );
}

function InlineMessage({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="text-muted-foreground"
      style={{
        padding:
          "18px 0",

        fontSize:
          "12px",

        lineHeight:
          1.55,
      }}
    >
      {
        children
      }
    </div>
  );
}

/* ====================================================== */
/* PANEL STYLE                                            */
/* ====================================================== */

const panelStyle = {
  borderRadius:
    "12px",

  border:
    "1px solid var(--border)",

  background:
    "color-mix(in oklch, var(--surface-2) 60%, transparent)",

  overflow:
    "hidden",
} as const;

/* ====================================================== */
/* REGION HELPER                                          */
/* ====================================================== */

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

/* ====================================================== */
/* COMBINATION HELPER                                     */
/* ====================================================== */

function getCombinations<T>(
  items: T[],
  size: number,
): T[][] {
  if (
    size ===
    0
  ) {
    return [
      [],
    ];
  }

  if (
    items.length <
    size
  ) {
    return [];
  }

  if (
    size ===
    1
  ) {
    return items.map(
      (
        item,
      ) => [
        item,
      ],
    );
  }

  const results: T[][] =
    [];

  for (
    let i =
      0;
    i <=
    items.length -
      size;
    i++
  ) {
    const first =
      items[
        i
      ]!;

    const rest =
      getCombinations(
        items.slice(
          i +
            1,
        ),
        size -
          1,
      );

    for (
      const combination of
      rest
    ) {
      results.push([
        first,
        ...combination,
      ]);
    }
  }

  return results;
}

/* ====================================================== */
/* GAME HELPERS                                           */
/* ====================================================== */

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

function isUpcomingGame(
  game: Game,
) {
  if (
    game.kickoff
  ) {
    return (
      new Date(
        game.kickoff,
      ).getTime() >=
      Date.now()
    );
  }

  if (
    game.scheduledDate
  ) {
    return (
      new Date(
        `${game.scheduledDate}T23:59:59`,
      ).getTime() >=
      Date.now()
    );
  }

  return false;
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