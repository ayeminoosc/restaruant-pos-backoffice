import {
  MenuItemStoreActions,
  MenuItemStoreState,
  MenuItemType,
} from "@/types/menu-item";
import { Category, SubCategory, useCategoryStore } from "./category-store";
import { ENDPOINTS } from "@/utils/api-endpoints";
import { resetLoading, setError, setLoading } from "@/utils/zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: MenuItemStoreState = {
  menuitems: {
    items: [],
    singleItem: null
  },
  categories: [],
  subcategories: [],
  isFetching: false,
  isSubmitting: false,
  status: "idle",
  error: "",
};

export const useMenuItemStore = create<
  MenuItemStoreState & MenuItemStoreActions
>()(
  persist(
    immer((set) => ({
      ...initialState,
      getMenuItemsData: async () => {
        setLoading(set, "isFetching");
        try {
          const res = await fetch(ENDPOINTS.getMenuItems);
          if (!res.ok) throw new Error("Failed to fetch menu items data");
          const data = await res.json();
          set((state) => {
            state.menuitems.items = data;
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isFetching");
        }
      },
      getSingleMenuItemData: async (id) => {
        setLoading(set, "isFetching");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.getMenuItemById(id));
          if (!res.ok)
            throw new Error("Failed to fetch single menu item data");
          const data = await res.json();
          set((state) => {
            state.menuitems.singleItem = data;
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isFetching");
        }
      },
      createMenuItem: async (itemData) => {
        setLoading(set, "isSubmitting");
        try {
          const res = await fetch(ENDPOINTS.addMenuItem, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
          });
          if (!res.ok) throw new Error("Failed to create menu item");
          const data = await res.json();
          set((state) => {
            state.menuitems.items.push(data);
            state.status = "success";
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },
      updateMenuItem: async (id, itemData) => {
        setLoading(set, "isSubmitting");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.updateMenuItem(id), {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(itemData),
          });
          if (!res.ok) throw new Error("Failed to update menu item");
          const data = await res.json();
          set((state) => {
            state.menuitems.items = state.menuitems.items.map((item) =>
              item.id === id ? data : item
            );
            state.status = "success";
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },
      deleteMenuItem: async (id) => {
        setLoading(set, "isSubmitting");
        try {
          if (!id) throw new Error("Invalid ID");
          const res = await fetch(ENDPOINTS.deleteMenuItem(id), {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Failed to delete menu item");
          set((state) => {
            state.menuitems.items = state.menuitems.items.filter((item) => item.id !== id);
            state.status = "success";
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isSubmitting");
        }
      },
      getCategoriesData: async () => {
        setLoading(set, "isFetching");
        try {
          await useCategoryStore.getState().fetchCategories();
          const data = useCategoryStore.getState().categories;
          set((state) => {
            state.categories = data;
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isFetching");
        }
      },
      getSubcategoriesData: async () => {
        setLoading(set, "isFetching");
        try {
          await useCategoryStore.getState().fetchSubCategories();
          const data = useCategoryStore.getState().subCategories;
          set((state) => {
            state.subcategories = data.map(sub => ({
              id: sub.id,
              name: sub.name,
              categoryId: sub.category
            }));
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isFetching");
        }
      },
      getSubcategoriesByCategory: async (categoryName: string) => {
        setLoading(set, "isFetching");
        try {
          await useCategoryStore.getState().fetchSubCategories();
          const allSubCategories = useCategoryStore.getState().subCategories;
          const filteredSubCategories = allSubCategories.filter(sub => sub.category === categoryName);
          
          set((state) => {
            state.subcategories = filteredSubCategories.map(sub => ({
              id: sub.id,
              name: sub.name,
              categoryId: sub.category
            }));
          });
        } catch (err: any) {
          setError(set, err.message || "Something went wrong");
        } finally {
          resetLoading(set, "isFetching");
        }
      },
      resetStatus: () => {
        set((state) => {
          state.status = "idle";
          state.error = "";
        });
      },
    })),
    { name: "menu-item-store" }
  )
);