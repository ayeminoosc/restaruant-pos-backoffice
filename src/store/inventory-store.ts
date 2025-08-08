import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { InventoryItem, stockAleart, InventorySummary} from '../types/inventory-item';
import { ENDPOINTS } from "@/utils/api-endpoints";

type InventoryStore = {
  items: InventoryItem[];
  stockAlerts: stockAleart[];
  summary: InventorySummary | null;

  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "error" | "success";

  fetchInventoryData: () => Promise<void>;
  resetStatus: () => void;
};

export const useInventoryStore = create<InventoryStore>()(
  persist(
    immer((set) => ({
      items: [],
      stockAlerts: [],
      summary: null,

      loading: false,
      error: null,
      status: "idle",

      fetchInventoryData: async () => {
        set((state) => {
          state.loading = true;
          state.status = "loading";
          state.error = null;
        });

        try {
          const summaryRes = await fetch(ENDPOINTS.getInventorySummary);
          if (!summaryRes.ok) throw new Error("Failed to fetch summary");
          const summaryData: InventorySummary []= await summaryRes.json();

          const alertsRes = await fetch(ENDPOINTS.getAlertStocks);
          if (!alertsRes.ok) throw new Error("Failed to fetch stock alerts");
          const alertsData: stockAleart[] = await alertsRes.json();

        
          const itemsRes = await fetch(ENDPOINTS.getInventoryItems);
          if (!itemsRes.ok) throw new Error("Failed to fetch inventory items");
          const itemsData: InventoryItem[] = await itemsRes.json();

          

          set((state) => {
            state.summary = summaryData[0];
            state.stockAlerts = alertsData;
            state.items = itemsData;
            state.status = "success";
          });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Unknown error";
          set((state) => {
            state.error = message;
            state.status = "error";
          });
        } finally {
          set((state) => {
            state.loading = false;
          });
        }
      },

      resetStatus: () => {
        set((state) => {
          state.status = "idle";
          state.error = null;
        });
      },
    })),
    {
      name: "inventory-store",
    }
  )
);
