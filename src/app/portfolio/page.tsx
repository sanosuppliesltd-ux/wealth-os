import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { IconLink } from "@/components/icons";
import { DEMO_ALLOCATION } from "@/domain/demo-profile";
import { getProfile } from "@/domain/profile";
import { displayAmount } from "@/domain/profile-view";
import { formatPaisaAsRupees } from "@/lib/money";

export default async function PortfolioPage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <PageHeader title="Portfolio" description="Where is my money?" />

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
          Capital invested
        </p>
        <p className="mt-2 font-serif text-3xl text-forest-700">
          {displayAmount(profile.startingCapitalPaisa)}
        </p>
        <p className="mt-1 text-sm text-forest-400">
          Allocation of your starting capital
        </p>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">
          How your capital is divided
        </p>
        <p className="mt-1 text-xs text-forest-400">
          Illustrative demo allocation. Not linked to your stated starting
          capital yet — real holdings and allocation modelling arrive in a
          later phase.
        </p>

        <div className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-forest-50">
          {DEMO_ALLOCATION.map((slice) => (
            <div
              key={slice.name}
              className={slice.colorClassName}
              style={{ width: `${slice.percent}%` }}
            />
          ))}
        </div>

        <ul className="mt-5 divide-y divide-forest-100">
          {DEMO_ALLOCATION.map((slice) => (
            <li
              key={slice.name}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <span className="flex items-center gap-2.5 text-sm font-medium text-forest-700">
                <span className={`h-2.5 w-2.5 rounded-full ${slice.colorClassName}`} />
                {slice.name}
              </span>
              <span className="text-right">
                <span className="block text-sm font-semibold text-forest-700">
                  {formatPaisaAsRupees(slice.paisa)}
                </span>
                <span className="block text-xs text-forest-400">
                  {slice.percent}%
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Live holdings</p>
        <div className="mt-4 flex flex-col items-center gap-2 rounded-xl border border-dashed border-forest-100 px-6 py-10 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-700">
            <IconLink className="h-5 w-5" />
          </span>
          <p className="text-sm font-semibold text-forest-700">
            No live holdings connected yet
          </p>
          <p className="max-w-sm text-sm text-forest-400">
            Your real holdings and balances will appear here once your
            investments are linked. Not available in this prototype.
          </p>
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Performance</p>
        <p className="mt-2 text-sm text-forest-400">
          Investment performance is{" "}
          <span className="font-semibold text-forest-700">
            not calculated yet
          </span>
          . Returns will appear once your financial information is
          connected.
        </p>
      </Card>

      <DisclosureBanner>
        Allocations are illustrative demo data. Live holdings and performance
        arrive in a later phase.
      </DisclosureBanner>
    </div>
  );
}
