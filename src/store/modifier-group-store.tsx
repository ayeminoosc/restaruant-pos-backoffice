import { ModifierGroupsType } from "@/types/modifier-group";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type ModifierGroupsState = {
  modifierGroups: ModifierGroupsType[];
  singleModifierGroup: ModifierGroupsType | null;
  isFetching: boolean;
  isSubmitting: boolean;
  status: "idle" | "success" | "error";
  error: string;
};

type Actions = {
  getModifierGroupsData: () => Promise<void>;
  getSingleModifierGroupsData: (id: string) => Promise<void>;
  createModifierGroup: (data: ModifierGroupsType) => Promise<void>;
  updateModifierGroup: (id: string, data: ModifierGroupsType) => Promise<void>;
  deleteModifierGroup: (id: string) => Promise<void>;
  resetStatus: () => void;
};

const initialState: ModifierGroupsState = {
  modifierGroups: [],
  singleModifierGroup: null,
  isFetching: false,
  isSubmitting: false,
  status: "idle",
  error: "",
};

export const useModifierGroupStore = create<ModifierGroupsState & Actions>()(
  persist(
    immer((set) => ({
      ...initialState,
      getModifierGroupsData: async () => {
        set((state) => {
          state.isFetching = true;
          state.error = "";
        });
        try {
          const res = await fetch(`${API_BASE}/modifier-groups/1/modifier`);
          if (!res.ok) throw new Error("Failed to fetch modifier group data");
          const data = await res.json();
          set((state) => {
            state.modifierGroups = data;
          });
        } catch (err: any) {
          set((state) => {
            state.error = err.message || "Something went wrong";
          });
        } finally {
          set((state) => {
            state.isFetching = false;
          });
        }
      },
      getSingleModifierGroupsData: async (id) => {
        set((state) => {
          state.isFetching = true;
          state.error = "";
        });
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(
            `${API_BASE}/modifier-groups/1/modifier/${id}`
          );
          if (!res.ok)
            throw new Error("Failed to fetch single modifier group data");
          const data = await res.json();
          set((state) => {
            state.singleModifierGroup = data;
          });
        } catch (err: any) {
          set((state) => {
            state.error = err.message || "Something went wrong";
            return undefined;
          });
        } finally {
          set((state) => {
            state.isFetching = false;
          });
        }
      },
      createModifierGroup: async (groupData) => {
        set((state) => {
          state.isSubmitting = true;
          state.status = "idle";
          state.error = "";
        });
        try {
          const res = await fetch(`${API_BASE}/modifier-groups/1/modifier`, {
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
        } catch (err: any) {
          set((state) => {
            state.error = err.message || "Something went wrong";
            state.status = "error";
          });
        } finally {
          set((state) => {
            state.isSubmitting = false;
          });
        }
      },
      updateModifierGroup: async (id, groupData) => {
        set((state) => {
          state.isSubmitting = true;
          state.status = "idle";
          state.error = "";
        });
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(
            `${API_BASE}/modifier-groups/1/modifier/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(groupData),
            }
          );
          if (!res.ok) throw new Error("Failed to update  modifier group ");
          const data = await res.json();
          set((state) => {
            state.modifierGroups = state.modifierGroups.map((item) =>
              item.id === id ? data : item
            );
            state.status = "success";
          });
        } catch (err: any) {
          set((state) => {
            state.error = err.message || "Something went wrong";
            state.status = "error";
          });
        } finally {
          set((state) => {
            state.isSubmitting = false;
          });
        }
      },
      deleteModifierGroup: async (id) => {
        set((state) => {
          state.isSubmitting = true;
          state.status = "idle";
          state.error = "";
        });
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(
            `${API_BASE}/modifier-groups/1/modifier/${id}`,
            {
              method: "DELETE",
            }
          );
          if (!res.ok) throw new Error("Failed to delete modifier group ");
          set((state) => {
            state.modifierGroups = state.modifierGroups.filter(
              (item) => item.id !== id
            );
            state.status = "success";
          });
        } catch (err: any) {
          set((state) => {
            state.error = err.message || "Something went wrong";
            state.status = "error";
          });
        } finally {
          set((state) => {
            state.isSubmitting = false;
          });
        }
      },
      resetStatus: () =>
        set((state) => {
          state.status = "idle";
        }),
    })),
    { name: "modifier-groups-store" }
  )
);
