import React from 'react';
import { StyledButton } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'medium', variant = 'solid', children, ...props }, ref) => {
    return (
      <StyledButton 
        ref={ref}
        $size={size}
        $variant={variant}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';