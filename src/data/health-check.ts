import { prisma } from "./prisma";

/**
 * Proves the Prisma + SQLite data layer works end-to-end. Not part of
 * the Wealth OS domain model — a placeholder for future phases.
 */
export async function recordHealthCheck() {
  return prisma.healthCheck.create({ data: {} });
}
