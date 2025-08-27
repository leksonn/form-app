import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import { PasswordInput } from "./PasswordInput";

describe("PasswordInput component", () => {
  it("renders without crashing", () => {
    render(<PasswordInput aria-label="password" />);
    const input = screen.getByLabelText("password") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
  });

  it("accepts value and onChange (controlled)", () => {
    const handleChange = vi.fn();
    render(
      <PasswordInput
        value="secret"
        onChange={handleChange}
        aria-label="password"
      />
    );
    const input = screen.getByLabelText("password") as HTMLInputElement;

    expect(input.value).toBe("secret");

    fireEvent.change(input, { target: { value: "newSecret" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders helper text when provided", () => {
    render(<PasswordInput helperText="Enter password" />);
    const helper = screen.getByText("Enter password");
    expect(helper).toBeInTheDocument();
  });

  it("applies error styling when error is true", () => {
    render(<PasswordInput helperText="Invalid" error />);
    const helper = screen.getByText("Invalid");
    expect(helper).toHaveStyle("color: rgb(229, 62, 62)");
  });

  it("supports ref forwarding", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<PasswordInput ref={ref} aria-label="password" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("toggles password visibility when icon is clicked", () => {
    render(<PasswordInput aria-label="password" />);
    const input = screen.getByLabelText("password") as HTMLInputElement;

    expect(input).toHaveAttribute("type", "password");

    const toggleIcon = screen.getByText((_, node) => node?.tagName === "SPAN");
    fireEvent.click(toggleIcon);

    expect(input).toHaveAttribute("type", "text");

    fireEvent.click(toggleIcon);
    expect(input).toHaveAttribute("type", "password");
  });
});
