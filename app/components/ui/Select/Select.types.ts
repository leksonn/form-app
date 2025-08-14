export type SelectVariant = "subtle" | "outline";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  options: SelectOption[];
  label?: string;
  variant?: SelectVariant;
  placeholder?: string;
}
