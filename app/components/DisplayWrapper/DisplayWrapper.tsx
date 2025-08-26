import {
  BASE_FIELDS,
  MEDICAL_HISTORY_FIELDS,
  STEP_TWO_FIELDS,
} from "../../config";
import { useMultiStepForm } from "../FormWrapper/MultiStepFormContext";
import {
  Container,
  DataItem,
  DataList,
  Description,
  Label,
  Title,
  Value,
} from "./DisplayWrapper.styles";

const allFields = [
  ...BASE_FIELDS,
  ...MEDICAL_HISTORY_FIELDS,
  ...STEP_TWO_FIELDS,
];

const getField = (key: string) => allFields.find((f) => f.name === key);

const getLabel = (key: string) => {
  const field = getField(key);
  return field?.label || key.replace(/([A-Z])/g, " $1");
};

const formatValue = (
  key: string,
  value: any,
  formData: Record<string, any>
) => {
  const field = getField(key);

  if (!field) return value;

  if (formData.medicalHistory === false) {
    if (key === "surgeries") return "—";
    if (key === "prescriptions") return "No";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (field.type === "multiselect" && Array.isArray(value)) {
    if (value.length === 0) return "—";
    return value
      .map((val) => {
        const option = field.options?.find((opt: any) => opt.value === val);
        return option ? option.label : val;
      })
      .join(", ");
  }
  return value || "—";
};

export const DisplayWrapper = () => {
  const { formData, resetForm } = useMultiStepForm();

  return (
    <Container>
      <Title>Form Submitted Successfully!</Title>
      <Description>
        Thank you for your submission. Here’s a summary of your information:
      </Description>

      <DataList>
        {Object.entries(formData).map(([key, value]) => (
          <DataItem key={key}>
            <Label>{key.replace(/([A-Z])/g, " $1")}</Label>
            <Value>{formatValue(key, value, formData)}</Value>
          </DataItem>
        ))}
      </DataList>
    </Container>
  );
};

DisplayWrapper.displayName = "DisplayWrapper";
