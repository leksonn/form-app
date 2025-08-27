import { fireEvent, render, screen } from "@testing-library/react";
import { createRef, useState } from "react";
import { Input } from "./Input";

describe("Input component", () => {
  it("renders without crashing", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("accepts value and onChange (controlled)", () => {
    const TestComponent = () => {
      const [val, setVal] = useState("");
      return (
        <Input
          placeholder="Name"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      );
    };

    render(<TestComponent />);
    const input = screen.getByPlaceholderText("Name") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Lejla" } });
    expect(input.value).toBe("Lejla");
  });

  it("renders helper text when provided", () => {
    render(<Input placeholder="Email" helperText="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("applies error styling when error is true", () => {
    render(<Input placeholder="Email" helperText="Invalid email" error />);
    const helper = screen.getByText("Invalid email");

    expect(helper).toHaveStyle("color: rgb(229, 62, 62)");
  });

  it("renders an icon when provided", () => {
    const Icon = () => <span data-testid="icon">⭐</span>;
    render(<Input placeholder="Search" icon={<Icon />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("supports ref forwarding", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input placeholder="Ref test" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
