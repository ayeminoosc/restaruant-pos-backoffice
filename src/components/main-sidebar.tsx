"use client";
import SideBarItem, { SideBarItemsType } from "@/components/sidebar-item";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
    subItems: [
      { label: "Inventory Dashboard", url: "/dashboard/inventory-items" },
      { label: "All Items", url: "/dashboard/inventory-items/all-items" },
      { label: "Item In", url: "/dashboard/inventory-items/item-in" },
      {
        label: "Inventory Transactions",
        url: "/dashboard/inventory-items/transactions",
      },
    ],
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
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

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
        {sidebarItems.map((item, index) => {
          const isActive =
            pathname === item.url ||
            (item.subItems &&
              item.subItems.some((subItem) => pathname === subItem.url));
          const isExpanded = expandedItems.includes(item.label);

          return (
            <div key={index}>
              {item.subItems ? (
                // Items with sub-items (dropdown)
                <div
                  className={`w-full h-14 flex items-center border-l-4 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#FFECD0] border-primary "
                      : "hover:bg-[#F6F6F6]"
                  }`}
                  onClick={() => {
                    toggleExpanded(item.label);
                    setIsOpen((prev) => !prev);
                  }}
                >
                  <SideBarItem isOpen={isOpen} {...item} />
                </div>
              ) : (
                // Regular items (direct navigation)
                <Link href={item.url}>
                  <div
                    className={`w-full h-14 flex items-center border-l-4 transition-colors duration-200 ${
                      isActive
                        ? "bg-[#FFECD0] border-primary "
                        : "hover:bg-[#F6F6F6]"
                    }`}
                  >
                    <SideBarItem {...item} />
                  </div>
                </Link>
              )}

              {/* Sub-items */}
              {item.subItems && isExpanded && (
                <div className="bg-gray-50">
                  {item.subItems.map((subItem, subIndex) => {
                    const isSubActive = pathname === subItem.url;
                    return (
                      <Link key={subIndex} href={subItem.url}>
                        <div
                          className={`w-full h-12 flex items-center border-l-4 transition-colors duration-200 pl-12 ${
                            isSubActive ? "text-primary" : "hover:bg-[#F6F6F6]"
                          }`}
                        >
                          <div className="font-inter pl-6.5 font-medium text-[16px] leading-[100%] tracking-[0%]">
                            {subItem.label}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
