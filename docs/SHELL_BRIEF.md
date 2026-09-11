# Shell brief, matching the PyTorch FIT layout language

Second Codex task, after `BUILD_BRIEF.md`. Two goals, in order:

1. Every visible control either works or is visibly inactive. No dead buttons.
2. The app wears the same layout language as `PyTorch-FEU-Tech-Chapter/pytorch-fit-system`, which is the handoff target.

Keep DRAFT.PH's own palette, type, and identity from `docs/TECH_STACK.md`. Borrow the **structure**, not the branding. Never write PyTorch, FIT, or their wordmark anywhere in DRAFT.PH.

---

## 1. The app shell

Every route renders inside one persistent shell. Build it as `apps/portal/components/app-shell.tsx` and use it from every page.

### Top banner

Full-bleed strip above everything, spanning the whole viewport width including over the sidebar.

- Background `--draft-orange`, text `--arena-black`
- Text centered, uppercase, `--font-mono`, ~12px, `letter-spacing: .14em`, weight 600
- Content: `IDEATHON PROTOTYPE · FIXTURE DATA · NO LIVE BACKEND`
- Height 34px, no border

This is an honesty device. It tells a judge immediately that the data is seeded, which is better than them discovering it.

### Left sidebar

Fixed, 264px wide, full height, background `--subground`, right border `1px solid --arena-line`.

**Brand block** (top, 20px padding):
- 48px square tile, `border-radius: 12px`, background `linear-gradient(135deg, var(--draft-orange), var(--draft-ember))`, containing a 24px inline-SVG mark in `--arena-black`. Draw a simple angular chevron or shield. Not an emoji.
- Beside it, two stacked lines: `DRAFT.PH` in `--font-display`, 15px, weight 700, letter-spacing .02em; and a muted 12px second line naming the current workspace (`Scout Workspace` / `Officiator Workspace`).

**Nav list**: each item is 44px tall, `border-radius: 10px`, 12px horizontal padding, a 20px inline-SVG icon plus a 14.5px label, 2px vertical gap between items.

- Default: transparent background, `--text-muted` label, `--text-dim` icon
- Hover: background `rgba(255,255,255,.04)`, label `--text-primary`
- Active: background `--draft-orange`, label and icon `--arena-black`, weight 600
- Locked: label `--text-dim` at 55% opacity, a 14px padlock icon right-aligned, `cursor: not-allowed`, `aria-disabled="true"`, and it does not navigate

Items, in order, with their state:

| Item | Route | State |
|---|---|---|
| Scout Dashboard | `/scout` | live |
| Player Cards | `/players/phantom-edge` | live |
| Leaderboards | `/leaderboard` | live |
| Officiate | `/officiate` | live |
| Incident Reports | | locked |
| Teams and Rosters | | locked |
| Tournaments | | locked |
| Integrity Console | | locked |
| Settings | | locked |

**Bottom panel**, pinned to the bottom above 20px padding, separated by a top hairline:

- Eyebrow `BUILD PHASE` in mono, 10px, letter-spacing .16em, `--text-dim`
- A status row: a 7px `--verified-cyan` dot and the text `Ideathon · 4 of 9 surfaces`
- A 4px progress track, `--arena-line` background, filled to 44% with `--draft-orange`

### Content area

Left margin 264px, top margin 34px. Background `--arena-black`. Page padding 28px.

---

## 2. New route: `/` overview

Currently `/` redirects to `/scout`. Replace it with a real overview page, because the stat-tile row is the strongest first impression and the bare URL is what a judge opens.

**Stat tile row**: four tiles in a `repeat(4, minmax(0,1fr))` grid, 18px gap.

Each tile: background `--arena-panel`, `1px solid --arena-line`, `border-radius: 12px`, 20px padding. Inside, stacked: a 22px inline-SVG icon in `--draft-orange`; a number in `--font-display` at 38px weight 700, `--text-primary`; a 13px `--text-muted` label.

| Value | Label | Source |
|---|---|---|
| 1,284 | Verified players | `leaderboardFixture` |
| 42 | Schools indexed | `leaderboardFixture` |
| 12 | On your watchlist | `scoutFixture.team.watchlistCount` |
| 3 | Open incidents | `officiateFixture`, count of unresolved |

Every number must be derived from a fixture. Do not hardcode a number into the JSX.

Below the tiles, a two-column card grid linking into the four live surfaces, each card carrying a one-line description and a real `next/link`.

---

## 3. Card and chip vocabulary

Apply consistently across all routes. These are deliberate system values, not defaults: use them exactly, and do not introduce a third radius or a shadow.

- **Panel**: background `--arena-panel`, `1px solid --arena-line`, `border-radius: 14px`
- **Panel header**: title `--font-display` 17px weight 600; optional subtitle 13px `--text-muted`; optional chip right-aligned
- **Chip**: `border-radius: 999px`, padding 4px 11px, 11px text, `1px solid`, translucent fill of its own colour. Variants: `fixture` (orange, label `Fixture data`), `verified` (cyan), `blocked` (crimson)
- **No box-shadow anywhere.** Separation comes from the hairline border and the panel background, as it already does
- Every panel showing seeded numbers carries a `Fixture data` chip. Do not use a sparkle glyph for it; draw a small database or layers icon

---

## 4. Wire every control

Nothing visible may be inert without looking inert.

**Scout Dashboard**
- `Chemistry` toggles the sort between chemistry descending and rating descending, and shows which is active
- `Compare (n)` opens a panel listing the selected players side by side with rating, ACS, win rate, chemistry, and a clear-selection action. Disabled when nothing is selected
- School dropdown becomes a real `<select>` bound to state, filtering by the player's school, with an `All schools` default
- Minimum-rank slider becomes a real `<input type="range">` bound to state and filtering on rank order. Define the Valorant rank order in `domains/protocol`
- Bookmark icons toggle a local saved set and update the watchlist count in the rail

**Leaderboard**
- `Players` / `Schools` / `Tournament MVP` become real tabs switching the table. Players and Schools render from fixtures. Tournament MVP has no fixture, so render it as a locked tab, consistent with the sidebar's locked treatment

**Incident Ruling Workspace**
- Queue items are selectable and swap the evidence timeline and ruling panel. Give every incident its own timeline in the fixtures
- Outcome options are a real radio group bound to state
- `Authorize Ruling` moves the incident to a resolved state, removes it from the open count, and shows a confirmation. Local state only
- `Escalate` marks it escalated. Local state only

**Player Card**
- `Discord` is visibly inactive with a tooltip explaining contact handoff needs a live account

Anything that cannot be made real gets the locked treatment. That is honest and reads as a roadmap, not a bug.

---

## Rules

1. Fixture-only. No database, auth, API routes, or network calls.
2. All state is local React state. Nothing persists.
3. New fixture data conforms to types in `domains/protocol`. Extend the types where needed.
4. Inline SVG icons on a 20/24px grid, one consistent stroke weight. No emoji, no icon font, no sparkle glyph.
5. Hit targets 44px or more. Keyboard operable. `aria-disabled` on every locked control.
6. Responsive to 390px: the sidebar collapses to a top bar below 900px.
7. No em dashes in any copy.
8. `npm run build` and `npm run typecheck` must pass.
9. Do not mark anything Done. Stop at In Review and report what you built, what you locked, and why.
