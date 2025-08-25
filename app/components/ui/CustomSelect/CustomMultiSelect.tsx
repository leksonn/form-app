import React, { useEffect, useRef, useState } from "react";
import {
  ArrowIcon,
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
}

export const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  label,
  options,
  value = [],
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleOptionClick = (optionValue: string) => {
    if (!onChange) return;

    const isSelected = value.includes(optionValue);
    let newValues: string[];

    if (isSelected) {
      newValues = value.filter((val) => val !== optionValue);
    } else {
      newValues = [...value, optionValue];
    }

    onChange(newValues);
  };

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
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
    </SelectWrapper>
  );
};
