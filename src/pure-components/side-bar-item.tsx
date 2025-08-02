import { LucideIcon } from "lucide-react";

interface SideBarItemProps {
  label: string;
  icon: LucideIcon | string;
  color?: string;
}

export default function SideBarItem({ label, icon, color }: SideBarItemProps) {
  return (
    <div className="w-full h-full flex items-center ">
      {typeof icon === "string" ? (
        <img src={icon} alt={label} className="w-[1.7rem] h-[1.7rem]" />
      ) : (
        icon
      )}
      <div className="text-black font-inter font-medium text-[1.3rem] leading-[100%] pl-[2.8rem]">
        {label}
      </div>

    </div>
  );
}
