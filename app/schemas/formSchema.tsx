import { z } from "zod";

export const formSchema = z.object({
  birthDate: z.string()
    .min(1, "Birthdate is required")
    .refine(val => !isNaN(Date.parse(val)), "Invalid date format")
    .refine((val) => {
      const birthDate = new Date(val);
      const today = new Date();
      const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      return birthDate <= eighteenYearsAgo;
    }, "You must be at least 18 years old."),

  height: z.string()
    .min(1, "Please select your height"),

  weight: z.string()
    .min(1, "Weight is required")
    .refine(val => Number(val) > 0, "Weight must be greater than 0")
    .refine(val => {
      const weight = Number(val);
      return weight >= 20 && weight <= 600;
    }, "Weight must be between 20 and 600 lbs."),

  zip: z.string()
    .min(1, "ZIP code is required")
    .refine(val => /^\d{5}$/.test(val), "ZIP must be exactly 5 digits")
    .refine(val => val !== '00000', "Invalid ZIP code. Please enter a valid 5-digit ZIP."),

  nicotine: z.boolean().default(false)
});

export type FormValues = z.infer<typeof formSchema>;