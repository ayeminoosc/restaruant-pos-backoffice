"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { AiOutlineEdit } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { TableRowType } from "../../../types/modifier-group";

const mockData: TableRowType[] = [
  {
    name: "Pizza Size",
    type: "Single",
    required: "Required",
    modifierItems: 4,
    selectionRange: { max: 1, min: 1 },
    status: "Active",
  },
  {
    name: "Pizza Toppings",
    type: "Multiple",
    required: "Optional",
    modifierItems: 3,
    selectionRange: { max: 0, min: 5 },
    status: "InActive",
  },
  {
    name: "Drink Size",
    type: "Single",
    required: "Required",
    modifierItems: 4,
    selectionRange: { max: 1, min: 1 },
    status: "Active",
  },
  {
    name: "Drink Size",
    type: "Single",
    required: "Required",
    modifierItems: 4,
    selectionRange: { max: 1, min: 1 },
    status: "Active",
  },
  {
    name: "Drink Size",
    type: "Single",
    required: "Required",
    modifierItems: 4,
    selectionRange: { max: 1, min: 1 },
    status: "Active",
  },
  {
    name: "Drink Size",
    type: "Single",
    required: "Required",
    modifierItems: 4,
    selectionRange: { max: 1, min: 1 },
    status: "Active",
  },
];

const ModifierGroupTable = () => {
  return (
    <div className="h-full overflow-y-scroll rounded-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <Table className="bg-[#fbfbfb]">
        <TableHeader>
          <TableRow className="font-medium text-xl bg-[#eeeeee]">
            <TableHead className="px-4 w-[140px] h-[80px]">Name</TableHead>
            <TableHead className="px-4 w-[158px] ">Type</TableHead>
            <TableHead className="px-4 w-[144px] ">Required</TableHead>
            <TableHead className="px-4 w-[172px] ">Modifier Items</TableHead>
            <TableHead className="px-4 w-[185px] ">Selection Rage</TableHead>
            <TableHead className="px-4 w-[133px] ">Status</TableHead>
            <TableHead className="text-end px-4 w-[93px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockData.map(
            (
              { name, status, modifierItems, required, selectionRange, type },
              idx
            ) => (
              <TableRow className="px-4 w-[140px] h-[80px]" key={idx}>
                <TableCell className="font-medium text-xl px-4">
                  {name}
                </TableCell>
                <TableCell className="px-4 ">
                  <div className="w-fit px-2.5 py-.5 rounded-md text-base font-normal bg-[#eaeaea]">
                    {type}
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <div
                    className={cn(
                      "w-fit px-2.5 py-.5 rounded-md text-base font-normal ",
                      required === "Optional"
                        ? "bg-[#eaeaea]"
                        : "bg-red-600 text-white"
                    )}
                  >
                    {required}
                  </div>
                </TableCell>
                <TableCell className="px-4 font-normal text-xl text-center">
                  {modifierItems} items
                </TableCell>
                <TableCell className="px-4 font-normal text-xl text-center">
                  {selectionRange.min}-{selectionRange.max}
                </TableCell>

                <TableCell className="px-4">
                  <div
                    className={cn(
                      "w-fit px-2.5 py-.5 rounded-md text-base font-normal",
                      status === "Active"
                        ? "bg-[#a1ffa4] text-[#1e9222]"
                        : "bg-red-600 text-white"
                    )}
                  >
                    {status}
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex items-center justify-between ">
                    <AiOutlineEdit size={24} color="#777777" />
                    <FaTrashAlt size={20} color="#ea1414" />
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModifierGroupTable;
