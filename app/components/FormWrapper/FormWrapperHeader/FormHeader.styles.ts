import { styled } from "styled-components";

interface FormHeaderContainerProps {
  $bgColor?: string;
  $color?: string;
  $padding?: string;
}

export const FormHeaderContainer = styled.header<FormHeaderContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #4a48d2ff;
  color: ${({ $color }) => $color || "#fff"};
  padding: ${({ $padding }) => $padding};
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

export { FormDescription, FormTitle } from "../FormWrapper.styles";
