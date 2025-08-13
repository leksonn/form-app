import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HelperText, InputWrapper, StyledInput } from "../Input/Input.styles";
import type { InputProps, InputSize } from "../Input/Input.types";

const ICON_RIGHT_OFFSET = "0.75rem";
const ICON_COLOR = "#6b7280";
const INPUT_PADDING_RIGHT = "2.5rem";

const TOGGLE_TOP_POSITION: Record<InputSize, string> = {
  small: "1rem",
  medium: "1.25rem",
  large: "1.75rem",
};

interface PasswordInputProps extends Omit<InputProps, "type" | "icon"> {}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    { helperText, error, variant = "outline", size = "medium", ...rest },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
      <InputWrapper style={{ position: "relative" }}>
        <StyledInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          $error={!!error}
          $variant={variant}
          $size={size}
          $hasIcon={false}
          {...rest}
          style={{ paddingRight: INPUT_PADDING_RIGHT }}
        />

        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            top: TOGGLE_TOP_POSITION[size] || TOGGLE_TOP_POSITION.medium,
            right: ICON_RIGHT_OFFSET,
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: ICON_COLOR,
          }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </span>

        {helperText && <HelperText $error={!!error}>{helperText}</HelperText>}
      </InputWrapper>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
