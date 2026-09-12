import { officiateFixture } from "@seal/protocol/fixtures";
import { IncidentWorkspace } from "../../components/incident-workspace";

export default function OfficiatePage() {
  return <IncidentWorkspace fixture={officiateFixture} />;
}
