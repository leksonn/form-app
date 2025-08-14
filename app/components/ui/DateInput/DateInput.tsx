import React, { forwardRef } from "react";
import { StyledInput, InputWrapper, HelperText } from "../Input/Input.styles";
import type { InputProps, InputSize, InputVariant } from "../Input/Input.types";


type DateInputProps = InputProps & {
  helperText?: React.ReactNode;
  error?: boolean;
  size?: InputSize;
  variant?: InputVariant;
};

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ helperText, error, size, variant, ...props }, ref) => {
    const inputSize: InputSize = size || "medium";
    const inputVariant: InputVariant = variant || "outline";

    return (
      <InputWrapper style={{ position: "relative", color: "gray" }}>
        <StyledInput
          ref={ref}
          type="date"
          $error={!!error}
          $variant={inputVariant}
          $size={inputSize}
          $hasIcon={false}
          {...props}
        />

        {helperText && <HelperText $error={!!error}>{helperText}</HelperText>}
      </InputWrapper>
    );
  }
);

DateInput.displayName = "DateInput";
