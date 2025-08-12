import React from 'react';
import type { InputProps } from './Input.types';
import { StyledInput, InputWrapper, HelperText, IconWrapper } from './Input.styles';


export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({variant = "outline", size = "medium", helperText, error=false, icon, ...props }, ref) => {
    const hasIcon = !!icon;
    return (
    <InputWrapper>
    <IconWrapper $hasIcon={hasIcon} $size={size}>
        {icon}
    <StyledInput $variant = {variant} $size ={size} $error={error} $hasIcon = {hasIcon} ref={ref} {...props} />
    {helperText && <HelperText $error={error}>{helperText}</HelperText>}
    </IconWrapper>
    </InputWrapper>
);
  }
);

Input.displayName = 'Input';
