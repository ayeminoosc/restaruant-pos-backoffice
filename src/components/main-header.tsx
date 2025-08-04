"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

const routeTitles: Record<string, string> = {
  report: "Report",
  category: "Category",
  "menu-items": "Menu Item Management",
  "modifier-groups": "Modifier Group Management",
  prefixes: "Prefix Management",
  recipes: "Recipes",
  "recipes-items": "Recipe Items",
  "inventory-items": "Inventory Items",
  "floor-plan": "Floor Plan",
  setting: "Settings",
  help: "Help",
};

export default function MainHeader() {
  const pathname = usePathname();
  const lastSegment = pathname?.split("/").pop() || "";
  const pageTitle = routeTitles[lastSegment] || "No route";

  return (
    <div className=" h-full flex items-center justify-between px-5 border-b-[2px] border-[#D9D9D9] ">
      <div className="text-[2rem] font-semibold font-inter">{pageTitle}</div>
      <div className="max-w-[720px] min-w-[539px] h-[56px] bg-[#f6f6f6] px-4 rounded-[10px] relative">
        <Search className="absolute text-[#a2a2a2] size-[22px] top-4" />
        <Input
          className="h-full border-none focus-visible:ring-0 focus:outline-none text-[#a2a2a2] !text-[17px] font-normal leading-6 placeholder:text-[#a2a2a2] pl-7"
          placeholder="Search"
        />
      </div>
    </div>
  );
}
