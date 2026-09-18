import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  SeasonCaddySelect,
} from "@/components/gamehub/SeasonCaddySelect";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";

import {
  ChevronDown,
  Radio,
  Sparkles,
} from "lucide-react";

import { toast } from "sonner";

import {
  globalUpcomingDatasetQueryOptions,
  useCompetitionIdentityCatalog,
  useFrontendCatalog,
  useGlobalUpcomingDataset,
  useSavedTeamsDataset,
  useUpcomingCompetitionDataset,
} from "@/hooks/useSeasonCaddyData";

import {
  catalogDisplayTeamNames,
} from "@/lib/supabase-fixtures";

import {
  Shell,
} from "@/components/gamehub/Shell";

import {
  formatRegionalTime,
  gameDisplayTitle,
  getProviderIdsForGame,
  isGameLive,
  isUpcomingOrLiveGame,
  leagues,
  providerById,
  timeZoneForRegion,
  type Game,
} from "@/lib/gamehub-data";

import {
  fetchDatasetForSavedTeams,
} from "@/lib/frontend-data";

import {
  googleCalendarApiFetch,
  startGoogleCalendarOAuth,
} from "@/lib/google-calendar-api";

import {
  deleteService,
  fetchPreferences,
  fetchServices,
  savePreferences,
  upsertService,
} from "@/lib/gamehub-cloud";

import {
  NextFixtureHero,
} from "@/components/gamehub/NextFixtureHero";

import {
  useAuth,
} from "@/hooks/useAuth";

export const Route =
  createFileRoute("/")({
    validateSearch: (
      search: Record<
        string,
        unknown
      >,
    ) => ({
      region:
        typeof search.region ===
        "string"
          ? search.region
          : undefined,
    }),

    loader: ({ context }) => {
      // Stage 14 startup isolation: the first useful fixture batch is the only
      // sports-data request started by the route loader. Catalog/identity work
      // begins after that batch is ready.
      void context.queryClient.prefetchQuery(globalUpcomingDatasetQueryOptions);
    },

    head: () => ({
      meta: [
        {
          title:
            "SeasonCaddy",
        },
        {
          name:
            "description",
          content:
            "Pick your sport, competition and teams, then see every televised game in your region and the exact streaming services you need to watch them.",
        },
        {
          property:
            "og:title",
          content:
            "SeasonCaddy",
        },
        {
          property:
            "og:description",
          content:
            "Your team schedule, regional broadcast coverage and watch links in one dashboard.",
        },
      ],
    }),

    component:
      Index,
  });

  function canonicalTrackerTeamName(
    primary: string | undefined,
    fallback: string | undefined,
  ) {
    return (primary?.trim() || fallback?.trim() || "");
  }

  function gameMatchesTrackerTeam(
    game: Pick<Game, "home" | "away" | "canonicalHome" | "canonicalAway">,
    team: string,
  ) {
    if (!team) {
      return true;
    }

    return [
      game.home,
      game.away,
      game.canonicalHome,
      game.canonicalAway,
    ].some((value) => value?.trim() === team);
  }

  function competitionSortRank(
    competition: {
      id: string;
      name: string;
    },
  ) {
    if (
      competition.id === "nfl" ||
    competition.id === "mlb" ||
    competition.id === "nba" ||
    competition.id === "nhl" ||
    competition.id === "ufc" ||
    competition.id === "formula-1"
    ) {
      return 0;
    }
  
    if (
      competition.id ===
      "ncaa-football" ||
    competition.id === "wnba"
    ) {
      return 1;
    }
  
    return 2;
  }

  type CatalogLocationFields = {
    locationName?: unknown;
    location_name?: unknown;
    countryName?: unknown;
    country_name?: unknown;
    regionName?: unknown;
    region_name?: unknown;
    location?: unknown;
    country?: unknown;
    geography?: unknown;
  };
  
  function catalogLocation(item: unknown) {
    const locationItem =
      item as CatalogLocationFields;
  
    const rawLocation =
      locationItem.locationName ??
      locationItem.location_name ??
      locationItem.countryName ??
      locationItem.country_name ??
      locationItem.regionName ??
      locationItem.region_name ??
      locationItem.location ??
      locationItem.country ??
      locationItem.geography;
  
    return typeof rawLocation === "string"
      ? rawLocation.trim()
      : "";
  }


type ViewportStickyProps = {
  children: React.ReactNode;
  wrapperClassName?: string;
  contentClassName?: string;
  top?: number;
};

function ViewportSticky({
  children,
  wrapperClassName = "",
  contentClassName = "",
  top = 48,
}: ViewportStickyProps) {
  const placeholderRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const contentRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [
    sticky,
    setSticky,
  ] =
    useState(false);

  const [
    geometry,
    setGeometry,
  ] =
    useState({
      left: 0,
      width: 0,
      height: 0,
      scale: 1,
    });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      window.cancelAnimationFrame(
        frame,
      );

      frame =
        window.requestAnimationFrame(
          () => {
            const placeholder =
              placeholderRef.current;

            const content =
              contentRef.current;

            if (
              !placeholder ||
              !content
            ) {
              return;
            }

            const isDesktop =
              window.innerWidth >=
              1024;

            if (
              !isDesktop
            ) {
              setSticky(
                false,
              );

              setGeometry({
                left: 0,
                width: 0,
                height: 0,
                scale: 1,
              });

              return;
            }

            const rect =
              placeholder.getBoundingClientRect();

            /*
             * The desktop stylesheet uses body { zoom: 1.1 }.
             * getBoundingClientRect() reports the VISUALLY zoomed geometry,
             * but a fixed element placed back inside the zoomed body has its
             * CSS left/width values zoomed again. That was making the sticky
             * sidebars grow and drift horizontally as soon as they became
             * fixed.
             *
             * Compare the rendered width with offsetWidth to recover the
             * current CSS zoom factor, then convert the viewport geometry
             * back to layout pixels before applying it to the fixed element.
             */
            const layoutWidth =
              placeholder.offsetWidth;

            const measuredScale =
              layoutWidth > 0
                ? rect.width / layoutWidth
                : 1;

            const scale =
              Number.isFinite(measuredScale) &&
              measuredScale > 0
                ? measuredScale
                : 1;

            const nextSticky =
              rect.top <=
              top;

            setSticky(
              nextSticky,
            );

            setGeometry({
              left:
                rect.left / scale,

              width:
                rect.width / scale,

              height:
                content.scrollHeight,

              scale,
            });
          },
        );
    };

    update();

    /*
     * Capture scroll events from ANY scrolling ancestor.
     *
     * This is intentional. The page shell can use a nested scroll container,
     * which prevents ordinary CSS position: sticky from behaving relative to
     * the browser viewport. Listening in capture mode means this continues to
     * work whether the document itself or a Shell child is doing the scrolling.
     */
    document.addEventListener(
      "scroll",
      update,
      true,
    );

    window.addEventListener(
      "resize",
      update,
    );

    const resizeObserver =
      new ResizeObserver(
        update,
      );

    if (
      placeholderRef.current
    ) {
      resizeObserver.observe(
        placeholderRef.current,
      );
    }

    if (
      contentRef.current
    ) {
      resizeObserver.observe(
        contentRef.current,
      );
    }

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      document.removeEventListener(
        "scroll",
        update,
        true,
      );

      window.removeEventListener(
        "resize",
        update,
      );

      resizeObserver.disconnect();
    };
  }, [
    top,
  ]);

  const content = (
    <div
      ref={
        contentRef
      }
      className={
        contentClassName
      }
      style={
        sticky
          ? {
              position:
                "fixed",

              top:
                `${top / geometry.scale}px`,

              left:
                `${geometry.left}px`,

              width:
                `${geometry.width}px`,

              maxHeight:
                `${Math.max(
                  0,
                  (window.innerHeight - top - 16) /
                    geometry.scale,
                )}px`,

              overflowY:
                "auto",

              boxSizing:
                "border-box",

              zIndex:
                35,
            }
          : undefined
      }
    >
      {
        children
      }
    </div>
  );

  return (
    <div
      ref={
        placeholderRef
      }
      className={
        wrapperClassName
      }
      style={
        sticky
          ? {
              height:
                `${geometry.height}px`,
            }
          : undefined
      }
    >
      {sticky &&
      typeof document !==
        "undefined"
        ? createPortal(
            content,
            document.body,
          )
        : content}
    </div>
  );
}

function Index() {
  const {
    user,
  } =
    useAuth();

  /* ==================================================== */
  /* FOLLOW YOUR TEAMS                                    */
  /* ==================================================== */

  const [
    sport,
    setSport,
  ] =
    useState("");

  const [
    leagueId,
    setLeagueId,
  ] =
    useState("");

  const [
    teams,
    setTeams,
  ] =
    useState<
      string[]
    >([]);

  /* ==================================================== */
  /* TRACKER FILTERS                                      */
  /* ==================================================== */

  const [
    trackerSport,
    setTrackerSport,
  ] =
    useState("");

  const [
    trackerLocation,
    setTrackerLocation,
  ] =
    useState("");

  const [
    trackerLeague,
    setTrackerLeague,
  ] =
    useState("");

  const [
    trackerTeam,
    setTrackerTeam,
  ] =
    useState("");

  const [
    onlySavedTeams,
    setOnlySavedTeams,
  ] =
    useState(false);

  const [
    selectedProviderIds,
    setSelectedProviderIds,
  ] =
    useState<
      string[]
    >([]);

  const isSoccerTracker =
    trackerSport ===
    "soccer";

  /* ==================================================== */
  /* SAVED USER DATA                                      */
  /* ==================================================== */

  const [
    savedLeagues,
    setSavedLeagues,
  ] =
    useState<
      Record<
        string,
        string[]
      >
    >({});

  const [
    savedServices,
    setSavedServices,
  ] =
    useState<
      string[]
    >([]);

  /* ==================================================== */
  /* LIVE DATA                                            */
  /* ==================================================== */

  const {
    data: globalDataset,
    isLoading: isGlobalDatasetLoading,
    initialBatchReady,
    secondaryDataReady,
  } = useGlobalUpcomingDataset();

  const {
    data: frontendCatalog = [],
  } = useFrontendCatalog(secondaryDataReady);

  /*
   * The selector catalog is deliberately lightweight, while the tracker must
   * load the fixtures that belong to the selected sport/competition. The
   * global dataset is only a bounded preview and cannot be used as the source
   * of truth once a tracker filter is selected.
   */
  const trackerCompetitionIds =
    useMemo(() => {
      const matchingCatalog = frontendCatalog.filter((item) => {
        if (item.upcomingCount <= 0) {
          return false;
        }

        if (
          trackerSport &&
          normalizeCloudflareOptionValue(item.sport) !== trackerSport
        ) {
          return false;
        }

        if (
          trackerSport ===
            "soccer" &&
          trackerLocation &&
          catalogLocation(
            item,
          ) !==
            trackerLocation
        ) {
          return false;
        }

        return true;
      });

      if (trackerLeague) {
        const selectedCompetition = matchingCatalog.find(
          (item) => item.competitionName === trackerLeague,
        );

        return selectedCompetition
          ? [selectedCompetition.competitionId]
          : [];
      }

      if (trackerSport) {
        return matchingCatalog
          .map((item) => item.competitionId)
          .sort();
      }

      return [];
    }, [
      frontendCatalog,
      trackerSport,
      trackerLocation,
      trackerLeague,
    ]);

  const savedCompetitionIds =
    useMemo(
      () =>
        Object.entries(
          savedLeagues,
        )
          .filter(
            ([, savedTeams]) =>
              savedTeams.length > 0,
          )
          .map(
            ([competitionId]) =>
              competitionId,
          )
          .sort(),
      [savedLeagues],
    );

  const identityCompetitionIds =
    useMemo(
      () =>
        Array.from(
          new Set([
            ...(leagueId ? [leagueId] : []),
            ...savedCompetitionIds,
          ]),
        ).sort(),
      [leagueId, savedCompetitionIds],
    );

  const {
    data: competitionIdentityCatalog = [],
  } = useCompetitionIdentityCatalog(identityCompetitionIds, secondaryDataReady);

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

  const requestedCompetitionIds =
    useMemo(
      () =>
        Array.from(
          new Set([
            ...trackerCompetitionIds,
          ]),
        ).sort(),
      [
        trackerCompetitionIds,
      ],
    );

  const {
    data: selectedLeagueDataset,
    isFetching: isSelectedLeagueDatasetFetching,
  } = useUpcomingCompetitionDataset(
    requestedCompetitionIds,
  );

  const {
    data: savedTeamsDataset,
    isFetching: isSavedTeamsDatasetFetching,
  } = useSavedTeamsDataset(
    onlySavedTeams && trackerCompetitionIds.length === 0
      ? savedLeagues
      : {},
  );

  const appGames =
    useMemo(() => {
      const byId = new Map<string, Game>();

      for (const game of [
        ...(globalDataset?.games ?? []),
        ...(selectedLeagueDataset?.games ?? []),
        ...(savedTeamsDataset?.games ?? []),
      ]) {
        byId.set(game.id, game);
      }

      return Array.from(byId.values());
    }, [
      globalDataset,
      selectedLeagueDataset,
      savedTeamsDataset,
    ]);

  const liveBroadcasts =
    useMemo(() => {
      const byKey = new Map<string, NonNullable<typeof globalDataset>["broadcasts"][number]>();

      for (const broadcast of [
        ...(globalDataset?.broadcasts ?? []),
        ...(selectedLeagueDataset?.broadcasts ?? []),
        ...(savedTeamsDataset?.broadcasts ?? []),
      ]) {
        const key = `${broadcast.fixtureId ?? ""}|${broadcast.region}|${broadcast.competitionId ?? ""}`;
        byKey.set(key, broadcast);
      }

      return Array.from(byKey.values());
    }, [
      globalDataset,
      selectedLeagueDataset,
      savedTeamsDataset,
    ]);

  /*
   * Dropdown source of truth
   *
   * The Worker has already resolved each authoritative fixture to exactly:
   *   sport -> competitionId -> home/away
   *
   * The frontend only groups those resolved fixtures. Provider schedule
   * taxonomy never creates Sport or Competition options.
   */
  const liveSportOptions =
    useMemo(() => {
      const bySport = new Map<string, string>();

      frontendCatalog
  .filter((item) => item.upcomingCount > 0)
  .forEach((item) => {
        const sportId = normalizeCloudflareOptionValue(item.sport);

        if (!sportId || sportId === "unknown" || sportId === "unclassified" || sportId === "other") {
          return;
        }

        if (!bySport.has(sportId)) {
          bySport.set(sportId, formatCloudflareOptionLabel(sportId));
        }
      });

      return Array.from(bySport, ([id, name]) => ({ id, name })).sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }, [frontendCatalog]);

  const liveCompetitionOptions =
    useMemo(() =>
      frontendCatalog
        .filter((item) => item.upcomingCount > 0)
        .map((item) => ({
          id: item.competitionId,
          name: item.competitionName || formatCloudflareOptionLabel(item.competitionId),
          sport: normalizeCloudflareOptionValue(item.sport),
          location: catalogLocation(item),
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [frontendCatalog],
  );

  const competitionDisplayNameById =
  useMemo(() => {
    const names =
      new Map<string, string>();

    frontendCatalog.forEach(
      (item) => {
        names.set(
          item.competitionId,
          item.competitionName ||
            formatCloudflareOptionLabel(
              item.competitionId,
            ),
        );
      },
    );

    return names;
  }, [frontendCatalog]);

function competitionDisplayName(
  competitionId: string,
) {
  return (
    competitionDisplayNameById.get(
      competitionId,
    ) ??
    leagues.find(
      (item) =>
        item.id === competitionId,
    )?.name ??
    formatCloudflareOptionLabel(
      competitionId,
    )
  );
}

function savedItemDisplayName(
  competitionId: string,
  savedValue: string,
) {
  /*
   * A competition-follow can currently
   * appear in saved_leagues as its own ID.
   * Never expose that ID to the user.
   */
  if (
    savedValue === competitionId
  ) {
    return competitionDisplayName(
      competitionId,
    );
  }

  return savedValue;
}

  const trackerLocationOptions =
    useMemo(() => {
      if (
        !isSoccerTracker
      ) {
        return [];
      }

      return Array.from(
        new Set(
          liveCompetitionOptions
            .filter(
              (
                competition,
              ) =>
                competition.sport ===
                  "soccer" &&
                Boolean(
                  competition.location,
                ),
            )
            .map(
              (
                competition,
              ) =>
                competition.location,
            ),
        ),
      ).sort(
        (
          a,
          b,
        ) =>
          a.localeCompare(
            b,
          ),
      );
    }, [
      liveCompetitionOptions,
      isSoccerTracker,
    ]);

  const trackerLocationCompetitionIds =
    useMemo(
      () =>
        new Set(
          liveCompetitionOptions
            .filter(
              (
                competition,
              ) =>
                competition.sport ===
                  "soccer" &&
                (!trackerLocation ||
                  competition.location ===
                    trackerLocation),
            )
            .map(
              (
                competition,
              ) =>
                competition.id,
            ),
        ),
      [
        liveCompetitionOptions,
        trackerLocation,
      ],
    );

  const competitionIdByName =
    useMemo(
      () =>
        new Map(
          liveCompetitionOptions.map(
            (
              competition,
            ) => [
              competition.name,
              competition.id,
            ],
          ),
        ),
      [
        liveCompetitionOptions,
      ],
    );

  const leagueOptions =
    useMemo(
      () =>
        liveCompetitionOptions.filter(
          (
            competition,
          ) =>
            competition.sport ===
            sport,
        ),
      [
        liveCompetitionOptions,
        sport,
      ],
    );

  const league =
    leagueOptions.find(
      (
        item,
      ) =>
        item.id ===
        leagueId,
    );

  /* ==================================================== */
  /* LIVE TEAM OPTIONS                                    */
  /* ==================================================== */

  const leagueTeamOptions =
    useMemo(() => {
      if (!league) {
        return [];
      }

      const competition = competitionIdentityById.get(league.id);
      return competition ? catalogDisplayTeamNames(competition) : [];
    }, [
      competitionIdentityById,
      league,
    ]);

  /* ==================================================== */
  /* REGION — V1 IS US ONLY                              */
  /* ==================================================== */

  const region =
    "United States";

  const selectedTimeZone =
    timeZoneForRegion(
      region,
    );

  /* ==================================================== */
  /* GOOGLE CALENDAR                                      */
  /* ==================================================== */

  const [
    googleCalendarSyncStatus,
    setGoogleCalendarSyncStatus,
  ] =
    useState<
      | "idle"
      | "syncing"
      | "synced"
    >("idle");

  const [
    addingCalendarGameId,
    setAddingCalendarGameId,
  ] =
    useState<
      string | null
    >(null);

  /* ==================================================== */
  /* CLIENT STATE                                         */
  /* ==================================================== */

  const [
    mounted,
    setMounted,
  ] =
    useState(false);

  const [
    fixtureNow,
    setFixtureNow,
  ] = useState(
    () => Date.now(),
  );

  const prevSport =
    useRef(
      sport,
    );

  useEffect(() => {
    setMounted(
      true,
    );
  }, []);

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

  /* ==================================================== */
  /* LOAD SAVED USER DATA                                 */
  /* ==================================================== */

  useEffect(() => {
    if (
      !user
    ) {
      setSavedServices(
        [],
      );

      return;
    }

    fetchServices()
      .then(
        (
          rows,
        ) => {
          setSavedServices(
            rows.map(
              (
                service,
              ) =>
                service.provider_id,
            ),
          );
        },
      )
      .catch(() => {
        setSavedServices(
          [],
        );
      });

    fetchPreferences({ canonicalize: false })
      .then(
        (
          prefs,
        ) => {
          if (
            !prefs
          ) {
            return;
          }

          setSavedLeagues(
            prefs.saved_leagues ??
              {
                [prefs.league_id]:
                  prefs.teams,
              },
          );
        },
      )
      .catch(() => {
        toast.error(
          "Could not load your saved slate",
        );
      });
  }, [
    user?.id,
  ]);

  /* ==================================================== */
  /* CHANGING SPORT                                       */
  /* ==================================================== */

  useEffect(() => {
    if (
      prevSport.current ===
      sport
    ) {
      return;
    }

    prevSport.current =
      sport;

    setLeagueId(
      "",
    );

    setTeams(
      [],
    );
  }, [
    sport,
  ]);

  /* ==================================================== */
  /* TRACKER SOCCER LOCATION                              */
  /* ==================================================== */

  useEffect(() => {
    if (
      isSoccerTracker ||
      !trackerLocation
    ) {
      return;
    }

    setTrackerLocation(
      "",
    );
  }, [
    isSoccerTracker,
    trackerLocation,
  ]);

  useEffect(() => {
    if (
      !isSoccerTracker ||
      !trackerLocation ||
      !trackerLeague
    ) {
      return;
    }

    const selectedCompetition =
      liveCompetitionOptions.find(
        (
          competition,
        ) =>
          competition.name ===
          trackerLeague,
      );

    if (
      selectedCompetition?.location ===
      trackerLocation
    ) {
      return;
    }

    setTrackerLeague(
      "",
    );

    setTrackerTeam(
      "",
    );

    setSelectedProviderIds(
      [],
    );
  }, [
    isSoccerTracker,
    trackerLocation,
    trackerLeague,
    liveCompetitionOptions,
  ]);

  /* ==================================================== */
  /* GOOGLE CALENDAR FULL SYNC                            */
  /* ==================================================== */

  async function syncWithGoogleCalendar(
    competitionsToSync?: Record<
      string,
      string[]
    >,
    automatic = false,
  ) {
    const competitions =
      competitionsToSync ??
      savedLeagues;

    const savedTeamCount =
      Object.values(
        competitions,
      ).reduce(
        (
          total,
          competitionTeams,
        ) =>
          total +
          competitionTeams.length,
        0,
      );

    if (
      savedTeamCount ===
        0 &&
      !automatic
    ) {
      toast.error(
        "Save at least one team first",
      );

      return;
    }

    if (
      googleCalendarSyncStatus ===
        "syncing" &&
      !automatic
    ) {
      return;
    }

    setGoogleCalendarSyncStatus(
      "syncing",
    );

    try {
      const statusResponse =
        await googleCalendarApiFetch(
          "/google/status",
        );

      const status =
        await statusResponse.json();

      if (
        !statusResponse.ok ||
        !status.success
      ) {
        throw new Error(
          status.error ??
            "Could not check Google Calendar connection",
        );
      }

      if (
        !status.connected
      ) {
        setGoogleCalendarSyncStatus(
          "idle",
        );

        if (
          automatic
        ) {
          return;
        }

        await startGoogleCalendarOAuth(
          normalizeRegion(
            region,
          ),
          "/",
        );

        return;
      }

      const syncDataset =
        await fetchDatasetForSavedTeams(
          competitions,
        );

      const syncEvents =
        syncDataset.games
          .filter((game) => {
            if (!game.kickoff) return false;
            const kickoffMs = new Date(game.kickoff).getTime();
            return Number.isFinite(kickoffMs) && kickoffMs >= Date.now() - 6 * 60 * 60 * 1000;
          })
          .map((game) => ({
            id: game.id,
            sport: game.sport,
            competition: game.league,
            league: game.league,
            home: game.home,
            away: game.away,
            kickoff: game.kickoff,
            scheduledDate: game.scheduledDate,
            scheduleLabel: game.scheduleLabel,
          }));

      const syncResponse =
        await googleCalendarApiFetch(
          "/google/sync",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                events:
                  syncEvents,

                region:
                  normalizeRegion(
                    region,
                  ),
              }),
          },
        );

      const result =
        await syncResponse.json();

      if (
        !syncResponse.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ??
            "Could not sync Google Calendar",
        );
      }

      setGoogleCalendarSyncStatus(
        "synced",
      );

      if (
        automatic
      ) {
        console.log(
          "SeasonCaddy automatic Calendar sync:",
          {
            competitions,

            created:
              result.created,

            updated:
              result.updated,

            deleted:
              result.deleted,

            failed:
              result.failed,

            total:
              result.total,
          },
        );

        if (
          savedTeamCount ===
          0
        ) {
          toast.success(
            `${result.deleted ?? 0} Google Calendar fixture(s) removed`,
            {
              duration:
                6000,
            },
          );
        } else {
          toast.success(
            "Saved teams synced with Google Calendar",
            {
              duration:
                6000,
            },
          );
        }

        return;
      }

      toast.success(
        `${result.total} fixtures synced to Google Calendar`,
        {
          duration:
            6000,
        },
      );
    } catch (
      error
    ) {
      console.error(
        "Google Calendar sync failed",
        error,
      );

      setGoogleCalendarSyncStatus(
        "idle",
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not sync Google Calendar",
      );
    }
  }

  /* ==================================================== */
  /* GOOGLE CALENDAR — ADD ONE FIXTURE                    */
  /* ==================================================== */

  async function addSingleGameToGoogleCalendar(
    game: Game,
  ) {
    if (
      !game.kickoff
    ) {
      toast.error(
        "This fixture does not have a confirmed kickoff time yet.",
      );

      return;
    }

    if (
      addingCalendarGameId
    ) {
      return;
    }

    setAddingCalendarGameId(
      game.id,
    );

    try {
      const statusResponse =
        await googleCalendarApiFetch(
          "/google/status",
        );

      const status =
        await statusResponse.json();

      if (
        !statusResponse.ok ||
        !status.success
      ) {
        throw new Error(
          status.error ??
            "Could not check Google Calendar connection",
        );
      }

      if (
        !status.connected
      ) {
        await startGoogleCalendarOAuth(
          normalizeRegion(
            region,
          ),
          "/",
        );

        return;
      }

      const providerNames =
        regionalProviderIds(
          game,
        )
          .map(
            (
              providerId,
            ) =>
              providerById(
                providerId,
              ),
          )
          .filter(
            (
              provider,
            ) =>
              provider.id !==
                "tbd" &&
              provider.id !==
                "not-live-uk",
          )
          .map(
            (
              provider,
            ) =>
              provider.name,
          );

      const response =
        await googleCalendarApiFetch(
          "/google/add-event",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                game: {
                  id:
                    game.id,

                  sport:
                    game.sport,

                  league:
                    game.league,

                  home:
                    game.home,

                  away:
                    game.away,

                  kickoff:
                    game.kickoff,

                  scheduledDate:
                    game.scheduledDate,

                  scheduleLabel:
                    game.scheduleLabel,
                },

                providerNames,

                region:
                  normalizeRegion(
                    region,
                  ),
              }),
          },
        );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ??
            "Could not add game to Google Calendar",
        );
      }

      toast.success(
        result.alreadyExists
          ? "This game is already in Google Calendar"
          : "Game added to Google Calendar",
      );
    } catch (
      error
    ) {
      console.error(
        "Could not add single Google Calendar event",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Could not add game to Google Calendar",
      );
    } finally {
      setAddingCalendarGameId(
        null,
      );
    }
  }

   /*
   * REGIONAL PROVIDER LOOKUP
   *
   * Resolve provider data for every configured SeasonCaddy competition
   * through the authoritative Worker broadcast feed.
   */
   function regionalProviderIds(
    game: Game,
  ) {
    const broadcastRegion =
      normalizeRegion(
        region,
      );

    const competitionId =
      game.competitionId ??
      leagues.find(
        (league) =>
          league.name ===
          game.league,
      )?.id;

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

    const normalizeProviderIds = (
      providerIds: string[],
    ) => {
      const uniqueProviderIds = Array.from(
        new Set(
          providerIds
            .map((providerId) => providerId.trim())
            .filter(Boolean),
        ),
      );

      const isPlaceholderProviderId = (providerId: string) => {
        const normalized = providerId
          .toLowerCase()
          .replace(/[_\s]+/g, "-");

        return (
          normalized === "tbd" ||
          normalized === "pending" ||
          normalized === "provider-pending" ||
          normalized === "broadcast-pending" ||
          normalized === "not-live-uk" ||
          providerById(providerId).id === "tbd"
        );
      };

      const confirmedProviderIds =
        uniqueProviderIds.filter(
          (providerId) => !isPlaceholderProviderId(providerId),
        );

      return confirmedProviderIds.length > 0
        ? confirmedProviderIds
        : uniqueProviderIds;
    };

    if (
      liveBroadcast &&
      liveBroadcast.providerIds.length > 0
    ) {
      return normalizeProviderIds(
        liveBroadcast.providerIds,
      );
    }

    return normalizeProviderIds(
      getProviderIdsForGame(
        game,
        broadcastRegion,
      ),
    );
  }

  /* ==================================================== */
  /* SAVE TEAM SLATE                                      */
  /* ==================================================== */

  async function saveSlate() {
    if (
      !user
    ) {
      toast.error(
        "Sign in to save your teams",
      );

      return;
    }

    if (
      !sport ||
      !league
    ) {
      toast.error(
        "Select a sport and competition first",
      );

      return;
    }

    try {
      const currentPrefs =
        await fetchPreferences();

      const existingSavedLeagues =
        Object.keys(
          savedLeagues,
        ).length >
        0
          ? savedLeagues
          : currentPrefs
              ?.saved_leagues ??
            {};

      const updatedSavedLeagues = {
        ...existingSavedLeagues,

        [league.id]: [
          ...teams,
        ],
      };

      await savePreferences(
        user.id,
        {
          sport,

          league_id:
            league.id,

          teams: [
            ...teams,
          ],

          region:
            normalizeRegion(
              region,
            ),

          saved_leagues:
            updatedSavedLeagues,
        },
      );

      setSavedLeagues(
        updatedSavedLeagues,
      );

      toast.success(
        teams.length ===
          0
          ? `Removed all saved teams from ${league.name}`
          : `Saved ${teams.length} team(s) to your slate`,
      );

      await syncWithGoogleCalendar(
        updatedSavedLeagues,
        true,
      );
    } catch (
      error
    ) {
      console.error(
        "Could not save slate",
        error,
      );

      toast.error(
        "Could not save your slate",
      );
    }
  }

  /* ==================================================== */
  /* REMOVE SAVED TEAM                                    */
  /* ==================================================== */

  async function removeSavedTeam(
    savedLeagueId: string,
    team: string,
  ) {
    if (
      !user
    ) {
      toast.error(
        "Sign in to manage your saved teams",
      );

      return;
    }

    const currentLeagueTeams =
      savedLeagues[
        savedLeagueId
      ] ?? [];

    if (
      !currentLeagueTeams.includes(
        team,
      )
    ) {
      return;
    }

    const updatedLeagueTeams =
      currentLeagueTeams.filter(
        (
          savedTeam,
        ) =>
          savedTeam !==
          team,
      );

    const updatedSavedLeagues = {
      ...savedLeagues,

      [savedLeagueId]:
        updatedLeagueTeams,
    };

    try {
      const currentPrefs =
        await fetchPreferences();

      const legacyLeagueId =
        currentPrefs
          ?.league_id ??
        savedLeagueId;

      const legacyLeague =
        leagues.find(
          (
            item,
          ) =>
            item.id ===
            legacyLeagueId,
        );

      await savePreferences(
        user.id,
        {
          sport:
            currentPrefs
              ?.sport ??
            legacyLeague
              ?.sport ??
            "soccer",

          league_id:
            legacyLeagueId,

          teams: [
            ...(
              updatedSavedLeagues[
                legacyLeagueId
              ] ?? []
            ),
          ],

          region:
            normalizeRegion(
              region,
            ),

          saved_leagues:
            updatedSavedLeagues,
        },
      );

      setSavedLeagues(
        updatedSavedLeagues,
      );

      if (
        leagueId ===
        savedLeagueId
      ) {
        setTeams(
          updatedLeagueTeams,
        );
      }

      toast.success(
        `${savedItemDisplayName(
          savedLeagueId,
          team,
        )} removed from your saved teams`,
      );

      await syncWithGoogleCalendar(
        updatedSavedLeagues,
        true,
      );
    } catch (
      error
    ) {
      console.error(
        "Could not remove saved team",
        error,
      );

      toast.error(
        "Could not remove the saved team",
      );
    }
  }

  /* ==================================================== */
  /* REMOVE SAVED COMPETITION                             */
  /* ==================================================== */

  async function removeSavedCompetition(
    savedLeagueId: string,
    competitionName: string,
  ) {
    if (
      !user
    ) {
      toast.error(
        "Sign in to manage your saved teams",
      );

      return;
    }

    const updatedSavedLeagues = {
      ...savedLeagues,

      [savedLeagueId]:
        [],
    };

    try {
      const currentPrefs =
        await fetchPreferences();

      const legacyLeagueId =
        currentPrefs
          ?.league_id ??
        savedLeagueId;

      const legacyLeague =
        leagues.find(
          (
            item,
          ) =>
            item.id ===
            legacyLeagueId,
        );

      await savePreferences(
        user.id,
        {
          sport:
            currentPrefs
              ?.sport ??
            legacyLeague
              ?.sport ??
            "soccer",

          league_id:
            legacyLeagueId,

          teams: [
            ...(
              updatedSavedLeagues[
                legacyLeagueId
              ] ?? []
            ),
          ],

          region:
            normalizeRegion(
              region,
            ),

          saved_leagues:
            updatedSavedLeagues,
        },
      );

      setSavedLeagues(
        updatedSavedLeagues,
      );

      if (
        leagueId ===
        savedLeagueId
      ) {
        setTeams(
          [],
        );
      }

      toast.success(
        `${competitionName} removed from your saved teams`,
      );

      await syncWithGoogleCalendar(
        updatedSavedLeagues,
        true,
      );
    } catch (
      error
    ) {
      console.error(
        "Could not remove saved competition",
        error,
      );

      toast.error(
        "Could not remove the saved competition",
      );
    }
  }

  /* ==================================================== */
  /* STREAMING SUBSCRIPTIONS                              */
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
    } catch {
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
    } catch {
      toast.error(
        "Could not remove subscription",
      );
    }
  }

  /* ==================================================== */
  /* UPCOMING FIXTURES                                    */
  /* ==================================================== */

  const upcomingGames =
    useMemo(() => {
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

    const trackerLeagueOptions =
    useMemo(() => {
      return liveCompetitionOptions
        .filter(
          (
            item,
          ) => {
            if (
              trackerSport &&
              item.sport !==
                trackerSport
            ) {
              return false;
            }

            if (
              isSoccerTracker &&
              trackerLocation &&
              item.location !==
                trackerLocation
            ) {
              return false;
            }

            return true;
          },
        )
        .sort(
          (
            a,
            b,
          ) => {
            const rankDifference =
              competitionSortRank(a) -
              competitionSortRank(b);

            if (
              rankDifference !== 0
            ) {
              return rankDifference;
            }

            return a.name.localeCompare(
              b.name,
            );
          },
        );
    }, [
      liveCompetitionOptions,
      trackerSport,
      trackerLocation,
      isSoccerTracker,
    ]);

  const trackerTeamOptions =
    useMemo(() => {
      const selectedCompetition =
        liveCompetitionOptions.find(
          (
            competition,
          ) =>
            competition.name ===
            trackerLeague,
        );

      const teamNames =
        appGames
          .filter(
            (
              game,
            ) => {
              const fixtureSport =
                normalizeCloudflareOptionValue(
                  game.sport,
                );

              if (
                trackerSport &&
                fixtureSport !==
                  trackerSport
              ) {
                return false;
              }

              if (
                isSoccerTracker &&
                trackerLocation
              ) {
                const gameCompetitionId =
                  game.competitionId ??
                  competitionIdByName.get(
                    game.league,
                  );

                if (
                  !gameCompetitionId ||
                  !trackerLocationCompetitionIds.has(
                    gameCompetitionId,
                  )
                ) {
                  return false;
                }
              }

              if (
                selectedCompetition &&
                game.competitionId !==
                  selectedCompetition.id
              ) {
                return false;
              }

              return true;
            },
          )
          .flatMap(
            (
              game,
            ) => [
              canonicalTrackerTeamName(
                game.canonicalHome,
                game.home,
              ),
              canonicalTrackerTeamName(
                game.canonicalAway,
                game.away,
              ),
            ],
          )
          .filter(
            Boolean,
          );

      return [
        ...new Set(
          teamNames,
        ),
      ].sort(
        (
          a,
          b,
        ) =>
          a.localeCompare(
            b,
          ),
      );
    }, [
      appGames,
      liveCompetitionOptions,
      trackerSport,
      trackerLocation,
      trackerLeague,
      isSoccerTracker,
      trackerLocationCompetitionIds,
      competitionIdByName,
    ]);

  /* ==================================================== */
  /* PROVIDER FILTER OPTIONS                              */
  /* ==================================================== */

  const providerFilterOptions =
    useMemo(() => {
      const selectedCompetition =
        liveCompetitionOptions.find(
          (
            competition,
          ) =>
            competition.name ===
            trackerLeague,
        );

      const eligibleFixtureIds =
        new Set(
          appGames
            .filter(
              (
                game,
              ) => {
                if (
                  trackerSport &&
                  normalizeCloudflareOptionValue(
                    game.sport,
                  ) !==
                    trackerSport
                ) {
                  return false;
                }

                if (
                  isSoccerTracker &&
                  trackerLocation
                ) {
                  const gameCompetitionId =
                    game.competitionId ??
                    competitionIdByName.get(
                      game.league,
                    );

                  if (
                    !gameCompetitionId ||
                    !trackerLocationCompetitionIds.has(
                      gameCompetitionId,
                    )
                  ) {
                    return false;
                  }
                }

                if (
                  selectedCompetition &&
                  game.competitionId !==
                    selectedCompetition.id
                ) {
                  return false;
                }

                if (
                  trackerTeam &&
                  !gameMatchesTrackerTeam(
                    game,
                    trackerTeam,
                  )
                ) {
                  return false;
                }

                return true;
              },
            )
            .map(
              (
                game,
              ) =>
                game.id,
            ),
        );

      const providerIds =
        liveBroadcasts
          .filter(
            (
              broadcast,
            ) =>
              normalizeRegion(
                broadcast.region,
              ) ===
                normalizeRegion(
                  region,
                ) &&
              Boolean(
                broadcast.fixtureId &&
                eligibleFixtureIds.has(
                  broadcast.fixtureId,
                ),
              ),
          )
          .flatMap(
            (
              broadcast,
            ) =>
              broadcast.providerIds,
          )
          .filter(
            (
              providerId,
            ) =>
              !isPendingProviderId(
                providerId,
              ),
          );

      return Array.from(
        new Set(
          providerIds,
        ),
      )
        .map(
          (
            providerId,
          ) =>
            providerById(
              providerId,
            ),
        )
        .sort(
          (
            a,
            b,
          ) =>
            a.name.localeCompare(
              b.name,
            ),
        );
    }, [
      appGames,
      liveBroadcasts,
      liveCompetitionOptions,
      trackerSport,
      trackerLocation,
      trackerLeague,
      trackerTeam,
      isSoccerTracker,
      trackerLocationCompetitionIds,
      competitionIdByName,
      region,
    ]);

  /* ==================================================== */
  /* VISIBLE FIXTURE TRACKER                              */
  /* ==================================================== */

  const filteredTrackerGames =
    useMemo(() => {
      return upcomingGames.filter(
        (
          game,
        ) => {
          if (
            trackerSport &&
            game.sport !==
              trackerSport
          ) {
            return false;
          }

          if (
            isSoccerTracker &&
            trackerLocation
          ) {
            const gameCompetitionId =
              game.competitionId ??
              competitionIdByName.get(
                game.league,
              );

            if (
              !gameCompetitionId ||
              !trackerLocationCompetitionIds.has(
                gameCompetitionId,
              )
            ) {
              return false;
            }
          }

          if (
            trackerLeague &&
            game.league !==
              trackerLeague
          ) {
            return false;
          }

          if (
            trackerTeam &&
            !gameMatchesTrackerTeam(
              game,
              trackerTeam,
            )
          ) {
            return false;
          }

          if (
            onlySavedTeams
          ) {
            const gameCompetitionId =
              game.competitionId ??
              competitionIdByName.get(
                game.league,
              ) ??
              leagues.find(
                (item) =>
                  item.name ===
                  game.league,
              )?.id;

            if (
              !gameCompetitionId
            ) {
              return false;
            }

            const savedTeamsForGameCompetition =
              savedLeagues[
                gameCompetitionId
              ] ?? [];

            const wholeCompetitionSaved =
              savedTeamsForGameCompetition.includes(
                gameCompetitionId,
              );

            const involvesSavedTeam =
              wholeCompetitionSaved ||
              [
                game.home,
                game.away,
                game.canonicalHome,
                game.canonicalAway,
              ].some(
                (teamName) =>
                  Boolean(
                    teamName &&
                    savedTeamsForGameCompetition.includes(
                      teamName,
                    ),
                  ),
              );

            if (
              !involvesSavedTeam
            ) {
              return false;
            }
          }

          if (
            selectedProviderIds.length >
            0
          ) {
            const gameProviders =
              regionalProviderIds(
                game,
              );

            const matchesSelectedProvider =
              selectedProviderIds.some(
                (
                  providerId,
                ) =>
                  gameProviders.includes(
                    providerId,
                  ),
              );

            if (
              !matchesSelectedProvider
            ) {
              return false;
            }
          }

          return true;
        },
      );
    }, [
      upcomingGames,
      trackerSport,
      trackerLocation,
      trackerLeague,
      trackerTeam,
      isSoccerTracker,
      trackerLocationCompetitionIds,
      competitionIdByName,
      onlySavedTeams,
      selectedProviderIds,
      savedLeagues,
      region,
      liveBroadcasts,
    ]);

  /* ==================================================== */
  /* DISPLAY LIMIT                                        */
  /* ==================================================== */

  const hasActiveTrackerFilters =
    Boolean(
      trackerSport ||
      trackerLocation ||
      trackerLeague ||
      trackerTeam ||
      onlySavedTeams ||
      selectedProviderIds.length > 0,
    );

  const visibleTrackerGames =
    useMemo(
      () => {
        /*
         * The 100-fixture cap is a display cap, not a source-data cap.
         * When a tracker filter is active (including Saved Teams), load the
         * relevant competition datasets first, filter that complete slate,
         * then take the next 100 matching live/upcoming fixtures.
         */
        const trackerSource = hasActiveTrackerFilters
          ? filteredTrackerGames
          : upcomingGames;

        return trackerSource.slice(
          0,
          100,
        );
      },
      [
        hasActiveTrackerFilters,
        filteredTrackerGames,
        upcomingGames,
      ],
    );

  /* ==================================================== */
  /* HOME HERO                                            */
  /* ==================================================== */

  const heroFilterSignature =
    useMemo(
      () =>
        JSON.stringify({
          trackerSport,
          trackerLocation,
          trackerLeague,
          trackerTeam,
          onlySavedTeams,
          selectedProviderIds: [...selectedProviderIds].sort(),
          region,
          savedLeagues: onlySavedTeams ? savedLeagues : undefined,
        }),
      [
        trackerSport,
        trackerLocation,
        trackerLeague,
        trackerTeam,
        onlySavedTeams,
        selectedProviderIds,
        region,
        savedLeagues,
      ],
    );

  const [stableHero, setStableHero] =
    useState<{
      signature: string;
      id: string;
    } | null>(null);

  const candidateNext =
    visibleTrackerGames[0] ??
    null;

  const stableNext =
    stableHero?.signature ===
    heroFilterSignature
      ? visibleTrackerGames.find(
          (game) =>
            game.id ===
            stableHero.id,
        ) ?? null
      : null;

  const next =
    stableNext ??
    candidateNext;

  useEffect(() => {
    if (!candidateNext) {
      setStableHero(null);
      return;
    }

    setStableHero((current) => {
      if (
        current?.signature ===
          heroFilterSignature &&
        visibleTrackerGames.some(
          (game) =>
            game.id === current.id,
        )
      ) {
        return current;
      }

      return {
        signature:
          heroFilterSignature,
        id: candidateNext.id,
      };
    });
  }, [
    candidateNext?.id,
    heroFilterSignature,
    visibleTrackerGames,
  ]);

  const fixtureDataLoading =
    !next &&
    (isGlobalDatasetLoading ||
      (hasActiveTrackerFilters &&
        requestedCompetitionIds.length > 0 &&
        isSelectedLeagueDatasetFetching) ||
      (hasActiveTrackerFilters &&
        onlySavedTeams &&
        trackerCompetitionIds.length === 0 &&
        Object.keys(savedLeagues).length > 0 &&
        isSavedTeamsDatasetFetching));

  /* ==================================================== */
  /* HOME COVERAGE PLANNER                                */
  /* ==================================================== */

  const neededProviders =
    useMemo(() => {
      const providerIds =
        visibleTrackerGames.flatMap(
          (
            game,
          ) =>
            regionalProviderIds(
              game,
            ),
        );

      return [
        ...new Set(
          providerIds,
        ),
      ]
        .filter(
          (
            providerId,
          ) =>
            !isPendingProviderId(
              providerId,
            ),
        )
        .map(
          (
            providerId,
          ) =>
            providerById(
              providerId,
            ),
        );
    }, [
      visibleTrackerGames,
      region,
      liveBroadcasts,
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

  function toggleTeam(
    team: string,
  ) {
    setTeams(
      (
        previousTeams,
      ) =>
        previousTeams.includes(
          team,
        )
          ? previousTeams.filter(
              (
                currentTeam,
              ) =>
                currentTeam !==
                team,
            )
          : [
              ...previousTeams,
              team,
            ],
    );
  }

  return (
    <Shell
      region={
        region
      }
    >
      <main className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 lg:flex-row lg:items-start">

        {/* ================================================= */}
        {/* LEFT SIDEBAR                                      */}
        {/* ================================================= */}

        <ViewportSticky
  top={80}
  wrapperClassName="w-full shrink-0 lg:w-72 lg:self-start"
  contentClassName="sportstream-scrollbar w-full"
>
  <aside className="panel h-fit space-y-5 p-6">
          <div>
            <h1 className="mt-1 text-2xl font-extrabold">
              Follow your Teams
            </h1>
          </div>

          {/* SPORT */}

          <Field label="Sport">
            <SeasonCaddySelect
              value={
                sport
              }
              placeholder="Select Sport"
              options={liveSportOptions.map(
                (
                  item,
                ) => ({
                  value:
                    item.id,

                  label:
                    item.name,
                }),
              )}
              onChange={
                setSport
              }
            />
          </Field>

          {/* LEAGUE */}

          <Field label="Competition">
            <SeasonCaddySelect
              value={
                leagueId
              }
              placeholder="Select Competition"
              disabled={
                !sport
              }
              options={leagueOptions.map(
                (
                  item,
                ) => ({
                  value:
                    item.id,

                  label:
                    item.name,
                }),
              )}
              onChange={(
                newLeagueId,
              ) => {
                setLeagueId(
                  newLeagueId,
                );

                setTeams(
                  savedLeagues[
                    newLeagueId
                  ] ?? [],
                );
              }}
            />
          </Field>

          {/* TEAMS */}

          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wide text-muted-foreground">
                Teams
              </span>

              {league && (
                <button
                  type="button"
                  className="cursor-pointer text-xs font-semibold text-brand hover:underline"
                  onClick={() =>
                    setTeams(
                      (
                        currentTeams,
                      ) =>
                        currentTeams.length >
                        0
                          ? []
                          : [
                              ...leagueTeamOptions,
                            ],
                    )
                  }
                >
                  {teams.length >
                  0
                    ? "Clear all"
                    : "Select all"}
                </button>
              )}
            </div>

            {league ? (
              <>
                <div className="sportstream-scrollbar flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-2">
                  {leagueTeamOptions.map(
                    (
                      team,
                    ) => {
                      const active =
                        teams.includes(
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
                              team,
                            )
                          }
                          className={`cursor-pointer rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                            active
                              ? "border-brand bg-brand text-brand-foreground"
                              : "border-border bg-surface-2/60 text-foreground hover:border-brand/60"
                          }`}
                        >
                          {
                            team
                          }
                        </button>
                      );
                    },
                  )}
                </div>

                <p className="mt-2 text-xs text-muted-foreground">
                  {leagueTeamOptions.length >
                  0
                    ? "Choose one or more teams to focus your slate."
                    : "Teams will appear when live fixture data is available for this competition."}
                </p>
              </>
            ) : (
              <p className="text-xs leading-relaxed text-muted-foreground">
                Select a sport and competition to choose your teams.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={
              saveSlate
            }
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5"
          >
            <Radio className="size-4" />

            {user
              ? "Save my teams"
              : "Sign in to save my teams"}
          </button>

          {/* MY SAVED TEAMS */}

          <div className="space-y-3 border-t border-border/60 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold tracking-wide text-muted-foreground">
                My Saved Teams
              </span>

              {Object.values(
                savedLeagues,
              ).some(
                (
                  savedLeagueTeams,
                ) =>
                  savedLeagueTeams.length >
                  0,
              ) && (
                <span className="text-xs text-muted-foreground">
                  {Object.values(
                    savedLeagues,
                  ).reduce(
                    (
                      total,
                      savedLeagueTeams,
                    ) =>
                      total +
                      savedLeagueTeams.length,
                    0,
                  )}{" "}
                  saved
                </span>
              )}
            </div>

            {Object.values(
              savedLeagues,
            ).every(
              (
                savedLeagueTeams,
              ) =>
                savedLeagueTeams.length ===
                0,
            ) ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                No saved teams yet.
              </p>
            ) : (
              <div className="space-y-4">
                {Object.entries(
                  savedLeagues,
                ).map(
                  ([
                    savedLeagueId,
                    savedLeagueTeams,
                  ]) => {
                    if (
                      savedLeagueTeams.length ===
                      0
                    ) {
                      return null;
                    }

                    const savedCompetition =
                      competitionIdentityById.get(savedLeagueId);

                    const availableTeams = savedCompetition
                      ? catalogDisplayTeamNames(savedCompetition)
                      : [];

                    const competitionSaved =
                      availableTeams.length >
                        0 &&
                      availableTeams.every(
                        (
                          team,
                        ) =>
                          savedLeagueTeams.includes(
                            team,
                          ),
                      );

                    return (
                      <div
                        key={
                          savedLeagueId
                        }
                        className="space-y-2"
                      >
                        <p className="text-xs font-bold text-foreground">
  {competitionDisplayName(
    savedLeagueId,
  )}
</p>

                        <div className="flex flex-wrap gap-2">
                        {competitionSaved ? (
  <button
    type="button"
    onClick={() =>
      removeSavedCompetition(
        savedLeagueId,
        competitionDisplayName(
          savedLeagueId,
        ),
      )
    }
    aria-label={`Remove ${competitionDisplayName(
      savedLeagueId,
    )} from saved competitions`}
    title={`Remove ${competitionDisplayName(
      savedLeagueId,
    )}`}
    className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand/40 bg-brand/10 px-2.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/15"
  >
    <span>
      {competitionDisplayName(
        savedLeagueId,
      )}
    </span>

    <span
      aria-hidden="true"
      className="text-base font-bold leading-none text-brand/60 transition-colors group-hover:text-brand"
    >
      ×
    </span>
  </button>
                          ) : (
                            savedLeagueTeams.map(
                              (
                                team,
                              ) => (
                                <button
                                  key={`${savedLeagueId}-${team}`}
                                  type="button"
                                  onClick={() =>
                                    removeSavedTeam(
                                      savedLeagueId,
                                      team,
                                    )
                                  }
                                  aria-label={`Remove ${savedItemDisplayName(
                                    savedLeagueId,
                                    team,
                                  )} from saved teams`}
                                  title={`Remove ${savedItemDisplayName(
                                    savedLeagueId,
                                    team,
                                  )}`}
                                  className="group inline-flex cursor-pointer items-center gap-2 rounded-md border border-brand/40 bg-brand/10 px-2.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:border-brand hover:bg-brand/15"
                                >
                                  <span>
  {savedItemDisplayName(
    savedLeagueId,
    team,
  )}
</span>

                                  <span
                                    aria-hidden="true"
                                    className="text-base font-bold leading-none text-brand/60 transition-colors group-hover:text-brand"
                                  >
                                    ×
                                  </span>
                                </button>
                              ),
                            )
                          )}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            )}
          </div>
          </aside>
        </ViewportSticky>

        {/* ================================================= */}
        {/* MAIN CONTENT                                      */}
        {/* ================================================= */}

        <section className="home-main-content flex-1 space-y-6">

          {/* NEXT FIXTURE HERO */}

          <NextFixtureHero
            game={
              next
            }
            region={
              region
            }
            getProviderIds={
              regionalProviderIds
            }
            addingToCalendar={
              Boolean(
                next &&
                addingCalendarGameId ===
                  next.id,
              )
            }
            onAddToGoogleCalendar={
              addSingleGameToGoogleCalendar
            }
            loading={
              fixtureDataLoading
            }
            emptyTitle="No upcoming fixtures"
            emptyText="There are currently no upcoming fixtures on the slate."
          />

          <div className="home-dashboard-grid">

            {/* ================================================= */}
            {/* FIXTURE TRACKER                                   */}
            {/* ================================================= */}

            <div className="home-fixture-tracker panel min-w-0 p-6">
              <div>
                <p className="eyebrow">
                  {mounted
                    ? new Date().toLocaleDateString(
                        undefined,
                        {
                          weekday:
                            "long",

                          month:
                            "long",

                          day:
                            "numeric",

                          timeZone:
                            selectedTimeZone,
                        },
                      )
                    : "Today"}
                </p>

                <h3 className="mt-1 text-2xl font-extrabold">
                  Fixture Tracker
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Browse every upcoming fixture and narrow the schedule with the filters below.
                </p>
              </div>

              {/* TRACKER FILTERS */}

              <div className="mt-5 rounded-xl border border-border/60 bg-surface-2/30 p-4">

                <div className="flex flex-col gap-3 sm:flex-row">

                  {/* ALL SPORTS */}

                  <div className="min-w-0 flex-1">
                    <SeasonCaddySelect
                      value={
                        trackerSport
                      }
                      placeholder="All Sports"
                      options={[
                        {
                          value:
                            "",
                          label:
                            "All Sports",
                        },

                        ...liveSportOptions.map(
                          (
                            item,
                          ) => ({
                            value:
                              item.id,

                            label:
                              item.name,
                          }),
                        ),
                      ]}
                      onChange={(newSport) => {
                        setTrackerSport(newSport);

                        if (
                          newSport !==
                          "soccer"
                        ) {
                          setTrackerLocation(
                            "",
                          );
                        }

                        const defaultCompetition =
                          liveCompetitionOptions
                            .filter(
                              (competition) =>
                                competition.sport === newSport &&
                                competitionSortRank(competition) === 0,
                            )
                            .sort((a, b) =>
                              a.name.localeCompare(
                                b.name,
                              ),
                            )[0];

                        setTrackerLeague(
                          defaultCompetition?.name ?? "",
                        );

                        setTrackerTeam("");
                        setSelectedProviderIds([]);
                      }}
                    
                    />
                  </div>

                  {/* SOCCER LOCATION */}

                  {isSoccerTracker && (
                    <div className="min-w-0 flex-1">
                      <SeasonCaddySelect
                        value={
                          trackerLocation
                        }
                        placeholder="All Locations"
                        options={[
                          {
                            value:
                              "",
                            label:
                              "All Locations",
                          },

                          ...trackerLocationOptions.map(
                            (
                              location,
                            ) => ({
                              value:
                                location,

                              label:
                                location,
                            }),
                          ),
                        ]}
                        onChange={(
                          newLocation,
                        ) => {
                          setTrackerLocation(
                            newLocation,
                          );

                          setTrackerLeague(
                            "",
                          );

                          setTrackerTeam(
                            "",
                          );

                          setSelectedProviderIds(
                            [],
                          );
                        }}
                      />
                    </div>
                  )}

                  {/* ALL COMPETITIONS */}

                  <div className="min-w-0 flex-1">
                    <SeasonCaddySelect
                      value={
                        trackerLeague
                      }
                      placeholder="All Competitions"
                      options={[
                        {
                          value:
                            "",
                          label:
                            "All Competitions",
                        },

                        ...trackerLeagueOptions.map(
                          (
                            item,
                          ) => ({
                            value:
                              item.name,

                            label:
                              item.name,
                          }),
                        ),
                      ]}
                      onChange={(
                        newLeague,
                      ) => {
                        setTrackerLeague(
                          newLeague,
                        );

                        setTrackerTeam(
                          "",
                        );

                        setSelectedProviderIds(
                          [],
                        );
                      }}
                    />
                  </div>

                  {/* ALL TEAMS */}

                  <div className="min-w-0 flex-1">
                    <SeasonCaddySelect
                      value={
                        trackerTeam
                      }
                      placeholder="All Teams"
                      options={[
                        {
                          value:
                            "",
                          label:
                            "All Teams",
                        },

                        ...trackerTeamOptions.map(
                          (
                            team,
                          ) => ({
                            value:
                              team,

                            label:
                              team,
                          }),
                        ),
                      ]}
                      onChange={(
                        newTeam,
                      ) => {
                        setTrackerTeam(
                          newTeam,
                        );

                        setSelectedProviderIds(
                          [],
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="home-tracker-secondary-filters mt-4 border-t border-border/50 pt-4">

                  {/* PROVIDER FILTER */}

<details className="group relative min-w-0">
  <summary className="gh-select flex min-h-10 cursor-pointer list-none items-center justify-between gap-3">
    <span className="text-foreground">
      {selectedProviderIds.length ===
      0
        ? "All Providers"
        : selectedProviderIds.length ===
            1
          ? providerById(
              selectedProviderIds[0]!,
            ).name
          : `${selectedProviderIds.length} Providers`}
    </span>

    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
  </summary>

  <div
    className="absolute left-0 top-[calc(100%+6px)] z-40 w-full min-w-[220px] overflow-hidden border shadow-xl"
    style={{
      border:
        "1px solid color-mix(in oklch, var(--brand) 22%, var(--border))",

      borderRadius:
        "12px",

      background:
        "color-mix(in oklch, var(--surface-2) 94%, var(--background))",

      boxShadow:
        "0 18px 42px oklch(0 0 0 / 0.38)",

      backdropFilter:
        "blur(18px)",
    }}
  >
    {providerFilterOptions.length ===
    0 ? (
      <p className="px-4 py-3 text-sm text-muted-foreground">
        No confirmed providers
      </p>
    ) : (
      <div className="sportstream-scrollbar max-h-64 overflow-y-auto p-1.5">
        {providerFilterOptions.map(
          (
            provider,
          ) => {
            const selected =
              selectedProviderIds.includes(
                provider.id,
              );

            return (
              <button
                key={
                  provider.id
                }
                type="button"
                onClick={() =>
                  setSelectedProviderIds(
                    (
                      current,
                    ) =>
                      current.includes(
                        provider.id,
                      )
                        ? current.filter(
                            (
                              id,
                            ) =>
                              id !==
                              provider.id,
                          )
                        : [
                            ...current,
                            provider.id,
                          ],
                  )
                }
                className={`w-full cursor-pointer rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-brand text-brand-foreground"
                    : "text-foreground hover:bg-brand/10 hover:text-brand"
                }`}
              >
                {
                  provider.name
                }
              </button>
            );
          },
        )}
      </div>
    )}

    {selectedProviderIds.length >
      0 && (
      <button
        type="button"
        onClick={() =>
          setSelectedProviderIds(
            [],
          )
        }
        className="w-full cursor-pointer border-t border-border px-4 py-2.5 text-left text-xs font-bold text-brand transition-colors hover:bg-brand/10"
      >
        Clear provider filters
      </button>
    )}
  </div>
</details>
                  {/* SAVED TEAMS FILTER */}

                  <button
                    type="button"
                    disabled={
                      !user
                    }
                    onClick={() =>
                      setOnlySavedTeams(
                        (
                          current,
                        ) =>
                          !current,
                      )
                    }
                    title={
                      user
                        ? undefined
                        : "Sign in to filter by your saved teams"
                    }
                    className={`min-h-10 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
                      !user
                        ? "cursor-not-allowed border-border/60 bg-surface-2/30 text-muted-foreground/45 opacity-60"
                        : onlySavedTeams
                          ? "cursor-pointer border-brand bg-brand text-brand-foreground"
                          : "cursor-pointer border-border bg-surface-2/60 text-muted-foreground hover:border-brand hover:text-foreground"
                    }`}
                  >
                    {onlySavedTeams
                      ? "✓ Only showing my saved teams"
                      : "Only show my saved teams"}
                  </button>

                  <button
                    type="button"
                    disabled={
                      !trackerSport &&
                      !trackerLocation &&
                      !trackerLeague &&
                      !trackerTeam &&
                      !onlySavedTeams &&
                      selectedProviderIds.length ===
                        0
                    }
                    onClick={() => {
                      setTrackerSport(
                        "",
                      );

                      setTrackerLocation(
                        "",
                      );

                      setTrackerLeague(
                        "",
                      );

                      setTrackerTeam(
                        "",
                      );

                      setOnlySavedTeams(
                        false,
                      );

                      setSelectedProviderIds(
                        [],
                      );
                    }}
                    className="min-h-10 cursor-pointer whitespace-nowrap rounded-full border border-border px-4 py-2 text-xs font-bold text-muted-foreground transition-colors hover:border-brand hover:text-foreground disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground"
                  >
                    Reset filters
                  </button>
                </div>
              </div>

              {/* FIXTURE LIST */}

              <div className="mt-6 divide-y divide-border/60">
                {visibleTrackerGames.length ===
                  0 &&
                  (fixtureDataLoading ? (
                    <div
                      className="space-y-3 py-6"
                      aria-live="polite"
                      aria-busy="true"
                    >
                      {[0, 1, 2].map((item) => (
                        <div
                          key={item}
                          className="h-16 animate-pulse rounded-xl border border-border/60 bg-surface-2/70"
                        />
                      ))}

                      <p className="pt-2 text-center text-sm font-medium text-muted-foreground">
                        Loading upcoming fixtures…
                      </p>
                    </div>
                  ) : (
                    <p className="py-10 text-center text-sm text-muted-foreground">
                      No upcoming fixtures match your current filters.
                    </p>
                  ))}

                {visibleTrackerGames.map(
                  (
                    game,
                  ) => {
                    const regionalProviderIdsForGame =
                      Array.from(
                        new Set(
                          regionalProviderIds(
                            game,
                          ),
                        ),
                      );

                    return (
                      <div
                        key={
                          game.id
                        }
                        className="home-fixture-row"
                      >
                        {/* DATE */}

                        <div className="home-fixture-date min-w-0">
                          <p className="font-display text-lg font-bold">
                            {formatTrackerDate(
                              game.kickoff,
                              game.scheduledDate,
                              game.scheduleLabel,
                              selectedTimeZone,
                            )}
                          </p>

                          <p
                            className={`mt-1 text-xs ${
                              isGameLive(
                                game,
                                fixtureNow,
                              )
                                ? "font-extrabold text-brand"
                                : "text-muted-foreground"
                            }`}
                          >
                            {isGameLive(
                              game,
                              fixtureNow,
                            )
                              ? "LIVE NOW"
                              : formatRegionalTime(
                                  game.kickoff,
                                  region,
                                )}
                          </p>
                        </div>

                        {/* FIXTURE */}

                        <div className="home-fixture-match min-w-[150px] flex-1">
  <p className="font-semibold">
    {gameDisplayTitle(
      game,
    )}
  </p>

  <p className="mt-1 text-xs text-muted-foreground">
    {game.league}
  </p>
</div>

                        {/* PROVIDERS */}

                        <div className="home-fixture-providers flex min-w-[95px] max-w-[210px] flex-[0_1_170px] flex-col gap-1 text-sm text-muted-foreground">
  {regionalProviderIdsForGame.map(
    (
      providerId,
    ) => (
      <span
        key={
          providerId
        }
        className="break-words leading-snug"
      >
        {
          providerById(
            providerId,
          ).name
        }
      </span>
    ),
  )}
</div>

                        {/* ACTIONS */}

                        <div className="home-fixture-actions flex min-w-[138px] max-w-[290px] flex-[0_1_290px] flex-wrap items-center justify-end gap-2">
                          {game.kickoff && (
                            <button
                              type="button"
                              disabled={
                                addingCalendarGameId ===
                                game.id
                              }
                              onClick={() =>
                                addSingleGameToGoogleCalendar(
                                  game,
                                )
                              }
                              className="min-w-[138px] flex-1 cursor-pointer whitespace-nowrap rounded-md border border-brand/40 bg-brand/5 px-3 py-1.5 text-center text-xs font-bold text-brand transition-colors hover:bg-brand/10 disabled:cursor-wait disabled:opacity-60"
                            >
                              {addingCalendarGameId ===
                              game.id
                                ? "Adding..."
                                : "Add to Google Calendar"}
                            </button>
                          )}

                          <Link
                            to="/game/$gameId"
                            params={{
                              gameId:
                                game.id,
                            }}
                            search={{
                              region,
                            }}
                            className="min-w-[138px] flex-1 cursor-pointer whitespace-nowrap rounded-md border border-border bg-surface-2 px-3 py-1.5 text-center text-xs font-bold transition-colors hover:border-brand"
                          >
                            View watch options
                          </Link>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            {/* ================================================= */}
            {/* RIGHT SIDEBAR                                     */}
            {/* ================================================= */}

            <ViewportSticky
              top={80}
              wrapperClassName="home-coverage-sidebar min-w-0"
              contentClassName="sportstream-scrollbar w-full"
            >

              {/* COVERAGE PLANNER */}

              <div className="panel h-fit space-y-4 p-6">
                <div>
                  <h3 className="text-xl font-extrabold">
                    Services you need
                  </h3>

                  <p className="eyebrow mt-1">
                    Coverage planner
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {neededProviders.length}{" "}
                  service
                  {neededProviders.length ===
                  1
                    ? ""
                    : "s"}{" "}
                  cover these games.
                </p>

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

                <div className="space-y-3 border-t border-border/60 pt-4">
                  <p className="text-xs font-bold tracking-wide text-muted-foreground">
                    Services for these games
                  </p>

                  {unsubscribedProviders.length ===
                  0 ? (
                    <p className="text-sm text-muted-foreground">
                      You're subscribed to all services needed for these games.
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

                          <div className="flex items-center justify-between gap-4">
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

            </ViewportSticky>
          </div>
        </section>
      </main>
    </Shell>
  );
}

/* ====================================================== */
/* FIELD                                                  */
/* ====================================================== */

function Field({
  label,
  children,
}: {
  label: string;

  children:
    React.ReactNode;
}) {
  return (
    <div className="block space-y-2">
      <span className="block text-xs font-bold tracking-wide text-muted-foreground">
        {label}
      </span>

      {children}
    </div>
  );
}

/* ====================================================== */
/* TRACKER DATE                                           */
/* ====================================================== */

function formatTrackerDate(
  kickoff:
    | string
    | null,

  scheduledDate?:
    string,

  scheduleLabel?:
    string,

  timeZone?:
    string,
) {
  if (
    !kickoff &&
    !scheduledDate
  ) {
    return (
      scheduleLabel ??
      "Date TBD"
    );
  }

  const date =
    kickoff
      ? new Date(
          kickoff,
        )
      : new Date(
          `${scheduledDate}T12:00:00`,
        );

  const weekday =
    new Intl.DateTimeFormat(
      "en-US",
      {
        weekday:
          "short",

        timeZone,
      },
    ).format(
      date,
    );

  const month =
    new Intl.DateTimeFormat(
      "en-US",
      {
        month:
          "short",

        timeZone,
      },
    ).format(
      date,
    );

  const day =
    Number(
      new Intl.DateTimeFormat(
        "en-US",
        {
          day:
            "numeric",

          timeZone,
        },
      ).format(
        date,
      ),
    );

  return `${weekday}, ${month} ${day}${ordinalSuffix(
    day,
  )}`;
}

function ordinalSuffix(
  day: number,
) {
  if (
    day >=
      11 &&
    day <=
      13
  ) {
    return "th";
  }

  switch (
    day %
    10
  ) {
    case 1:
      return "st";

    case 2:
      return "nd";

    case 3:
      return "rd";

    default:
      return "th";
  }
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

/* ====================================================== */
/* CLOUDFLARE OPTION HELPERS                              */
/* ====================================================== */

function normalizeCloudflareOptionValue(
  value: string,
) {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[_\s]+/g,
      "-",
    )
    .replace(
      /-+/g,
      "-",
    );
}

function formatCloudflareOptionLabel(
  value: string,
) {
  const normalizedValue =
    value
      .trim()
      .toLowerCase();

  if (
    normalizedValue === "mma"
  ) {
    return "MMA";
  }

  if (
    normalizedValue === "afl"
  ) {
    return "AFL";
  }

  return value
    .replace(
      /[-_]+/g,
      " ",
    )
    .replace(
      /\b\w/g,
      (
        character,
      ) =>
        character.toUpperCase(),
    );
}

/* ====================================================== */
/* PROVIDER HELPERS                                       */
/* ====================================================== */

function isPendingProviderId(
  providerId: string,
) {
  const normalized =
    providerId
      .trim()
      .toLowerCase()
      .replace(
        /[_\s]+/g,
        "-",
      );

  const resolvedProviderId =
    providerById(
      providerId,
    ).id
      .trim()
      .toLowerCase()
      .replace(
        /[_\s]+/g,
        "-",
      );

  return (
    normalized ===
      "tbd" ||
    normalized ===
      "pending" ||
    normalized ===
      "provider-pending" ||
    normalized ===
      "broadcast-pending" ||
    normalized ===
      "not-live-uk" ||
    resolvedProviderId ===
      "tbd" ||
    resolvedProviderId ===
      "pending" ||
    resolvedProviderId ===
      "provider-pending" ||
    resolvedProviderId ===
      "broadcast-pending" ||
    resolvedProviderId ===
      "not-live-uk"
  );
}

/* ====================================================== */
/* REGION HELPERS                                         */
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

