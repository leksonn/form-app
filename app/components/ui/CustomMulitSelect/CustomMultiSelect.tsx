import React, { useState, useRef, useEffect } from 'react';
import {
  MultiSelectWrapper,
  MultiSelectTrigger,
  MultiSelectTagsWrapper,
  MultiSelectTag,
  MultiSelectPlaceholder,
  MultiSelectOptionsList,
  MultiSelectOptionItem,
  MultiSelectLabel,
  ArrowIcon
} from './CustomMultiSelect.styles';

interface Option {
  value: string;
  label: string;
}

export interface CustomMultiSelectProps {
  label?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({ label, options, value = [], onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleOptionClick = (optionValue: string) => {
    const isSelected = value.includes(optionValue);
    if (isSelected) {
      onChange(value.filter((val) => val !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const selectedOptions = options.filter(option => value.includes(option.value));

  return (
    <MultiSelectWrapper ref={wrapperRef}>
      <MultiSelectTrigger onClick={() => setIsOpen(!isOpen)}>
        <MultiSelectTagsWrapper>
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => (
              <MultiSelectTag key={option.value}>
                {option.label}
              </MultiSelectTag>
            ))
          ) : (
            <MultiSelectPlaceholder>{placeholder || "Select options"}</MultiSelectPlaceholder>
          )}
        </MultiSelectTagsWrapper>
        <ArrowIcon $isOpen={isOpen} />
      </MultiSelectTrigger>

      {isOpen && (
        <MultiSelectOptionsList>
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            return (
              <MultiSelectOptionItem
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                $isSelected={isSelected}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={isSelected}
                />
                {option.label}
              </MultiSelectOptionItem>
            );
          })}
        </MultiSelectOptionsList>
      )}
    </MultiSelectWrapper>
  );
};