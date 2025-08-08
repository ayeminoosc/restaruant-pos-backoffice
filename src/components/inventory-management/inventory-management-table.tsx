"use client";
import React from "react";
import { Column, ReusableTable } from "../custom-table";

const InventoryManagementTable = () => {
  const data = [
    {
      id: 1,
      Code: "A123",
      Name: "Chicken",
      Category: "Meat and Poultry",
      Stock: 3,
      Unit: "lbs",
      Reorder: 5,
      Vendor: "Local Farm",
      Status: "Active",
    },
    {
      id: 2,
      Code: "B456",
      Name: "Flour",
      Category: "Baking Supplies",
      Stock: 10,
      Unit: "lbs",
      Reorder: 8,
      Vendor: "Baker's Hub",
      Status: "Inactive",
    },
    {
      id: 3,
      Code: "C789",
      Name: "Lettuce",
      Category: "Fresh Produce",
      Stock: 6,
      Unit: "heads",
      Reorder: 4,
      Vendor: "Green Valley Farms",
      Status: "Active",
    },
  ];

  type RowType = (typeof data)[0];

  const columns: Column<RowType>[] = [
    {
      key: "Code",
      label: "Code",
      // Optional: min-width so it doesn't shrink too much
      // width removed for flexibility
      render: (val) => <div className="whitespace-normal text-xl min-w-[80px]">{val}</div>,
    },
    {
      key: "Name",
      label: "Name",
      render: (val, row) => (
        <div className="py-0.5 rounded-md min-w-[140px]">
          <p className="text-base font-semibold">{val}</p>
          <p className="text-sm text-gray-500">{row.Category}</p>
        </div>
      ),
    },
    {
      key: "Stock",
      label: "Stock",
      render: (val) => <div className="text-base min-w-[50px]">{val}</div>,
    },
    {
      key: "Unit",
      label: "Unit",
      render: (val) => <div className="text-xl min-w-[40px]">{val}</div>,
    },
    {
      key: "Reorder",
      label: "Reorder",
      render: (val) => <div className="text-xl min-w-[60px]">{val}</div>,
    },
    {
      key: "Vendor",
      label: "Vendors",
      render: (val) => <div className="text-base min-w-[120px]">{val}</div>,
    },
    {
      key: "Status",
      label: "Status",
      render: (val) => (
        <div
          // className={
          //   val === "Active"
          //     ? "bg-[#a1ffa4] text-base text-[#1e9222] py-0.5 px-2 rounded-md w-fit"
          //     : "bg-red-600 text-base text-white py-0.5 px-2 rounded-md w-fit"
          // }
        >
          {/* {val} */}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Action",
      width: "136px", // fixed width for action buttons
      render: () => (
        <div className="flex items-center justify-between gap-[10px] min-w-[90px]">
          <img alt="edit" src={"/assets/edit.svg"} className="cursor-pointer" />
          <img alt="wrench" src={"/assets/Wrench.svg"} className="cursor-pointer" />
          <img alt="trash" src={"/assets/trash.svg"} className="cursor-pointer" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {/* min-w-max allows table to be as wide as content, enabling horizontal scroll on small screens */}
      <div className="min-w-max">
        <ReusableTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default InventoryManagementTable;
