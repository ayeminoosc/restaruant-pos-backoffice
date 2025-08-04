"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTableProps } from "@/types/type";
import { LucidePlus, Plus } from "lucide-react";
import SaveCancelBtn from "@/common/save-cancle-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";
function DataTable(props: DataTableProps) {
  const { title, columns, data, add } = props;

  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <div className="p-4" >
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[24px] font-semibold">
            {title} ({tableData.length})
          </h2>
     <Button asChild className="h-full" onClick={add}>
  <span className="flex items-center gap-2 text-[20px] p-[10px]">
    <Plus className="size-6" />
    Add Prefix
  </span>
</Button>

        </div>
      )}
      
      <div></div>
      
  <div className="flex w-full bg-[#EEEEEE] rounded-t-[20px]">
    {columns.map((col, index) => (
      <div key={index} 
      className={`flex flex-1 p-4 text-lg text-black font-medium border-t-[#D8D8D8] ${
          index === 0 ? "rounded-tl-2xl" : ""
        } ${
          index === columns.length - 1 ? "rounded-tr-2xl justify-end" : ""
        }

       
        `     
      } 
      >
        {col}
      </div>
    ))}
  </div>

    
      <Table className=" table-auto overflow-hidden">
        <TableHeader >
      

        </TableHeader>

        <TableBody className="p-4 bg-[#FBFBFB]">
          {tableData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-gray-500 py-4"
              >
                No data available.
              </TableCell>
            </TableRow>
          ) : (
            tableData.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="border-t-2 text-xl font-mono">
                {row.map((cell, cellIndex) => {
                   if (cellIndex === 0) {
                    return (
                      <TableCell key={cellIndex} className="w-2/6 text-[20px] h-[80px] text-black font-normal font-sans max-w-[400px] whitespace-normal break-words">
                        {cell}
                      </TableCell>
                    );
                    
                  }

                   if (cellIndex === 1) {
                    return (
                      <TableCell key={cellIndex} className=" w-3/6 max-w-[400px] whitespace-normal break-words text-[16px] pl-4 h-[80px] text-[#7B7B7B] font-normal font-inter text-left font-sans">
                        {cell}
                      </TableCell>
                    );
                    
                  }

                  

                   if (cellIndex === 2) {
                    return (
                      <TableCell key={cellIndex} className="text-right w-1/3 h-[80px]">
                        {cell}
                      </TableCell>
                    );
                    
                  }
                  return ;
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
    </div>
  );
}

export default DataTable;
