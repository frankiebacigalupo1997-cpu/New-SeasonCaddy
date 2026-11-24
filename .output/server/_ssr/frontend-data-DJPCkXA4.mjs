import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/frontend-data-DJPCkXA4.js
var providers = [
	{
		id: "abc",
		name: "ABC",
		url: "https://abc.com"
	},
	{
		id: "ABC",
		name: "ABC",
		url: "https://abc.com"
	},
	{
		id: "ACC Network",
		name: "ACC Network",
		url: "https://www.espn.com/watch/espnplus/"
	},
	{
		id: "apple-tv",
		name: "Apple TV",
		url: "https://tv.apple.com"
	},
	{
		id: "appletv",
		name: "Apple TV",
		url: "https://tv.apple.com"
	},
	{
		id: "Apple TV",
		name: "Apple TV",
		url: "https://tv.apple.com"
	},
	{
		id: "bein sports",
		name: "beIN Sports",
		url: "https://connect-au.beinsports.com/en"
	},
	{
		id: "BTN",
		name: "Big Ten Network",
		url: "https://www.foxsports.com"
	},
	{
		id: "big-ten-plus",
		name: "Big Ten Plus",
		url: "https://www.bigtenplus.com"
	},
	{
		id: "B1G+",
		name: "Big Ten+",
		url: "https://www.bigtenplus.com"
	},
	{
		id: "cbs",
		name: "CBS",
		url: "https://www.cbs.com"
	},
	{
		id: "CBS",
		name: "CBS",
		url: "https://www.cbs.com"
	},
	{
		id: "cbs-sports-golazo",
		name: "CBS Sports Golazo Network",
		url: "https://www.cbssports.com/watch/cbs-sports-golazo-network/"
	},
	{
		id: "cbs-sports-network",
		name: "CBS Sports Network",
		url: "https://www.cbssportsnetwork.com"
	},
	{
		id: "CBSSN",
		name: "CBS Sports Network",
		url: "https://www.cbssports.com/watch"
	},
	{
		id: "cnbc",
		name: "CNBC",
		url: "https://www.nbc.com/sign-up"
	},
	{
		id: "dazn-us",
		name: "DAZN",
		url: "https://www.dazn.com/en-US"
	},
	{
		id: "dazn",
		name: "DAZN",
		url: "https://www.dazn.com/en-US"
	},
	{
		id: "DAZN",
		name: "DAZN",
		url: "https://www.dazn.com/en-US"
	},
	{
		id: "DAZN PPV",
		name: "DAZN PPV",
		url: "https://www.dazn.com/en-US"
	},
	{
		id: "directv",
		name: "DIRECTV Streaming",
		url: "https://www.directv.com/sports"
	},
	{
		id: "espn",
		name: "ESPN",
		url: "https://www.espn.com/watch"
	},
	{
		id: "ESPN",
		name: "ESPN",
		url: "https://www.espn.com/watch"
	},
	{
		id: "espn-plus",
		name: "ESPN+",
		url: "https://plus.espn.com"
	},
	{
		id: "ESPN+",
		name: "ESPN+",
		url: "https://plus.espn.com"
	},
	{
		id: "ESPN2",
		name: "ESPN2",
		url: "https://www.espn.com/watch"
	},
	{
		id: "ESPNU",
		name: "ESPNU",
		url: "https://www.espn.com/watch/espnplus/"
	},
	{
		id: "Fandango",
		name: "Fandango at Home",
		url: "https://www.fandangoathome.com"
	},
	{
		id: "fanduel-sports-network",
		name: "FanDuel Sports Network",
		url: "https://fanduelsportsnetwork.com"
	},
	{
		id: "FloBikes",
		name: "FloBikes",
		url: "https://www.flobikes.com"
	},
	{
		id: "FloCollege",
		name: "FloCollege",
		url: "https://www.flocollege.com"
	},
	{
		id: "FloElite",
		name: "FloElite",
		url: "https://www.floelite.com"
	},
	{
		id: "FloFootball",
		name: "FloFootball",
		url: "https://www.flofootball.com"
	},
	{
		id: "FloGrappling",
		name: "FloGrappling",
		url: "https://www.flograppling.com"
	},
	{
		id: "FloHockey",
		name: "FloHockey",
		url: "https://www.flohockey.tv"
	},
	{
		id: "FloHoops",
		name: "FloHoops",
		url: "https://www.flohoops.com"
	},
	{
		id: "FloLive",
		name: "FloLive",
		url: "https://www.flolive.tv"
	},
	{
		id: "FloMarching",
		name: "FloMarching",
		url: "https://www.flomarching.com"
	},
	{
		id: "FloRacing",
		name: "FloRacing",
		url: "https://www.floracing.com"
	},
	{
		id: "FloRugby",
		name: "FloRugby",
		url: "https://www.florugby.com"
	},
	{
		id: "flosports",
		name: "FloSports",
		url: "https://www.flosports.tv"
	},
	{
		id: "FloSports",
		name: "FloSports",
		url: "https://www.flosports.tv"
	},
	{
		id: "FloTrack",
		name: "FloTrack",
		url: "https://www.flotrack.org"
	},
	{
		id: "FloWrestling",
		name: "FloWrestling",
		url: "https://www.flowrestling.org"
	},
	{
		id: "Fox",
		name: "FOX",
		url: "https://www.fox.com"
	},
	{
		id: "FOX",
		name: "FOX",
		url: "https://www.fox.com"
	},
	{
		id: "FOX Deportes",
		name: "FOX Deportes",
		url: "https://www.foxdeportes.com"
	},
	{
		id: "fox-one",
		name: "FOX One",
		url: "https://www.fox.com"
	},
	{
		id: "FS1",
		name: "FS1",
		url: "https://www.foxsports.com"
	},
	{
		id: "FS2",
		name: "FS2",
		url: "https://www.foxsports.com"
	},
	{
		id: "FuboTV",
		name: "Fubo",
		url: "https://www.fubo.tv"
	},
	{
		id: "fubo",
		name: "Fubo",
		url: "https://www.fubo.tv"
	},
	{
		id: "fubo",
		name: "Fubo",
		url: "https://www.fubo.tv"
	},
	{
		id: "max",
		name: "HBO Max",
		url: "https://www.hbomax.com"
	},
	{
		id: "hbo-max",
		name: "HBO Max",
		url: "https://www.hbomax.com"
	},
	{
		id: "HBO Max",
		name: "HBO Max",
		url: "https://www.hbomax.com"
	},
	{
		id: "hulu",
		name: "Hulu",
		url: "https://www.hulu.com"
	},
	{
		id: "hulu-live",
		name: "Hulu + Live TV",
		url: "https://www.hulu.com"
	},
	{
		id: "ION",
		name: "ION",
		url: "https://iontelevision.com"
	},
	{
		id: "mlb-tv",
		name: "MLB.TV",
		url: "https://www.mlb.com/live-stream-games/subscribe"
	},
	{
		id: "MW+",
		name: "Mountain West+",
		url: "https://www.mountainwestplus.com"
	},
	{
		id: "nba-league-pass",
		name: "NBA League Pass",
		url: "https://www.nba.com/watch/league-pass-stream"
	},
	{
		id: "NBA League Pass",
		name: "NBA League Pass",
		url: "https://www.nba.com/watch/league-pass-stream"
	},
	{
		id: "fox",
		name: "FOX",
		url: "https://www.fox.com"
	},
	{
		id: "TNT",
		name: "TNT",
		url: "https://www.tntdrama.com"
	},
	{
		id: "truTV",
		name: "truTV",
		url: "https://www.trutv.com"
	},
	{
		id: "espn_plus",
		name: "ESPN+",
		url: "https://plus.espn.com"
	},
	{
		id: "beIn Sports",
		name: "beIN Sports",
		url: "https://connect-au.beinsports.com/en"
	},
	{
		id: "Universo",
		name: "Universo",
		url: "https://www.nbc.com/networks/universo"
	},
	{
		id: "CNBC",
		name: "CNBC",
		url: "https://www.nbc.com/sign-up"
	},
	{
		id: "Netflix",
		name: "Netflix",
		url: "https://www.netflix.com"
	},
	{
		id: "usa-network",
		name: "USA Network",
		url: "https://www.usanetwork.com"
	},
	{
		id: "TUBI",
		name: "Tubi",
		url: "https://tubitv.com/live"
	},
	{
		id: "NBA TV",
		name: "NBA TV",
		url: "https://www.nba.com/watch/nba-tv"
	},
	{
		id: "nba-tv",
		name: "NBA TV",
		url: "https://www.nba.com/watch/nba-tv"
	},
	{
		id: "nbc",
		name: "NBC",
		url: "https://www.nbc.com"
	},
	{
		id: "NBC",
		name: "NBC",
		url: "https://www.nbc.com"
	},
	{
		id: "nbcsn",
		name: "NBC Sports Network",
		url: "https://www.nbc.com/sports"
	},
	{
		id: "NBCSN",
		name: "NBC Sports Network",
		url: "https://www.nbc.com/sports"
	},
	{
		id: "netflix",
		name: "Netflix",
		url: "https://www.netflix.com"
	},
	{
		id: "NFL Net",
		name: "NFL Network",
		url: "https://www.nfl.com/network"
	},
	{
		id: "Ticket",
		name: "NFL Sunday Ticket",
		url: "https://tv.youtube.com/"
	},
	{
		id: "nfl-plus",
		name: "NFL+",
		url: "https://www.nfl.com/plus"
	},
	{
		id: "NHL Net",
		name: "NHL Network",
		url: "https://www.nhl.com/network"
	},
	{
		id: "nhl-tv-dazn-uk",
		name: "NHL.TV on DAZN",
		url: "https://www.dazn.com/en-GB"
	},
	{
		id: "NWSL+",
		name: "NWSL+",
		url: "https://plus.nwslsoccer.com"
	},
	{
		id: "Paramount+",
		name: "Paramount+",
		url: "https://www.paramountplus.com"
	},
	{
		id: "paramount",
		name: "Paramount+",
		url: "https://www.paramountplus.com"
	},
	{
		id: "paramount-plus",
		name: "Paramount+",
		url: "https://www.paramountplus.com"
	},
	{
		id: "peacock",
		name: "Peacock",
		url: "https://www.peacocktv.com"
	},
	{
		id: "Peacock",
		name: "Peacock",
		url: "https://www.peacocktv.com"
	},
	{
		id: "prime-video",
		name: "Prime Video",
		url: "https://www.amazon.com/gp/video/sports?&linkCode=ll2&tag=seasoncaddy-20&linkId=d02ea4d90ced4bafb0da769b759da82a&language=en_US&ref_=as_li_ss_tl"
	},
	{
		id: "Prime Video",
		name: "Prime Video",
		url: "https://www.amazon.com/gp/video/sports?&linkCode=ll2&tag=seasoncaddy-20&linkId=d02ea4d90ced4bafb0da769b759da82a&language=en_US&ref_=as_li_ss_tl"
	},
	{
		id: "RugbyPass",
		name: "RugbyPass",
		url: "https://www.rugbypass.com"
	},
	{
		id: "SEC Network",
		name: "SEC Network",
		url: "https://www.espn.com/watch/espnplus/"
	},
	{
		id: "SECN+",
		name: "SEC Network+",
		url: "https://www.espn.com/watch/espnplus/"
	},
	{
		id: "sling",
		name: "Sling TV",
		url: "https://www.sling.com"
	},
	{
		id: "Sling",
		name: "Sling TV",
		url: "https://www.sling.com"
	},
	{
		id: "sportsnet",
		name: "Sportsnet",
		url: "https://www.sportsnet.ca"
	},
	{
		id: "sportsnet-ca",
		name: "Sportsnet",
		url: "https://watch.sportsnet.ca"
	},
	{
		id: "Sportsnet",
		name: "Sportsnet",
		url: "https://www.sportsnet.ca"
	},
	{
		id: "tbs",
		name: "TBS",
		url: "https://www.tbs.com"
	},
	{
		id: "TBS",
		name: "TBS",
		url: "https://www.tbs.com"
	},
	{
		id: "Tele",
		name: "Tele",
		url: "https://www.televisaunivision.com"
	},
	{
		id: "telemundo",
		name: "Telemundo",
		url: "https://www.telemundo.com/deportes"
	},
	{
		id: "telemundo-app",
		name: "Telemundo App",
		url: "https://www.telemundo.com/deportes"
	},
	{
		id: "telemundo-deportes-ahora",
		name: "Telemundo Deportes Ahora",
		url: "https://www.telemundo.com/deportes"
	},
	{
		id: "CW",
		name: "The CW",
		url: "https://www.cwtv.com"
	},
	{
		id: "roku",
		name: "The Roku Channel",
		url: "https://therokuchannel.roku.com"
	},
	{
		id: "Roku",
		name: "The Roku Channel",
		url: "https://therokuchannel.roku.com"
	},
	{
		id: "tln",
		name: "TLN",
		url: "https://www.tln.ca"
	},
	{
		id: "tnt",
		name: "TNT",
		url: "https://www.tntdrama.com"
	},
	{
		id: "tnt-sports",
		name: "TNT Sports",
		url: "https://www.tntsports.co.uk"
	},
	{
		id: "trutv",
		name: "truTV",
		url: "https://www.trutv.com"
	},
	{
		id: "tsn",
		name: "TSN",
		url: "https://www.tsn.ca"
	},
	{
		id: "TSN",
		name: "TSN",
		url: "https://www.tsn.ca"
	},
	{
		id: "tubi",
		name: "Tubi",
		url: "https://tubitv.com/live"
	},
	{
		id: "tva-sports",
		name: "TVA Sports",
		url: "https://www.tvasports.ca"
	},
	{
		id: "universo",
		name: "Universo",
		url: "https://www.nbc.com/networks/universo"
	},
	{
		id: "usa",
		name: "USA Network",
		url: "https://www.usanetwork.com"
	},
	{
		id: "USA Net",
		name: "USA Network",
		url: "https://www.usanetwork.com"
	},
	{
		id: "Varsity TV",
		name: "Varsity TV",
		url: "https://www.varsity.tv"
	},
	{
		id: "victory-plus",
		name: "Victory+",
		url: "https://victoryplus.com"
	},
	{
		id: "vix",
		name: "ViX",
		url: "https://vix.com"
	},
	{
		id: "wnba-league-pass",
		name: "WNBA League Pass",
		url: "https://www.wnba.com/leaguepass"
	},
	{
		id: "YouTube",
		name: "YouTube",
		url: "https://www.youtube.com"
	},
	{
		id: "youtube-tv",
		name: "YouTube TV",
		url: "https://tv.youtube.com"
	},
	{
		id: "ABC32",
		name: "ABC32",
		url: "https://www.abc.com/watch-live/"
	},
	{
		id: "ABTV",
		name: "ABTV",
		url: ""
	},
	{
		id: "ALT",
		name: "Altitude+",
		url: "https://www.altitudeplus.com/"
	},
	{
		id: "ALT2",
		name: "Altitude+",
		url: "https://www.altitudeplus.com/"
	},
	{
		id: "BN+",
		name: "BN+",
		url: "https://www.nhl.com/blues/"
	},
	{
		id: "CARNHL",
		name: "Hurricanes Hockey Network",
		url: "https://www.nhl.com/hurricanes/team/broadcast-info/"
	},
	{
		id: "CBJHN",
		name: "Blue Jackets Hockey Network",
		url: "https://www.nhl.com/bluejackets/"
	},
	{
		id: "CBJNHL",
		name: "Blue Jackets Hockey Network",
		url: "https://www.nhl.com/bluejackets/"
	},
	{
		id: "CHSN",
		name: "Chicago Sports Network",
		url: "https://subscribe.chsn.com/"
	},
	{
		id: "DSN",
		name: "Delmarva Sports Network",
		url: "https://www.delmarvasportsnetwork.com/subscribe/"
	},
	{
		id: "FOXLA+",
		name: "FOX 11 Los Angeles",
		url: "https://www.foxla.com/live"
	},
	{
		id: "FloLacrosse",
		name: "FloLacrosse",
		url: "https://www.flolacrosse.com/signup"
	},
	{
		id: "HHN",
		name: "Hurricanes Hockey Network",
		url: "https://www.nhl.com/hurricanes/team/broadcast-info/"
	},
	{
		id: "KDFI",
		name: "KDFI MyNetworkTV",
		url: "https://www.fox4news.com/"
	},
	{
		id: "KDFW 4",
		name: "FOX 4 Dallas",
		url: "https://www.fox4news.com/"
	},
	{
		id: "KING",
		name: "KING 5 Seattle",
		url: "https://www.king5.com/"
	},
	{
		id: "KONG",
		name: "KONG Seattle",
		url: "https://www.king5.com/"
	},
	{
		id: "KSTC",
		name: "KSTC 45TV",
		url: "https://www.45tv.com/"
	},
	{
		id: "KSTP",
		name: "KSTP",
		url: "https://kstp.com/"
	},
	{
		id: "KTTV",
		name: "FOX 11 Los Angeles",
		url: "https://www.foxla.com/"
	},
	{
		id: "KTVD",
		name: "Colorado 20",
		url: "https://www.9news.com/"
	},
	{
		id: "KUSA",
		name: "9NEWS Denver",
		url: "https://www.9news.com/"
	},
	{
		id: "Mammoth+",
		name: "Mammoth+",
		url: "https://www.segplus.com/utahmammothplus/"
	},
	{
		id: "MINNHL",
		name: "Minnesota Wild",
		url: "https://watch.wild.com/"
	},
	{
		id: "MNMT",
		name: "Monumental Sports Network",
		url: "https://www.monumentalsportsnetwork.com/"
	},
	{
		id: "MNMT2",
		name: "Monumental Sports Network",
		url: "https://www.monumentalsportsnetwork.com/"
	},
	{
		id: "MSG",
		name: "MSG+",
		url: "https://www.msgplus.com/"
	},
	{
		id: "MSG 2",
		name: "MSG+",
		url: "https://www.msgplus.com/"
	},
	{
		id: "MSG-B",
		name: "MSG+",
		url: "https://www.msgplus.com/"
	},
	{
		id: "MSGSN",
		name: "MSG Sports Network",
		url: "https://www.msgplus.com/"
	},
	{
		id: "MSGSN2",
		name: "MSG Sports Network",
		url: "https://www.msgplus.com/"
	},
	{
		id: "NBCSCA",
		name: "NBC Sports California",
		url: "https://www.nbcsports.com/watch"
	},
	{
		id: "NBCSP",
		name: "NBC Sports Philadelphia",
		url: "https://www.nbcsports.com/watch"
	},
	{
		id: "NBCSP+",
		name: "NBC Sports Philadelphia+",
		url: "https://www.nbcsports.com/watch"
	},
	{
		id: "NESN",
		name: "NESN 360",
		url: "https://nesn.com/nesn360/"
	},
	{
		id: "SCRIPPS",
		name: "Scripps Sports Network",
		url: "https://scrippssportsnetwork.com/"
	},
	{
		id: "SN-PIT",
		name: "SportsNet Pittsburgh",
		url: "https://www.sportsnetpittsburgh.com/"
	},
	{
		id: "STLNHL",
		name: "St. Louis Blues",
		url: "https://www.nhl.com/blues/"
	},
	{
		id: "The Spot",
		name: "The Spot",
		url: "https://thespottv.com/"
	},
	{
		id: "Utah16",
		name: "Utah 16",
		url: "https://utah16.com/"
	},
	{
		id: "Wild+",
		name: "Wild+",
		url: "https://watch.wild.com/"
	},
	{
		id: "WRAL",
		name: "WRAL",
		url: "https://www.wral.com/"
	},
	{
		id: "WWHO",
		name: "WWHO",
		url: "https://www.cwcolumbus.com/"
	},
	{
		id: "acc-network",
		name: "ACC Network",
		url: "https://www.espn.com/watch/"
	},
	{
		id: "espnu",
		name: "ESPNU",
		url: "https://www.espn.com/watch/"
	},
	{
		id: "sec-network",
		name: "SEC Network",
		url: "https://www.espn.com/watch/"
	},
	{
		id: "tbd",
		name: "Provider pending",
		url: ""
	}
];
var EVENT_TITLE_ONLY_SPORTS = /* @__PURE__ */ new Set([
	"bull-riding",
	"cycling",
	"darts",
	"extreme-sports",
	"golf",
	"fighting",
	"Fighting",
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
	"ultimate-frisbee"
]);
function normalizeSportDisplayId(value) {
	return value.trim().toLowerCase().replace(/[_\s]+/g, "-").replace(/-+/g, "-");
}
function isEventTitleOnlySport(sport) {
	return EVENT_TITLE_ONLY_SPORTS.has(normalizeSportDisplayId(sport));
}
var UFC_EVENT_TITLE_ONLY_RE = /^Dana White[’']s Contender Series:/i;
/**
* Some combat listings are programme/card names rather than a named
* fighter-vs-fighter matchup. Keep those as one event title instead of
* manufacturing a "vs. UFC" opponent from the competition field.
*/
function isEventTitleOnlyGame(game) {
	if (game.eventKind === "event" && game.eventName?.trim()) return true;
	if (isEventTitleOnlySport(game.sport)) return true;
	return normalizeSportDisplayId(game.sport) === "mma" && UFC_EVENT_TITLE_ONLY_RE.test(game.eventName?.trim() ?? "");
}
var HERO_FIGHT_EXTRACTOR_SPORTS = /* @__PURE__ */ new Set([
	"bare-knuckle-fighting",
	"boxing",
	"mma"
]);
var COMBAT_LANGUAGE_PREFIX_RE = /^(?:en\s+espa(?:ñ|n)ol|spanish|english)\s*[-:]\s*/i;
var COMBAT_CARD_SUFFIX_RE = /\s*(?:[-:]\s*)?(?:early\s+prelims?|prelims?|main\s+card|preliminary\s+card|early\s+preliminary\s+card|open\s+workouts?|ceremonial\s+weigh[-\s]?ins?|weigh[-\s]?ins?)\s*$/i;
function cleanHeroFighterName(value, side) {
	let cleaned = value.trim().replace(COMBAT_LANGUAGE_PREFIX_RE, "").trim();
	if (side === "home" && cleaned.includes(":")) cleaned = cleaned.replace(/^.*:\s*/, "").trim();
	cleaned = cleaned.replace(COMBAT_CARD_SUFFIX_RE, "").trim();
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
function heroCompetitors(game) {
	const eventName = game.eventName?.trim() ?? "";
	const sport = normalizeSportDisplayId(game.sport);
	if (HERO_FIGHT_EXTRACTOR_SPORTS.has(sport)) {
		const fightMatch = eventName.match(/^(.+?)\s+vs\.?\s+(.+)$/i);
		if (fightMatch) {
			const home = cleanHeroFighterName(fightMatch[1], "home");
			const away = cleanHeroFighterName(fightMatch[2], "away");
			if (home && away) return {
				home,
				away
			};
		}
	}
	return {
		home: game.canonicalHome ?? game.home,
		away: game.canonicalAway ?? game.away
	};
}
function heroDisplayTitle(game) {
	if (game.eventKind === "event" && game.eventName?.trim()) return game.eventName.trim();
	if (isEventTitleOnlyGame(game)) return game.eventName?.trim() || game.home;
	const competitors = heroCompetitors(game);
	return `${competitors.home} vs. ${competitors.away}`;
}
var HERO_TEXT_ONLY_COMBAT_SPORTS = /* @__PURE__ */ new Set([
	"bare-knuckle-fighting",
	"boxing",
	"mma"
]);
/**
* Combat-sport heroes should show the competitors' names without fabricated
* initials/crest circles. Fighter photography can be added later only when
* SeasonCaddy has a licensed/authorized image source.
*/
function hideHeroCompetitorArtwork(sport) {
	return HERO_TEXT_ONLY_COMBAT_SPORTS.has(normalizeSportDisplayId(sport));
}
function boxingDisplayTitle(game) {
	const eventName = game.eventName?.trim() ?? "";
	const matchup = eventName.replace(/\s+vs\.?\s+boxing\s*$/i, "").trim().match(/^(.+?)\s+vs\.?\s+(.+)$/i);
	if (matchup) {
		const home = matchup[1].trim();
		const away = matchup[2].trim();
		if (home && away) return `${home} vs. ${away}`;
	}
	if (eventName) return eventName;
	const home = game.canonicalHome ?? game.home;
	const away = game.canonicalAway ?? game.away;
	return home && away ? `${home} vs. ${away}` : home || away || "Boxing";
}
function gameDisplayTitle(game) {
	if (normalizeSportDisplayId(game.sport) === "boxing") return boxingDisplayTitle(game);
	if (game.eventKind === "event" && game.eventName?.trim()) return game.eventName.trim();
	if (isEventTitleOnlyGame(game)) return game.eventName?.trim() || game.canonicalHome || game.home;
	return `${game.canonicalHome ?? game.home} vs. ${game.canonicalAway ?? game.away}`;
}
function providerById(id) {
	return providers.find((provider) => provider.id === id) ?? providers.find((provider) => provider.id === "tbd");
}
var regions = [
	"United States",
	"United Kingdom",
	"Canada"
];
/**
* Generic provider fallback.
*
* Automated competitions should resolve region-specific
* broadcast information through the Worker/broadcast API.
* This helper intentionally contains no fixture-specific
* or competition-specific broadcast assumptions.
*/
function getProviderIdsForGame(game, _region) {
	const providerIds = game.providerIds?.filter(Boolean);
	if (providerIds && providerIds.length > 0) return Array.from(new Set(providerIds));
	if (game.providerId) return [game.providerId];
	return ["tbd"];
}
function timeZoneForRegion(region) {
	if (region === "United States" || region.startsWith("United States ·")) return "America/New_York";
	if (region === "United Kingdom") return "Europe/London";
	if (region === "Canada") return "America/Toronto";
	return "America/New_York";
}
function formatRegionalTime(kickoff, region) {
	if (!kickoff) return "Time TBD";
	const date = new Date(kickoff);
	if (Number.isNaN(date.getTime())) return "Time TBD";
	if (region === "United States" || region.startsWith("United States ·") || region === "Canada") return `${new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: "America/New_York"
	}).format(date)} ET / ${new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: "America/Los_Angeles"
	}).format(date)} PT`;
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: timeZoneForRegion(region)
	}).format(date);
}
function formatKickoff(iso, scheduledDate, scheduleLabel, timeZone) {
	if (!iso) {
		if (scheduleLabel) return `${scheduleLabel} · Time TBD`;
		if (!scheduledDate) return "Date & time TBD";
		return `${(/* @__PURE__ */ new Date(`${scheduledDate}T12:00:00`)).toLocaleDateString(void 0, {
			weekday: "short",
			month: "short",
			day: "numeric",
			timeZone
		})} · Time TBD`;
	}
	return new Date(iso).toLocaleString(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		timeZone
	});
}
var DEFAULT_LIVE_DURATION_MS = 108e5;
var LIVE_DURATION_BY_SPORT_MS = {
	soccer: 72e5,
	"american-football": 126e5,
	football: 126e5,
	basketball: 9e6,
	"ice-hockey": 9e6,
	baseball: 126e5,
	softball: 72e5,
	volleyball: 72e5,
	"field-hockey": 36e5,
	"rugby-union": 72e5,
	"rugby-league": 72e5,
	afl: 108e5,
	lacrosse: 36e5,
	"water-polo": 36e5,
	handball: 36e5,
	tennis: 108e5,
	"table-tennis": 36e5,
	pickleball: 36e5,
	cricket: 252e5,
	motorsport: 108e5,
	golf: 216e5,
	boxing: 216e5,
	mma: 216e5,
	"bare-knuckle-fighting": 144e5,
	grappling: 144e5,
	wrestling: 72e5,
	darts: 144e5,
	"bull-riding": 72e5,
	cycling: 216e5,
	triathlon: 144e5,
	marathon: 144e5,
	"road-running": 144e5,
	surfing: 108e5,
	"track-and-field": 18e6,
	swimming: 18e6,
	"swimming-diving": 18e6
};
function fixtureTimestamp(value) {
	if (!value) return null;
	const timestamp = new Date(value).getTime();
	return Number.isNaN(timestamp) ? null : timestamp;
}
function expectedLiveDurationMs(sport) {
	return LIVE_DURATION_BY_SPORT_MS[sport.trim().toLowerCase()] ?? DEFAULT_LIVE_DURATION_MS;
}
function gameLiveEndTime(game) {
	const kickoff = fixtureTimestamp(game.kickoff);
	if (kickoff === null) return null;
	const fallbackEnd = kickoff + expectedLiveDurationMs(game.sport);
	const providerEnd = fixtureTimestamp(game.endTime);
	if (providerEnd !== null && providerEnd > kickoff) return providerEnd;
	return fallbackEnd;
}
function isGameLive(game, now = Date.now()) {
	if (game.status === "Final") return false;
	const kickoff = fixtureTimestamp(game.kickoff);
	if (kickoff === null) return game.status === "Live now";
	if (now < kickoff) return false;
	const liveEnd = gameLiveEndTime(game);
	return liveEnd !== null && now < liveEnd;
}
function isUpcomingOrLiveGame(game, now = Date.now()) {
	if (isGameLive(game, now)) return true;
	if (game.status === "Final") return false;
	const kickoff = fixtureTimestamp(game.kickoff);
	if (kickoff !== null) return kickoff >= now;
	if (game.scheduledDate) {
		const scheduledEnd = (/* @__PURE__ */ new Date(`${game.scheduledDate}T23:59:59`)).getTime();
		return !Number.isNaN(scheduledEnd) && scheduledEnd >= now;
	}
	return false;
}
function countdown(target) {
	if (!target) return "Time TBD";
	const diff = new Date(target).getTime() - Date.now();
	if (diff <= 0) return "Started";
	const d = Math.floor(diff / 864e5);
	const h = Math.floor(diff % 864e5 / 36e5);
	const m = Math.floor(diff % 36e5 / 6e4);
	const s = Math.floor(diff % 6e4 / 1e3);
	return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
}
function isPlaceholderProviderId(providerId) {
	const normalized = providerId.trim().toLowerCase().replace(/[_\s]+/g, "-");
	return normalized === "tbd" || normalized === "pending" || normalized === "provider-pending" || normalized === "broadcast-pending" || normalized === "not-live-uk";
}
function providerToBroadcastProvider(provider) {
	return {
		id: provider.providerId,
		providerId: provider.providerId,
		name: provider.providerName,
		sourceUrl: provider.sourceUrl,
		url: provider.eventUrl,
		evidence: provider.evidence,
		matchMethod: provider.matchMethod,
		matchConfidence: provider.matchConfidence
	};
}
function providerTargets(provider) {
	return regions.includes(provider.region) ? [provider.region] : [];
}
/**
* Builds the existing BroadcastRecord interface from the providers JSON already
* aggregated by public.frontend_fixtures. Keeping this as a pure transformation
* lets pages fetch fixtures once and derive both games and broadcasts locally.
*/
function fixturesToBroadcasts(fixtures) {
	const grouped = /* @__PURE__ */ new Map();
	for (const fixture of fixtures) for (const provider of fixture.providers) {
		if (isPlaceholderProviderId(provider.providerId)) continue;
		for (const region of providerTargets(provider)) {
			const key = `${fixture.id}::${region}`;
			const existing = grouped.get(key);
			const broadcastProvider = providerToBroadcastProvider(provider);
			if (!existing) {
				grouped.set(key, {
					fixtureId: fixture.id,
					league: fixture.competitionName,
					competitionId: fixture.competitionId,
					region,
					home: fixture.home,
					away: fixture.away,
					providerId: provider.providerId,
					providerIds: [provider.providerId],
					providers: [broadcastProvider],
					source: "Supabase frontend_fixtures",
					sourceType: "official-broadcaster",
					providerProvenance: [{
						providerId: provider.providerId,
						sourceType: "official-broadcaster",
						sourceName: provider.providerName,
						sourceUrl: provider.sourceUrl
					}]
				});
				continue;
			}
			if (!existing.providerIds.includes(provider.providerId)) existing.providerIds.push(provider.providerId);
			if (!(existing.providers ?? []).some((item) => (item.providerId ?? item.id) === provider.providerId)) existing.providers = [...existing.providers ?? [], broadcastProvider];
			if (!(existing.providerProvenance ?? []).some((item) => item.providerId === provider.providerId)) existing.providerProvenance = [...existing.providerProvenance ?? [], {
				providerId: provider.providerId,
				sourceType: "official-broadcaster",
				sourceName: provider.providerName,
				sourceUrl: provider.sourceUrl
			}];
		}
	}
	return Array.from(grouped.values());
}
function displayNameFromCompetitionId(value) {
	return value.trim().split("-").filter(Boolean).map((part) => {
		if (/^[a-z]{2,4}$/i.test(part)) return part.toUpperCase();
		if (part.toLowerCase() === "motogp") return "MotoGP";
		return part.charAt(0).toUpperCase() + part.slice(1);
	}).join(" ");
}
function normalizeGameStatus(status) {
	const value = String(status ?? "").trim().toLowerCase();
	if ([
		"final",
		"fulltime",
		"full time",
		"finished",
		"complete",
		"completed"
	].includes(value)) return "Final";
	if ([
		"live",
		"live now",
		"in progress",
		"in-progress"
	].includes(value)) return "Live now";
	if ([
		"scheduled",
		"upcoming",
		"upcoming fixture",
		"not started",
		"pre"
	].includes(value)) return "Upcoming fixture";
	return "Time TBD";
}
function earliestProviderEndTime(fixture) {
	const kickoff = fixture.kickoff ? new Date(fixture.kickoff).getTime() : null;
	return fixture.providers.map((provider) => provider.endTime).filter((value) => Boolean(value)).map((value) => ({
		value,
		timestamp: new Date(value).getTime()
	})).filter(({ timestamp }) => !Number.isNaN(timestamp) && (kickoff === null || timestamp > kickoff)).sort((a, b) => a.timestamp - b.timestamp)[0]?.value ?? null;
}
function frontendFixtureToGame(fixture) {
	return {
		id: fixture.id,
		competitionId: fixture.competitionId,
		sport: fixture.sport,
		league: fixture.competitionName || displayNameFromCompetitionId(fixture.competitionId),
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
		scheduleLabel: fixture.stage ?? (fixture.round !== void 0 ? String(fixture.round) : void 0),
		providerId: "tbd",
		providerIds: ["tbd"],
		endTime: earliestProviderEndTime(fixture),
		status: normalizeGameStatus(fixture.status)
	};
}
var sportsDataSupabase = createClient(void 0, void 0, { auth: {
	storageKey: "seasoncaddy-public-data",
	persistSession: false,
	autoRefreshToken: false,
	detectSessionInUrl: false
} });
function stringValue(row, ...keys) {
	for (const key of keys) {
		const value = row[key];
		if (typeof value === "string" && value.trim()) return value.trim();
		if (typeof value === "number" && Number.isFinite(value)) return String(value);
	}
}
function numberValue(row, ...keys) {
	for (const key of keys) {
		const value = row[key];
		if (typeof value === "number" && Number.isFinite(value)) return value;
		if (typeof value === "string" && value.trim()) {
			const parsed = Number(value);
			if (Number.isFinite(parsed)) return parsed;
		}
	}
}
function arrayValue(value) {
	if (Array.isArray(value)) return value;
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
	return [];
}
function stringArrayValue(value) {
	return arrayValue(value).filter((item) => typeof item === "string").map((item) => item.trim()).filter(Boolean);
}
function normalizeProviderRegion(region) {
	const value = region.trim().toLowerCase();
	if (value === "us" || value === "usa" || value === "united states") return "United States";
	if (value === "uk" || value === "gb" || value === "united kingdom") return "United Kingdom";
	if (value === "ca" || value === "canada") return "Canada";
	if (value === "global" || value === "worldwide") return "Global";
	return region.trim();
}
function normalizeProvider(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const row = value;
	const providerId = stringValue(row, "provider_id", "providerId", "id");
	if (!providerId) return null;
	const rawRegion = stringValue(row, "region", "territory") ?? "United States";
	return {
		providerId,
		providerName: stringValue(row, "provider_name", "providerName", "name") ?? providerId,
		region: normalizeProviderRegion(rawRegion),
		eventUrl: stringValue(row, "event_url", "eventUrl", "url"),
		sourceUrl: stringValue(row, "source_url", "sourceUrl"),
		matchMethod: stringValue(row, "match_method", "matchMethod"),
		matchConfidence: numberValue(row, "match_confidence", "matchConfidence", "confidence"),
		evidence: stringValue(row, "evidence", "match_evidence", "matchEvidence"),
		startTime: stringValue(row, "start_time", "startTime", "provider_start", "providerStart"),
		endTime: stringValue(row, "end_time", "endTime", "provider_end", "providerEnd")
	};
}
function normalizeFixture(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	const row = value;
	const id = stringValue(row, "id", "fixture_id", "fixtureId");
	const competitionId = stringValue(row, "competition_id", "competitionId");
	const sport = stringValue(row, "sport");
	const home = stringValue(row, "home", "home_team", "homeTeam");
	const away = stringValue(row, "away", "away_team", "awayTeam");
	if (!id || !competitionId || !sport || !home || !away) return null;
	const providers = arrayValue(row.providers).map(normalizeProvider).filter((provider) => provider !== null);
	return {
		id,
		competitionId,
		competitionName: stringValue(row, "competition_name", "competitionName", "competition", "league") ?? competitionId,
		sport,
		locationName: stringValue(row, "location_name", "locationName"),
		countryName: stringValue(row, "country_name", "countryName"),
		countryCode: stringValue(row, "country_code", "countryCode"),
		regionName: stringValue(row, "region_name", "regionName"),
		confederation: stringValue(row, "confederation"),
		geoScope: stringValue(row, "geo_scope", "geoScope"),
		competitionGender: stringValue(row, "competition_gender", "competitionGender"),
		competitionType: stringValue(row, "competition_type", "competitionType"),
		geoConfidence: numberValue(row, "geo_confidence", "geoConfidence"),
		geoReferenceId: stringValue(row, "geo_reference_id", "geoReferenceId"),
		geoMatchMethod: stringValue(row, "geo_match_method", "geoMatchMethod"),
		season: stringValue(row, "season"),
		eventKind: stringValue(row, "event_kind", "eventKind"),
		eventName: stringValue(row, "event_name", "eventName"),
		participants: arrayValue(row.participants),
		home,
		away,
		homeTeamId: stringValue(row, "home_team_id", "homeTeamId"),
		awayTeamId: stringValue(row, "away_team_id", "awayTeamId"),
		canonicalHome: stringValue(row, "canonical_home", "canonicalHome"),
		canonicalAway: stringValue(row, "canonical_away", "canonicalAway"),
		homeCrestUrl: stringValue(row, "home_crest_url", "homeCrestUrl"),
		awayCrestUrl: stringValue(row, "away_crest_url", "awayCrestUrl"),
		homeCrestSourceKind: stringValue(row, "home_crest_source_kind", "homeCrestSourceKind"),
		awayCrestSourceKind: stringValue(row, "away_crest_source_kind", "awayCrestSourceKind"),
		kickoff: stringValue(row, "frontend_kickoff", "frontendKickoff", "kickoff", "start_time", "startTime") ?? null,
		scheduledDate: stringValue(row, "scheduled_date", "scheduledDate"),
		status: stringValue(row, "status"),
		round: stringValue(row, "round") ?? numberValue(row, "round"),
		stage: stringValue(row, "stage"),
		venue: stringValue(row, "venue"),
		sourceUrl: stringValue(row, "source_url", "sourceUrl"),
		providers,
		providerCount: numberValue(row, "provider_count", "providerCount") ?? providers.length,
		sortAt: stringValue(row, "frontend_sort_at", "frontendSortAt", "sort_at", "sortAt"),
		refreshedAt: stringValue(row, "refreshed_at", "refreshedAt")
	};
}
var SUPABASE_PAGE_SIZE = 1e3;
var IDENTITY_CATALOG_CACHE_TTL_MS = 9e5;
var FRONTEND_FIXTURE_SELECT = [
	"id",
	"competition_id",
	"competition_name",
	"sport",
	"event_kind",
	"event_name",
	"home",
	"away",
	"home_team_id",
	"away_team_id",
	"canonical_home",
	"canonical_away",
	"home_crest_url",
	"away_crest_url",
	"frontend_kickoff",
	"scheduled_date",
	"status",
	"round",
	"stage",
	"providers",
	"provider_count",
	"frontend_sort_at"
].join(",");
[
	"competition_id",
	"competition_name",
	"sport",
	"upcoming_count",
	"location_name",
	"country_name",
	"country_code",
	"region_name",
	"confederation",
	"geo_scope",
	"competition_gender",
	"competition_type",
	"geo_confidence",
	"geo_reference_id",
	"geo_match_method"
].join(",");
var FRONTEND_CATALOG_IDENTITY_SELECT = [
	"sport",
	"competition_id",
	"competition_label",
	"\"Canonical name\"",
	"Aliases",
	"active",
	"artwork_crest_url",
	"artwork_source_url",
	"artwork_source_kind",
	"artwork_source_host",
	"artwork_license_name",
	"artwork_attribution",
	"artwork_wikidata_id",
	"artwork_wikipedia_title",
	"artwork_status",
	"artwork_confidence",
	"artwork_checked_at",
	"artwork_metadata",
	"artwork_created_at",
	"artwork_updated_at"
].join(",");
var identityCatalogCache = null;
var identityCatalogRequest = null;
var identityCompetitionCache = /* @__PURE__ */ new Map();
async function queryIdentityCatalog(competitionIds) {
	const rows = [];
	for (let from = 0;; from += SUPABASE_PAGE_SIZE) {
		let query = sportsDataSupabase.from("New Gate Name Table").select(FRONTEND_CATALOG_IDENTITY_SELECT).eq("active", true).order("sport", { ascending: true }).order("competition_id", { ascending: true }).order("\"Canonical name\"", { ascending: true }).range(from, from + SUPABASE_PAGE_SIZE - 1);
		if (competitionIds?.length === 1) query = query.eq("competition_id", competitionIds[0]);
		else if (competitionIds && competitionIds.length > 1) query = query.in("competition_id", competitionIds);
		const { data, error } = await query;
		if (error) throw new Error(`Supabase New Gate Name Table query failed: ${error.message}`);
		const page = Array.isArray(data) ? data : [];
		rows.push(...page);
		if (page.length < SUPABASE_PAGE_SIZE) break;
	}
	const competitions = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const sport = stringValue(row, "sport");
		const competitionId = stringValue(row, "competition_id");
		const competitionName = stringValue(row, "competition_label") ?? competitionId;
		const displayName = stringValue(row, "Canonical name");
		if (!sport || !competitionId || !displayName) continue;
		const key = `${sport}::${competitionId}`;
		let competition = competitions.get(key);
		if (!competition) {
			competition = {
				competitionId,
				competitionName,
				sport,
				teamNames: [],
				canonicalTeams: [],
				providerIds: [],
				fixtureCount: 0,
				upcomingCount: 0
			};
			competitions.set(key, competition);
		}
		const aliases = stringArrayValue(row.Aliases);
		competition.teamNames.push(displayName);
		competition.canonicalTeams.push({
			teamId: `${competitionId}:${displayName}`,
			displayName,
			aliases,
			crestUrl: stringValue(row, "artwork_crest_url"),
			crestSourceKind: stringValue(row, "artwork_source_kind"),
			crestSourceUrl: stringValue(row, "artwork_source_url"),
			artworkStatus: stringValue(row, "artwork_status"),
			artworkConfidence: numberValue(row, "artwork_confidence"),
			artworkSourceHost: stringValue(row, "artwork_source_host"),
			artworkLicenseName: stringValue(row, "artwork_license_name"),
			artworkAttribution: stringValue(row, "artwork_attribution"),
			artworkWikidataId: stringValue(row, "artwork_wikidata_id"),
			artworkWikipediaTitle: stringValue(row, "artwork_wikipedia_title"),
			artworkCheckedAt: stringValue(row, "artwork_checked_at"),
			artworkMetadata: row.artwork_metadata ?? void 0,
			artworkCreatedAt: stringValue(row, "artwork_created_at"),
			artworkUpdatedAt: stringValue(row, "artwork_updated_at")
		});
	}
	return Array.from(competitions.values()).map((competition) => ({
		...competition,
		teamNames: Array.from(new Set(competition.teamNames)).sort((a, b) => a.localeCompare(b)),
		canonicalTeams: competition.canonicalTeams.sort((a, b) => a.displayName.localeCompare(b.displayName))
	})).sort((a, b) => a.sport.localeCompare(b.sport) || a.competitionName.localeCompare(b.competitionName) || a.competitionId.localeCompare(b.competitionId));
}
async function fetchFrontendIdentityCatalog() {
	const now = Date.now();
	if (identityCatalogCache && identityCatalogCache.expiresAt > now) return identityCatalogCache.data;
	identityCatalogRequest ??= queryIdentityCatalog().then((data) => {
		identityCatalogCache = {
			data,
			expiresAt: Date.now() + IDENTITY_CATALOG_CACHE_TTL_MS
		};
		return data;
	}).finally(() => {
		identityCatalogRequest = null;
	});
	return identityCatalogRequest;
}
async function fetchFrontendCompetitionIdentity(competitionIds) {
	const normalizedCompetitionIds = Array.from(new Set(competitionIds.filter(Boolean))).sort();
	if (normalizedCompetitionIds.length === 0) return [];
	const now = Date.now();
	if (identityCatalogCache && identityCatalogCache.expiresAt > now) {
		const requestedIds = new Set(normalizedCompetitionIds);
		return identityCatalogCache.data.filter((row) => requestedIds.has(row.competitionId));
	}
	const cachedRows = [];
	const missingIds = [];
	for (const competitionId of normalizedCompetitionIds) {
		const cached = identityCompetitionCache.get(competitionId);
		if (cached && cached.expiresAt > now) cachedRows.push(cached.data);
		else {
			if (cached) identityCompetitionCache.delete(competitionId);
			missingIds.push(competitionId);
		}
	}
	const fetchedRows = missingIds.length > 0 ? await queryIdentityCatalog(missingIds) : [];
	const expiresAt = Date.now() + IDENTITY_CATALOG_CACHE_TTL_MS;
	for (const row of fetchedRows) identityCompetitionCache.set(row.competitionId, {
		data: row,
		expiresAt
	});
	return [...cachedRows, ...fetchedRows].sort((a, b) => {
		const bySport = a.sport.localeCompare(b.sport);
		if (bySport !== 0) return bySport;
		const byName = a.competitionName.localeCompare(b.competitionName);
		if (byName !== 0) return byName;
		return a.competitionId.localeCompare(b.competitionId);
	});
}
async function fetchFrontendCatalog() {
	return fetchFrontendIdentityCatalog();
}
async function fetchFrontendHomeInitial(limit = 100) {
	const safeLimit = Math.max(1, Math.min(250, Math.floor(limit)));
	const now = /* @__PURE__ */ new Date();
	const liveFloor = /* @__PURE__ */ new Date(now.getTime() - 864e5);
	const [liveResult, upcomingResult] = await Promise.all([sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).eq("status", "live").gte("frontend_sort_at", liveFloor.toISOString()).order("frontend_sort_at", {
		ascending: true,
		nullsFirst: false
	}).order("id", { ascending: true }).limit(Math.min(25, safeLimit)), sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).gte("frontend_sort_at", now.toISOString()).order("frontend_sort_at", {
		ascending: true,
		nullsFirst: false
	}).order("id", { ascending: true }).limit(safeLimit)]);
	if (liveResult.error) throw new Error(`Supabase initial Home live fixture feed failed: ${liveResult.error.message}`);
	if (upcomingResult.error) throw new Error(`Supabase initial Home upcoming fixture feed failed: ${upcomingResult.error.message}`);
	const liveFixtures = (Array.isArray(liveResult.data) ? liveResult.data : []).map(normalizeFixture).filter((fixture) => fixture !== null);
	const upcomingFixtures = (Array.isArray(upcomingResult.data) ? upcomingResult.data : []).map(normalizeFixture).filter((fixture) => fixture !== null);
	const byId = /* @__PURE__ */ new Map();
	for (const fixture of [...liveFixtures, ...upcomingFixtures]) if (!byId.has(fixture.id)) byId.set(fixture.id, fixture);
	return Array.from(byId.values()).slice(0, safeLimit);
}
async function fetchFrontendFixtureById(fixtureId) {
	const { data, error } = await sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).eq("id", fixtureId).maybeSingle();
	if (error) throw new Error(`Supabase frontend fixture cache lookup failed: ${error.message}`);
	return data ? normalizeFixture(data) : null;
}
async function fetchFrontendFixtures(competitionIds, options) {
	const normalizedCompetitionIds = Array.isArray(competitionIds) ? Array.from(new Set(competitionIds.filter(Boolean))).sort() : competitionIds ? [competitionIds] : [];
	const requestedLimit = options?.limit;
	const rows = [];
	let offset = Math.max(0, options?.offset ?? 0);
	while (true) {
		const pageSize = requestedLimit ? Math.min(SUPABASE_PAGE_SIZE, Math.max(0, requestedLimit - rows.length)) : SUPABASE_PAGE_SIZE;
		if (pageSize <= 0) break;
		let query = sportsDataSupabase.from("frontend_fixture_cache").select(FRONTEND_FIXTURE_SELECT).eq("frontend_visible", true).order("frontend_sort_at", {
			ascending: true,
			nullsFirst: false
		}).order("id", { ascending: true }).range(offset, offset + pageSize - 1);
		if (options?.sortAtOrAfter) query = query.gte("frontend_sort_at", options.sortAtOrAfter);
		if (options?.statusIn?.length) query = query.in("status", options.statusIn);
		if (options?.canonicalHomeIn?.length) query = query.in("canonical_home", options.canonicalHomeIn);
		if (options?.canonicalAwayIn?.length) query = query.in("canonical_away", options.canonicalAwayIn);
		const normalizedSports = Array.from(new Set((options?.sportIn ?? []).map((sport) => sport.trim().toLowerCase()).filter(Boolean)));
		if (normalizedSports.length === 1) query = query.eq("sport", normalizedSports[0]);
		else if (normalizedSports.length > 1) query = query.in("sport", normalizedSports);
		if (normalizedCompetitionIds.length === 1) query = query.eq("competition_id", normalizedCompetitionIds[0]);
		else if (normalizedCompetitionIds.length > 1) query = query.in("competition_id", normalizedCompetitionIds);
		const { data, error } = await query;
		if (error) throw new Error(`Supabase frontend fixture cache query failed: ${error.message}`);
		const page = Array.isArray(data) ? data : [];
		rows.push(...page);
		if (page.length < pageSize) break;
		if (requestedLimit && rows.length >= requestedLimit) break;
		offset += pageSize;
	}
	return rows.map(normalizeFixture).filter((fixture) => fixture !== null);
}
function identityLookupKey(value) {
	return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
function resolveSavedTeamLabels(competition, savedLabels) {
	if (!competition || competition.canonicalTeams.length === 0) return {
		canonicalNames: [],
		allResolved: false
	};
	const canonicalNames = [];
	for (const savedLabel of savedLabels) {
		const key = identityLookupKey(savedLabel);
		const match = competition.canonicalTeams.find((team) => [team.displayName, ...team.aliases].some((candidate) => candidate && identityLookupKey(candidate) === key));
		if (!match) return {
			canonicalNames: [],
			allResolved: false
		};
		canonicalNames.push(match.displayName);
	}
	return {
		canonicalNames: Array.from(new Set(canonicalNames)).sort(),
		allResolved: true
	};
}
function fixtureMatchesSavedTeamLabels(fixture, competitionId, savedLabels, competition) {
	if (savedLabels.includes(competitionId)) return true;
	const acceptedKeys = new Set(savedLabels.map(identityLookupKey).filter(Boolean));
	if (competition) for (const savedLabel of savedLabels) {
		const savedKey = identityLookupKey(savedLabel);
		const canonicalTeam = competition.canonicalTeams.find((team) => [team.displayName, ...team.aliases].some((candidate) => candidate && identityLookupKey(candidate) === savedKey));
		if (!canonicalTeam) continue;
		for (const candidate of [canonicalTeam.displayName, ...canonicalTeam.aliases]) {
			if (!candidate) continue;
			acceptedKeys.add(identityLookupKey(candidate));
		}
	}
	return [
		fixture.home,
		fixture.away,
		fixture.canonicalHome,
		fixture.canonicalAway
	].some((candidate) => Boolean(candidate && acceptedKeys.has(identityLookupKey(candidate))));
}
var MAX_TEAM_NAMES_PER_FILTERED_QUERY = 24;
async function fetchFrontendFixturesForSavedTeams(savedLeagues, savedSports = []) {
	const entries = Object.entries(savedLeagues).map(([competitionId, teamNames]) => [competitionId, Array.from(new Set(teamNames.map((teamName) => teamName.trim()).filter(Boolean))).sort()]).filter(([, teamNames]) => teamNames.length > 0).sort(([a], [b]) => a.localeCompare(b));
	const normalizedSavedSports = Array.from(new Set(savedSports.map((sport) => sport.trim().toLowerCase()).filter(Boolean))).sort();
	if (entries.length === 0 && normalizedSavedSports.length === 0) return [];
	const competitionIds = entries.map(([competitionId]) => competitionId);
	let identityByCompetition = /* @__PURE__ */ new Map();
	try {
		const identityRows = await fetchFrontendCompetitionIdentity(competitionIds);
		identityByCompetition = new Map(identityRows.map((competition) => [competition.competitionId, competition]));
	} catch (error) {
		console.warn("Could not resolve saved-team identity filters", error);
	}
	const resultSets = await Promise.all([...entries.map(async ([competitionId, teamNames]) => {
		const identityCompetition = identityByCompetition.get(competitionId);
		if (teamNames.includes(competitionId)) return fetchFrontendFixtures(competitionId);
		const { canonicalNames, allResolved } = resolveSavedTeamLabels(identityCompetition, teamNames);
		if (allResolved && canonicalNames.length > 0 && teamNames.length <= MAX_TEAM_NAMES_PER_FILTERED_QUERY) {
			const [homeRows, awayRows] = await Promise.all([fetchFrontendFixtures(competitionId, { canonicalHomeIn: canonicalNames }), fetchFrontendFixtures(competitionId, { canonicalAwayIn: canonicalNames })]);
			const byId = /* @__PURE__ */ new Map();
			for (const fixture of [...homeRows, ...awayRows]) byId.set(fixture.id, fixture);
			return Array.from(byId.values());
		}
		return (await fetchFrontendFixtures(competitionId)).filter((fixture) => fixtureMatchesSavedTeamLabels(fixture, competitionId, teamNames, identityCompetition));
	}), ...normalizedSavedSports.length > 0 ? [fetchFrontendFixtures(void 0, { sportIn: normalizedSavedSports })] : []]);
	const byId = /* @__PURE__ */ new Map();
	for (const fixture of resultSets.flat()) byId.set(fixture.id, fixture);
	return Array.from(byId.values()).sort((a, b) => {
		const aSort = a.sortAt ?? a.kickoff ?? "9999-12-31T23:59:59.999Z";
		const bSort = b.sortAt ?? b.kickoff ?? "9999-12-31T23:59:59.999Z";
		const byTime = aSort.localeCompare(bSort);
		return byTime !== 0 ? byTime : a.id.localeCompare(b.id);
	});
}
function catalogDisplayTeamNames(row) {
	const canonicalByKey = /* @__PURE__ */ new Map();
	const displayNames = /* @__PURE__ */ new Set();
	for (const team of row.canonicalTeams) {
		const displayName = team.displayName.trim();
		if (!displayName) continue;
		displayNames.add(displayName);
		for (const candidate of [team.displayName, ...team.aliases]) {
			if (!candidate) continue;
			canonicalByKey.set(identityLookupKey(candidate), displayName);
		}
	}
	for (const rawName of row.teamNames) {
		const trimmed = rawName.trim();
		if (!trimmed) continue;
		const canonicalName = canonicalByKey.get(identityLookupKey(trimmed));
		displayNames.add(canonicalName ?? trimmed);
	}
	return Array.from(displayNames).sort((a, b) => a.localeCompare(b));
}
async function fetchCatalog() {
	return fetchFrontendCatalog();
}
var HOME_LIVE_LOOKBACK_MS = 2592e6;
async function fetchUpcomingDatasetForCompetitions(competitionIds) {
	const normalizedIds = Array.from(new Set((competitionIds ?? []).filter(Boolean))).sort();
	if (normalizedIds.length === 0) return {
		fixtures: [],
		games: [],
		broadcasts: []
	};
	const fixtures = await fetchFrontendFixtures(normalizedIds, { sortAtOrAfter: (/* @__PURE__ */ new Date(Date.now() - HOME_LIVE_LOOKBACK_MS)).toISOString() });
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchDatasetForSavedTeams(savedLeagues, savedSports = []) {
	const fixtures = await fetchFrontendFixturesForSavedTeams(savedLeagues ?? {}, savedSports ?? []);
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchGlobalInitialUpcomingDataset(limit = 100) {
	const fixtures = await fetchFrontendHomeInitial(limit);
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchGlobalUpcomingDataset(limit = 500, offset = 0) {
	const fixtures = await fetchFrontendFixtures(void 0, {
		limit,
		offset,
		sortAtOrAfter: (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString()
	});
	return {
		fixtures,
		games: fixtures.map(frontendFixtureToGame),
		broadcasts: fixturesToBroadcasts(fixtures)
	};
}
async function fetchDatasetForGame(gameId) {
	const fixture = await fetchFrontendFixtureById(gameId);
	if (!fixture) return null;
	return {
		fixtures: [fixture],
		games: [frontendFixtureToGame(fixture)],
		broadcasts: fixturesToBroadcasts([fixture])
	};
}
//#endregion
export { timeZoneForRegion as C, providerById as S, heroDisplayTitle as _, fetchDatasetForSavedTeams as a, isGameLive as b, fetchGlobalInitialUpcomingDataset as c, formatKickoff as d, formatRegionalTime as f, heroCompetitors as g, getProviderIdsForGame as h, fetchDatasetForGame as i, fetchGlobalUpcomingDataset as l, gameLiveEndTime as m, countdown as n, fetchFrontendCompetitionIdentity as o, gameDisplayTitle as p, fetchCatalog as r, fetchFrontendIdentityCatalog as s, catalogDisplayTeamNames as t, fetchUpcomingDatasetForCompetitions as u, hideHeroCompetitorArtwork as v, isUpcomingOrLiveGame as x, isEventTitleOnlyGame as y };
