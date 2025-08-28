import { z } from "zod";
import { BASE_FIELDS, MEDICAL_HISTORY_FIELDS } from "../../config";
import { STEP_ONE_SCHEMA } from "../../schemas/formSchema";
import { FormWrapper } from "../FormWrapper/FormWrapper";
import { useMultiStepForm } from "../FormWrapper/MultiStepFormContext";

export const StepOne = () => {
  const { formData, updateFormData, nextStep } = useMultiStepForm();

  const fields = [
    ...BASE_FIELDS,
    ...MEDICAL_HISTORY_FIELDS.map((field) => ({
      ...field,
      dependsOn: { field: "medicalHistory", value: true },
    })),
  ];

  const handleSubmit = (values: z.infer<typeof STEP_ONE_SCHEMA>) => {
    updateFormData(values);
    nextStep();
  };

  return (
    <FormWrapper
      title="Step 1: Get a No Exam Term Life Insurance Quote"
      description="Apply online in minutes. Get an instant decision. Then personalize your coverage."
      fields={fields}
      onSubmit={handleSubmit}
      submitText="Next"
      initialValues={formData}
      validationSchema={STEP_ONE_SCHEMA}
    />
  );
};
