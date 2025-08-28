import { StepOne } from "./StepOne";
import { StepThree } from "./StepThree";
import { StepTwo } from "./StepTwo";

export interface StepAction {
  type: "next" | "previous" | "submit";
  text?: string;
}

export interface StepConfig {
  id: string;
  component: React.ComponentType;
  label: string;
  actions?: StepAction[];
}

export const DEFAULT_STEPS: StepConfig[] = [
  {
    id: "step-1",
    component: StepOne,
    label: "Step 1",
    actions: [{ type: "next", text: "Next" }],
  },
  {
    id: "step-2",
    component: StepTwo,
    label: "Step 2",
    actions: [
      { type: "previous", text: "Previous" },
      { type: "submit", text: "Submit" },
    ],
  },
  {
    id: "step-3",
    component: StepThree,
    label: "Step 3",
  },
];
