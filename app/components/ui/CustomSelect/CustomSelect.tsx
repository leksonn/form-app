import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  ArrowIcon,
  ErrorText,
  OptionItem,
  OptionsList,
  Placeholder,
  SelectTrigger,
  SelectWrapper,
} from "./CustomSelect.styles";

interface Option {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: () => void;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  onBlur,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        if (isFocused) {
          setIsFocused(false);
          onBlur?.();
        }
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onBlur, isFocused]);

  const handleOptionClick = (optionValue: string) => {
    if (onChange) {
      const syntheticEvent = {
        target: { value: optionValue },
      } as unknown as ChangeEvent<HTMLSelectElement>;
      onChange(syntheticEvent);
    }

    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectTrigger
        $error={error}
        $focused={isFocused}
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
      >
        {selectedOption ? (
          <span>{selectedOption.label}</span>
        ) : (
          <Placeholder>{placeholder || "Select an option"}</Placeholder>
        )}
        <ArrowIcon $isOpen={isOpen} />
      </SelectTrigger>

      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              $isSelected={option.value === value}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsList>
      )}

      {error && helperText && <ErrorText>{helperText}</ErrorText>}
    </SelectWrapper>
  );
};
