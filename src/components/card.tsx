import type { ComponentType, ReactNode, SVGProps } from "react";

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
      className={`rounded-card border border-forest-100 p-6 shadow-sm ${
        hasBackgroundOverride ? "" : "bg-white"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function IconBadge({
  icon: Icon,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
      <Icon className="h-4 w-4" />
    </span>
  );
}

export function StatCard({
  label,
  value,
  caption,
  icon,
}: {
  label: string;
  value: string;
  caption?: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-forest-400">
          {label}
        </p>
        {icon ? <IconBadge icon={icon} /> : null}
      </div>
      <p className="mt-3 font-serif text-2xl text-forest-700">{value}</p>
      {caption ? (
        <p className="mt-1 text-xs text-forest-400">{caption}</p>
      ) : null}
    </Card>
  );
}

export { IconBadge };
