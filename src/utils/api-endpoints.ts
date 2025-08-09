const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ENDPOINTS = {
  /* ---------- Modifier Groups ----------- */
  getModifierGroups: `${API_BASE_URL}/modifier-groups/1/modifier`,
  getModifierGroupById: (id: number | string) =>
    `${API_BASE_URL}/modifier-groups/1/modifier/${id}`,
  addModifierGroup: `${API_BASE_URL}/modifier-groups/1/modifier`,
  updateModifierGroup: (id: number | string) =>
    `${API_BASE_URL}/modifier-groups/1/modifier/${id}`,
  deleteModifierGroup: (id: number | string) =>
    `${API_BASE_URL}/modifier-groups/1/modifier/${id}`,

  /* ---------- Prefixes ----------- */
  getPrefixes: `${API_BASE_URL}/mockprefixes/1.0/prefixes`,
  deletePrefix: (id: number | string) => `${API_BASE_URL}/mockprefixes/1.0/prefixes/${id}`,
  addPrefix: `${API_BASE_URL}/mockprefixes/1.0/prefixes`,
  updatePrefix: (id: number | string) => `${API_BASE_URL}/mockprefixes/1.0/prefixes/${id}`,

  /* ---------- Menu Items ----------- */
  getMenuItems: `${API_BASE_URL}/Menu+Api/1.0/Menu`,
  getMenuItemById: (id: number | string) =>
    `${API_BASE_URL}/Menu+Api/1.0/Menu/${id}`,
  addMenuItem: `${API_BASE_URL}/Menu+Api/1.0/Menu`,
  updateMenuItem: (id: number | string) =>
    `${API_BASE_URL}/Menu+Api/1.0/Menu/${id}`,
  deleteMenuItem: (id: number | string) =>
    `${API_BASE_URL}/Menu+Api/1.0/Menu/${id}`,

  /* ---------- Categories ----------- */
  getCategories: `${API_BASE_URL}/category/1.0/category`,
  getCategoryById: (id: number | string) =>
    `${API_BASE_URL}/category/1.0/category/${id}`,
  addCategory: `${API_BASE_URL}/category/1.0/category`,
  updateCategory: (id: number | string) =>
    `${API_BASE_URL}/category/1.0/category/${id}`,
  deleteCategory: (id: number | string) =>
    `${API_BASE_URL}/category/1.0/category/${id}`,

  /* ---------- Sub-Categories ----------- */
  getSubCategories: `${API_BASE_URL}/subCategory/1.0/subCategory`,
  getSubCategoryById: (id: number | string) =>
    `${API_BASE_URL}/subCategory/1.0/subCategory/${id}`,
  addSubCategory: `${API_BASE_URL}/subCategory/1.0/subCategory`,
  updateSubCategory: (id: number | string) =>
    `${API_BASE_URL}/subCategory/1.0/subCategory/${id}`,
  deleteSubCategory: (id: number | string) =>
    `${API_BASE_URL}/subCategory/1.0/subCategory/${id}`,

  /* ---------- get Inventory ----------- */
  getInventoryItems: `${API_BASE_URL}/inventory-allItems/1.0/allItems`,
  getInventorySummary: `${API_BASE_URL}/inventory-summary/1.0/inventory-summary`,
  getAlertStocks: `${API_BASE_URL}/stock-alert/1.0/stock-alert`,

  /* ---------- Item-In----------- */
  getItemIn: `${API_BASE_URL}/item-in/1.0/item-in`,
  getItemInById: (id: number | string) => `${API_BASE_URL}/item-in/1.0/item/${id}`,
  addItemIn: `${API_BASE_URL}/item-in/1.0/item-in`,
  updateItemIn: (id: number | string) =>
    `${API_BASE_URL}/item-in/1.0/item-in/${id}`,
  deleteItemIn: (id: number | string) =>
    `${API_BASE_URL}/item-in/1.0/item-in/${id}`,

};


