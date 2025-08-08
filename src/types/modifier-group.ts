export interface ModifierGroupsType {
  id?: string;
  groupName: string;
  bilingualName?: string;
  price: string;
  minSelection: string;
  maxSelection: string;
  selectionType: "single" | "multiple";
  required: "yes" | "no";
  buttonColor: string;
  status: boolean;
  modifierItems: { name: string; price: string }[];
}

export type ModifierGroupsStoreState = {
  modifierGroups: ModifierGroupsType[];
  singleModifierGroup: ModifierGroupsType | null;
  isFetching: boolean;
  isSubmitting: boolean;
  status: "idle" | "success" | "error";
  error: string;
  searchTerm: string;
};

export type ModifierGroupsStoreActions = {
  getModifierGroupsData: () => Promise<void>;
  getSingleModifierGroupsData: (id: string) => Promise<void>;
  createModifierGroup: (data: ModifierGroupsType) => Promise<void>;
  updateModifierGroup: (id: string, data: ModifierGroupsType) => Promise<void>;
  deleteModifierGroup: (id: string) => Promise<void>;
  resetStatus: () => void;
  setSearchTerm: (term: string) => void;
};
