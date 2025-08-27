import React from "react";
import { IconWrapper, Spinner, StyledButton } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "medium",
      variant = "solid",
      colorScheme = "blue",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        $size={size}
        $variant={variant}
        $colorScheme={colorScheme}
        disabled={isLoading || disabled}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner data-testid="spinner" $size={size} />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && (
              <IconWrapper $position="left" $size={size}>
                {leftIcon}
              </IconWrapper>
            )}
            {children}
            {rightIcon && (
              <IconWrapper $position="right" $size={size}>
                {rightIcon}
              </IconWrapper>
            )}
          </>
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
