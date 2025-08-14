import { css, styled } from "styled-components";
import type { SelectVariant } from "./Select.types";

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SelectLabel = styled.label`
  font-size: 0.75rem;
  color: #727272ff;
  margin-right: 1rem;
  padding-right: 3rem;
`;

export const StyledSelect = styled.select<{ $variant?: SelectVariant }>`
  padding: 0.5rem 2rem 0.5rem 0.75rem; 
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #727272ff;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 1rem;

  & option:first-child {
    color: #727272ff; 
  }


  ${({ $variant }) => {
    switch ($variant) {
      case "subtle":
        return css`
          border: none;
          background-color: #f5f4f4ff;
          color: black;
        `;
      case "outline":
      default:
        return css`
          border: 1px solid #c7c6c6ff;
          background-color: white;
          color: black;

          &:focus {
            outline: none;
            border-color: gray;
          }
        `;
    }
  }}
`;
