import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { DefinitionRow, IconRow } from "@/components/icon-row";
import { IconTrendingDown, IconWallet, IconSparkle } from "@/components/icons";
import { DEMO_PROFILE } from "@/domain/demo-profile";
import { formatPaisaAsRupees } from "@/lib/money";

export default function MyPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Plan"
        description="Your personal financial plan, in plain language."
      />

      <Card>
        <p className="font-serif text-lg text-forest-700">
          Your starting point
        </p>
        <div className="mt-2 divide-y divide-forest-100">
          <DefinitionRow
            label="Starting capital"
            value={formatPaisaAsRupees(DEMO_PROFILE.startingCapitalPaisa)}
          />
          <DefinitionRow
            label="Monthly contribution"
            value={formatPaisaAsRupees(DEMO_PROFILE.monthlyContributionPaisa)}
          />
          <DefinitionRow
            label="Retirement target age"
            value={String(DEMO_PROFILE.retirementTargetAge)}
          />
          <DefinitionRow
            label="Desired retirement income"
            value={`${formatPaisaAsRupees(
              DEMO_PROFILE.retirementIncomePaisaPerMonthTodaysValue,
            )} / month`}
            caption="Today's value"
          />
          <DefinitionRow
            label="Emergency reserve target"
            value={formatPaisaAsRupees(
              DEMO_PROFILE.emergencyReserveTargetPaisa,
            )}
          />
          <DefinitionRow
            label="Investment horizon"
            value={`${DEMO_PROFILE.planningHorizonYears} years`}
          />
          <DefinitionRow label="Current age" value="Not provided yet" />
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">How you invest</p>
        <div className="mt-4 space-y-4">
          <IconRow
            icon={IconTrendingDown}
            title="Market behaviour"
            description="Prefer to stay invested during major declines and consider investing more."
          />
          <IconRow
            icon={IconWallet}
            title="Extra cash"
            description="Invest additional surplus whenever available."
          />
          <IconRow
            icon={IconSparkle}
            title="Shariah preference"
            description="Shariah-compliant investments only"
          />
        </div>
      </Card>

      <DisclosureBanner>
        This is your stated plan, not a projection. A verified calculation
        engine will be added in a later phase. Years-to-retirement cannot be
        calculated until your current age is known — it will never be
        inferred.
      </DisclosureBanner>
    </div>
  );
}
