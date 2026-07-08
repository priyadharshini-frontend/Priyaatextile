import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Enter a valid email address"),

  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;