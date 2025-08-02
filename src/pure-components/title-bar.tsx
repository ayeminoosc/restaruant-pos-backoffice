import { ArrowLeft } from "lucide-react";


export default function TitleBar({label,onClick}: { label?: string, onClick?: () => void }) {
    return (
        <div className="w-full h-full flex items-center justify-between px-5 border-b-[0.125rem] border-[#D9D9D9] ">
            <img
                src="/assets/ArrowLeft.svg"
                alt="Back"
                className="w-[2.3125rem] h-[1.9375rem]"
                onClick={onClick}
                
            />
            <div className="flex-1 flex justify-center">
                <div className="text-black font-inter text-[2rem] font-semibold leading-none">
                   {label}
                </div>

            </div>
        </div>
    )
}