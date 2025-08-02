"use client";

import { useState } from "react";
import SideBarItem from "@/pure-components/side-bar-item";
import  type {SideBarItemType} from "@/store/app-data";

export default function MainSideBar( {sidebarItems,name,icon}: { sidebarItems?: SideBarItemType[] , name?: string, icon?: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="h-full w-full shadow-[0.25rem_0rem_0.5rem_-0.125rem_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-center gap-[0.9rem] w-full h-[10%] border-b-[0.125rem]">
        <img
          src={ icon || "/assets/menu.svg"}
          alt="Menu"
          className="w-[2.375rem] h-[2.375rem]"
        />
        <div className="font-inter font-bold text-[1.5rem] text-[#FF6E30] leading-[100%]">
         {name || "Restaurant Name"}
        </div>
      </div>

      <div className="flex flex-col w-full h-[90%] overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[4rem] flex items-center  cursor-pointer 
              ${activeIndex === index
                ? "bg-[#FFECD0]"
                : "hover:bg-[#F6F6F6]"
              }`}
            onClick={() => setActiveIndex(index)}
          >
            <div
              className={`w-[0.625rem] h-full mr-[1.3rem] ${activeIndex === index ? "bg-[#FF6E30]" : "bg-white"
                }`}
            />

            <SideBarItem
              label={item.label}
              icon={item.icon}
              color={item.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
