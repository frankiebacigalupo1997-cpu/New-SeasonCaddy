import {
  Link,
} from "@tanstack/react-router";

import {
  Play,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  formatKickoff,
  formatRegionalTime,
  heroCompetitors,
  heroDisplayTitle,
  hideHeroCompetitorArtwork,
  isEventTitleOnlyGame,
  isGameLive,
  providerById,
  timeZoneForRegion,
  type Game,
} from "@/lib/gamehub-data";

import {
  getTeamArtwork,
} from "@/lib/team-artwork";

import { getSportHeroStyle } from "@/lib/hero-background";

import {
  LiveCountdown,
  useGameTimingBoundary,
} from "@/components/gamehub/GameTiming";

type NextFixtureHeroProps = {
  game:
    | Game
    | null
    | undefined;

  region: string;

  getProviderIds: (
    game: Game,
  ) => string[];

  addingToCalendar?:
    boolean;

  onAddToGoogleCalendar?: (
    game: Game,
  ) => void;

  loading?: boolean;

  emptyTitle?: string;

  emptyText?: string;

  emptyAction?:
    ReactNode;
};

export function NextFixtureHero({
  game,
  region,
  getProviderIds,
  addingToCalendar = false,
  onAddToGoogleCalendar,
  loading = false,
  emptyTitle =
    "No upcoming fixtures",
  emptyText =
    "There are no upcoming fixtures to show.",
  emptyAction,
}: NextFixtureHeroProps) {
  const [
    mounted,
    setMounted,
  ] =
    useState(false);

  useEffect(() => {
    setMounted(
      true,
    );
  }, []);

  useGameTimingBoundary(game);

  const selectedTimeZone =
    timeZoneForRegion(
      region,
    );

  const liveNow =
    Boolean(
      game &&
      isGameLive(
        game,
      ),
    );

  const eventTitleOnly = Boolean(
    game &&
      isEventTitleOnlyGame(
        game,
      ),
  );

  const displayTitle = game
    ? heroDisplayTitle(
        game,
      )
    : "";

  const competitors = game
    ? heroCompetitors(game)
    : null;

  const textOnlyCombatHero = Boolean(
    game &&
      hideHeroCompetitorArtwork(
        game.sport,
      ),
  );

  const heroBackground = getSportHeroStyle(
    game?.sport,
    game?.competitionId,
  );

  return (
    <div
      className="panel relative overflow-hidden bg-pitch px-6 py-6 sm:px-8 sm:py-8"
      style={
        heroBackground
      }
    >
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-xs font-bold text-brand">
            <span className="size-1.5 rounded-full bg-brand" />

            {liveNow
              ? "LIVE NOW"
              : eventTitleOnly
                ? "Next event"
                : "Next fixture"}
          </span>

          {game && (
            <span className="text-sm font-semibold text-muted-foreground">
              {
                game.league
              }
            </span>
          )}
        </div>

        {loading ? (
          <FixtureHeroLoading />
        ) : game ? (
          <>
            {!eventTitleOnly && (
              <div className="mt-5 flex w-full max-w-2xl items-center justify-center gap-6 sm:gap-10">
                <div className={`flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`}>
                  {!textOnlyCombatHero && (
                    <TeamCrest
                      team={
                        competitors?.home ?? game.home
                      }
                      crestUrl={game.homeCrestUrl}
                    />
                  )}

                  <span className="text-center text-sm font-extrabold sm:text-base">
                    {
                      competitors?.home ?? game.home
                    }
                  </span>
                </div>

                <div className="shrink-0">
                  <span className="text-sm font-black tracking-[0.25em] text-muted-foreground">
                    VS
                  </span>
                </div>

                <div className={`flex min-w-0 flex-1 flex-col items-center ${textOnlyCombatHero ? "gap-1" : "gap-3"}`}>
                  {!textOnlyCombatHero && (
                    <TeamCrest
                      team={
                        competitors?.away ?? game.away
                      }
                      crestUrl={game.awayCrestUrl}
                    />
                  )}

                  <span className="text-center text-sm font-extrabold sm:text-base">
                    {
                      competitors?.away ?? game.away
                    }
                  </span>
                </div>
              </div>
            )}

            <p className={`eyebrow ${eventTitleOnly ? "mt-8" : "mt-5"}`}>
              {liveNow
                ? eventTitleOnly
                  ? "Live event"
                  : "Live fixture"
                : eventTitleOnly
                  ? "Countdown to event"
                  : "Countdown to kickoff"}
            </p>

            <h2 className="mt-2 text-3xl leading-[1.05] font-extrabold sm:text-4xl xl:text-5xl">
              {displayTitle}
            </h2>

            <p className="mt-4 text-sm text-muted-foreground">
              {game.kickoff
                ? liveNow
                  ? `${formatRegionalTime(
                      game.kickoff,
                      region,
                    )} · LIVE NOW`
                  : mounted
                    ? (
                      <>
                        {formatRegionalTime(
                          game.kickoff,
                          region,
                        )}
                        {" · Starts in "}
                        <LiveCountdown target={game.kickoff} />
                      </>
                    )
                    : `${formatRegionalTime(
                        game.kickoff,
                        region,
                      )} · ${eventTitleOnly ? "Upcoming event" : "Upcoming fixture"}`
                : formatKickoff(
                    game.kickoff,
                    game.scheduledDate,
                    game.scheduleLabel,
                    selectedTimeZone,
                  )}
            </p>

            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {getProviderIds(
                game,
              )
                .map(
                  (
                    providerId,
                  ) =>
                    providerById(
                      providerId,
                    ).name,
                )
                .join(
                  " · ",
                )}

              {" · "}

              {
                game.league
              }
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {game.kickoff &&
                onAddToGoogleCalendar && (
                  <button
                    type="button"
                    disabled={
                      addingToCalendar
                    }
                    onClick={() =>
                      onAddToGoogleCalendar(
                        game,
                      )
                    }
                    className="flex min-w-56 cursor-pointer items-center justify-center gap-2 rounded-lg border border-brand/40 px-6 py-3 text-sm font-bold text-brand transition hover:bg-brand/10 disabled:cursor-wait disabled:opacity-60"
                  >
                    {addingToCalendar
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
                className="flex min-w-56 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-bold text-brand-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                <Play className="size-4" />

                View watch options
              </Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="mt-8 text-4xl font-extrabold sm:text-5xl">
              {
                emptyTitle
              }
            </h2>

            <p className="mt-4 text-sm text-muted-foreground">
              {
                emptyText
              }
            </p>

            {emptyAction && (
              <div className="mt-5">
                {
                  emptyAction
                }
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function FixtureHeroLoading() {
  return (
    <div
      className="mt-8 flex w-full max-w-2xl flex-col items-center"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-10 w-4/5 max-w-lg animate-pulse rounded-lg bg-surface-2/80" />

      <div className="mt-5 h-4 w-52 animate-pulse rounded-full bg-surface-2/70" />

      <div className="mt-8 grid w-full grid-cols-3 items-center gap-6 sm:gap-10">
        <div className="flex flex-col items-center gap-3">
          <div className="size-20 animate-pulse rounded-full border border-border/60 bg-surface-2/80" />
          <div className="h-4 w-24 animate-pulse rounded-full bg-surface-2/70" />
        </div>

        <div className="mx-auto h-4 w-8 animate-pulse rounded-full bg-surface-2/60" />

        <div className="flex flex-col items-center gap-3">
          <div className="size-20 animate-pulse rounded-full border border-border/60 bg-surface-2/80" />
          <div className="h-4 w-24 animate-pulse rounded-full bg-surface-2/70" />
        </div>
      </div>

      <p className="mt-8 text-sm font-semibold text-muted-foreground">
        Loading upcoming fixtures…
      </p>
    </div>
  );
}

/* ====================================================== */
/* TEAM CREST                                             */
/* ====================================================== */

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
          {
            initials
          }
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