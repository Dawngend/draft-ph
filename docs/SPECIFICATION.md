# SEAL Specification

**Team Hackatots** · The Next Gen 2026

Source: `CCE-HACKATHON-Updated.docx`. This file is the working version of that document, with scope decisions added.

---

## Personas

| Persona | Role | Key need |
|---|---|---|
| Juan Carlos "JC" Reyes | Player, Valorant Immortal 2, 3rd year CS at UST | Get discovered by a semi-pro team with stats someone can actually verify |
| Maria | Organizer, President of Mapua Esports Society | Run incidents efficiently, with evidence and an audit trail, without stalling the bracket |
| Andre | Officiator, Technical Lead of DLSU Gaming Club | Make fair, evidence-backed rulings with the rule in front of him |

### The current cost

JC posts "LFG" in five Facebook groups and three Discord servers, proves his rank by screenshot, proves his enrollment by ID photo, and waits two to three weeks. Most posts get buried.

Maria reads thirty-plus Discord messages to reconstruct who disconnected first, while three other matches wait.

Andre once granted a rematch on a verbal claim and a photo of a blue screen. The opposing team disputed it, there was no way to verify, the ruling was overturned, and he lost credibility as an officiator.

---

## Must-have features

**Pillar 1, Player Discovery and Recruitment**

- Player profile creation, form-based
- Game account linking (Valorant, MLBB), manual entry at MVP
- Tournament history with screenshot upload
- "Open to Work" toggle and recruitment preferences
- Team profile creation with roster management
- Player search and filter by game, rank, school, role
- Direct contact via Discord link
- Player Cards: overall rating, stat bars (Aim, Game Sense, Teamplay, Clutch, Consistency), achievements, career stats
- Public leaderboards by school, game, role, and tournament MVP
- Team Chemistry Rating, calculated and displayed
- Team versus team simulation with win probability
- Scout Dashboard: watchlist, improvement alerts, side-by-side compare, shortlists
- Roster simulation: swap a player, see projected impact

**Pillar 2, Tournament Integrity**

- School email verification, `.edu.ph` domains
- Pre-match and post-match identity verification
- Account sharing detection
- Cross-league history consolidation (PCC, UAAP, NCAA, Estudyante Esports)

**Pillar 3, Incident Management**

- Auto-flag disconnections, severe lag spikes, device crashes, power interruptions
- Manual incident opening by players or officials
- Evidence Timeline: automated indicators, player submissions, staff observations, pause duration, related rules, in one case file
- Ruling Workspace: surfaces the relevant policy, standardized outcomes, logs authorization, notes, and team notification
- Auto-sync from op.gg, Tracker.gg, Dotabuff, OpenDota with a verified-stats badge

## Nice-to-have features

- AI-generated player summary from profile data
- Event calendar for PH collegiate tournaments
- In-app messaging
- Tournament bracket integration
- Analytics dashboard for team captains
- Mobile-responsive PWA
- Post-Event Incident Report: counts, response times, recurring technical patterns, unresolved cases
- Privacy-first telemetry: minimal, consent-based, match-window only

---

## The problem table

| Problem | Impact | Who suffers |
|---|---|---|
| Fragmented discovery | Players follow 5+ Facebook pages and Discord servers to find tournaments | Players |
| No structured recruitment | Captains scroll hundreds of "LFG" posts | Teams |
| Manual verification | No way to verify rank, enrollment, or tournament history | Everyone |
| Account sharing | Players sometimes have others play for them | Leagues |
| Cross-league silos | History scattered across PCC, UAAP, NCAA, Estudyante Esports | Players |
| No student verification | Seek Team and Curry.gg do not verify Philippine student status | Teams |
| No incident documentation | Rulings inconsistent and untraceable | Players, organizers |
| Scattered evidence | Reports arrive via screenshots, chat, forms, verbal claims | Everyone |
| No audit trail | Disputed rulings cannot be reviewed | Schools, leagues |
| Recurring infrastructure failures | No data on which stations or venues cause problems | Technical staff, organizers |

---

## Scope decisions

### Ideathon phase, now through September 12

Deliverable is a PDF. No live functionality is required or graded. What exists in this repository is the architecture, the data contract, and hardcoded screens that prove the design is real.

**Screens built:** Scout Dashboard (the core feature), Player Card, Incident Ruling Workspace, Public Leaderboard.

**Deliberately not built:** face verification, live stat auto-sync, messaging, bracket integration. Each depends on a third party and none of them change the pitch.

### Build phase, September 18, if selected top five

Order of construction, from [ARCHITECTURE.md](ARCHITECTURE.md):

1. Auth plus `.edu.ph` verification, profiles, Player Card read path
2. Scout Dashboard search and filters against real rows
3. Chemistry service with the real weighted function
4. Incident ingest, Evidence Timeline, Ruling Workspace
5. Leaderboards and the post-event report

Items 1 through 3 give a complete recruitment demo. Item 4 completes the Maria and Andre story. Item 5 is what gets cut if time runs out.

---

## Submission mapping

| Required section | Owner | Source |
|---|---|---|
| Project title and elevator pitch | David, Clarence | [README.md](../README.md) |
| Problem statement | David, Clarence | The problem table above, plus the persona costs |
| Architecture, useable assets and tech stack | Dawn, Andrew | [ARCHITECTURE.md](ARCHITECTURE.md), [TECH_STACK.md](TECH_STACK.md) |
| UI wireframe | All | `design/` artboards |
