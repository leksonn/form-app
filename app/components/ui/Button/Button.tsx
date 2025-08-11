import React from 'react';
import { StyledButton } from './Button.styles';
import type { ButtonProps } from './Button.types';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'medium', children, ...props }, ref) => {
    return (
      <StyledButton 
        ref={ref}
        $size={size}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';