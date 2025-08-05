import { create } from "zustand";
import { Prefix } from "@/types/type";
import { prefixFormSchema } from "@/types/type";
import { z } from "zod";
import { ENDPOINTS } from '../config';

type PrefixFormInput = z.infer<typeof prefixFormSchema>;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;
interface PrefixStore {
  prefixes: Prefix[];
  loading: boolean;
  isSubmitting: boolean;
  error: string | null;
  status: "idle" | "success" | "error";

  fetchPrefixes: () => Promise<void>;
  deletePrefix: (id: number | string) => Promise<void>;
  addPrefix: (data: Partial<Prefix> | PrefixFormInput) => Promise<void>;
  editPrefix: (id: number | string, updatedPrefix: Prefix) => Promise<void>;
  resetStatus: () => void;
}

export const usePrefixStore = create<PrefixStore>((set) => ({
  prefixes: [],
  loading: false,
  isSubmitting: false,
  error: null,
  status: "idle",

  fetchPrefixes: async () => {
     console.log('Endpoiontsget', ENDPOINTS.getPrefixes)
    set({ loading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/mockprefixes/1.0/prefixes`);
      if (!res.ok) throw new Error("Failed to fetch prefixes");
      const data: Prefix[] = await res.json();
      set({ prefixes: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deletePrefix: async (id) => {
    set({ isSubmitting: true, error: null, status: "idle" });
    try {
      const response = await fetch(`${API_BASE}/mockprefixes/1.0/prefixes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete prefix");
      set((state) => ({
        prefixes: state.prefixes.filter((prefix) => prefix.id !== id),
        isSubmitting: false,
        status: "success",
      }));
    } catch (error: any) {
      console.error("Delete failed:", error);
      set({
        isSubmitting: false,
        status: "error",
        error: error.message || "Unknown error",
      });
    }
  },

  addPrefix: async (data) => {
    set({ isSubmitting: true, error: null, status: "idle" });
    try {
      const response = await fetch(`${API_BASE}/mockprefixes/1.0/prefixes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add prefix");
      const newPrefix: Prefix = await response.json();
      set((state) => ({
        prefixes: [...state.prefixes, newPrefix],
        isSubmitting: false,
        status: "success",
      }));
    } catch (error: any) {
      console.error("Add failed:", error);
      set({
        isSubmitting: false,
        status: "error",
        error: error.message || "Unknown error",
      });
    }
  },

  editPrefix: async (id, updatedPrefix) => {
    set({ isSubmitting: true, error: null, status: "idle" });
    try {
      const response = await fetch(`${API_BASE}/mockprefixes/1.0/prefixes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPrefix),
      });

      if (!response.ok) throw new Error("Failed to update prefix");
      set((state) => ({
        prefixes: state.prefixes.map((prefix) =>
          prefix.id === id ? updatedPrefix : prefix
        ),
        isSubmitting: false,
        status: "success",
      }));
    } catch (error: any) {
      console.error("Edit failed:", error);
      set({
        isSubmitting: false,
        status: "error",
        error: error.message || "Unknown error",
      });
    }
  },

  resetStatus: () => {
    set({ status: "idle", error: null });
  },
}));
