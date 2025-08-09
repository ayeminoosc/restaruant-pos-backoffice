import * as z from "zod";

export const inventorySchema = z.object({
  name: z
    .string()
    .min(1, "Group name is required")
    .refine((val) => /^[A-Za-z\s]+$/.test(val), {
      message: "Group name must contain only letters",
    })
    .min(2, "Group name must be at least 2 characters"),

  bilingualName: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val && val.trim() !== "") {
          return /^[A-Za-z\s]+$/.test(val) && val.length >= 2;
        }
        return true;
      },
      {
        message:
          "Bilingual name must be at least 2 characters and contain only letters when provided",
      }
    ),

  description: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val && val.trim() !== "") {
          return /^[A-Za-z0-9\s]+$/.test(val) && val.length >= 10;
        }
        return true;
      },
      {
        message:
          "Description must be at least 10 characters and contain only letters and numbers when provided",
      }
    ),

  barCode: z
    .string()
    .min(1, "Barcode is required")
    .refine((val) => /^[A-Za-z0-9\s]+$/.test(val) && val.length >= 4, {
      message:
        "Must be at least 4 characters and contain only letters and numbers.",
    }),

  unit: z.string().min(1, "Unit is required"),

  reorderLevel: z
    .string()
    .min(1, "Record level is required")
    .refine(
      (val) => val === "" || (!isNaN(Number(val)) && Number(val) > 0),
      "Record level must be a valid positive number"
    ),

  group: z.array(z.string()).optional(),

  status: z.boolean(),
});
