import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import { DateInput } from "./DateInput";

describe("DateInput component", () => {
  it("renders without crashing", () => {
    render(<DateInput aria-label="date" />);
    const input = screen.getByLabelText("date") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "date");
  });

  it("accepts value and onChange (controlled)", () => {
    const handleChange = vi.fn();
    render(
      <DateInput value="2025-08-27" onChange={handleChange} aria-label="date" />
    );
    const input = screen.getByLabelText("date") as HTMLInputElement;

    expect(input.value).toBe("2025-08-27");

    fireEvent.change(input, { target: { value: "2025-09-01" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders helper text when provided", () => {
    render(<DateInput helperText="Pick a date" />);
    const helper = screen.getByText("Pick a date");
    expect(helper).toBeInTheDocument();
  });

  it("applies error styling when error is true", () => {
    render(<DateInput helperText="Invalid date" error />);
    const helper = screen.getByText("Invalid date");
    expect(helper).toHaveStyle("color: rgb(229, 62, 62)");
  });

  it("supports ref forwarding", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<DateInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
