import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Prefix, PrefixStore } from "@/types/prefix";
import { ENDPOINTS } from "@/utils/api-endpoints";

const initialState: PrefixStore = {
  prefixes: [],
  loading: false,
  isSubmitting: false,
  error: null,
  status: "idle",
  searchQuery: "",

  fetchPrefixes: async () => {},
  deletePrefix: async () => {},
  addPrefix: async () => {},
  editPrefix: async () => {},
  resetStatus: () => {},
  setSearchQuery: () => {},
};

 const setLoading = (set: any, key: "loading" | "isSubmitting") => {
  set((state: PrefixStore) => {
    state[key] = true;
    state.status = "idle";
    state.error = "";
  });
};

 const setError = (set: any, error: string) => {
  set((state: PrefixStore) => {
    state.error = error;
    state.status = "error";
  });
};

const resetLoading = (set: any, key: "loading" | "isSubmitting") => {
  set((state: PrefixStore) => {
    state[key] = false;
  });
};

export const usePrefixStore = create<PrefixStore>()(
  persist(
    immer((set) => ({
      ...initialState,
      fetchPrefixes: async () => {
        setLoading(set, "loading");
        try {
          const res = await fetch(ENDPOINTS.getPrefixes);
          if (!res.ok) throw new Error("Failed to fetch prefixes");
          const data: Prefix[] = await res.json();
          set((state) => {
            state.prefixes = data;
          });
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Something went wrong";
          setError(set, message);
        } finally {
          resetLoading(set, "loading");
        }
      },

      deletePrefix: async (id) => {
        setLoading(set, "isSubmitting");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.deletePrefix(id), {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Failed to delete prefix");
          set((state) => {
            state.prefixes = state.prefixes.filter((p) => p.id !== id);
            state.status = "success";
          });
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Something went wrong";
          setError(set, message);
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },

      addPrefix: async (data) => {
        setLoading(set, "isSubmitting");
        try {
          const res = await fetch(ENDPOINTS.addPrefix, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error("Failed to add prefix");
          const newPrefix: Prefix = await res.json();
          set((state) => {
            state.prefixes.push(newPrefix);
            state.status = "success";
          });
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Something went wrong";
          setError(set, message);
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },

      editPrefix: async (id, updatedPrefix) => {
        setLoading(set, "isSubmitting");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.updatePrefix(id), {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPrefix),
          });
          if (!res.ok) throw new Error("Failed to update prefix");
          set((state) => {
            state.prefixes = state.prefixes.map((p) =>
              p.id === id ? updatedPrefix : p
            );
            state.status = "success";
          });
        } catch (err: unknown) {
          const message =
            err instanceof Error ? err.message : "Something went wrong";
          setError(set, message);
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },
      setSearchQuery: (key) => set({ searchQuery: key }),

      resetStatus: () => {
        set((state) => {
          state.status = "idle";
          state.error = null;
        });
      },
    })),
    {
      name: "prefix-store",
    }
  )
);
