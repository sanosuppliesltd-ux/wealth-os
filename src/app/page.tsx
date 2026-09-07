import { Card, StatCard } from "@/components/card";
import { DemoBadge } from "@/components/demo-badge";
import { AddInvestmentDemo } from "@/components/add-investment-demo";
import { DEMO_PROFILE } from "@/domain/demo-profile";
import { formatPaisaAsRupees } from "@/lib/money";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
            Demo • Prototype
          </p>
          <h1 className="mt-1 font-serif text-3xl text-forest-700">
            Your wealth
          </h1>
        </div>
        <DemoBadge />
      </div>

      {/* Main wealth card */}
      <Card className="bg-forest-700 text-cream">
        <p className="text-xs font-medium uppercase tracking-wide text-cream/70">
          Starting capital
        </p>
        <p className="mt-2 font-serif text-4xl">
          {formatPaisaAsRupees(DEMO_PROFILE.startingCapitalPaisa)}
        </p>
        <p className="mt-3 text-sm text-cream/70">
          Demo data only. Not financial advice.
        </p>
      </Card>

      {/* Supporting cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Emergency reserve"
          value={formatPaisaAsRupees(DEMO_PROFILE.emergencyReserveTargetPaisa)}
          caption="Target"
        />
        <StatCard
          label="Retirement age"
          value={String(DEMO_PROFILE.retirementTargetAge)}
          caption="Target age"
        />
        <StatCard
          label="Retirement income"
          value={formatPaisaAsRupees(
            DEMO_PROFILE.retirementIncomePaisaPerMonthTodaysValue,
          )}
          caption="Per month, today's value"
        />
        <StatCard
          label="Monthly contribution"
          value={formatPaisaAsRupees(DEMO_PROFILE.monthlyContributionPaisa)}
          caption="Base amount"
        />
      </div>

      {/* Retirement readiness placeholder */}
      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
          Retirement readiness
        </p>
        <p className="mt-2 font-serif text-2xl text-forest-700">
          Not calculated yet
        </p>
        <p className="mt-1 text-sm text-forest-400">
          Your retirement outlook will appear once your financial plan is
          connected.
        </p>
      </Card>

      {/* Extra-cash entry point */}
      <AddInvestmentDemo />
    </div>
  );
}
