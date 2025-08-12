import { css, styled } from "styled-components";

export const StyledInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: lightblue;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.2);
  }
`;
