export type CheckboxVariant = 'solid' | 'subtle' | 'outline' ;

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: CheckboxVariant;
    label?: string;
    indeterminate?: boolean;
    error?: boolean;
}