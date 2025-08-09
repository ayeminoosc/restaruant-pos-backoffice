import { create } from 'zustand';
import { ENDPOINTS } from "@/utils/api-endpoints";

export type ItemIn = {
    id: string;
    date: string; 
    voucherNo: string;
    vendor: string;
    orderNote?: string;
    itemReceived: Array<{
        itemName: string;
        quantity: number;
        unit: string;
        costPerUnit: number;
    }>;
};

type ItemInStore = {
    itemsIn: ItemIn[];
    isLoading: boolean;
    isSubmitting: boolean;
    status: 'idle' | 'loading' | 'success' | 'error';
    error: string | null;
    fetchItemsIn: () => Promise<void>;
    addItemIn: (data: Partial<ItemIn>) => Promise<void>;
    updateItemInById: (id: string, data: Partial<ItemIn>) => Promise<void>;
    deleteItemInById: (id: string) => Promise<void>;
    resetStatus: () => void;
};

export const useItemInStore = create<ItemInStore>((set, get) => ({
    itemsIn: [],
    isLoading: false,
    isSubmitting: false,
    status: 'idle',
    error: null,

    resetStatus: () => set({ status: 'idle', error: null }),

    fetchItemsIn: async () => {
        set({ isLoading: true });
        try {
            const res = await fetch(ENDPOINTS.getItemIn);
            const data = await res.json();
            set({ itemsIn: data });
        } catch (err) {
            console.error(err);
        } finally {
            set({ isLoading: false });
        }
    },

    addItemIn: async (data) => {
        set({ isSubmitting: true, status: 'loading' });
        try {
            const res = await fetch(ENDPOINTS.addItemIn, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Failed to add item in: ${errorText}`);
            }

            await get().fetchItemsIn();
            set({ status: 'success', isSubmitting: false });
        } catch (err) {
            console.error('Add item in error:', err);
            set({
                status: 'error',
                error: err instanceof Error ? err.message : 'Failed to add item in',
                isSubmitting: false
            });
        }
    },

      updateItemInById: async (id, data) => {
        set({ isSubmitting: true, status: 'loading' });
        try {
          const res = await fetch(ENDPOINTS.updateItemIn(id), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to update item in: ${errorText}`);
          }

          await get().fetchItemsIn();
          set({ status: 'success', isSubmitting: false });
        } catch (err) {
          console.error('Update item in error:', err);
          set({
            status: 'error',
            error: err instanceof Error ? err.message : 'Failed to update item in',
            isSubmitting: false
          });
        }
      },

      deleteItemInById: async (id) => {
        try {
          const res = await fetch(ENDPOINTS.deleteItemIn(id), {
            method: 'DELETE',
          });
          if (!res.ok) throw new Error('Failed to delete item in');
          await get().fetchItemsIn();
        } catch (err) {
          console.error(err);
        }
      },
}));