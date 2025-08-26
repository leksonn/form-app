import { z } from "zod";
import { DisplayWrapper } from "../components/DisplayWrapper/DisplayWrapper";
import {
  FormWrapper,
  type FieldConfig,
} from "../components/FormWrapper/FormWrapper";
import {
  MultiStepFormProvider,
  useMultiStepForm,
} from "../components/FormWrapper/MultiStepFormContext";
import { Button } from "../components/ui/Button";
import {
  BASE_FIELDS,
  MEDICAL_HISTORY_FIELDS,
  STEP_TWO_FIELDS,
} from "../config";
import { useSnackbar } from "../root";
import { STEP_ONE_SCHEMA, STEP_TWO_SCHEMA } from "../schemas/formSchema";

const StepOne = () => {
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

const StepTwo = () => {
  const { formData, updateFormData, nextStep, prevStep } = useMultiStepForm();

  const handleSubmit = (values: z.infer<typeof STEP_TWO_SCHEMA>) => {
    updateFormData(values);
    console.log("Form Data Submitted:", { ...formData, ...values });
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
      <>
        <Button
          onClick={prevStep}
          type="button"
          variant="outline"
          color="blue"
          style={{ marginBottom: "1.5rem" }}
        >
          Previous
        </Button>
      </>
    </FormWrapper>
  );
};

const StepThree = () => {
  return <DisplayWrapper />;
};

const MultiStepForm = () => {
  const { currentStep } = useMultiStepForm();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepOne />;
      case 1:
        return <StepTwo />;
      case 2:
        return <StepThree />;
      default:
        return null;
    }
  };

  return <>{renderStep()}</>;
};

export default function Home() {
  const { showSnackbar } = useSnackbar();

  const allFields: FieldConfig[] = [
    ...BASE_FIELDS,
    ...MEDICAL_HISTORY_FIELDS,
    ...STEP_TWO_FIELDS,
  ];

  return (
    <MultiStepFormProvider steps={3} allFields={allFields}>
      <MultiStepForm />
    </MultiStepFormProvider>
  );
}
