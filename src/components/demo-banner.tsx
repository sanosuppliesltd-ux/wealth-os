import { IconSparkle } from "./icons";

/** Shown on Home while the Profile still holds only demo values. */
export function DemoBanner() {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <IconSparkle className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        Showing demo values. Update your plan in Settings to make this
        yours.
      </p>
    </div>
  );
}
