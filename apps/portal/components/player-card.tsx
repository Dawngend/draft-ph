import type { Player } from "@seal/protocol";
import { careerStatsFor } from "@seal/protocol";
import { ArrowIcon, Eyebrow, InfoIcon, LockIcon, SchoolIcon, StatusChip, VerifiedIcon } from "@seal/design-system";

export function PlayerCard({ player }: { player: Player }) {
  const score = player.rating.toFixed(1).split(".");

  return (
    <main className="player-page">
      <article className="player-card-shell panel">
        <StatusChip>Fixture data</StatusChip>
        <div className="diagonal-accent" />
        <div className="vertical-accent" />
        <div className="player-hero">
          <div className="portrait-column">
            <div className="portrait" style={{ background: player.avatar }}>
              {player.verified && <span><VerifiedIcon />VERIFIED</span>}
            </div>
            {player.verified && <div className="school-verified"><SchoolIcon />{player.verifiedDomain}</div>}
          </div>
          <div className="player-copy">
            <div className="identity-kicker"><Eyebrow>{player.game}</Eyebrow><i /><Eyebrow>{player.role}</Eyebrow><i /><Eyebrow>{player.rank}</Eyebrow></div>
            <div className="player-name"><h1>{player.handle}</h1><p>{player.fullName} · {player.team} · {player.course}</p></div>
            <div className="player-actions">
              {player.openToWork && <span className="open-badge"><i />OPEN TO WORK</span>}
              <span className="disabled-control" tabIndex={0}>
                <button aria-label="Discord contact unavailable" aria-disabled="true" disabled><LockIcon />Discord</button>
                <span role="tooltip">Contact handoff needs a live account.</span>
              </span>
            </div>
          </div>
          <div className="overall-score">
            <Eyebrow>Overall</Eyebrow><strong>{score[0]}</strong><span>.{score[1]}</span>
            <small><ArrowIcon />+{player.ratingDelta.toFixed(1)} this month</small>
          </div>
        </div>
        <div className="stat-bars">
          {player.statBars.map((bar) => {
            const color = bar.value >= 88 ? "#ff6b35" : bar.value >= 80 ? "#ffa93d" : "#8892a6";
            return <div className="stat-bar" key={bar.label}><Eyebrow>{bar.label}</Eyebrow><strong style={{ color }}>{bar.value}</strong><i><b style={{ width: `${bar.value}%`, background: color }} /></i></div>;
          })}
        </div>
      </article>

      <section className="player-details">
        <div className="detail-panel career-panel panel">
          <div className="detail-heading"><Eyebrow>Career stats</Eyebrow><StatusChip>Fixture data</StatusChip><span>seeded snapshot · 2h old</span></div>
          <div className="career-list">
            {careerStatsFor(player).map((stat) => <div key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></div>)}
          </div>
          <div className="agent-pool"><Eyebrow>Agent pool</Eyebrow><div>{player.agentPool.map((agent, index) => <span className={index === 0 ? "primary" : ""} key={agent}>{agent}</span>)}</div></div>
        </div>
        <div className="detail-panel history-panel panel">
          <div className="detail-heading"><Eyebrow>Tournament history</Eyebrow><StatusChip>Fixture data</StatusChip></div>
          <div className="history-list">
            {player.tournamentHistory.map((item) => <div className="history-item" key={`${item.event}-${item.year}`}><i style={{ background: item.accent }} /><span><strong>{item.event}</strong><small style={{ color: item.accent }}>{item.placement}</small><em>{item.team}</em></span><time>{item.year}</time></div>)}
          </div>
          <div className="history-note"><InfoIcon /><span>Cross-league history consolidated from PCC, UAAP and NCAA records.</span></div>
        </div>
      </section>
    </main>
  );
}
