import { styled } from "styled-components";

interface FormHeaderContainerProps {
  $bgColor?: string;
  $color?: string;
  $padding?: string;
}

export const FormHeaderContainer = styled.header<FormHeaderContainerProps>`
  display: flex;
  flex-direction: column;
  text-align: flex-start;
  align-items: flex-start;
  gap: 0.5rem;
  background-color: #5e66fb;
  color: ${({ $color }) => $color || "#fff"};
  padding-right: 6rem;
  padding-left: 6rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export { FormDescription, FormTitle } from "../FormWrapper.styles";
