import { officiateFixture } from "@draft-ph/protocol/fixtures";
import { IncidentWorkspace } from "../../components/incident-workspace";

export default function OfficiatePage() {
  return <IncidentWorkspace fixture={officiateFixture} />;
}
