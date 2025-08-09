"use client";

import { Column, ReusableTable } from "@/components/custom-table";
import { ArrowUp, ArrowDown, Eye } from "lucide-react";

interface InventoryTransaction {
  id: string;
  code: string;
  dateTime: string;
  name: string;
  type: "In" | "Out";
  qty: string;
  source: string;
}

interface TransactionsTableProps {
  transactions: InventoryTransaction[];
}

const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  type RowType = InventoryTransaction;

  const columns: Column<RowType>[] = [
    {
      key: "code",
      label: "Code",
      render: (val) => (
        <div className="text-xl font-semibold text-gray-900">{val}</div>
      ),
    },
    {
      key: "dateTime",
      label: "Date & Time",
      render: (val) => {
        // Split the dateTime string into date and time parts
        const [date, time] = val.split(", ");
        return (
          <div className="flex flex-col">
            <div className="text-[20px] font-medium text-black">{date}</div>
            <div className="text-base text-gray-500">{time}</div>
          </div>
        );
      },
    },
    {
      key: "name",
      label: "Name",
      render: (val) => (
        <div className="text-[20px] font-medium text-black">{val}</div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (val, row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[16px] font-medium ${
            row.type === "In"
              ? "bg-[#A1FFA4] text-green-800"
              : "bg-[#FFBABA] text-red-800"
          }`}
        >
          {row.type === "In" ? (
            <ArrowUp className="w-3 h-3 mr-1" />
          ) : (
            <ArrowDown className="w-3 h-3 mr-1" />
          )}
          {row.type}
        </span>
      ),
    },
    {
      key: "qty",
      label: "Qty",
      render: (val, row) => (
        <span
          className={
            row.type === "In"
              ? "text-[#007904] text-[20px]"
              : "text-[#EA1414] text-[20px]"
          }
        >
          {val}
        </span>
      ),
    },
    {
      key: "source",
      label: "Source",
      render: (val) => <div className="text-[20px] text-[#7B7B7B]">{val}</div>,
    },
    {
      key: "actions",
      label: "Action",
      render: () => (
        <button className="text-[#000000] text-[20px] font-[400] underline flex items-center gap-1">
          View Details
        </button>
      ),
    },
  ];

  return <ReusableTable data={transactions} columns={columns} />;
};

export default TransactionsTable;
