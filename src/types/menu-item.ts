export interface MenuItemType {
  id?: string;
  name: string;
  bilingualName?: string;
  barCode: string;
  price: string;
  categoryId: string;
  subcategoryId?: string;
  photo?: string;
  modifiers: {
    enabled: boolean;
    modifierGroups: string[];
  };
  prefixes: {
    enabled: boolean;
    selectedPrefixes: string[];
  };
  advancedSettings: {
    connectToRecipes: boolean;
    connectToInventory: boolean;
    inventoryItems: InventoryItem[];
  };
  buttonColor: string;
  active: boolean;
}

export interface InventoryItem {
  id?: string;
  inventoryName: string;
  stock: string;
  unit: string;
}

export interface CategoryType {
  id: string;
  name: string;
  subcategories?: SubcategoryType[];
}

export interface SubcategoryType {
  id: string;
  name: string;
  categoryId: string;
}

export type MenuItemStoreState = {
  menuitems: {
    items: MenuItemType[];
    singleItem: MenuItemType | null;
  };
  categories: CategoryType[];
  subcategories: SubcategoryType[];
  isFetching: boolean;
  isSubmitting: boolean;
  status: "idle" | "success" | "error";
  error: string;
};

export type MenuItemStoreActions = {
  getMenuItemsData: () => Promise<void>;
  getSingleMenuItemData: (id: string) => Promise<void>;
  createMenuItem: (data: MenuItemType) => Promise<void>;
  updateMenuItem: (id: string, data: MenuItemType) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  getCategoriesData: () => Promise<void>;
  getSubcategoriesData: () => Promise<void>;
  getSubcategoriesByCategory: (categoryName: string) => Promise<void>;
  resetStatus: () => void;
};