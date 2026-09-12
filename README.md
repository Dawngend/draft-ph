# SEAL

**Student Esports Athlete League.** The all-in-one platform for Philippine collegiate esports.

Verified player discovery, AI-assisted team chemistry, and evidence-backed incident management in one system.

Submitted to **The Next Gen 2026** by **Team Hackatots**.

---

## Elevator pitch

SEAL is the first all-in-one platform built for Philippine collegiate esports. Players get a verified Player Card built from real match data, team captains get a searchable scout dashboard with AI-powered chemistry prediction and roster simulation, and tournament organizers get auto-detected incidents with an evidence timeline and an auditable ruling workspace. One system, so players get found, teams recruit smart, and tournaments run clean.

## Problem statement

Philippine collegiate esports is booming, but the system is broken. Players blast LFG posts across 5+ Facebook groups and 3+ Discord servers with no guarantee of being seen. Team captains scroll through hundreds of unverified profiles they cannot trust. Tournament organizers juggle incident reports from screenshots, chats, and verbal claims with no central system and no audit trail. The result is wasted time, inconsistent rulings, and talented players going undiscovered.

SEAL fixes this as the first all-in-one platform for PH collegiate esports: verified player cards, AI-powered team chemistry, a structured scout dashboard, and full incident management, so players get found, teams recruit smart, and tournaments run clean.

## The three pillars

| Pillar | What it does | Primary persona |
|---|---|---|
| 1. Player Discovery and Recruitment | Player Cards, Scout Dashboard, leaderboards, Team Chemistry Rating, roster simulation | JC, the player |
| 2. Tournament Integrity | `.edu.ph` school verification, match-window identity checks, cross-league history consolidation | Leagues and schools |
| 3. Incident Management | Auto-detection, Evidence Timeline, Ruling Workspace, post-event reports | Maria (organizer), Andre (officiator) |

**Live prototype:** https://seal-ph.vercel.app

## Documentation

- [Architecture](docs/ARCHITECTURE.md), the frontend / backend / database contract
- [Tech stack](docs/TECH_STACK.md), languages, frameworks, and useable assets
- [Specification](docs/SPECIFICATION.md), features, personas, and scope
- [Agent operating policy](AGENTS.md)

UI wireframes live in [`design/`](design/) as standalone artboards, and the same screens run live in the prototype.

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
