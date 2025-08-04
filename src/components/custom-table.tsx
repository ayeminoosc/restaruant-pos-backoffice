import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type Column<T> = {
  key: keyof T | "actions"; // property name to show from each row OR "actions"
  label: string; // column header text
  width?: string; // optional width for that column
  render?: (value: any, row: T) => React.ReactNode; // optional custom rendering which can return JSX
};

type Props<T> = {
  data: T[]; // actual data rows
  columns: Column<T>[]; // array of column definitions
};

export function ReusableTable<T extends { [key: string]: any }>({
  data,
  columns,
}: Props<T>) {
  return (
    <div className="overflow-x-auto rounded-xl max-h-[40rem] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      <Table className="bg-[#fbfbfb]">
        <TableHeader>
          {/*  Render column headers here */}
          <TableRow className="bg-[#eeeeee] h-20 text-xl font-medium">
            {columns.map((col, idx) => (
              <TableHead
                key={String(col.key)}
                className={cn(
                  "px-4",
                  col.width && `w-[${col.width}]`,
                  idx === 0 && "text-left",
                  idx === columns.length - 1 && "text-end w-[5.813rem]"
                )}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*  Render each data row here */}
          {data.map((dataItem, rowIndex) => (
            <TableRow key={rowIndex} className="h-20">
              {columns.map((col, colIndex) => (
                <TableCell
                  key={String(col.key)}
                  className={cn(
                    "px-4",
                    colIndex === columns.length - 1 && "text-end"
                  )}
                >
                  {/* {col.key === "actions" ? (
                    <div className="flex items-center justify-between ">
                      <img
                        alt="edit svg"
                        src={"/assets/edit.svg"}
                        className="cursor-pointer"
                      />

                      <img
                        alt="edit svg"
                        src={"/assets/trash.svg"}
                        className="cursor-pointer"
                      />
                    </div>
                  ) : col.render ? (
                    col.render(dataItem[col.key], dataItem)
                  ) : (
                    dataItem[col.key]
                  )} */}
                  {col.render
                    ? col.render(dataItem[col.key], dataItem)
                    : dataItem[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
