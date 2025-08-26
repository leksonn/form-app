import {
  MultiStepFormProvider,
  useMultiStepForm,
} from "../components/FormWrapper/MultiStepFormContext";
import { DEFAULT_STEPS } from "../components/Steps/config";
import {
  BASE_FIELDS,
  MEDICAL_HISTORY_FIELDS,
  STEP_TWO_FIELDS,
} from "../config";

const MultiStepForm = () => {
  const { currentStep } = useMultiStepForm();
  const StepComponent = DEFAULT_STEPS[currentStep]?.component;
  return StepComponent ? <StepComponent /> : null;
};

export default function Home() {
  const allFields = [
    ...BASE_FIELDS,
    ...MEDICAL_HISTORY_FIELDS,
    ...STEP_TWO_FIELDS,
  ];

  return (
    <MultiStepFormProvider steps={DEFAULT_STEPS.length} allFields={allFields}>
      <MultiStepForm />
    </MultiStepFormProvider>
  );
}
