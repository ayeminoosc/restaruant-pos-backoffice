import { ChevronRight } from "lucide-react";

export interface SideBarItemsType {
  label: string;
  svg: string;
  url: string;
  subItems?: { label: string; url: string }[];
  isOpen?: boolean;
}

export default function SideBarItem({
  label,
  svg,
  subItems,
  isOpen,
}: SideBarItemsType) {
  return (
    <div className="w-full px-6 flex justify-between items-center ">
      <div className="flex items-center gap-[1.6875rem]">
        <img src={svg} alt={label} className="size-6" />
        <div className="font-inter font-medium text-base leading-[100%] tracking-[0%]">
          {label}
        </div>
      </div>
      {subItems && (
        <ChevronRight
          className={`size-5 transition-transform ${
            isOpen ? "-rotate-90" : "rotate-90"
          }`}
        />
      )}
    </div>
  );
}
