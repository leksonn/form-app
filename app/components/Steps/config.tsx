import { z } from "zod";
import {
  BASE_FIELDS,
  MEDICAL_HISTORY_FIELDS,
  STEP_TWO_FIELDS,
} from "../../config";
import { STEP_ONE_SCHEMA, STEP_TWO_SCHEMA } from "../../schemas/formSchema";

export interface StepAction {
  type: "next" | "previous" | "submit";
  text?: string;
}

export interface StepConfig {
  id: string;
  label: string;
  actions?: StepAction[];
  title: string;
  description: string;
  fields: any[];
  validationSchema: z.ZodSchema<any>;
}

export const DYNAMIC_STEPS: StepConfig[] = [
  {
    id: "step-1",
    label: "Step 1",
    title: "Step 1: Get a No Exam Term Life Insurance Quote",
    description:
      "Apply online in minutes. Get an instant decision. Then personalize your coverage.",
    actions: [{ type: "next", text: "Next" }],
    fields: [
      ...BASE_FIELDS,
      ...MEDICAL_HISTORY_FIELDS.map((field) => ({
        ...field,
        dependsOn: { field: "medicalHistory", value: true },
      })),
    ],
    validationSchema: STEP_ONE_SCHEMA,
  },
  {
    id: "step-2",
    label: "Step 2",
    title: "Step 2: Contact Information",
    description: "Tell us a little about yourself to get a personalized quote.",
    actions: [
      { type: "previous", text: "Previous" },
      { type: "submit", text: "Submit" },
    ],
    fields: STEP_TWO_FIELDS,
    validationSchema: STEP_TWO_SCHEMA,
  },
  {
    id: "step-3",
    label: "Step 3",
    title: "Step 3: Summary",
    description: "Review your information before submitting.",
    actions: [{ type: "submit", text: "Submit" }],
    fields: [],
    validationSchema: z.object({}),
  },
];
