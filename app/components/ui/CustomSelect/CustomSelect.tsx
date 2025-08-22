import React, { useEffect, useRef, useState } from "react";
import {
  ArrowIcon,
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

interface CustomSelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  options,
  value,
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
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectTrigger onClick={() => setIsOpen(!isOpen)}>
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
    </SelectWrapper>
  );
};
