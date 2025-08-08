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

  
 /* ---------- Inventory ----------- */
  getInventoryItems: `${API_BASE_URL}/inventory-allItems/1.0/allItems`,
  getInventorySummary: `${API_BASE_URL}/inventory-summary/1.0/inventory-summary`,
  getAlertStocks: `${API_BASE_URL}/stock-alert/1.0/stock-alert`,
};
 