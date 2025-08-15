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
  checked,
  onChange,
  ...props
}: CheckboxProps) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e); 
    }
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox
        checked={checked}
        onChange={handleCheckboxChange}
        aria-checked={indeterminate ? "mixed" : checked}
        aria-invalid={error}
        {...props}
      />
      <StyledCheckbox
        $checked={checked}
        $variant={variant}
        $size={size}
        $error={error}
        $indeterminate={indeterminate}
      />
      {label && <CheckboxLabel $size={size}>{label}</CheckboxLabel>}
    </CheckboxContainer>
  );
};
