import Link from "next/link";
import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { DefinitionRow, IconRow } from "@/components/icon-row";
import { IconTrendingDown, IconWallet, IconSparkle } from "@/components/icons";
import { getProfile } from "@/domain/profile";
import {
  CONTRIBUTION_REVIEW_FREQUENCY_LABELS,
  MAJOR_DECLINE_BEHAVIOUR_LABELS,
  currentAgeYears,
  displayAmount,
  displayInteger,
} from "@/domain/profile-view";

export default async function MyPlanPage() {
  const profile = await getProfile();
  const age = currentAgeYears(profile);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Plan"
        description="Your personal financial plan, in plain language."
      />

      <Card>
        <div className="flex items-center justify-between">
          <p className="font-serif text-lg text-forest-700">
            Your starting point
          </p>
          <Link
            href="/settings"
            className="text-sm font-medium text-forest-600 hover:underline"
          >
            Edit in Settings
          </Link>
        </div>
        <div className="mt-2 divide-y divide-forest-100">
          <DefinitionRow
            label="Name"
            value={profile.name ?? "Not provided yet"}
          />
          <DefinitionRow
            label="Current age"
            value={age === null ? "Not provided yet" : String(age)}
          />
          <DefinitionRow
            label="Starting capital"
            value={displayAmount(profile.startingCapitalPaisa)}
          />
          <DefinitionRow
            label="Monthly contribution"
            value={displayAmount(profile.monthlyContributionPaisa)}
          />
          <DefinitionRow
            label="Retirement target age"
            value={displayInteger(profile.retirementTargetAge)}
          />
          <DefinitionRow
            label="Desired retirement income"
            value={
              profile.retirementIncomeTargetPaisa === null
                ? "Not set"
                : `${displayAmount(profile.retirementIncomeTargetPaisa)} / month`
            }
            caption="Today's value"
          />
          <DefinitionRow
            label="Emergency reserve target"
            value={displayAmount(profile.emergencyReserveTargetPaisa)}
          />
          <DefinitionRow
            label="Planning horizon"
            value={
              profile.planningHorizonYears === null
                ? "Not set"
                : `${profile.planningHorizonYears} years`
            }
          />
          <DefinitionRow
            label="Contribution review frequency"
            value={
              CONTRIBUTION_REVIEW_FREQUENCY_LABELS[
                profile.contributionReviewFrequency as keyof typeof CONTRIBUTION_REVIEW_FREQUENCY_LABELS
              ] ?? profile.contributionReviewFrequency
            }
          />
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">How you invest</p>
        <div className="mt-4 space-y-4">
          <IconRow
            icon={IconTrendingDown}
            title="Market behaviour"
            description={
              MAJOR_DECLINE_BEHAVIOUR_LABELS[
                profile.majorDeclineBehaviour as keyof typeof MAJOR_DECLINE_BEHAVIOUR_LABELS
              ] ?? profile.majorDeclineBehaviour
            }
          />
          <IconRow
            icon={IconWallet}
            title="Extra cash"
            description="Invest additional surplus whenever available."
          />
          <IconRow
            icon={IconSparkle}
            title="Shariah preference"
            description={
              profile.shariahRequired
                ? "Shariah-compliant investments only"
                : "No Shariah restriction set"
            }
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
