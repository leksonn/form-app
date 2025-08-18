import React from "react";
import { SelectWrapper, StyledSelect, SelectLabel, ErrorText } from "./Select.styles";
import type { SelectProps } from "./Select.types";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    options = [],
    label,
    variant = "outline",
    size = "medium",
    placeholder,
    helperText,
    error = false,
    className,
    ...props
  }, ref) => {
    return (
      <SelectWrapper className={className}>
        <StyledSelect
          ref={ref}
          $variant={variant}
          $size={size}
          $error={error}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder || label || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        {error && helperText && <ErrorText>{helperText}</ErrorText>}
      </SelectWrapper>
    );
  }
);

Select.displayName = "Select";