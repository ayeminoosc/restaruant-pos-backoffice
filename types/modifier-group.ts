export interface TableRowType {
  name: string;
  type: "Single" | "Multiple";
  required: "Required" | "Optional";
  modifierItems: number;
  selectionRange: {
    min: number;
    max: number;
  };
  status: "Active" | "InActive";
}

export interface ModifierItem {
  name: string;
  price: string; // Change price to number
}
