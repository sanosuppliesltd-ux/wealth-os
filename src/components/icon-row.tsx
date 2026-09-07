import type { ComponentType, SVGProps } from "react";

export function IconRow({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-semibold text-forest-700">{title}</p>
        <p className="mt-0.5 text-sm text-forest-400">{description}</p>
      </div>
    </div>
  );
}

export function DefinitionRow({
  label,
  value,
  caption,
}: {
  label: string;
  value: string;
  caption?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-forest-400">{label}</span>
      <span className="text-right">
        <span className="block text-sm font-semibold text-forest-700">
          {value}
        </span>
        {caption ? (
          <span className="block text-xs text-forest-400">{caption}</span>
        ) : null}
      </span>
    </div>
  );
}
