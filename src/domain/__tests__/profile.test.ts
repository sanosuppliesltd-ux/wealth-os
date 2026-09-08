import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Profile } from "@/data/profile";

const findProfile = vi.fn<() => Promise<Profile | null>>();
const createDemoProfile = vi.fn<() => Promise<Profile>>();
const updateProfileRow = vi.fn<(id: string, data: unknown) => Promise<Profile>>();

vi.mock("@/data/profile", () => ({
  findProfile: (...args: unknown[]) => findProfile(...(args as [])),
  createDemoProfile: (...args: unknown[]) => createDemoProfile(...(args as [])),
  updateProfileRow: (...args: unknown[]) =>
    updateProfileRow(...(args as [string, unknown])),
}));

const { getProfile, updateProfile, ProfileValidationError } = await import(
  "../profile"
);

function demoRow(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "profile-1",
    name: null,
    dateOfBirth: null,
    retirementTargetAge: 55,
    retirementIncomeTargetPaisa: 40_000_000n,
    emergencyReserveTargetPaisa: 100_000_000n,
    monthlyContributionPaisa: 7_500_000n,
    startingCapitalPaisa: 250_000_000n,
    planningHorizonYears: 15,
    shariahRequired: true,
    contributionReviewFrequency: "twice-per-year",
    majorDeclineBehaviour: "hold-or-buy-more",
    isDemoData: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z"),
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
    ...overrides,
  };
}

beforeEach(() => {
  findProfile.mockReset();
  createDemoProfile.mockReset();
  updateProfileRow.mockReset();
});

describe("getProfile", () => {
  it("returns demo defaults when no Profile exists", async () => {
    findProfile.mockResolvedValue(null);
    const seeded = demoRow();
    createDemoProfile.mockResolvedValue(seeded);

    const profile = await getProfile();

    expect(createDemoProfile).toHaveBeenCalledTimes(1);
    expect(profile).toEqual(seeded);
    expect(profile.isDemoData).toBe(true);
  });

  it("creates the seed Profile exactly once (idempotent)", async () => {
    let stored: Profile | null = null;
    findProfile.mockImplementation(async () => stored);
    createDemoProfile.mockImplementation(async () => {
      stored = demoRow();
      return stored;
    });

    const first = await getProfile();
    const second = await getProfile();

    expect(createDemoProfile).toHaveBeenCalledTimes(1);
    expect(first).toEqual(second);
  });

  it("returns the existing row without creating one when a Profile exists", async () => {
    const existing = demoRow({ id: "existing", name: "Bilal" });
    findProfile.mockResolvedValue(existing);

    const profile = await getProfile();

    expect(createDemoProfile).not.toHaveBeenCalled();
    expect(profile).toEqual(existing);
  });
});

describe("updateProfile", () => {
  it("accepts a valid full update and returns the updated row", async () => {
    findProfile.mockResolvedValue(demoRow());
    const updated = demoRow({ name: "Bilal", isDemoData: false });
    updateProfileRow.mockResolvedValue(updated);

    const result = await updateProfile({
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
    });

    expect(result).toEqual(updated);
    expect(updateProfileRow).toHaveBeenCalledWith(
      "profile-1",
      expect.objectContaining({ name: "Bilal" }),
    );
  });

  it("flips isDemoData to false when a value differs from the demo defaults", async () => {
    findProfile.mockResolvedValue(demoRow());
    updateProfileRow.mockResolvedValue(demoRow({ isDemoData: false }));

    await updateProfile({
      name: null,
      dateOfBirth: null,
      retirementTargetAge: 55,
      retirementIncomeTargetPaisa: 40_000_000n,
      emergencyReserveTargetPaisa: 100_000_000n,
      monthlyContributionPaisa: 7_500_000n,
      // Differs from the DEMO_PROFILE_DEFAULTS starting capital.
      startingCapitalPaisa: 300_000_000n,
      planningHorizonYears: 15,
      shariahRequired: true,
      contributionReviewFrequency: "twice-per-year",
      majorDeclineBehaviour: "hold-or-buy-more",
    });

    expect(updateProfileRow).toHaveBeenCalledWith(
      "profile-1",
      expect.objectContaining({ isDemoData: false }),
    );
  });

  it("keeps isDemoData true when the update matches the demo defaults exactly", async () => {
    findProfile.mockResolvedValue(demoRow());
    updateProfileRow.mockResolvedValue(demoRow());

    await updateProfile({
      name: null,
      dateOfBirth: null,
      retirementTargetAge: 55,
      retirementIncomeTargetPaisa: 40_000_000n,
      emergencyReserveTargetPaisa: 100_000_000n,
      monthlyContributionPaisa: 7_500_000n,
      startingCapitalPaisa: 250_000_000n,
      planningHorizonYears: 15,
      shariahRequired: true,
      contributionReviewFrequency: "twice-per-year",
      majorDeclineBehaviour: "hold-or-buy-more",
    });

    expect(updateProfileRow).toHaveBeenCalledWith(
      "profile-1",
      expect.objectContaining({ isDemoData: true }),
    );
  });

  it("rejects invalid input without writing anything", async () => {
    findProfile.mockResolvedValue(demoRow());

    await expect(
      updateProfile({
        name: null,
        dateOfBirth: null,
        retirementTargetAge: 55,
        retirementIncomeTargetPaisa: 40_000_000n,
        emergencyReserveTargetPaisa: 100_000_000n,
        monthlyContributionPaisa: 7_500_000n,
        startingCapitalPaisa: -100n,
        planningHorizonYears: 15,
        shariahRequired: true,
        contributionReviewFrequency: "twice-per-year",
        majorDeclineBehaviour: "hold-or-buy-more",
      }),
    ).rejects.toBeInstanceOf(ProfileValidationError);

    expect(updateProfileRow).not.toHaveBeenCalled();
  });
});
