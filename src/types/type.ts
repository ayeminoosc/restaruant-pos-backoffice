import { z } from "zod"
export interface DataTableProps {
  title?: string;
  columns: string[];
  data: (string | React.ReactNode | boolean)[][];
  add?: ()=> void;
}

export type Prefix = {
  id: string;
  name: string;  
  bilingualName? : string;
  description?:string;
  active: boolean;
  advancedSetting: boolean;
  color?: string;
}


export const prefixFormSchema = z.object({
   name: z.string().min(1, { message: "Prefix name is required." }),
  active: z.boolean(),
  advancedSetting: z.boolean(),
  bilingualName: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
});

export type PrefixFormInput = z.infer<typeof prefixFormSchema>;
