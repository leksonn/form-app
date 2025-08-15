import React from 'react';
import { 
  FormTitle, 
  FormDescription,
  FormHeaderContainer 
} from './FormHeader.styles';

interface FormHeaderProps {
  title?: string;
  description?: string;
  className?: string;
  bgColor?: string;
  color?: string;
  padding?: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ 
  title, 
  description,
  className,
  bgColor,
  color = '#fff',
  padding = '1rem'
}) => {
  if (!title && !description) return null;

  return (
    <FormHeaderContainer 
      className={className}
      $bgColor={bgColor}
      $color={color}
      $padding={padding}
    >
      {title && <FormTitle>{title}</FormTitle>}
      {description && <FormDescription>{description}</FormDescription>}
    </FormHeaderContainer>
  );
};