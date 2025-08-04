import {create} from "zustand"
import { ENDPOINTS } from "@/config"
import { Prefix } from "@/types/type"
import { prefixFormSchema } from "@/types/type"
import { z } from "zod"


interface PrefixStore {
  prefixes: Prefix[];
  loading: boolean;
  error: string | null;
  fetchPrefixes: () => Promise<void>;
  deletePrefix: (id: number | string) => Promise<void>;
  addPrefix: (data: Partial<Prefix>) => Promise<void>;
  editPrefix: (id: number | string, updatedPrefix: Prefix ) => Promise<void>}

type PrefixFormInput = z.infer<typeof prefixFormSchema>;


export const usePrefixStore = create<PrefixStore>((set) => ({
  prefixes: [],
  loading: false,
  error: null,
  fetchPrefixes: async (): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(ENDPOINTS.getPrefixes);
      if (!res.ok) throw new Error('Failed to fetch prefixes');
      const data: Prefix[] = await res.json();
      set({ prefixes: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deletePrefix: async (id: number | string): Promise<void> => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(ENDPOINTS.deletePrefix(id), {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete prefix');
      }

      set((state) => ({
        prefixes: state.prefixes.filter((prefix) => prefix.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  },

  addPrefix: async (data: Partial<Prefix> | PrefixFormInput): Promise<void> => {
    try {
      const response = await fetch(ENDPOINTS.addPrefix, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  },

   editPrefix: async (id: string | number, updatedPrefix: Prefix) => {
  set({ loading: true, error: null });
  try {
    const response = await fetch(ENDPOINTS.updatePrefix(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPrefix),
    });

    if (!response.ok) {
      throw new Error('Failed to update prefix');
    }

    // Update store state if needed
    set((state) => ({
      prefixes: state.prefixes.map((prefix) =>
        prefix.id === id ? updatedPrefix : prefix
      ),
      loading: false,
    }));
  } catch (error: any) {
    console.error("Edit failed:", error);
    set({ loading: false, error: error.message || "Unknown error" });
  }
},

}));