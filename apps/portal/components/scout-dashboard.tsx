"use client";

import type { PlayerRole, ScoutFixture } from "@draft-ph/protocol";
import { ArrowIcon, BookmarkIcon, Brand, Eyebrow, FilterIcon, VerifiedIcon } from "@draft-ph/design-system";
import Link from "next/link";
import { useMemo, useState } from "react";

const roles: PlayerRole[] = ["Duelist", "Sentinel", "Initiator", "Controller"];

export function ScoutDashboard({ fixture }: { fixture: ScoutFixture }) {
  const [game, setGame] = useState<"Valorant" | "MLBB">("Valorant");
  const [role, setRole] = useState<PlayerRole>("Duelist");
  const [openOnly, setOpenOnly] = useState(true);
  const [graduating, setGraduating] = useState(false);
  const [selectedIds, setSelectedIds] = useState(fixture.selectedPlayerIds);

  const rowData = useMemo(
    () =>
      fixture.rows
        .map((row) => ({ ...row, player: fixture.players.find((player) => player.id === row.playerId)! }))
        .filter(({ player }) => player.game === game)
        .filter(({ player }) => player.role === role)
        .filter(({ player }) => (openOnly ? player.openToWork : true))
        .filter(({ player }) => (graduating ? player.graduating : true)),
    [fixture, game, role, openOnly, graduating],
  );
  const selectedPlayer = fixture.players.find((player) => selectedIds.includes(player.id));

  function togglePlayer(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function resetFilters() {
    setGame("Valorant");
    setRole("Duelist");
    setOpenOnly(true);
    setGraduating(false);
  }

  return (
    <main className="artboard scout-artboard">
      <header className="scout-topbar">
        <Link href="/scout" aria-label="DRAFT.PH Scout"><Brand /></Link>
        <nav className="primary-nav" aria-label="Primary navigation">
          <Link className="active" href="/scout">Scout</Link>
          <Link href="/leaderboard">Leaderboards</Link>
          <span>My Team</span>
          <span>Tournaments</span>
        </nav>
        <div className="spacer" />
        <div className="account-chip">
          <span className="account-avatar" />
          <span><strong>{fixture.team.name}</strong><small>Scout account</small></span>
        </div>
      </header>

      <div className="scout-body">
        <aside className="filter-rail">
          <div className="rail-heading"><Eyebrow>Filters</Eyebrow><button onClick={resetFilters}>Reset</button></div>
          <div className="filter-group">
            <Eyebrow>Game</Eyebrow>
            <div className="chip-row">
              {(["Valorant", "MLBB"] as const).map((value) => (
                <button
                  className={`choice-chip strong ${game === value ? "selected" : ""}`}
                  onClick={() => setGame(value)}
                  disabled={value === "MLBB"}
                  title={value === "MLBB" ? "MLBB indexing begins Season 5" : undefined}
                  key={value}
                >{value}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <Eyebrow>Role</Eyebrow>
            <div className="chip-row wrap">
              {roles.map((value) => (
                <button className={`choice-chip ${role === value ? "selected-outline" : ""}`} onClick={() => setRole(value)} key={value}>{value}</button>
              ))}
            </div>
          </div>
          <div className="filter-group rank-filter">
            <div className="split"><Eyebrow>Minimum rank</Eyebrow><span>IMMORTAL 1</span></div>
            <div className="rank-track"><span /><i /></div>
          </div>
          <div className="filter-group">
            <Eyebrow>School</Eyebrow>
            <button className="select-control"><span>Metro Manila</span><svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg></button>
          </div>
          <div className="filter-group availability">
            <Eyebrow>Availability</Eyebrow>
            <button className={`toggle-line ${openOnly ? "on" : ""}`} onClick={() => setOpenOnly((value) => !value)}><span className="switch"><i /></span><span>Open to Work only</span></button>
            <button className={`toggle-line ${graduating ? "on" : ""}`} onClick={() => setGraduating((value) => !value)}><span className="switch"><i /></span><span>Graduating this year</span></button>
          </div>
          <div className="watchlist">
            <Eyebrow>Watchlist</Eyebrow>
            <strong>{fixture.team.watchlistCount}<small> saved</small></strong>
            <span>{fixture.team.improvedThisWeek} improved this week</span>
          </div>
        </aside>

        <section className="scout-results">
          <div className="results-heading">
            <div><Eyebrow>Scout Dashboard</Eyebrow><div><strong>{rowData.length} {rowData.length === 1 ? "player matches" : "players match"}</strong><span>ranked by fit with your roster</span></div></div>
            <div className="results-actions">
              <button><FilterIcon />Chemistry</button>
              <button className="active"><ArrowIcon />Compare ({selectedIds.length})</button>
            </div>
          </div>
          <div className="scout-table-scroll">
            <div className="scout-grid scout-columns"><Eyebrow>#</Eyebrow><Eyebrow>Player</Eyebrow><Eyebrow>Rating</Eyebrow><Eyebrow>ACS</Eyebrow><Eyebrow>Win rate</Eyebrow><Eyebrow>Chemistry</Eyebrow><span /></div>
            {rowData.map(({ player, ...row }, index) => {
              const selected = selectedIds.includes(player.id);
              const chemistryColor = row.chemistry >= 85 ? "#3ddad7" : row.chemistry >= 75 ? "#ffa93d" : "#8892a6";
              return (
                <div className={`scout-grid scout-player-row ${index === 0 ? "first" : ""} ${selected ? "is-selected" : ""}`} key={player.id} role="button" tabIndex={0} onClick={() => togglePlayer(player.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") togglePlayer(player.id); }}>
                  <strong className="row-rank">{String(row.rank).padStart(2, "0")}</strong>
                  <div className="player-identity"><span className="row-avatar" style={{ background: player.avatar }} /><span><span className="handle-line"><Link href={`/players/${player.id}`} onClick={(event) => event.stopPropagation()}>{player.handle}</Link>{player.verified && <VerifiedIcon />}</span><small>{player.team} · {player.role} · {player.rank}</small></span></div>
                  <div className="rating"><strong>{row.rating.toFixed(1)}</strong><span>OVR</span></div>
                  <span className="mono value">{row.averageCombatScore}</span>
                  <span className="mono value">{row.winRate}%</span>
                  <div className="chemistry"><span><strong style={{ color: chemistryColor }}>{row.chemistry}</strong><small>fit</small></span><i><b style={{ width: `${row.chemistry}%`, background: chemistryColor }} /></i></div>
                  <BookmarkIcon className={row.saved ? "saved" : ""} />
                </div>
              );
            })}
            {rowData.length === 0 && (
              <div className="scout-empty">
                <strong>No players match these filters</strong>
                <span>Try a different role, or turn off &ldquo;Open to Work only&rdquo;.</span>
                <button onClick={resetFilters}>Reset filters</button>
              </div>
            )}
          </div>
          <div className="results-fill" />
          <div className="compare-tray">
            <Eyebrow>Roster simulation</Eyebrow>
            {selectedPlayer ? <span>Add <strong>{selectedPlayer.handle}</strong> as second {role}</span> : <span>Select a player to compare</span>}
            <div className="compare-stats">
              <span><small>Team chemistry</small><strong>{fixture.team.chemistry} <i>→ {selectedPlayer ? fixture.team.chemistry + 2 : fixture.team.chemistry}</i></strong></span>
              <span><small>Projected win rate</small><strong>{fixture.team.projectedWinRate}% <i>→ {selectedPlayer ? fixture.team.projectedWinRate + 3 : fixture.team.projectedWinRate}%</i></strong></span>
              <button disabled={!selectedPlayer}>RUN SIMULATION</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
