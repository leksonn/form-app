import { useState } from "react";
import { FormWrapper } from "../components/FormWrapper/FormWrapper";
import { BASE_FIELDS, MEDICAL_HISTORY_FIELDS } from "../config";

export default function Home() {
  const [currentFormValues, setCurrentFormValues] = useState<
    Record<string, unknown>
  >({
    nicotine: false,
    medicalHistory: false,
  });

  const finalFields = [
    ...BASE_FIELDS,
    ...(currentFormValues.medicalHistory ? MEDICAL_HISTORY_FIELDS : []),
  ];

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted:", values);
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "1rem",
        gap: "1rem",
      }}
    >
      <FormWrapper
        title="Get a No Exam Term Life Insurance Quote"
        description="Apply online in minutes. Get an instant decision. Then personalize your
        coverage."
        fields={finalFields}
        onSubmit={handleSubmit}
        submitText="Continue"
        initialValues={currentFormValues}
        onValuesChange={setCurrentFormValues}
      />
    </div>
  );
}
