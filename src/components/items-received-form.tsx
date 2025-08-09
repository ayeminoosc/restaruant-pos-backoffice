"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import CustomButton from "./custom-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ItemRow {
  id: string;
  item: string;
  qty: string;
  unit: string;
  costPerUnit: string;
}

interface ItemsReceivedFormProps {
  title?: string;
  initialItems?: ItemRow[];
  itemsWithUnits?: Record<string, string>;
  units?: string[];
  onItemsChange?: (items: ItemRow[]) => void;
  className?: string;
}

// Default items with their default units
const defaultItemsWithUnits: Record<string, string> = {
  Flour: "Kg",
  Beef: "Kg",
  "Cheese Box": "Box",
  Chicken: "Kg",
  Tomatoes: "Kg",
  Milk: "L",
  Rice: "Kg",
  Oil: "L",
  Sugar: "Kg",
  Salt: "Kg",
};

const defaultUnits = ["Kg", "Box", "Lbs", "Pcs", "Gal", "L", "G", "Oz"];

export default function ItemsReceivedForm({
  title = "Items Received",
  initialItems = [
    {
      id: "1",
      item: "Flour",
      qty: "20",
      unit: "Kg",
      costPerUnit: "1.4",
    },
    {
      id: "2",
      item: "Beef",
      qty: "10",
      unit: "Kg",
      costPerUnit: "6.5",
    },
    {
      id: "3",
      item: "Cheese Box",
      qty: "2",
      unit: "Kg",
      costPerUnit: "12",
    },
  ],
  itemsWithUnits = defaultItemsWithUnits,
  units = defaultUnits,
  onItemsChange,
  className = "",
}: ItemsReceivedFormProps) {
  const [items, setItems] = useState<ItemRow[]>(initialItems);

  const updateItemsState = (newItems: ItemRow[]) => {
    setItems(newItems);
    if (onItemsChange) {
      onItemsChange(newItems);
    }
  };

  const addItem = () => {
    const newItem: ItemRow = {
      id: Date.now().toString(),
      item: "",
      qty: "0",
      unit: "",
      costPerUnit: "0",
    };
    const newItems = [...items, newItem];
    updateItemsState(newItems);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      const newItems = items.filter((item) => item.id !== id);
      updateItemsState(newItems);
    }
  };

  const updateItem = (id: string, field: keyof ItemRow, value: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        // If the field being updated is the item, also update the unit
        if (field === "item" && value !== "" && value in itemsWithUnits) {
          return { ...item, [field]: value, unit: itemsWithUnits[value] };
        }
        return { ...item, [field]: value };
      }
      return item;
    });
    updateItemsState(newItems);
  };

  return (
    <div
      className={`bg-white max-w-[1025px] rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        <CustomButton
          onClick={addItem}
          className="flex text-[20px] items-center gap-2 p-2.5 h-[56px] w-[204px] bg-orange-500 text-white hover:bg-orange-600"
        >
          <Plus className="w-4.5 h-4.5" />
          Add Item
        </CustomButton>
      </div>

      {/* Item Rows */}
      <div className="space-y-3">
        {items.map((item) => (
          <section key={item.id}>
            {/* Table Headers */}
            <div className="grid [grid-template-columns:repeat(3,minmax(0,1fr))_40px] gap-4 mb-2 ">
              <div className="text-[20px] font-medium text-gray-700">
                Item <span className="text-[#EA1414]">*</span>
              </div>
              <div className="text-[20px] font-medium text-gray-700">
                Qty <span className="text-[#EA1414]">*</span>
              </div>

              <div className="text-[20px] font-medium text-gray-700">
                Cost/Unit <span className="text-[#EA1414]">*</span>
              </div>
            </div>

            <div className="grid [grid-template-columns:repeat(3,minmax(0,1fr))_40px] gap-4 items-center">
              {/* Item Dropdown */}
              <div>
                <Select
                  value={item.item}
                  onValueChange={(value) => updateItem(item.id, "item", value)}
                >
                  <SelectTrigger
                    className="h-14 w-full md:text-lg placeholder:text-lg placeholder:text-gray-300 focus-visible:ring-0 focus:outline-none aria-invalid:border-[#cdcdcd] border-ring rounded-md bg-background px-3 py-2 [&>svg]:w-6 [&>svg]:h-6"
                    style={{ minHeight: "56px", height: "56px" }}
                  >
                    <SelectValue
                      placeholder="Select Item"
                      className="md:text-lg"
                    />
                  </SelectTrigger>
                  <SelectContent className="w-full min-w-[200px]">
                    {Object.keys(itemsWithUnits).map((itemName) => (
                      <SelectItem
                        key={itemName}
                        value={itemName}
                        className="md:text-lg p-[0.625rem] cursor-pointer hover:bg-[#FFE5D6] data-[highlighted]:bg-[#FFE5D6]"
                      >
                        {itemName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity with unit */}
              <div className="relative h-[56px]">
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                  className="w-full h-full pl-4 pr-20 text-[20px] py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
                <div className="absolute right-0 inset-y-0 w-20 flex items-center justify-center bg-[#f0f2f5] rounded-r-md border-ring border">
                  <span className="text-lg font-normal">{item.unit}</span>
                </div>
              </div>

              {/* Cost per Unit */}
              <div className="relative h-[56px]">
                <input
                  type="number"
                  step="0.01"
                  value={item.costPerUnit}
                  onChange={(e) =>
                    updateItem(item.id, "costPerUnit", e.target.value)
                  }
                  className="w-full h-full text-[20px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              {/* Delete Button (narrow column) */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={items.length === 1}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded disabled:opacity-40"
                >
                  <Trash2 className="w-[30px] h-[30px]" />
                </button>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
