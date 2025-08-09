"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import CustomButton from "@/components/custom-button";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";
import TransactionsTable from "@/components/inventory/transactions-table";

interface InventoryTransaction {
  id: string;
  code: string;
  dateTime: string;
  name: string;
  type: "In" | "Out";
  qty: string;
  source: string;
}

const mockTransactions: InventoryTransaction[] = [
  {
    id: "1",
    code: "IV001",
    dateTime: "2025-08-02, 09:14 AM",
    name: "Chicken",
    type: "In",
    qty: "+20 lbs",
    source: "Recipe: Burger",
  },
  {
    id: "2",
    code: "IV002",
    dateTime: "2025-08-01, 03:00 PM",
    name: "Flour",
    type: "Out",
    qty: "-25 kg",
    source: "Manual Adjustment",
  },
  {
    id: "3",
    code: "IV003",
    dateTime: "2025-08-01, 02:15 PM",
    name: "Tomatoes",
    type: "In",
    qty: "+10 Kg",
    source: "Recipe: Pizza",
  },
  {
    id: "4",
    code: "IV004",
    dateTime: "2025-08-01, 01:30 PM",
    name: "Milk",
    type: "Out",
    qty: "-10 gal",
    source: "Manual Adjustment",
  },
];

export default function InventoryTransactionsPage() {
  const [transactions] = useState<InventoryTransaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <CustomSidebarItemHeader>Inventory Transactions</CustomSidebarItemHeader>
      <div className="flex-1 p-6">
        {/* text and buttons */}
        <div className="flex justify-between items-center mb-7">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900 font-inter">
              Inventory Transactions
            </h1>
            <p className="text-lg text-gray-500 font-inter">
              ({filteredTransactions.length})
            </p>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <CustomButton className="flex items-center h-[56px] min-w-[204px] bg-primary text-white text-xl hover:bg-orange-600">
              <Plus className="w-4 h-4" />
              Add Item
            </CustomButton>
            <CustomButton
              variant="outline"
              className="px-6 py-3 text-xl h-[56px] min-w-[204px] bg-black text-white"
            >
              View Transaction
            </CustomButton>
            <CustomButton
              variant="outline"
              className="px-6 py-3 text-xl h-[56px] min-w-[204px] border border-primary text-black hover:bg-orange-50"
            >
              Adjust Stock
            </CustomButton>
          </div>
        </div>
        {/*  */}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <TransactionsTable transactions={filteredTransactions} />
        </div>
      </div>
    </section>
  );
}
