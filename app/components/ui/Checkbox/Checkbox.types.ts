export type CheckboxVariant = "solid" | "subtle" | "outline";
export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
  description?: string;
  indeterminate?: boolean;
  error?: boolean;
}
