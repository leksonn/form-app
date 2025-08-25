import { z } from "zod";

export const STEP_ONE_SCHEMA = z.object({
  birthDate: z
    .string()
    .min(1, "Birthdate is required")
    .refine((val) => !isNaN(Date.parse(val)), "Invalid date format")
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return birthDate <= eighteenYearsAgo;
    }, "You must be at least 18 years old"),

  height: z.string().min(1, "Please select your height"),

  weight: z
    .string()
    .min(1, "Weight is required")
    .refine((val) => Number(val) > 0, "Weight must be greater than 0")
    .refine((val) => {
      const weight = Number(val);
      return weight >= 20 && weight <= 600;
    }, "Weight must be between 20 and 600 lbs"),

  zip: z
    .string()
    .min(1, "ZIP code is required")
    .refine((val) => /^\d{5}$/.test(val), "ZIP must be exactly 5 digits")
    .refine(
      (val) => val !== "00000",
      "Invalid ZIP code. Please enter a valid 5-digit ZIP"
    ),

  nicotine: z.boolean().default(false),
  medicalHistory: z.boolean().default(false),

  surgeries: z
    .preprocess((val) => {
      if (val === "" || val == null) return undefined;
      return val;
    }, z.array(z.string()).optional())
    .optional(),

  prescriptions: z
    .preprocess((val) => {
      if (val === "" || val == null) return undefined;
      return val;
    }, z.boolean().optional())
    .optional(),
});

export const STEP_TWO_SCHEMA = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
      "First name can only contain letters, spaces, hyphens, or apostrophes"
    ),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .regex(
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
      "Last name can only contain letters, spaces, hyphens, or apostrophes"
    ),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(
      /^\+?[0-9]{10,15}$/,
      "Invalid phone number format (use digits, optional +)"
    ),

  email: z
    .string()
    .min(1, "Email is required")
    .max(100, "Email is too long")
    .email("Invalid email address"),
});

export const formSchema = z.object({}).passthrough();

export type FormValues = z.infer<typeof formSchema>;
