import {
  Link,
} from "@tanstack/react-router";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  formatRegionalTime,
  gameDisplayTitle,
  gameLiveEndTime,
  timeZoneForRegion,
  type Game,
} from "@/lib/gamehub-data";

export function CompactCalendar({
  games,
  region,
}: {
  games: Game[];
  region: string;
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
      today.day,
    ),
  );

  const rangeLabel =
    useMemo(() => {
      const start =
        startOfWeek(
          currentDate,
        );

      const end =
        new Date(
          start,
        );

      end.setDate(
        start.getDate() +
          27,
      );

      const sameMonth =
        start.getMonth() ===
          end.getMonth() &&
        start.getFullYear() ===
          end.getFullYear();

      if (
        sameMonth
      ) {
        return start.toLocaleDateString(
          "en-US",
          {
            month:
              "long",

            year:
              "numeric",
          },
        );
      }

      const sameYear =
        start.getFullYear() ===
        end.getFullYear();

      if (
        sameYear
      ) {
        const startMonth =
          start.toLocaleDateString(
            "en-US",
            {
              month:
                "short",
            },
          );

        const endMonth =
          end.toLocaleDateString(
            "en-US",
            {
              month:
                "short",

              year:
                "numeric",
            },
          );

        return `${startMonth} – ${endMonth}`;
      }

      return `${start.toLocaleDateString(
        "en-US",
        {
          month:
            "short",

          year:
            "numeric",
        },
      )} – ${end.toLocaleDateString(
        "en-US",
        {
          month:
            "short",

          year:
            "numeric",
        },
      )}`;
    }, [
      currentDate,
    ]);

  const calendarDays =
    useMemo(() => {
      const startDate =
        startOfWeek(
          currentDate,
        );

      const days: {
        day: number;
        dateKey: string;
        date: Date;
      }[] = [];

      for (
        let i = 0;
        i < 28;
        i++
      ) {
        const date =
          new Date(
            startDate,
          );

        date.setDate(
          startDate.getDate() +
            i,
        );

        days.push({
          day:
            date.getDate(),

          dateKey:
            formatDateKey(
              date,
            ),

          date,
        });
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

      return grouped;
    }, [
      games,
      region,
    ]);

  function previousRange() {
    const previousDate =
      new Date(
        currentDate,
      );

    previousDate.setDate(
      currentDate.getDate() -
        28,
    );

    setCurrentDate(
      previousDate,
    );
  }

  function nextRange() {
    const nextDate =
      new Date(
        currentDate,
      );

    nextDate.setDate(
      currentDate.getDate() +
        28,
    );

    setCurrentDate(
      nextDate,
    );
  }

  function goToToday() {
    const today =
      todayForRegion(
        region,
      );

    setCurrentDate(
      new Date(
        today.year,
        today.month - 1,
        today.day,
      ),
    );
  }

  return (
    <div className="compact-caddy-calendar">
      {/* HEADER */}

      <div className="compact-caddy-calendar-header">
        <div>
          <h2 className="m-0 text-lg font-extrabold">
            My Calendar
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your saved-team fixtures
          </p>
        </div>

        <Link
          to="/my-caddy/calendar"
          className="shrink-0 text-xs font-bold text-brand"
        >
          View full calendar
        </Link>
      </div>

      {/* RANGE CONTROLS */}

      <div className="compact-caddy-calendar-controls">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous four weeks"
            onClick={
              previousRange
            }
            className="compact-calendar-control"
          >
            <ChevronLeft
              size={
                16
              }
            />
          </button>

          <button
            type="button"
            onClick={
              goToToday
            }
            className="compact-calendar-today"
          >
            Today
          </button>

          <button
            type="button"
            aria-label="Next four weeks"
            onClick={
              nextRange
            }
            className="compact-calendar-control"
          >
            <ChevronRight
              size={
                16
              }
            />
          </button>
        </div>

        <div className="text-sm font-bold">
          {
            rangeLabel
          }
        </div>
      </div>

      {/* WEEKDAY HEADERS */}

      <div className="compact-calendar-weekdays">
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
            >
              {
                day
              }
            </div>
          ),
        )}
      </div>

      {/* FOUR-WEEK GRID */}

      <div className="compact-calendar-grid">
        {calendarDays.map(
          (
            calendarDay,
          ) => {
            const dayGames =
              [
                ...(gamesByDate[
                  calendarDay.dateKey
                ] ?? []),
              ].sort(
                (a, b) =>
                  new Date(
                    a.kickoff,
                  ).getTime() -
                  new Date(
                    b.kickoff,
                  ).getTime(),
              );

            const isToday =
              calendarDay.dateKey ===
              todayForRegion(
                region,
              ).dateKey;

            return (
              <div
                key={
                  calendarDay.dateKey
                }
                className="compact-calendar-day"
              >
                <div className="compact-calendar-day-header">
                  <span
                    className={
                      isToday
                        ? "compact-calendar-today-number"
                        : "compact-calendar-day-number"
                    }
                  >
                    {
                      calendarDay.day
                    }
                  </span>
                </div>

                <div className="compact-calendar-fixtures">
                  {dayGames
                    .slice(
                      0,
                      1,
                    )
                    .map(
                      (
                        game,
                      ) => {
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
                            key={
                              game.id
                            }
                            to="/game/$gameId"
                            params={{
                              gameId:
                                game.id,
                            }}
                            search={{
                              region,
                            }}
                            title={gameDisplayTitle(game)}
                            className={[
                              "compact-calendar-game",
                              isFinished
                                ? "compact-calendar-game--past"
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            <div className="compact-calendar-game-title">
                              {gameDisplayTitle(game)}
                            </div>

                            <div className="compact-calendar-game-time">
                              {formatRegionalTime(
                                game.kickoff,
                                region,
                              )}
                            </div>
                          </Link>
                        );
                      },
                    )}

                  {dayGames.length >
                    1 && (
                    <div
                      className="compact-calendar-more-count"
                      title={`${dayGames.length - 1} more fixtures`}
                    >
                      +
                      {dayGames.length -
                        1}{" "}
                      more fixtures
                    </div>
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>

      {games.length ===
        0 && (
        <div className="px-5 py-8 text-center text-sm text-muted-foreground">
          Save teams and their upcoming fixtures will appear here.
        </div>
      )}
    </div>
  );
}

/* ====================================================== */
/* DATE HELPERS                                           */
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

function timeZoneForCalendarRegion(
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

function todayForRegion(
  region: string,
) {
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

function startOfWeek(
  date: Date,
) {
  const start =
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

  start.setDate(
    start.getDate() -
      start.getDay(),
  );

  return start;
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

  if (
    game.scheduledDate
  ) {
    return game.scheduledDate;
  }

  return null;
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
