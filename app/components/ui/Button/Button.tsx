import React from "react";
import { Spinner, StyledButton } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "medium",
      variant = "solid",
      colorScheme = "blue",
      isLoading = false,
      loadingText,
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
            <Spinner $size={size} />
            {loadingText || children}
          </>
        ) : (
          children
        )}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
