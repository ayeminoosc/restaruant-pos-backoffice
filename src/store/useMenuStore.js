


import { create } from "zustand";

export const useMenuStore = create((set) => ({
  menu: [],
  loading: false,
  error: null,

   searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  fetchMenu: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("http://macmini-acfsoft:8585/dynarest/Menu+Api/1.0/Menu");
      if (!res.ok) throw new Error("Failed to fetch menu");

      const data = await res.json();
      console.log("API response:", data);

      // Extract menuItems from the first object in the array
      // const menuItems = Array.isArray(data) && data.length > 0 ? data[0].menuItems : [];
      const menuItems = Array.isArray(data) ? data : [];

      set({ menu: menuItems, loading: false });
    } catch (err) {
      set({ error: err.message || "Unknown error", loading: false });
    }
  },

  deleteMenuItem: async (id) => {
    try {
      const res = await fetch(
        `http://macmini-acfsoft:8585/dynarest/Menu+Api/1.0/Menu/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete menu item");

      // Option 1: remove item from state manually
      set((state) => ({
        menu: state.menu.filter((item) => item.id !== id),
      }));

      // Option 2 (optional): refetch all data after delete
      // await get().fetchMenu();

    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  },
}));
