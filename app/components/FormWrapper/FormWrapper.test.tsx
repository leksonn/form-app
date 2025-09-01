import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { z } from "zod";
import type { FieldConfig, InputField } from "./FormWrapper";
import { FormWrapper } from "./FormWrapper";

const fields: FieldConfig[] = [
  { name: "firstName", label: "First Name", type: "input" } as InputField,
  { name: "lastName", label: "Last Name", type: "input" } as InputField,
];

describe("FormWrapper", () => {
  it("renders without crashing", () => {
    render(<FormWrapper fields={[]} onSubmit={() => {}} />);
    expect(true).toBe(true);
  });
});
describe("FormWrapper import test", () => {
  it("imports without crashing", () => {
    expect(FormWrapper).toBeDefined();
  });
});
describe("FormWrapper render test", () => {
  it("renders with no fields", () => {
    render(<FormWrapper fields={[]} onSubmit={() => {}} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});

describe("FormWrapper with fields", () => {
  it("renders with fields", () => {
    render(<FormWrapper fields={fields} onSubmit={() => {}} />);
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  });
});

describe("FormWrapper with title and description", () => {
  it("renders with title and description", () => {
    render(
      <FormWrapper
        fields={[]}
        onSubmit={() => {}}
        title="Test Title"
        description="Test Description"
      />
    );
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});

describe("FormWrapper onSubmit", () => {
  it("calls onSubmit when form is submitted", () => {
    const handleSubmit = vi.fn();
    render(<FormWrapper fields={[]} onSubmit={handleSubmit} />);
    fireEvent.submit(screen.getByRole("form"));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
describe("FormWrapper with validation schema", () => {
  it("renders with validation schema", () => {
    const schema = z.object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
    });
    render(
      <FormWrapper
        fields={fields}
        onSubmit={() => {}}
        validationSchema={schema}
      />
    );
    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
  });
});

describe("FormWrapper initialValues", () => {
  it("pre-fills input fields with initial values", () => {
    render(
      <FormWrapper
        fields={fields}
        onSubmit={() => {}}
        initialValues={{ firstName: "John", lastName: "Doe" }}
      />
    );

    expect(screen.getByLabelText("First Name")).toHaveValue("John");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Doe");
  });
});
