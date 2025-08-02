"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoryBoxOfCPg from "@/pure-components/category-box-cpg";
import Link from "next/link";
import HeaderBar from "@/pure-components/header-bar";
import MainSideBar from "./main-side-bar";
import { Plus, CaretRight } from "phosphor-react";
import { appData } from "@/store/app-data";

export default function CategoryPg() {
  console.log("appdata", appData.sidebarItems);
  const categoryList = appData.categoryList;

  return (
    <div className="w-full h-full flex">
      <div className="w-[25%]  h-screen">
        <MainSideBar sidebarItems={appData.sidebarItems} name={appData.restaurantName} icon={appData.restaurantIcon} />
      </div>


      <div className="flex flex-col w-[75%] h-screen">
        <div className="h-[10%]">
          <HeaderBar categoryName="Category" />
        </div>

        <div className="h-[90%] w-full bodyPart  ">

          <div className="headerBarWithAddButton flex justify-between items-center px-[1.8rem] py-10">
            <div className="text-[1.5rem] font-semibold font-inter">{appData.menuCategoryLabel} ({appData.menuCategoryCount})</div>

            <div className="buttons flex gap-x-[0.625rem] ">
              <Link href="/add-category">
                <Button
                  className="bg-[#FF6E30] text-white text-[1.25rem] font-medium font-inter rounded-[0.625rem] px-[1.5rem] py-[1.5rem] flex gap-[0.625rem] leading-[1.5rem] tracking-[0.03125rem]"
                >
                  <Plus className="w-[1.5rem] h-[1.5rem] font-medium" />
                  <span>{appData.menuCategoryAddButtonText}</span>
                </Button>
              </Link>


              <Link href="/add-sub-category">
                <Button
                  className="border border-[#FF6E30] text-black text-[1.25rem] bg-white font-medium font-inter rounded-[0.625rem] p-[1.5rem]"
                  style={{ lineHeight: "var(--Static-Body-Large-Line-Height, 1.5rem)", letterSpacing: "var(--Static-Body-Large-Tracking, 0.03125rem)" }}

                >
                  <Plus className="w-[1.5rem] h-[1.5rem] font-medium" />
                  <div>{appData.menuSubCategoryAddButtonText}</div>
                </Button>
              </Link>

            </div>
          </div>

            <div className="flex flex-col rounded-[1.25rem] shadow-md border border-[#D9D9D9] mx-[1.8rem]">

          {categoryList.map((category) => (
            <div key={category.id} className="categoryBoxOfCPg">
              <CategoryBoxOfCPg
                id={category.id}
                name={category.name}
                bilingualName={category.bilingualName}
                image={category.image}
                isActive={category.isActive}
                subCategoryList={category.subCategoryList}
              />
            </div>
          ))

          }
          </div>

        </div>
      </div>
    </div>

  );
}