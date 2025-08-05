import {
  ModifierGroupsStoreActions,
  ModifierGroupsStoreState,
} from "@/types/modifier-group";

export const setLoading = (set: any, key: "isFetching" | "isSubmitting") => {
  set((state: ModifierGroupsStoreState & ModifierGroupsStoreActions) => {
    state[key] = true;
    state.status = "idle";
    state.error = "";
  });
};

export const setError = (set: any, error: string) => {
  set((state: ModifierGroupsStoreState & ModifierGroupsStoreActions) => {
    state.error = error;
    state.status = "error";
  });
};

export const resetLoading = (set: any, key: "isFetching" | "isSubmitting") => {
  set((state: ModifierGroupsStoreState & ModifierGroupsStoreActions) => {
    state[key] = false;
  });
};



