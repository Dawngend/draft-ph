"use client";

import type { LeaderboardFixture } from "@draft-ph/protocol";
import { ArrowIcon, Eyebrow, LockIcon, StatusChip, VerifiedIcon } from "@draft-ph/design-system";
import Link from "next/link";
import { useMemo, useState } from "react";

export function Leaderboard({ fixture }: { fixture: LeaderboardFixture }) {
  const [view, setView] = useState<"PLAYERS" | "SCHOOLS">("PLAYERS");
  const ranked = useMemo(() => fixture.entries.map((entry) => ({ entry, player: fixture.players.find((player) => player.id === entry.playerId)! })), [fixture]);
  const top = ranked.slice(0, 3);
  const table = ranked.slice(3);
  const maxPoints = Math.max(...fixture.schools.map((school) => school.points));

  return (
    <main className="artboard leaderboard-artboard">
      <header className="leaderboard-hero panel">
        <div className="hero-accent" />
        <div className="leaderboard-title">
          <div><i /><Eyebrow>Public leaderboard · {fixture.season}</Eyebrow><StatusChip>Fixture data</StatusChip></div>
          <h1>{fixture.game} · {fixture.role} · {fixture.scope}</h1>
          <p><span>{fixture.verifiedPlayerCount.toLocaleString()} verified players across {fixture.schoolCount} schools</span><i /><code>updated {fixture.updated}</code></p>
        </div>
        <div className="leaderboard-tabs" role="tablist" aria-label="Leaderboard view">
          <button className={view === "PLAYERS" ? "active" : ""} role="tab" aria-selected={view === "PLAYERS"} onClick={() => setView("PLAYERS")}>PLAYERS</button>
          <button className={view === "SCHOOLS" ? "active" : ""} role="tab" aria-selected={view === "SCHOOLS"} onClick={() => setView("SCHOOLS")}>SCHOOLS</button>
          <button className="locked" role="tab" aria-selected="false" aria-disabled="true" disabled title="Tournament MVP fixture is not available"><LockIcon />TOURNAMENT MVP</button>
        </div>
      </header>

      {view === "PLAYERS" ? (
        <div className="leaderboard-body" role="tabpanel">
          <aside className="podium-panel panel">
            <div className="panel-header"><Eyebrow>Top 3</Eyebrow><StatusChip>Fixture data</StatusChip></div>
            <div className="podium-list">
              {top.map(({ entry, player }, index) => {
                const accent = index === 0 ? "#ffa93d" : index === 1 ? "#ff6b35" : "#3ddad7";
                const ghost = index === 0 ? "rgba(255,169,61,0.07)" : index === 1 ? "rgba(255,107,53,0.06)" : "rgba(61,218,215,0.05)";
                return <Link href={`/players/${player.id}`} className="podium-card" style={{ borderLeftColor: accent }} key={player.id}>
                  <span className="ghost-rank" style={{ color: ghost }}>{entry.rank}</span>
                  <span className="podium-avatar" style={{ background: player.avatar }} />
                  <span className="podium-copy"><span><strong>{player.handle}</strong><VerifiedIcon /></span><small>{player.team}</small></span>
                  <span className="podium-score"><strong style={{ color: accent }}>{player.rating.toFixed(1)}</strong><small>OVR</small></span>
                </Link>;
              })}
            </div>
            <div className="school-standings panel">
              <div className="panel-header"><Eyebrow>School standings</Eyebrow><StatusChip>Fixture data</StatusChip></div>
              {fixture.schools.map((school, index) => <div key={school.name}><code>{school.rank}</code><span>{school.name}</span><i><b style={{ width: `${Math.round((school.points / maxPoints) * 100)}%`, background: index === 0 ? "#ffa93d" : index === 1 ? "#ff6b35" : "#4d5566" }} /></i><code>{school.points}</code></div>)}
            </div>
          </aside>
          <section className="leader-table-wrap panel">
            <div className="leader-grid leader-columns"><Eyebrow>Rank</Eyebrow><Eyebrow>Player</Eyebrow><Eyebrow>Rating</Eyebrow><Eyebrow>ACS</Eyebrow><Eyebrow>KDA</Eyebrow><Eyebrow>Trend</Eyebrow></div>
            {table.map(({ entry, player }) => {
              const movementColor = entry.movement > 0 ? "#3ddad7" : entry.movement < 0 ? "#e5484d" : "#4d5566";
              return <Link className="leader-grid leader-row" href={`/players/${player.id}`} key={player.id}>
                <span className="leader-rank"><code>{String(entry.rank).padStart(2, "0")}</code><i style={{ background: movementColor }} /></span>
                <span className="leader-player"><i style={{ background: entry.movement > 0 ? "linear-gradient(135deg, #2c3446, #1a1f2b)" : "linear-gradient(135deg, #333a4a, #1a1f2b)" }} /><span><strong>{player.handle}</strong><small>{player.team}</small></span></span>
                <strong className="leader-rating">{player.rating.toFixed(1)}</strong>
                <code>{player.averageCombatScore}</code><code>{player.kda.toFixed(2)}</code>
                <span className="leader-move" style={{ color: movementColor }}><ArrowIcon down={entry.movement < 0} /><code>{entry.movement > 0 ? `+${entry.movement}` : entry.movement}</code></span>
              </Link>;
            })}
          </section>
        </div>
      ) : (
        <section className="school-board panel" role="tabpanel">
          <div className="panel-header"><div><strong>School standings</strong><span>Season points across indexed collegiate programs</span></div><StatusChip>Fixture data</StatusChip></div>
          <div className="school-board-head"><Eyebrow>Rank</Eyebrow><Eyebrow>School</Eyebrow><Eyebrow>Season points</Eyebrow><span /></div>
          {fixture.schools.map((school, index) => (
            <div className="school-board-row" key={school.name}>
              <code>{String(school.rank).padStart(2, "0")}</code>
              <strong>{school.name}</strong>
              <code>{school.points}</code>
              <i><b style={{ width: `${Math.round((school.points / maxPoints) * 100)}%`, background: index === 0 ? "#ffa93d" : index === 1 ? "#ff6b35" : "#4d5566" }} /></i>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
