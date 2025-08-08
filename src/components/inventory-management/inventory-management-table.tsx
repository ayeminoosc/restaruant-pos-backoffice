"use client";
import React, { useEffect } from "react";
import { Column, ReusableTable } from "../custom-table";
import { useInventoryStore } from "@/store/inventory-store";

const InventoryManagementTable = () => {
  const { items, fetchInventoryData} = useInventoryStore()
   useEffect(() => {
      fetchInventoryData()
    }, [])
  // const data = [
  //   {
  //     id: 1,
  //     Code: "A123",
  //     Name: "Chicken",
  //     Category: "Meat and Poultry",
  //     Stock: 3,
  //     Unit: "lbs",
  //     Reorder: 5,
  //     Vendor: "Local Farm",
  //     Status: "Low stock",
  //   },
  //   {
  //     id: 2,
  //     Code: "B456",
  //     Name: "Flour",
  //     Category: "Baking Supplies",
  //     Stock: 10,
  //     Unit: "lbs",
  //     Reorder: 8,
  //     Vendor: "Sysco",
  //     Status: "Out of stock",
  //   },
  //   {
  //     id: 3,
  //     Code: "C789",
  //     Name: "Lettuce",
  //     Category: "Fresh Produce",
  //     Stock: 6,
  //     Unit: "heads",
  //     Reorder: 4,
  //     Vendor: "Farm Direct",
  //     Status: "In stock",
  //   },
  // ];

  type RowType = (typeof items)[0];

  const columns: Column<RowType>[] = [
    {
      key: "Code",
      label: "Code",
      width: '110px',
      render: (val) => <div className="whitespace-normal text-xl max-w-[110px]">{val}</div>,
    },
    {
      key: "Name",
      label: "Name",
       width: '130px',
      render: (val, row) => (
        <div className="py-0.5 rounded-md max-w-[130px]">
          <p className="text-xl font-semibold">{val}</p>
          <p className="text-sm text-gray-500">{row.Category}</p>
        </div>
      ),
    },
    {
      key: "Stock",
      label: "Stock",
       width: '103px',
      render: (val) => <div className="text-xl max-w-[103px] items-center text-center">{val}</div>,
    },
    {
      key: "Unit",
      label: "Unit",
       width: '94px',
      render: (val) => <div className="text-xl font-[400] max-w-[94px] text-center">{val}</div>,
    },
    {
      key: "Reorder",
      label: "Reorder",
      width: '148px',
      render: (val) => <div className="text-xl max-w-[148px] text-center">{val}</div>,
    },
    {
      key: "Vendor",
      label: "Vendors",
      render: (val) => <div className="text-xl max-w-[165px] text-center">{val}</div>,
    },
    {
  key: "Status",
  label: "Status",
  render: (val) => (
    <div className="max-w-[160px] flex justify-center">
      <p
        className={
          "text-[16px] px-2.5 py-0.5 w-fit rounded-status text-center " +
          (val === "Low stock"
            ? "bg-[#FFDFBA] text-[#F54A00]"
            : val === "Out of stock"
            ? "bg-[#FFBABA] text-[#E7000B]"
            : "bg-[#A1FFA4] text-[#007904]")
        }
      >
        {val}
      </p>
    </div>
  ),
},

    {
      key: "actions",
      label: "Action",
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
      <div className="min-w-max">
        <ReusableTable data={items} columns={columns} headerCenter={true}/>
      </div>
    </div>
  );
};

export default InventoryManagementTable;
