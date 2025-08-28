import { StepOne } from "./StepOne";
import { StepThree } from "./StepThree";
import { StepTwo } from "./StepTwo";

export const DEFAULT_STEPS = [
  { id: "step-1", component: StepOne, label: "Step 1" },
  { id: "step-2", component: StepTwo, label: "Step 2" },
  { id: "step-3", component: StepThree, label: "Step 3" },
];
