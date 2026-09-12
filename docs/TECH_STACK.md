# Tech Stack and Useable Assets

**Team Hackatots** · The Next Gen 2026 · Owners: Dawn, Andrew

Companion to [ARCHITECTURE.md](ARCHITECTURE.md). That file says how the pieces talk. This one says what the pieces are and why each was chosen over the obvious alternative.

---

## 1. Languages and frameworks

| Layer | Choice | Version | Chosen over | Reason |
|---|---|---|---|---|
| Web framework | Next.js, App Router | 15.x | Vite plus Express | Server Components let the database read happen on the server with the user's JWT, so no separate API layer is needed for reads |
| UI library | React | 19.x | Vue, Svelte | The team already ships React; a hackathon is the wrong place to learn a framework |
| Language, web | TypeScript | 5.x | JavaScript | Shared types in `domains/protocol` are what keep three developers from disagreeing about a payload shape at 3am |
| Styling | Tailwind CSS | 4.x | CSS Modules | Speed, and a token layer that survives the handoff to Andrew |
| Components | shadcn/ui, extended | latest | Material UI | Copy-in components we own and restyle, rather than fighting a themed library |
| Service tier | FastAPI | 0.115.x | Flask, Django | Async by default, Pydantic validation matches the strict JSON contract, automatic OpenAPI for the frontend |
| Language, service | Python | 3.12 | Node | numpy, pandas, and scikit-learn are the reason this service exists |
| Charts | Recharts | 2.x | Chart.js | React-native composition, and it themes from the same tokens as everything else |

There is deliberately **no desktop client** in this list. An in-match companion for automatic incident detection is a product feature we want, and Tauri would be the right tool for it, but it is not a tier of this architecture: it would be a second client posting to the same route handlers. Adding it later moves no boxes, so it stays out of the ideathon scope.

## 2. Data platform

| Concern | Choice | Reason |
|---|---|---|
| Database | Supabase Postgres 16 | Relational, because rosters, matches, incidents, and rulings are all relationships. Row Level Security is what makes the privacy model enforceable in the database rather than in UI checks. |
| Auth service | GoTrue (Go), inside the Supabase project | The JWT issuer. Email OTP with a `.edu.ph` domain allowlist, which is the school verification requirement handled at the auth layer instead of bolted on later |
| Object store | Supabase Storage, S3-compatible | Evidence media as objects behind the S3 API with signed URLs. The metadata row stays in Postgres under the same RLS policies, so the bytes and the permissions never drift apart. |
| Change stream | Supabase Realtime (Phoenix, Elixir) | A separate server process holding a WAL replication slot on Postgres and fanning changes out over WebSocket. This is what makes the incident queue live rather than polled. |
| Migrations | Supabase CLI, SQL files | Versioned in git, applied by CI, never edited by hand in a dashboard |

**These are four processes, not one product.** A Supabase project bundles them behind one dashboard and one billing line, which is the deliberate simplification: one vendor to integrate during a build phase instead of four. But they are separate services with separate protocols, and the architecture treats them that way, because the two decisions that matter (authorization enforced in Postgres, change notification read off the WAL) live in the seams between them.

## 3. Infrastructure

| Concern | Choice |
|---|---|
| Web hosting | Vercel, with a preview deployment per pull request |
| Service hosting | Fly.io or Railway, single container |
| CI | GitHub Actions: typecheck, lint, unit tests, migration check |
| Package management | npm workspaces (JS), uv (Python) |
| Error tracking | Sentry, free tier |

## 4. External data sources

| Source | Used for | Access | Fallback |
|---|---|---|---|
| op.gg | Valorant and LoL match stats | Public endpoints, cached | Manual entry with screenshot |
| Tracker.gg | Valorant detailed stats | Public API, rate limited | Manual entry |
| OpenDota | Dota 2 | Documented public API | Manual entry |
| Dotabuff | Dota 2 supplementary | Scraped, rate limited and cached | Manual entry |
| Discord | Contact handoff, deep link only | No API dependency | Direct link |

Every automated source has a manual fallback. Nothing in the demo depends on a third party being up, which is the mistake that kills live hackathon demos.

**Access policy.** Adapters use documented endpoints, respect rate limits, cache aggressively, and back off on failure. No CAPTCHA bypass, no fingerprint spoofing, no identity rotation. If a source blocks, the adapter stops and the field falls back to manual entry with a visible "unverified" badge.

## 5. Useable assets

Assets that already exist and are reused rather than rebuilt:

| Asset | Origin | Reuse |
|---|---|---|
| Monorepo layout, workspace boundaries, agent policy | `PyTorch-FEU-Tech-Chapter/pytorch-fit-system` | Directory structure, `AGENTS.md` lifecycle rules, RLS-first privacy model, and the strict JSON AI contract are adopted directly |
| shadcn/ui primitives | Open source, MIT | Button, card, dialog, table, tabs, badge, progress, tooltip |
| Lucide icons | Open source, ISC | Full icon set, no emoji standing in for icons |
| Fixture dataset | Written for this submission | Seeded players, teams, matches, and incidents so every screen renders without a live backend |

## 6. Design tokens

A palette derived from the subject, PH collegiate esports at night, rather than a reused house style.

| Token | Hex | Role |
|---|---|---|
| `--arena-black` | `#0b0d12` | Page ground |
| `--arena-panel` | `#141821` | Card and panel surface |
| `--arena-line` | `#252b38` | Hairline borders, the primary separation device |
| `--seal-orange` | `#ff6b35` | Primary accent, calls to action, live states |
| `--seal-ember` | `#ffa93d` | Secondary accent, ratings and highlights |
| `--verified-cyan` | `#3ddad7` | Verified badges, confirmed evidence |
| `--flag-crimson` | `#e5484d` | Incidents, severity, errors |
| `--text-primary` | `#e8ecf5` | Body text |
| `--text-muted` | `#8892a6` | Labels, metadata |

Type: **Chakra Petch** for display and stat readouts (angular, competitive, reads as esports without costume), **Inter Tight** for body, **JetBrains Mono** for timestamps and IDs in the evidence timeline, where monospace carries real meaning.

Explicitly avoided: purple-to-blue gradients, glassmorphic blur, `#0f172a` slate, uniform corner radius, drop shadows on every surface, and emoji used as icons.
