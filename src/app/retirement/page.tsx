import { Card, StatCard } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { IconPiggyBank, IconTarget, IconSparkle } from "@/components/icons";
import { DEMO_PROFILE } from "@/domain/demo-profile";
import { formatPaisaAsRupees } from "@/lib/money";

const SCENARIOS = [
  { name: "Difficult", className: "bg-forest-50 text-forest-700" },
  { name: "Expected", className: "bg-forest-100/70 text-forest-700" },
  { name: "Strong", className: "bg-forest-700 text-cream" },
] as const;

export default function RetirementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Your retirement"
        description={`Can I retire around ${DEMO_PROFILE.retirementTargetAge} and maintain my desired lifestyle?`}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Retirement age"
          value={String(DEMO_PROFILE.retirementTargetAge)}
          caption="Target age"
          icon={IconPiggyBank}
        />
        <StatCard
          label="Retirement income"
          value={formatPaisaAsRupees(
            DEMO_PROFILE.retirementIncomePaisaPerMonthTodaysValue,
          )}
          caption="Per month, today's value"
          icon={IconTarget}
        />
      </div>

      <Card>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
            <IconSparkle className="h-4 w-4" />
          </span>
          <div>
            <p className="font-serif text-lg text-forest-700">
              Retirement readiness
            </p>
            <p className="mt-1 text-xl font-semibold text-forest-700">
              Not calculated yet
            </p>
            <p className="mt-1 text-sm text-forest-400">
              We&rsquo;ll compare your current plan with your retirement goal
              once your financial information is connected.
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">
          Possible outcomes
        </p>
        <p className="mt-1 text-sm text-forest-400">
          A preview of the scenarios we&rsquo;ll model for you once your plan
          is connected.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {SCENARIOS.map((scenario) => (
            <div
              key={scenario.name}
              className={`rounded-xl px-4 py-4 ${scenario.className}`}
            >
              <p className="text-sm font-semibold">{scenario.name}</p>
              <p className="mt-1 text-sm opacity-80">Not calculated yet</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
