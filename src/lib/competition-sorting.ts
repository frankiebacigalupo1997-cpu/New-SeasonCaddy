export function competitionSortRank(
  competition: {
    id: string;
    name: string;
  },
) {
  if (
    competition.id === "NFL" ||
    competition.id === "MLB" ||
    competition.id === "NBA" ||
    competition.id === "NHL" ||
    competition.id === "UFC" ||
    competition.id === "Formula 1" ||
    competition.id === "UEFA Champions League" ||
    competition.id === "UEFA Europa League" ||
    competition.id === "Athletics" ||
    competition.id === "Boxing"
  ) {
    return 0;
  }

  if (
    competition.id === "College Football" ||
    competition.id === "WNBA" ||
    competition.id === "Premier League" ||
    competition.id === "Serie A" ||
    competition.id === "MMA"
  ) {
    return 1;
  }

  if (
    competition.id === "La Liga" ||
    competition.id === "College Basketball"
  ) {
    return 2;
  }

  if (
    competition.id === "Bundesliga" ||
    competition.id === "French Ligue 1" ||
    competition.id === "MLS"
  ) {
    return 3;
  }

  return 4;
}

export function sortCompetitions<T extends {
  id: string;
  name: string;
}>(competitions: T[]): T[] {
  return [...competitions].sort((a, b) => {
    const rankDifference =
      competitionSortRank(a) - competitionSortRank(b);

    if (rankDifference !== 0) {
      return rankDifference;
    }

    return a.name.localeCompare(b.name);
  });
}
