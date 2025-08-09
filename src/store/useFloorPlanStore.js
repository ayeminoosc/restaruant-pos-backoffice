// store/floorPlanStore.js
// import { create } from 'zustand'

// export const useFloorPlanStore = create((set) => ({
//   tables: [],
//   addTable: () =>
//     set((state) => ({
//       tables: [
//         ...state.tables,
//         {
//           id: Date.now(),
//           x: 100,
//           y: 100,
//           width: 100,
//           height: 100,
//         },
//       ],
//     })),
//   updateTable: (id, updates) =>
//     set((state) => ({
//       tables: state.tables.map((table) =>
//         table.id === id ? { ...table, ...updates } : table
//       ),
//     })),
// }))


import { create } from 'zustand'

const TABLE_SIZE = { width: 100, height: 100 }

export const useFloorPlanStore = create((set, get) => ({
  tables: [],

  // Check collision with existing tables
  isOverlapping: (x, y, width, height, ignoreId = null) => {
    const tables = get().tables
    return tables.some((t) => {
      if (t.id === ignoreId) return false

      //This is the rectangle collision detection formula, also called AABB (Axis-Aligned Bounding Box) collision detection.
      return (
        x < t.x + t.width &&
        x + width > t.x &&
        y < t.y + t.height &&
        y + height > t.y
      )
    })
  },

  // Find free space for new table
  findAvailablePosition: () => {
    const padding = 10
    const maxAttempts = 500
    for (let y = padding; y < 1000; y += 10) {
      for (let x = padding; x < 1000; x += 10) {
        if (!get().isOverlapping(x, y, TABLE_SIZE.width, TABLE_SIZE.height)) {
          return { x, y }
        }
      }
    }
    return { x: 100, y: 100 }
  },

  addTable: () => {
    const { x, y } = get().findAvailablePosition()
    set((state) => ({
      tables: [
        ...state.tables,
        {
          id: Date.now(),
          x,
          y,
          width: TABLE_SIZE.width,
          height: TABLE_SIZE.height,
        },
      ],
    }))
  },

  updateTable: (id, updates) => {
    set((state) => {
      const current = state.tables.find((t) => t.id === id)
      const next = { ...current, ...updates }
      const isValid = !get().isOverlapping(next.x, next.y, next.width, next.height, id)
      return isValid
        ? {
            tables: state.tables.map((t) => (t.id === id ? next : t)),
          }
        : {}
    })
  },
}))


