import { PrismaClient } from "@prisma/client";

/**
 * Data access — the only module allowed to import PrismaClient.
 *
 * Domain, engine, and UI code must go through this module (or future
 * repository-style functions built on top of it) rather than
 * importing @prisma/client directly.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
