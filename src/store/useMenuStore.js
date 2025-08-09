


// import { create } from "zustand";

// export const useMenuStore = create((set) => ({
//   menu: [],
//   loading: false,
//   error: null,

//    searchTerm: "",
//   setSearchTerm: (term) => set({ searchTerm: term }),

//   fetchMenu: async () => {
//     set({ loading: true, error: null });

//     try {
//       const res = await fetch("http://macmini-acfsoft:8585/dynarest/Menu+Api/1.0/Menu");
//       console.log("Fetching menu from API...", res);
//       if (!res.ok) throw new Error("Failed to fetch menu");

//       const data = await res.json();
//       console.log("API response:", data);

     
//       const menuItems = Array.isArray(data) && data.length > 0 ? data[0].menuItems : [];


//       set({ menu: menuItems, loading: false });
//     } catch (err) {
//       set({ error: err.message || "Unknown error", loading: false });
//     }
//   },

//   deleteMenuItem: async (id) => {
//     try {
//       const res = await fetch(
//         `http://macmini-acfsoft:8585/dynarest/Menu+Api/1.0/Menu/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!res.ok) throw new Error("Failed to delete menu item");


//       set((state) => ({
//         menu: state.menu.filter((item) => item.id !== id),
//       }));

    
//     } catch (err) {
//       console.error("Delete failed:", err.message);
//     }
//   },
// }));



import { create } from "zustand";

export const useMenuStore = create((set, get) => ({
  menu: [],
  singleMenuItem: null,
  loading: false,
  error: null,

  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  fetchMenu: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("http://macmini-acfsoft:8585/dynarest/Menu+Api/1.0/Menu");
      console.log("Fetching menu from API...", res);
      if (!res.ok) throw new Error("Failed to fetch menu");

      const data = await res.json();
      console.log("API response:", data);

      const menuItems = Array.isArray(data) && data.length > 0 ? data[0].menuItems : [];

      set({ menu: menuItems, loading: false });
    } catch (err) {
      set({ error: err.message || "Unknown error", loading: false });
    }
  },

  // Instead of fetch single from API, find in local menu array
  getSingleMenuItemData: (id) => {
    const menu = get().menu;
    const found = menu.find((item) => item.id === id) || null;
    set({ singleMenuItem: found });
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

      set((state) => ({
        menu: state.menu.filter((item) => item.id !== id),
      }));

      // Optional: update singleMenuItem if deleted item was selected
      const single = get().singleMenuItem;
      if (single && single.id === id) {
        set({ singleMenuItem: null });
      }

    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  },
}));
