import { styled } from "styled-components";

const errorColor = "#e53e3e";
const focusColor = "#3182ce";
const normalBorderColor = "#d1d5db";

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

export const SelectTrigger = styled.div<{
  $error?: boolean;
  $focused?: boolean;
}>`
  position: relative;
  width: 100%;
  cursor: pointer;
  border-radius: 6px;
  background-color: #fcfbfbff;
  border: 1px solid ${({ $error }) => ($error ? errorColor : normalBorderColor)};
  padding: 0.5rem 0.75rem;
  color: #111827;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({ $focused, $error }) =>
    $focused &&
    `
    border-color: ${$error ? errorColor : focusColor};
    box-shadow: 0 0 0 2px ${$error ? `${errorColor}80` : `${focusColor}40`};
  `}
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
    0 4px 6 -2px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  max-height: 12rem;
  border: 1px solid ${normalBorderColor};
  padding: 0.25rem 0;
`;

export const OptionItem = styled.li<{ $isSelected: boolean }>`
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 0.5rem 0.75rem;
  transition: background-color 0.1s;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 0.5rem;

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
  color: gray;
  display: block;
`;

export const MultiSelectTagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
`;

export const MultiSelectTag = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background-color: #d3d3d3ff;
  padding: 0.125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #3b3a3aff;
`;

export const ErrorText = styled.span`
  display: block;
  color: ${errorColor};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
