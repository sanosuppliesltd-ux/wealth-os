import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { DefinitionRow } from "@/components/icon-row";
import { IconSparkle } from "@/components/icons";
import { DEMO_PROFILE } from "@/domain/demo-profile";
import { formatPaisaAsRupees } from "@/lib/money";

export default function WhatIfPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="What if?"
        description="See how changes to your plan could affect your future."
      />

      <Card>
        <p className="font-serif text-lg text-forest-700">Your plan inputs</p>
        <div className="mt-2 divide-y divide-forest-100">
          <DefinitionRow
            label="Monthly contribution"
            value={formatPaisaAsRupees(DEMO_PROFILE.monthlyContributionPaisa)}
          />
          <DefinitionRow label="Extra investment" value="Not entered" />
          <DefinitionRow
            label="Retirement age"
            value={String(DEMO_PROFILE.retirementTargetAge)}
          />
          <DefinitionRow
            label="Retirement income"
            value={`${formatPaisaAsRupees(
              DEMO_PROFILE.retirementIncomePaisaPerMonthTodaysValue,
            )} / month`}
          />
          <DefinitionRow label="Inflation" value="Not set" />
          <DefinitionRow label="Investment return" value="Not set" />
          <DefinitionRow label="Contribution increase" value="Not set" />
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
            <IconSparkle className="h-4 w-4" />
          </span>
          <div>
            <p className="font-serif text-lg text-forest-700">Your result</p>
            <p className="mt-1 text-xl font-semibold text-forest-700">
              Not calculated yet
            </p>
            <p className="mt-1 text-sm text-forest-400">
              The calculation engine will show how your choices could change
              your retirement outlook.
            </p>
          </div>
        </div>
      </Card>

      <DisclosureBanner>
        No calculations are performed in this prototype. Inputs shown are
        demo values.
      </DisclosureBanner>
    </div>
  );
}
