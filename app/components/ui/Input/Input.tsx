import React from 'react';
import { StyledInput } from './Input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    return <StyledInput ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';
