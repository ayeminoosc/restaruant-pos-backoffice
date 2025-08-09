import * as z from "zod";

export const adjustStockSchema = z.object({
  adjustItem: z.array(z.string()).min(1, "Adjust Item is required"),

  adjustQty: z
    .string()
    .min(1, { message: "Quantity is required" })
    .refine(
      (val) => {
        const num = Number.parseFloat(val);
        return !isNaN(num) && num > 0;
      },
      { message: "Quanity must be a valid positive number" }
    ),

  reason: z.array(z.string()).min(1, "Reason is required"),

  note: z
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

  status: z.boolean(),
});
