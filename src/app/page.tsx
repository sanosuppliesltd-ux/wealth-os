import { Card, StatCard } from "@/components/card";
import { AddInvestmentDemo } from "@/components/add-investment-demo";
import { DemoBanner } from "@/components/demo-banner";
import { getProfile } from "@/domain/profile";
import { displayAmount, displayInteger } from "@/domain/profile-view";
import { IconShield, IconPiggyBank, IconTarget, IconPlus, IconSparkle } from "@/components/icons";

export default async function HomePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-forest-700">Good morning</h1>
        <p className="mt-1 text-sm text-forest-400">
          A calm look at your wealth today.
        </p>
      </div>

      {profile.isDemoData ? <DemoBanner /> : null}

      {/* Main wealth card */}
      <Card className="bg-forest-700 text-cream">
        <div className="flex items-start justify-between">
          <p className="text-sm text-cream/70">Starting capital</p>
          {profile.isDemoData ? (
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-cream/90">
              Demo
            </span>
          ) : null}
        </div>
        <p className="mt-2 font-serif text-4xl">
          {displayAmount(profile.startingCapitalPaisa)}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-cream/20 pt-5">
          <div>
            <p className="text-sm text-cream/70">Monthly contribution</p>
            <p className="mt-1 text-lg font-semibold">
              {displayAmount(profile.monthlyContributionPaisa)}
            </p>
          </div>
          <div>
            <p className="text-sm text-cream/70">Emergency reserve target</p>
            <p className="mt-1 text-lg font-semibold">
              {displayAmount(profile.emergencyReserveTargetPaisa)}
            </p>
          </div>
        </div>
      </Card>

      {/* Supporting cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Emergency reserve"
          value={displayAmount(profile.emergencyReserveTargetPaisa)}
          caption="Target"
          icon={IconShield}
        />
        <StatCard
          label="Retirement age"
          value={displayInteger(profile.retirementTargetAge)}
          caption="Target age"
          icon={IconPiggyBank}
        />
        <StatCard
          label="Retirement income"
          value={displayAmount(profile.retirementIncomeTargetPaisa)}
          caption="Per month, today's value"
          icon={IconTarget}
        />
        <StatCard
          label="Monthly contribution"
          value={displayAmount(profile.monthlyContributionPaisa)}
          caption="Base amount"
          icon={IconPlus}
        />
      </div>

      {/* Retirement readiness placeholder */}
      <Card>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
            <IconSparkle className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
              Retirement readiness
            </p>
            <p className="mt-1 font-serif text-xl text-forest-700">
              Not calculated yet
            </p>
            <p className="mt-1 text-sm text-forest-400">
              Your retirement outlook will appear once your financial plan is
              connected.
            </p>
          </div>
        </div>
      </Card>

      {/* Extra-cash entry point */}
      <AddInvestmentDemo />
    </div>
  );
}
