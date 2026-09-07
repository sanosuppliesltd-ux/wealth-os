import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const hasBackgroundOverride = /(?:^|\s)bg-/.test(className);

  return (
    <div
      className={`rounded-card border border-forest-100 p-5 shadow-sm ${
        hasBackgroundOverride ? "" : "bg-white/70"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption?: string;
}) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
        {label}
      </p>
      <p className="mt-2 font-serif text-2xl text-forest-700">{value}</p>
      {caption ? (
        <p className="mt-1 text-xs text-forest-400">{caption}</p>
      ) : null}
    </Card>
  );
}
