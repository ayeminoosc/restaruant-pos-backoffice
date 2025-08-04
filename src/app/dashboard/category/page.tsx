"use client";
import CategoryBoxOfCPg from "@/common/category-box-cpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "phosphor-react";

export default function CategoryPag() {
  return (
    <div className="flex-1 flex-col ">
      <div className="headerBarWithAddButton flex justify-between items-center  pt-10">
        <div className="text-[1.5rem] font-semibold font-inter">
          Menu Categories (2)
        </div>

        <div className="buttons flex gap-x-[0.625rem] ">
          <Link href="/add-category">
            <Button
              className="bg-[#FF6E30] text-white text-[1.25rem] font-medium font-inter rounded-[0.625rem] p-[1.5rem] flex gap-[0.625rem]"
              style={{
                lineHeight: "var(--Static-Body-Large-Line-Height, 1.5rem)",
                letterSpacing: "var(--Static-Body-Large-Tracking, 0.03125rem)",
              }}
            >
              <Plus className="w-[1.5rem] h-[1.5rem]" />
              <div>Add Category</div>
            </Button>
          </Link>

          <Button
            className="border border-[#FF6E30] text-black text-[1.25rem] bg-white font-medium font-inter rounded-[0.625rem] p-[1.5rem]"
            style={{
              lineHeight: "var(--Static-Body-Large-Line-Height, 1.5rem)",
              letterSpacing: "var(--Static-Body-Large-Tracking, 0.03125rem)",
            }}
          >
            <Plus className="w-[1.5rem] h-[1.5rem] font-medium" />
            <div>Add SubCategory</div>
          </Button>
        </div>
      </div>

      <div className="bodyPart rounded-[1.25rem] mt-5 shadow-md border border-[#D9D9D9]">
        <CategoryBoxOfCPg />
        <CategoryBoxOfCPg />
        <CategoryBoxOfCPg />
      </div>
    </div>
  );
}
