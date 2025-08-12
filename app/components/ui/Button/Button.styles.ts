import { css, styled } from "styled-components";
import type { ButtonSize, ButtonVariant, ButtonColorScheme } from "./Button.types";
import { lighten, darken } from "polished";

const colorMap: Record<ButtonColorScheme, { bg: string; text: string }> = {
  blue: { bg: "#305CDE", text: "white" },
  green: { bg: "#2E6F40", text: "white" },
  red: { bg: "#CD1C18", text: "white" },
  pink: { bg: "#FF00FF", text: "white" },
  yellow: { bg: "#D3AF37", text: "white" },
  gray: { bg: "#252525", text: "white" },
};
export const Spinner = styled.div<{ $size: ButtonSize }>`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  display: inline-block;
  width: ${({ $size }) => ($size === 'small' ? '14px' : $size === 'large' ? '18px' : '16px')};
  height: ${({ $size }) => ($size === 'small' ? '14px' : $size === 'large' ? '18px' : '16px')};
  border: 2px solid currentColor;
  border-radius: 50%;
  border-right-color: transparent;
  animation: spin 0.75s linear infinite;
  margin-right: 8px;
  vertical-align: text-bottom;
`;

export const StyledButton = styled.button<{
  $size: ButtonSize;
  $variant: ButtonVariant;
  $colorScheme: ButtonColorScheme;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

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

  ${({ $variant, $colorScheme }) => {
    const { bg, text } = $colorScheme
      ? colorMap[$colorScheme] || colorMap.blue
      : { bg: "black", text: "white" };

    switch ($variant) {
      case "solid":
        return css`
          background: ${bg};
          color: ${text};
          &:hover {
            background: ${darken(0.1, bg)};
          }
        `;
      case "subtle":
        return css`
          background: ${lighten(0.3, bg)};
          color: ${text};
          &:hover {
            background: ${lighten(0.25, bg)};
          }
        `;
      case "surface":
        return css`
          background: ${lighten(0.3, bg)};
          color: ${text};
          border: 1px solid ${lighten(0.2, bg)};
          &:hover {
            background: ${lighten(0.25, bg)};
          }
        `;
      case "outline":
        return css`
          background: transparent;
          color: ${bg};
          border: 1px solid ${bg};
          &:hover {
            background: ${lighten(0.45, bg)};
          }
        `;
      case "ghost":
        return css`
          background: transparent;
          color: ${bg};
          &:hover {
            background: ${lighten(0.45, bg)};
          }
        `;
      case "plain":
        return css`
          background: transparent;
          color: ${bg};
        `;
      default:
        return css`
          background: ${bg};
          color: ${text};
          &:hover {
            background: ${darken(0.1, bg)};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
