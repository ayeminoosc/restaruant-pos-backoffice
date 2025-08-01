import { ArrowLeft } from "lucide-react";


export default function TitleBar() {
    return (
        <div className="w-full h-full flex items-center justify-between px-5 border-b-[2px] border-[#D9D9D9] ">
            <ArrowLeft className="w-[2.3125rem] h-[1.9375rem]" />
            <div className="flex-1 flex justify-center">
                <div className="font-inter font-semibold text-2xl">
                    Add New Category
                </div>
            </div>
        </div>
    )
}