import { DEFAULT_STEPS } from "../Steps/config";
import { useMultiStepForm } from "./MultiStepFormContext";

export const MultiStepForm = () => {
  const { currentStep, nextStep, prevStep } = useMultiStepForm();
  const stepConfig = DEFAULT_STEPS[currentStep];

  if (!stepConfig) return null;

  const StepComponent = stepConfig.component;

  const handleActionClick = (type: string) => {
    switch (type) {
      case "next":
      case "submit":
        nextStep();
        break;
      case "previous":
        prevStep();
        break;
    }
  };

  return (
    <>
      <StepComponent />
    </>
  );
};
