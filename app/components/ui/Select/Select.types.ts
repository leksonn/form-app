export type SelectVariant = "subtle" | "outline";
export type SelectSize = "small" | "medium" | "large";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  label?: string;
  variant?: SelectVariant;
  size?: SelectSize;
  placeholder?: string;
}
