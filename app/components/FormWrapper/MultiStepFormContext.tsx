import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { z } from "zod";
import type { FieldConfig } from "../FormWrapper/FormWrapper";

interface MultiStepFormContextType {
  currentStep: number;
  formData: Record<string, any>;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Record<string, any>) => void;
  resetForm: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isValidStep: (schema: z.ZodSchema) => boolean;
  steps: number;
}

const MultiStepFormContext = createContext<
  MultiStepFormContextType | undefined
>(undefined);

export const useMultiStepForm = () => {
  const context = useContext(MultiStepFormContext);
  if (!context) {
    throw new Error(
      "useMultiStepForm must be used within a MultiStepFormProvider"
    );
  }
  return context;
};

const getInitialCheckboxValues = (
  fields: FieldConfig[]
): Record<string, any> => {
  return fields.reduce(
    (acc, field) => {
      if (field.type === "checkbox") {
        acc[field.name] = false;
      }
      return acc;
    },
    {} as Record<string, any>
  );
};

interface MultiStepFormProviderProps {
  children: ReactNode;
  allFields: FieldConfig[];
  steps: number;
}

export const MultiStepFormProvider = ({
  children,
  allFields,
  steps,
}: MultiStepFormProviderProps) => {
  const initialValues = getInitialCheckboxValues(allFields);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialValues);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps - 1));
  }, [steps]);

  const updateFormData = useCallback((data: Record<string, any>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  }, []);

  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setFormData(initialValues);
  }, [initialValues]);

  const isValidStep = useCallback(
    (schema: z.ZodSchema) => {
      try {
        schema.parse(formData);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error(error.issues);
        }
        return false;
      }
    },
    [formData]
  );

  const isFirstStep = useMemo(() => currentStep === 0, [currentStep]);
  const isLastStep = useMemo(
    () => currentStep === steps - 1,
    [currentStep, steps]
  );

  const value = {
    currentStep,
    formData,
    nextStep,
    prevStep,
    updateFormData,
    resetForm,
    isFirstStep,
    isLastStep,
    isValidStep,
    steps,
  };

  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
};
