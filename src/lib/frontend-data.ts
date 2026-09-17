import { fixturesToBroadcasts } from "@/lib/broadcast-api";
import { frontendFixtureToGame } from "@/lib/football-api";
import {
  fetchFrontendCatalog,
  fetchFrontendFixtureById,
  fetchFrontendFixtures,
  fetchFrontendHomeInitial,
  fetchFrontendFixturesForSavedTeams,
} from "@/lib/supabase-fixtures";

export async function fetchCatalog() {
  return fetchFrontendCatalog();
}

const HOME_LIVE_LOOKBACK_MS = 30 * 24 * 60 * 60 * 1000;

export async function fetchUpcomingDatasetForCompetitions(competitionIds) {
  const normalizedIds = Array.from(
    new Set((competitionIds ?? []).filter(Boolean)),
  ).sort();

  if (normalizedIds.length === 0) {
    return {
      fixtures: [],
      games: [],
      broadcasts: [],
    };
  }

  const fixtures = await fetchFrontendFixtures(normalizedIds, {
    sortAtOrAfter: new Date(Date.now() - HOME_LIVE_LOOKBACK_MS).toISOString(),
  });

  return {
    fixtures,
    games: fixtures.map(frontendFixtureToGame),
    broadcasts: fixturesToBroadcasts(fixtures),
  };
}

export async function fetchDatasetForSavedTeams(savedLeagues) {
  const fixtures = await fetchFrontendFixturesForSavedTeams(savedLeagues ?? {});

  return {
    fixtures,
    games: fixtures.map(frontendFixtureToGame),
    broadcasts: fixturesToBroadcasts(fixtures),
  };
}


export async function fetchGlobalInitialUpcomingDataset(limit = 100) {
  /*
   * One browser request, one server-side ordering rule:
   * LIVE NOW first, then the next upcoming fixtures.
   * This removes the old live/upcoming race entirely, so auth hydration or
   * background fixture enrichment cannot reveal a better hero several seconds
   * after first paint.
   */
  const fixtures = await fetchFrontendHomeInitial(limit);

  return {
    fixtures,
    games: fixtures.map(frontendFixtureToGame),
    broadcasts: fixturesToBroadcasts(fixtures),
  };
}

export async function fetchGlobalUpcomingDataset(limit = 750, offset = 0) {
  const recentLiveLookback = new Date(
    Date.now() - 24 * 60 * 60 * 1000,
  ).toISOString();

  const fixtures = await fetchFrontendFixtures(undefined, {
    limit,
    offset,
    sortAtOrAfter: recentLiveLookback,
  });

  return {
    fixtures,
    games: fixtures.map(frontendFixtureToGame),
    broadcasts: fixturesToBroadcasts(fixtures),
  };
}

export async function fetchDatasetForGame(gameId) {
  const fixture = await fetchFrontendFixtureById(gameId);

  if (!fixture) {
    return null;
  }

  return {
    fixtures: [fixture],
    games: [frontendFixtureToGame(fixture)],
    broadcasts: fixturesToBroadcasts([fixture]),
  };
}