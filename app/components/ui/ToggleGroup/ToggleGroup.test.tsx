import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { ToggleGroup } from "./ToggleGroup";

const OPTIONS = [
  { label: "Option A", value: "a" },
  { label: "Option B", value: "b" },
  { label: "Option C", value: "c" },
];

describe("ToggleGroup component", () => {
  const onChangeMock = vi.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it("renders all toggle options", () => {
    render(<ToggleGroup options={OPTIONS} value="" onChange={onChangeMock} />);
    OPTIONS.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("sets the active state correctly", () => {
    render(<ToggleGroup options={OPTIONS} value="b" onChange={onChangeMock} />);
    const activeButton = screen.getByText("Option B");

    const styles = getComputedStyle(activeButton);

    expect(styles.backgroundColor).not.toBe("transparent");
  });

  it("calls onChange when a button is clicked", () => {
    render(<ToggleGroup options={OPTIONS} value="" onChange={onChangeMock} />);
    const button = screen.getByText("Option C");
    fireEvent.click(button);
    expect(onChangeMock).toHaveBeenCalledWith("c");
  });

  it("renders error message when error and helperText are provided", () => {
    render(
      <ToggleGroup
        options={OPTIONS}
        value=""
        onChange={onChangeMock}
        error
        helperText="Selection is required"
      />
    );
    expect(screen.getByText("Selection is required")).toBeInTheDocument();
  });

  it("does not render error message if error is false", () => {
    render(
      <ToggleGroup
        options={OPTIONS}
        value=""
        onChange={onChangeMock}
        error={false}
        helperText="Should not show"
      />
    );
    expect(screen.queryByText("Should not show")).not.toBeInTheDocument();
  });

  it("handles empty value correctly", () => {
    render(<ToggleGroup options={OPTIONS} value="" onChange={onChangeMock} />);
    OPTIONS.forEach((option) => {
      const button = screen.getByText(option.label);
      expect(button).not.toHaveAttribute("aria-pressed", "true");
    });
  });
});
