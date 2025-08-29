import { MultiStepForm } from "../components/FormWrapper/MultiStepForm";
import { MultiStepFormProvider } from "../components/FormWrapper/MultiStepFormContext";
import { BASE_FIELDS, MEDICAL_HISTORY_FIELDS, STEP_TWO_FIELDS } from "../config";

export default function Home() {
  const allFields = [...BASE_FIELDS, ...MEDICAL_HISTORY_FIELDS, ...STEP_TWO_FIELDS];

  return (
    <MultiStepFormProvider steps={3} allFields={allFields}>
      <MultiStepForm />
    </MultiStepFormProvider>
  );
}
