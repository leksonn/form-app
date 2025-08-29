import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import type { FieldConfig } from "../FormWrapper/FormWrapper";
import {
  MultiStepFormProvider,
  useMultiStepForm,
} from "./MultiStepFormContext";

const mockFields: FieldConfig[] = [
  { name: "username", type: "input" },
  { name: "agreeToTerms", type: "checkbox" },
];

const mockSchema = z.object({
  username: z.string().min(1, "Name is required"),
  agreeToTerms: z
    .boolean()
    .refine((val) => val === true, "Must agree to terms"),
});

describe("MultiStepFormContext", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should initialize with the correct default values", () => {
    const { result } = renderHook(() => useMultiStepForm(), {
      wrapper: ({ children }) => (
        <MultiStepFormProvider allFields={mockFields} steps={3}>
          {children}
        </MultiStepFormProvider>
      ),
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
    expect(result.current.formData).toEqual({ agreeToTerms: false });
    expect(result.current.steps).toBe(3);
  });

  it("should navigate between steps correctly", () => {
    const { result } = renderHook(() => useMultiStepForm(), {
      wrapper: ({ children }) => (
        <MultiStepFormProvider allFields={mockFields} steps={3}>
          {children}
        </MultiStepFormProvider>
      ),
    });

    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(0);
  });

  it("should not go below the first step or beyond the last step", () => {
    const { result } = renderHook(() => useMultiStepForm(), {
      wrapper: ({ children }) => (
        <MultiStepFormProvider allFields={mockFields} steps={3}>
          {children}
        </MultiStepFormProvider>
      ),
    });

    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(0);

    act(() => {
      result.current.nextStep();
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(2);
    expect(result.current.isLastStep).toBe(true);

    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(2);
  });

  it("should update form data correctly", () => {
    const { result } = renderHook(() => useMultiStepForm(), {
      wrapper: ({ children }) => (
        <MultiStepFormProvider allFields={mockFields} steps={3}>
          {children}
        </MultiStepFormProvider>
      ),
    });

    act(() => {
      result.current.updateFormData({ username: "John Doe" });
    });
    expect(result.current.formData).toEqual({
      username: "John Doe",
      agreeToTerms: false,
    });

    act(() => {
      result.current.updateFormData({ agreeToTerms: true });
    });
    expect(result.current.formData).toEqual({
      username: "John Doe",
      agreeToTerms: true,
    });
  });

  it("should reset the form to initial state", () => {
    const { result } = renderHook(() => useMultiStepForm(), {
      wrapper: ({ children }) => (
        <MultiStepFormProvider allFields={mockFields} steps={3}>
          {children}
        </MultiStepFormProvider>
      ),
    });

    act(() => {
      result.current.updateFormData({ username: "Jane Doe" });
      result.current.nextStep();
    });
    expect(result.current.formData).toEqual({
      username: "Jane Doe",
      agreeToTerms: false,
    });
    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.resetForm();
    });
    expect(result.current.currentStep).toBe(0);
    expect(result.current.formData).toEqual({ agreeToTerms: false });
  });

  it("should validate the step schema correctly", () => {
    const { result } = renderHook(() => useMultiStepForm(), {
      wrapper: ({ children }) => (
        <MultiStepFormProvider allFields={mockFields} steps={2}>
          {children}
        </MultiStepFormProvider>
      ),
    });

    expect(result.current.isValidStep(mockSchema)).toBe(false);

    act(() => {
      result.current.updateFormData({ username: "Alice", agreeToTerms: true });
    });
    expect(result.current.isValidStep(mockSchema)).toBe(true);

    act(() => {
      result.current.updateFormData({ username: "", agreeToTerms: false });
    });
    expect(result.current.isValidStep(mockSchema)).toBe(false);
  });
});
