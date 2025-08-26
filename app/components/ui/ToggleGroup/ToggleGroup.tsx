import {
  ErrorText,
  ToggleButton,
  ToggleGroupContainer,
} from "./ToggleGroup.styles";

interface ToggleOption {
  label: string;
  value: string;
}

export interface ToggleGroupProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  error?: boolean;
  onBlur?: () => void;
}

export const ToggleGroup = ({
  options,
  value,
  onChange,
  error,
  helperText,
  onBlur,
}: ToggleGroupProps) => {
  return (
    <>
      <ToggleGroupContainer>
        {options.map((option) => (
          <ToggleButton
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            $active={value === option.value}
          >
            {option.label}
          </ToggleButton>
        ))}
      </ToggleGroupContainer>
      {error && helperText && <ErrorText>{helperText}</ErrorText>}
    </>
  );
};
