import * as z from "zod";

export const modifierGroupSchema = z.object({
  groupName: z
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

  price: z
    .string()
    .min(1, "Price is required")
    .refine((val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Price must be a valid positive number"),

  minSelection: z
    .string()
    .min(1, "Min selection is required")
    .refine((val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num >= 0;
    }, "Min selection must not be negative number"),

  maxSelection: z
    .string()
    .min(1, "Max selection is required")
    .refine((val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Max selection must be a valid positive number"),

  selectionType: z.enum(["single", "multiple"]).refine((val) => val, {
    message: "Selection type is required",
  }),

  required: z.enum(["yes", "no"]).refine((val) => val, {
    message: "Required field is required",
  }),

  buttonColor: z
    .string()
    .min(1, "Color is required")
    .refine((val) => /^#([0-9A-F]{3}){1,2}$/i.test(val), {
      message: "Invalid color format",
    }),

  active: z.boolean(),
});

export const modifierModelSchema = z.object({
  name: z
    .string()
    .min(1, "Modifier name is required")
    .refine((val) => /^[A-Za-z\s]+$/.test(val), {
      message: "Modifier name must contain only letters",
    })
    .min(2, "Modifier name must be at least 2 characters"),

  price: z
    .string() // Keep as string for form input, convert to number on submit
    .min(1, "Price is required")
    .refine((val) => {
      const num = Number.parseFloat(val);
      return !isNaN(num) && num > 0;
    }, "Price must be a valid positive number"),
});
