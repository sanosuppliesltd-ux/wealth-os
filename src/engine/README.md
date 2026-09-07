# Financial Calculation Engine

This module is the **only** place in the codebase permitted to produce
financial numbers. It is a pure TypeScript module with:

- no imports from Next.js, React, Prisma, or any UI code
- no I/O (no network, no filesystem, no database)
- no framework dependencies
- fully deterministic functions (same input → same output, always)

All monetary values are represented as `bigint` **paisa** (1 rupee = 100
paisa). Never use `number`/float for money here.

## Phase 0 scope

Phase 0 implements exactly one function, `projectZeroReturnTotalPaisa`,
which sums a starting capital and a fixed number of equal monthly
contributions assuming 0% return. This exists solely to prove the
engine boundary and the paisa/bigint convention with a known-answer
test (see `__tests__/projection.test.ts`).

Everything else — compounding growth, inflation adjustment, one-off
contributions, withdrawals, retirement-capital requirements, scenario
modelling, contribution-increase rules, portfolio allocation — is
**future phase work** and is intentionally not implemented yet. Do not
add it here without an explicit phase instruction.

## Critical rule

The AI layer must never become the source of numerical truth. Any
number shown to the user must be traceable to a function in this
module (or a future extension of it), never to an LLM computation.
