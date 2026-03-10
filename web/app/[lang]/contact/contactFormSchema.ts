// components/contact/contactFormSchema.ts
import * as z from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(1, "Full Name is required."),
  countryCode: z.string().min(1, "Please select a country code."),
  phoneNumber: z
    .string()
    .min(1, "Phone Number is required.")
    .regex(
      /^[0-9\s\-()]*$/,
      "Invalid phone number format. Only numbers, spaces, hyphens, and parentheses allowed.",
    ),
  companyName: z.string().optional().or(z.literal("")),
  serviceEnquiry: z.string().min(1, "Please select a service."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message cannot exceed 500 characters."),
  preferredCommunication: z.enum(["whatsapp", "telegram", "email", "phone"], {
    required_error: "Please select a preferred communication method.",
  }),
});

export type ContactFormInputs = z.infer<typeof contactFormSchema>;
