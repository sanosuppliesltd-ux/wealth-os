export function DemoBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-forest-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream ${className}`}
    >
      Demo
    </span>
  );
}
