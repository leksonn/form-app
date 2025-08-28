import { useMultiStepForm } from "../FormWrapper/MultiStepFormContext";
import { StepRenderer } from "../Steps/StepRenderer";
import { DYNAMIC_STEPS } from "../Steps/config";

export const MultiStepForm = () => {
  const { currentStep } = useMultiStepForm();

  const currentStepConfig = DYNAMIC_STEPS[currentStep];

  if (!currentStepConfig) {
    return <div>Form completed!</div>;
  }

  return (
    <div>
      <StepRenderer step={currentStepConfig} />
    </div>
  );
};
