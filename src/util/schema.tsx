import { z } from "zod";

export const metadataSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title cannot exceed 100 characters"),

  category: z.string().optional(),

  description: z
    .string()
    .max(300, "Description cannot exceed 300 characters")
    .optional(),

  tags: z
    .array(z.string().min(1))
    .max(10, "You can add up to 10 tags only"),
});
