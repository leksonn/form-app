import { fireEvent, render, screen } from "@testing-library/react";
import { type ReactNode } from "react";
import { vi } from "vitest";
import { MultiStepFormContext } from "../FormWrapper/MultiStepFormContext";
import { DisplayWrapper } from "./DisplayWrapper";

vi.mock("react-confetti", () => ({
  default: () => <div data-testid="confetti" />,
}));

const TestProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: any;
}) => {
  return (
    <MultiStepFormContext.Provider value={value}>
      {children}
    </MultiStepFormContext.Provider>
  );
};

const mockFormData = {
  gender: "male",
  birthDate: "1990-01-01",
  medicalHistory: false,
  nicotine: false,
  surgeries: ["Appendix removal"],
  prescriptions: true,
  firstName: "John",
  lastName: "Doe",
  phone: "1234567890",
  email: "john@example.com",
};

const mockResetForm = vi.fn();

describe("DisplayWrapper", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form data fields", () => {
    render(
      <TestProvider
        value={{ formData: mockFormData, resetForm: mockResetForm }}
      >
        <DisplayWrapper />
      </TestProvider>
    );

    Object.keys(mockFormData).forEach((key) => {
      const formattedLabel = key.replace(/([A-Z])/g, " $1");
      expect(
        screen.getByText(new RegExp(formattedLabel, "i"))
      ).toBeInTheDocument();
    });

    expect(screen.getByText(/medical History/i).nextSibling?.textContent).toBe(
      "No"
    );
    expect(screen.getByText(/nicotine/i).nextSibling?.textContent).toBe("No");
    expect(screen.getByText(/prescriptions/i).nextSibling?.textContent).toBe(
      "No"
    );
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
  });

  it("calls resetForm when refresh button is clicked", () => {
    render(
      <TestProvider
        value={{ formData: mockFormData, resetForm: mockResetForm }}
      >
        <DisplayWrapper />
      </TestProvider>
    );

    const resetButton = screen.getByRole("button");
    fireEvent.click(resetButton);

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });
});
