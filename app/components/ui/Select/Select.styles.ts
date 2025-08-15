import { css, styled } from "styled-components";
import type { SelectSize, SelectVariant } from "./Select.types";

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SelectLabel = styled.label`
  font-size: 0.75rem;
  color: #727272ff;
  padding-right: 3rem;
`;

export const StyledSelect = styled.select<{
  $variant?: SelectVariant;
  $size?: SelectSize;
}>`
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #727272ff;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s;

  & option:first-child {
    color: #727272ff;
  }

  ${({ $variant }) => {
    switch ($variant) {
      case "subtle":
        return css`
          border: none;
          background-color: #f5f4f4ff;
          color: 6b7280;
        `;
      case "outline":
      default:
        return css`
          border: 1px solid #ddd;
          background-color: transparent;
          color: 6b7280;

          &:focus {
            outline: none;
            border-color: #ccc;
          }
        `;
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
        return css`
          font-size: 1rem;
          padding: 0.5rem 0.75rem;
        `;
    }
  }}
`;
