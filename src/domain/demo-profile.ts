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

/**
 * Illustrative demo allocation split of the starting capital, for
 * Portfolio screen layout purposes only. This is a fixed, literal
 * split of the known demo starting capital — not a calculation, not a
 * real holding, and not investment performance. Percentages sum to
 * 100% and paisa amounts sum exactly to DEMO_PROFILE.startingCapitalPaisa.
 */
export const DEMO_ALLOCATION = [
  {
    name: "Pakistan Equities",
    paisa: 87_500_000n,
    percent: 35,
    colorClassName: "bg-forest-700",
  },
  {
    name: "Government Bonds",
    paisa: 62_500_000n,
    percent: 25,
    colorClassName: "bg-sky-600",
  },
  {
    name: "Equity Mutual Funds",
    paisa: 50_000_000n,
    percent: 20,
    colorClassName: "bg-amber-600",
  },
  {
    name: "Money Market Funds",
    paisa: 25_000_000n,
    percent: 10,
    colorClassName: "bg-purple-400",
  },
  {
    name: "Gold",
    paisa: 12_500_000n,
    percent: 5,
    colorClassName: "bg-yellow-500",
  },
  {
    name: "Cash Reserve",
    paisa: 12_500_000n,
    percent: 5,
    colorClassName: "bg-gray-400",
  },
] as const;

/** Demo-only investment preference toggles for the Settings screen. */
export const DEMO_INVESTMENT_PREFERENCES = [
  {
    key: "shariah",
    title: "Shariah-compliant investments only",
    description: "Only show Shariah-compliant options",
    enabled: true,
  },
  {
    key: "hold-through-declines",
    title: "Stay invested during market declines",
    description: "Prefer holding rather than selling",
    enabled: true,
  },
] as const;

/** Demo-only notification toggles for the Settings screen. */
export const DEMO_NOTIFICATIONS = [
  {
    key: "contribution-reminder",
    title: "Monthly contribution reminder",
    description: "A gentle nudge to invest each month",
    enabled: true,
  },
  {
    key: "plan-summaries",
    title: "Plan update summaries",
    description: "Occasional notes about your plan",
    enabled: false,
  },
] as const;
