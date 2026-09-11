export type Game = "Valorant" | "MLBB";
export type PlayerRole = "Duelist" | "Sentinel" | "Initiator" | "Controller";
export type IncidentSeverity = "HIGH" | "MED" | "LOW";
export type IncidentStatus = "open" | "escalated" | "resolved";
export type EvidenceKind = "ok" | "warn" | "flag";

export const VALORANT_RANK_ORDER = [
  "Iron 1",
  "Iron 2",
  "Iron 3",
  "Bronze 1",
  "Bronze 2",
  "Bronze 3",
  "Silver 1",
  "Silver 2",
  "Silver 3",
  "Gold 1",
  "Gold 2",
  "Gold 3",
  "Platinum 1",
  "Platinum 2",
  "Platinum 3",
  "Diamond 1",
  "Diamond 2",
  "Diamond 3",
  "Ascendant 1",
  "Ascendant 2",
  "Ascendant 3",
  "Immortal 1",
  "Immortal 2",
  "Immortal 3",
  "Radiant",
] as const;

export type ValorantRank = (typeof VALORANT_RANK_ORDER)[number];

export function valorantRankIndex(rank: string): number {
  return VALORANT_RANK_ORDER.indexOf(rank as ValorantRank);
}

export interface StatBar {
  label: string;
  value: number;
}

export interface CareerStat {
  label: string;
  value: string;
}

export interface TournamentResult {
  event: string;
  year: string;
  placement: string;
  team: string;
  accent: string;
}

export interface Player {
  id: string;
  handle: string;
  fullName: string;
  school: string;
  team: string;
  course: string;
  game: Game;
  role: PlayerRole;
  rank: string;
  rating: number;
  ratingDelta: number;
  verified: boolean;
  verifiedDomain: string;
  openToWork: boolean;
  graduating: boolean;
  averageCombatScore: number;
  winRate: number;
  kda: number;
  firstBloodRate: number;
  headshotRate: number;
  matchesTracked: number;
  agentPool: string[];
  statBars: StatBar[];
  tournamentHistory: TournamentResult[];
  avatar: string;
}

export interface Team {
  id: string;
  name: string;
  school: string;
  chemistry: number;
  projectedWinRate: number;
  watchlistCount: number;
  improvedThisWeek: number;
}

export interface ScoutPlayer {
  rank: number;
  playerId: string;
  chemistry: number;
  saved: boolean;
  rating: number;
  averageCombatScore: number;
  winRate: number;
}

export interface ScoutFixture {
  team: Team;
  totalMatches: number;
  selectedPlayerIds: string[];
  players: Player[];
  rows: ScoutPlayer[];
}

export interface EvidenceEvent {
  time: string;
  label: string;
  source: string;
  detail: string;
  kind: EvidenceKind;
}

export interface Match {
  id: string;
  label: string;
  station: string;
  teams: [string, string];
  round: string;
  map: string;
}

export interface Incident {
  id: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  title: string;
  matchId: string;
  age: string;
  verified: boolean;
  timeline: EvidenceEvent[];
  applicableRule: {
    reference: string;
    text: string;
  };
  outcomes: string[];
  selectedOutcome: string;
  officiatorNote: string;
}

export interface OfficiateFixture {
  event: string;
  day: string;
  officiator: string;
  medianResponse: string;
  matches: Match[];
  incidents: Incident[];
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  movement: number;
}

export interface SchoolStanding {
  rank: number;
  name: string;
  points: number;
}

export interface LeaderboardFixture {
  season: string;
  game: Game;
  role: PlayerRole;
  scope: string;
  verifiedPlayerCount: number;
  schoolCount: number;
  updated: string;
  players: Player[];
  entries: LeaderboardEntry[];
  schools: SchoolStanding[];
}

export function careerStatsFor(player: Player): CareerStat[] {
  return [
    { label: "Avg Combat Score", value: String(player.averageCombatScore) },
    { label: "KDA", value: player.kda.toFixed(2) },
    { label: "Win rate", value: `${player.winRate}%` },
    { label: "First blood rate", value: `${player.firstBloodRate}%` },
    { label: "Headshot %", value: `${player.headshotRate}%` },
    { label: "Matches tracked", value: String(player.matchesTracked) },
  ];
}
