import {
  FormWrapper,
  type FieldConfig,
} from "../components/FormWrapper/FormWrapper";
import { useSnackbar } from "../root";

export default function Home() {
  const { showSnackbar } = useSnackbar();

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
  ];

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted:", values);
    showSnackbar("Form submitted successfully!");
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
