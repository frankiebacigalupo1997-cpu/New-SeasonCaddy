import type { Game } from "@/lib/gamehub-data";

import type { FrontendFixtureRow } from "@/lib/supabase-fixtures";

function displayNameFromCompetitionId(value: string) {
  return value
    .trim()
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (/^[a-z]{2,4}$/i.test(part)) return part.toUpperCase();
      if (part.toLowerCase() === "motogp") return "MotoGP";
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function normalizeGameStatus(status?: string): Game["status"] {
  const value = String(status ?? "").trim().toLowerCase();

  if (["final", "fulltime", "full time", "finished", "complete", "completed"].includes(value)) {
    return "Final";
  }

  if (["live", "live now", "in progress", "in-progress"].includes(value)) {
    return "Live now";
  }

  if (["scheduled", "upcoming", "upcoming fixture", "not started", "pre"].includes(value)) {
    return "Upcoming fixture";
  }

  return "Time TBD";
}

function earliestProviderEndTime(
  fixture: FrontendFixtureRow,
) {
  const kickoff = fixture.kickoff
    ? new Date(fixture.kickoff).getTime()
    : null;

  const candidates = fixture.providers
    .map((provider) => provider.endTime)
    .filter((value): value is string => Boolean(value))
    .map((value) => ({
      value,
      timestamp: new Date(value).getTime(),
    }))
    .filter(({ timestamp }) =>
      !Number.isNaN(timestamp) &&
      (kickoff === null || timestamp > kickoff),
    )
    .sort((a, b) => a.timestamp - b.timestamp);

  return candidates[0]?.value ?? null;
}

export function frontendFixtureToGame(fixture: FrontendFixtureRow): Game {
  return {
    id: fixture.id,
    competitionId: fixture.competitionId,
    sport: fixture.sport,
    league:
      fixture.competitionName ||
      displayNameFromCompetitionId(fixture.competitionId),
    home: fixture.home,
    away: fixture.away,
    canonicalHome: fixture.canonicalHome,
    canonicalAway: fixture.canonicalAway,
    homeTeamId: fixture.homeTeamId,
    awayTeamId: fixture.awayTeamId,
    homeCrestUrl: fixture.homeCrestUrl,
    awayCrestUrl: fixture.awayCrestUrl,
    eventName: fixture.eventName,
    eventKind: fixture.eventKind,
    kickoff: fixture.kickoff,
    scheduledDate: fixture.scheduledDate,
    scheduleLabel:
      fixture.stage ??
      (fixture.round !== undefined ? String(fixture.round) : undefined),
    // Regional provider availability is derived from the same fixture payload
    // in broadcast-api. Game itself stays region-neutral.
    providerId: "tbd",
    providerIds: ["tbd"],
    endTime: earliestProviderEndTime(fixture),
    status: normalizeGameStatus(fixture.status),
  };
}
