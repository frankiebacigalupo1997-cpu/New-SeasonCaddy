export function competitionSortRank(
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
    competition.id === "formula-1" ||
    competition.id === "champions-league" ||
    competition.id === "europa-league" ||
    competition.id === "athletics" ||
    competition.id === "boxing"
  ) {
    return 0;
  }

  if (
    competition.id === "ncaa-football" ||
    competition.id === "wnba" ||
    competition.id === "premier-league" ||
    competition.id === "serie-a" ||
    competition.id === "mma"
  ) {
    return 1;
  }

  if (
    competition.id === "la-liga" ||
    competition.id === "college-basketball"
  ) {
    return 2;
  }

  if (
    competition.id === "bundesliga" ||
    competition.id === "french-ligue-1" ||
    competition.id === "mls"
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
