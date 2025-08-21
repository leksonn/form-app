import type { ChangeEvent, FormEvent } from "react";
import { Fragment, useState } from "react";
import { z, type ZodSchema } from "zod";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import type { CheckboxProps } from "../ui/Checkbox/Checkbox.types";
import { DateInput } from "../ui/DateInput";
import { Input } from "../ui/Input";
import type { InputProps } from "../ui/Input/Input.types";
import { Select } from "../ui/Select";
import type { SelectProps } from "../ui/Select/Select.types";
import {
  ErrorText,
  FormContainer,
  FormField,
  FormLabel,
} from "./FormWrapper.styles";
import { FormHeader } from "./FormWrapperHeader/FormHeader";

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

export type FieldConfig =
  | InputField
  | DateInputField
  | CheckboxField
  | SelectField;

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
  onSubmit: (values: TFormValues) => void;
  submitText?: string;
  initialValues?: Partial<TFormValues>;
  validationSchema?: ZodSchema<TFormValues>;
}

export const FormWrapper = <TFormValues extends Record<string, unknown>>({
  title,
  description,
  fields = [],
  onSubmit,
  submitText = "Submit",
  initialValues = {},
  validationSchema,
}: FormWrapperProps<TFormValues>) => {
  const [formValues, setFormValues] = useState<Partial<TFormValues>>(
    initialValues as Partial<TFormValues>
  );
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
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
        onSubmit(validatedValues as TFormValues);
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
      onSubmit(formValues as TFormValues);
    }
  };

  const renderField = (field: FieldConfig) => {
    const fieldError = errors[field.name];

    switch (field.type) {
      case "input":
        return (
          <Fragment key={field.name}>
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
          </Fragment>
        );

      case "date":
        return (
          <Fragment key={field.name}>
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
          </Fragment>
        );

      case "checkbox":
        return (
          <Fragment key={field.name}>
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
          </Fragment>
        );

      case "select":
        return (
          <Fragment key={field.name}>
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
          </Fragment>
        );

      default:
        return null;
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader title={title} description={description} />
      {fields.map((field) => (
        <FormField key={field.name}>
          {field.label && field.type !== "checkbox" && (
            <FormLabel>{field.label}</FormLabel>
          )}
          {renderField(field)}
          {field.type === "checkbox" && errors[field.name] && (
            <ErrorText>{errors[field.name]}</ErrorText>
          )}
        </FormField>
      ))}
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
