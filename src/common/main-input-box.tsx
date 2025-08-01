import { Input } from "@/components/ui/input";

export default function MainInputBox({ label }: { label: string }) {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <label
                htmlFor="main-input"
                className="w-full h-[20%] font-inter font-medium text-[1.4rem] leading-[100%] tracking-[0] flex items-center gap-1"
            >
                {label}
                <div className="pt-1 text-red-500"> *</div>
            </label>

            <input
                id="main-input"
                type="text"
                placeholder="Enter Category Title..."
                className="w-full h-[80%] border border-[#9C9C9C] rounded-[10px] p-2
                font-inter text-[1.4rem] pl-6 pr-6
                placeholder:font-inter  placeholder:text-[1.4rem] "
            />

        </div>
    );
}

