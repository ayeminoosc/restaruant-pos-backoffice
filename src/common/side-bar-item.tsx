import { LucideIcon } from "lucide-react";

interface SideBarItemProps {
  label: string;
  icon: LucideIcon;
  color?: string;
}

export default function SideBarItem({ label,icon: Icon,color }: SideBarItemProps) {
    return (
        <div className="w-full h-full flex items-center  gap-[1.6875rem] px-6 ">
            {Icon && <Icon className="w-5 h-5 text-gray-600" style={{ color }}/>}
            <div className="font-inter font-medium text-[1.3rem] leading-[100%] tracking-[0%]">
                {label}
            </div>
        </div>
    );
}