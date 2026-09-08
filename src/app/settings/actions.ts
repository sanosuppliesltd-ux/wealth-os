"use server";

import { revalidatePath } from "next/cache";
import { ProfileValidationError, updateProfile } from "@/domain/profile";
import {
  toProfileFormValues,
  type ProfileFormValues,
} from "@/domain/profile-view";

export interface SettingsFormState {
  status: "idle" | "success" | "error";
  errors: Partial<Record<keyof ProfileFormValues | "form", string>>;
  values: ProfileFormValues;
  isDemoData: boolean;
}

function stringField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Rebuilds what the user typed, so a failed submit re-shows their input. */
function echoedValues(formData: FormData): ProfileFormValues {
  return {
    name: stringField(formData, "name"),
    dateOfBirth: stringField(formData, "dateOfBirth"),
    retirementTargetAge: stringField(formData, "retirementTargetAge"),
    retirementIncomeTargetPaisa: stringField(
      formData,
      "retirementIncomeTargetPaisa",
    ),
    emergencyReserveTargetPaisa: stringField(
      formData,
      "emergencyReserveTargetPaisa",
    ),
    monthlyContributionPaisa: stringField(
      formData,
      "monthlyContributionPaisa",
    ),
    startingCapitalPaisa: stringField(formData, "startingCapitalPaisa"),
    planningHorizonYears: stringField(formData, "planningHorizonYears"),
    shariahRequired: formData.get("shariahRequired") === "true",
    contributionReviewFrequency: stringField(
      formData,
      "contributionReviewFrequency",
    ) as ProfileFormValues["contributionReviewFrequency"],
    majorDeclineBehaviour: stringField(
      formData,
      "majorDeclineBehaviour",
    ) as ProfileFormValues["majorDeclineBehaviour"],
  };
}

export async function saveProfileAction(
  prevState: SettingsFormState,
  formData: FormData,
): Promise<SettingsFormState> {
  const values = echoedValues(formData);

  try {
    const updated = await updateProfile({
      name: formData.get("name"),
      dateOfBirth: formData.get("dateOfBirth"),
      retirementTargetAge: formData.get("retirementTargetAge"),
      retirementIncomeTargetPaisa: formData.get("retirementIncomeTargetPaisa"),
      emergencyReserveTargetPaisa: formData.get("emergencyReserveTargetPaisa"),
      monthlyContributionPaisa: formData.get("monthlyContributionPaisa"),
      startingCapitalPaisa: formData.get("startingCapitalPaisa"),
      planningHorizonYears: formData.get("planningHorizonYears"),
      shariahRequired: formData.get("shariahRequired"),
      contributionReviewFrequency: formData.get("contributionReviewFrequency"),
      majorDeclineBehaviour: formData.get("majorDeclineBehaviour"),
    });

    // The Profile drives demo values and the "Demo" indicator on every
    // screen — revalidate all of them so a save is reflected immediately.
    revalidatePath("/");
    revalidatePath("/settings");
    revalidatePath("/my-plan");
    revalidatePath("/portfolio");
    revalidatePath("/retirement");
    revalidatePath("/what-if");

    return {
      status: "success",
      errors: {},
      values: toProfileFormValues(updated),
      isDemoData: updated.isDemoData,
    };
  } catch (error) {
    if (error instanceof ProfileValidationError) {
      return {
        status: "error",
        errors: error.errors,
        values,
        isDemoData: prevState.isDemoData,
      };
    }
    throw error;
  }
}
