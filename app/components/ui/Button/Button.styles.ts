import { css, styled } from "styled-components";
import type { ButtonSize, ButtonVariant } from "./Button.types";

export const StyledButton = styled.button<{
  $size: ButtonSize;
  $variant: ButtonVariant;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: navy;
  color: white;

  ${({ $size }) => {
    switch ($size) {
      case "small":
        return css`
          padding: 6px 12px;
          font-size: 12px;
          height: 32px;
          min-width: 80px;
        `;
      case "medium":
        return css`
          padding: 8px 16px;
          font-size: 14px;
          height: 40px;
          min-width: 100px;
        `;
      case "large":
        return css`
          padding: 10px 20px;
          font-size: 16px;
          height: 48px;
          min-width: 120px;
        `;
      default:
        return css`
          padding: 8px 16px;
          font-size: 14px;
          height: 40px;
          min-width: 100px;
        `;
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case "solid":
        return css`
          background: black;
          color: white;

          &:hover {
            background: #333;
          }
        `;
      case "subtle":
        return css`
          background: #ddd;
          &:hover {
            background: #ccc;
          }
          color: black;
        `;
      case "surface":
        return css`
          background: #ddd;
          &:hover {
            background: #ccc;
          }
          color: black;
          border: 1px solid #ccc;
        `;
      case "outline":
        return css`
          background: transparent;
          &:hover {
            background: #ddd;
          }
          color: black;
          border: 1px solid #ccc;
        `;
      case "ghost":
        return css`
          background: transparent;
          &:hover {
            background: #ddd;
          }
          color: black;
        `;
      case "plain":
        return css`
          background: transparent;
          color: black;
        `;
      default:
        return css`
          background: black;
          color: white;

          &:hover {
            background: #333;
          }
        `;
    }
  }}


  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
