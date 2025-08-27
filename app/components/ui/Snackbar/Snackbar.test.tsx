import { render, screen } from "@testing-library/react";
import { Snackbar } from "./Snackbar";

describe("Snackbar component", () => {
  it("does not render when isVisible is false", () => {
    render(<Snackbar message="Hello" isVisible={false} />);
    expect(screen.queryByText("Hello")).not.toBeInTheDocument();
  });

  it("renders the message when isVisible is true", () => {
    render(<Snackbar message="Hello" isVisible={true} />);
    const snackbar = screen.getByText("Hello");
    expect(snackbar).toBeInTheDocument();
  });

  it("renders multiple messages correctly", () => {
    render(<Snackbar message="Test message" isVisible={true} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
  });

  it("matches snapshot when visible", () => {
    const { container } = render(<Snackbar message="Hello" isVisible={true} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
