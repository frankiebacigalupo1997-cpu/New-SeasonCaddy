import type { Game } from "@/lib/gamehub-data";

type GoogleCalendarOptions = {
  game: Game;
  providerNames?: string[];
};

function googleDate(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

export function googleCalendarUrl({
  game,
  providerNames = [],
}: GoogleCalendarOptions) {
  if (!game.kickoff) {
    return null;
  }

  const start = new Date(game.kickoff);

  if (Number.isNaN(start.getTime())) {
    return null;
  }

  const end = new Date(
    start.getTime() +
      2 * 60 * 60 * 1000,
  );

  const title =
    `${game.home} vs ${game.away}`;

  const details = [
    game.league,
    "",
    providerNames.length > 0
      ? `Watch on: ${providerNames.join(", ")}`
      : "Provider pending",
    "",
    "Added from SeasonCaddy",
  ].join("\n");

  const params =
    new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      dates:
        `${googleDate(start)}/${googleDate(end)}`,
      details,
    });

  return (
    "https://calendar.google.com/calendar/render?" +
    params.toString()
  );
}