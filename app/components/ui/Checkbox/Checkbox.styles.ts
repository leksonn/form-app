import { styled } from "styled-components";

export const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  user-select: none;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const StyledCheckbox = styled.div<{ $checked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid gray;
  border-radius: 0.25rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $checked }) => ($checked ? "gray" : "white")};

  &:after {
    content: ${({ $checked }) => ($checked ? '"✓"' : '""')};
    color: white;
    font-size: 1.2rem;
    line-height: 1.2rem;
  }
  &:hover {
    border-color: gray;
  }
`;

export const CheckboxLabel = styled.span`
  font-size: 1rem;
`;
