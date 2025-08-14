import { css, styled } from "styled-components";
import type { CheckboxVariant } from "./Checkbox.types";

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

export const StyledCheckbox = styled.div<{
  $checked: boolean;
  $variant?: CheckboxVariant;
  $error?: boolean;
  $indeterminate?: boolean;
}>`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid gray;
  border-radius: 0.15rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $checked }) => ($checked ? "gray" : "white")};

  ${({ $variant, $checked, $error }) => {
    switch ($variant) {
      case "solid":
        return css`
          background-color: ${$checked ? "black" : "white"};
          border-color: ${$error ? "red" : $checked ? "black" : "lightgray"};
        `;
      case "subtle":
        return css`
          background-color: ${$checked ? "lightgray" : "lightgray"};
          border-color: ${$error ? "red" : "lightgray"};
        `;
      case "outline":
      default:
        return css`
          background-color: transparent;
          border-color: ${$error ? "red" : "lightgray"};
        `;
    }
  }}

  &:after {
    content: ${({ $checked, $indeterminate }) =>
      $indeterminate ? '"-"' : $checked ? '"✓"' : '""'};
    color: ${({ $variant }) => ($variant === "solid" ? "white" : "#444")};
    font-size: 1rem;
    line-height: 1.2rem;
  }
`;

export const CheckboxLabel = styled.span`
  font-size: 1rem;
`;
