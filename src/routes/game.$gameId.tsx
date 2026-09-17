import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";

import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Shell } from "@/components/gamehub/Shell";

import { googleCalendarUrl } from "@/lib/calendar";

import {
  formatKickoff,
  formatRegionalTime,
  gameDisplayTitle,
  getProviderIdsForGame,
  heroCompetitors,
  heroDisplayTitle,
  hideHeroCompetitorArtwork,
  isEventTitleOnlyGame,
  isGameLive,
  providerById,
  timeZoneForRegion,
} from "@/lib/gamehub-data";

import {
  fetchDatasetForGame,
} from "@/lib/frontend-data";

import {
  fetchPreferences,
} from "@/lib/gamehub-cloud";

import { getTeamArtwork } from "@/lib/team-artwork";

import { getSportHeroStyle } from "@/lib/hero-background";

import {
  LiveCountdown,
  useGameTimingBoundary,
} from "@/components/gamehub/GameTiming";

export const Route =
  createFileRoute(
    "/game/$gameId",
  )({
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

    loader: async ({
      params,
    }) => {
      const dataset = await fetchDatasetForGame(params.gameId).catch((error) => {
        console.error("Could not load fixture data", error);
        return null;
      });

      const liveGame = dataset?.games[0];

      if (liveGame) {
        return {
          game: liveGame,
          broadcasts: dataset?.broadcasts ?? [],
        };
      }

      throw notFound();
    },

    head: ({
      loaderData,
    }) => {
      if (
        !loaderData
      ) {
        return {
          meta: [
            {
              title:
                "Game unavailable — SeasonCaddy",
            },
            {
              name:
                "robots",
              content:
                "noindex",
            },
          ],
        };
      }

      const {
        game,
      } =
        loaderData;

      const eventTitleOnly =
        isEventTitleOnlyGame(
          game,
        );

      const title =
        `${gameDisplayTitle(game)} — SeasonCaddy`;

      const description =
        `${game.league} ${eventTitleOnly ? "event" : "fixture"} and regional viewing options.`;

      return {
        meta: [
          {
            title,
          },
          {
            name:
              "description",
            content:
              description,
          },
          {
            property:
              "og:title",
            content:
              title,
          },
          {
            property:
              "og:description",
            content:
              description,
          },
        ],
      };
    },

    errorComponent:
      () => (
        <Shell>
          <div className="mx-auto max-w-md px-4 py-24 text-center">
            <h1 className="text-2xl font-extrabold">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm text-muted-foreground">
              SeasonCaddy could not load this game.
            </p>

            <Link
              to="/"
              className="mt-4 inline-block font-bold text-brand hover:underline"
            >
              Back
            </Link>
          </div>
        </Shell>
      ),

    notFoundComponent:
      () => (
        <Shell>
          <div className="mx-auto max-w-md px-4 py-24 text-center">
            <h1 className="text-2xl font-extrabold">
              Game not found
            </h1>

            <Link
              to="/"
              className="mt-4 inline-block font-bold text-brand hover:underline"
            >
              Back
            </Link>
          </div>
        </Shell>
      ),

    component:
      GamePage,
  });

function GamePage() {
  const {
    game,
    broadcasts: liveBroadcasts,
  } =
    Route.useLoaderData();

  const search =
    Route.useSearch();

  const [
    region,
    setRegion,
  ] =
    useState(
      normalizeRegion(
        search.region ??
          "United States",
      ),
    );

  useEffect(() => {
    let cancelled =
      false;

    async function loadPreferences() {
      try {
        const preferences =
          await fetchPreferences();

        if (
          !cancelled &&
          !search.region &&
          preferences?.region
        ) {
          setRegion(
            normalizeRegion(
              preferences.region,
            ),
          );
        }
      } catch (
        error
      ) {
        console.error(
          "Could not load saved region. Using United States fallback.",
          error,
        );
      }
    }

    loadPreferences();

    return () => {
      cancelled =
        true;
    };
  }, [
    search.region,
  ]);

  useGameTimingBoundary(game);

  const selectedTimeZone =
    timeZoneForRegion(
      region,
    );

  function regionalProviderIds() {
    const broadcastRegion =
      normalizeRegion(
        region,
      );

    const competitionId =
      game.competitionId ??
      undefined;

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

  const providers =
    useMemo(
      () =>
        regionalProviderIds().map(
          (
            providerId,
          ) =>
            providerById(
              providerId,
            ),
        ),
      [
        game,
        region,
        liveBroadcasts,
      ],
    );

  const realProviders =
    providers.filter(
      (
        provider,
      ) =>
        provider.id !==
          "tbd" &&
        provider.id !==
          "not-live-uk",
    );

  const broadcastPending =
    providers.some(
      (
        provider,
      ) =>
        provider.id ===
        "tbd",
    );

  const notLiveInUk =
    providers.some(
      (
        provider,
      ) =>
        provider.id ===
        "not-live-uk",
    );

  const calendarUrl =
    googleCalendarUrl({
      game,

      providerNames:
        realProviders.map(
          (
            provider,
          ) =>
            provider.name,
        ),
    });

  const eventTitleOnly =
    isEventTitleOnlyGame(
      game,
    );

  const displayTitle =
    heroDisplayTitle(
      game,
    );

  const competitors =
    heroCompetitors(
      game,
    );

  const textOnlyCombatHero =
    hideHeroCompetitorArtwork(
      game.sport,
    );

  const heroBackground = getSportHeroStyle(
    game.sport,
    game.competitionId,
  );

  const regionLabel =
    normalizeRegion(
      region,
    );

  const liveNow =
    isGameLive(
      game,
    );

  const kickoffDisplay =
    game.kickoff
      ? formatRegionalTime(
          game.kickoff,
          region,
        )
      : formatKickoff(
          game.kickoff,
          game.scheduledDate,
          game.scheduleLabel,
          selectedTimeZone,
        );

  return (
    <Shell
      region={
        regionLabel
      }
    >
      <main className="mx-auto max-w-[1200px] space-y-6 px-4 py-6">
        <Link
          to="/"
          search={{
            region:
              regionLabel,
          }}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back
        </Link>

        <div
          className="panel relative overflow-hidden bg-pitch p-8"
          style={
            heroBackground
          }
        >
          <div
            className={
              eventTitleOnly
                ? "relative z-10 grid gap-8"
                : "relative z-10 grid gap-8 lg:grid-cols-[1fr_420px] lg:items-center"
            }
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
                  <span className="size-1.5 rounded-full bg-brand" />

                  {liveNow
                    ? "LIVE NOW"
                    : eventTitleOnly
                      ? "Event"
                      : "Fixture"}
                </span>

                <span className="text-sm font-semibold text-muted-foreground">
                  {game.league}
                </span>
              </div>

              <p className="eyebrow mt-6">
                {liveNow
                  ? eventTitleOnly
                    ? "Live event"
                    : "Live fixture"
                  : eventTitleOnly
                    ? "Countdown to event"
                    : "Countdown to kickoff"}
              </p>

              <h1 className="mt-2 text-4xl leading-none font-extrabold sm:text-5xl">
                {displayTitle}
              </h1>

              <p className="mt-4 text-sm text-muted-foreground">
                {
                  kickoffDisplay
                }

                {liveNow ? (
                  <>
                    {" "}
                    · LIVE NOW
                  </>
                ) : game.kickoff ? (
                  <>
                    {" "}
                    · Starts in{" "}
                    <LiveCountdown target={game.kickoff} />
                  </>
                ) : null}
              </p>

              {calendarUrl && (
                <div className="mt-6">
                  <a
                    href={
                      calendarUrl
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-w-60 items-center justify-center whitespace-nowrap rounded-lg border border-brand/40 px-6 py-3 text-sm font-bold text-brand transition hover:bg-brand/10"
                  >
                    Add to Google Calendar
                  </a>
                </div>
              )}
            </div>

            {!eventTitleOnly && (
              <div className="overflow-hidden rounded-xl border border-border bg-surface/80 backdrop-blur-sm">
                <div className="px-6 py-8">
                  <div className="flex items-center justify-between gap-6">
                    <div className={`flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`}>
                      {!textOnlyCombatHero && (
                        <TeamCrest
                          team={
                            competitors.home
                          }
                          crestUrl={game.homeCrestUrl}
                        />
                      )}

                      <span className="text-center text-sm font-extrabold">
                        {competitors.home}
                      </span>
                    </div>

                    <span className="shrink-0 text-sm font-black tracking-widest text-muted-foreground">
                      VS
                    </span>

                    <div className={`flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`}>
                      {!textOnlyCombatHero && (
                        <TeamCrest
                          team={
                            competitors.away
                          }
                          crestUrl={game.awayCrestUrl}
                        />
                      )}

                      <span className="text-center text-sm font-extrabold">
                        {competitors.away}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <div className="panel overflow-hidden">
            <div className="space-y-5 p-6">
              <div className="text-center">
                <p className="eyebrow">
                  Where to watch
                </p>

                <h2 className="mt-1 text-2xl font-extrabold">
                  {eventTitleOnly
                    ? "Watch this event"
                    : "Watch this match"}
                </h2>

                <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                  {notLiveInUk
                    ? `This ${eventTitleOnly ? "event" : "fixture"} is not scheduled for live domestic television coverage in the United Kingdom.`
                    : broadcastPending
                      ? `Broadcast information is pending for this ${eventTitleOnly ? "event" : "fixture"}.`
                      : `Select one of the confirmed viewing options available for this ${eventTitleOnly ? "event" : "fixture"} in your region.`}
                </p>

                <p className="mt-2 text-sm font-semibold text-foreground">
                  {regionLabel}
                </p>
              </div>

              {notLiveInUk ? (
                <div className="rounded-lg border border-border bg-surface-2/60 p-4">
                  <p className="font-semibold">
                    Not televised live in UK
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    No live domestic broadcaster is currently listed for this {eventTitleOnly ? "event" : "fixture"}.
                  </p>
                </div>
              ) : broadcastPending ? (
                <div className="rounded-lg border border-border bg-surface-2/60 p-4">
                  <p className="font-semibold">
                    Provider pending
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Official broadcast information has not yet been confirmed for this fixture in your selected region.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {realProviders.map(
                    (
                      provider,
                    ) => (
                      <div
                        key={
                          provider.id
                        }
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/60 p-4"
                      >
                        <div>
                          <p className="font-semibold">
                            {
                              provider.name
                            }
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Confirmed viewing option for {regionLabel}
                          </p>
                        </div>

                        {provider.url ? (
                          <a
                            href={
                              provider.url
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-brand-foreground shadow-glow"
                          >
                            Watch on{" "}
                            {
                              provider.name
                            }

                            <ExternalLink className="size-4" />
                          </a>
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">
                            Link unavailable
                          </span>
                        )}
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}

function TeamCrest({
  team,
  crestUrl,
}: {
  team: string;
  crestUrl?: string;
}) {
  const artwork =
    getTeamArtwork(
      team,
    );

  const resolvedCrest =
    crestUrl || artwork?.crest;

  const [
    imageFailed,
    setImageFailed,
  ] =
    useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [team, crestUrl]);

  const initials =
    team
      .split(" ")
      .map(
        (
          word,
        ) =>
          word[0],
      )
      .join("")
      .slice(
        0,
        3,
      )
      .toUpperCase();

  if (
    !resolvedCrest ||
    imageFailed
  ) {
    return (
      <div className="flex h-24 w-full items-center justify-center">
        <span className="grid size-20 place-items-center rounded-full border border-border bg-surface-2 text-sm font-black shadow-lg">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="flex h-24 w-full items-center justify-center">
      <img
        src={
          resolvedCrest
        }
        alt={`${team} crest`}
        className="h-24 w-24 object-contain drop-shadow-xl"
        onError={() =>
          setImageFailed(
            true,
          )
        }
      />
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