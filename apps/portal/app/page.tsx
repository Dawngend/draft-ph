import { ArrowIcon, StatusChip } from "@seal/design-system";
import { leaderboardFixture, officiateFixture, scoutFixture } from "@seal/protocol/fixtures";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

function OverviewIcon({ children, ...props }: SVGProps<SVGSVGElement> & { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

const surfaces = [
  {
    href: "/scout",
    title: "Scout Dashboard",
    description: "Filter verified collegiate talent, compare performance, and test roster fit.",
    icon: <OverviewIcon><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M8 11h6M11 8v6" /></OverviewIcon>,
  },
  {
    href: "/players/phantom-edge",
    title: "Player Cards",
    description: "Review verified identity, career metrics, strengths, and tournament history.",
    icon: <OverviewIcon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></OverviewIcon>,
  },
  {
    href: "/leaderboard",
    title: "Leaderboards",
    description: "See nationwide player rankings and compare school standings.",
    icon: <OverviewIcon><path d="M5 20V10h4v10M10 20V4h4v16M15 20v-7h4v7M3 20h18" /></OverviewIcon>,
  },
  {
    href: "/officiate",
    title: "Officiate",
    description: "Inspect evidence timelines, select outcomes, and authorize local rulings.",
    icon: <OverviewIcon><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></OverviewIcon>,
  },
];

export default function Home() {
  const stats = [
    {
      value: leaderboardFixture.verifiedPlayerCount,
      label: "Verified players",
      icon: <OverviewIcon><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M17 11l2 2 4-5" /></OverviewIcon>,
    },
    {
      value: leaderboardFixture.schoolCount,
      label: "Schools indexed",
      icon: <OverviewIcon><path d="M2 10 12 5l10 5-10 5L2 10ZM6 12v5c3 3 9 3 12 0v-5M22 10v6" /></OverviewIcon>,
    },
    {
      value: scoutFixture.team.watchlistCount,
      label: "On your watchlist",
      icon: <OverviewIcon><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></OverviewIcon>,
    },
    {
      value: officiateFixture.incidents.filter((incident) => incident.status !== "resolved").length,
      label: "Open incidents",
      icon: <OverviewIcon><path d="M12 3 2 21h20L12 3ZM12 9v5M12 18h.01" /></OverviewIcon>,
    },
  ];

  return (
    <main className="overview-page">
      <header className="page-heading">
        <div><span className="eyebrow">SEAL OVERVIEW</span><h1>Collegiate esports, in one operating view</h1><p>Four fixture-backed surfaces for player discovery and evidence-based tournament rulings.</p></div>
        <StatusChip>Fixture data</StatusChip>
      </header>

      <section className="stat-tile-grid" aria-label="Prototype summary">
        {stats.map((stat) => (
          <article className="stat-tile" key={stat.label}>
            {stat.icon}
            <strong>{stat.value.toLocaleString()}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </section>

      <section className="surface-grid" aria-label="Live prototype surfaces">
        {surfaces.map((surface) => (
          <Link className="surface-card panel" href={surface.href} key={surface.href}>
            <span className="surface-icon">{surface.icon}</span>
            <span><strong>{surface.title}</strong><small>{surface.description}</small></span>
            <ArrowIcon />
          </Link>
        ))}
      </section>
    </main>
  );
}
