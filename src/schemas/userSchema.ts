import { z } from 'zod';

export const userRegistrationSchema = z
  .object({
    firstName: z
      .string({ required_error: "Name is required" })
      .min(2, { message: "Name must be at least 2 characters" }),

    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),

    age: z.coerce
      .number({
        required_error: "Age is required",
        invalid_type_error: "Must be a number",
      })
      .min(18, { message: "Must be at least 18 years old" })
      .max(100, { message: "Must be less than 100 years old" }),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
      .regex(/[0-9]/, { message: "Must contain at least one digit" }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

export type userRegistrationFormData = z.infer<typeof userRegistrationSchema>;