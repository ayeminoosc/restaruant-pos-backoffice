import * as z from "zod";

export const prefixFormSchema = z.object({
   name: z.string().min(1, { message: "Prefix name is required." }),
  active: z.boolean(),
  advancedSetting: z.boolean(),
  bilingualName: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
});

export type PrefixFormInput = z.infer<typeof prefixFormSchema>;