import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";

export default function RetirementPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Retirement"
        description="Can I retire at my target age while maintaining my desired lifestyle?"
      />

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
          Retirement readiness
        </p>
        <p className="mt-2 font-serif text-2xl text-forest-700">
          Not calculated yet
        </p>
        <p className="mt-1 text-sm text-forest-400">
          This will be produced by the deterministic financial engine
          once your plan and portfolio are connected — never estimated
          by AI.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {["Difficult", "Expected", "Strong"].map((scenario) => (
          <Card key={scenario}>
            <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
              {scenario} scenario
            </p>
            <p className="mt-2 font-serif text-xl text-forest-700">
              Not calculated yet
            </p>
          </Card>
        ))}
      </div>

      <Card>
        <p className="text-sm text-forest-400">
          Projected wealth, required retirement capital, and shortfall or
          surplus figures are future-phase functionality. Nothing here is
          fabricated in the meantime.
        </p>
      </Card>
    </div>
  );
}
