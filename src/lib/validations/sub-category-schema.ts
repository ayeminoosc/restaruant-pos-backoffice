import * as z from "zod";

export const subCategorySchema = z.object({
    categoryName: z.string().min(1, "Category selection is required"),
    subCategoryName: z.string()
        .min(1, "SubCategory name is required")
        .min(2, "SubCategory name must be at least 2 characters"),
    bilingualName: z.string().optional(),
    active: z.boolean().default(true),
    buttonColor: z.string().default("#FF5722"),
});