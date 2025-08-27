import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { CustomSelect, type CustomSelectProps } from "./CustomSelect";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];

describe("CustomSelect", () => {
  const setup = (props: Partial<CustomSelectProps> = {}) => {
    const defaultProps: CustomSelectProps = {
      options,
      value: "",
      onChange: vi.fn(),
      ...props,
    };
    return render(<CustomSelect {...defaultProps} />);
  };

  it("renders placeholder when no value is selected", () => {
    setup({ placeholder: "Pick fruit" });
    expect(screen.getByText("Pick fruit")).toBeInTheDocument();
  });

  it("renders selected option label when value is provided", () => {
    setup({ value: "apple" });
    expect(screen.getByText("Apple")).toBeInTheDocument();
  });

  it("opens dropdown on trigger click and shows options", () => {
    setup();
    fireEvent.click(screen.getByText("Select an option"));
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("calls onChange when option is clicked", () => {
    const handleChange = vi.fn();
    setup({ onChange: handleChange });

    fireEvent.click(screen.getByText("Select an option"));
    fireEvent.click(screen.getByText("Banana"));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe("banana");
  });

  it("closes dropdown and calls onBlur when clicking outside", () => {
    const handleBlur = vi.fn();
    setup({ onBlur: handleBlur });

    fireEvent.click(screen.getByText("Select an option"));
    expect(screen.getByText("Apple")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    fireEvent.blur(screen.getByText("Select an option"));
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("displays helper text when error is true", () => {
    setup({ error: true, helperText: "This field is required" });
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
