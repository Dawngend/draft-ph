import { scoutFixture } from "@draft-ph/protocol/fixtures";
import { ScoutDashboard } from "../../components/scout-dashboard";

export default function ScoutPage() {
  return <ScoutDashboard fixture={scoutFixture} />;
}
