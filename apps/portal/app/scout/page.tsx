import { scoutFixture } from "@seal/protocol/fixtures";
import { ScoutDashboard } from "../../components/scout-dashboard";

export default function ScoutPage() {
  return <ScoutDashboard fixture={scoutFixture} />;
}
