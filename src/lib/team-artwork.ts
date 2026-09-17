export type TeamArtwork = {
  crest: string;
};

const crestBase = [
  "https:",
  "",
  "crests.football-data.org",
].join("/");

const nflCrestBase =
  "https://a.espncdn.com/i/teamlogos/nfl/500";

export const teamArtwork: Record<
  string,
  TeamArtwork
> = {
  /*
   * PREMIER LEAGUE
   */

  "AFC Bournemouth": {
    crest: `${crestBase}/1044.png`,
  },

  Arsenal: {
    crest: `${crestBase}/57.png`,
  },

  "Aston Villa": {
    crest: `${crestBase}/58.png`,
  },

  Brentford: {
    crest: `${crestBase}/402.png`,
  },

  "Brighton & Hove Albion": {
    crest: `${crestBase}/397.png`,
  },

  Chelsea: {
    crest: `${crestBase}/61.png`,
  },

  "Coventry City": {
    crest: `${crestBase}/1076.png`,
  },

  "Crystal Palace": {
    crest: `${crestBase}/354.png`,
  },

  Everton: {
    crest: `${crestBase}/62.png`,
  },

  Fulham: {
    crest: `${crestBase}/63.png`,
  },

  "Hull City": {
    crest: `${crestBase}/322.png`,
  },

  "Ipswich Town": {
    crest: `${crestBase}/349.png`,
  },

  "Leeds United": {
    crest: `${crestBase}/341.png`,
  },

  Liverpool: {
    crest: `${crestBase}/64.png`,
  },

  "Manchester City": {
    crest: `${crestBase}/65.png`,
  },

  "Manchester United": {
    crest: `${crestBase}/66.png`,
  },

  "Newcastle United": {
    crest: `${crestBase}/67.png`,
  },

  "Nottingham Forest": {
    crest: `${crestBase}/351.png`,
  },

  Sunderland: {
    crest: `${crestBase}/71.png`,
  },

  "Tottenham Hotspur": {
    crest: `${crestBase}/73.png`,
  },

  /*
   * SERIE A
   */

  Atalanta: {
    crest: `${crestBase}/102.svg`,
  },

  Bologna: {
    crest: `${crestBase}/103.png`,
  },

  Cagliari: {
    crest: `${crestBase}/104.png`,
  },

  Como: {
    crest: `${crestBase}/7397.png`,
  },

  Fiorentina: {
    crest: `${crestBase}/99.svg`,
  },

  Frosinone: {
    crest: `${crestBase}/470.png`,
  },

  Genoa: {
    crest: `${crestBase}/107.png`,
  },

  Inter: {
    crest: `${crestBase}/108.png`,
  },

  Juventus: {
    crest: `${crestBase}/109.png`,
  },

  Lazio: {
    crest: `${crestBase}/110.png`,
  },

  Lecce: {
    crest: `${crestBase}/5890.png`,
  },

  Milan: {
    crest: `${crestBase}/98.png`,
  },

  Monza: {
    crest: `${crestBase}/5911.png`,
  },

  Napoli: {
    crest: `${crestBase}/113.png`,
  },

  Parma: {
    crest: `${crestBase}/112.png`,
  },

  Roma: {
    crest: `${crestBase}/100.png`,
  },

  Sassuolo: {
    crest: `${crestBase}/471.png`,
  },

  Torino: {
    crest: `${crestBase}/586.png`,
  },

  Udinese: {
    crest: `${crestBase}/115.png`,
  },

  Venezia: {
    crest: `${crestBase}/454.png`,
  },

  /*
   * LA LIGA
   */

  "Deportivo Alavés": {
    crest: `${crestBase}/263.png`,
  },

  "Athletic Club": {
    crest: `${crestBase}/77.png`,
  },

  "Atlético de Madrid": {
    crest: `${crestBase}/78.svg`,
  },

  "Real Betis": {
    crest: `${crestBase}/90.png`,
  },

  Celta: {
    crest: `${crestBase}/558.png`,
  },

  "RC Deportivo": {
    crest: `${crestBase}/560.png`,
  },

  Elche: {
    crest: `${crestBase}/285.png`,
  },

  Espanyol: {
    crest: `${crestBase}/80.png`,
  },

  Barcelona: {
    crest: `${crestBase}/81.svg`,
  },

  Getafe: {
    crest: `${crestBase}/82.png`,
  },

  Levante: {
    crest: `${crestBase}/88.png`,
  },

  Málaga: {
    crest: `${crestBase}/84.png`,
  },

  Osasuna: {
    crest: `${crestBase}/79.png`,
  },

  "Racing Santander": {
    crest: `${crestBase}/5335.png`,
  },

  "Rayo Vallecano": {
    crest: `${crestBase}/87.png`,
  },

  "Real Madrid": {
    crest: `${crestBase}/86.png`,
  },

  "Real Sociedad": {
    crest: `${crestBase}/92.png`,
  },

  Sevilla: {
    crest: `${crestBase}/559.svg`,
  },

  Valencia: {
    crest: `${crestBase}/95.png`,
  },

  Villarreal: {
    crest: `${crestBase}/94.png`,
  },

  /*
   * NFL
   */

  "Arizona Cardinals": {
    crest: `${nflCrestBase}/ari.png`,
  },

  "Atlanta Falcons": {
    crest: `${nflCrestBase}/atl.png`,
  },

  "Baltimore Ravens": {
    crest: `${nflCrestBase}/bal.png`,
  },

  "Buffalo Bills": {
    crest: `${nflCrestBase}/buf.png`,
  },

  "Carolina Panthers": {
    crest: `${nflCrestBase}/car.png`,
  },

  "Chicago Bears": {
    crest: `${nflCrestBase}/chi.png`,
  },

  "Cincinnati Bengals": {
    crest: `${nflCrestBase}/cin.png`,
  },

  "Cleveland Browns": {
    crest: `${nflCrestBase}/cle.png`,
  },

  "Dallas Cowboys": {
    crest: `${nflCrestBase}/dal.png`,
  },

  "Denver Broncos": {
    crest: `${nflCrestBase}/den.png`,
  },

  "Detroit Lions": {
    crest: `${nflCrestBase}/det.png`,
  },

  "Green Bay Packers": {
    crest: `${nflCrestBase}/gb.png`,
  },

  "Houston Texans": {
    crest: `${nflCrestBase}/hou.png`,
  },

  "Indianapolis Colts": {
    crest: `${nflCrestBase}/ind.png`,
  },

  "Jacksonville Jaguars": {
    crest: `${nflCrestBase}/jax.png`,
  },

  "Kansas City Chiefs": {
    crest: `${nflCrestBase}/kc.png`,
  },

  "Las Vegas Raiders": {
    crest: `${nflCrestBase}/lv.png`,
  },

  "Los Angeles Chargers": {
    crest: `${nflCrestBase}/lac.png`,
  },

  "Los Angeles Rams": {
    crest: `${nflCrestBase}/lar.png`,
  },

  "Miami Dolphins": {
    crest: `${nflCrestBase}/mia.png`,
  },

  "Minnesota Vikings": {
    crest: `${nflCrestBase}/min.png`,
  },

  "New England Patriots": {
    crest: `${nflCrestBase}/ne.png`,
  },

  "New Orleans Saints": {
    crest: `${nflCrestBase}/no.png`,
  },

  "New York Giants": {
    crest: `${nflCrestBase}/nyg.png`,
  },

  "New York Jets": {
    crest: `${nflCrestBase}/nyj.png`,
  },

  "Philadelphia Eagles": {
    crest: `${nflCrestBase}/phi.png`,
  },

  "Pittsburgh Steelers": {
    crest: `${nflCrestBase}/pit.png`,
  },

  "San Francisco 49ers": {
    crest: `${nflCrestBase}/sf.png`,
  },

  "Seattle Seahawks": {
    crest: `${nflCrestBase}/sea.png`,
  },

  "Tampa Bay Buccaneers": {
    crest: `${nflCrestBase}/tb.png`,
  },

  "Tennessee Titans": {
    crest: `${nflCrestBase}/ten.png`,
  },

  "Washington Commanders": {
    crest: `${nflCrestBase}/wsh.png`,
  },


  /*
   * NBA
   */

  "Atlanta Hawks": {
    crest: "https://cdn.nba.com/logos/nba/1610612737/primary/L/logo.svg",
  },

  "Boston Celtics": {
    crest: "https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg",
  },

  "Cleveland Cavaliers": {
    crest: "https://cdn.nba.com/logos/nba/1610612739/primary/L/logo.svg",
  },

  "New Orleans Pelicans": {
    crest: "https://cdn.nba.com/logos/nba/1610612740/primary/L/logo.svg",
  },

  "Chicago Bulls": {
    crest: "https://cdn.nba.com/logos/nba/1610612741/primary/L/logo.svg",
  },

  "Dallas Mavericks": {
    crest: "https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg",
  },

  "Denver Nuggets": {
    crest: "https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg",
  },

  "Golden State Warriors": {
    crest: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg",
  },

  "Houston Rockets": {
    crest: "https://cdn.nba.com/logos/nba/1610612745/primary/L/logo.svg",
  },

  "LA Clippers": {
    crest: "https://cdn.nba.com/logos/nba/1610612746/primary/L/logo.svg",
  },

  "Los Angeles Lakers": {
    crest: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg",
  },

  "Miami Heat": {
    crest: "https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg",
  },

  "Milwaukee Bucks": {
    crest: "https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg",
  },

  "Minnesota Timberwolves": {
    crest: "https://cdn.nba.com/logos/nba/1610612750/primary/L/logo.svg",
  },

  "Brooklyn Nets": {
    crest: "https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg",
  },

  "New York Knicks": {
    crest: "https://cdn.nba.com/logos/nba/1610612752/primary/L/logo.svg",
  },

  "Orlando Magic": {
    crest: "https://cdn.nba.com/logos/nba/1610612753/primary/L/logo.svg",
  },

  "Indiana Pacers": {
    crest: "https://cdn.nba.com/logos/nba/1610612754/primary/L/logo.svg",
  },

  "Philadelphia 76ers": {
    crest: "https://cdn.nba.com/logos/nba/1610612755/primary/L/logo.svg",
  },

  "Phoenix Suns": {
    crest: "https://cdn.nba.com/logos/nba/1610612756/primary/L/logo.svg",
  },

  "Portland Trail Blazers": {
    crest: "https://cdn.nba.com/logos/nba/1610612757/primary/L/logo.svg",
  },

  "Sacramento Kings": {
    crest: "https://cdn.nba.com/logos/nba/1610612758/primary/L/logo.svg",
  },

  "San Antonio Spurs": {
    crest: "https://cdn.nba.com/logos/nba/1610612759/primary/L/logo.svg",
  },

  "Oklahoma City Thunder": {
    crest: "https://cdn.nba.com/logos/nba/1610612760/primary/L/logo.svg",
  },

  "Toronto Raptors": {
    crest: "https://cdn.nba.com/logos/nba/1610612761/primary/L/logo.svg",
  },

  "Utah Jazz": {
    crest: "https://cdn.nba.com/logos/nba/1610612762/primary/L/logo.svg",
  },

  "Memphis Grizzlies": {
    crest: "https://cdn.nba.com/logos/nba/1610612763/primary/L/logo.svg",
  },

  "Washington Wizards": {
    crest: "https://cdn.nba.com/logos/nba/1610612764/primary/L/logo.svg",
  },

  "Detroit Pistons": {
    crest: "https://cdn.nba.com/logos/nba/1610612765/primary/L/logo.svg",
  },

  "Charlotte Hornets": {
    crest: "https://cdn.nba.com/logos/nba/1610612766/primary/L/logo.svg",
  },
};

export function getTeamArtwork(
  team: string,
) {
  return teamArtwork[team];
}