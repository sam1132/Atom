import * as z from "zod";

export const SignupSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z
    .string()
    .min(8, { message: "Minimun 8 characters" })
    .regex(/[A-Z]/, { message: "At least 1 uppercase letter" })
    .regex(/[a-z]/, { message: "At least 1 lowercase letter" })
    .regex(/[0-9]/, { message: "At least 1 number" })
    .regex(/[@$!%*?&#]/, { message: "At least 1 special letter" }),
});

export const SetupSchema = z.object({
  name: z
    .string()
    .min(3, { message: "At least 3 characters" })
    .max(12, { message: "At most 12 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "No spaces, numbers, or special characters",
    }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
