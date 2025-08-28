import { styled } from "styled-components";

export const FormContainer = styled.form`
  max-width: 70%;
  margin: 0 auto;
  padding: 2rem;
  background: rgba(248, 246, 246, 1);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #fff;
  text-align: center;
`;

export const FormDescription = styled.p`
  font-size: 1rem;
  color: #fff;
  text-align: center;
  margin-bottom: 2rem;
`;

export const FormField = styled.div`
  margin-bottom: 1.5rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

export const FormCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const FormCheckboxLabel = styled.label`
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #333;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;

export const ErrorText = styled.span`
  color: #ff4d4f;
  font-size: 0.875rem;
  margin-top: 4px;
  display: block;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;
