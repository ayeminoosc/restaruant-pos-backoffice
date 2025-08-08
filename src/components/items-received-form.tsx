"use client";
import { useState } from "react";
import { Plus, Trash2, ChevronDown } from "lucide-react";
import CustomButton from "./custom-button";

interface ItemRow {
  id: string;
  item: string;
  qty: string;
  unit: string;
  costPerUnit: string;
}

const mockItems = [
  "Flour",
  "Beef",
  "Cheese Box",
  "Chicken",
  "Tomatoes",
  "Milk",
  "Rice",
  "Oil",
  "Sugar",
  "Salt",
];

const mockUnits = [
  "Kg",
  "Box",
  "Lbs",
  "Pcs",
  "Gal",
  "L",
  "G",
  "Oz",
];

export default function ItemsReceivedForm() {
  const [items, setItems] = useState<ItemRow[]>([
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
      unit: "Box",
      costPerUnit: "12",
    },
    {
      id: "4",
      item: "",
      qty: "0",
      unit: "",
      costPerUnit: "0",
    },
  ]);

  const addItem = () => {
    const newItem: ItemRow = {
      id: Date.now().toString(),
      item: "",
      qty: "0",
      unit: "",
      costPerUnit: "0",
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof ItemRow, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  return (
    <div className="bg-white max-w-[1025px] rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Items Received</h2>
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
            <div className="grid [grid-template-columns:repeat(4,minmax(0,1fr))_40px] gap-4 mb-2 ">
              <div className="text-[20px] font-medium text-gray-700">Item <span className="text-[#EA1414]">*</span></div>
              <div className="text-[20px] font-medium text-gray-700">Qty <span className="text-[#EA1414]">*</span></div>
              <div className="text-[20px] font-medium text-gray-700">Unit <span className="text-[#EA1414]">*</span></div>
              <div className="text-[20px] font-medium text-gray-700">Cost/Unit <span className="text-[#EA1414]">*</span></div>
            </div>

            <div className="grid [grid-template-columns:repeat(4,minmax(0,1fr))_40px] gap-4 items-center">
              {/* Item Dropdown */}
              <div className="relative h-[56px]">
                <select
                  value={item.item}
                  onChange={(e) => updateItem(item.id, "item", e.target.value)}
                  className="w-full h-full text-[20px] px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Item</option>
                  {mockItems.map((mockItem) => (
                    <option key={mockItem} value={mockItem}>
                      {mockItem}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Quantity */}
              <div className="relative h-[56px]">
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                  className="w-full h-full px-4 text-[20px] py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              {/* Unit Dropdown */}
              <div className="relative h-[56px]">
                <select
                  value={item.unit}
                  onChange={(e) => updateItem(item.id, "unit", e.target.value)}
                  className="w-full h-full text-[20px] px-4 py-2.5  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Unit</option>
                  {mockUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Cost per Unit */}
              <div className="relative h-[56px]">
                <input
                  type="number"
                  step="0.01"
                  value={item.costPerUnit}
                  onChange={(e) => updateItem(item.id, "costPerUnit", e.target.value)}
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
