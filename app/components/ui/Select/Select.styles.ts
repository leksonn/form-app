import { styled } from "styled-components";

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SelectLabel = styled.label`
  font-size: 1rem;
  color: #333;
`;

export const StyledSelect = styled.select`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    border-color: gray;
    outline: none;
  }
`;
