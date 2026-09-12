"use client";

import { VALORANT_RANK_ORDER, valorantRankIndex, type PlayerRole, type ScoutFixture } from "@seal/protocol";
import { ArrowIcon, BookmarkIcon, Eyebrow, FilterIcon, StatusChip, VerifiedIcon } from "@seal/design-system";
import Link from "next/link";
import { useMemo, useState } from "react";

const roles: PlayerRole[] = ["Duelist", "Sentinel", "Initiator", "Controller"];
const initialMinimumRank = valorantRankIndex("Immortal 1");

export function ScoutDashboard({ fixture }: { fixture: ScoutFixture }) {
  const initialSavedIds = useMemo(() => fixture.rows.filter((row) => row.saved).map((row) => row.playerId), [fixture]);
  const schoolOptions = useMemo(() => Array.from(new Set(fixture.players.map((player) => player.school))).sort(), [fixture]);
  const [game, setGame] = useState<"Valorant" | "MLBB">("Valorant");
  const [role, setRole] = useState<PlayerRole>("Duelist");
  const [minimumRank, setMinimumRank] = useState(initialMinimumRank);
  const [school, setSchool] = useState("All schools");
  const [openOnly, setOpenOnly] = useState(true);
  const [graduating, setGraduating] = useState(false);
  const [selectedIds, setSelectedIds] = useState(fixture.selectedPlayerIds);
  const [savedIds, setSavedIds] = useState(initialSavedIds);
  const [sortMode, setSortMode] = useState<"chemistry" | "rating">("chemistry");
  const [compareOpen, setCompareOpen] = useState(false);
  const [simulationApplied, setSimulationApplied] = useState(false);

  const rowData = useMemo(
    () =>
      fixture.rows
        .map((row) => ({ ...row, player: fixture.players.find((player) => player.id === row.playerId)! }))
        .filter(({ player }) => player.game === game)
        .filter(({ player }) => player.role === role)
        .filter(({ player }) => valorantRankIndex(player.rank) >= minimumRank)
        .filter(({ player }) => school === "All schools" || player.school === school)
        .filter(({ player }) => (openOnly ? player.openToWork : true))
        .filter(({ player }) => (graduating ? player.graduating : true))
        .sort((a, b) => sortMode === "chemistry" ? b.chemistry - a.chemistry : b.rating - a.rating),
    [fixture, game, role, minimumRank, school, openOnly, graduating, sortMode],
  );

  const selectedRows = useMemo(
    () => selectedIds.flatMap((id) => {
      const row = fixture.rows.find((item) => item.playerId === id);
      const player = fixture.players.find((item) => item.id === id);
      return row && player ? [{ row, player }] : [];
    }),
    [fixture, selectedIds],
  );

  const selectedRow = selectedRows[0];
  const watchlistCount = fixture.team.watchlistCount + savedIds.length - initialSavedIds.length;
  const simulatedChemistry = selectedRow ? Math.max(fixture.team.chemistry, selectedRow.row.chemistry) : fixture.team.chemistry;
  const simulatedWinRate = selectedRow ? Math.min(100, fixture.team.projectedWinRate + Math.max(1, Math.round(selectedRow.row.chemistry / 30))) : fixture.team.projectedWinRate;

  function togglePlayer(id: string) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setSimulationApplied(false);
  }

  function toggleSaved(id: string) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function resetFilters() {
    setGame("Valorant");
    setRole("Duelist");
    setMinimumRank(initialMinimumRank);
    setSchool("All schools");
    setOpenOnly(true);
    setGraduating(false);
  }

  return (
    <main className="artboard scout-artboard">
      <div className="scout-body">
        <aside className="filter-rail panel">
          <div className="rail-heading"><Eyebrow>Filters</Eyebrow><StatusChip>Fixture data</StatusChip><button onClick={resetFilters}>Reset</button></div>
          <div className="filter-group">
            <Eyebrow>Game</Eyebrow>
            <div className="chip-row">
              {(["Valorant", "MLBB"] as const).map((value) => (
                <button
                  className={`choice-chip strong ${game === value ? "selected" : ""}`}
                  onClick={() => setGame(value)}
                  disabled={value === "MLBB"}
                  aria-disabled={value === "MLBB"}
                  title={value === "MLBB" ? "MLBB fixture indexing begins in a future build phase" : undefined}
                  key={value}
                >{value}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <Eyebrow>Role</Eyebrow>
            <div className="chip-row wrap">
              {roles.map((value) => (
                <button className={`choice-chip ${role === value ? "selected-outline" : ""}`} onClick={() => setRole(value)} aria-pressed={role === value} key={value}>{value}</button>
              ))}
            </div>
          </div>
          <div className="filter-group rank-filter">
            <div className="split"><Eyebrow>Minimum rank</Eyebrow><output htmlFor="minimum-rank">{VALORANT_RANK_ORDER[minimumRank]}</output></div>
            <input
              id="minimum-rank"
              type="range"
              min="0"
              max={VALORANT_RANK_ORDER.length - 1}
              value={minimumRank}
              aria-label="Minimum Valorant rank"
              aria-valuetext={VALORANT_RANK_ORDER[minimumRank]}
              onChange={(event) => setMinimumRank(Number(event.target.value))}
            />
          </div>
          <div className="filter-group">
            <label className="eyebrow" htmlFor="school-filter">School</label>
            <select id="school-filter" className="select-control" value={school} onChange={(event) => setSchool(event.target.value)}>
              <option>All schools</option>
              {schoolOptions.map((value) => <option key={value}>{value}</option>)}
            </select>
          </div>
          <div className="filter-group availability">
            <Eyebrow>Availability</Eyebrow>
            <button className={`toggle-line ${openOnly ? "on" : ""}`} onClick={() => setOpenOnly((value) => !value)} aria-pressed={openOnly}><span className="switch"><i /></span><span>Open to Work only</span></button>
            <button className={`toggle-line ${graduating ? "on" : ""}`} onClick={() => setGraduating((value) => !value)} aria-pressed={graduating}><span className="switch"><i /></span><span>Graduating this year</span></button>
          </div>
          <div className="watchlist">
            <Eyebrow>Watchlist</Eyebrow>
            <strong>{watchlistCount}<small> saved</small></strong>
            <span>{fixture.team.improvedThisWeek} improved this week</span>
          </div>
        </aside>

        <section className="scout-results panel">
          <div className="results-heading">
            <div><span className="heading-kicker"><Eyebrow>Scout Dashboard</Eyebrow><StatusChip>Fixture data</StatusChip></span><div><strong>{rowData.length} {rowData.length === 1 ? "player matches" : "players match"}</strong><span>ranked by {sortMode === "chemistry" ? "fit with your roster" : "overall rating"}</span></div></div>
            <div className="results-actions">
              <button onClick={() => setSortMode((current) => current === "chemistry" ? "rating" : "chemistry")} aria-pressed={sortMode === "chemistry"} title="Toggle between chemistry and rating sort"><FilterIcon />Sort: {sortMode === "chemistry" ? "Chemistry" : "Rating"}</button>
              <button className={compareOpen ? "active" : ""} onClick={() => setCompareOpen((current) => !current)} disabled={selectedIds.length === 0} aria-expanded={compareOpen} aria-controls="comparison-panel"><ArrowIcon down={compareOpen} />Compare ({selectedIds.length})</button>
            </div>
          </div>

          {compareOpen && (
            <section className="compare-panel panel" id="comparison-panel" aria-label="Selected player comparison">
              <div className="panel-header"><div><strong>Player comparison</strong><span>Fixture metrics shown side by side</span></div><button onClick={() => { setSelectedIds([]); setCompareOpen(false); setSimulationApplied(false); }}>Clear selection</button></div>
              <div className="comparison-grid">
                {selectedRows.map(({ player, row }) => (
                  <article key={player.id}>
                    <Link href={`/players/${player.id}`}>{player.handle}</Link>
                    <dl>
                      <div><dt>Rating</dt><dd>{row.rating.toFixed(1)}</dd></div>
                      <div><dt>ACS</dt><dd>{row.averageCombatScore}</dd></div>
                      <div><dt>Win rate</dt><dd>{row.winRate}%</dd></div>
                      <div><dt>Chemistry</dt><dd>{row.chemistry}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>
          )}

          <div className="scout-table-scroll">
            <div className="scout-grid scout-columns"><Eyebrow>#</Eyebrow><Eyebrow>Player</Eyebrow><Eyebrow>Rating</Eyebrow><Eyebrow>ACS</Eyebrow><Eyebrow>Win rate</Eyebrow><Eyebrow>Chemistry</Eyebrow><span /></div>
            {rowData.map(({ player, ...row }, index) => {
              const selected = selectedIds.includes(player.id);
              const saved = savedIds.includes(player.id);
              const chemistryColor = row.chemistry >= 85 ? "#3ddad7" : row.chemistry >= 75 ? "#ffa93d" : "#8892a6";
              return (
                <div className={`scout-grid scout-player-row ${index === 0 ? "first" : ""} ${selected ? "is-selected" : ""}`} key={player.id} role="button" tabIndex={0} aria-pressed={selected} onClick={() => togglePlayer(player.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); togglePlayer(player.id); } }}>
                  <strong className="row-rank">{String(index + 1).padStart(2, "0")}</strong>
                  <div className="player-identity"><span className="row-avatar" style={{ background: player.avatar }} /><span><span className="handle-line"><Link href={`/players/${player.id}`} onClick={(event) => event.stopPropagation()}>{player.handle}</Link>{player.verified && <VerifiedIcon />}</span><small>{player.team} · {player.role} · {player.rank}</small></span></div>
                  <div className="rating"><strong>{row.rating.toFixed(1)}</strong><span>OVR</span></div>
                  <span className="mono value">{row.averageCombatScore}</span>
                  <span className="mono value">{row.winRate}%</span>
                  <div className="chemistry"><span><strong style={{ color: chemistryColor }}>{row.chemistry}</strong><small>fit</small></span><i><b style={{ width: `${row.chemistry}%`, background: chemistryColor }} /></i></div>
                  <button className={`bookmark-button ${saved ? "saved" : ""}`} aria-label={`${saved ? "Remove" : "Add"} ${player.handle} ${saved ? "from" : "to"} watchlist`} aria-pressed={saved} onClick={(event) => { event.stopPropagation(); toggleSaved(player.id); }}><BookmarkIcon filled={saved} /></button>
                </div>
              );
            })}
            {rowData.length === 0 && (
              <div className="scout-empty">
                <strong>No players match these filters</strong>
                <span>Try a different role, school, or minimum rank.</span>
                <button onClick={resetFilters}>Reset filters</button>
              </div>
            )}
          </div>
          <div className="results-fill" />
          <div className="compare-tray">
            <Eyebrow>Roster simulation</Eyebrow>
            {selectedRow ? <span>Add <strong>{selectedRow.player.handle}</strong> as second {role}</span> : <span>Select a player to simulate</span>}
            <div className="compare-stats">
              <span><small>Team chemistry</small><strong>{fixture.team.chemistry} <i>→ {simulationApplied ? simulatedChemistry : fixture.team.chemistry}</i></strong></span>
              <span><small>Projected win rate</small><strong>{fixture.team.projectedWinRate}% <i>→ {simulationApplied ? simulatedWinRate : fixture.team.projectedWinRate}%</i></strong></span>
              <button disabled={!selectedRow} onClick={() => setSimulationApplied((current) => !current)}>{simulationApplied ? "RESET SIMULATION" : "RUN SIMULATION"}</button>
            </div>
            <span className="simulation-status" aria-live="polite">{simulationApplied ? "Fixture simulation applied locally." : ""}</span>
          </div>
        </section>
      </div>
    </main>
  );
}
