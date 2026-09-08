"use client";

import { useState } from "react";

/**
 * Visual-only toggle switch. Local component state only — nothing is
 * persisted or sent anywhere. Demo interaction, not a real setting.
 */
export function Toggle({ defaultEnabled }: { defaultEnabled: boolean }) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => setEnabled((value) => !value)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        enabled ? "bg-forest-700" : "bg-forest-100"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

/**
 * A form-submittable toggle: same visual as `Toggle`, but backed by a
 * real (visually hidden) checkbox with `name`/`checked`, so its state
 * is included in the enclosing <form>'s FormData on submit.
 */
export function FormToggle({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        value="true"
        className="sr-only"
        aria-label={label}
      />
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-forest-700" : "bg-forest-100"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </span>
    </label>
  );
}
