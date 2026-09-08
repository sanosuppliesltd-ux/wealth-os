-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "dateOfBirth" DATETIME,
    "retirementTargetAge" INTEGER,
    "retirementIncomeTargetPaisa" BIGINT,
    "emergencyReserveTargetPaisa" BIGINT,
    "monthlyContributionPaisa" BIGINT,
    "startingCapitalPaisa" BIGINT,
    "planningHorizonYears" INTEGER,
    "shariahRequired" BOOLEAN NOT NULL DEFAULT true,
    "contributionReviewFrequency" TEXT NOT NULL DEFAULT 'twice-per-year',
    "majorDeclineBehaviour" TEXT NOT NULL DEFAULT 'hold-or-buy-more',
    "isDemoData" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
