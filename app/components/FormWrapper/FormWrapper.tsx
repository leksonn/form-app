import type { ChangeEvent, FormEvent } from "react";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import type { CheckboxProps } from "../ui/Checkbox/Checkbox.types";
import { CustomSelect } from "../ui/CustomSelect";
import { DateInput } from "../ui/DateInput";
import { Input } from "../ui/Input";
import type { InputProps } from "../ui/Input/Input.types";
import type { SelectProps } from "../ui/Select/Select.types";
import { FormContainer, FormField, FormLabel } from "./FormWrapper.styles";
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
  validationSchema?: any;
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, formValue: unknown) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: formValue,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validationSchema) {
      try {
        validationSchema.parse(formValues);
        setErrors({});
      } catch (err: any) {
        const newErrors: Record<string, string> = {};
        if (err.errors) {
          err.errors.forEach((error: any) => {
            newErrors[error.path[0]] = error.message;
          });
        }
        setErrors(newErrors);
        return;
      }
    }

    onSubmit(formValues);
  };

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case "input":
        return (
          <Input
            key={field.name}
            value={(formValues[field.name] as string) || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(field.name, e.target.value)
            }
            error={Boolean(errors[field.name])}
            {...field.props}
          />
        );

      case "date":
        return (
          <DateInput
            key={field.name}
            value={(formValues[field.name] as string) || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(field.name, e.target.value)
            }
            error={Boolean(errors[field.name])}
            helperText={field.helperText}
            size={field.size}
            variant={field.variant}
            {...field.props}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            key={field.name}
            label={field.label}
            checked={Boolean(formValues[field.name])}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(field.name, e.target.checked)
            }
            error={Boolean(errors[field.name])}
            {...field.props}
          />
        );

      case "select":
        return (
          <CustomSelect
            key={field.name}
            label={field.label}
            value={(formValues[field.name] as string) || ""}
            options={field.options}
            onChange={(val) => handleChange(field.name, val)}
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

      {fields.map((field) => (
        <FormField key={field.name}>
          {field.label && field.type !== "checkbox" && (
            <FormLabel>{field.label}</FormLabel>
          )}
          {renderField(field)}
        </FormField>
      ))}

      <Button
        type="submit"
        colorScheme="green"
        variant="solid"
        size="large"
        isLoading={false}
        style={{ width: "100%" }}
      >
        {submitText}
      </Button>
    </FormContainer>
  );
};
