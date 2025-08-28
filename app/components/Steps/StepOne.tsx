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
    const adjustedValues: z.infer<typeof STEP_ONE_SCHEMA> = { ...values };
    if (!adjustedValues.medicalHistory) {
      adjustedValues.surgeries = [];
      adjustedValues.prescriptions = false;

      const finalData = { ...formData, ...adjustedValues };
    }
    const finalData = { ...formData, ...adjustedValues };

    updateFormData(finalData);

    nextStep();
  };

  return (
    <FormWrapper
      title="Step 1: Get a No Exam Term Life Insurance Quote"
      description="Apply online in minutes. Get an instant decision. Then personalize your coverage."
      fields={fields}
      onSubmit={handleSubmit}
      submitText=""
      initialValues={formData}
      validationSchema={STEP_ONE_SCHEMA}
      actions={[{ type: "next", text: "Next" }]}
      onNext={nextStep}
    />
  );
};
