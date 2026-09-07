/**
 * Demo-only planning profile values for Phase 0 UI display.
 *
 * These are the approved Build 0.1 demo figures from the Master
 * Project Brief, section 3. They are NOT a real user profile, are not
 * persisted, and must never be used as inputs to real calculations.
 * A real financial profile model is future-phase work.
 */
export const DEMO_PROFILE = {
  startingCapitalPaisa: 250_000_000n,
  monthlyContributionPaisa: 7_500_000n,
  emergencyReserveTargetPaisa: 100_000_000n,
  retirementTargetAge: 55,
  retirementIncomePaisaPerMonthTodaysValue: 40_000_000n,
  planningHorizonYears: 15,
} as const;
