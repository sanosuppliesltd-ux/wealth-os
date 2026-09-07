/**
 * Financial calculation engine — Phase 0.
 *
 * Pure, deterministic, framework-free. See ./README.md for scope and
 * the paisa/bigint convention. Do not import this module's internals
 * from UI code without going through this file's exported functions.
 */

export interface ZeroReturnProjectionInput {
  /** Starting capital, in bigint paisa (1 rupee = 100 paisa). */
  startingCapitalPaisa: bigint;
  /** Fixed monthly contribution, in bigint paisa. */
  monthlyContributionPaisa: bigint;
  /** Number of monthly contributions to apply. Must be a non-negative integer. */
  months: number;
}

/**
 * Projects a total balance after a fixed number of equal monthly
 * contributions, assuming a 0% rate of return.
 *
 * This is deliberately the simplest possible case: it exists to prove
 * the engine boundary (pure function, bigint paisa, no I/O) and to
 * satisfy the Financial Test Book's Test 001 (zero return). It does
 * NOT model investment growth, inflation, or any other future-phase
 * concept.
 */
export function projectZeroReturnTotalPaisa(
  input: ZeroReturnProjectionInput,
): bigint {
  const { startingCapitalPaisa, monthlyContributionPaisa, months } = input;

  if (!Number.isInteger(months) || months < 0) {
    throw new Error("months must be a non-negative integer");
  }
  if (startingCapitalPaisa < 0n) {
    throw new Error("startingCapitalPaisa must not be negative");
  }
  if (monthlyContributionPaisa < 0n) {
    throw new Error("monthlyContributionPaisa must not be negative");
  }

  return startingCapitalPaisa + monthlyContributionPaisa * BigInt(months);
}
