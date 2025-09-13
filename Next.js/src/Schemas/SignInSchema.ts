import z from "zod";

export const SignInSchema = z.object({
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(6, "password must be at least 6 characters")
    .max(10, "password must be no more than 10 characters")
    .regex(/^[A-Za-z0-9]+$/, "Password should not contain special characters"),
});
