import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";

const LEVERS = [
  "Monthly contribution",
  "One-off investment",
  "Retirement age",
  "Inflation assumption",
  "Investment return assumption",
  "Retirement income target",
];

export default function WhatIfPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="What If?"
        description="Explore how changes to your plan might affect your outlook."
      />

      <Card>
        <p className="text-sm text-forest-400">
          The What-If simulator is future-phase functionality. Once the
          financial calculation engine exists, you will be able to adjust
          the levers below and see deterministic, explainable results —
          never an AI guess.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {LEVERS.map((lever) => (
          <Card key={lever}>
            <p className="text-sm font-medium text-forest-700">{lever}</p>
            <p className="mt-1 text-xs text-forest-400">Not available yet</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
