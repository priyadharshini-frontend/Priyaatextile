import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 Characters"),
  email: z.string().email("Invalid email Address"),
  password: z.string().min(8, "Password must be atleast 8 characters"),
});

export const loginSchema = registerSchema.pick({
  email: true,
  password: true,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;