import { describe, expect, it } from "vitest";
import {
  calculateAgeYears,
  parseProfileUpdateInput,
} from "../profile-schema";

/** A full, valid update — every field present, matching the demo shape. */
function validInput(overrides: Record<string, unknown> = {}) {
  return {
    name: "Bilal",
    dateOfBirth: null,
    retirementTargetAge: 55,
    retirementIncomeTargetPaisa: "400,000",
    emergencyReserveTargetPaisa: "1,000,000",
    monthlyContributionPaisa: "75,000",
    startingCapitalPaisa: "2,500,000",
    planningHorizonYears: 15,
    shariahRequired: true,
    contributionReviewFrequency: "twice-per-year",
    majorDeclineBehaviour: "hold-or-buy-more",
    ...overrides,
  };
}

function yearsAgo(years: number): Date {
  const now = new Date();
  return new Date(now.getFullYear() - years, now.getMonth(), now.getDate());
}

describe("calculateAgeYears", () => {
  it("counts a full year once the birthday has passed this year", () => {
    const dob = yearsAgo(30);
    expect(calculateAgeYears(dob, new Date())).toBe(30);
  });

  it("does not count the year until the birthday has passed", () => {
    const now = new Date();
    const dob = new Date(now.getFullYear() - 30, now.getMonth(), now.getDate() + 1);
    expect(calculateAgeYears(dob, now)).toBe(29);
  });
});

describe("parseProfileUpdateInput", () => {
  it("accepts a fully valid update", () => {
    const result = parseProfileUpdateInput(validInput());
    expect(result.success).toBe(true);
  });

  it("round-trips an Rs amount entered with commas into bigint paisa", () => {
    const result = parseProfileUpdateInput(
      validInput({ startingCapitalPaisa: "2,500,000" }),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.startingCapitalPaisa).toBe(250_000_000n);
    }
  });

  it("rejects a negative amount given as a string", () => {
    const result = parseProfileUpdateInput(
      validInput({ startingCapitalPaisa: "-100" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects a negative amount given directly as a bigint", () => {
    const result = parseProfileUpdateInput(
      validInput({ startingCapitalPaisa: -100n }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.startingCapitalPaisa).toMatch(/negative/i);
    }
  });

  it("rejects an amount above the Rs 1 billion sanity ceiling", () => {
    const result = parseProfileUpdateInput(
      validInput({ startingCapitalPaisa: "2,000,000,000" }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.startingCapitalPaisa).toMatch(/exceeds/i);
    }
  });

  it("rejects a non-numeric amount", () => {
    const result = parseProfileUpdateInput(
      validInput({ monthlyContributionPaisa: "not a number" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects a retirement target age under 30", () => {
    const result = parseProfileUpdateInput(
      validInput({ retirementTargetAge: 25, dateOfBirth: null }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.retirementTargetAge).toBeDefined();
    }
  });

  it("rejects a retirement target age over 90", () => {
    const result = parseProfileUpdateInput(
      validInput({ retirementTargetAge: 95 }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects a date of birth in the future", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const result = parseProfileUpdateInput(
      validInput({ dateOfBirth: tomorrow }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.dateOfBirth).toMatch(/future/i);
    }
  });

  it("rejects a date of birth that makes the user under 18", () => {
    const result = parseProfileUpdateInput(
      validInput({ dateOfBirth: yearsAgo(10) }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.dateOfBirth).toMatch(/18/);
    }
  });

  it("rejects a date of birth older than 100 years", () => {
    const result = parseProfileUpdateInput(
      validInput({ dateOfBirth: yearsAgo(105) }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects a retirement target age less than or equal to the current age", () => {
    const result = parseProfileUpdateInput(
      validInput({ dateOfBirth: yearsAgo(40), retirementTargetAge: 35 }),
    );
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.retirementTargetAge).toMatch(/current age/i);
    }
  });

  it("accepts a retirement target age strictly greater than the current age", () => {
    const result = parseProfileUpdateInput(
      validInput({ dateOfBirth: yearsAgo(40), retirementTargetAge: 55 }),
    );
    expect(result.success).toBe(true);
  });

  it("rejects an invalid contributionReviewFrequency value", () => {
    const result = parseProfileUpdateInput(
      validInput({ contributionReviewFrequency: "weekly" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects an invalid majorDeclineBehaviour value", () => {
    const result = parseProfileUpdateInput(
      validInput({ majorDeclineBehaviour: "sell-immediately" }),
    );
    expect(result.success).toBe(false);
  });

  it("rejects a planning horizon outside 1 to 60 years", () => {
    expect(
      parseProfileUpdateInput(validInput({ planningHorizonYears: 0 }))
        .success,
    ).toBe(false);
    expect(
      parseProfileUpdateInput(validInput({ planningHorizonYears: 61 }))
        .success,
    ).toBe(false);
  });

  it("treats blank optional fields as null rather than rejecting", () => {
    const result = parseProfileUpdateInput(
      validInput({
        name: "",
        dateOfBirth: "",
        retirementTargetAge: "",
        startingCapitalPaisa: "",
      }),
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBeNull();
      expect(result.data.dateOfBirth).toBeNull();
      expect(result.data.retirementTargetAge).toBeNull();
      expect(result.data.startingCapitalPaisa).toBeNull();
    }
  });
});
