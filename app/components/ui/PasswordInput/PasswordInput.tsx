import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { HelperText, InputWrapper, StyledInput } from "../Input/Input.styles";
import type { InputProps } from "../Input/Input.types";

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
          style={{ paddingRight: "2.5rem" }}
        />

        <span
          onClick={togglePasswordVisibility}
          style={{
            position: "absolute",
            top: size === "small" ? "20%" : size === "medium" ? "30%" : "35%",
            right: "0.75rem",
            transform: "translateY(-50%)",
            cursor: "pointer",
            color: "#6b7280",
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
