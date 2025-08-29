import { fireEvent, render, screen } from "@testing-library/react";
import { vi, type MockedFunction } from "vitest";
import { z } from "zod";
import { useMultiStepForm } from "../FormWrapper/MultiStepFormContext";
import type { StepConfig } from "./config";
import { StepRenderer } from "./StepRenderer";

vi.mock("../FormWrapper/MultiStepFormContext", () => ({
  useMultiStepForm: vi.fn(),
}));

const mockNextStep = vi.fn();
const mockPrevStep = vi.fn();
const mockUpdateFormData = vi.fn();

const mockFormData = {
  firstName: "John",
  lastName: "Doe",
};

vi.mock("react-confetti", () => {
  return {
    default: () => <div data-testid="confetti-mock" />,
  };
});

describe("StepRenderer", () => {
  beforeEach(() => {
    (
      useMultiStepForm as MockedFunction<typeof useMultiStepForm>
    ).mockReturnValue({
      formData: mockFormData,
      updateFormData: mockUpdateFormData,
      nextStep: mockNextStep,
      prevStep: mockPrevStep,
      resetForm: vi.fn(),
      currentStep: 0,
      isFirstStep: true,
      isLastStep: false,
      isValidStep: vi.fn(() => true),
      steps: 3,
    });
    vi.clearAllMocks();
  });

  it("renders a form step and submits data", () => {
    const step: StepConfig = {
      id: "step-1",
      label: "Step 1",
      title: "Personal Info",
      description: "Enter your details",
      fields: [
        { name: "firstName", label: "First Name", type: "input" },
        { name: "lastName", label: "Last Name", type: "input" },
      ],
      validationSchema: z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
      }),
      actions: [{ type: "next", text: "Next" }],
    };

    render(<StepRenderer step={step} />);

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(mockUpdateFormData).toHaveBeenCalled();
    expect(mockNextStep).toHaveBeenCalled();
  });

  it("renders DisplayWrapper when no fields are provided", () => {
    const step: StepConfig = {
      id: "review",
      label: "Review",
      title: "Review",
      description: "Check your info",
      fields: [],
      validationSchema: z.object({}),
      actions: [],
    };

    render(<StepRenderer step={step} />);

    expect(screen.getByText(/john/i)).toBeInTheDocument();
    expect(screen.getByText(/doe/i)).toBeInTheDocument();
  });
});
