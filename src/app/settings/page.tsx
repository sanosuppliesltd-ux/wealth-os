import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";
import { DisclosureBanner } from "@/components/disclosure-banner";
import { DefinitionRow } from "@/components/icon-row";
import { Toggle } from "@/components/toggle";
import { IconUser, IconShield } from "@/components/icons";
import {
  DEMO_PROFILE,
  DEMO_INVESTMENT_PREFERENCES,
  DEMO_NOTIFICATIONS,
} from "@/domain/demo-profile";
import { formatPaisaAsRupees } from "@/lib/money";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Preferences and app information."
      />

      <Card>
        <p className="font-serif text-lg text-forest-700">Profile</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
            <IconUser className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-forest-700">You</p>
            <p className="text-sm text-forest-400">you@wealthos.demo</p>
          </div>
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">
          Investment preferences
        </p>
        <div className="mt-4 space-y-4">
          {DEMO_INVESTMENT_PREFERENCES.map((pref) => (
            <div key={pref.key} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-forest-700">
                  {pref.title}
                </p>
                <p className="text-sm text-forest-400">{pref.description}</p>
              </div>
              <Toggle defaultEnabled={pref.enabled} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Retirement plan</p>
        <div className="mt-2 divide-y divide-forest-100">
          <DefinitionRow
            label="Retirement age"
            value={String(DEMO_PROFILE.retirementTargetAge)}
          />
          <DefinitionRow
            label="Retirement income"
            value={`${formatPaisaAsRupees(
              DEMO_PROFILE.retirementIncomePaisaPerMonthTodaysValue,
            )} / month`}
            caption="Today's value"
          />
          <DefinitionRow
            label="Investment horizon"
            value={`${DEMO_PROFILE.planningHorizonYears} years`}
          />
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Notifications</p>
        <div className="mt-4 space-y-4">
          {DEMO_NOTIFICATIONS.map((notification) => (
            <div
              key={notification.key}
              className="flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-semibold text-forest-700">
                  {notification.title}
                </p>
                <p className="text-sm text-forest-400">
                  {notification.description}
                </p>
              </div>
              <Toggle defaultEnabled={notification.enabled} />
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Data &amp; privacy</p>
        <div className="mt-4 flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
            <IconShield className="h-4 w-4" />
          </span>
          <p className="text-sm text-forest-400">
            Your information stays private to you. No banking connections or
            external accounts are enabled in this prototype.
          </p>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            className="rounded-full border border-forest-100 px-4 py-2.5 text-sm font-medium text-forest-700 transition-colors hover:bg-forest-50"
          >
            Download my data
          </button>
          <button
            type="button"
            className="rounded-full border border-forest-100 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            Delete my data
          </button>
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">About</p>
        <div className="mt-2 divide-y divide-forest-100">
          <DefinitionRow label="App" value="Wealth OS" />
          <DefinitionRow label="Version" value="Build 0.1 (Prototype)" />
          <DefinitionRow label="Status" value="Prototype" />
        </div>
      </Card>

      <button
        type="button"
        className="w-full rounded-full border border-forest-100 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        Log out
      </button>

      <DisclosureBanner>
        Wealth OS is a prototype. All data is illustrative and not financial
        advice.
      </DisclosureBanner>
    </div>
  );
}
