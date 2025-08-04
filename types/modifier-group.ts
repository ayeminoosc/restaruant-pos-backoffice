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
