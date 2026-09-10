# AGENTS.md

Operating policy for AI agents working in this repository. Adopted from `PyTorch-FEU-Tech-Chapter/pytorch-fit-system`, which is the handoff target for this project.

## Read first

1. [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), the frontend / backend / database contract
2. [docs/TECH_STACK.md](docs/TECH_STACK.md), the stack and the design tokens
3. [docs/SPECIFICATION.md](docs/SPECIFICATION.md), features and scope

## Lifecycle

Backlog to Todo to In Progress to In Review to Done.

**An agent may only advance work to `In Review`. An agent must never mark work `Done`.** A human verifies the code, the logic, or the rendered output, and a human moves the card to `Done`.

## Phase discipline

This repository is in the **ideathon phase** until September 18, 2026.

- Screens render from fixtures in `domains/protocol/fixtures`, not from a live database.
- Every fixture must conform to the TypeScript types in `domains/protocol`. When the build phase opens, the Supabase query replaces the fixture import and nothing else changes.
- Do not build features that are not in the specification. Do not build a backend the wireframes do not show.
- Do not add a dependency without recording it in `docs/TECH_STACK.md`.

## Design constraints

The palette and type are recorded in `docs/TECH_STACK.md` and are not up for reinterpretation.

Prohibited by default, because they are the visual tells of generated work: purple-to-blue gradients, blurred gradient blobs behind glass cards, `#0f172a` slate as the dark ground, uniform corner radius on every element, `shadow-lg` on every surface, a centered hero followed by three even icon-title-paragraph cards, emoji standing in for icons, and a sparkle glyph for anything AI-related.

Structure carries meaning. Numbering, dividers, and grouping encode information or they get removed.

## Prose constraints

No em dashes anywhere in user-facing copy, documentation, or commit messages. Use commas, colons, or parentheses.

## Data and privacy

- Row Level Security is the enforcement boundary. Never rely on a UI check for authorization.
- Telemetry is match-window only, consent-recorded, and retention-bounded. Do not widen collection.
- External stat adapters use documented endpoints with rate limiting and caching. No CAPTCHA bypass, no fingerprint spoofing, no identity rotation. If a source blocks, fall back to manual entry with a visible unverified badge.
