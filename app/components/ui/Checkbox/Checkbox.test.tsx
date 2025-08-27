import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox component", () => {
  it("renders with label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText("Accept terms")).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<Checkbox />);
    expect(screen.queryByText("Accept terms")).not.toBeInTheDocument();
  });

  it("is unchecked by default", () => {
    render(<Checkbox />);
    const input = screen.getByRole("checkbox");
    expect(input).not.toBeChecked();
  });

  it("respects checked prop", () => {
    render(<Checkbox checked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("fires onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    const input = screen.getByRole("checkbox");
    fireEvent.click(input);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies indeterminate aria-checked", () => {
    render(<Checkbox indeterminate />);
    const input = screen.getByRole("checkbox");
    expect(input).toHaveAttribute("aria-checked", "mixed");
  });

  it("applies aria-invalid when error is true", () => {
    render(<Checkbox error />);
    const input = screen.getByRole("checkbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
