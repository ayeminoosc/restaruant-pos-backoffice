import { Button } from "@/components/ui/button";
import MenuItemList from "@/components/ui/menu-item-list";
// import MenuItemCardList from "@/components/ui/menu-item-list";
import SearchBar from "@/components/ui/search-bar";
import React from "react";


export default function MenuItemManagementPage() {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center" >
                <div className="text-black font-inter  text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem]
 font-semibold leading-normal">Menu Item Management</div>
                <div>Search Bar</div>
                {/* <SearchBar /> */}
            </div>



            <div >
                <div className="text-black font-inter  text-[1rem] sm:text-[1.25rem] md:text-[1.5rem] lg:text-[1.75rem]
 font-semibold leading-normal"
                >Menu Item(2)</div>

            </div>
            <div >
                <MenuItemList />
            </div>

        </div>
    )
}