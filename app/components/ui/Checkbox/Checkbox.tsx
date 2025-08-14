import { useState } from "react";
import {
  CheckboxContainer,
  CheckboxLabel,
  HiddenCheckbox,
  StyledCheckbox,
} from "./Checkbox.styles";
import type { CheckboxProps } from "./Checkbox.types";

export const Checkbox = ({
  variant = "outline",
  size = "medium",
  label,
  indeterminate = false,
  error = false,
  ...props
}: CheckboxProps ) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={handleCheckboxChange} aria-checked={indeterminate ? "mixed" : checked}
        aria-invalid={error} {...props}/>
      <StyledCheckbox $checked={checked} $variant={variant} $size={size} $error={error} $indeterminate = {indeterminate}/>
      {label && <CheckboxLabel $size = {size}>{label}</CheckboxLabel>}
    </CheckboxContainer>
  );
};
