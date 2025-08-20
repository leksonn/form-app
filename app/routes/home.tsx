import {
  FormWrapper,
  type FieldConfig,
} from "../components/FormWrapper/FormWrapper";

export default function Home() {
  const fields: FieldConfig[] = [
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
      placeholder: "Select your height",
    },
    {
      type: "multiselect",
      name: "medical conditions",
      label: "Existing Medical Conditions",
      options: [
        { value: "diabetes", label: "Diabetes" },
        { value: "heart disease", label: "Heart Disease" },
        { value: "high blood pressure", label: "High Blood Pressure" },
        { value: "asthma", label: "Asthma" },
        { value: "cancer", label: "Cancer" },
        { value: "kidney disease", label: "Kidney Disease" },
        { value: "chronic pain", label: "Chronic Pain" },
      ],
      placeholder: "Select medical conditions",
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
        fields={fields}
        onSubmit={handleSubmit}
        submitText="Continue"
        initialValues={{ nicotine: false }}
      />
    </div>
  );
}
