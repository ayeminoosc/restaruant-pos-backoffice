const BASE_URL = "http://macmini-acfsoft:8585/dynarest";

export interface InventoryItem {
  id: string;
  name: string;
  stock?: number;
  unit?: string;
}

export const inventoryApi = {
  async getInventoryItems(): Promise<InventoryItem[]> {
    try {
      const response = await fetch(`${BASE_URL}/inventory/1.0/inventory-items`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching inventory items:', error);
      return [];
    }
  }
}; 