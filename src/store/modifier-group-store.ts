import {
  ModifierGroupsStoreActions,
  ModifierGroupsStoreState,
} from "@/types/modifier-group";
import { ENDPOINTS } from "@/utils/api-endpoints";
import { resetLoading, setError, setLoading } from "@/utils/zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: ModifierGroupsStoreState = {
  modifierGroups: [],
  singleModifierGroup: null,
  isFetching: false,
  isSubmitting: false,
  status: "idle",
  error: "",
  searchTerm: "",
};

export const useModifierGroupStore = create<
  ModifierGroupsStoreState & ModifierGroupsStoreActions
>()(
  persist(
    immer((set, get) => ({
      ...initialState,
      getModifierGroupsData: async () => {
        // if (get().modifierGroups.length > 0) return;
        setLoading(set, "isFetching");
        try {
          const res = await fetch(ENDPOINTS.getModifierGroups);
          if (!res.ok) throw new Error("Failed to fetch modifier group data");
          const data = await res.json();
          set((state) => {
            state.modifierGroups = data;
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(set, err.message);
          } else {
            setError(set, "Something went wrong");
          }
        } finally {
          resetLoading(set, "isFetching");
        }
      },

      getSingleModifierGroupsData: async (id) => {
        setLoading(set, "isFetching");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.getModifierGroupById(id));
          if (!res.ok)
            throw new Error("Failed to fetch single modifier group data");
          const data = await res.json();
          set((state) => {
            state.singleModifierGroup = data;
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(set, err.message);
          } else {
            setError(set, "Something went wrong");
          }
        } finally {
          resetLoading(set, "isFetching");
        }
      },

      createModifierGroup: async (groupData) => {
        setLoading(set, "isSubmitting");
        try {
          const res = await fetch(ENDPOINTS.addModifierGroup, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(groupData),
          });
          if (!res.ok) throw new Error("Failed to create modifier group ");
          const data = await res.json();
          set((state) => {
            state.modifierGroups.push(data);
            state.status = "success";
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(set, err.message);
          } else {
            setError(set, "Something went wrong");
          }
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },

      updateModifierGroup: async (id, groupData) => {
        setLoading(set, "isSubmitting");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.updateModifierGroup(id), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(groupData),
          });
          if (!res.ok) throw new Error("Failed to update  modifier group ");
          const data = await res.json();
          set((state) => {
            state.modifierGroups = state.modifierGroups.map((item) =>
              item.id === id ? data : item
            );
            state.status = "success";
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(set, err.message);
          } else {
            setError(set, "Something went wrong");
          }
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },

      deleteModifierGroup: async (id) => {
        setLoading(set, "isSubmitting");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.deleteModifierGroup(id), {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Failed to delete modifier group ");
          set((state) => {
            state.modifierGroups = state.modifierGroups.filter(
              (item) => item.id !== id
            );
            state.status = "success";
          });
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(set, err.message);
          } else {
            setError(set, "Something went wrong");
          }
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },
      setSearchTerm: (term) => set({ searchTerm: term }),
      resetStatus: () =>
        set((state) => {
          state.status = "idle";
        }),
    })),
    { name: "modifier-groups-store" }
  )
);
