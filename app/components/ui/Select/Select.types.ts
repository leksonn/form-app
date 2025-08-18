import type { ChangeEvent, FocusEvent } from "react";

export type SelectSize = "small" | "medium" | "large";
export type SelectVariant = "outline" | "subtle";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options?: SelectOption[];
  label?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: FocusEvent<HTMLSelectElement>) => void;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}