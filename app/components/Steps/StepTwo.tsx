import { z } from "zod";
import { STEP_TWO_FIELDS } from "../../config";
import { STEP_TWO_SCHEMA } from "../../schemas/formSchema";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { useMultiStepForm } from "../FormWrapper/MultiStepFormContext";
import { Button } from "../ui/Button";

export const StepTwo = () => {
  const { formData, updateFormData, nextStep, prevStep } = useMultiStepForm();

  const handleSubmit = (values: z.infer<typeof STEP_TWO_SCHEMA>) => {
    updateFormData(values);
    nextStep();
  };

  return (
    <FormWrapper
      title="Step 2: Contact Information"
      description="Tell us a little about yourself to get a personalized quote."
      fields={STEP_TWO_FIELDS}
      onSubmit={handleSubmit}
      submitText="Submit"
      initialValues={formData}
      validationSchema={STEP_TWO_SCHEMA}
    >
      <Button
        onClick={prevStep}
        type="button"
        variant="outline"
        color="blue"
        style={{ marginBottom: "1.5rem" }}
      >
        Previous
      </Button>
    </FormWrapper>
  );
};
