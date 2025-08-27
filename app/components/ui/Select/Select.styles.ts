import { css, styled } from "styled-components";
import type { SelectSize, SelectVariant } from "./Select.types";

interface StyledSelectProps {
  $variant?: SelectVariant;
  $size?: SelectSize;
  $error?: boolean;
}

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const SelectLabel = styled.label`
  font-size: 0.75rem;
  color: #727272ff;
`;

export const StyledSelect = styled.select<StyledSelectProps>`
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid ${({ $error }) => ($error ? "#ff4d4f" : "#ccc")};
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #727272ff;
  background-color: #fcfbfbff;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${({ $error }) => ($error ? "#ff4d4f" : "#40a9ff")};
    box-shadow: ${({ $error }) =>
      $error
        ? "0 0 0 2px rgba(255, 77, 79, 0.2)"
        : "0 0 0 2px rgba(24, 144, 255, 0.2)"};
  }

  & option:first-child {
    color: #727272ff;
  }

  ${({ $variant }) =>
    $variant === "subtle" &&
    css`
      border: none;
      background-color: #f5f4f4ff;
    `}

  ${({ $size }) => {
    switch ($size) {
      case "small":
        return css`
          font-size: 0.875rem;
          padding: 0.25rem 0.5rem;
        `;
      case "large":
        return css`
          font-size: 1.125rem;
          padding: 0.75rem 1rem;
        `;
      default:
        return css`
          font-size: 1rem;
          padding: 0.5rem 0.75rem;
        `;
    }
  }}
`;

export const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;
