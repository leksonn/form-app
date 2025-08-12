import React from 'react';
import type { InputProps } from './Input.types';
import { StyledInput } from './Input.styles';


export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({variant = "outline", size = "medium", ...props }, ref) => {
    return <StyledInput $variant = {variant} $size ={size} ref={ref} {...props} />;
  }
);

Input.displayName = 'Input';
