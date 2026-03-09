import { createFormHook } from "@tanstack/react-form";
import { lazy } from "react";
import { fieldContext, formContext } from "./form-context";

const Submit = lazy(() => import("@/components/form/submit"));
const InputField = lazy(() => import("@/components/form/input-field"));
const SelectField = lazy(() => import("@/components/form/select-field"));
const TextareaField = lazy(() => import("@/components/form/textarea-field"));

const DisciplinesSelectField = lazy(() => import("@/components/disciplines/select-field"));

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    DisciplinesSelectField,
    InputField,
    TextareaField,
    SelectField,
  },
  formComponents: {
    Submit,
  },
  fieldContext,
  formContext,
});
