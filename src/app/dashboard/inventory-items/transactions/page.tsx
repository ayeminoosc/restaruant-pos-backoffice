"use client";
import { useState } from "react";
import { Plus, Search, Filter, ArrowUp, ArrowDown, Eye } from "lucide-react";
import CustomButton from "@/components/custom-button";
import CustomSidebarItemHeader from "@/components/custom-sidebar-item-header";

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
    source: "Recipe: Burger"
  },
  {
    id: "2",
    code: "IV002",
    dateTime: "2025-08-01, 03:00 PM",
    name: "Flour",
    type: "Out",
    qty: "-25 kg",
    source: "Manual Adjustment"
  },
  {
    id: "3",
    code: "IV003",
    dateTime: "2025-08-01, 02:15 PM",
    name: "Tomatoes",
    type: "In",
    qty: "+10 Kg",
    source: "Recipe: Pizza"
  },
  {
    id: "4",
    code: "IV004",
    dateTime: "2025-08-01, 01:30 PM",
    name: "Milk",
    type: "Out",
    qty: "-10 gal",
    source: "Manual Adjustment"
  }
];

export default function InventoryTransactionsPage() {
  const [transactions] = useState<InventoryTransaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (


    <section>
      <CustomSidebarItemHeader>
        Inventory Transactions
      </CustomSidebarItemHeader>
    <div className="flex-1 p-6">
      
      <div className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-900 font-inter">Inventory Transactions</h1>
        <p className="text-lg text-gray-500 font-inter">({filteredTransactions.length})</p>
        </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <CustomButton className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white hover:bg-orange-600">
          <Plus className="w-4 h-4" />
          Add Item
        </CustomButton>
        <CustomButton variant="outline" className="px-6 py-3">
          View Transaction
        </CustomButton>
        <CustomButton variant="outline" className="px-6 py-3 border-orange-500 text-orange-500 hover:bg-orange-50">
          Adjust Stock
        </CustomButton>
      </div>
      </div>


      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.dateTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === "In" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {transaction.type === "In" ? (
                        <ArrowUp className="w-3 h-3 mr-1" />
                      ) : (
                        <ArrowDown className="w-3 h-3 mr-1" />
                      )}
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={transaction.type === "In" ? "text-green-600" : "text-red-600"}>
                      {transaction.qty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </section>
  );
}
