export type CheckboxVariant = "solid" | "subtle" | "outline";
export type CheckboxSize = "small" | "medium" | "large";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: CheckboxVariant;
  size?: CheckboxSize;
  label?: string;
  indeterminate?: boolean;
  helperText?: string;
  error?: boolean;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
