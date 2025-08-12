import React from 'react';
import type { InputProps } from './Input.types';
import { StyledInput } from './Input.styles';


export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({variant = "outline", ...props }, ref) => {
    return <StyledInput $variant = {variant} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';
