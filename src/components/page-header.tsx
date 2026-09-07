import { DemoBadge } from "./demo-badge";

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-serif text-3xl text-forest-700">{title}</h1>
        {description ? (
          <p className="mt-1 max-w-xl text-sm text-forest-400">
            {description}
          </p>
        ) : null}
      </div>
      <DemoBadge />
    </div>
  );
}
