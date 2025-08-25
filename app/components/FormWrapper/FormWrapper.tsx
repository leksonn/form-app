import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import { z, type ZodSchema } from "zod";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import type { CheckboxProps } from "../ui/Checkbox/Checkbox.types";
import { CustomMultiSelect, CustomSelect } from "../ui/CustomSelect";
import type { CustomMultiSelectProps } from "../ui/CustomSelect/CustomMultiSelect";
import type { CustomSelectProps } from "../ui/CustomSelect/CustomSelect";
import { Select } from "../ui/Select";

import { DateInput } from "../ui/DateInput";
import { Input } from "../ui/Input";
import type { InputProps } from "../ui/Input/Input.types";
import type { SelectProps } from "../ui/Select/Select.types";
import {
  ErrorText,
  FormContainer,
  FormField,
  FormLabel,
} from "./FormWrapper.styles";
import { FormHeader } from "./FormWrapperHeader/FormHeader";

type ResetForm = () => void;

export type InputField = {
  type: "input";
  name: string;
  label?: string;
  helperText?: string;
  variant?: InputProps["variant"];
  size?: InputProps["size"];
  icon?: InputProps["icon"];
  props?: Omit<InputProps, "value" | "onChange">;
};

export type DateInputField = {
  type: "date";
  name: string;
  label?: string;
  helperText?: string;
  variant?: InputProps["variant"];
  size?: InputProps["size"];
  props?: Omit<InputProps, "value" | "onChange">;
};

export type CheckboxField = {
  type: "checkbox";
  name: string;
  label?: string;
  variant?: CheckboxProps["variant"];
  size?: CheckboxProps["size"];
  indeterminate?: boolean;
  error?: boolean;
  description?: string;
  helperText?: string;
  props?: Omit<CheckboxProps, "checked" | "onChange">;
};

export type SelectField = {
  type: "select";
  name: string;
  label?: string;
  options: SelectProps["options"];
  variant?: SelectProps["variant"];
  size?: SelectProps["size"];
  placeholder?: string;
  helperText?: string;
  props?: Omit<SelectProps, "value" | "onChange" | "options">;
};

export type CustomSelectField = {
  type: "customselect";
  name: string;
  label?: string;
  options: CustomSelectProps["options"];
  placeholder?: string;
  helperText?: string;
  props?: Omit<SelectProps, "value" | "onChange" | "options">;
};

export type MultiSelectField = {
  type: "multiselect";
  name: string;
  label?: string;
  options: CustomMultiSelectProps["options"];
  placeholder?: string;
};

export type FieldConfig = (
  | InputField
  | DateInputField
  | CheckboxField
  | SelectField
  | CustomSelectField
  | MultiSelectField
) & {
  dependsOn?: { field: string; value: unknown };
};

export type InferFormValues<TFields extends FieldConfig[]> = {
  [K in TFields[number]["name"]]: Extract<
    TFields[number],
    { name: K }
  >["type"] extends "checkbox"
    ? boolean
    : string;
};

interface FormWrapperProps<TFormValues = Record<string, unknown>> {
  title?: string;
  description?: string;
  fields: FieldConfig[];
  onSubmit: (values: TFormValues, reset: ResetForm) => void;
  submitText?: string;
  initialValues?: Partial<TFormValues>;
  validationSchema?: ZodSchema<TFormValues>;
  onValuesChange?: (values: Record<string, unknown>) => void;
}

export const FormWrapper = <TFormValues extends Record<string, unknown>>({
  title,
  description,
  fields = [],
  onSubmit,
  submitText = "Submit",
  initialValues = {},
  validationSchema,
  onValuesChange,
}: FormWrapperProps<TFormValues>) => {
  const [formValues, setFormValues] = useState<Partial<TFormValues>>(
    initialValues as Partial<TFormValues>
  );

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  useEffect(() => {
    setFormValues(initialValues as Partial<TFormValues>);
  }, [initialValues]);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(formValues);
    }
  }, [formValues, onValuesChange]);

  const resetForm = () => {
    setFormValues(initialValues);
    setErrors({});
  };

  const handleChange = <K extends keyof TFormValues>(
    name: K,
    value: TFormValues[K]
  ) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (errors[name as string]) {
      setErrors((prev) => ({
        ...prev,
        [name as string]: "",
      }));
    }
  };

  const validateField = (name: string) => {
    if (!validationSchema) return;

    const fieldValue = formValues[name as keyof TFormValues];

    try {
      const objectSchema = validationSchema as z.ZodObject<any>;
      const fieldSchema = z.object({
        [name]: objectSchema.shape[name],
      });

      const valueToValidate = fieldValue === undefined ? "" : fieldValue;
      fieldSchema.parse({ [name]: valueToValidate });

      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({
          ...prev,
          [name]: err.issues[0].message,
        }));
      }
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validationSchema) {
      const newErrors: Partial<Record<string, string>> = {};

      fields.forEach((field) => {
        try {
          const objectSchema = validationSchema as z.ZodObject<any>;
          const fieldSchema = z.object({
            [field.name]: objectSchema.shape[field.name],
          });

          const fieldValue = formValues[field.name as keyof TFormValues];
          const valueToValidate = fieldValue === undefined ? "" : fieldValue;

          fieldSchema.parse({ [field.name]: valueToValidate });
        } catch (err) {
          if (err instanceof z.ZodError) {
            newErrors[field.name] = err.issues[0].message;
          }
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      try {
        const completeFormValues: Record<string, unknown> = {};

        fields.forEach((field) => {
          const value = formValues[field.name as keyof TFormValues];
          if (field.type === "checkbox") {
            completeFormValues[field.name] =
              value !== undefined ? value : false;
          } else {
            completeFormValues[field.name] = value !== undefined ? value : "";
          }
        });

        const validatedValues = validationSchema.parse(completeFormValues);
        setErrors({});
        onSubmit(validatedValues as TFormValues, resetForm);
      } catch (err) {
        if (err instanceof z.ZodError) {
          const validationErrors: Partial<Record<string, string>> = {};
          err.issues.forEach((issue) => {
            const path = issue.path[0];
            if (typeof path === "string") {
              validationErrors[path] = issue.message;
            }
          });
          setErrors(validationErrors);
        }
      }
    } else {
      onSubmit(formValues as TFormValues, resetForm);
    }
  };

  const renderField = (field: FieldConfig) => {
    const fieldError = errors[field.name];

    switch (field.type) {
      case "input":
        return (
          <Input
            value={
              (formValues[field.name as keyof TFormValues] as string) || ""
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(
                field.name as keyof TFormValues,
                e.target.value as TFormValues[keyof TFormValues]
              )
            }
            onBlur={() => validateField(field.name)}
            error={Boolean(fieldError)}
            helperText={fieldError}
            {...field.props}
          />
        );

      case "date":
        return (
          <DateInput
            value={
              (formValues[field.name as keyof TFormValues] as string) || ""
            }
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(
                field.name as keyof TFormValues,
                e.target.value as TFormValues[keyof TFormValues]
              )
            }
            onBlur={() => validateField(field.name)}
            error={Boolean(fieldError)}
            helperText={fieldError}
            size={field.size}
            variant={field.variant}
            {...field.props}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            label={field.label}
            checked={Boolean(formValues[field.name as keyof TFormValues])}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(
                field.name as keyof TFormValues,
                e.target.checked as TFormValues[keyof TFormValues]
              )
            }
            error={Boolean(fieldError)}
            helperText={fieldError}
            {...field.props}
          />
        );

      case "select":
        return (
          <Select
            label={field.label}
            value={
              (formValues[field.name as keyof TFormValues] as string) || ""
            }
            options={field.options}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChange(
                field.name as keyof TFormValues,
                e.target.value as TFormValues[keyof TFormValues]
              )
            }
            onBlur={() => validateField(field.name)}
            error={Boolean(errors[field.name])}
            helperText={errors[field.name]}
            placeholder={field.props?.placeholder}
            variant={field.variant}
            size={field.size}
          />
        );

      case "customselect":
        return (
          <CustomSelect
            key={field.name}
            label={field.label}
            value={(formValues[field.name] as string) || ""}
            options={field.options}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(
                field.name as keyof TFormValues,
                e.target.value as TFormValues[keyof TFormValues]
              );
            }}
            placeholder={field.placeholder}
          />
        );

      case "multiselect":
        return (
          <CustomMultiSelect
            key={field.name}
            label={field.label}
            value={(formValues[field.name] as string[]) || []}
            options={field.options}
            onChange={(selectedValues: string[]) => {
              handleChange(
                field.name as keyof TFormValues,
                selectedValues as TFormValues[keyof TFormValues]
              );
            }}
            placeholder={field.placeholder}
          />
        );

      default:
        return null;
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader title={title} description={description} />
      {fields.map((field) => {
        if (field.dependsOn) {
          const depValue =
            formValues[field.dependsOn.field as keyof TFormValues];
          if (depValue !== field.dependsOn.value) {
            return null;
          }
        }

        return (
          <FormField key={field.name}>
            {field.label && field.type !== "checkbox" && (
              <FormLabel>{field.label}</FormLabel>
            )}
            {renderField(field)}
            {field.type === "checkbox" && errors[field.name] && (
              <ErrorText>{errors[field.name]}</ErrorText>
            )}
          </FormField>
        );
      })}
      <Button
        type="submit"
        colorScheme="green"
        variant="solid"
        size="large"
        style={{ width: "100%" }}
      >
        {submitText}
      </Button>
    </FormContainer>
  );
};
