import { css, styled } from "styled-components";
import type { InputSize, InputVariant } from "./Input.types";

const errorColor = "#e53e3e";
const normalBorderColor = "#6b7280";
const subtleBorderColor = "transparent";
const subtleFocusBorderColor = "#b0b0b0";
const outlineBorderColor = "#ddd";
const focusColor = "#3182ce";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const HelperText = styled.span<{ $error?: boolean }>`
  font-size: 0.75rem;
  color: ${({ $error }) => ($error ? errorColor : normalBorderColor)};
`;

export const IconWrapper = styled.div<{
  $hasIcon: boolean;
  $size: InputSize;
  $clickable?: boolean;
}>`
  align-items: center;
  position: relative;

  svg,
  img {
    position: relative;
    top: 50%;
    transform: translateY(-70%);
    ${({ $clickable }) => !$clickable && "pointer-events: none;"}
    color: ${normalBorderColor};
    font-size: 1rem;
    left: ${({ $size }) => {
      switch ($size) {
        case "small":
          return "0.5rem";
        case "medium":
          return "0.75rem";
        case "large":
          return "1rem";
        default:
          return "0.75rem";
      }
    }};
  }
`;

export const StyledInput = styled.input<{
  $variant: InputVariant;
  $size: InputSize;
  $error: boolean;
  $hasIcon: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.5rem 0.75rem;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? "2.5rem" : "0.75rem")};
  background-color: ${({ $variant }) =>
    $variant === "subtle" ? "#f9f9f9" : "transparent"};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  ${({ $variant, $error }) => {
    switch ($variant) {
      case "subtle":
        return css`
          border: 1px solid ${subtleBorderColor};
          &:focus {
            border-color: ${$error ? errorColor : subtleFocusBorderColor};
            box-shadow: 0 0 0 2px rgba(176, 176, 176, 0.2);
          }
        `;
      case "outline":
        return css`
          border: 1px solid ${$error ? errorColor : outlineBorderColor};
          &:focus {
            border-color: ${$error ? errorColor : focusColor};
            box-shadow: 0 0 0 2px
              ${$error ? `${errorColor}80` : `${focusColor}40`};
          }
        `;
      case "flushed":
        return css`
          border: none;
          border-bottom: 1px solid ${$error ? errorColor : normalBorderColor};
          border-radius: 0;
          background-color: transparent;
          &:focus {
            border-bottom-width: 2px;
            border-bottom-color: ${$error ? errorColor : focusColor};
            box-shadow: none;
          }
        `;
      default:
        return css`
          border: 1px solid ${$error ? errorColor : normalBorderColor};
          &:focus {
            border-color: ${$error ? errorColor : focusColor};
            box-shadow: 0 0 0 2px
              ${$error ? `${errorColor}80` : `${focusColor}40`};
          }
        `;
    }
  }}

  ${({ $size, $hasIcon }) => {
    switch ($size) {
      case "small":
        return css`
          font-size: 0.875rem;
          padding: 0.25rem 0.5rem;
          padding-left: ${$hasIcon ? "2rem" : "0.5rem"};
        `;
      case "medium":
        return css`
          font-size: 1rem;
          padding: 0.5rem 0.75rem;
          padding-left: ${$hasIcon ? "2.5rem" : "0.75rem"};
        `;
      case "large":
        return css`
          font-size: 1.125rem;
          padding: 0.75rem 1rem;
          padding-left: ${$hasIcon ? "3rem" : "1rem"};
        `;
      default:
        return "";
    }
  }}
`;
