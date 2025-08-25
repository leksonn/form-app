import React, { useEffect, useRef, useState } from "react";
import {
  ArrowIcon,
  ErrorText,
  MultiSelectTag,
  MultiSelectTagsWrapper,
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

export interface CustomMultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange?: (selectedValues: string[]) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  onBlur?: () => void;
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  options,
  value = [],
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
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
        if (onBlur) onBlur();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const handleOptionClick = (optionValue: string) => {
    if (!onChange) return;
    const isSelected = value.includes(optionValue);
    const newValues = isSelected
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValues);
  };

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );
  const showError = error && selectedOptions.length === 0;

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectTrigger
        $error={showError}
        $focused={isFocused}
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onFocus={() => setIsFocused(true)}
      >
        <MultiSelectTagsWrapper>
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <MultiSelectTag key={option.value}>{option.label}</MultiSelectTag>
            ))
          ) : (
            <Placeholder>{placeholder || "Select options"}</Placeholder>
          )}
        </MultiSelectTagsWrapper>
        <ArrowIcon $isOpen={isOpen} />
      </SelectTrigger>

      {isOpen && (
        <OptionsList>
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <OptionItem
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                $isSelected={isSelected}
              >
                <input type="checkbox" readOnly checked={isSelected} />
                {option.label}
              </OptionItem>
            );
          })}
        </OptionsList>
      )}

      {showError && helperText && <ErrorText>{helperText}</ErrorText>}
    </SelectWrapper>
  );
};
