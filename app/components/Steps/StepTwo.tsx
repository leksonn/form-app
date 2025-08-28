import { z } from "zod";
import { STEP_TWO_FIELDS } from "../../config";
import { STEP_TWO_SCHEMA } from "../../schemas/formSchema";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { useMultiStepForm } from "../FormWrapper/MultiStepFormContext";

export const StepTwo = () => {
  const { formData, updateFormData, nextStep, prevStep } = useMultiStepForm();

  const handleSubmit = (values: z.infer<typeof STEP_TWO_SCHEMA>) => {
    updateFormData(values);
    console.log("Form Data Submitted: ", { ...formData, ...values });
    nextStep();
  };

  return (
    <FormWrapper
      title="Step 2: Contact Information"
      description="Tell us a little about yourself to get a personalized quote."
      fields={STEP_TWO_FIELDS}
      onSubmit={handleSubmit}
      submitText=""
      initialValues={formData}
      validationSchema={STEP_TWO_SCHEMA}
      actions={[
        { type: "previous", text: "Previous" },
        { type: "submit", text: "Submit" },
      ]}
      onPrevious={prevStep}
      onNext={nextStep}
    />
  );
};
