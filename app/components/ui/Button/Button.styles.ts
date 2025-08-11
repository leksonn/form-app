import { styled } from 'styled-components';

export const StyledButton = styled.button`
  background: navy;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: black;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;