import { z } from "zod";

export const WaitlistFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address.")
    .max(254, "Email address is too long.")
    .transform((val) => val.toLowerCase().trim()),
});

export type WaitlistFormData = z.infer<typeof WaitlistFormSchema>;
