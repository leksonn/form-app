import { useState } from "react";
import {
  FormWrapper,
  type FieldConfig,
} from "../components/FormWrapper/FormWrapper";

export default function Home() {
  const [currentFormValues, setCurrentFormValues] = useState<
    Record<string, unknown>
  >({
    nicotine: false,
    medicalHistory: false,
  });

  const baseFields: FieldConfig[] = [
    {
      type: "date",
      name: "birthDate",
      label: "Date of Birth",
      size: "medium",
      variant: "outline",
    },
    {
      type: "select",
      name: "height",
      label: "Height (cm)",
      options: Array.from({ length: 81 }, (_, i) => ({
        value: (140 + i).toString(),
        label: `${140 + i} cm`,
      })),
      props: {
        placeholder: "Select your height",
      },
    },
    {
      type: "input",
      name: "weight",
      label: "Weight (lbs)",
      props: { placeholder: "Enter your weight", type: "number" },
    },
    {
      type: "input",
      name: "zip",
      label: "Zip code",
      props: { placeholder: "Enter your zip code" },
    },
    {
      type: "checkbox",
      name: "nicotine",
      label: "I currently use nicotine products",
      props: {},
    },
    {
      type: "checkbox",
      name: "medicalHistory",
      label: "I have a relevant medical history",
      props: {},
    },
  ];

  const medicalHistoryFields: FieldConfig[] = [
    {
      type: "select",
      name: "surgeries",
      label: "Past Surgeries",
      options: [
        { value: "bypass", label: "Bypass Surgery" },
        { value: "appendectomy", label: "Appendectomy" },
      ],
      placeholder: "Select surgery",
    },
    {
      type: "checkbox",
      name: "prescriptions",
      label: "I currently use prescriptions",
      props: {},
    },
  ];

  const finalFields = [
    ...baseFields,
    ...(currentFormValues.medicalHistory ? medicalHistoryFields : []),
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
