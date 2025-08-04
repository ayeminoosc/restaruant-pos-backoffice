"use client";
import SideBarItem, { SideBarItemsType } from "@/components/sidebar-item";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const sidebarItems: SideBarItemsType[] = [
  {
    label: "Admin",
    svg: "/assets/face.svg",
    url: "/dashboard/admin",
  },
  {
    label: "Report",
    svg: "/assets/ChartBar.svg",
    url: "/dashboard/report",
  },
  {
    label: "Category",
    svg: "/assets/Folder.svg",
    url: "/dashboard/category",
  },
  {
    label: "Menu Items",
    svg: "/assets/ForkKnife.svg",
    url: "/dashboard/menu-items",
  },
  {
    label: "Modifier Groups",
    svg: "/assets/Command.svg",
    url: "/dashboard/modifier-groups",
  },
  {
    label: "Prefixes",
    svg: "/assets/tray.svg",
    url: "/dashboard/prefixes",
  },
  {
    label: "Recipes",
    svg: "/assets/cook.svg",
    url: "/dashboard/recipes",
  },
  {
    label: "Recipes Items",
    svg: "/assets/cooktop.svg",
    url: "/dashboard/recipes-items",
  },
  {
    label: "Inventory Items",
    svg: "/assets/inventory.svg",
    url: "/dashboard/inventory-items",
  },
  {
    label: "Floor Plan",
    svg: "/assets/chair.svg",
    url: "/dashboard/floor-plan",
  },
  {
    label: "Setting",
    svg: "/assets/setting.svg",
    url: "/dashboard/setting",
  },
  {
    label: "Help",
    svg: "/assets/help.svg",
    url: "/dashboard/help",
  },
];

export default function MainSideBar() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section>
      <div className="h-[7.6875rem] py-2.5 px-6 border-b-[2px] flex items-center justify-center">
        <div className="flex items-center justify-center gap-[0.8125rem] w-[13.9375rem]">
          <Image
            src="/assets/hamburger.png"
            alt="Menu"
            width={38}
            height={39}
          />
          <div className="font-inter font-bold text-xl text-primary leading-[100%]">
            ACF Restaurant
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full h-[47.6875rem] overflow-y-auto">
        {sidebarItems.map((item, index) => (
          <Link key={index} href={item.url}>
            <div
              className={`w-full h-14 flex items-center 
                        ${
                          activeIndex === index
                            ? "bg-[#FFECD0] border-l-4 border-primary -ps-10"
                            : "hover:bg-[#F6F6F6]"
                        }`}
              onClick={() => setActiveIndex(index)}
            >
              <SideBarItem label={item.label} svg={item.svg} url={item.url} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
