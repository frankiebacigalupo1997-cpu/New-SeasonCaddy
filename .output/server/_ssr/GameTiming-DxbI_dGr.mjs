import { n as __toESM } from "../_runtime.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { m as gameLiveEndTime, n as countdown } from "./frontend-data-BOEejV6T.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GameTiming-DxbI_dGr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var crestBase = [
	"https:",
	"",
	"crests.football-data.org"
].join("/");
var nflCrestBase = "https://a.espncdn.com/i/teamlogos/nfl/500";
var teamArtwork = {
	"AFC Bournemouth": { crest: `${crestBase}/1044.png` },
	Arsenal: { crest: `${crestBase}/57.png` },
	"Aston Villa": { crest: `${crestBase}/58.png` },
	Brentford: { crest: `${crestBase}/402.png` },
	"Brighton & Hove Albion": { crest: `${crestBase}/397.png` },
	Chelsea: { crest: `${crestBase}/61.png` },
	"Coventry City": { crest: `${crestBase}/1076.png` },
	"Crystal Palace": { crest: `${crestBase}/354.png` },
	Everton: { crest: `${crestBase}/62.png` },
	Fulham: { crest: `${crestBase}/63.png` },
	"Hull City": { crest: `${crestBase}/322.png` },
	"Ipswich Town": { crest: `${crestBase}/349.png` },
	"Leeds United": { crest: `${crestBase}/341.png` },
	Liverpool: { crest: `${crestBase}/64.png` },
	"Manchester City": { crest: `${crestBase}/65.png` },
	"Manchester United": { crest: `${crestBase}/66.png` },
	"Newcastle United": { crest: `${crestBase}/67.png` },
	"Nottingham Forest": { crest: `${crestBase}/351.png` },
	Sunderland: { crest: `${crestBase}/71.png` },
	"Tottenham Hotspur": { crest: `${crestBase}/73.png` },
	Atalanta: { crest: `${crestBase}/102.svg` },
	Bologna: { crest: `${crestBase}/103.png` },
	Cagliari: { crest: `${crestBase}/104.png` },
	Como: { crest: `${crestBase}/7397.png` },
	Fiorentina: { crest: `${crestBase}/99.svg` },
	Frosinone: { crest: `${crestBase}/470.png` },
	Genoa: { crest: `${crestBase}/107.png` },
	Inter: { crest: `${crestBase}/108.png` },
	Juventus: { crest: `${crestBase}/109.png` },
	Lazio: { crest: `${crestBase}/110.png` },
	Lecce: { crest: `${crestBase}/5890.png` },
	Milan: { crest: `${crestBase}/98.png` },
	Monza: { crest: `${crestBase}/5911.png` },
	Napoli: { crest: `${crestBase}/113.png` },
	Parma: { crest: `${crestBase}/112.png` },
	Roma: { crest: `${crestBase}/100.png` },
	Sassuolo: { crest: `${crestBase}/471.png` },
	Torino: { crest: `${crestBase}/586.png` },
	Udinese: { crest: `${crestBase}/115.png` },
	Venezia: { crest: `${crestBase}/454.png` },
	"Deportivo Alavés": { crest: `${crestBase}/263.png` },
	"Athletic Club": { crest: `${crestBase}/77.png` },
	"Atlético de Madrid": { crest: `${crestBase}/78.svg` },
	"Real Betis": { crest: `${crestBase}/90.png` },
	Celta: { crest: `${crestBase}/558.png` },
	"RC Deportivo": { crest: `${crestBase}/560.png` },
	Elche: { crest: `${crestBase}/285.png` },
	Espanyol: { crest: `${crestBase}/80.png` },
	Barcelona: { crest: `${crestBase}/81.svg` },
	Getafe: { crest: `${crestBase}/82.png` },
	Levante: { crest: `${crestBase}/88.png` },
	Málaga: { crest: `${crestBase}/84.png` },
	Osasuna: { crest: `${crestBase}/79.png` },
	"Racing Santander": { crest: `${crestBase}/5335.png` },
	"Rayo Vallecano": { crest: `${crestBase}/87.png` },
	"Real Madrid": { crest: `${crestBase}/86.png` },
	"Real Sociedad": { crest: `${crestBase}/92.png` },
	Sevilla: { crest: `${crestBase}/559.svg` },
	Valencia: { crest: `${crestBase}/95.png` },
	Villarreal: { crest: `${crestBase}/94.png` },
	"Arizona Cardinals": { crest: `${nflCrestBase}/ari.png` },
	"Atlanta Falcons": { crest: `${nflCrestBase}/atl.png` },
	"Baltimore Ravens": { crest: `${nflCrestBase}/bal.png` },
	"Buffalo Bills": { crest: `${nflCrestBase}/buf.png` },
	"Carolina Panthers": { crest: `${nflCrestBase}/car.png` },
	"Chicago Bears": { crest: `${nflCrestBase}/chi.png` },
	"Cincinnati Bengals": { crest: `${nflCrestBase}/cin.png` },
	"Cleveland Browns": { crest: `${nflCrestBase}/cle.png` },
	"Dallas Cowboys": { crest: `${nflCrestBase}/dal.png` },
	"Denver Broncos": { crest: `${nflCrestBase}/den.png` },
	"Detroit Lions": { crest: `${nflCrestBase}/det.png` },
	"Green Bay Packers": { crest: `${nflCrestBase}/gb.png` },
	"Houston Texans": { crest: `${nflCrestBase}/hou.png` },
	"Indianapolis Colts": { crest: `${nflCrestBase}/ind.png` },
	"Jacksonville Jaguars": { crest: `${nflCrestBase}/jax.png` },
	"Kansas City Chiefs": { crest: `${nflCrestBase}/kc.png` },
	"Las Vegas Raiders": { crest: `${nflCrestBase}/lv.png` },
	"Los Angeles Chargers": { crest: `${nflCrestBase}/lac.png` },
	"Los Angeles Rams": { crest: `${nflCrestBase}/lar.png` },
	"Miami Dolphins": { crest: `${nflCrestBase}/mia.png` },
	"Minnesota Vikings": { crest: `${nflCrestBase}/min.png` },
	"New England Patriots": { crest: `${nflCrestBase}/ne.png` },
	"New Orleans Saints": { crest: `${nflCrestBase}/no.png` },
	"New York Giants": { crest: `${nflCrestBase}/nyg.png` },
	"New York Jets": { crest: `${nflCrestBase}/nyj.png` },
	"Philadelphia Eagles": { crest: `${nflCrestBase}/phi.png` },
	"Pittsburgh Steelers": { crest: `${nflCrestBase}/pit.png` },
	"San Francisco 49ers": { crest: `${nflCrestBase}/sf.png` },
	"Seattle Seahawks": { crest: `${nflCrestBase}/sea.png` },
	"Tampa Bay Buccaneers": { crest: `${nflCrestBase}/tb.png` },
	"Tennessee Titans": { crest: `${nflCrestBase}/ten.png` },
	"Washington Commanders": { crest: `${nflCrestBase}/wsh.png` },
	"Atlanta Hawks": { crest: "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg" },
	"Boston Celtics": { crest: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg" },
	"Cleveland Cavaliers": { crest: "https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg" },
	"New Orleans Pelicans": { crest: "https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg" },
	"Chicago Bulls": { crest: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg" },
	"Dallas Mavericks": { crest: "https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg" },
	"Denver Nuggets": { crest: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg" },
	"Golden State Warriors": { crest: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg" },
	"Houston Rockets": { crest: "https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg" },
	"LA Clippers": { crest: "https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg" },
	"Los Angeles Lakers": { crest: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg" },
	"Miami Heat": { crest: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg" },
	"Milwaukee Bucks": { crest: "https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg" },
	"Minnesota Timberwolves": { crest: "https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg" },
	"Brooklyn Nets": { crest: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg" },
	"New York Knicks": { crest: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg" },
	"Orlando Magic": { crest: "https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg" },
	"Indiana Pacers": { crest: "https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg" },
	"Philadelphia 76ers": { crest: "https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg" },
	"Phoenix Suns": { crest: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg" },
	"Portland Trail Blazers": { crest: "https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg" },
	"Sacramento Kings": { crest: "https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg" },
	"San Antonio Spurs": { crest: "https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg" },
	"Oklahoma City Thunder": { crest: "https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg" },
	"Toronto Raptors": { crest: "https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg" },
	"Utah Jazz": { crest: "https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg" },
	"Memphis Grizzlies": { crest: "https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg" },
	"Washington Wizards": { crest: "https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg" },
	"Detroit Pistons": { crest: "https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg" },
	"Charlotte Hornets": { crest: "https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg" }
};
function getTeamArtwork(team) {
	return teamArtwork[team];
}
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
	motogp: brandingHero("MotoGP Hero.png")
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
export { useGameTimingBoundary as i, getSportHeroStyle as n, getTeamArtwork as r, LiveCountdown as t };
