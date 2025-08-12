export type InputVariant = 'subtle' | 'outline' | 'flushed' ;
export type InputSize = "small" | "medium" | "large";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    variant?: InputVariant;
    size?: InputSize;
    helperText?: string;
    error?: boolean;
}

