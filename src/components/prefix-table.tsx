"use client";

import { Column, ReusableTable } from "@/components/custom-table";
import { Switch } from "./ui/switch";

const PrefixTable = () => {
  const data = [
    {
      prefixName: "No",
      description: "Remove or exclude ingredient",
      status: true,
      usedInModifier: "Pizza Toppings",
    },
  ];

  type RowType = (typeof data)[0];

  const columns: Column<RowType>[] = [
    {
      key: "prefixName",
      label: "Prefix Name",
      render: (val) => <div className=" text-xl w-[15.063rem]">{val}</div>,
    },
    {
      key: "description",
      label: "Description",
      render: (val) => <div className="text-[#7b7b7b] text-base">{val}</div>,
    },
    {
      key: "status",
      label: "Status",
      render: (val) => (
        <Switch
          checked={val}
          disabled
          aria-readonly
          className="data-[state=checked]:bg-green-500"
        />
      ),
    },
    {
      key: "usedInModifier",
      label: "Used in modifier",
      render: (val) => <div className="text-xl">{val}</div>,
    },
    { key: "actions", label: "Action" },
  ];

  return <ReusableTable data={data} columns={columns} />;
};

export default PrefixTable;
