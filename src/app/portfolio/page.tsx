import { Card } from "@/components/card";
import { PageHeader } from "@/components/page-header";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio"
        description="Where your money is held, once your accounts are connected."
      />

      <Card>
        <p className="font-serif text-xl text-forest-700">
          No holdings connected yet
        </p>
        <p className="mt-2 text-sm text-forest-400">
          Individual funds, providers, allocations and gains/losses will
          appear here once your portfolio is tracked. Nothing is
          fabricated in the meantime — figures will only show once they
          can be verified.
        </p>
      </Card>

      <Card>
        <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
          Total portfolio value
        </p>
        <p className="mt-2 font-serif text-2xl text-forest-700">
          Not calculated yet
        </p>
      </Card>
    </div>
  );
}
