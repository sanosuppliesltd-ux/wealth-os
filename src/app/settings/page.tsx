import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";

const SETTINGS_SECTIONS = [
  "Profile",
  "Security",
  "Notifications",
  "Investment preferences",
  "Shariah preferences",
  "Data sources",
  "Assumptions",
  "Export / import",
  "Privacy",
  "App preferences",
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your profile and preferences."
      />

      <Card>
        <ul className="divide-y divide-forest-100">
          {SETTINGS_SECTIONS.map((section) => (
            <li
              key={section}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <span className="text-sm text-forest-700">{section}</span>
              <span className="text-xs text-forest-400">Coming soon</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <p className="text-sm text-forest-400">
          No banking, investment-account, or payment credentials are ever
          requested or stored by Wealth OS.
        </p>
      </Card>
    </div>
  );
}
