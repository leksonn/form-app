import { useState } from "react";
import {
  CheckboxContainer,
  CheckboxLabel,
  HiddenCheckbox,
  StyledCheckbox,
} from "./Checkbox.styles";

export const Checkbox = ({ label = "Checkbox" }: { label?: string }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} onChange={handleCheckboxChange} />
      <StyledCheckbox $checked={checked} />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};
