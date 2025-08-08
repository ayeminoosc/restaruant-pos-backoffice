import { PrefixFormInput } from "@/lib/validations/prefix-schema";
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

export interface PrefixStore {
  prefixes: Prefix[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  status: "idle" | "success" | "error";
  searchTerm: string;

  fetchPrefixes: () => Promise<void>;
  deletePrefix: (id: number | string) => Promise<void>;
  addPrefix: (data: PrefixFormInput | Partial<Prefix>) => Promise<void>;
  editPrefix: (id: number | string, updatedPrefix: Prefix) => Promise<void>;
  setSearchTerm: (term: string) => void;
  resetStatus: () => void;
}

