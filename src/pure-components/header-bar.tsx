import { Input } from "@/components/ui/input";
import { MagnifyingGlass } from "phosphor-react";

export default function HeaderBar({categoryName,placeHolder}: { categoryName?: string, placeHolder?: string }) {
    return (
        <div className="w-full h-full flex items-center justify-between  border-b-[0.125rem] border-[#D9D9D9] px-[1.8rem]">
            <div className="text-[2rem] font-semibold font-inter">{categoryName || "Category"}</div>

            <div className="relative flex w-[33.6875rem] h-[60%] max-w-[45rem]  items-center gap-1.5 flex-shrink-0 ">
                <MagnifyingGlass className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A2A2A2] w-[1.5rem] h-[1.5rem]" />
                <Input
                    type="text"
                    placeholder={placeHolder}
                    className="flex-grow h-full font-inter rounded-[0.625rem] bg-[#F6F6F6] pl-14  text-[#A2A2A2] !text-[1.3rem] leading-6 font-normal"
                />

            </div>


        </div>
    )
}