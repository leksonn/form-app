import { useState } from "react";
import { FormWrapper } from "../components/FormWrapper/FormWrapper";
import { BASE_FIELDS, MEDICAL_HISTORY_FIELDS } from "../config";
import { useSnackbar } from "../root";
import { formSchema, type FormValues } from "../schemas/formSchema";

export default function Home() {
  const { showSnackbar } = useSnackbar();

  const initialFormState = {
    nicotine: false,
    medicalHistory: false,
  };

  const [currentFormValues, setCurrentFormValues] =
    useState<Record<string, unknown>>(initialFormState);

  const finalFields = [
    ...BASE_FIELDS,
    ...(currentFormValues.medicalHistory ? MEDICAL_HISTORY_FIELDS : []),
  ];

  const resetHomeForm = () => {
    setCurrentFormValues(initialFormState);
  };

  const handleSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
    resetHomeForm();
    showSnackbar("Form submitted successfully!");
  };

  return (
    <div style={{ margin: "0 auto", padding: "1rem", gap: "1rem" }}>
      <FormWrapper<FormValues>
        title="Get a No Exam Term Life Insurance Quote"
        description="Apply online in minutes. Get an instant decision. Then personalize your
        coverage."
        fields={finalFields}
        onSubmit={handleSubmit}
        submitText="Continue"
        initialValues={currentFormValues}
        onValuesChange={setCurrentFormValues}
        validationSchema={formSchema}
      />
    </div>
  );
}
