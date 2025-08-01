"use client";
import { Hamburger, Smile } from "lucide-react";
import SideBarItem from "@/common/side-bar-item";
import { useState } from "react";

export default function MainSideBar() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const sidebarItems = [
        {
            label: "Dashboard",
            icon: Smile,
            color: "#FF6E30",
        },
        {
            label: "Categories",
            icon: Smile,
            color: "#4CAF50",
        },
        {
            label: "Orders",
            icon: Smile,
            color: "#2196F3",
        },
        {
            label: "Settings",
            icon: Smile,
            color: "#9C27B0",
        },
        {
            label: "Dashboard",
            icon: Smile,
            color: "#FF6E30",
        },
        {
            label: "Categories",
            icon: Smile,
            color: "#4CAF50",
        },
        {
            label: "Orders",
            icon: Smile,
            color: "#2196F3",
        },
        {
            label: "Settings",
            icon: Smile,
            color: "#9C27B0",
        },
        {
            label: "Dashboard",
            icon: Smile,
            color: "#FF6E30",
        },
        {
            label: "Categories",
            icon: Smile,
            color: "#4CAF50",
        },
        {
            label: "Orders",
            icon: Smile,
            color: "#2196F3",
        },
        {
            label: "Settings",
            icon: Smile,
            color: "#9C27B0",
        },
        {
            label: "Settings",
            icon: Smile,
            color: "#9C27B0",
        },
    ];

    return (
        <div className="h-full w-full   border-r-[1px] border-[#D9D9D9] ">

            <div className="flex items-center justify-center gap-[0.8125rem] w-full h-[10%] border-b-[2px]">
                {/* <Hamburger className="w-[2.375rem] h-[2.375rem]" color="#FF6E30" /> */}
                <img
                    src="/assets/hamburger.png"
                    alt="Menu"
                    className="w-[2.375rem] h-[2.375rem]"
                />
                <div className="font-inter font-bold text-[1.5rem] text-[#FF6E30] leading-[100%]">
                    ACF Restaurant
                </div>
            </div>

            <div className="flex flex-col  w-full h-[92%] overflow-y-auto">
                {sidebarItems.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full h-[4rem] flex items-center 
                        ${activeIndex === index ? "bg-[#FFECD0]" : "hover:bg-[#F6F6F6]"}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        <SideBarItem label={item.label} icon={item.icon} color={item.color} />
                    </div>
                ))}
            </div>

        </div>
    );
}