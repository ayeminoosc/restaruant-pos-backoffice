import { Camera } from "lucide-react";

export default function ImageBox() {
    return (
        <div className="relative flex flex-col items-center justify-center py-[4.5rem] px-[5rem] bg-[#F9F9F9] rounded-[0.625rem]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                    x="0.5"
                    y="0.5"
                    width="calc(100% - 0.625rem)"
                    height="calc(100% - 0.625rem)"
                    fill="none"
                    stroke="#A7A7A7"
                    strokeWidth="1"
                    strokeDasharray="10 5"
                    rx="10"
                    ry="10"
                />
            </svg>
            
            <img
                src="/assets/Camera.svg"
                alt="Camera Icon"
                className="w-[2.6rem] h-[2.6rem] text-gray-400 mb-2 relative z-10"
            />
            <div className="text-black text-center font-inter text-[0.875rem] font-normal leading-none relative z-10">
                Add Photo
            </div>
        </div>
    );
}