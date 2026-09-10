# DRAFT.PH

**The complete collegiate esports platform for the Philippines.**

Verified player discovery, tournament integrity, and evidence-backed incident management in one system.

Submitted to **The Next Gen 2026** by **Team Hackatots**.

---

## Elevator pitch

Philippine collegiate esports runs on Facebook groups, Discord screenshots, and verbal rulings. DRAFT.PH replaces that with one platform: players get a verified Player Card built from real match data, scouts get a searchable dashboard with chemistry prediction and roster simulation, and tournament officials get auto-detected incidents with an evidence timeline and an auditable ruling workspace.

## The three pillars

| Pillar | What it does | Primary persona |
|---|---|---|
| 1. Player Discovery and Recruitment | Player Cards, Scout Dashboard, leaderboards, Team Chemistry Rating, roster simulation | JC, the player |
| 2. Tournament Integrity | `.edu.ph` school verification, match-window identity checks, cross-league history consolidation | Leagues and schools |
| 3. Incident Management | Auto-detection, Evidence Timeline, Ruling Workspace, post-event reports | Maria (organizer), Andre (officiator) |

## Documentation

- [Architecture](docs/ARCHITECTURE.md), the frontend / backend / database contract
- [Tech stack](docs/TECH_STACK.md), languages, frameworks, and useable assets
- [Specification](docs/SPECIFICATION.md), features, personas, and scope
- [Wireframes](docs/WIREFRAMES.md), core feature layouts
- [Agent operating policy](AGENTS.md)

## Status

**Ideathon phase.** This repository carries the architecture, the data contract, and a clickable prototype with fixture data. Every screen reads from `domains/protocol` types and seeded fixtures, so the same components swap to live Supabase queries without a rewrite when the build phase opens on September 18.

## Team

Team **Hackatots**, The Next Gen 2026.

| Area | Owner |
|---|---|
| Project title and elevator pitch | David, Clarence |
| Problem statement | David, Clarence |
| Solution architecture and tech stack | Dawn, Andrew |
| UI wireframe | All |
