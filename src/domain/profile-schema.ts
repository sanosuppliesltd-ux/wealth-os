/**
 * Validation rules for the financial profile (Phase 1, section 8).
 *
 * This module owns two things:
 * 1. The allowed enum values for `contributionReviewFrequency` and
 *    `majorDeclineBehaviour`.
 * 2. The zod schema (and derived `ProfileUpdateInput` type) used by
 *    both the Settings server action and the domain-layer tests.
 *
 * The schema accepts either raw form strings (as submitted by an HTML
 * form) or already-typed values (as passed directly in tests), and
 * parses both into the same typed, validated output. It performs no
 * persistence and no financial calculation — it only validates and
 * normalizes stated inputs.
 */
import { z } from "zod";

export const CONTRIBUTION_REVIEW_FREQUENCIES = [
  "monthly",
  "quarterly",
  "twice-per-year",
  "annually",
] as const;
export type ContributionReviewFrequency =
  (typeof CONTRIBUTION_REVIEW_FREQUENCIES)[number];

export const MAJOR_DECLINE_BEHAVIOURS = [
  "hold-or-buy-more",
  "hold-only",
] as const;
export type MajorDeclineBehaviour = (typeof MAJOR_DECLINE_BEHAVIOURS)[number];

/** Sanity ceiling for any Rs amount: Rs 1,000,000,000 in paisa. */
export const MAX_AMOUNT_PAISA = 100_000_000_000n;

const MIN_RETIREMENT_TARGET_AGE = 30;
const MAX_RETIREMENT_TARGET_AGE = 90;
const MIN_PLANNING_HORIZON_YEARS = 1;
const MAX_PLANNING_HORIZON_YEARS = 60;
const MIN_AGE_YEARS = 18;
const MAX_AGE_YEARS = 100;

/** Whole years between two dates, using calendar-aware subtraction. */
export function calculateAgeYears(dateOfBirth: Date, asOf: Date): number {
  let age = asOf.getFullYear() - dateOfBirth.getFullYear();
  const hasHadBirthdayThisYear =
    asOf.getMonth() > dateOfBirth.getMonth() ||
    (asOf.getMonth() === dateOfBirth.getMonth() &&
      asOf.getDate() >= dateOfBirth.getDate());
  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }
  return age;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

/** Trimmed optional string, `null` when blank/absent. Max length enforced. */
const optionalTrimmedString = (maxLength: number, fieldLabel: string) =>
  z.preprocess((value) => {
    if (value === undefined || value === null) return null;
    if (typeof value === "string") {
      const trimmed = value.trim();
      return trimmed === "" ? null : trimmed;
    }
    return value;
  }, z.string().max(maxLength, `${fieldLabel} must be at most ${maxLength} characters`).nullable());

/**
 * Optional date of birth. Accepts a `Date`, an ISO/`yyyy-mm-dd` string,
 * or blank/undefined (stored as `null`). Must be a valid past date and
 * imply an age between 18 and 100 inclusive.
 */
const dateOfBirthSchema = z.preprocess(
  (value) => {
    if (value === undefined || value === null || value === "") return null;
    if (value instanceof Date) return value;
    if (typeof value === "string") {
      const parsed = new Date(value);
      return parsed;
    }
    return value;
  },
  z
    .union([z.date(), z.null()])
    .superRefine((value, ctx) => {
      if (value === null) return;
      if (Number.isNaN(value.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid date of birth",
        });
        return;
      }
      const now = new Date();
      if (value.getTime() > now.getTime()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of birth cannot be in the future",
        });
        return;
      }
      const age = calculateAgeYears(value, now);
      if (age < MIN_AGE_YEARS) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You must be at least ${MIN_AGE_YEARS} years old`,
        });
      } else if (age > MAX_AGE_YEARS) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Date of birth must be within the last ${MAX_AGE_YEARS} years`,
        });
      }
    }),
);

/** Optional integer age, 30–90 inclusive, `null` when blank/absent. */
const retirementTargetAgeSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;
    return Number(trimmed);
  }
  return value;
}, z.union([z.number(), z.null()]).superRefine((value, ctx) => {
  if (value === null) return;
  if (!isFiniteNumber(value) || !Number.isInteger(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Retirement target age must be a whole number",
    });
    return;
  }
  if (
    value < MIN_RETIREMENT_TARGET_AGE ||
    value > MAX_RETIREMENT_TARGET_AGE
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Retirement target age must be between ${MIN_RETIREMENT_TARGET_AGE} and ${MAX_RETIREMENT_TARGET_AGE}`,
    });
  }
}));

/** Optional integer years, 1–60 inclusive, `null` when blank/absent. */
const planningHorizonYearsSchema = z.preprocess((value) => {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") return null;
    return Number(trimmed);
  }
  return value;
}, z.union([z.number(), z.null()]).superRefine((value, ctx) => {
  if (value === null) return;
  if (!isFiniteNumber(value) || !Number.isInteger(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Planning horizon must be a whole number of years",
    });
    return;
  }
  if (
    value < MIN_PLANNING_HORIZON_YEARS ||
    value > MAX_PLANNING_HORIZON_YEARS
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Planning horizon must be between ${MIN_PLANNING_HORIZON_YEARS} and ${MAX_PLANNING_HORIZON_YEARS} years`,
    });
  }
}));

/**
 * Optional Rs amount. Accepts a bigint (already paisa), a number
 * (rupees), or a string of digits with optional commas and up to two
 * decimal places (rupees). Stored as non-negative bigint paisa, capped
 * at MAX_AMOUNT_PAISA. Blank/absent input is stored as `null`.
 */
const rsAmountPaisaSchema = z.preprocess(
  (value) => {
    if (value === undefined || value === null || value === "") return null;
    return value;
  },
  z
    .union([z.bigint(), z.number(), z.string(), z.null()])
    .transform((value, ctx) => {
      if (value === null) return null;

      let paisa: bigint;
      if (typeof value === "bigint") {
        paisa = value;
      } else if (typeof value === "number") {
        if (!Number.isFinite(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Enter a valid amount",
          });
          return z.NEVER;
        }
        paisa = BigInt(Math.round(value * 100));
      } else {
        const cleaned = value.replace(/,/g, "").trim();
        if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Enter a valid amount (numbers only)",
          });
          return z.NEVER;
        }
        paisa = BigInt(Math.round(parseFloat(cleaned) * 100));
      }

      if (paisa < 0n) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Amount cannot be negative",
        });
        return z.NEVER;
      }
      if (paisa > MAX_AMOUNT_PAISA) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Amount exceeds the maximum allowed (Rs 1,000,000,000)",
        });
        return z.NEVER;
      }
      return paisa;
    }),
);

/** Boolean toggle. Accepts an actual boolean or an HTML checkbox value. */
const booleanFromCheckboxSchema = z.preprocess((value) => {
  if (typeof value === "boolean") return value;
  if (value === "true" || value === "on") return true;
  if (value === "false" || value === undefined || value === null)
    return false;
  return value;
}, z.boolean());

export const profileUpdateSchema = z
  .object({
    name: optionalTrimmedString(100, "Name"),
    dateOfBirth: dateOfBirthSchema,
    retirementTargetAge: retirementTargetAgeSchema,
    retirementIncomeTargetPaisa: rsAmountPaisaSchema,
    emergencyReserveTargetPaisa: rsAmountPaisaSchema,
    monthlyContributionPaisa: rsAmountPaisaSchema,
    startingCapitalPaisa: rsAmountPaisaSchema,
    planningHorizonYears: planningHorizonYearsSchema,
    shariahRequired: booleanFromCheckboxSchema,
    contributionReviewFrequency: z.enum(CONTRIBUTION_REVIEW_FREQUENCIES),
    majorDeclineBehaviour: z.enum(MAJOR_DECLINE_BEHAVIOURS),
  })
  .superRefine((data, ctx) => {
    if (data.dateOfBirth !== null && data.retirementTargetAge !== null) {
      const currentAge = calculateAgeYears(data.dateOfBirth, new Date());
      if (data.retirementTargetAge <= currentAge) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["retirementTargetAge"],
          message: "Retirement target age must be greater than your current age",
        });
      }
    }
  });

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

/** Field-level error messages keyed by ProfileUpdateInput field name. */
export type ProfileValidationErrors = Partial<
  Record<keyof ProfileUpdateInput | "form", string>
>;

/**
 * Parses raw input (form strings or typed values) and returns either
 * the validated ProfileUpdateInput or field-level error messages.
 */
export function parseProfileUpdateInput(
  raw: unknown,
):
  | { success: true; data: ProfileUpdateInput }
  | { success: false; errors: ProfileValidationErrors } {
  const result = profileUpdateSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ProfileValidationErrors = {};
  for (const issue of result.error.issues) {
    const key = (issue.path[0] as keyof ProfileUpdateInput | undefined) ?? "form";
    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }
  return { success: false, errors };
}
