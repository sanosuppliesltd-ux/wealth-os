import { Prisma, type Profile } from "@prisma/client";
import { prisma } from "./prisma";
import { DEMO_PROFILE_DEFAULTS } from "@/domain/demo-profile";

export type { Profile };

/**
 * Raw Prisma access for the single Profile row. Only this module (plus
 * ./prisma.ts) is allowed to import from `@prisma/client` or use the
 * Prisma client directly — the domain layer (src/domain/profile.ts)
 * goes through these functions instead.
 *
 * The one-and-only Profile row always uses this fixed id. Next.js can
 * render several pages (and the root layout) concurrently — e.g. while
 * statically generating all routes at build time — so two `getProfile`
 * calls can race to create the seed row at the same instant. Using a
 * fixed id turns the table's own primary-key constraint into the
 * single source of truth for "only one row ever exists": the losing
 * concurrent insert fails with a unique-constraint error instead of
 * silently creating a duplicate, and `createDemoProfile` below catches
 * that and returns the winner's row.
 */
const SINGLETON_PROFILE_ID = "profile-singleton";

function isUniqueConstraintViolation(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

/** Returns the single Profile row, or null if none exists yet. */
export async function findProfile(): Promise<Profile | null> {
  return prisma.profile.findUnique({ where: { id: SINGLETON_PROFILE_ID } });
}

/**
 * Creates the one-and-only Profile row, seeded with demo defaults. Safe
 * to call concurrently: if another call wins the race, this returns
 * that row instead of throwing or creating a duplicate.
 */
export async function createDemoProfile(): Promise<Profile> {
  try {
    return await prisma.profile.create({
      data: {
        id: SINGLETON_PROFILE_ID,
        ...DEMO_PROFILE_DEFAULTS,
        isDemoData: true,
      },
    });
  } catch (error) {
    if (isUniqueConstraintViolation(error)) {
      const existing = await findProfile();
      if (existing) return existing;
    }
    throw error;
  }
}

export interface ProfileRowUpdate {
  name: string | null;
  dateOfBirth: Date | null;
  retirementTargetAge: number | null;
  retirementIncomeTargetPaisa: bigint | null;
  emergencyReserveTargetPaisa: bigint | null;
  monthlyContributionPaisa: bigint | null;
  startingCapitalPaisa: bigint | null;
  planningHorizonYears: number | null;
  shariahRequired: boolean;
  contributionReviewFrequency: string;
  majorDeclineBehaviour: string;
  isDemoData: boolean;
}

/** Replaces the editable fields of the Profile row with `id`. */
export async function updateProfileRow(
  id: string,
  data: ProfileRowUpdate,
): Promise<Profile> {
  return prisma.profile.update({ where: { id }, data });
}
