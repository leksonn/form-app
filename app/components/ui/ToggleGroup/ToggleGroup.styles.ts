import { css, styled } from "styled-components";
const errorColor = "#e53e3e";

export const ErrorText = styled.span`
  display: block;
  color: ${errorColor};
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const ToggleGroupContainer = styled.div`
  display: flex;
  background-color: transparent;
  border-radius: 8px;
  overflow: hidden;

`;

export const ToggleButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 10px 15px;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  color: #495057;
  background-color: transparent;
  border: 0.5px solid #c5cbd1ff;
  max-width: 80px;

  &:hover {
    background-color: #dee2e6;
  }

  ${(props) =>
    props.$active &&
    css`
      background-color: #dadadaff;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

      &:hover {
        background-color: #cacacaff;
      }
    `}

  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;
