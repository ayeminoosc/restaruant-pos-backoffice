import { z } from "zod";

export const inventoryItemSchema = z.object({
  id: z.string().optional(),
  inventoryName: z.string().min(1, "Inventory name is required"),
  stock: z.string().min(1, "Stock is required"),
  unit: z.string().min(1, "Unit is required"),
});

export const menuItemFormSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  bilingualName: z.string().optional(),
  barCode: z.string().min(1, "Bar code is required"),
  price: z.string().min(1, "Price is required"),
  categoryId: z.string().min(1, "Category is required"),
  subcategoryId: z.string().optional(),
  photo: z.string().optional(),
  modifiers: z.object({
    enabled: z.boolean(),
    modifierGroups: z.array(z.string()),
  }),
  prefixes: z.object({
    enabled: z.boolean(),
    selectedPrefixes: z.array(z.string()),
  }),
  advancedSettings: z.object({
    connectToRecipes: z.boolean(),
    connectToInventory: z.boolean(),
    inventoryItems: z.array(inventoryItemSchema),
  }),
  buttonColor: z.string().min(1, "Button color is required"),
  active: z.boolean(),
});

export type MenuItemFormInput = z.infer<typeof menuItemFormSchema>; 