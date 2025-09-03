import z from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(3, "Name must be atleast 3 characters")
    .max(20, "Name must be no more than 20 characters")
    .regex(/^[A-Za-z]+$/, "Name must contain only alphabets"),
  email: z.email("Invalid email"),
  password: z
    .string()
    .min(6, "password must be at least 6 characters")
    .max(10, "password must be no more than 10 characters")
    .regex(/^[A-Za-z0-9]+$/, "Password should not contain special characters"),
});
