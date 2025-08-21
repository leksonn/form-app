import type { ChangeEvent, FormEvent } from "react";
import React, { Fragment, useState } from "react";
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

interface FormWrapperProps {
  title?: string;
  description?: string;
  fields: FieldConfig[];
  onSubmit: (values: Record<string, unknown>) => void;
  submitText?: string;
  initialValues?: Record<string, unknown>;
  validationSchema?: ZodSchema<any>;
}

export const FormWrapper: React.FC<FormWrapperProps> = ({
  title,
  description,
  fields = [],
  onSubmit,
  submitText = "Submit",
  initialValues = {},
  validationSchema,
}) => {
  const [formValues, setFormValues] =
    useState<Record<string, unknown>>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const handleChange = (name: string, formValue: unknown) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formValue,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateField = (name: string) => {
    if (!validationSchema) return;

    const fieldValue = formValues[name];

    if (fieldValue === undefined || fieldValue === "") {
      const fieldConfig = fields.find((f) => f.name === name);
      if (fieldConfig) {
        setErrors((prev) => ({
          ...prev,
          [name]: `${fieldConfig.label} is required`,
        }));
      }
      return;
    }

    try {
      const objectSchema = validationSchema as z.ZodObject<any>;
      const fieldSchema = z.object({
        [name]: objectSchema.shape[name],
      });

      fieldSchema.parse({ [name]: fieldValue });
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [name]: err.issues[0].message }));
      }
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validationSchema) {
      const requiredErrors: Partial<Record<string, string>> = {};

      fields.forEach((field) => {
        const fieldName = field.name;
        if (
          typeof fieldName === "string" &&
          !formValues[fieldName] &&
          fieldName !== "nicotine"
        ) {
          requiredErrors[fieldName] = `${field.label} is required`;
        }
      });

      if (Object.keys(requiredErrors).length > 0) {
        setErrors(requiredErrors);
        return;
      }

      try {
        validationSchema.parse(formValues);
        setErrors({});
        onSubmit(formValues);
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
      onSubmit(formValues);
    }
  };
  const renderField = (field: FieldConfig) => {
    const fieldError = errors[field.name];

    switch (field.type) {
      case "input":
        return (
          <Fragment key={field.name}>
            <Input
              value={(formValues[field.name] as string) || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(field.name, e.target.value)
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
              value={(formValues[field.name] as string) || ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(field.name, e.target.value)
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
              checked={Boolean(formValues[field.name])}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(field.name, e.target.checked)
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
              value={(formValues[field.name] as string) || ""}
              options={field.options}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChange(field.name, e.target.value)
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
