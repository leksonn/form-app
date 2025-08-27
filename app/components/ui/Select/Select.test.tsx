import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { vi } from "vitest";
import { Select } from "./Select";

const OPTIONS = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
];

describe("Select component", () => {
  it("renders without crashing and includes placeholder option", () => {
    render(<Select options={OPTIONS} placeholder="Choose a fruit" />);
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select).toBeInTheDocument();

    const placeholderOption = screen.getByText(
      "Choose a fruit"
    ) as HTMLOptionElement;
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption.value).toBe("");
  });

  it("renders options correctly", () => {
    render(<Select options={OPTIONS} />);
    expect(screen.getByRole("option", { name: "Apple" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Banana" })).toBeInTheDocument();
  });

  it("accepts value and onChange (controlled)", () => {
    const handleChange = vi.fn();
    render(
      <Select
        options={OPTIONS}
        value="banana"
        onChange={handleChange}
        placeholder="Choose a fruit"
      />
    );
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe("banana");

    fireEvent.change(select, { target: { value: "apple" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: select })
    );
  });

  it("renders helper text when error is true", () => {
    render(<Select options={OPTIONS} error helperText="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("supports ref forwarding", () => {
    const ref = createRef<HTMLSelectElement>();
    render(<Select ref={ref} options={OPTIONS} />);
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it("displays label in placeholder option if placeholder not provided", () => {
    render(<Select options={OPTIONS} label="Fruit" />);
    const placeholderOption = screen.getByText("Fruit") as HTMLOptionElement;
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption.value).toBe("");
  });
});
