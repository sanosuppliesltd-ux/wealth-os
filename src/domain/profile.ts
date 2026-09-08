import {
  createDemoProfile,
  findProfile,
  updateProfileRow,
  type Profile,
} from "@/data/profile";
import { DEMO_PROFILE_DEFAULTS } from "./demo-profile";
import {
  parseProfileUpdateInput,
  type ProfileUpdateInput,
  type ProfileValidationErrors,
} from "./profile-schema";

export type { Profile };

/** Thrown by `updateProfile` when the input fails validation. */
export class ProfileValidationError extends Error {
  readonly errors: ProfileValidationErrors;

  constructor(errors: ProfileValidationErrors) {
    super("Profile validation failed");
    this.name = "ProfileValidationError";
    this.errors = errors;
  }
}

/**
 * Returns the single Profile row, creating it with demo defaults if
 * none exists yet. Single-user model: there is only ever one row.
 */
export async function getProfile(): Promise<Profile> {
  const existing = await findProfile();
  if (existing) return existing;
  return createDemoProfile();
}

function sameTime(a: Date | null, b: Date | null): boolean {
  if (a === null || b === null) return a === b;
  return a.getTime() === b.getTime();
}

/** True when every editable field in `input` matches the demo defaults. */
function matchesDemoDefaults(input: ProfileUpdateInput): boolean {
  return (
    input.name === DEMO_PROFILE_DEFAULTS.name &&
    sameTime(input.dateOfBirth, DEMO_PROFILE_DEFAULTS.dateOfBirth) &&
    input.retirementTargetAge === DEMO_PROFILE_DEFAULTS.retirementTargetAge &&
    input.retirementIncomeTargetPaisa ===
      DEMO_PROFILE_DEFAULTS.retirementIncomeTargetPaisa &&
    input.emergencyReserveTargetPaisa ===
      DEMO_PROFILE_DEFAULTS.emergencyReserveTargetPaisa &&
    input.monthlyContributionPaisa ===
      DEMO_PROFILE_DEFAULTS.monthlyContributionPaisa &&
    input.startingCapitalPaisa === DEMO_PROFILE_DEFAULTS.startingCapitalPaisa &&
    input.planningHorizonYears === DEMO_PROFILE_DEFAULTS.planningHorizonYears &&
    input.shariahRequired === DEMO_PROFILE_DEFAULTS.shariahRequired &&
    input.contributionReviewFrequency ===
      DEMO_PROFILE_DEFAULTS.contributionReviewFrequency &&
    input.majorDeclineBehaviour === DEMO_PROFILE_DEFAULTS.majorDeclineBehaviour
  );
}

/**
 * Validates `input` (raw form data or already-typed values — see
 * profile-schema.ts) and persists it as the new state of the single
 * Profile row. Flips `isDemoData` to false as soon as any field
 * differs from the demo defaults, and keeps it true when the update
 * exactly matches them. Throws `ProfileValidationError` on invalid
 * input; nothing is written in that case.
 */
export async function updateProfile(input: unknown): Promise<Profile> {
  const parsed = parseProfileUpdateInput(input);
  if (!parsed.success) {
    throw new ProfileValidationError(parsed.errors);
  }

  const current = await getProfile();
  const isDemoData = matchesDemoDefaults(parsed.data);

  return updateProfileRow(current.id, {
    name: parsed.data.name,
    dateOfBirth: parsed.data.dateOfBirth,
    retirementTargetAge: parsed.data.retirementTargetAge,
    retirementIncomeTargetPaisa: parsed.data.retirementIncomeTargetPaisa,
    emergencyReserveTargetPaisa: parsed.data.emergencyReserveTargetPaisa,
    monthlyContributionPaisa: parsed.data.monthlyContributionPaisa,
    startingCapitalPaisa: parsed.data.startingCapitalPaisa,
    planningHorizonYears: parsed.data.planningHorizonYears,
    shariahRequired: parsed.data.shariahRequired,
    contributionReviewFrequency: parsed.data.contributionReviewFrequency,
    majorDeclineBehaviour: parsed.data.majorDeclineBehaviour,
    isDemoData,
  });
}
