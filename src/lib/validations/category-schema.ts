import * as z from "zod";

export const categorySchema = z.object({
  categoryName: z.string()
    .min(1, "Category name is required")
    .min(2, "Category name must be at least 2 characters"),
  bilingualName: z.string().optional(),
  active: z.boolean().default(true),
  buttonColor: z.string().default("#FF5722"),
});