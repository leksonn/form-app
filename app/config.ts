import { type FieldConfig } from "./components/FormWrapper/FormWrapper";

export const BASE_FIELDS: FieldConfig[] = [
  {
    type: "toggle",
    name: "gender",
    label: "Gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
  },
  {
    type: "date",
    name: "birthDate",
    label: "Date of Birth",
    size: "medium",
    variant: "outline",
  },
  {
    type: "customselect",
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

export const MEDICAL_HISTORY_FIELDS: FieldConfig[] = [
  {
    type: "multiselect",
    name: "surgeries",
    label: "Past Surgeries",
    options: [
      { value: "bypass", label: "Bypass Surgery" },
      { value: "appendectomy", label: "Appendectomy" },
      { value: "cholecystectomy", label: "Cholecystectomy" },
      { value: "general", label: "General Surgery" },
    ],
    placeholder: "Select surgery",
    dependsOn: { field: "medicalHistory", value: true },
  },
  {
    type: "checkbox",
    name: "prescriptions",
    label: "I currently use prescriptions",
    props: {},
    dependsOn: { field: "medicalHistory", value: true },
  },
];
