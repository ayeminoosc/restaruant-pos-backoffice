import { create } from "zustand";
import { MenuItemType } from "@/types/menu-item";

interface MenuItemDraftState {
  draft: Partial<MenuItemType> | null;
  setDraft: (draft: Partial<MenuItemType>) => void;
  clearDraft: () => void;
  clearDraftOnManualNavigation: () => void; // For manual cancel/back buttons
}

export const useMenuItemDraftStore = create<MenuItemDraftState>((set) => ({
  draft: null,
  setDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: null }),
  clearDraftOnManualNavigation: () => set({ draft: null }), // Same as clearDraft but semantically different
}));