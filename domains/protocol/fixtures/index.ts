import type {
  Incident,
  LeaderboardFixture,
  Match,
  OfficiateFixture,
  Player,
  ScoutFixture,
} from "../index";

const defaultBars = [
  { label: "Aim", value: 91 },
  { label: "Game Sense", value: 84 },
  { label: "Teamplay", value: 79 },
  { label: "Clutch", value: 88 },
  { label: "Consistency", value: 82 },
];

const defaultHistory = [
  { event: "PCC Season 3", year: "2026", placement: "Champion", team: "UST Tigers", accent: "#ffa93d" },
  { event: "UAAP Season 87", year: "2026", placement: "2nd place", team: "UST Tigers", accent: "#8892a6" },
  { event: "Estudyante Esports Cup", year: "2025", placement: "Top 4 · Tournament MVP", team: "UST Tigers", accent: "#3ddad7" },
  { event: "PCC Season 2", year: "2025", placement: "Quarterfinals", team: "UST Tigers B", accent: "#8892a6" },
];

function player(overrides: Partial<Player> & Pick<Player, "id" | "handle" | "school" | "team" | "rating" | "averageCombatScore" | "winRate" | "kda" | "avatar">): Player {
  return {
    fullName: overrides.handle,
    course: "3rd year CS",
    game: "Valorant",
    role: "Duelist",
    rank: "Immortal 1",
    ratingDelta: 0,
    verified: true,
    verifiedDomain: "edu.ph",
    openToWork: true,
    graduating: false,
    firstBloodRate: 18,
    headshotRate: 25,
    matchesTracked: 300,
    agentPool: ["Jett", "Reyna", "Raze", "Neon"],
    statBars: defaultBars,
    tournamentHistory: defaultHistory,
    ...overrides,
  };
}

export const players: Player[] = [
  player({
    id: "phantom-edge",
    handle: "PhantomEdge",
    fullName: "Juan Carlos Reyes",
    school: "University of Santo Tomas",
    team: "UST Tigers",
    rating: 87.4,
    ratingDelta: 2.1,
    rank: "Immortal 2",
    verifiedDomain: "ust.edu.ph",
    averageCombatScore: 245,
    winRate: 68,
    kda: 1.38,
    firstBloodRate: 21,
    headshotRate: 27.4,
    matchesTracked: 412,
    avatar: "linear-gradient(135deg, #ff6b35, #b53a12)",
  }),
  player({ id: "kyzen", handle: "kyzen", school: "De La Salle University", team: "DLSU Green Blades", rating: 84.1, rank: "Immortal 1", role: "Duelist", graduating: true, averageCombatScore: 231, winRate: 64, kda: 1.34, avatar: "linear-gradient(135deg, #3ddad7, #17706e)" }),
  player({ id: "reyna-exe", handle: "Reyna.exe", school: "Ateneo de Manila University", team: "ADMU Blue Eagles", rating: 89.2, rank: "Immortal 3", role: "Duelist", averageCombatScore: 258, winRate: 71, kda: 1.43, avatar: "linear-gradient(135deg, #ffa93d, #a86612)" }),
  player({ id: "nullframe", handle: "nullframe", school: "FEU Institute of Technology", team: "FEU Tech Tamaraws", rating: 82.8, rank: "Ascendant 3", role: "Duelist", verified: false, verifiedDomain: "", averageCombatScore: 227, winRate: 59, kda: 1.31, avatar: "linear-gradient(135deg, #6b7590, #333a4a)" }),
  player({ id: "mapua-jett", handle: "MapuaJett", school: "Mapúa University", team: "Mapua Cardinals", rating: 81.9, role: "Duelist", averageCombatScore: 221, winRate: 62, kda: 1.28, avatar: "linear-gradient(135deg, #e5484d, #8a2226)" }),
  player({ id: "sablay", handle: "sablay", school: "University of the Philippines", team: "UP Fighting Maroons", rating: 80.4, role: "Sentinel", graduating: true, averageCombatScore: 215, winRate: 60, kda: 1.24, avatar: "linear-gradient(135deg, #333a4a, #1a1f2b)" }),
  player({ id: "ghostbyte", handle: "ghostbyte", school: "National University", team: "NU Bulldogs", rating: 79.6, role: "Initiator", averageCombatScore: 209, winRate: 58, kda: 1.19, avatar: "linear-gradient(135deg, #2c3446, #1a1f2b)" }),
  player({ id: "kalachuchi", handle: "kalachuchi", school: "University of Santo Tomas", team: "UST Tigers", rating: 78.8, role: "Controller", graduating: true, averageCombatScore: 204, winRate: 57, kda: 1.16, avatar: "linear-gradient(135deg, #333a4a, #1a1f2b)" }),
  player({ id: "tabo", handle: "tabo.", school: "Ateneo de Manila University", team: "ADMU Blue Eagles", rating: 77.9, role: "Sentinel", openToWork: false, averageCombatScore: 198, winRate: 56, kda: 1.14, avatar: "linear-gradient(135deg, #333a4a, #1a1f2b)" }),
  player({ id: "rizal-rush", handle: "RIZALrush", school: "Polytechnic University of the Philippines", team: "PUP Radials", rating: 76.5, role: "Duelist", graduating: true, averageCombatScore: 194, winRate: 55, kda: 1.11, avatar: "linear-gradient(135deg, #2c3446, #1a1f2b)" }),
  player({ id: "himala", handle: "himala", school: "De La Salle University", team: "DLSU Green Blades", rating: 75.2, role: "Controller", openToWork: false, averageCombatScore: 189, winRate: 54, kda: 1.08, avatar: "linear-gradient(135deg, #333a4a, #1a1f2b)" }),
  player({ id: "batstate-frag", handle: "BatStateFrag", school: "Batangas State University", team: "Batangas State", rating: 74.1, role: "Initiator", openToWork: false, averageCombatScore: 185, winRate: 53, kda: 1.05, avatar: "linear-gradient(135deg, #2c3446, #1a1f2b)" }),
];

export const scoutFixture: ScoutFixture = {
  team: {
    id: "up-fighting-maroons",
    name: "UP Fighting Maroons",
    school: "University of the Philippines",
    chemistry: 89,
    projectedWinRate: 61,
    watchlistCount: 12,
    improvedThisWeek: 3,
  },
  totalMatches: 47,
  selectedPlayerIds: ["phantom-edge", "kyzen"],
  players,
  rows: [
    { rank: 1, playerId: "phantom-edge", chemistry: 91, saved: true, rating: 87.4, averageCombatScore: 245, winRate: 68 },
    { rank: 2, playerId: "kyzen", chemistry: 88, saved: false, rating: 84.1, averageCombatScore: 231, winRate: 64 },
    { rank: 3, playerId: "reyna-exe", chemistry: 74, saved: true, rating: 89.2, averageCombatScore: 258, winRate: 71 },
    { rank: 4, playerId: "nullframe", chemistry: 72, saved: false, rating: 82.8, averageCombatScore: 227, winRate: 59 },
    { rank: 5, playerId: "mapua-jett", chemistry: 69, saved: false, rating: 81.9, averageCombatScore: 221, winRate: 62 },
    { rank: 6, playerId: "sablay", chemistry: 67, saved: false, rating: 80.4, averageCombatScore: 215, winRate: 60 },
    { rank: 7, playerId: "ghostbyte", chemistry: 64, saved: true, rating: 79.6, averageCombatScore: 209, winRate: 58 },
    { rank: 8, playerId: "kalachuchi", chemistry: 61, saved: false, rating: 78.8, averageCombatScore: 204, winRate: 57 },
    { rank: 9, playerId: "tabo", chemistry: 58, saved: false, rating: 77.9, averageCombatScore: 198, winRate: 56 },
    { rank: 10, playerId: "rizal-rush", chemistry: 55, saved: false, rating: 76.5, averageCombatScore: 194, winRate: 55 },
    { rank: 11, playerId: "himala", chemistry: 52, saved: false, rating: 75.2, averageCombatScore: 189, winRate: 54 },
    { rank: 12, playerId: "batstate-frag", chemistry: 49, saved: false, rating: 74.1, averageCombatScore: 185, winRate: 53 },
  ],
};

const matches: Match[] = [
  { id: "match-12", label: "Match 12", station: "Station 3", teams: ["UST Tigers", "ADMU Blue Eagles"], round: "Round 14", map: "Ascent" },
  { id: "match-7", label: "Match 7", station: "Station 8", teams: ["DLSU Green Blades", "NU Bulldogs"], round: "Round 9", map: "Haven" },
  { id: "match-9", label: "Match 9", station: "Station 2", teams: ["Mapua Cardinals", "UP Fighting Maroons"], round: "Round 18", map: "Lotus" },
  { id: "match-4", label: "Match 4", station: "Station 3", teams: ["FEU Tech Tamaraws", "PUP Radials"], round: "Round 6", map: "Bind" },
];

const timeline = [
  { time: "14:30:05", label: "Session check-in confirmed", source: "SYSTEM", detail: "Device fingerprint matched roster entry · consent recorded", kind: "ok" as const },
  { time: "14:31:22", label: "Network stable", source: "TELEMETRY", detail: "ping 18ms · packet loss 0.0% · jitter 3ms", kind: "ok" as const },
  { time: "14:32:17", label: "Application process terminated", source: "AUTO-DETECT", detail: "exit_code=0xC0000005 · no graceful shutdown signal", kind: "flag" as const },
  { time: "14:32:19", label: "Player submitted incident report", source: "PLAYER", detail: "PhantomEdge · category: client crash · screenshot attached", kind: "warn" as const },
  { time: "14:32:45", label: "Tech pause called by opponent captain", source: "STAFF", detail: "ADMU Blue Eagles · captain: skyfall_23", kind: "warn" as const },
  { time: "14:33:02", label: "Assigned to officiator", source: "ORGANIZER", detail: "Maria assigned Andre · queue wait 45s", kind: "ok" as const },
];

function incident(overrides: Partial<Incident> & Pick<Incident, "id" | "severity" | "title" | "matchId" | "age">): Incident {
  return {
    verified: true,
    timeline,
    applicableRule: {
      reference: "Section 4.2 · Technical Incidents",
      text: "If an application crash is auto-verified within 60 seconds of the reported time, a restart is granted with a 2-round buffer.",
    },
    outcomes: ["Restart granted, 2 round buffer", "Restart granted, no buffer", "Continue, no remedy", "Forfeit round"],
    selectedOutcome: "Restart granted, 2 round buffer",
    officiatorNote: "Auto-verified crash, network stable at time of incident. No prior incidents this match.",
    ...overrides,
  };
}

export const officiateFixture: OfficiateFixture = {
  event: "PCC Season 4",
  day: "Playoffs Day 2",
  officiator: "Andre · Officiator",
  openCount: 3,
  medianResponse: "2m 18s",
  matches,
  incidents: [
    incident({ id: "INC-042", severity: "HIGH", title: "Application crash reported by PhantomEdge", matchId: "match-12", age: "00:41" }),
    incident({ id: "INC-041", severity: "MED", title: "Latency spike 450ms to 1,200ms", matchId: "match-7", age: "04:12" }),
    incident({ id: "INC-040", severity: "LOW", title: "Manual tech pause requested", matchId: "match-9", age: "11:03" }),
    incident({ id: "INC-039", severity: "MED", title: "Power interruption, Station 3", matchId: "match-4", age: "26:50" }),
  ],
};

export const leaderboardFixture: LeaderboardFixture = {
  season: "Season 4",
  game: "Valorant",
  role: "Duelist",
  scope: "Nationwide",
  verifiedPlayerCount: 1284,
  schoolCount: 42,
  updated: "14 min ago",
  players,
  entries: [
    { rank: 1, playerId: "reyna-exe", movement: 2 },
    { rank: 2, playerId: "phantom-edge", movement: 1 },
    { rank: 3, playerId: "kyzen", movement: 1 },
    { rank: 4, playerId: "nullframe", movement: 3 },
    { rank: 5, playerId: "mapua-jett", movement: 1 },
    { rank: 6, playerId: "sablay", movement: -2 },
    { rank: 7, playerId: "ghostbyte", movement: 5 },
    { rank: 8, playerId: "kalachuchi", movement: 0 },
    { rank: 9, playerId: "tabo", movement: -1 },
    { rank: 10, playerId: "rizal-rush", movement: 8 },
    { rank: 11, playerId: "himala", movement: -4 },
    { rank: 12, playerId: "batstate-frag", movement: 2 },
  ],
  schools: [
    { rank: 1, name: "ADMU", points: 412 },
    { rank: 2, name: "UST", points: 388 },
    { rank: 3, name: "DLSU", points: 361 },
    { rank: 4, name: "FEU Tech", points: 294 },
    { rank: 5, name: "Mapua", points: 271 },
  ],
};

export function getPlayerById(id: string): Player | undefined {
  return players.find((item) => item.id === id);
}
