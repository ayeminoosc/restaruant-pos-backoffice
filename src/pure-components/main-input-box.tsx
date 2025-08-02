import { Input } from "@/components/ui/input";

export default function MainInputBox({ label, placeHolder}: { label: string, placeHolder: string }) {
    return (
        <div className="w-full h-full flex flex-col gap-[1rem]">

            <label
                htmlFor="main-input"
                className="w-full h-[20%] font-inter font-medium text-[1.25rem] text-[#2A2A2A] flex items-center gap-1"
            >
                {label}
                <div className="pt-1 text-[#EA1414] font-inter text-[1.25rem] font-medium leading-none"> *</div>

            </label>


            <input
                id="main-input"
                type="text"
                placeholder={placeHolder}
                className="flex items-center gap-[0.625rem] self-stretch rounded-[0.625rem] border border-[#9C9C9C] p-[0.625rem_1rem] font-inter text-[1.25rem] placeholder:font-inter placeholder:text-[1.25rem]"
            />


        </div>
    );
}

