"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoryBoxOfCPg from "@/common/category-box-cpg";
import Link from "next/link";
import HeaderBar from "@/common/header-bar";
import MainSideBar from "./main-side-bar";
import { Plus, CaretRight } from "phosphor-react";

export default function CategoryPg() {
  return (
    <div className="w-full h-full flex">
      <div className="w-[25%] h-full">
        <MainSideBar />
      </div>


      <div className="flex flex-col w-[75%] h-full">
        <div className="h-[10%]">
          <HeaderBar />
        </div>
        <div className="headerBarWithAddButton flex justify-between items-center p-5 pt-10">
          <div className="text-[1.5rem] font-semibold font-inter">Menu Categories (2)</div>

          <div className="buttons flex gap-x-[0.625rem] ">
            <Link href="/add-category">
              <Button
                className="bg-[#FF6E30] text-white text-[1.25rem] font-medium font-inter rounded-[0.625rem] p-[1.5rem] flex gap-[0.625rem]"
                style={{ lineHeight: "var(--Static-Body-Large-Line-Height, 1.5rem)", letterSpacing: "var(--Static-Body-Large-Tracking, 0.03125rem)" }}
              >
                <Plus className="w-[1.5rem] h-[1.5rem]" />
                <div>Add Category</div>
              </Button>
            </Link>

            <Button
              className="border border-[#FF6E30] text-black text-[1.25rem] bg-white font-medium font-inter rounded-[0.625rem] p-[1.5rem]"
              style={{ lineHeight: "var(--Static-Body-Large-Line-Height, 1.5rem)", letterSpacing: "var(--Static-Body-Large-Tracking, 0.03125rem)" }}

            >
              <Plus className="w-[1.5rem] h-[1.5rem] font-medium" />
              <div>Add SubCategory</div>
            </Button>
          </div>
        </div>

        <div className="bodyPart rounded-[1.25rem] m-5  shadow-md border border-[#D9D9D9]">
          <CategoryBoxOfCPg />
          <CategoryBoxOfCPg />
          <CategoryBoxOfCPg />
        </div>
      </div>
    </div>

  );
}