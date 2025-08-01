"use client";

import { useState } from "react";
import { ChevronRight, PencilLine} from "lucide-react";
import SubCategoryBoxOfCPg from "./sub-category-box-cpg";
import { PencilSimpleLine,Trash} from "phosphor-react";

export default function CategoryBoxOfCPg() {
    const [showSubs, setShowSubs] = useState(false);

    const handleToggle = () => setShowSubs(!showSubs);

    return (
        <div className="categoryWrapper border-b border-gray-300 py-2 ">
            <div className="categoryBox  flex justify-between  p-[1rem]">
                <div className="left-side flex items-start  gap-x-2">
                    <button onClick={handleToggle} className="self-start">
                        <ChevronRight className={`transition-transform duration-200 ${showSubs ? "rotate-90" : ""}`}
                        />
                    </button>
                    <img
                        src="/assets/menu30.jpg"
                        alt="Menu 12"
                        className="w-[3.125rem] h-[3.125rem] rounded-[0.625rem] object-cover"
                    />
                    <div className="categoryTitle flex flex-col  gap-[1.25rem] pl-2 justify-start">
                        <div className="font-inter font-semibold text-[1.5rem] leading-none">
                            Appetizers
                        </div>

                        <div className="bg-[#EAEAEA] rounded-[0.625rem] px-[0.5rem] py-[0.25rem] text-[1rem] font-medium leading-[1.5rem] tracking-[0.03125rem] font-inter text-black w-fit">
                            2 Subs
                        </div>

                    </div>

                </div>

                <div className="right-side flex  gap-[1rem]">
                    <PencilSimpleLine className="w-[1.6rem] h-[1.6rem]" />
                    <Trash className="w-[1.6rem] h-[1.6rem]" color="#EA1414" />
                </div>
            </div>

            {showSubs && (
                <div >
                    <SubCategoryBoxOfCPg />
                    <SubCategoryBoxOfCPg />

                </div>
            )}
        </div>
    );
}
