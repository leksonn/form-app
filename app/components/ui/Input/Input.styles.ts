import { css, styled } from "styled-components";
import type { InputVariant, InputSize } from "./Input.types";

export const StyledInput = styled.input<{ $variant: InputVariant, $size: InputSize }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: lightblue;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  }
  ${({ $variant }) => {
    switch ($variant) {
      case "subtle":
        return css`
          background-color: #f9f9f9;
          border-color: #f9f9f9;

          border-radius: 6px;

          &:focus {
            border-color: #b0b0b0;
            box-shadow: 0 0 0 2px rgba(176, 176, 176, 0.2);
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          border-color: #ccc;
          border-radius: 6px;

          &:focus {
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
          }
        `;
      case "flushed":
        return css`
          background-color: transparent;
          border: none;
          border-bottom: 2px solid #ccc;
          &:focus {
            border-bottom-color: #007bff;
            box-shadow: none;
          }
        `;
      default:
        return "";
    }
  }}
  ${({ $size }) => {
    switch ($size) {
      case "small":
        return css`
          font-size: 0.875rem;
          padding: 0.25rem 0.5rem;
        `;
      case "medium":
        return css`
          font-size: 1rem;
          padding: 0.5rem 0.75rem;
        `;
      case "large":
        return css`
          font-size: 1.125rem;
          padding: 0.75rem 1rem;
        `;
      default:
        return "";
    }
  }}
`;
