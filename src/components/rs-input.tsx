"use client";

/**
 * A labelled Rs amount input. Purely a text field with a fixed "Rs"
 * prefix — accepts whatever the user types (digits, commas); parsing
 * and validation happen server-side in the Settings action, driven by
 * src/domain/profile-schema.ts. This component performs no
 * calculation and no parsing of its own.
 */
export function RsField({
  name,
  label,
  defaultValue,
  error,
  hint,
}: {
  name: string;
  label: string;
  defaultValue: string;
  error?: string;
  hint?: string;
}) {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <label htmlFor={inputId} className="block text-sm text-forest-600">
      {label}
      <div
        className={`mt-1 flex items-center rounded-xl border bg-white px-3 focus-within:border-forest-400 ${
          error ? "border-red-300" : "border-forest-100"
        }`}
      >
        <span className="text-sm text-forest-400">Rs</span>
        <input
          id={inputId}
          name={name}
          type="text"
          inputMode="decimal"
          defaultValue={defaultValue}
          placeholder="0"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="w-full bg-transparent px-2 py-2.5 text-forest-700 outline-none"
        />
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-forest-400">{hint}</p>
      ) : null}
    </label>
  );
}
