# Wealth OS

A private personal wealth-management and retirement-planning application.
Wealth OS tracks wealth, models retirement outcomes, monitors investments
and relevant economic conditions, and (in later phases) provides
explainable strategy suggestions — without ever inventing financial data
or letting AI perform financial calculations itself.

This is a product/engineering project, not personal financial advice.

## Current phase

**Phase 0 — Production Foundation.**

This phase establishes the production codebase structure only:

- The approved Build 0.1 visual direction (sidebar navigation, cream/
  dark-green theme, serif headings) reproduced in production code.
- All six screens (Home, Portfolio, My Plan, Retirement, What If?,
  Settings) exist, are navigable, and are responsive.
- A financial calculation engine module boundary with a single
  known-answer function (see [Financial Test Book](#financial-test-book)
  below).
- A Prisma + SQLite data layer boundary (proven with a placeholder
  model only).
- Placeholder module boundaries for external data integrations and the
  AI explanation layer.
- Test infrastructure (Vitest).

**Financial calculations, live data, retirement modelling, the
What-If simulator, external integrations, the strategy engine, and the
AI adviser are not implemented in this phase.** Every screen shows
demo data only, clearly labelled, and any number that would require a
real calculation shows "Not calculated yet" instead of being invented.

See the Master Project Brief for the full product specification and
phased roadmap.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript (strict mode)
- Tailwind CSS
- [Vitest](https://vitest.dev/) for testing
- [Prisma](https://www.prisma.io/) ORM with SQLite for local development
- Node.js 20+
- pnpm as the package manager

This stack is intentionally portable: no host-specific configuration
files or platform-only APIs are used anywhere in the codebase. The app
runs the same way on a local machine, a plain VPS, Vercel, Railway,
Render, or any other Node 20+ host.

## Architecture

```
src/
  app/            Next.js App Router pages (UI/presentation)
  components/     Shared UI components (sidebar, cards, icons, etc.)
  domain/         Plain TypeScript domain constants (e.g. demo profile)
  engine/         Deterministic financial calculation engine (pure
                  TypeScript, zero framework/UI/database imports)
  data/           Prisma client + data-access functions (only module
                  allowed to import @prisma/client)
  integrations/   Placeholder boundary for future external data
                  sources (Al Meezan, SBP, PSX, etc.) — no real
                  integrations exist yet
  ai/             Placeholder boundary for the future AI explanation
                  layer — no real AI integration exists yet
  lib/            Cross-cutting utilities not tied to a layer above
                  (e.g. currency display formatting)
prisma/
  schema.prisma   Data model (currently a placeholder HealthCheck model)
```

The financial calculation engine (`src/engine`) is the **only** place
in the codebase permitted to produce financial numbers. It has no
imports from Next.js, React, Prisma, or any UI code, and is fully
testable in isolation. All monetary values inside the engine are
represented as `bigint` **paisa** (1 rupee = 100 paisa) — never a
JavaScript `number`/float. Display formatting (e.g. "Rs 2,500,000") is
handled separately in `src/lib/money.ts`, purely for presentation.

The AI explanation layer must never become the source of numerical
truth — any number shown to the user must be traceable to the
deterministic engine, verified external data, or explicit user input,
never to an LLM computation.

## Financial Test Book

Permanent known-answer tests live alongside the engine
(`src/engine/__tests__`). Phase 0 implements Test 001:

| Test | Input | Expected output |
| --- | --- | --- |
| 001 — Zero return | Starting capital Rs 2,500,000 + 12 monthly contributions of Rs 75,000 at 0% return | Rs 3,400,000 |

Further tests (contribution consistency, inflation, one-off
contributions, determinism, edge cases) will be added as the engine
grows in later phases.

## Getting started

Requires Node.js 20+ and [pnpm](https://pnpm.io/).

```bash
pnpm install
cp .env.example .env
pnpm prisma:migrate   # creates the local SQLite database
pnpm dev              # starts the app at http://localhost:3000
```

Other scripts:

```bash
pnpm test        # run the test suite (vitest run)
pnpm typecheck    # TypeScript strict typecheck, no emit
pnpm lint         # ESLint
pnpm build        # production build
pnpm start        # run the production build locally
```

## Environment variables

See [`.env.example`](./.env.example) for the full list. In short:

- `DATABASE_URL` — SQLite connection string for Prisma (local
  development only in this phase).
- `NEXT_PUBLIC_APP_URL` — base URL the app is served from.
- `NODE_ENV` — standard Node environment flag.

No API keys, external data source credentials, or AI provider keys
exist in this phase — none are used yet. Never commit a real `.env`
file; only `.env.example` (placeholder values) is tracked in git.

## Deploying

The app has no host-specific configuration and runs the same way on:

- **A generic Node 20+ VPS or server**: `pnpm install && pnpm build && pnpm start`,
  with environment variables set via your process manager or shell
  environment, behind a reverse proxy of your choice.
- **Vercel**: import the repository; it builds and runs as a standard
  Next.js app with no custom configuration required.
- **Railway**: deploy from the repository; set `DATABASE_URL` (and any
  future environment variables) in the service's environment settings.
- **Render**: deploy as a Node web service with `pnpm build` as the
  build command and `pnpm start` as the start command.

For anything beyond local development, replace the SQLite database
with a production-grade database and update `DATABASE_URL` and the
Prisma datasource provider accordingly — this is future-phase work.

## Known limitations (Phase 0)

- No real financial calculations beyond the single known-answer engine
  function used for testing.
- No live/external data (Al Meezan, SBP, PSX, or any other source).
- No AI adviser or LLM integration of any kind.
- No authentication, no real user accounts, no persisted user data —
  the Prisma/SQLite layer exists only to prove the data-access
  boundary works end-to-end.
- Settings toggles, "Add investment", "Download/Delete my data", and
  "Log out" are visual demo interactions only; nothing is persisted or
  executed.
- The Portfolio screen's allocation breakdown is a fixed, illustrative
  demo split of the known demo starting capital, not real holdings,
  NAVs, or performance data.
