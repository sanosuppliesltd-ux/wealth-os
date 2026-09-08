/**
 * Presentation-only conversions between a persisted Profile and plain,
 * RSC-serializable strings — for populating the Settings form and for
 * read-only display elsewhere. Performs no calculation and no
 * validation (see ./profile-schema.ts for validation).
 */
import type { Profile } from "@/data/profile";
import { formatPaisaAsPlainRupees, formatPaisaAsRupees } from "@/lib/money";
import { calculateAgeYears } from "./profile-schema";
import type {
  ContributionReviewFrequency,
  MajorDeclineBehaviour,
} from "./profile-schema";

/**
 * Editable field values, keyed to match both the ProfileUpdateInput /
 * validation-error field names and each <input name="..."> in the
 * Settings form — so a validation error can be shown next to the
 * right field with no name-mapping step. The Rs amount fields hold a
 * plain rupee display string (e.g. "2,500,000"), not paisa.
 */
export interface ProfileFormValues {
  name: string;
  dateOfBirth: string;
  retirementTargetAge: string;
  retirementIncomeTargetPaisa: string;
  emergencyReserveTargetPaisa: string;
  monthlyContributionPaisa: string;
  startingCapitalPaisa: string;
  planningHorizonYears: string;
  shariahRequired: boolean;
  contributionReviewFrequency: ContributionReviewFrequency;
  majorDeclineBehaviour: MajorDeclineBehaviour;
}

/** "1990-05-20" (UTC-based, matches an HTML `<input type="date">`) or "". */
function toDateInputValue(date: Date | null): string {
  if (!date) return "";
  const year = date.getUTCFullYear().toString().padStart(4, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toPlainRupees(paisa: bigint | null): string {
  return paisa === null ? "" : formatPaisaAsPlainRupees(paisa);
}

/** Converts a persisted Profile into editable form field strings. */
export function toProfileFormValues(profile: Profile): ProfileFormValues {
  return {
    name: profile.name ?? "",
    dateOfBirth: toDateInputValue(profile.dateOfBirth),
    retirementTargetAge:
      profile.retirementTargetAge === null
        ? ""
        : String(profile.retirementTargetAge),
    retirementIncomeTargetPaisa: toPlainRupees(
      profile.retirementIncomeTargetPaisa,
    ),
    emergencyReserveTargetPaisa: toPlainRupees(
      profile.emergencyReserveTargetPaisa,
    ),
    monthlyContributionPaisa: toPlainRupees(profile.monthlyContributionPaisa),
    startingCapitalPaisa: toPlainRupees(profile.startingCapitalPaisa),
    planningHorizonYears:
      profile.planningHorizonYears === null
        ? ""
        : String(profile.planningHorizonYears),
    shariahRequired: profile.shariahRequired,
    contributionReviewFrequency:
      profile.contributionReviewFrequency as ContributionReviewFrequency,
    majorDeclineBehaviour:
      profile.majorDeclineBehaviour as MajorDeclineBehaviour,
  };
}

/** "Rs 2,500,000" if set, else the given fallback (default "Not set"). */
export function displayAmount(
  paisa: bigint | null,
  fallback = "Not set",
): string {
  return paisa === null ? fallback : formatPaisaAsRupees(paisa);
}

/** The stated integer value if set, else the given fallback. */
export function displayInteger(
  value: number | null,
  fallback = "Not set",
): string {
  return value === null ? fallback : String(value);
}

/** Current age in whole years from dateOfBirth, or null if not set. */
export function currentAgeYears(profile: Profile): number | null {
  return profile.dateOfBirth
    ? calculateAgeYears(profile.dateOfBirth, new Date())
    : null;
}

export const CONTRIBUTION_REVIEW_FREQUENCY_LABELS: Record<
  ContributionReviewFrequency,
  string
> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  "twice-per-year": "Twice a year",
  annually: "Annually",
};

export const MAJOR_DECLINE_BEHAVIOUR_LABELS: Record<
  MajorDeclineBehaviour,
  string
> = {
  "hold-or-buy-more": "Hold, or consider investing more",
  "hold-only": "Hold and wait it out",
};
