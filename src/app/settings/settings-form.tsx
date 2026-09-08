"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Card } from "@/components/card";
import { RsField } from "@/components/rs-input";
import { FormToggle } from "@/components/toggle";
import {
  CONTRIBUTION_REVIEW_FREQUENCIES,
  MAJOR_DECLINE_BEHAVIOURS,
} from "@/domain/profile-schema";
import {
  CONTRIBUTION_REVIEW_FREQUENCY_LABELS,
  MAJOR_DECLINE_BEHAVIOUR_LABELS,
  type ProfileFormValues,
} from "@/domain/profile-view";
import { saveProfileAction, type SettingsFormState } from "./actions";

function TextField({
  name,
  label,
  type = "text",
  defaultValue,
  error,
  hint,
  placeholder,
}: {
  name: string;
  label: string;
  type?: "text" | "number" | "date";
  defaultValue: string;
  error?: string;
  hint?: string;
  placeholder?: string;
}) {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <label htmlFor={inputId} className="block text-sm text-forest-600">
      {label}
      <input
        id={inputId}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`mt-1 w-full rounded-xl border bg-white px-3 py-2.5 text-forest-700 outline-none focus:border-forest-400 ${
          error ? "border-red-300" : "border-forest-100"
        }`}
      />
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

function SelectField<Value extends string>({
  name,
  label,
  defaultValue,
  options,
}: {
  name: string;
  label: string;
  defaultValue: Value;
  options: ReadonlyArray<{ value: Value; label: string }>;
}) {
  const inputId = `field-${name}`;

  return (
    <label htmlFor={inputId} className="block text-sm text-forest-600">
      {label}
      <select
        id={inputId}
        name={name}
        defaultValue={defaultValue}
        className="mt-1 w-full rounded-xl border border-forest-100 bg-white px-3 py-2.5 text-forest-700 outline-none focus:border-forest-400"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const INITIAL_STATE: SettingsFormState = {
  status: "idle",
  errors: {},
  values: {
    name: "",
    dateOfBirth: "",
    retirementTargetAge: "",
    retirementIncomeTargetPaisa: "",
    emergencyReserveTargetPaisa: "",
    monthlyContributionPaisa: "",
    startingCapitalPaisa: "",
    planningHorizonYears: "",
    shariahRequired: true,
    contributionReviewFrequency: "twice-per-year",
    majorDeclineBehaviour: "hold-or-buy-more",
  },
  isDemoData: true,
};

export function SettingsForm({
  initialValues,
  initialIsDemoData,
}: {
  initialValues: ProfileFormValues;
  initialIsDemoData: boolean;
}) {
  const [state, formAction, pending] = useActionState(saveProfileAction, {
    ...INITIAL_STATE,
    values: initialValues,
    isDemoData: initialIsDemoData,
  });

  const [shariahRequired, setShariahRequired] = useState(
    initialValues.shariahRequired,
  );

  // Uncontrolled fields (text/number/date/select) are reset to the
  // latest server-echoed values by remounting the form after each
  // submit — see `formKey` below.
  const [formKey, setFormKey] = useState(0);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setFormKey((key) => key + 1);
    setShariahRequired(state.values.shariahRequired);
  }, [state]);

  return (
    <form key={formKey} action={formAction} className="space-y-6">
      <Card>
        <p className="font-serif text-lg text-forest-700">Personal</p>
        <div className="mt-4 space-y-4">
          <TextField
            name="name"
            label="Name"
            defaultValue={state.values.name}
            error={state.errors.name}
          />
          <TextField
            name="dateOfBirth"
            label="Date of birth"
            type="date"
            defaultValue={state.values.dateOfBirth}
            error={state.errors.dateOfBirth}
          />
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Retirement plan</p>
        <div className="mt-4 space-y-4">
          <TextField
            name="retirementTargetAge"
            label="Retirement target age"
            type="number"
            defaultValue={state.values.retirementTargetAge}
            error={state.errors.retirementTargetAge}
            hint="30 to 90"
          />
          <RsField
            name="retirementIncomeTargetPaisa"
            label="Retirement income target"
            defaultValue={state.values.retirementIncomeTargetPaisa}
            error={state.errors.retirementIncomeTargetPaisa}
            hint="Per month, in today's purchasing power"
          />
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Savings</p>
        <div className="mt-4 space-y-4">
          <RsField
            name="startingCapitalPaisa"
            label="Starting capital"
            defaultValue={state.values.startingCapitalPaisa}
            error={state.errors.startingCapitalPaisa}
          />
          <RsField
            name="monthlyContributionPaisa"
            label="Monthly contribution"
            defaultValue={state.values.monthlyContributionPaisa}
            error={state.errors.monthlyContributionPaisa}
          />
          <RsField
            name="emergencyReserveTargetPaisa"
            label="Emergency reserve target"
            defaultValue={state.values.emergencyReserveTargetPaisa}
            error={state.errors.emergencyReserveTargetPaisa}
          />
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Planning</p>
        <div className="mt-4 space-y-4">
          <TextField
            name="planningHorizonYears"
            label="Planning horizon (years)"
            type="number"
            defaultValue={state.values.planningHorizonYears}
            error={state.errors.planningHorizonYears}
            hint="1 to 60"
          />
          <SelectField
            name="contributionReviewFrequency"
            label="Contribution review frequency"
            defaultValue={state.values.contributionReviewFrequency}
            options={CONTRIBUTION_REVIEW_FREQUENCIES.map((value) => ({
              value,
              label: CONTRIBUTION_REVIEW_FREQUENCY_LABELS[value],
            }))}
          />
          <SelectField
            name="majorDeclineBehaviour"
            label="If the market declines sharply, I'd prefer to"
            defaultValue={state.values.majorDeclineBehaviour}
            options={MAJOR_DECLINE_BEHAVIOURS.map((value) => ({
              value,
              label: MAJOR_DECLINE_BEHAVIOUR_LABELS[value],
            }))}
          />
        </div>
      </Card>

      <Card>
        <p className="font-serif text-lg text-forest-700">Preferences</p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-forest-700">
              Shariah required
            </p>
            <p className="text-sm text-forest-400">
              Only show Shariah-compliant options
            </p>
          </div>
          <FormToggle
            name="shariahRequired"
            label="Shariah required"
            checked={shariahRequired}
            onChange={setShariahRequired}
          />
        </div>
      </Card>

      {state.errors.form ? (
        <p className="text-sm text-red-600">{state.errors.form}</p>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-forest-700 px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-600 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state.status === "success" ? (
          <span className="text-sm font-medium text-forest-600">Saved</span>
        ) : null}
      </div>
    </form>
  );
}
