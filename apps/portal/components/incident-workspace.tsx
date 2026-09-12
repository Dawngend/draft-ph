"use client";

import type { IncidentSeverity, IncidentStatus, OfficiateFixture } from "@seal/protocol";
import { DocumentIcon, Eyebrow, LockIcon, StatusChip, VerifiedIcon } from "@seal/design-system";
import { useMemo, useState } from "react";

const severityColor: Record<IncidentSeverity, string> = { HIGH: "#e5484d", MED: "#ffa93d", LOW: "#8892a6" };
const severityBackground: Record<IncidentSeverity, string> = { HIGH: "rgba(229,72,77,0.15)", MED: "rgba(255,169,61,0.13)", LOW: "rgba(136,146,166,0.12)" };
const evidenceColor = { ok: "#3ddad7", warn: "#ffa93d", flag: "#e5484d" };
const evidenceBackground = { ok: "rgba(61,218,215,0.12)", warn: "rgba(255,169,61,0.13)", flag: "rgba(229,72,77,0.15)" };

export function IncidentWorkspace({ fixture }: { fixture: OfficiateFixture }) {
  const [incidentId, setIncidentId] = useState(fixture.incidents[0].id);
  const [outcomes, setOutcomes] = useState<Record<string, string>>({});
  const [statuses, setStatuses] = useState<Record<string, IncidentStatus>>(() => Object.fromEntries(fixture.incidents.map((item) => [item.id, item.status])));
  const [confirmation, setConfirmation] = useState("");

  const incident = fixture.incidents.find((item) => item.id === incidentId) ?? fixture.incidents[0];
  const match = fixture.matches.find((item) => item.id === incident.matchId) ?? fixture.matches[0];
  const selectedOutcome = outcomes[incident.id] ?? incident.selectedOutcome;
  const currentStatus = statuses[incident.id] ?? incident.status;
  const openCount = Object.values(statuses).filter((status) => status !== "resolved").length;

  const incidentRows = useMemo(() => fixture.incidents.map((item) => ({ item, match: fixture.matches.find((matchItem) => matchItem.id === item.matchId)! })), [fixture]);

  function selectIncident(id: string) {
    setIncidentId(id);
    setConfirmation("");
  }

  function authorizeRuling() {
    setStatuses((current) => ({ ...current, [incident.id]: "resolved" }));
    setConfirmation(`${incident.id} resolved with outcome: ${selectedOutcome}. Both teams and the organizer were notified locally.`);
  }

  function escalateIncident() {
    setStatuses((current) => ({ ...current, [incident.id]: "escalated" }));
    setConfirmation(`${incident.id} escalated to the head official in local prototype state.`);
  }

  return (
    <main className="artboard officiate-artboard">
      <header className="live-bar panel">
        <span className="live-label"><b />LIVE</span><span>{fixture.event} · {fixture.day}</span>
        <StatusChip>Fixture data</StatusChip>
        <div className="spacer" />
        <div className="live-metric"><Eyebrow>Open</Eyebrow><strong>{openCount}</strong></div>
        <div className="live-metric"><Eyebrow>Median response</Eyebrow><strong>{fixture.medianResponse}</strong></div>
        <div className="officiator-chip"><span />{fixture.officiator}</div>
      </header>
      <div className="officiate-body">
        <aside className="incident-queue panel">
          <div className="queue-heading"><Eyebrow>Incident queue</Eyebrow><StatusChip>Fixture data</StatusChip></div>
          {incidentRows.map(({ item, match: rowMatch }) => {
            const color = severityColor[item.severity];
            const status = statuses[item.id] ?? item.status;
            return <button key={item.id} onClick={() => selectIncident(item.id)} className={`${item.id === incident.id ? "active" : ""} status-${status}`} style={{ borderLeftColor: color }} aria-pressed={item.id === incident.id}>
              <span className="queue-meta"><code>{item.id}</code><span><b className={`incident-status ${status}`}>{status}</b><b style={{ background: severityBackground[item.severity], color }}>{item.severity}</b></span></span>
              <strong>{item.title}</strong><span className="queue-age"><span>{rowMatch.label}</span><i /><code>{item.age}</code></span>
            </button>;
          })}
        </aside>

        <section className="evidence-panel panel">
          <div className="incident-heading">
            <div><code>{incident.id}</code><i /><Eyebrow>{match.label} · {match.station}</Eyebrow><b style={{ background: severityBackground[incident.severity], color: severityColor[incident.severity] }}>{incident.severity}</b><b className={`incident-status ${currentStatus}`}>{currentStatus}</b></div>
            <h1>{incident.title}</h1>
            <p><span>{match.teams[0]} vs {match.teams[1]}</span><span>{match.round} · Map: {match.map}</span>{incident.verified && <span className="verified"><VerifiedIcon />Auto-verified</span>}</p>
          </div>
          <div className="timeline-heading"><Eyebrow>Evidence timeline</Eyebrow><StatusChip>Fixture data</StatusChip></div>
          <div className="timeline">
            {incident.timeline.map((event, index) => {
              const color = evidenceColor[event.kind];
              return <div className="timeline-row" key={`${event.time}-${event.label}`}>
                <time style={{ color: event.kind === "flag" ? color : undefined }}>{event.time}</time>
                <span className="timeline-mark"><i style={{ background: index === 0 ? "transparent" : "#252b38" }} /><b style={{ background: color }} /><i style={{ background: index === incident.timeline.length - 1 ? "transparent" : "#252b38" }} /></span>
                <span className="timeline-copy"><span><strong>{event.label}</strong><b style={{ background: evidenceBackground[event.kind], color }}>{event.source}</b></span><code>{event.detail}</code></span>
              </div>;
            })}
          </div>
        </section>

        <aside className="ruling-panel panel">
          <div className="ruling-heading"><Eyebrow>Ruling workspace</Eyebrow><StatusChip>Fixture data</StatusChip></div>
          <div className="ruling-content">
            {confirmation && <div className="ruling-confirmation" role="status">{confirmation}</div>}
            <div className="rule-card panel"><span><DocumentIcon /><Eyebrow>Applicable rule</Eyebrow></span><strong>{incident.applicableRule.reference}</strong><p>{incident.applicableRule.text}</p></div>
            <fieldset className="outcome-options" disabled={currentStatus === "resolved"}>
              <legend className="eyebrow">Outcome</legend>
              {incident.outcomes.map((outcome) => <label className={outcome === selectedOutcome ? "selected" : ""} key={outcome}><input type="radio" name={`outcome-${incident.id}`} value={outcome} checked={outcome === selectedOutcome} onChange={() => setOutcomes((current) => ({ ...current, [incident.id]: outcome }))} /><i><b /></i><span>{outcome}</span></label>)}
            </fieldset>
            <div className="ruling-note"><Eyebrow>Officiator note</Eyebrow><p>{incident.officiatorNote}</p></div>
            <div className="notify-list"><Eyebrow>Notify on authorize</Eyebrow><div><span>{match.teams[0]}</span><span>{match.teams[1]}</span><span>Organizer</span></div></div>
          </div>
          <div className="ruling-footer"><p><LockIcon />Logged with timestamp, evidence, and rule reference. Immutable.</p><div><button onClick={authorizeRuling} disabled={currentStatus === "resolved"} aria-disabled={currentStatus === "resolved"}>{currentStatus === "resolved" ? "RULING AUTHORIZED" : "AUTHORIZE RULING"}</button><button onClick={escalateIncident} disabled={currentStatus !== "open"} aria-disabled={currentStatus !== "open"}>{currentStatus === "escalated" ? "ESCALATED" : "ESCALATE"}</button></div></div>
        </aside>
      </div>
    </main>
  );
}
