import { z } from "zod";

export const formSchema = z.object({
  birthDate: z.string()
    .min(1, "Birthdate is required")
    .refine(val => !isNaN(Date.parse(val)), "Invalid date format"),

  height: z.string()
    .min(1, "Please select your height"),

  weight: z.string()
    .min(1, "Weight is required")
    .refine(val => Number(val) > 0, "Weight must be greater than 0"),

  zip: z.string()
    .min(1, "ZIP code is required")
    .refine(val => /^\d{5}$/.test(val), "ZIP must be exactly 5 digits"),

  nicotine: z.boolean().default(false)
});

export type FormValues = z.infer<typeof formSchema>;
