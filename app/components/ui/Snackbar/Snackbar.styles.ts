import { styled } from "styled-components";

export const StyledSnackbar = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #404040ff;
  color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
  white-space: nowrap;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  left: 50%;
  transform: translateX(-50%);
`;
