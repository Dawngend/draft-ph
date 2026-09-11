"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function ShellIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

function ScoutIcon(props: IconProps) {
  return <ShellIcon {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4M8 11h6M11 8v6" /></ShellIcon>;
}

function PlayerIcon(props: IconProps) {
  return <ShellIcon {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></ShellIcon>;
}

function LeaderboardIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="M5 20V10h4v10M10 20V4h4v16M15 20v-7h4v7M3 20h18" /></ShellIcon>;
}

function OfficiateIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="M12 3 4 7v5c0 5 3.4 8 8 9 4.6-1 8-4 8-9V7l-8-4Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></ShellIcon>;
}

function ReportIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5" /></ShellIcon>;
}

function TeamIcon(props: IconProps) {
  return <ShellIcon {...props}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20a6 6 0 0 1 12 0M14 15a5 5 0 0 1 7 4.5" /></ShellIcon>;
}

function TournamentIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="M8 4h8v4a4 4 0 0 1-8 0V4ZM9 20h6M12 12v8M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4" /></ShellIcon>;
}

function IntegrityIcon(props: IconProps) {
  return <ShellIcon {...props}><path d="M4 18V6M9 18v-7M14 18V9M19 18V4M2 18h20" /></ShellIcon>;
}

function SettingsIcon(props: IconProps) {
  return <ShellIcon {...props}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" /></ShellIcon>;
}

function PadlockIcon(props: IconProps) {
  return <ShellIcon {...props}><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></ShellIcon>;
}

const liveItems = [
  { label: "Scout Dashboard", href: "/scout", icon: ScoutIcon },
  { label: "Player Cards", href: "/players/phantom-edge", icon: PlayerIcon },
  { label: "Leaderboards", href: "/leaderboard", icon: LeaderboardIcon },
  { label: "Officiate", href: "/officiate", icon: OfficiateIcon },
];

const lockedItems = [
  { label: "Incident Reports", icon: ReportIcon },
  { label: "Teams and Rosters", icon: TeamIcon },
  { label: "Tournaments", icon: TournamentIcon },
  { label: "Integrity Console", icon: IntegrityIcon },
  { label: "Settings", icon: SettingsIcon },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const workspace = pathname.startsWith("/officiate") ? "Officiator Workspace" : "Scout Workspace";

  const isActive = (href: string) => {
    if (href.startsWith("/players")) return pathname.startsWith("/players");
    return pathname === href;
  };

  return (
    <div className="app-shell">
      <div className="prototype-banner">IDEATHON PROTOTYPE · FIXTURE DATA · NO LIVE BACKEND</div>
      <aside className="app-sidebar">
        <Link className="sidebar-brand" href="/" aria-label="DRAFT.PH overview">
          <span className="brand-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 5h10l6 7-6 7H4l6-7-6-7Z" />
              <path d="m10 5 5 7-5 7" />
            </svg>
          </span>
          <span className="brand-copy"><strong>DRAFT.PH</strong><small>{workspace}</small></span>
        </Link>

        <nav className="sidebar-nav" aria-label="Product navigation">
          {liveItems.map(({ label, href, icon: Icon }) => (
            <Link className={isActive(href) ? "active" : ""} href={href} aria-current={isActive(href) ? "page" : undefined} key={label}>
              <Icon /><span>{label}</span>
            </Link>
          ))}
          {lockedItems.map(({ label, icon: Icon }) => (
            <button type="button" className="locked" aria-disabled="true" disabled title="Planned for the build phase" key={label}>
              <Icon /><span>{label}</span><PadlockIcon className="nav-lock" />
            </button>
          ))}
        </nav>

        <div className="build-panel">
          <span>BUILD PHASE</span>
          <p><i />Ideathon · 4 of 9 surfaces</p>
          <div><i /></div>
        </div>
      </aside>
      <div className="app-content">{children}</div>
    </div>
  );
}
