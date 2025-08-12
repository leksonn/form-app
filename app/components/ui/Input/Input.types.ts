export type InputVariant = 'subtle' | 'outline' | 'flushed' ;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    
}
