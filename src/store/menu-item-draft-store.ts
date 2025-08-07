import { create } from "zustand";
import { MenuItemFormInput } from "@/types/menu-item";

interface MenuItemDraftState {
  draft: Partial<MenuItemFormInput> | null;
  setDraft: (draft: Partial<MenuItemFormInput>) => void;
  clearDraft: () => void;
}

export const useMenuItemDraftStore = create<MenuItemDraftState>((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
}));