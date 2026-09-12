import { leaderboardFixture } from "@seal/protocol/fixtures";
import { Leaderboard } from "../../components/leaderboard";

export default function LeaderboardPage() {
  return <Leaderboard fixture={leaderboardFixture} />;
}
