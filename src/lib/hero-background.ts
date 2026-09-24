import type { CSSProperties } from "react";

const BRANDING_BUCKET_URL =
  "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding";

function brandingHero(fileName: string) {
  return `${BRANDING_BUCKET_URL}/${encodeURIComponent(fileName)}`;
}

/**
 * SeasonCaddy hero artwork stored in the public Supabase `branding` bucket.
 *
 * Keep these names aligned with the files in Storage. The resolver below is
 * shared by Home, My Caddy and the fixture/watch-options screen, so adding a
 * mapping here updates all three surfaces together.
 */
const HERO_IMAGES = {
  afl: brandingHero("AFL Hero.png"),
  "bare-knuckle-fighting": brandingHero("Bare Knuckle Hero.png"),
  baseball: brandingHero("Baseball Hero.png"),
  basketball: brandingHero("Basketball Hero.png"),
  boxing: brandingHero("Boxing Hero.png"),
  "bull-riding": brandingHero("Bull Riding Hero.png"),
  cricket: brandingHero("Cricket Hero.png"),
  cycling: brandingHero("Cycling Hero.png"),
  curling: brandingHero("Curling Hero.png"),
  darts: brandingHero("Darts Hero.png"),
  "extreme-sports": brandingHero("Extreme Sports Hero.png"),
  "field-hockey": brandingHero("Field Hockey Hero.png"),
  "flag-football": brandingHero("Flag Football Hero.png"),
  football: brandingHero("Football Snap.png"),
  golf: brandingHero("Golf Hero.png"),
  gymnastics: brandingHero("Gymnastics Hero.png"),
  handball: brandingHero("Handball Hero.png"),
  "horse-racing": brandingHero("Horse Racing Hero.png"),
  "ice-hockey": brandingHero("Ice Hockey Hero.png"),
  "jai-alai": brandingHero("Jal Alai Hero.png"),
  lacrosse: brandingHero("Lacrosse Hero.png"),
  mma: brandingHero("MMA Hero.png"),
  motorsport: brandingHero("Motorsport Hero.png"),
  pickleball: brandingHero("Pickleball Hero.png"),
  padel: brandingHero("Padel Hero.png"),
  "rugby-league": brandingHero("Rugby League Hero.png"),
  "rugby-union": brandingHero("Rugby Union Hero.png"),
  snooker: brandingHero("Snooker Hero.png"),
  softball: brandingHero("Softball Hero.png"),
  surfing: brandingHero("Surfing Hero.png"),
  "swimming-diving": brandingHero("Swimming or Diving Hero.png"),
  "table-tennis": brandingHero("Table Tennis Hero.png"),
  tennis: brandingHero("Tennis Hero.png"),
  "athletics": brandingHero("Track and Field Hero.jpg"),
  triathlon: brandingHero("Triathon Hero.png"),
  "ultimate-frisbee": brandingHero("Ultimate Frisbee Hero.png"),
  volleyball: brandingHero("Volleyball Hero.png"),
  "water-polo": brandingHero("Water Polo Hero.png"),
  wrestling: brandingHero("Wrestling Hero.png"),
  cheerleading: brandingHero("Cheerleading Hero.png"),
fitness: brandingHero("Fitness Hero.png"),
  grappling: brandingHero("Grappling Hero.png"),
  dance: brandingHero("Dance Hero.png"),
  skiing: brandingHero("Skiing Hero.png"),

  // No soccer hero is currently stored in the branding bucket, so retain the
  // existing football/soccer fallback until a SeasonCaddy soccer asset exists.
  soccer:
    "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1800&q=85",
} as const;

type HeroKey = keyof typeof HERO_IMAGES;

const COMPETITION_HERO_IMAGES: Record<string, string> = {
  "formula-1": brandingHero("Formula 1 Hero.png"),
  "formula-one": brandingHero("Formula One Hero.png"),
  f1: brandingHero("Formula One Hero.png"),
  motogp: brandingHero("MotoGP Hero.png"),
};

const RUGBY_LEAGUE_COMPETITIONS = new Set([
  "nrl",
  "super-league",
  "challenge-cup",
  "rugby-league-world-cup-men",
]);

function normalize(value: string | null | undefined) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

function isNascarCompetition(competitionId: string) {
  return (
    competitionId === "nascar" ||
    competitionId.startsWith("nascar-")
  );
}

function resolveHeroImage(
  sport: string | null | undefined,
  competitionId?: string | null,
): string | null {
  const normalizedSport = normalize(sport);
  const normalizedCompetition = normalize(competitionId);

  // Competition-specific artwork takes priority over the generic sport hero.
  if (isNascarCompetition(normalizedCompetition)) {
    return brandingHero("NASCAR Hero.png");
  }

  const competitionHero =
    COMPETITION_HERO_IMAGES[normalizedCompetition];

  if (competitionHero) {
    return competitionHero;
  }

  // Normalize sport aliases emitted by different provider adapters.
  if (
    normalizedSport === "american-football" ||
    normalizedSport === "gridiron" ||
    normalizedSport === "football-us"
  ) {
    return HERO_IMAGES.football;
  }

  if (
    normalizedSport === "hockey" ||
    normalizedSport === "icehockey"
  ) {
    return HERO_IMAGES["ice-hockey"];
  }

  if (
    normalizedSport === "mixed-martial-arts" ||
    normalizedSport === "combat-sports"
  ) {
    return HERO_IMAGES.mma;
  }

  if (
    normalizedSport === "action-sports" ||
    normalizedSport === "extreme"
  ) {
    return HERO_IMAGES["extreme-sports"];
  }

  if (
    normalizedSport === "motor-sports" ||
    normalizedSport === "motor-sport" ||
    normalizedSport === "racing"
  ) {
    return HERO_IMAGES.motorsport;
  }

  if (
    normalizedSport === "australian-football" ||
    normalizedSport === "australian-rules-football"
  ) {
    return HERO_IMAGES.afl;
  }

  if (
    normalizedSport === "swimming" ||
    normalizedSport === "diving" ||
    normalizedSport === "swimming-and-diving"
  ) {
    return HERO_IMAGES["swimming-diving"];
  }

  if (
  normalizedSport === "track-field" ||
  normalizedSport === "track-and-field" ||
  normalizedSport === "athletics"
) {
  return HERO_IMAGES["athletics"];
  }

  if (normalizedSport === "rugby") {
    return RUGBY_LEAGUE_COMPETITIONS.has(normalizedCompetition)
      ? HERO_IMAGES["rugby-league"]
      : HERO_IMAGES["rugby-union"];
  }

  if (normalizedSport in HERO_IMAGES) {
    return HERO_IMAGES[normalizedSport as HeroKey];
  }

  return null;
}

export function getSportHeroStyle(
  sport: string | null | undefined,
  competitionId?: string | null,
): CSSProperties | undefined {
  const image = resolveHeroImage(sport, competitionId);

  if (!image) return undefined;

  return {
    backgroundImage: `
      linear-gradient(
        90deg,
        rgba(2, 13, 23, 0.96) 0%,
        rgba(2, 13, 23, 0.82) 42%,
        rgba(2, 13, 23, 0.62) 70%,
        rgba(2, 13, 23, 0.82) 100%
      ),
      url("${image}")
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}
