import { z } from "zod";
import { DisplayWrapper } from "../DisplayWrapper/DisplayWrapper";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { useMultiStepForm } from "../FormWrapper/MultiStepFormContext";
import { type StepConfig } from "./config";

interface StepRendererProps {
  step: StepConfig;
}

export const StepRenderer: React.FC<StepRendererProps> = ({ step }) => {
  const { formData, updateFormData, nextStep, prevStep } = useMultiStepForm();

  const isFormStep = step.fields && step.fields.length > 0;

  const handleSubmit = (values: z.infer<typeof step.validationSchema>) => {
    const finalData = { ...formData, ...values };
    if (step.id === "step-1" && !finalData.medicalHistory) {
      finalData.surgeries = [];
      finalData.prescriptions = false;
    }

    updateFormData(finalData);
    if (step.id === "step-2") {
      console.log("Final Form Data:", finalData);
    }
    nextStep();
  };

  if (isFormStep) {
    return (
      <FormWrapper
        title={step.title}
        description={step.description}
        fields={step.fields}
        onSubmit={handleSubmit}
        submitText=""
        initialValues={formData}
        validationSchema={step.validationSchema}
        actions={step.actions}
        onPrevious={prevStep}
        onNext={nextStep}
      />
    );
  } else {
    return <DisplayWrapper />;
  }
};
