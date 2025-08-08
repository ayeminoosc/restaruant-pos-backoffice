export type InventoryItem = {
  id: number;
  Code: string;
  Name: string;
  Category: string;
  Stock: number;
  Unit: string;
  Reorder: number;
  Vendor: string;
  Status: "In stock" | "Out of stock" | "Low stock";
};

export type stockAleart = {
    name: string;
    status: string;
    level: string;
    remaining: string;
}

export type InventorySummary = {
  totalItems: number;
  totalItemsChange: string;
  vendors: number;
  vendorsChange: string;
  warehouses: number;
  warehousesChange: string;
};
