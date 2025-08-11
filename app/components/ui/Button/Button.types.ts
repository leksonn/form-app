export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'solid' | 'subtle' | 'surface' | 'outline' | 'ghost' | 'plain';
export type ButtonColorScheme = 'blue' | 'green' | 'red' | 'pink' | 'yellow' | 'gray';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    variant?: ButtonVariant;
    colorScheme?: ButtonColorScheme;
    children: React.ReactNode;
}