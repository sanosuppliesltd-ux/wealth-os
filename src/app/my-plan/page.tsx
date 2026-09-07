import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { DEMO_PROFILE } from "@/domain/demo-profile";
import { formatPaisaAsRupees } from "@/lib/money";

const PLAN_ITEMS: Array<{ label: string; value: string }> = [
  {
    label: "Retirement target age",
    value: String(DEMO_PROFILE.retirementTargetAge),
  },
  {
    label: "Desired retirement income",
    value: `${formatPaisaAsRupees(
      DEMO_PROFILE.retirementIncomePaisaPerMonthTodaysValue,
    )}/month, today's value`,
  },
  {
    label: "Emergency reserve target",
    value: formatPaisaAsRupees(DEMO_PROFILE.emergencyReserveTargetPaisa),
  },
  {
    label: "Base monthly contribution",
    value: formatPaisaAsRupees(DEMO_PROFILE.monthlyContributionPaisa),
  },
  {
    label: "Planning horizon",
    value: `${DEMO_PROFILE.planningHorizonYears} years`,
  },
  {
    label: "Shariah requirement",
    value: "Halal / Shariah-compliant investments only",
  },
];

export default function MyPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Plan"
        description="Your planning profile. These are demo values — a real profile is set up in a future phase."
      />

      <Card>
        <dl className="divide-y divide-forest-100">
          {PLAN_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <dt className="text-sm text-forest-400">{item.label}</dt>
              <dd className="text-sm font-medium text-forest-700">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
          Current age
        </p>
        <p className="mt-2 font-serif text-xl text-forest-700">
          Not provided yet
        </p>
        <p className="mt-1 text-sm text-forest-400">
          Years-to-retirement cannot be calculated until your current age
          is known. It will never be inferred.
        </p>
      </Card>
    </div>
  );
}
