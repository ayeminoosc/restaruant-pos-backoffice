"use client";

import { Column, ReusableTable } from "@/components/custom-table";

const InventoryTable = () => {
  const data = [
    {
      name: "Flour",
      id: "FC1",
      description: "High-quality wheat flour for pizza..",
      currentStock: 100,
      unit: "Kg",
      lastRestocked: new Date().toLocaleDateString(),
      status: "In stock",
    },
  ];

  type RowType = (typeof data)[0];

  const columns: Column<RowType>[] = [
    {
      key: "name",
      label: "Name",
      render: (val) => <div className=" text-xl w-[7.438rem]">{val}</div>,
    },
    {
      key: "id",
      label: "ID",
      render: (val) => <div className=" text-xl w-[9.688rem]">{val}</div>,
    },
    {
      key: "description",
      label: "Description",
      render: (val) => (
        <div className="text-[#7b7b7b] text-base w-[8.188rem] whitespace-normal">
          {val}
        </div>
      ),
    },
    {
      key: "currentStock",
      label: "Current Stock",
      render: (val) => <div className="text-xl w-[9.25rem]">{val}</div>,
    },
    {
      key: "unit",
      label: "Unit",
      render: (val) => <div className="text-xl w-[5.875rem]">{val}</div>,
    },
    {
      key: "lastRestocked",
      label: "Last restocked",
      render: (val) => (
        <div className="text-xl w-[10.25rem] text-[#7b7b7b]">{val}</div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (val) => <div className="text-xl w-[6.313rem]">{val}</div>,
    },
    { key: "actions", label: "Action" },
  ];

  return <ReusableTable data={data} columns={columns} />;
};

export default InventoryTable;
