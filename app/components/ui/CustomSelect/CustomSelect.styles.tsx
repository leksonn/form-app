import { styled } from "styled-components";

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

export const SelectTrigger = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
  background-color: transparent;
  border: 1px solid #d1d5db;
  padding: 0.5rem 0.75rem;
  color: #111827;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

export const OptionsList = styled.ul`
  position: absolute;
  z-index: 10;
  margin-top: 0.25rem;
  width: 100%;
  border-radius: 0.375rem;
  background-color: #fff;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  max-height: 12rem;
  border: 1px solid #d1d5db;
  padding: 0.25rem 0;
`;

export const OptionItem = styled.li<{ $isSelected: boolean }>`
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem 0.75rem;
  transition: background-color 0.1s;
  color: #1f2937;

  &:hover {
    background-color: #f3f4f6;
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    background-color: #e5e7eb;
    font-weight: 500;
    color: #111827;
  `}
`;

export const ArrowIcon = styled.span<{ $isOpen: boolean }>`
  position: relative;
  width: 1rem;
  height: 1rem;
  color: #9ca3af;
  transition: transform 0.2s;
  transform: rotate(0deg);

  ${({ $isOpen }) =>
    $isOpen &&
    `
    transform: rotate(180deg);
  `}

  &::after {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
    top: 50%;
    left: 50%;
    margin-top: -0.5rem;
    margin-left: -0.35rem;
  }
`;

export const Placeholder = styled.span`
  color: #a0a0a0;
  display: block;
`;
