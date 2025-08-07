"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const HeaderBar = () => {
  return (
    <div className="w-full flex items-center justify-between px-5 border-b-[2px] h-[123px] border-[#D9D9D9] ">
      <div className="text-[2rem] font-semibold font-inter">
       Category
      </div>
      <div className="max-w-[720px] min-w-[539px] h-[56px] bg-[#f6f6f6] px-4 rounded-[10px] relative">
        <Search className="absolute text-[#a2a2a2] size-[22px] top-4" />
        <Input
          className="h-full border-none focus-visible:ring-0 focus:outline-none text-[#a2a2a2] !text-[17px] font-normal leading-6 placeholder:text-[#a2a2a2] pl-7"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default HeaderBar;
