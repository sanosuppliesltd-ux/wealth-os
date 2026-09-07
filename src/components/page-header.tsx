export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      <h1 className="font-serif text-3xl text-forest-700">{title}</h1>
      {description ? (
        <p className="mt-1 max-w-xl text-sm text-forest-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}
