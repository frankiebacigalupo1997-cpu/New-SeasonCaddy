import { n as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/@posthog/react+[...].mjs";
import { i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as gameLiveEndTime, n as countdown } from "./frontend-data-DJPCkXA4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GameTiming-BbAEZaon.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BRANDING_BUCKET_URL = "https://ekxmoxjvnohdbbrpbqdq.supabase.co/storage/v1/object/public/branding";
function brandingHero(fileName) {
	return `${BRANDING_BUCKET_URL}/${encodeURIComponent(fileName)}`;
}
/**
* SeasonCaddy hero artwork stored in the public Supabase `branding` bucket.
*
* Keep these names aligned with the files in Storage. The resolver below is
* shared by Home, My Caddy and the fixture/watch-options screen, so adding a
* mapping here updates all three surfaces together.
*/
var HERO_IMAGES = {
	afl: brandingHero("AFL Hero.png"),
	"bare-knuckle-fighting": brandingHero("Bare Knuckle Hero.png"),
	baseball: brandingHero("Baseball Hero.png"),
	basketball: brandingHero("Basketball Hero.png"),
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
	soccer: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=1800&q=85"
};
var COMPETITION_HERO_IMAGES = {
	"formula-1": brandingHero("Formula 1 Hero.png"),
	"formula-one": brandingHero("Formula One Hero.png"),
	f1: brandingHero("Formula One Hero.png"),
	motogp: brandingHero("MotoGP Hero.png"),
	boxing: brandingHero("Boxing Hero.png"),
	grappling: brandingHero("Grappling Hero.png"),
	wrestling: brandingHero("Wrestling Hero.png"),
	mma: brandingHero("MMA Hero.png"),
	ufc: brandingHero("MMA Hero.png"),
	kickboxing: brandingHero("Boxing Hero.png"),
	muay: brandingHero("Boxing Hero.png"),
	"muay-thai": brandingHero("Boxing Hero.png"),
	"muay-thai-world-championship": brandingHero("Boxing Hero.png")
};
var RUGBY_LEAGUE_COMPETITIONS = /* @__PURE__ */ new Set([
	"nrl",
	"super-league",
	"challenge-cup",
	"rugby-league-world-cup-men"
]);
function normalize(value) {
	return String(value ?? "").trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");
}
function isNascarCompetition(competitionId) {
	return competitionId === "nascar" || competitionId.startsWith("nascar-");
}
function resolveHeroImage(sport, competitionId) {
	const normalizedSport = normalize(sport);
	const normalizedCompetition = normalize(competitionId);
	if (isNascarCompetition(normalizedCompetition)) return brandingHero("NASCAR Hero.png");
	const competitionHero = COMPETITION_HERO_IMAGES[normalizedCompetition];
	if (competitionHero) return competitionHero;
	if (normalizedSport === "american-football" || normalizedSport === "gridiron" || normalizedSport === "football-us") return HERO_IMAGES.football;
	if (normalizedSport === "hockey" || normalizedSport === "icehockey") return HERO_IMAGES["ice-hockey"];
	if (normalizedSport === "mixed-martial-arts" || normalizedSport === "combat-sports") return HERO_IMAGES.mma;
	if (normalizedSport === "action-sports" || normalizedSport === "extreme") return HERO_IMAGES["extreme-sports"];
	if (normalizedSport === "motor-sports" || normalizedSport === "motor-sport" || normalizedSport === "racing") return HERO_IMAGES.motorsport;
	if (normalizedSport === "australian-football" || normalizedSport === "australian-rules-football") return HERO_IMAGES.afl;
	if (normalizedSport === "swimming" || normalizedSport === "diving" || normalizedSport === "swimming-and-diving") return HERO_IMAGES["swimming-diving"];
	if (normalizedSport === "track-field" || normalizedSport === "track-and-field" || normalizedSport === "athletics") return HERO_IMAGES["athletics"];
	if (normalizedSport === "rugby") return RUGBY_LEAGUE_COMPETITIONS.has(normalizedCompetition) ? HERO_IMAGES["rugby-league"] : HERO_IMAGES["rugby-union"];
	if (normalizedSport in HERO_IMAGES) return HERO_IMAGES[normalizedSport];
	return null;
}
function getSportHeroStyle(sport, competitionId) {
	const image = resolveHeroImage(sport, competitionId);
	if (!image) return void 0;
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
		backgroundRepeat: "no-repeat"
	};
}
var MAX_BROWSER_TIMEOUT_MS = 2147e6;
function useGameTimingBoundary(game) {
	const [version, setVersion] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!game?.kickoff) return;
		const now = Date.now();
		const nextBoundary = [new Date(game.kickoff).getTime(), gameLiveEndTime(game)].filter((value) => typeof value === "number" && Number.isFinite(value) && value > now).sort((a, b) => a - b)[0];
		if (!nextBoundary) return;
		const delay = Math.min(Math.max(nextBoundary - now + 250, 250), MAX_BROWSER_TIMEOUT_MS);
		const timer = window.setTimeout(() => {
			setVersion((value) => value + 1);
		}, delay);
		return () => {
			window.clearTimeout(timer);
		};
	}, [
		game?.id,
		game?.kickoff,
		game?.endTime,
		game?.sport,
		game?.status,
		version
	]);
}
function LiveCountdown({ target }) {
	const [, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			if (document.visibilityState === "visible") setTick((value) => value + 1);
		}, 1e3);
		return () => {
			window.clearInterval(timer);
		};
	}, [target]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: countdown(target) });
}
//#endregion
export { getSportHeroStyle as n, useGameTimingBoundary as r, LiveCountdown as t };
