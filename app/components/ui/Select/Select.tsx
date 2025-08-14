import React, { useState } from "react";
import { SelectLabel, SelectWrapper, StyledSelect } from "./Select.styles";
import type { SelectProps } from "./Select.types";

export const Select = ({ options, label, ...props }: SelectProps) => {
  const [value, setValue] = useState(props.value || "");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <SelectWrapper>
      {label && <SelectLabel>{label}</SelectLabel>}
      <StyledSelect value={value} onChange={handleChange} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
};

Select.displayName = "Select";
