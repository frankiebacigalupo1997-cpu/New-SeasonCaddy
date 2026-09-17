import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock3,
  Tv,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import {
  fetchPreferences,
} from "@/lib/gamehub-cloud";

import {
  formatRegionalTime,
  gameLiveEndTime,
  providerById,
  timeZoneForRegion,
  type Game,
} from "@/lib/gamehub-data";

import {
  useSavedTeamsDataset,
} from "@/hooks/useSeasonCaddyData";

import {
  googleCalendarApiFetch,
  startGoogleCalendarOAuth,
} from "@/lib/google-calendar-api";

import {
  useAuth,
} from "@/hooks/useAuth";

const SESSION_REGION_KEY =
  "sportstream-region";

export const Route =
  createFileRoute(
    "/my-caddy/calendar",
  )({
    component:
      CalendarPage,
  });

function CalendarPage() {
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
  /* GOOGLE CALENDAR                                      */
  /* ==================================================== */

  const [
    googleCalendarSyncStatus,
    setGoogleCalendarSyncStatus,
  ] = useState<
    | "idle"
    | "syncing"
    | "synced"
  >("idle");

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
  /* GOOGLE CALENDAR STATUS                               */
  /* ==================================================== */

  useEffect(() => {
    let cancelled =
      false;

    async function loadGoogleCalendarStatus() {
      try {
        const response =
          await googleCalendarApiFetch(
            "/google/status",
          );

        const status =
          await response.json();

        if (
          cancelled ||
          !response.ok ||
          !status.success
        ) {
          return;
        }

        if (
          status.connected &&
          status.lastSyncedAt
        ) {
          setGoogleCalendarSyncStatus(
            "synced",
          );
        } else {
          setGoogleCalendarSyncStatus(
            "idle",
          );
        }
      } catch (
        error
      ) {
        console.error(
          "Could not load Google Calendar status",
          error,
        );

        if (
          !cancelled
        ) {
          setGoogleCalendarSyncStatus(
            "idle",
          );
        }
      }
    }

    loadGoogleCalendarStatus();

    return () => {
      cancelled =
        true;
    };
  }, []);

  /* ==================================================== */
  /* KEEP REGION IN SYNC                                  */
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

      /*
       * Silently migrate any old values such as:
       *
       * United States · Eastern
       * United States · Central
       * United States · Pacific
       */
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
  /* LOAD PREFERENCES                                     */
  /* ==================================================== */

  useEffect(() => {
    let cancelled =
      false;

    async function loadPreferences() {
      if (
        !user
      ) {
        if (
          !cancelled
        ) {
          setSavedLeagues(
            {},
          );

          setPreferencesLoaded(
            true,
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

        if (
          !prefs
        ) {
          setSavedLeagues(
            {},
          );

          setPreferencesLoaded(
            true,
          );

          return;
        }

        setSavedLeagues(
          prefs.saved_leagues ??
            {
              [prefs.league_id]:
                prefs.teams,
            },
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

          setPreferencesLoaded(
            true,
          );
        }
      }
    }

    loadPreferences();

    return () => {
      cancelled =
        true;
    };
  }, [
    user?.id,
  ]);

  /* ==================================================== */
  /* COMPLETE GAME DATA                                   */
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
        .sort(
          sortGamesByDate,
        );
    }, [
      appGames,
      savedLeagues,
    ]);

  /* ==================================================== */
  /* GOOGLE CALENDAR SYNC                                 */
  /* ==================================================== */

  async function syncWithGoogleCalendar() {
    const savedTeamCount =
      Object.values(
        savedLeagues,
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
      0
    ) {
      toast.error(
        "Save at least one team first",
      );

      return;
    }

    if (
      googleCalendarSyncStatus ===
      "syncing"
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

        await startGoogleCalendarOAuth(
          normalizeRegion(
            region,
          ),
          "/my-caddy/calendar",
        );

        return;
      }

      const syncEvents =
        savedGames
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
  /* PROVIDER LOOKUP                                      */
  /* ==================================================== */

  function regionalProviderIds(
    game: Game,
  ) {
    const broadcastRegion =
      region === "United Kingdom" ||
      region === "United States" ||
      region === "Canada"
        ? region
        : null;

    if (!broadcastRegion) return ["tbd"];

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

  return (
    <div>
      {/* ================================================= */}
      {/* PAGE HEADER                                       */}
      {/* ================================================= */}

      <div className="my-calendar-page-header">

        {/* TITLE */}

        <div
          style={{
            minWidth:
              0,
          }}
        >
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
            My Calendar
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
            All your saved teams and fixtures in one place.
          </p>
        </div>

        {/* GOOGLE CALENDAR SYNC */}

        <div className="my-calendar-sync-card">

          <div
            style={{
              fontSize:
                "15px",

              fontWeight:
                800,
            }}
          >
            Calendar Sync
          </div>

          <p
            className="text-muted-foreground"
            style={{
              margin:
                "5px 0 11px",

              fontSize:
                "11px",

              lineHeight:
                1.45,
            }}
          >
            Keep your saved teams synced with Google Calendar.
          </p>

          <button
            type="button"
            onClick={
              syncWithGoogleCalendar
            }
            disabled={
              googleCalendarSyncStatus ===
              "syncing"
            }
            style={{
              width:
                "100%",

              minHeight:
                "38px",

              borderRadius:
                "8px",

              border:
                "1px solid color-mix(in oklch, var(--brand) 45%, var(--border))",

              background:
                "color-mix(in oklch, var(--brand) 7%, transparent)",

              color:
                "var(--brand)",

              fontSize:
                "12px",

              fontWeight:
                750,

              cursor:
                googleCalendarSyncStatus ===
                "syncing"
                  ? "wait"
                  : "pointer",

              opacity:
                googleCalendarSyncStatus ===
                "syncing"
                  ? 0.72
                  : 1,
            }}
          >
            {googleCalendarSyncStatus ===
            "syncing"
              ? "Syncing with your Google Calendar"
              : googleCalendarSyncStatus ===
                  "synced"
                ? "Synced with your Google Calendar"
                : "Sync with Google Calendar"}
          </button>
        </div>
      </div>

      {!preferencesLoaded ? (
        <CalendarLoading />
      ) : (
        <CalendarPanel
          games={
            savedGames
          }
          region={
            region
          }
          getProviderIds={
            regionalProviderIds
          }
        />
      )}
    </div>
  );
}

/* ====================================================== */
/* CALENDAR                                               */
/* ====================================================== */

function CalendarPanel({
  games,
  region,
  getProviderIds,
}: {
  games: Game[];

  region: string;

  getProviderIds: (
    game: Game,
  ) => string[];
}) {
  const today =
    todayForRegion(
      region,
    );

  const [
    currentDate,
    setCurrentDate,
  ] = useState(
    new Date(
      today.year,
      today.month - 1,
      1,
    ),
  );

  const [
    view,
    setView,
  ] = useState<
    "month" | "list"
  >("month");

  const [
    expandedDays,
    setExpandedDays,
  ] = useState<Set<string>>(
    () => new Set(),
  );

  const monthLabel =
    currentDate.toLocaleDateString(
      "en-US",
      {
        month:
          "long",

        year:
          "numeric",
      },
    );

  const calendarDays =
    useMemo(() => {
      const year =
        currentDate.getFullYear();

      const month =
        currentDate.getMonth();

      const firstDay =
        new Date(
          year,
          month,
          1,
        ).getDay();

      const daysInMonth =
        new Date(
          year,
          month +
            1,
          0,
        ).getDate();

      const daysInPreviousMonth =
        new Date(
          year,
          month,
          0,
        ).getDate();

      const days: {
        day: number;
        currentMonth: boolean;
        dateKey: string;
      }[] = [];

      for (
        let i =
          firstDay -
          1;
        i >=
        0;
        i--
      ) {
        const day =
          daysInPreviousMonth -
          i;

        const date =
          new Date(
            year,
            month -
              1,
            day,
          );

        days.push({
          day,

          currentMonth:
            false,

          dateKey:
            formatDateKey(
              date,
            ),
        });
      }

      for (
        let day =
          1;
        day <=
        daysInMonth;
        day++
      ) {
        const date =
          new Date(
            year,
            month,
            day,
          );

        days.push({
          day,

          currentMonth:
            true,

          dateKey:
            formatDateKey(
              date,
            ),
        });
      }

      let nextDay =
        1;

      while (
        days.length <
        42
      ) {
        const date =
          new Date(
            year,
            month +
              1,
            nextDay,
          );

        days.push({
          day:
            nextDay,

          currentMonth:
            false,

          dateKey:
            formatDateKey(
              date,
            ),
        });

        nextDay++;
      }

      return days;
    }, [
      currentDate,
    ]);

  const gamesByDate =
    useMemo(() => {
      const grouped: Record<
        string,
        Game[]
      > = {};

      for (
        const game of
        games
      ) {
        const key =
          gameDateKeyForRegion(
            game,
            region,
          );

        if (
          !key
        ) {
          continue;
        }

        if (
          !grouped[
            key
          ]
        ) {
          grouped[
            key
          ] = [];
        }

        grouped[
          key
        ]!.push(
          game,
        );
      }

      Object.values(
        grouped,
      ).forEach(
        (dayGames) => {
          dayGames.sort(
            sortGamesByDate,
          );
        },
      );

      return grouped;
    }, [
      games,
      region,
    ]);

  function toggleDayExpansion(
    dateKey: string,
  ) {
    setExpandedDays(
      (current) => {
        const next =
          new Set(
            current,
          );

        if (
          next.has(
            dateKey,
          )
        ) {
          next.delete(
            dateKey,
          );
        } else {
          next.add(
            dateKey,
          );
        }

        return next;
      },
    );
  }

  function previousMonth() {
    setExpandedDays(
      new Set(),
    );

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() -
          1,
        1,
      ),
    );
  }

  function nextMonth() {
    setExpandedDays(
      new Set(),
    );

    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() +
          1,
        1,
      ),
    );
  }

  function goToToday() {
    setExpandedDays(
      new Set(),
    );

    const today =
      todayForRegion(
        region,
      );

    setCurrentDate(
      new Date(
        today.year,
        today.month -
          1,
        1,
      ),
    );
  }

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
      {/* CALENDAR HEADER */}

      <div className="my-calendar-panel-header">

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            gap:
              "8px",
          }}
        >
          <button
            type="button"
            aria-label="Previous month"
            onClick={
              previousMonth
            }
            style={
              calendarControlStyle
            }
          >
            <ChevronLeft
              size={
                17
              }
            />
          </button>

          <button
            type="button"
            onClick={
              goToToday
            }
            style={{
              ...calendarControlStyle,

              width:
                "auto",

              padding:
                "0 12px",

              fontSize:
                "12px",

              fontWeight:
                700,
            }}
          >
            Today
          </button>

          <button
            type="button"
            aria-label="Next month"
            onClick={
              nextMonth
            }
            style={
              calendarControlStyle
            }
          >
            <ChevronRight
              size={
                17
              }
            />
          </button>
        </div>

        <div
          style={{
            fontSize:
              "16px",

            fontWeight:
              750,
          }}
        >
          {
            monthLabel
          }
        </div>

        <div
          style={{
            display:
              "flex",

            alignItems:
              "center",

            padding:
              "3px",

            borderRadius:
              "9px",

            border:
              "1px solid var(--border)",

            background:
              "color-mix(in oklch, var(--surface-2) 75%, transparent)",
          }}
        >
          <CalendarViewButton
            label="Month"
            active={
              view ===
              "month"
            }
            onClick={() =>
              setView(
                "month",
              )
            }
          />

          <CalendarViewButton
            label="List"
            active={
              view ===
              "list"
            }
            onClick={() =>
              setView(
                "list",
              )
            }
          />
        </div>
      </div>

      {/* MONTH VIEW */}

{view ===
  "month" && (
  <div className="my-calendar-month-view">
    {/* WEEKDAY HEADERS */}

    <div className="my-calendar-weekdays">
      {[
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ].map(
        (
          day,
        ) => (
          <div
            key={
              day
            }
            className="my-calendar-weekday text-muted-foreground"
          >
            {
              day
            }
          </div>
        ),
      )}
    </div>

    {/* CALENDAR GRID */}

    <div className="my-calendar-grid">
      {calendarDays.map(
        (
          calendarDay,
          index,
        ) => {
          const dayGames =
            gamesByDate[
              calendarDay.dateKey
            ] ?? [];

          const isExpanded =
            expandedDays.has(
              calendarDay.dateKey,
            );

          const hiddenCount =
            Math.max(
              0,
              dayGames.length -
                2,
            );

          const visibleGames =
            isExpanded
              ? dayGames
              : dayGames.slice(
                  0,
                  2,
                );

          const isToday =
            calendarDay.dateKey ===
            today.dateKey;

          const weekStart =
            Math.floor(
              index / 7,
            ) * 7;

          const isWeekExpanded =
            calendarDays
              .slice(
                weekStart,
                weekStart + 7,
              )
              .some((day) =>
                expandedDays.has(
                  day.dateKey,
                ),
              );

          const dayClassName = [
            "my-calendar-day",
            !calendarDay.currentMonth
              ? "my-calendar-day--outside"
              : "",
            isToday
              ? "my-calendar-day--today"
              : "",
            isWeekExpanded
              ? "my-calendar-day--week-expanded"
              : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={`${calendarDay.dateKey}-${index}`}
              className={
                dayClassName
              }
            >
              <div className="my-calendar-day-header">
                <span
                  className={[
                    "my-calendar-day-number",
                    !calendarDay.currentMonth
                      ? "text-muted-foreground"
                      : "",
                    isToday
                      ? "my-calendar-day-number--today"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {
                    calendarDay.day
                  }
                </span>

              </div>

              <div className="my-calendar-fixtures">
                {visibleGames.map(
                  (game) => (
                    <CalendarGameChip
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
                    />
                  ),
                )}

                {hiddenCount >
                  0 && (
                  <button
                    type="button"
                    aria-expanded={
                      isExpanded
                    }
                    onClick={() =>
                      toggleDayExpansion(
                        calendarDay.dateKey,
                      )
                    }
                    className={[
                      "my-calendar-more-button",
                      isExpanded
                        ? "my-calendar-more-button--expanded"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span>
                      {isExpanded
                        ? "Show less"
                        : `+${hiddenCount} more ${hiddenCount === 1 ? "fixture" : "fixtures"}`}
                    </span>

                    {isExpanded ? (
                      <ChevronUp
                        size={12}
                      />
                    ) : (
                      <ChevronDown
                        size={12}
                      />
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        },
      )}
    </div>

    {games.length ===
      0 && (
      <CalendarEmptyView
        title="No saved-team fixtures"
        text="Save teams in My Teams & Leagues and their stored fixtures will appear here."
      />
    )}
  </div>
)}

      {/* LIST VIEW */}

      {view ===
        "list" && (
        <CalendarListView
          games={
            games
          }
          region={
            region
          }
          getProviderIds={
            getProviderIds
          }
        />
      )}
    </div>
  );
}

/* ====================================================== */
/* CALENDAR GAME CHIP                                     */
/* ====================================================== */

function CalendarGameChip({
  game,
  region,
  getProviderIds,
}: {
  game: Game;

  region: string;

  getProviderIds: (
    game: Game,
  ) => string[];
}) {
  const providers =
    getProviderIds(
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
        Boolean,
      );

  /*
   * United States:
   * 10:00 AM ET / 7:00 AM PT
   *
   * Canada:
   * 10:00 AM ET / 7:00 AM PT
   *
   * United Kingdom:
   * 3:00 PM
   */
  const kickoffTime =
    formatRegionalTime(
      game.kickoff,
      region,
    );

  // Treat the fixture as concluded when the backend explicitly marks it
  // Final OR when its provider end time / sport-specific live window has
  // elapsed. This keeps in-progress games bright after kickoff, while stale
  // scheduled statuses from previous days no longer look live forever.
  const liveEndTime =
    gameLiveEndTime(
      game,
    );

  const isFinished =
    game.status ===
      "Final" ||
    (liveEndTime !==
      null &&
      Date.now() >=
        liveEndTime);

  return (
    <Link
      to="/game/$gameId"
      params={{
        gameId:
          game.id,
      }}
      search={{
        region,
      }}
      title={`${game.home} vs ${game.away}`}
      className={[
        "my-calendar-game-chip",
        isFinished
          ? "my-calendar-game-chip--past"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="my-calendar-game-title">
        {game.home} vs{" "}
        {game.away}
      </div>

      <div className="my-calendar-game-time">
        {
          kickoffTime
        }
      </div>

      <div className="my-calendar-game-provider">
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
                " · ",
              )
          : "Broadcast TBD"}
      </div>
    </Link>
  );

}

/* ====================================================== */
/* LIST VIEW                                              */
/* ====================================================== */

function CalendarListView({
  games,
  region,
  getProviderIds,
}: {
  games: Game[];

  region: string;

  getProviderIds: (
    game: Game,
  ) => string[];
}) {
  if (
    games.length ===
    0
  ) {
    return (
      <CalendarEmptyView
        title="No saved-team fixtures"
        text="Save teams in My Teams & Leagues and their stored fixtures will appear here."
      />
    );
  }

  return (
    <div
      style={{
        padding:
          "0 18px 18px",
      }}
    >
      {games.map(
        (
          game,
          index,
        ) => (
          <CalendarListRow
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
              games.length -
                1
            }
          />
        ),
      )}
    </div>
  );
}

/* ====================================================== */
/* LIST ROW                                               */
/* ====================================================== */

function CalendarListRow({
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
  const providers =
    getProviderIds(
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
        Boolean,
      );

  const dateText =
    formatGameDateForRegion(
      game,
      region,
    );

  const timeText =
    formatRegionalTime(
      game.kickoff,
      region,
    );

  return (
    <Link
  to="/game/$gameId"
  params={{
    gameId:
      game.id,
  }}
  search={{
    region,
  }}
  className="my-calendar-list-row"
  style={{
    borderBottom:
      last
        ? "none"
        : "1px solid var(--border)",

    color:
      "inherit",

    textDecoration:
      "none",
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
            }}
          />

          {
            timeText
          }
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

            whiteSpace:
              "nowrap",

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
          display:
            "flex",

          alignItems:
            "center",

          justifyContent:
            "flex-end",

          gap:
            "6px",

          minWidth:
            0,
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
            : "TBD"}
        </span>
      </div>
    </Link>
  );
}

/* ====================================================== */
/* VIEW BUTTON                                            */
/* ====================================================== */

function CalendarViewButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      style={{
        border:
          0,

        padding:
          "6px 10px",

        borderRadius:
          "6px",

        background:
          active
            ? "var(--brand)"
            : "transparent",

        color:
          active
            ? "var(--brand-foreground)"
            : "var(--muted-foreground)",

        fontSize:
          "11px",

        fontWeight:
          700,

        cursor:
          "pointer",
      }}
    >
      {
        label
      }
    </button>
  );
}

/* ====================================================== */
/* EMPTY STATE                                            */
/* ====================================================== */

function CalendarEmptyView({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div
      style={{
        minHeight:
          "360px",

        display:
          "grid",

        placeItems:
          "center",

        padding:
          "30px",
      }}
    >
      <div
        style={{
          maxWidth:
            "340px",

          textAlign:
            "center",
        }}
      >
        <CalendarDays
          size={
            30
          }
          style={{
            margin:
              "0 auto 12px",

            color:
              "var(--brand)",
          }}
        />

        <div
          style={{
            fontSize:
              "15px",

            fontWeight:
              750,
          }}
        >
          {
            title
          }
        </div>

        <p
          className="text-muted-foreground"
          style={{
            margin:
              "6px 0 0",

            fontSize:
              "12px",

            lineHeight:
              1.5,
          }}
        >
          {
            text
          }
        </p>
      </div>
    </div>
  );
}

/* ====================================================== */
/* LOADING                                                */
/* ====================================================== */

function CalendarLoading() {
  return (
    <div
      style={{
        minHeight:
          "460px",

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
        className="text-muted-foreground"
        style={{
          display:
            "flex",

          alignItems:
            "center",

          gap:
            "9px",

          fontSize:
            "13px",

          fontWeight:
            650,
        }}
      >
        <CalendarDays
          size={
            18
          }
        />

        Loading your calendar…
      </div>
    </div>
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

/* ====================================================== */
/* DATE HELPERS                                           */
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

/*
 * United States and Canada both use an
 * Eastern-Time calendar day.
 *
 * United Kingdom uses Europe/London.
 *
 * This means a U.S./Canadian fixture is placed
 * on one consistent calendar date even though
 * its visible time contains both ET and PT.
 */
function todayForRegion(
  region: string,
) {
  const normalizedRegion =
    normalizeRegion(
      region,
    );

  const parts =
    new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone:
          timeZoneForCalendarRegion(
            normalizedRegion,
          ),

        year:
          "numeric",

        month:
          "2-digit",

        day:
          "2-digit",
      },
    ).formatToParts(
      new Date(),
    );

  const year =
    Number(
      parts.find(
        (
          part,
        ) =>
          part.type ===
          "year",
      )?.value,
    );

  const month =
    Number(
      parts.find(
        (
          part,
        ) =>
          part.type ===
          "month",
      )?.value,
    );

  const day =
    Number(
      parts.find(
        (
          part,
        ) =>
          part.type ===
          "day",
      )?.value,
    );

  return {
    year,
    month,
    day,

    dateKey:
      `${String(
        year,
      ).padStart(
        4,
        "0",
      )}-${String(
        month,
      ).padStart(
        2,
        "0",
      )}-${String(
        day,
      ).padStart(
        2,
        "0",
      )}`,
  };
}

function gameDateKeyForRegion(
  game: Game,
  region: string,
) {
  if (
    game.kickoff
  ) {
    const date =
      new Date(
        game.kickoff,
      );

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return null;
    }

    const parts =
      new Intl.DateTimeFormat(
        "en-US",
        {
          timeZone:
            timeZoneForCalendarRegion(
              region,
            ),

          year:
            "numeric",

          month:
            "2-digit",

          day:
            "2-digit",
        },
      ).formatToParts(
        date,
      );

    const year =
      parts.find(
        (
          part,
        ) =>
          part.type ===
          "year",
      )?.value;

    const month =
      parts.find(
        (
          part,
        ) =>
          part.type ===
          "month",
      )?.value;

    const day =
      parts.find(
        (
          part,
        ) =>
          part.type ===
          "day",
      )?.value;

    if (
      !year ||
      !month ||
      !day
    ) {
      return null;
    }

    return `${year}-${month}-${day}`;
  }

  /*
   * A scheduledDate already represents an
   * explicit calendar date, so do not convert
   * it through the browser's timezone.
   */
  if (
    game.scheduledDate
  ) {
    return game.scheduledDate;
  }

  return null;
}

function formatGameDateForRegion(
  game: Game,
  region: string,
) {
  /*
   * Keep date-only fixtures exactly on their
   * supplied scheduled date.
   */
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
            timeZoneForCalendarRegion(
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

function timeZoneForCalendarRegion(
  region: string,
) {
  const normalizedRegion =
    normalizeRegion(
      region,
    );

  /*
   * ET is the canonical calendar day for
   * both the United States and Canada.
   */
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

function formatDateKey(
  date: Date,
) {
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() +
        1,
    ).padStart(
      2,
      "0",
    );

  const day =
    String(
      date.getDate(),
    ).padStart(
      2,
      "0",
    );

  return `${year}-${month}-${day}`;
}

/* ====================================================== */
/* CONTROL STYLE                                          */
/* ====================================================== */

const calendarControlStyle = {
  width:
    "34px",

  height:
    "34px",

  display:
    "grid",

  placeItems:
    "center",

  borderRadius:
    "8px",

  border:
    "1px solid var(--border)",

  background:
    "color-mix(in oklch, var(--surface-2) 75%, transparent)",

  color:
    "var(--foreground)",

  cursor:
    "pointer",
} as const;
