import z from "zod";

export const addressSchema=z.object({
     fullname: z.string().min(2, "Full Name is required"),

  phone: z
    .string()
    .min(10, "Phone Number must be 10 digits"),

  addressLine1: z
    .string()
    .min(3, "Address Line 1 is required"),

  addressLine2: z.string().optional(),

  city: z.string().min(2, "City is required"),

  state: z.string().min(2, "State is required"),

  country: z.string().min(2, "Country is required"),

  postalCode: z
    .string()
    .min(6, "Postal Code is required"),
})
