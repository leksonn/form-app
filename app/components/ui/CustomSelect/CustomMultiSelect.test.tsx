import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import {
  CustomMultiSelect,
  type CustomMultiSelectProps,
} from "./CustomMultiSelect";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

describe("CustomMultiSelect", () => {
  const setup = (props: Partial<CustomMultiSelectProps> = {}) => {
    const defaultProps: CustomMultiSelectProps = {
      options,
      value: [],
      onChange: vi.fn(),
      ...props,
    };
    return render(<CustomMultiSelect {...defaultProps} />);
  };

  it("renders placeholder when no values are selected", () => {
    setup({ placeholder: "Pick fruits" });
    expect(screen.getByText("Pick fruits")).toBeInTheDocument();
  });

  it("renders selected tags when values are provided", () => {
    setup({ value: ["apple", "orange"] });
    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Orange")).toBeInTheDocument();
  });

  it("opens dropdown on trigger click and shows all options", () => {
    setup();
    fireEvent.click(screen.getByText("Select options"));
    options.forEach((opt) =>
      expect(screen.getByText(opt.label)).toBeInTheDocument()
    );
  });

  it("calls onChange when an option is clicked", () => {
    const handleChange = vi.fn();
    setup({ onChange: handleChange });

    fireEvent.click(screen.getByText("Select options"));
    fireEvent.click(screen.getByText("Banana"));

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0]).toEqual(["banana"]);
  });

  it("adds and removes options when clicked multiple times", () => {
    const handleChange = vi.fn();
    setup({ onChange: handleChange, value: ["apple"] });

    const trigger = screen.getByText("Apple").closest("div");
    if (!trigger) throw new Error("Dropdown trigger not found");
    fireEvent.click(trigger);

    const appleOption = screen
      .getAllByText("Apple")
      .find((el) => el.tagName === "LI");
    if (!appleOption) throw new Error("Apple option not found in dropdown");
    fireEvent.click(appleOption);
    expect(handleChange).toHaveBeenLastCalledWith(
      expect.not.arrayContaining(["apple"])
    );

    const bananaOption = screen
      .getAllByText("Banana")
      .find((el) => el.tagName === "LI");
    if (!bananaOption) throw new Error("Banana option not found in dropdown");
    fireEvent.click(bananaOption);
    expect(handleChange).toHaveBeenLastCalledWith(
      expect.arrayContaining(["banana"])
    );
  });

  it("closes dropdown and calls onBlur when clicking outside", () => {
    const handleBlur = vi.fn();
    setup({ onBlur: handleBlur });

    fireEvent.click(screen.getByText("Select options"));
    expect(screen.getByText("Apple")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(handleBlur).toHaveBeenCalled();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });

  it("displays helper text when error is true and no options selected", () => {
    setup({ error: true, helperText: "Please select at least one option" });
    expect(
      screen.getByText("Please select at least one option")
    ).toBeInTheDocument();
  });
});
