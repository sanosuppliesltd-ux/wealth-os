import type {
  ContributionReviewFrequency,
  MajorDeclineBehaviour,
} from "./profile-schema";

/**
 * The single source of truth for the demo Profile seed values (Phase
 * 1, section 4). Used both to seed the one-and-only Profile row when
 * none exists yet, and to detect whether a saved Profile still matches
 * the demo defaults (see `isDemoData` handling in `./profile.ts`).
 *
 * These are the approved Build 0.1 demo figures from the Master
 * Project Brief. They are not a real user's data.
 */
export const DEMO_PROFILE_DEFAULTS = {
  name: null as string | null,
  dateOfBirth: null as Date | null,
  retirementTargetAge: 55,
  retirementIncomeTargetPaisa: 40_000_000n,
  emergencyReserveTargetPaisa: 100_000_000n,
  monthlyContributionPaisa: 7_500_000n,
  startingCapitalPaisa: 250_000_000n,
  planningHorizonYears: 15,
  shariahRequired: true,
  contributionReviewFrequency: "twice-per-year" satisfies ContributionReviewFrequency,
  majorDeclineBehaviour: "hold-or-buy-more" satisfies MajorDeclineBehaviour,
} as const;

/**
 * Illustrative demo allocation split of the starting capital, for
 * Portfolio screen layout purposes only. This is a fixed, literal
 * split of the known demo starting capital — not a calculation, not a
 * real holding, and not investment performance. Percentages sum to
 * 100% and paisa amounts sum exactly to
 * DEMO_PROFILE_DEFAULTS.startingCapitalPaisa. It intentionally does
 * not recompute against an edited starting capital — allocation
 * modelling is future-phase work.
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
