import React from 'react';
import type { InputProps } from './Input.types';
import { StyledInput, InputWrapper, HelperText } from './Input.styles';


export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({variant = "outline", size = "medium", helperText, error=false, ...props }, ref) => {
    return (
    <InputWrapper>
    <StyledInput $variant = {variant} $size ={size} $error={error} ref={ref} {...props} />
    {helperText && <HelperText $error={error}>{helperText}</HelperText>}
    </InputWrapper>
);
  }
);

Input.displayName = 'Input';
