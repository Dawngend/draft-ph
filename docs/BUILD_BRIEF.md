# Build brief, ideathon prototype

Handed to Codex. Scope is the clickable prototype only, not the real backend.

## Task

Build a Next.js 15 App Router prototype of SEAL that renders four screens from fixture data and deploys to Vercel. No database, no auth, no API calls. Every screen reads from typed fixtures so the Supabase query can replace the fixture import later without touching the components.

## Non-negotiable inputs

- `docs/ARCHITECTURE.md` for the data shapes and the flows
- `docs/TECH_STACK.md` for the exact palette, type, and the anti-slop constraints
- `docs/SPECIFICATION.md` for scope
- `design/*.dc.html` for the visual target. These are the approved layouts. Match them.
- `AGENTS.md` for lifecycle and prose rules

## Deliverable

```
apps/portal/           Next.js 15, App Router, TypeScript, Tailwind 4
  app/scout/           Scout Dashboard, the landing route
  app/players/[id]/    Player Card
  app/officiate/       Incident Ruling Workspace
  app/leaderboard/     Public Leaderboard
domains/protocol/      Shared TypeScript types, the fixture contract
  fixtures/            Seeded players, teams, matches, incidents
design-system/         Shared primitives extracted from the artboards
```

## Rules

1. Types in `domains/protocol` first. Fixtures conform to them. Components take typed props and never import a fixture directly; the route does.
2. Reproduce the artboards' exact values. Read them; do not approximate.
3. Fonts via `next/font/google`: Chakra Petch, Inter Tight, JetBrains Mono.
4. Responsive down to 390px. The artboards are desktop; make the sensible mobile call and keep hit targets at 44px or more.
5. Inline SVG icons only. No emoji, no icon font.
6. No em dashes in any copy.
7. Interactive where it costs nothing: filter chips toggle, rows select, the compare tray reflects selection. State is local. Nothing persists.
8. `npm run build` and `npm run typecheck` must pass before you report done.
9. Do not mark anything Done. Stop at In Review and report.

## Deploy

Vercel, project `seal-ph`, from `apps/portal`. Report the URL.
