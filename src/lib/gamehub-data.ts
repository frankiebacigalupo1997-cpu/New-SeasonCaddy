export type Provider = {
  id: string;
  name: string;
  url: string;
};

export const providers: Provider[] = [
  // United States
  {
    id: "peacock",
    name: "Peacock",
    url: "https://www.peacocktv.com",
  },
  {
    id: "espn",
    name: "ESPN",
    url: "https://www.espn.com/watch",
  },
  {
    id: "usa",
    name: "USA Network",
    url: "https://www.usanetwork.com",
  },
  {
    id: "nbc",
    name: "NBC",
    url: "https://www.nbc.com",
  },
  {
    id: "paramount",
    name: "Paramount+",
    url: "https://www.paramountplus.com",
  },
  {
    id: "paramount-plus",
    name: "Paramount+",
    url: "https://www.paramountplus.com",
  },
  {
    id: "prime-video",
    name: "Prime Video",
    url: "https://www.amazon.com/gp/video/sports?&linkCode=ll2&tag=seasoncaddy-20&linkId=d02ea4d90ced4bafb0da769b759da82a&language=en_US&ref_=as_li_ss_tl",
  },
  {
    id: "espn-plus",
    name: "ESPN+",
    url: "https://plus.espn.com",
  },
  {
    id: "fox-one",
    name: "FOX One",
    url: "https://www.fox.com",
  },
  {
    id: "nfl-plus",
    name: "NFL+",
    url: "https://www.nfl.com/plus",
  },
  {
    id: "netflix",
    name: "Netflix",
    url: "https://www.netflix.com",
  },
  {
    id: "nba-tv",
    name: "NBA TV",
    url: "https://www.nba.com/watch/nba-tv",
  },
  {
    id: "nba-league-pass",
    name: "NBA League Pass",
    url: "https://www.nba.com/watch/league-pass-stream",
  },
  {
    id: "nbcsn",
    name: "NBC Sports Network",
    url: "https://www.nbc.com/sports",
  },

  // United Kingdom
  {
    id: "sky-sports",
    name: "Sky Sports",
    url: "https://www.skysports.com",
  },
  {
    id: "now",
    name: "NOW",
    url: "https://www.nowtv.com/sports",
  },
  {
    id: "tnt-sports-uk",
    name: "TNT Sports",
    url: "https://www.tntsports.co.uk",
  },
  {
    id: "premier-sports",
    name: "Premier Sports",
    url: "https://www.premiersports.com",
  },
  {
    id: "disney-plus",
    name: "Disney+",
    url: "https://www.disneyplus.com",
  },
  {
    id: "dazn-uk",
    name: "DAZN",
    url: "https://www.dazn.com/en-GB",
  },
  {
    id: "channel-5",
    name: "5 / 5Action",
    url: "https://www.channel5.com",
  },
  {
    id: "bbc",
    name: "BBC",
    url: "https://www.bbc.co.uk/sport",
  },

  // Canada
  {
    id: "fubo-ca",
    name: "Fubo",
    url: "https://www.fubo.tv/ca",
  },
  {
    id: "dazn-ca",
    name: "DAZN",
    url: "https://www.dazn.com/en-CA",
  },

  // Additional provider IDs emitted by the SeasonCaddy Worker
  {
    id: "cbs",
    name: "CBS",
    url: "https://www.cbs.com",
  },
  {
    id: "cbs-sports-golazo",
    name: "CBS Sports Golazo Network",
    url: "https://www.cbssports.com/watch/cbs-sports-golazo-network/",
  },
  {
    id: "cbs-sports-network",
    name: "CBS Sports Network",
    url: "https://www.cbssportsnetwork.com",
  },
  {
    id: "dazn-us",
    name: "DAZN",
    url: "https://www.dazn.com/en-US",
  },
  {
    id: "telemundo",
    name: "Telemundo",
    url: "https://www.telemundo.com/deportes",
  },
  {
    id: "universo",
    name: "Universo",
    url: "https://www.nbc.com/networks/universo",
  },
  {
    id: "telemundo-app",
    name: "Telemundo App",
    url: "https://www.telemundo.com/deportes",
  },
  {
    id: "telemundo-deportes-ahora",
    name: "Telemundo Deportes Ahora",
    url: "https://www.telemundo.com/deportes",
  },
  {
    id: "tln",
    name: "TLN",
    url: "https://www.tln.ca",
  },
  {
    id: "tnt-sports",
    name: "TNT Sports",
    url: "https://www.tntsports.co.uk",
  },
  {
    id: "fubo",
    name: "Fubo",
    url: "https://www.fubo.tv",
  },
  {
    id: "dazn-game-pass-ca",
    name: "DAZN NFL Game Pass",
    url: "https://www.dazn.com/en-CA",
  },
  {
    id: "dazn-game-pass-uk",
    name: "DAZN NFL Game Pass",
    url: "https://www.dazn.com/en-GB",
  },
  {
    id: "big-ten-plus",
    name: "Big Ten Plus",
    url: "https://www.bigtenplus.com",
  },
  {
    id: "apple-tv",
    name: "Apple TV",
    url: "https://tv.apple.com",
  },
  {
    id: "sportsnet",
    name: "Sportsnet",
    url: "https://www.sportsnet.ca",
  },
  {
    id: "sportsnet-ca",
    name: "Sportsnet",
    url: "https://watch.sportsnet.ca",
  },
  {
    id: "vix",
    name: "ViX",
    url: "https://vix.com",
  },
  {
    id: "flosports",
    name: "FloSports",
    url: "https://www.flosports.tv",
  },
  {
    id: "dazn",
    name: "DAZN",
    url: "https://www.dazn.com/en-US",
  },
  {
    id: "mlb-tv",
    name: "MLB.TV",
    url: "https://www.mlb.com/live-stream-games/subscribe",
  },
  {
    id: "wnba-league-pass",
    name: "WNBA League Pass",
    url: "https://www.wnba.com/leaguepass",
  },
  {
    id: "sling",
    name: "Sling TV",
    url: "https://www.sling.com",
  },
  {
    id: "tubi",
    name: "Tubi",
    url: "https://tubitv.com/live",
  },
  {
    id: "roku",
    name: "The Roku Channel",
    url: "https://therokuchannel.roku.com",
  },
  {
    id: "bbc-iplayer",
    name: "BBC iPlayer / BBC Sport",
    url: "https://www.bbc.co.uk/iplayer",
  },
  {
    id: "nba-league-pass-uk",
    name: "NBA League Pass",
    url: "https://www.nba.com/watch/league-pass-stream",
  },
  {
    id: "tsn",
    name: "TSN",
    url: "https://www.tsn.ca",
  },
  {
    id: "abc",
    name: "ABC",
    url: "https://abc.com",
  },
  {
    id: "hulu",
    name: "Hulu",
    url: "https://www.hulu.com",
  },
  {
    id: "trutv",
    name: "truTV",
    url: "https://www.trutv.com",
  },
  {
    id: "hbo-max",
    name: "HBO Max",
    url: "https://www.hbomax.com",
  },
  {
    id: "tva-sports",
    name: "TVA Sports",
    url: "https://www.tvasports.ca",
  },
  {
    id: "nhl-tv-dazn-uk",
    name: "NHL.TV on DAZN",
    url: "https://www.dazn.com/en-GB",
  },

  // Other
  {
    id: "appletv",
    name: "Apple TV",
    url: "https://tv.apple.com",
  },
  {
    id: "tnt",
    name: "TNT",
    url: "https://www.tntdrama.com",
  },
  {
    id: "tbd",
    name: "Provider pending",
    url: "",
  },
  {
    id: "not-live-uk",
    name: "Not televised live",
    url: "",
  },
];

export type Game = {
  id: string;
  competitionId?: string;
  sport: string;
  league: string;
  home: string;
  away: string;
  canonicalHome?: string;
  canonicalAway?: string;
  homeTeamId?: string;
  awayTeamId?: string;
  homeCrestUrl?: string;
  awayCrestUrl?: string;

  /**
   * Canonical event metadata from the frontend fixture cache.
   * eventName is the preferred label for sports that are shown as
   * a single event rather than a home-vs-away matchup.
   */
  eventName?: string;
  eventKind?: string;

  /**
   * Exact kickoff timestamp when officially confirmed.
   * Null means the fixture is scheduled but its exact
   * kickoff date/time has not yet been announced.
   */
  kickoff: string | null;

  /**
   * Matchday/weekend used when kickoff is still TBD.
   */
  scheduledDate?: string;

  /**
   * Used when an exact date has not yet been assigned.
   * Example: "Matchday 20 · Jan 9–10"
   */
  scheduleLabel?: string;

  matchday?: number;

  /**
   * Default provider data currently attached to the fixture.
   * Regional UI should use getProviderIdsForGame instead
   * of reading these directly.
   */
  providerId: string;
  providerIds?: string[];

  /**
   * Best known end time from provider schedule data. When unavailable,
   * live-state helpers fall back to a sport-specific expected duration.
   */
  endTime?: string | null;

  status:
    | "Upcoming fixture"
    | "Time TBD"
    | "Live now"
    | "Final";
};

const EVENT_TITLE_ONLY_SPORTS = new Set([
  "bull-riding",
  "cycling",
  "darts",
  "extreme-sports",
  "golf",
  "motorsport",
  "horse-racing",
  "pickleball",
  "softball",
  "surfing",
  "triathlon",
  "table-tennis",
  "athletics",
  "tennis",
  "wrestling",
  "fitness",
  "cheerleading",
  "skiing",
  "swimming-diving",
  "ultimate-frisbee",
]);

function normalizeSportDisplayId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

export function isEventTitleOnlySport(sport: string) {
  return EVENT_TITLE_ONLY_SPORTS.has(
    normalizeSportDisplayId(sport),
  );
}

const UFC_EVENT_TITLE_ONLY_RE =
  /^Dana White[’']s Contender Series:/i;

/**
 * Some combat listings are programme/card names rather than a named
 * fighter-vs-fighter matchup. Keep those as one event title instead of
 * manufacturing a "vs. UFC" opponent from the competition field.
 */
export function isEventTitleOnlyGame(
  game: Pick<Game, "sport" | "eventName" | "eventKind">,
) {
  if (isEventTitleOnlySport(game.sport)) {
    return true;
  }

  return (
    normalizeSportDisplayId(game.sport) === "mma" &&
    UFC_EVENT_TITLE_ONLY_RE.test(game.eventName?.trim() ?? "")
  );
}

export type HeroCompetitors = {
  home: string;
  away: string;
};

const HERO_FIGHT_EXTRACTOR_SPORTS = new Set([
  "bare-knuckle-fighting",
  "boxing",
  "mma",
]);

const COMBAT_LANGUAGE_PREFIX_RE =
  /^(?:en\s+espa(?:ñ|n)ol|spanish|english)\s*[-:]\s*/i;

const COMBAT_CARD_SUFFIX_RE =
  /\s*(?:[-:]\s*)?(?:early\s+prelims?|prelims?|main\s+card|preliminary\s+card|early\s+preliminary\s+card|open\s+workouts?|ceremonial\s+weigh[-\s]?ins?|weigh[-\s]?ins?)\s*$/i;

function cleanHeroFighterName(
  value: string,
  side: "home" | "away",
) {
  let cleaned = value
    .trim()
    .replace(COMBAT_LANGUAGE_PREFIX_RE, "")
    .trim();

  // Combat schedule titles often prefix the first fighter with the card or
  // promotion name: "UFC 331: Van", "BKFC 94: Till",
  // "Zuffa Boxing: Garcia", "MVPW-06: Mayer", etc.
  if (side === "home" && cleaned.includes(":")) {
    cleaned = cleaned.replace(/^.*:\s*/, "").trim();
  }

  // Card/session labels belong to the event, not to the second fighter.
  // Remove them only for hero presentation.
  cleaned = cleaned.replace(COMBAT_CARD_SUFFIX_RE, "").trim();

  // A trailing standalone number is normally a rematch marker in combat
  // event titles (e.g. "Pantoja 2", "Wardley 2"), not part of the name.
  cleaned = cleaned.replace(/\s+\d+\s*$/, "").trim();

  return cleaned;
}

/**
 * Combat schedule titles often carry card/promoter text around the actual
 * matchup, for example:
 * - "UFC 331: Van vs. Pantoja 2 - Early Prelims"
 * - "BKFC 94: Till vs. Romero"
 * - "Zuffa Boxing: Garcia vs. Benn"
 * - "MVPW-06: Mayer vs. Cameron"
 * - "Liddard vs. Morello: Prelims"
 *
 * The cache parser deliberately preserves those complete source titles. For
 * hero presentation only, recover the fighter names while leaving eventName
 * untouched for tracker rows, provider evidence and card differentiation.
 */
export function heroCompetitors(
  game: Pick<
    Game,
    "sport" | "eventName" | "home" | "away" | "canonicalHome" | "canonicalAway"
  >,
): HeroCompetitors {
  const eventName = game.eventName?.trim() ?? "";
  const sport = normalizeSportDisplayId(game.sport);

  if (HERO_FIGHT_EXTRACTOR_SPORTS.has(sport)) {
    const fightMatch = eventName.match(
      /^(.+?)\s+vs\.?\s+(.+)$/i,
    );

    if (fightMatch) {
      const home = cleanHeroFighterName(
        fightMatch[1],
        "home",
      );
      const away = cleanHeroFighterName(
        fightMatch[2],
        "away",
      );

      if (home && away) {
        return { home, away };
      }
    }
  }

  return {
    home: game.canonicalHome ?? game.home,
    away: game.canonicalAway ?? game.away,
  };
}

export function heroDisplayTitle(
  game: Pick<
    Game,
    "sport" | "eventName" | "eventKind" | "home" | "away" | "canonicalHome" | "canonicalAway"
  >,
) {
  if (isEventTitleOnlyGame(game)) {
    return game.eventName?.trim() || game.home;
  }

  const competitors = heroCompetitors(game);
  return `${competitors.home} vs. ${competitors.away}`;
}

const HERO_TEXT_ONLY_COMBAT_SPORTS = new Set([
  "bare-knuckle-fighting",
  "boxing",
  "mma",
]);

/**
 * Combat-sport heroes should show the competitors' names without fabricated
 * initials/crest circles. Fighter photography can be added later only when
 * SeasonCaddy has a licensed/authorized image source.
 */
export function hideHeroCompetitorArtwork(sport: string) {
  return HERO_TEXT_ONLY_COMBAT_SPORTS.has(
    normalizeSportDisplayId(sport),
  );
}

export function gameDisplayTitle(
  game: Pick<
    Game,
    "sport" | "eventName" | "eventKind" | "home" | "away" | "canonicalHome" | "canonicalAway"
  >,
) {
  if (isEventTitleOnlyGame(game)) {
    return game.eventName?.trim() || game.canonicalHome || game.home;
  }

  const home = game.canonicalHome ?? game.home;
  const away = game.canonicalAway ?? game.away;
  return `${home} vs. ${away}`;
}

export const sports = [
  {
    id: "soccer",
    name: "Soccer",
  },
  {
    id: "football",
    name: "Football",
  },
  {
    id: "basketball",
    name: "Basketball",
  },
];

export function providerById(
  id: string,
) {
  return (
    providers.find(
      (provider) =>
        provider.id === id,
    ) ??
    providers.find(
      (provider) =>
        provider.id === "tbd",
    )!
  );
}

export const regions = [
  "United States",
  "United Kingdom",
  "Canada",
];

/**
 * Generic provider fallback.
 *
 * Automated competitions should resolve region-specific
 * broadcast information through the Worker/broadcast API.
 * This helper intentionally contains no fixture-specific
 * or competition-specific broadcast assumptions.
 */
export function getProviderIdsForGame(
  game: Game,
  _region: string,
): string[] {
  const providerIds =
    game.providerIds?.filter(
      Boolean,
    );

  if (
    providerIds &&
    providerIds.length > 0
  ) {
    return Array.from(
      new Set(
        providerIds,
      ),
    );
  }

  if (game.providerId) {
    return [
      game.providerId,
    ];
  }

  return ["tbd"];
}

export function timeZoneForRegion(
  region: string,
) {
  /*
   * SeasonCaddy treats the United States as
   * one broadcast region.
   *
   * Eastern Time is the canonical U.S.
   * calendar timezone. User-facing fixture
   * displays will separately show both
   * ET and PT.
   */
  if (
    region === "United States" ||
    region.startsWith(
      "United States ·",
    )
  ) {
    return "America/New_York";
  }

  if (
    region ===
    "United Kingdom"
  ) {
    return "Europe/London";
  }

  if (
    region === "Canada"
  ) {
    return "America/Toronto";
  }

  return "America/New_York";
}

export function formatRegionalTime(
  kickoff: string | null,
  region: string,
) {
  if (!kickoff) {
    return "Time TBD";
  }

  const date =
    new Date(kickoff);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Time TBD";
  }

  /*
   * North American television-style display.
   *
   * United States and Canada both show:
   *
   * 3:00 PM ET / 12:00 PM PT
   *
   * They remain separate broadcast regions;
   * this only controls how kickoff times
   * are displayed to the user.
   */
  if (
    region ===
      "United States" ||
    region.startsWith(
      "United States ·",
    ) ||
    region ===
      "Canada"
  ) {
    const eastern =
      new Intl.DateTimeFormat(
        "en-US",
        {
          hour:
            "numeric",

          minute:
            "2-digit",

          timeZone:
            "America/New_York",
        },
      ).format(date);

    const pacific =
      new Intl.DateTimeFormat(
        "en-US",
        {
          hour:
            "numeric",

          minute:
            "2-digit",

          timeZone:
            "America/Los_Angeles",
        },
      ).format(date);

    return `${eastern} ET / ${pacific} PT`;
  }

  /*
   * United Kingdom and any future
   * single-timezone displays continue
   * using their regional timezone.
   */
  return new Intl.DateTimeFormat(
    "en-US",
    {
      hour:
        "numeric",

      minute:
        "2-digit",

      timeZone:
        timeZoneForRegion(
          region,
        ),
    },
  ).format(date);
}

export function formatKickoff(
  iso: string | null,
  scheduledDate?: string,
  scheduleLabel?: string,
  timeZone?: string,
) {
  if (!iso) {
    if (scheduleLabel) {
      return `${scheduleLabel} · Time TBD`;
    }

    if (!scheduledDate) {
      return "Date & time TBD";
    }

    return `${new Date(
      `${scheduledDate}T12:00:00`,
    ).toLocaleDateString(
      undefined,
      {
        weekday: "short",
        month: "short",
        day: "numeric",
        timeZone,
      },
    )} · Time TBD`;
  }

  return new Date(
    iso,
  ).toLocaleString(
    undefined,
    {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone,
    },
  );
}

export function formatTime(
  iso: string | null,
  timeZone?: string,
) {
  if (!iso) {
    return "TBD";
  }

  return new Date(
    iso,
  ).toLocaleTimeString(
    undefined,
    {
      hour: "numeric",
      minute: "2-digit",
      timeZone,
    },
  );
}

const DEFAULT_LIVE_DURATION_MS =
  3 * 60 * 60 * 1000;

const LIVE_DURATION_BY_SPORT_MS: Record<
  string,
  number
> = {
  soccer: 3 * 60 * 60 * 1000,
  "american-football": 4.5 * 60 * 60 * 1000,
  football: 4.5 * 60 * 60 * 1000,
  basketball: 3.5 * 60 * 60 * 1000,
  "ice-hockey": 3.5 * 60 * 60 * 1000,
  baseball: 5 * 60 * 60 * 1000,
  softball: 4 * 60 * 60 * 1000,
  volleyball: 3.5 * 60 * 60 * 1000,
  "field-hockey": 2.5 * 60 * 60 * 1000,
  "rugby-union": 2.5 * 60 * 60 * 1000,
  "rugby-league": 2.5 * 60 * 60 * 1000,
  afl: 3 * 60 * 60 * 1000,
  lacrosse: 3 * 60 * 60 * 1000,
  "water-polo": 2.5 * 60 * 60 * 1000,
  handball: 2.5 * 60 * 60 * 1000,
  tennis: 6 * 60 * 60 * 1000,
  "table-tennis": 4 * 60 * 60 * 1000,
  pickleball: 4 * 60 * 60 * 1000,
  cricket: 12 * 60 * 60 * 1000,
  motorsport: 6 * 60 * 60 * 1000,
  golf: 12 * 60 * 60 * 1000,
  boxing: 6 * 60 * 60 * 1000,
  mma: 6 * 60 * 60 * 1000,
  "bare-knuckle-fighting": 6 * 60 * 60 * 1000,
  grappling: 6 * 60 * 60 * 1000,
  wrestling: 4 * 60 * 60 * 1000,
  darts: 6 * 60 * 60 * 1000,
  "bull-riding": 4 * 60 * 60 * 1000,
  cycling: 8 * 60 * 60 * 1000,
  triathlon: 8 * 60 * 60 * 1000,
  marathon: 8 * 60 * 60 * 1000,
  "road-running": 8 * 60 * 60 * 1000,
  surfing: 12 * 60 * 60 * 1000,
  "track-and-field": 8 * 60 * 60 * 1000,
  swimming: 8 * 60 * 60 * 1000,
  "swimming-diving": 8 * 60 * 60 * 1000,
};

function fixtureTimestamp(
  value: string | null | undefined,
) {
  if (!value) {
    return null;
  }

  const timestamp = new Date(
    value,
  ).getTime();

  return Number.isNaN(
    timestamp,
  )
    ? null
    : timestamp;
}

function expectedLiveDurationMs(
  sport: string,
) {
  return (
    LIVE_DURATION_BY_SPORT_MS[
      sport.trim().toLowerCase()
    ] ??
    DEFAULT_LIVE_DURATION_MS
  );
}

export function gameLiveEndTime(
  game: Game,
) {
  const kickoff =
    fixtureTimestamp(
      game.kickoff,
    );

  if (kickoff === null) {
    return null;
  }

  const fallbackEnd =
    kickoff +
    expectedLiveDurationMs(
      game.sport,
    );

  const providerEnd =
    fixtureTimestamp(
      game.endTime,
    );

  if (
    providerEnd !== null &&
    providerEnd > kickoff
  ) {
    return providerEnd;
  }

  return fallbackEnd;
}

export function isGameLive(
  game: Game,
  now = Date.now(),
) {
  if (
    game.status ===
    "Final"
  ) {
    return false;
  }

  const kickoff =
    fixtureTimestamp(
      game.kickoff,
    );

  if (kickoff === null) {
    return (
      game.status ===
      "Live now"
    );
  }

  if (now < kickoff) {
    return false;
  }

  const liveEnd =
    gameLiveEndTime(
      game,
    );

  return (
    liveEnd !== null &&
    now < liveEnd
  );
}

export function isUpcomingOrLiveGame(
  game: Game,
  now = Date.now(),
) {
  if (
    isGameLive(
      game,
      now,
    )
  ) {
    return true;
  }

  if (
    game.status ===
    "Final"
  ) {
    return false;
  }

  const kickoff =
    fixtureTimestamp(
      game.kickoff,
    );

  if (kickoff !== null) {
    return kickoff >= now;
  }

  if (
    game.scheduledDate
  ) {
    const scheduledEnd =
      new Date(
        `${game.scheduledDate}T23:59:59`,
      ).getTime();

    return (
      !Number.isNaN(
        scheduledEnd,
      ) &&
      scheduledEnd >= now
    );
  }

  return false;
}

export function countdown(
  target: string | null,
) {
  if (!target) {
    return "Time TBD";
  }

  const diff =
    new Date(
      target,
    ).getTime() -
    Date.now();

  if (diff <= 0) {
    return "Started";
  }

  const d = Math.floor(
    diff / 86400000,
  );

  const h = Math.floor(
    (diff % 86400000) /
      3600000,
  );

  const m = Math.floor(
    (diff % 3600000) /
      60000,
  );

  const s = Math.floor(
    (diff % 60000) /
      1000,
  );

  return `${d}d ${String(
    h,
  ).padStart(
    2,
    "0",
  )}h ${String(
    m,
  ).padStart(
    2,
    "0",
  )}m ${String(
    s,
  ).padStart(
    2,
    "0",
  )}s`;
}
